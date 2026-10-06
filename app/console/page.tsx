"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  TrendingUp,
  Download,
  CreditCard,
  RefreshCw,
  Wallet,
  Layers,
  UserCog,
  Users,
  Sparkles,
  MapPin,
  Lightbulb,
  Clock,
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
  PlusCircle,
  Tag,
  ToggleLeft,
  ToggleRight,
  Edit2,
  Trash2,
  Check,
  X,
  Zap,
  Ticket,
  FileText,
  Info,
  Archive,
  UploadCloud,
  Code2,
  Copy,
  KeyRound,
  Terminal
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface TopupRequest {
  id: string;
  partner: string;
  amount: number;
  utr: string;
  bankRef: string;
  requestedBy: string;
  requestedAt: string;
  status: "PENDING_APPROVAL" | "APPROVED" | "REJECTED";
  approvedBy?: string;
  approvedAt?: string;
}

interface SettlementRecord {
  cycleId: string;
  date: string;
  partner: string;
  grossVolume: number;
  subzoTakeRate: number;
  gstAmount: number;
  partnerNet: number;
  status: "SETTLED" | "PENDING_RECON";
  ordersCount: number;
  invoiceNo: string;
}

interface CatalogItem {
  id: string;
  name: string;
  category: string;
  mrp: number;
  subzoCost: number;
  partnerWholesale: number;
  marginPercent: number;
  enabled: boolean;
  velocityScore: number;
  wowGrowth: string;
  fulfillmentType: "DIRECT_API" | "COUPON_CODE";
  brandDescription: string;
  planDescription: string;
  termsAndConditions: string;
  redemptionSteps: string;
}

interface PartnerAccount {
  id: string;
  name: string;
  van: string;
  contactEmail: string;
  gstin: string;
  balance: number;
  visitsCount: number;
  lastActive: string;
}

interface CustomerOrder {
  orderId: string;
  partnerId: string;
  customerName: string;
  msisdn: string;
  email?: string;
  geography: string;
  skuCode: string;
  skuName: string;
  amount: number;
  timestamp: string;
  status: "ACTIVE" | "EXPIRED";
  fulfillmentType?: "DIRECT_API" | "COUPON_CODE";
  voucherCode?: string;
}

interface CustomerProfile {
  msisdn: string;
  name: string;
  email: string;
  geography: string;
  partnerId: string;
  activeSubscriptionsCount: number;
  subscriptions: { skuName: string; expiry: string; voucher?: string }[];
  lifetimeSpend: number;
}

interface VoucherItem {
  id: string;
  skuCode: string;
  code: string;
  batchRef: string;
  uploadDate: string;
  expiryDate: string;
  status: "AVAILABLE" | "CLAIMED" | "EXPIRED";
  claimedByOrderId?: string;
  claimedByMsisdn?: string;
  claimedAt?: string;
}

interface ApiKeyItem {
  id: string;
  partnerId: string;
  keyName: string;
  secretKey: string;
  environment: "production" | "sandbox";
  status: "ACTIVE" | "REVOKED";
  createdAt: string;
}

