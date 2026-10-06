import { supabase } from "@/lib/supabaseClient";

interface AlertPayload {
  type: "LOW_STOCK" | "LOW_FLOAT" | "VAULT_DEPLETED";
  severity: "CRITICAL" | "WARNING";
  title: string;
  message: string;
  metadata: Record<string, any>;
  timestamp: string;
}

export async function checkAndDispatchAlerts(params: {
  skuCode?: string;
  skuName?: string;
  partnerId: string;
  currentBalance: number;
}) {
  const alerts: AlertPayload[] = [];
  const now = new Date().toISOString();

  // 1. Float Threshold Check (< ₹1,00,000 is low for enterprise rails)
  if (params.currentBalance < 100000) {
    alerts.push({
      type: "LOW_FLOAT",
      severity: params.currentBalance <= 0 ? "CRITICAL" : "WARNING",
      title: `Low Partner Float Pool: ${params.partnerId}`,
      message: `Partner ${params.partnerId} settlement float is down to ₹${params.currentBalance.toLocaleString("en-IN")}. Maker top-up required.`,
      metadata: { partnerId: params.partnerId, balance: params.currentBalance },
      timestamp: now,
    });
  }

  // 2. Inventory Threshold Check (< 5 codes available)
  if (params.skuCode) {
    const { count, error } = await supabase
      .from("voucher_inventory")
      .select("*", { count: "exact", head: true })
      .eq("sku_code", params.skuCode)
      .eq("status", "AVAILABLE");

    const availableCount = count ?? 0;

    if (availableCount === 0) {
      alerts.push({
        type: "VAULT_DEPLETED",
        severity: "CRITICAL",
        title: `Out of Inventory: ${params.skuName || params.skuCode}`,
        message: `Voucher vault depleted (0 codes). API checkout will throw 409 OUT_OF_INVENTORY. Ingest new batch immediately.`,
        metadata: { skuCode: params.skuCode, remaining: 0 },
        timestamp: now,
      });
    } else if (availableCount <= 5) {
      alerts.push({
        type: "LOW_STOCK",
        severity: "WARNING",
        title: `Low Stock Alert: ${params.skuName || params.skuCode}`,
        message: `Only ${availableCount} voucher codes left in vault for SKU ${params.skuCode}.`,
        metadata: { skuCode: params.skuCode, remaining: availableCount },
        timestamp: now,
      });
    }
  }

  // 3. Dispatch Alerts to Webhook / Personal Admin Email Endpoint
  for (const alert of alerts) {
    console.warn(`[ALERT DISPATCHED] [${alert.severity}] ${alert.title}: ${alert.message}`);

    // If an external webhook URL (Slack / Discord / Custom webhook) is defined in env
    const webhookUrl = process.env.SYSTEM_ALERT_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(alert),
        });
      } catch (err) {
        console.error("Failed to forward alert webhook:", err);
      }
    }
  }

  return alerts;
}
