import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { partnerId, customerName, msisdn, email, geography, skuCode, skuName, amount, fulfillmentType } = body;

    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    let assignedCode: string | null = null;

    if (fulfillmentType === "COUPON_CODE") {
      // Pick next available voucher code
      const { data: availableVoucher, error: voucherFetchErr } = await supabase
        .from("voucher_inventory")
        .select("id, code")
        .eq("sku_code", skuCode)
        .eq("status", "AVAILABLE")
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (voucherFetchErr) {
        return NextResponse.json({ success: false, error: "Vault Database Error: " + voucherFetchErr.message }, { status: 500 });
      }

      if (!availableVoucher) {
        return NextResponse.json(
          { success: false, error: `OUT_OF_INVENTORY: Zero codes available for SKU ${skuCode}. Restock in Vault.` },
          { status: 409 }
        );
      }

      assignedCode = availableVoucher.code;

      // Claim code
      const { error: claimErr } = await supabase
        .from("voucher_inventory")
        .update({
          status: "CLAIMED",
          claimed_by_order_id: orderId,
          claimed_by_msisdn: msisdn,
          claimed_at: new Date().toISOString()
        })
        .eq("id", availableVoucher.id);

      if (claimErr) {
        return NextResponse.json({ success: false, error: "Failed to claim code: " + claimErr.message }, { status: 500 });
      }
    }

    // Insert order with guaranteed fallbacks for NOT NULL columns
    const { error: orderError } = await supabase.from("orders").insert([
      {
        order_id: orderId,
        partner_id: partnerId || "PRT-101",
        customer_name: customerName || "Cardholder",
        msisdn,
        email: email || null,
        geography: geography || "Bengaluru, KA",
        sku_code: skuCode,
        sku_name: skuName,
        amount: Number(amount),
        status: "ACTIVE",
        fulfillment_type: fulfillmentType || "DIRECT_API",
        voucher_code: assignedCode
      }
    ]);

    if (orderError) {
      return NextResponse.json({ success: false, error: "Order persistence error: " + orderError.message }, { status: 500 });
    }

    // Debit partner float
    const { data: partnerData } = await supabase.from("partners").select("balance").eq("id", partnerId || "PRT-101").single();
    let newBalance = 676045;
    if (partnerData) {
      newBalance = Number(partnerData.balance) - Number(amount);
      await supabase.from("partners").update({ balance: newBalance }).eq("id", partnerId || "PRT-101");
    }

    return NextResponse.json({
      success: true,
      orderId,
      newBalance,
      voucherCode: assignedCode,
      fulfillmentType: fulfillmentType || "DIRECT_API"
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || "Internal server error" }, { status: 500 });
  }
}