export default function SubzoPlatform() {
  const [currentRole, setCurrentRole] = useState<"admin" | "PRT-101" | "PRT-102">("admin");
  const [activeTab, setActiveTab] = useState<
    "approvals" | "catalog" | "vault" | "developer" | "simulator" | "customers" | "predictions" | "settlement"
  >("approvals");

  const [partners, setPartners] = useState<PartnerAccount[]>([
    {
      id: "PRT-101",
      name: "OneCard Enterprise",
      van: "ICICI-VAN-9920",
      contactEmail: "treasury@onecard.in",
      gstin: "29AABCU9603R1ZM",
      balance: 676045,
      visitsCount: 16,
      lastActive: "Just now"
    },
    {
      id: "PRT-102",
      name: "FamApp Revenue",
      van: "ICICI-VAN-4811",
      contactEmail: "ops@famapp.in",
      gstin: "29AAGCF7182L1ZX",
      balance: 250000,
      visitsCount: 8,
      lastActive: "45 mins ago"
    }
  ]);

  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [requests, setRequests] = useState<TopupRequest[]>([]);
  const [partnerBalance, setPartnerBalance] = useState<number>(676045);
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [vouchers, setVouchers] = useState<VoucherItem[]>([]);
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>([]);

  // Simulator Form State
  const [simName, setSimName] = useState("Vikas Saxena");
  const [simPhone, setSimPhone] = useState("9811223344");
  const [simEmail, setSimEmail] = useState("vikas@cardholder.in");
  const [simCity, setSimCity] = useState("Bengaluru, KA");
  const [selectedSkuId, setSelectedSkuId] = useState("");
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const [lastIssuedCode, setLastIssuedCode] = useState<string | null>(null);

  // Maker Topup Form
  const [topupAmount, setTopupAmount] = useState<number>(200000);
  const [topupUtr, setTopupUtr] = useState<string>("CMS" + Math.floor(1000000000 + Math.random() * 9000000000));
  const [isSubmittingTopup, setIsSubmittingTopup] = useState(false);

  // Bulk Voucher Ingestion
  const [ingestSku, setIngestSku] = useState("SKU-HOTSTAR-SUP");
  const [ingestBatchRef, setIngestBatchRef] = useState("BATCH-NOV-01");
  const [ingestExpiryDate, setIngestExpiryDate] = useState("2027-01-31");
  const [ingestCodesRaw, setIngestCodesRaw] = useState("");
  const [isIngesting, setIsIngesting] = useState(false);

  // Developer API
  const [newKeyLabel, setNewKeyLabel] = useState("");
  const [newKeyEnv, setNewKeyEnv] = useState<"production" | "sandbox">("sandbox");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const settlements: SettlementRecord[] = [
    {
      cycleId: "SETTLE-2026-10-04",
      date: "04 Oct 2026",
      partner: "OneCard Enterprise",
      grossVolume: 489200,
      subzoTakeRate: 14676,
      gstAmount: 2642,
      partnerNet: 471882,
      status: "SETTLED",
      ordersCount: 542,
      invoiceNo: "SBZ/26-27/INV-0481"
    }
  ];

  const loadData = async () => {
    try {
      // 1. Catalog
      const { data: cData } = await supabase.from("catalog").select("*").order("created_at", { ascending: true });
      if (cData && cData.length > 0) {
        const formatted: CatalogItem[] = cData.map((c: any) => ({
          id: c.id,
          name: c.name,
          category: c.category,
          mrp: Number(c.mrp),
          subzoCost: Number(c.subzo_cost),
          partnerWholesale: Number(c.partner_wholesale),
          marginPercent: Number(c.margin_percent),
          enabled: c.enabled,
          velocityScore: c.velocity_score || 50,
          wowGrowth: c.wow_growth || "+0%",
          fulfillmentType: c.fulfillment_type || "DIRECT_API",
          brandDescription: c.brand_description || "Brand subscription offering curated on Subzo rails.",
          planDescription: c.plan_description || "Annual all-access digital subscription tier.",
          termsAndConditions: c.terms_and_conditions || "Standard non-refundable digital purchase conditions apply.",
          redemptionSteps: c.redemption_steps || "Direct activation on registered MSISDN."
        }));
        setCatalog(formatted);
        if (!selectedSkuId && formatted.length > 0) setSelectedSkuId(formatted[0].id);
      }

      // 2. Vouchers
      const { data: vData } = await supabase.from("voucher_inventory").select("*").order("created_at", { ascending: false });
      if (vData) {
        setVouchers(
          vData.map((v: any) => ({
            id: v.id,
            skuCode: v.sku_code,
            code: v.code,
            batchRef: v.batch_ref || "UNTAGGED",
            uploadDate: v.upload_date || new Date().toISOString().slice(0, 10),
            expiryDate: v.expiry_date || "2027-12-31",
            status: v.status,
            claimedByOrderId: v.claimed_by_order_id,
            claimedByMsisdn: v.claimed_by_msisdn,
            claimedAt: v.claimed_at
          }))
        );
      }

      // 3. Orders
      const { data: oData } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (oData) {
        setOrders(
          oData.map((o: any) => ({
            orderId: o.order_id,
            partnerId: o.partner_id,
            customerName: o.customer_name,
            msisdn: o.msisdn,
            email: o.email || "",
            geography: o.geography,
            skuCode: o.sku_code,
            skuName: o.sku_name,
            amount: Number(o.amount),
            timestamp: new Date(o.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            status: o.status || "ACTIVE",
            fulfillmentType: o.fulfillment_type || "DIRECT_API",
            voucherCode: o.voucher_code || undefined
          }))
        );
      }

      // 4. Float Requests
      const { data: rData } = await supabase.from("float_requests").select("*").order("created_at", { ascending: false });
      if (rData) {
        setRequests(
          rData.map((r: any) => ({
            id: r.id,
            partner: r.partner,
            amount: Number(r.amount),
            utr: r.utr,
            bankRef: r.bank_ref,
            requestedBy: r.requested_by,
            requestedAt: r.requested_at,
            status: r.status,
            approvedBy: r.approved_by,
            approvedAt: r.approved_at
          }))
        );
      }

      // 5. API Keys
      const { data: kData } = await supabase.from("api_keys").select("*").order("created_at", { ascending: false });
      if (kData) {
        setApiKeys(
          kData.map((k: any) => ({
            id: k.id,
            partnerId: k.partner_id,
            keyName: k.key_name,
            secretKey: k.secret_key,
            environment: k.environment,
            status: k.status,
            createdAt: new Date(k.created_at).toLocaleDateString()
          }))
        );
      }

      // 6. Partners
      const { data: pData } = await supabase.from("partners").select("*");
      if (pData && pData.length > 0) {
        const formatted: PartnerAccount[] = pData.map((p: any) => ({
          id: p.id,
          name: p.name,
          van: p.van,
          contactEmail: p.contact_email,
          gstin: p.gstin,
          balance: Number(p.balance),
          visitsCount: p.visits_count,
          lastActive: p.last_active
        }));
        setPartners(formatted);
        const active = formatted.find((p) => p.id === "PRT-101");
        if (active) setPartnerBalance(active.balance);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredOrders = orders.filter((o) => (currentRole === "admin" ? true : o.partnerId === currentRole));
  const filteredKeys = apiKeys.filter((k) => (currentRole === "admin" ? true : k.partnerId === currentRole));
  const handleLogout = () => { document.cookie = "subzo_session=; path=/; max-age=0;"; window.location.href = "/login"; };
  const activePartnerData = partners.find((p) => p.id === currentRole);
  const currentSelectedSku = catalog.find((c) => c.id === selectedSkuId) || catalog[0];

  // Customer Profiles
  const customerMap = new Map<string, CustomerProfile>();
  filteredOrders.forEach((o) => {
    if (!customerMap.has(o.msisdn)) {
      customerMap.set(o.msisdn, {
        msisdn: o.msisdn,
        name: o.customerName || "Cardholder",
        email: o.email || "Not Provided",
        geography: o.geography || "Pan-India",
        partnerId: o.partnerId,
        activeSubscriptionsCount: 0,
        subscriptions: [],
        lifetimeSpend: 0
      });
    }
    const profile = customerMap.get(o.msisdn)!;
    profile.activeSubscriptionsCount += 1;
    profile.lifetimeSpend += o.amount;
    profile.subscriptions.push({
      skuName: o.skuName,
      expiry: "05 Oct 2027",
      voucher: o.voucherCode
    });
  });
  const customerProfiles = Array.from(customerMap.values());

  // Generate API Token
  const handleGenerateApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyLabel) return;

    const targetPartnerId = currentRole === "admin" ? "PRT-101" : currentRole;
    const prefix = newKeyEnv === "production" ? "sbz_live_sk_" : "sbz_test_sk_";
    const randPart = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
    const generatedKey = `${prefix}${randPart}`;
    const keyId = `KEY-${Math.floor(100 + Math.random() * 900)}`;

    try {
      const { error } = await supabase.from("api_keys").insert([
        {
          id: keyId,
          partner_id: targetPartnerId,
          key_name: newKeyLabel.trim(),
          secret_key: generatedKey,
          environment: newKeyEnv,
          status: "ACTIVE"
        }
      ]);

      if (error) throw error;
      setNewKeyLabel("");
      await loadData();
    } catch (err: any) {
      alert("Error generating API key: " + err.message);
    }
  };

  // Bulk Ingest Vouchers
  const handleBulkIngest = async (e: React.FormEvent) => {
    e.preventDefault();
    const splitCodes = ingestCodesRaw
      .split(/[\n,]+/)
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    if (splitCodes.length === 0) return;
    setIsIngesting(true);

    const rows = splitCodes.map((c) => ({
      sku_code: ingestSku,
      code: c,
      batch_ref: ingestBatchRef.trim(),
      upload_date: new Date().toISOString().slice(0, 10),
      expiry_date: ingestExpiryDate,
      status: "AVAILABLE"
    }));

    try {
      const { error } = await supabase.from("voucher_inventory").upsert(rows, { onConflict: "code" });
      if (error) throw error;
      setIngestCodesRaw("");
      await loadData();
      alert(`Successfully ingested ${rows.length} voucher codes into vault!`);
    } catch (err: any) {
      alert("Ingestion error: " + err.message);
    } finally {
      setIsIngesting(false);
    }
  };

  // Simulation Execution
  const executeSimulation = async () => {
    if (!currentSelectedSku) return;
    setIsProvisioning(true);
    setLastIssuedCode(null);

    const isDirectApi = currentSelectedSku.fulfillmentType === "DIRECT_API";
    setSimLogs([
      `[GATEWAY] Initializing ${isDirectApi ? "DIRECT API" : "PRE-LOADED VOUCHER VAULT"} fulfillment...`,
      `[LEDGER] Verifying float adequacy for wholesale ₹${currentSelectedSku.partnerWholesale}...`
    ]);

    try {
      const res = await fetch("/api/provision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partnerId: currentRole === "admin" ? "PRT-101" : currentRole,
          customerName: simName,
          msisdn: `+91 ${simPhone}`,
          email: simEmail,
          geography: simCity,
          skuCode: currentSelectedSku.id,
          skuName: currentSelectedSku.name,
          amount: currentSelectedSku.partnerWholesale,
          fulfillmentType: currentSelectedSku.fulfillmentType
        })
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.error);

      setLastIssuedCode(json.voucherCode);
      setSimLogs((prev) => [
        ...prev,
        `[PERSISTED] Order ID: ${json.orderId}`,
        json.voucherCode ? `[VAULT CODE ASSIGNED] ${json.voucherCode}` : `[DIRECT PROVISION] Activated on +91 ${simPhone}`,
        `[FLOAT DEBIT] Partner balance debited ₹${currentSelectedSku.partnerWholesale}. Remaining: ₹${json.newBalance.toLocaleString("en-IN")}`
      ]);
      await loadData();
    } catch (err: any) {
      setSimLogs((prev) => [...prev, `[FAIL] ${err.message}`]);
    } finally {
      setIsProvisioning(false);
    }
  };

  // Topup Submit
  const submitTopupRequest = async () => {
    setIsSubmittingTopup(true);
    const targetPartner = currentRole === "admin" ? "OneCard Enterprise" : activePartnerData?.name || "OneCard Enterprise";
    const reqId = `TOP-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      await supabase.from("float_requests").insert([
        {
          id: reqId,
          partner: targetPartner,
          amount: topupAmount,
          utr: topupUtr,
          bank_ref: activePartnerData?.van || "ICICI-VAN-9920",
          requested_by: currentRole === "admin" ? "admin.maker@subzo.io" : activePartnerData?.contactEmail || "ops@partner.in",
          requested_at: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          status: "PENDING_APPROVAL"
        }
      ]);
      await loadData();
      setTopupUtr("CMS" + Math.floor(1000000000 + Math.random() * 9000000000));
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmittingTopup(false);
    }
  };

  // Topup Approve
  const approveTopup = async (req: TopupRequest) => {
    try {
      await supabase
        .from("float_requests")
        .update({
          status: "APPROVED",
          approved_by: "satish.checker@subzo.io",
          approved_at: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        })
        .eq("id", req.id);

      const targetPartnerId = req.partner.includes("OneCard") ? "PRT-101" : "PRT-102";
      const partnerRec = partners.find((p) => p.id === targetPartnerId);
      const newBal = (partnerRec ? partnerRec.balance : partnerBalance) + req.amount;

      await supabase.from("partners").update({ balance: newBal }).eq("id", targetPartnerId);
      setPartnerBalance(newBal);
      await loadData();
    } catch (e) {
      console.error(e);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      {/* STRUCTURED VERTICAL LEFT SIDEBAR */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/60 backdrop-blur flex flex-col justify-between shrink-0 sticky top-0 h-screen">
        <div>
          <div className="p-5 border-b border-slate-800 flex items-center space-x-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20 shrink-0">
              S
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base tracking-tight text-white">Subzo</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  PostgreSQL
                </span>
              </div>
              <p className="text-[11px] text-slate-400">B2B Digital Subscription Rails</p>
            </div>
          </div>

          <div className="p-3 space-y-1">
            <p className="px-3 pt-2 pb-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Operations Workflow
            </p>

            {/* 1. Treasury */}
            <button
              onClick={() => setActiveTab("approvals")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === "approvals"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <ShieldCheck className="w-4 h-4 shrink-0 text-blue-400" />
                <span>1. Treasury Float Desk</span>
              </div>
              {requests.filter((r) => r.status === "PENDING_APPROVAL").length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-[10px] font-bold text-slate-950">
                  {requests.filter((r) => r.status === "PENDING_APPROVAL").length}
                </span>
              )}
            </button>

            {/* 2. Catalog */}
            <button
              onClick={() => setActiveTab("catalog")}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === "catalog"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Layers className="w-4 h-4 shrink-0 text-indigo-400" />
              <span>2. Wholesale Catalog</span>
            </button>

            {/* 3. Voucher Vault */}
            <button
              onClick={() => setActiveTab("vault")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === "vault"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Archive className="w-4 h-4 shrink-0 text-amber-400" />
                <span>3. Voucher Code Vault</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-full bg-slate-800 text-[10px] font-mono text-amber-400 border border-slate-700">
                {vouchers.filter((v) => v.status === "AVAILABLE").length}
              </span>
            </button>

            {/* 4. Developer API */}
            <button
              onClick={() => setActiveTab("developer")}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === "developer"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Code2 className="w-4 h-4 shrink-0 text-cyan-400" />
              <span>4. Developer API & Keys</span>
            </button>

            {/* 5. Sandbox */}
            <button
              onClick={() => setActiveTab("simulator")}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === "simulator"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <CreditCard className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>5. Provisioning Sandbox</span>
            </button>

            {/* 6. Customer 360 */}
            <button
              onClick={() => setActiveTab("customers")}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === "customers"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Users className="w-4 h-4 shrink-0 text-teal-400" />
              <span>6. Customer 360° & Orders</span>
            </button>

            {/* 7. Velocity */}
            <button
              onClick={() => setActiveTab("predictions")}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === "predictions"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Sparkles className="w-4 h-4 shrink-0 text-purple-400" />
              <span>7. Sales Velocity & Insights</span>
            </button>

            {/* 8. Settlement */}
            <button
              onClick={() => setActiveTab("settlement")}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === "settlement"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 shrink-0 text-rose-400" />
              <span>8. T+1 Recon & GST</span>
            </button>
          </div>
        </div>

        <div className="p-4 border-t border-slate-800 space-y-3">
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1.5">
              Portal Perspective
            </label>
            <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 w-full">
              <UserCog className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <select
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value as any)}
                className="bg-transparent text-xs text-slate-200 font-medium focus:outline-none cursor-pointer w-full"
              >
                <option value="admin" className="bg-slate-900 text-white">Subzo Admin (Platform)</option>
                <option value="PRT-101" className="bg-slate-900 text-blue-300">View as OneCard</option>
                <option value="PRT-102" className="bg-slate-900 text-purple-300">View as FamApp</option>
              </select>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/50">
            <p className="text-xs font-semibold text-slate-200">
              {currentRole === "admin" ? "Satish Chavan" : activePartnerData?.name}
            </p>
            <p className="text-[10px] text-emerald-400 font-mono">
              {currentRole === "admin" ? "Checker Role (Authorized)" : "Partner Portal Access"}
            </p>
            <button onClick={handleLogout} className="mt-2 text-[10px] text-red-400 hover:text-red-300 font-semibold block transition">Sign Out of Session</button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="p-8 max-w-7xl w-full mx-auto space-y-6 flex-1">
          {/* Top Operational Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>AVAILABLE FLOAT POOL</span>
                <Wallet className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-2xl font-bold font-mono text-white">
                ₹{(currentRole === "admin" ? partnerBalance : activePartnerData?.balance || 0).toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-emerald-400 mt-2 flex items-center">
                <TrendingUp className="w-3.5 h-3.5 mr-1" />
                Live Settlement Balance
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>ACTIVE WHOLESALE SKUS</span>
                <Layers className="w-4 h-4 text-indigo-400" />
              </div>
              <p className="text-2xl font-bold font-mono text-white">
                {catalog.filter((c) => c.enabled).length} / {catalog.length}
              </p>
              <p className="text-xs text-slate-400 mt-2">Ready for Provisioning</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>LIVE VAULT STOCK</span>
                <Archive className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-2xl font-bold font-mono text-amber-400">
                {vouchers.filter((v) => v.status === "AVAILABLE").length} Codes
              </p>
              <p className="text-xs text-slate-400 mt-2">{vouchers.filter((v) => v.status === "CLAIMED").length} Claimed</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>TOTAL COMPLETED ORDERS</span>
                <Sparkles className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-2xl font-bold font-mono text-purple-400">{filteredOrders.length}</p>
              <p className="text-xs text-emerald-400 mt-2">+48% WoW Velocity</p>
            </div>
          </div>

          {/* TAB 1: TREASURY FLOAT DESK */}
          {activeTab === "approvals" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-blue-400" />
                    <span>1. Treasury Float Desk (Maker-Checker Workflow)</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Pre-funding approvals, bank UTR validation, and partner virtual account (VAN) credit lines.
                  </p>
                </div>
              </div>

              {/* Maker Section */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 text-xs">
                <div className="flex items-center space-x-2 font-bold text-blue-400 uppercase tracking-wider">
                  <PlusCircle className="w-4 h-4" />
                  <span>Maker: Initiate New Float Deposit</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Partner Account</label>
                    <input
                      type="text"
                      disabled
                      value={currentRole === "admin" ? "OneCard Enterprise" : activePartnerData?.name}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-slate-400 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Top-Up Amount (₹)</label>
                    <input
                      type="number"
                      value={topupAmount}
                      onChange={(e) => setTopupAmount(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 font-mono text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Bank UTR Number</label>
                    <input
                      type="text"
                      value={topupUtr}
                      onChange={(e) => setTopupUtr(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 font-mono text-slate-200"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={submitTopupRequest}
                    disabled={isSubmittingTopup}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl flex items-center space-x-2"
                  >
                    {isSubmittingTopup ? <RefreshCw className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
                    <span>Submit to Checker Desk</span>
                  </button>
                </div>
              </div>

              {/* Checker Table */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden font-mono text-xs">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-900 text-slate-400 font-sans border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">REQUEST ID</th>
                      <th className="py-3 px-4">PARTNER & VAN</th>
                      <th className="py-3 px-4">AMOUNT</th>
                      <th className="py-3 px-4">UTR REFERENCE</th>
                      <th className="py-3 px-4">STATUS</th>
                      <th className="py-3 px-4 text-right">CHECKER SIGN-OFF</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {requests.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-800/30">
                        <td className="py-4 px-4 font-bold text-blue-400">{req.id}</td>
                        <td className="py-4 px-4 font-sans text-slate-200">{req.partner}</td>
                        <td className="py-4 px-4 font-bold text-white">₹{req.amount.toLocaleString("en-IN")}</td>
                        <td className="py-4 px-4 text-slate-300">{req.utr}</td>
                        <td className="py-4 px-4 font-sans">
                          {req.status === "APPROVED" ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Approved
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-right font-sans">
                          {req.status === "PENDING_APPROVAL" && currentRole === "admin" ? (
                            <button
                              onClick={() => approveTopup(req)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold"
                            >
                              Approve & Credit
                            </button>
                          ) : (
                            <span className="text-slate-500 text-[11px]">{req.approvedBy || "Immutable"}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: WHOLESALE CATALOG */}
          {activeTab === "catalog" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                    <Layers className="w-5 h-5 text-indigo-400" />
                    <span>2. Wholesale Subscription Catalog</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage direct OEM buy rates, wholesale prices to partners, and plan redemption specifications.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden font-mono text-xs">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800 font-sans">
                    <tr>
                      <th className="py-3 px-4">SKU CODE</th>
                      <th className="py-3 px-4">SERVICE & PLAN</th>
                      <th className="py-3 px-4">FULFILLMENT</th>
                      <th className="py-3 px-4">RETAIL MRP</th>
                      {currentRole === "admin" && <th className="py-3 px-4">SUBZO BUY RATE</th>}
                      <th className="py-3 px-4">WHOLESALE</th>
                      {currentRole === "admin" && <th className="py-3 px-4">MARGIN</th>}
                      <th className="py-3 px-4 text-center">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {catalog.map((sku) => (
                      <tr key={sku.id} className="hover:bg-slate-800/30">
                        <td className="py-4 px-4 font-bold text-blue-400">{sku.id}</td>
                        <td className="py-4 px-4 font-sans font-semibold text-slate-200">{sku.name}</td>
                        <td className="py-4 px-4 font-sans">
                          {sku.fulfillmentType === "DIRECT_API" ? (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-flex items-center space-x-1">
                              <Zap className="w-3 h-3" />
                              <span>Direct API</span>
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 inline-flex items-center space-x-1">
                              <Ticket className="w-3 h-3" />
                              <span>Voucher Vault</span>
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-slate-400 line-through">₹{sku.mrp}</td>
                        {currentRole === "admin" && <td className="py-4 px-4 text-slate-300">₹{sku.subzoCost}</td>}
                        <td className="py-4 px-4 font-bold text-white">₹{sku.partnerWholesale}</td>
                        {currentRole === "admin" && (
                          <td className="py-4 px-4 font-bold text-emerald-400 font-sans">
                            +₹{sku.partnerWholesale - sku.subzoCost} ({sku.marginPercent}%)
                          </td>
                        )}
                        <td className="py-4 px-4 text-center">
                          {sku.enabled ? (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-sans">
                              Active
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-400 border border-slate-700 font-sans">
                              Disabled
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: VOUCHER VAULT */}
          {activeTab === "vault" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                    <Archive className="w-5 h-5 text-amber-400" />
                    <span>3. Pre-Loaded Voucher Inventory Vault</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage supplier coupon batches with upload & expiry dates. API orders automatically claim from this pool.
                  </p>
                </div>
              </div>

              {/* Bulk Loader Form */}
              {currentRole === "admin" && (
                <form onSubmit={handleBulkIngest} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-white text-sm flex items-center space-x-2">
                      <UploadCloud className="w-4 h-4 text-amber-400" />
                      <span>Bulk Ingest Supplier Voucher Codes</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-slate-400 font-semibold block mb-1">Target SKU</label>
                      <select
                        value={ingestSku}
                        onChange={(e) => setIngestSku(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono"
                      >
                        {catalog
                          .filter((c) => c.fulfillmentType === "COUPON_CODE")
                          .map((sku) => (
                            <option key={sku.id} value={sku.id}>{sku.name} ({sku.id})</option>
                          ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-400 font-semibold block mb-1">Batch / PO Identifier</label>
                      <input
                        type="text"
                        value={ingestBatchRef}
                        onChange={(e) => setIngestBatchRef(e.target.value)}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 font-semibold block mb-1">Voucher Expiry Date</label>
                      <input
                        type="date"
                        value={ingestExpiryDate}
                        onChange={(e) => setIngestExpiryDate(e.target.value)}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Voucher Codes (1 per line)</label>
                    <textarea
                      rows={4}
                      value={ingestCodesRaw}
                      onChange={(e) => setIngestCodesRaw(e.target.value)}
                      placeholder={`HS-SUP-NOV-001\nHS-SUP-NOV-002\nHS-SUP-NOV-003`}
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isIngesting}
                      className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl flex items-center space-x-2"
                    >
                      {isIngesting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
                      <span>Save Batch to Vault</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Codes Table */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden font-mono text-xs">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-900 text-slate-400 font-sans border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">SKU</th>
                      <th className="py-3 px-4">COUPON CODE</th>
                      <th className="py-3 px-4">BATCH</th>
                      <th className="py-3 px-4">UPLOAD DATE</th>
                      <th className="py-3 px-4">EXPIRY DATE</th>
                      <th className="py-3 px-4">STATUS</th>
                      <th className="py-3 px-4">CLAIMED BY</th>
                      <th className="py-3 px-4">ORDER ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {vouchers.map((v) => (
                      <tr key={v.id} className="hover:bg-slate-800/30">
                        <td className="py-3.5 px-4 font-bold text-blue-400">{v.skuCode}</td>
                        <td className="py-3.5 px-4 font-bold text-white tracking-wider">{v.code}</td>
                        <td className="py-3.5 px-4 text-slate-400 font-sans">{v.batchRef}</td>
                        <td className="py-3.5 px-4 text-slate-400">{v.uploadDate}</td>
                        <td className="py-3.5 px-4 text-amber-400">{v.expiryDate}</td>
                        <td className="py-3.5 px-4 font-sans">
                          {v.status === "AVAILABLE" ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              ● Available
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              Claimed
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-slate-300">{v.claimedByMsisdn || "—"}</td>
                        <td className="py-3.5 px-4 text-purple-400">{v.claimedByOrderId || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: DEVELOPER API */}
          {activeTab === "developer" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Code2 className="w-5 h-5 text-cyan-400" />
                <span>4. Developer Documentation & API Gateway</span>
              </h2>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-5">
                <form onSubmit={handleGenerateApiKey} className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs items-end">
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Token Description</label>
                    <input
                      type="text"
                      placeholder="e.g. Cardholder Checkout Gateway"
                      value={newKeyLabel}
                      onChange={(e) => setNewKeyLabel(e.target.value)}
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Environment</label>
                    <select
                      value={newKeyEnv}
                      onChange={(e) => setNewKeyEnv(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="sandbox">Sandbox (Testing)</option>
                      <option value="production">Production (Live Float)</option>
                    </select>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl transition flex items-center justify-center space-x-1.5 shadow-lg shadow-cyan-600/20"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Generate New API Key</span>
                    </button>
                  </div>
                </form>

                <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden font-mono text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-900 text-slate-400 font-sans border-b border-slate-800">
                      <tr>
                        <th className="py-2.5 px-4">LABEL</th>
                        <th className="py-2.5 px-4">SECRET TOKEN</th>
                        <th className="py-2.5 px-4">ENV</th>
                        <th className="py-2.5 px-4">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredKeys.map((k) => (
                        <tr key={k.id} className="hover:bg-slate-900/40">
                          <td className="py-3 px-4 font-sans font-semibold text-slate-200">{k.keyName}</td>
                          <td className="py-3 px-4 text-cyan-400 font-mono">{k.secretKey.slice(0, 16)}••••••••</td>
                          <td className="py-3 px-4 font-sans uppercase text-[10px]">{k.environment}</td>
                          <td className="py-3 px-4 text-emerald-400 font-semibold">● Active</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PROVISIONING SANDBOX */}
          {activeTab === "simulator" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 text-xs font-sans">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm">5. Provisioning Sandbox (Live DB Verification)</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    currentSelectedSku?.fulfillmentType === "DIRECT_API"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}>
                    {currentSelectedSku?.fulfillmentType === "DIRECT_API" ? "⚡ Direct API" : "🎟️ Pre-Loaded Vault Code"}
                  </span>
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Select Subscription SKU</label>
                  <select
                    value={selectedSkuId}
                    onChange={(e) => setSelectedSkuId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-slate-200 font-mono"
                  >
                    {catalog.map((sku) => (
                      <option key={sku.id} value={sku.id}>
                        {sku.name} — ₹{sku.partnerWholesale} ({sku.fulfillmentType === "COUPON_CODE" ? "🎟️ Vault Code" : "⚡ Direct API"})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Customer Name</label>
                  <input
                    type="text"
                    value={simName}
                    onChange={(e) => setSimName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-slate-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Mobile (MSISDN)</label>
                    <input
                      type="text"
                      value={simPhone}
                      onChange={(e) => setSimPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-slate-200 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Geography</label>
                    <input
                      type="text"
                      value={simCity}
                      onChange={(e) => setSimCity(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-slate-200"
                    />
                  </div>
                </div>

                <button
                  onClick={executeSimulation}
                  disabled={isProvisioning}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs transition"
                >
                  {isProvisioning ? "Executing Rails Protocol..." : "Execute Real DB Activation"}
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
                <span className="text-slate-500 text-[11px] block border-b border-slate-800 pb-2">REAL-TIME DB AUDIT STREAM</span>
                {simLogs.map((log, i) => (
                  <p key={i} className={log.includes("ASSIGNED") || log.includes("PERSISTED") ? "text-emerald-400 font-bold" : log.includes("FAIL") ? "text-red-400 font-bold" : "text-slate-300"}>
                    {log}
                  </p>
                ))}
                {lastIssuedCode && (
                  <div className="p-3 bg-slate-900 border border-amber-500/30 rounded-xl text-amber-300 mt-4">
                    Assigned Vault Code: <strong className="text-white text-sm">{lastIssuedCode}</strong>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: CUSTOMER 360 */}
          {activeTab === "customers" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Users className="w-5 h-5 text-teal-400" />
                <span>6. Customer 360° & Orders (Live PostgreSQL)</span>
              </h2>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden font-mono text-xs">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800 font-sans">
                    <tr>
                      <th className="py-3 px-4">CUSTOMER</th>
                      <th className="py-3 px-4">PHONE</th>
                      <th className="py-3 px-4">GEOGRAPHY</th>
                      <th className="py-3 px-4">ACTIVE PLANS & DELIVERED CODES</th>
                      <th className="py-3 px-4 text-right">LIFETIME SPEND</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {customerProfiles.map((cx) => (
                      <tr key={cx.msisdn} className="hover:bg-slate-800/30">
                        <td className="py-4 px-4 font-sans font-semibold text-slate-200">{cx.name}</td>
                        <td className="py-4 px-4 text-blue-400">{cx.msisdn}</td>
                        <td className="py-4 px-4 text-slate-400 font-sans">{cx.geography}</td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1.5">
                            {cx.subscriptions.map((s, idx) => (
                              <div key={idx} className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700">
                                <span>{s.skuName}</span>
                                {s.voucher && <span className="text-amber-400 font-bold ml-1.5">Code: {s.voucher}</span>}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right font-bold text-white">₹{cx.lifetimeSpend.toLocaleString("en-IN")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: PREDICTIONS */}
          {activeTab === "predictions" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>7. Sales Velocity & Next Steps</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-blue-500/30 space-y-2">
                  <span className="text-blue-400 font-bold text-xs">WHOLESALE VOLUME LOCK</span>
                  <h4 className="font-bold text-white text-sm">Lock Tier-1 Rate for SonyLIV</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Surging at +48% WoW. 18 units away from unlocking upstream ₹715 buy-rate.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-purple-500/30 space-y-2">
                  <span className="text-purple-400 font-bold text-xs">CROSS-SELL AFFINITY</span>
                  <h4 className="font-bold text-white text-sm">Activate Swiggy One Bundle</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    73% of SonyLIV holders show high cross-sell affinity for food delivery bundles.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-amber-500/30 space-y-2">
                  <span className="text-amber-400 font-bold text-xs">FLOAT RUNWAY</span>
                  <h4 className="font-bold text-white text-sm">Weekend Top-Up Projection</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Available balance covers 4.2 days of run rate.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: SETTLEMENT */}
          {activeTab === "settlement" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <FileSpreadsheet className="w-5 h-5 text-rose-400" />
                <span>8. T+1 Recon & GST Breakdown</span>
              </h2>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden font-mono text-xs">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-900 text-slate-400 font-sans border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">INVOICE NO</th>
                      <th className="py-3 px-4">DATE & PARTNER</th>
                      <th className="py-3 px-4">GROSS VOLUME</th>
                      <th className="py-3 px-4">SUBZO TAKE RATE (3%)</th>
                      <th className="py-3 px-4">GST (18%)</th>
                      <th className="py-3 px-4">NET DISBURSED</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {settlements.map((item) => (
                      <tr key={item.cycleId} className="hover:bg-slate-800/30">
                        <td className="py-4 px-4 font-bold text-teal-400">{item.invoiceNo}</td>
                        <td className="py-4 px-4 font-sans text-slate-200">{item.partner}</td>
                        <td className="py-4 px-4 font-bold text-white">₹{item.grossVolume.toLocaleString("en-IN")}</td>
                        <td className="py-4 px-4 text-emerald-400">+₹{item.subzoTakeRate.toLocaleString("en-IN")}</td>
                        <td className="py-4 px-4 text-amber-400">₹{item.gstAmount.toLocaleString("en-IN")}</td>
                        <td className="py-4 px-4 font-bold text-white">₹{item.partnerNet.toLocaleString("en-IN")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
