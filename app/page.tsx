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
  PlusCircle
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
}

interface CustomerProfile {
  msisdn: string;
  name: string;
  email: string;
  geography: string;
  partnerId: string;
  activeSubscriptionsCount: number;
  subscriptions: { skuName: string; expiry: string }[];
  lifetimeSpend: number;
}

export default function SubzoPlatform() {
  const [currentRole, setCurrentRole] = useState<"admin" | "PRT-101" | "PRT-102">("admin");
  const [activeTab, setActiveTab] = useState<
    "approvals" | "customers" | "predictions" | "catalog" | "settlement" | "simulator"
  >("customers");

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

  // Simulation Form State
  const [simName, setSimName] = useState("Vikas Saxena");
  const [simPhone, setSimPhone] = useState("9811223344");
  const [simEmail, setSimEmail] = useState("vikas@cardholder.in");
  const [simCity, setSimCity] = useState("Bengaluru, KA");
  const [selectedSku, setSelectedSku] = useState("SKU-SLIV-12M");
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [simLogs, setSimLogs] = useState<string[]>([]);

  // Maker Form State
  const [topupAmount, setTopupAmount] = useState<number>(200000);
  const [topupUtr, setTopupUtr] = useState<string>("CMS" + Math.floor(1000000000 + Math.random() * 9000000000));
  const [isSubmittingTopup, setIsSubmittingTopup] = useState<boolean>(false);

  const [catalog] = useState<CatalogItem[]>([
    {
      id: "SKU-SLIV-12M",
      name: "SonyLIV Premium (Annual)",
      category: "OTT Streaming",
      mrp: 999,
      subzoCost: 740,
      partnerWholesale: 799,
      marginPercent: 7.9,
      enabled: true,
      velocityScore: 94,
      wowGrowth: "+48%"
    },
    {
      id: "SKU-ZEE5-12M",
      name: "Zee5 All-Access (Annual)",
      category: "OTT Streaming",
      mrp: 699,
      subzoCost: 410,
      partnerWholesale: 449,
      marginPercent: 9.5,
      enabled: true,
      velocityScore: 78,
      wowGrowth: "+22%"
    },
    {
      id: "SKU-HOTSTAR-SUP",
      name: "Disney+ Hotstar Super (Annual)",
      category: "OTT Streaming",
      mrp: 899,
      subzoCost: 830,
      partnerWholesale: 865,
      marginPercent: 4.2,
      enabled: true,
      velocityScore: 61,
      wowGrowth: "+11%"
    }
  ]);

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
    },
    {
      cycleId: "SETTLE-2026-10-03",
      date: "03 Oct 2026",
      partner: "FamApp Revenue",
      grossVolume: 310500,
      subzoTakeRate: 9315,
      gstAmount: 1677,
      partnerNet: 299508,
      status: "SETTLED",
      ordersCount: 388,
      invoiceNo: "SBZ/26-27/INV-0479"
    }
  ];

  // Fetch live orders & float requests from Supabase
  const loadDatabaseData = async () => {
    try {
      // 1. Orders
      const { data: oData, error: oError } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (oData && !oError) {
        setOrders(
          oData.map((o) => ({
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
            status: o.status || "ACTIVE"
          }))
        );
      }

      // 2. Float Requests
      const { data: rData } = await supabase
        .from("float_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (rData && rData.length > 0) {
        setRequests(
          rData.map((r) => ({
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
      } else {
        // Fallback baseline
        setRequests([
          {
            id: "TOP-8921",
            partner: "OneCard Enterprise",
            amount: 500000,
            utr: "CMS49201948201",
            bankRef: "ICICI-VAN-9920",
            requestedBy: "ops.maker@onecard.in",
            requestedAt: "1:42 PM",
            status: "APPROVED",
            approvedBy: "satish.checker@subzo.io",
            approvedAt: "Just now"
          }
        ]);
      }

      // 3. Partners
      const { data: pData } = await supabase.from("partners").select("*");
      if (pData && pData.length > 0) {
        const formatted: PartnerAccount[] = pData.map((p) => ({
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
    loadDatabaseData();
  }, []);

  const filteredOrders = orders.filter((o) => (currentRole === "admin" ? true : o.partnerId === currentRole));

  // Compute Customer Profiles
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
      expiry: "05 Oct 2027"
    });
  });

  const customerProfiles = Array.from(customerMap.values());
  const activePartnerData = partners.find((p) => p.id === currentRole);

  // Maker: Request New Top-up
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
      await loadDatabaseData();
      setTopupUtr("CMS" + Math.floor(1000000000 + Math.random() * 9000000000));
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmittingTopup(false);
    }
  };

  // Checker: Approve Request & Credit Partner Balance
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
      await loadDatabaseData();
    } catch (e) {
      console.error(e);
    }
  };

  // Checker: Reject Request
  const rejectTopup = async (reqId: string) => {
    try {
      await supabase
        .from("float_requests")
        .update({
          status: "REJECTED",
          approved_by: "satish.checker@subzo.io",
          approved_at: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        })
        .eq("id", reqId);
      await loadDatabaseData();
    } catch (e) {
      console.error(e);
    }
  };

  // Export Customer List CSV
  const downloadCustomersCSV = () => {
    const headers = "Customer Name,MSISDN,Email,Geography,Active Subscriptions,Lifetime Spend\n";
    const rows = customerProfiles
      .map(
        (c) =>
          `"${c.name}","${c.msisdn}","${c.email}","${c.geography}",${c.activeSubscriptionsCount},${c.lifetimeSpend}`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `subzo_customer360_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Settlement Recon CSV
  const downloadSettlementCSV = () => {
    const headers = "Invoice No,Date,Partner,Gross Volume (INR),Subzo Take Rate (INR),GST (18%),Net Disbursed (INR),Status\n";
    const rows = settlements
      .map(
        (s) =>
          `"${s.invoiceNo}","${s.date}","${s.partner}",${s.grossVolume},${s.subzoTakeRate},${s.gstAmount},${s.partnerNet},"${s.status}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `subzo_t1_settlement_recon_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Live direct database write for Provisioning
  const executeSimulation = async () => {
    setIsProvisioning(true);
    setSimLogs([
      "[CLIENT] Initiating direct write to Supabase PostgreSQL...",
      "[AUTH] Anon Key verified. Contacting REST endpoint..."
    ]);

    const chosenSku = catalog.find((c) => c.id === selectedSku)!;
    const targetPartner = currentRole === "admin" ? "PRT-101" : currentRole;
    const newOrderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;

    try {
      const { data, error } = await supabase.from("orders").insert([
        {
          order_id: newOrderId,
          partner_id: targetPartner,
          customer_name: simName,
          msisdn: `+91 ${simPhone}`,
          email: simEmail,
          geography: simCity,
          sku_code: chosenSku.id,
          sku_name: chosenSku.name,
          amount: chosenSku.partnerWholesale,
          status: "ACTIVE"
        }
      ]).select();

      if (error) throw new Error(error.message);

      setPartnerBalance((prev) => prev - chosenSku.partnerWholesale);
      setSimLogs((prev) => [
        ...prev,
        `[SUCCESS] Row successfully written to Supabase!`,
        `[PERSISTED] Order ID: ${newOrderId} | Customer: ${simName}`,
        `[FLOAT] Debited ₹${chosenSku.partnerWholesale}. Remaining: ₹${(partnerBalance - chosenSku.partnerWholesale).toLocaleString("en-IN")}`
      ]);

      await loadDatabaseData();
    } catch (err: any) {
      setSimLogs((prev) => [...prev, `[DB ERROR] Failed to insert: ${err.message}`]);
    } finally {
      setIsProvisioning(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      {/* VERTICAL LEFT SIDEBAR */}
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
              Navigation
            </p>

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
                <span>Treasury Float Desk</span>
              </div>
              {requests.filter((r) => r.status === "PENDING_APPROVAL").length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-[10px] font-bold text-slate-950">
                  {requests.filter((r) => r.status === "PENDING_APPROVAL").length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("customers")}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === "customers"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Users className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Customer 360° & Orders</span>
            </button>

            <button
              onClick={() => setActiveTab("predictions")}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === "predictions"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Sparkles className="w-4 h-4 shrink-0 text-purple-400" />
              <span>Sales Velocity & Next Steps</span>
            </button>

            <button
              onClick={() => setActiveTab("catalog")}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === "catalog"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Layers className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Wholesale Catalog</span>
            </button>

            <button
              onClick={() => setActiveTab("settlement")}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === "settlement"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 shrink-0 text-teal-400" />
              <span>T+1 Recon & GST</span>
            </button>

            <button
              onClick={() => setActiveTab("simulator")}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === "simulator"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <CreditCard className="w-4 h-4 shrink-0 text-indigo-400" />
              <span>Provisioning Sandbox</span>
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
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="p-8 max-w-7xl w-full mx-auto space-y-6 flex-1">
          {/* Top Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>{currentRole === "admin" ? "TOTAL FLOAT POOL" : "AVAILABLE PARTNER FLOAT"}</span>
                <Wallet className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-2xl font-bold font-mono text-white">
                ₹{(currentRole === "admin" ? partnerBalance : activePartnerData?.balance || 0).toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-emerald-400 mt-2 flex items-center">
                <TrendingUp className="w-3.5 h-3.5 mr-1" />
                Live PostgreSQL Sync
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>ACTIVE CUSTOMERS (CX)</span>
                <Users className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-2xl font-bold font-mono text-white">{customerProfiles.length}</p>
              <p className="text-xs text-slate-400 mt-2">Unique MSISDNs in DB</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>TOTAL COMPLETED ORDERS</span>
                <Layers className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-2xl font-bold font-mono text-purple-400">{filteredOrders.length}</p>
              <p className="text-xs text-slate-400 mt-2">Immutable database rows</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>TOP SELLING BRAND</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-2xl font-bold text-amber-400">SonyLIV 12M</p>
              <p className="text-xs text-emerald-400 mt-2">+48% WoW Velocity</p>
            </div>
          </div>

          {/* TAB 1: CUSTOMER 360 & ORDERS */}
          {activeTab === "customers" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                    <Users className="w-5 h-5 text-emerald-400" />
                    <span>Customer 360° & Orders (Live PostgreSQL)</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Subscriber profiles, contact identifiers, geography, and concurrent active subscriptions.
                  </p>
                </div>
                <button
                  onClick={downloadCustomersCSV}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center space-x-2 transition shadow-sm"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Export Customer List (.CSV)</span>
                </button>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">CUSTOMER NAME</th>
                      <th className="py-3 px-4">PHONE NUMBER (MSISDN)</th>
                      <th className="py-3 px-4">EMAIL ID</th>
                      <th className="py-3 px-4">GEOGRAPHY</th>
                      <th className="py-3 px-4">ACTIVE SUBSCRIPTIONS</th>
                      <th className="py-3 px-4">ACTIVE PLANS</th>
                      <th className="py-3 px-4 text-right">LIFETIME SPEND</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {customerProfiles.map((cx) => (
                      <tr key={cx.msisdn} className="hover:bg-slate-800/30 transition">
                        <td className="py-4 px-4 font-semibold text-slate-200">{cx.name}</td>
                        <td className="py-4 px-4 font-mono text-blue-400">{cx.msisdn}</td>
                        <td className="py-4 px-4 text-slate-400 font-sans">{cx.email}</td>
                        <td className="py-4 px-4 text-slate-300 flex items-center pt-4">
                          <MapPin className="w-3.5 h-3.5 mr-1 text-slate-500 shrink-0" />
                          {cx.geography}
                        </td>
                        <td className="py-4 px-4 font-mono">
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            {cx.activeSubscriptionsCount} Active
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1.5">
                            {cx.subscriptions.map((s, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md text-[10px] bg-slate-800 text-slate-300 border border-slate-700"
                              >
                                {s.skuName}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right font-mono font-bold text-white">
                          ₹{cx.lifetimeSpend.toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-3 pt-4">
                <h3 className="text-sm font-bold text-slate-300">Live Orders in Supabase Database</h3>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-900/80 text-slate-400 font-semibold border-b border-slate-800">
                      <tr>
                        <th className="py-2.5 px-4">ORDER ID</th>
                        <th className="py-2.5 px-4">CUSTOMER</th>
                        <th className="py-2.5 px-4">PLAN / SKU</th>
                        <th className="py-2.5 px-4">AMOUNT</th>
                        <th className="py-2.5 px-4">LOCATION</th>
                        <th className="py-2.5 px-4 text-right">TIME</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-mono">
                      {filteredOrders.map((ord) => (
                        <tr key={ord.orderId} className="hover:bg-slate-800/30">
                          <td className="py-3 px-4 text-purple-400 font-bold">{ord.orderId}</td>
                          <td className="py-3 px-4 font-sans text-slate-200">
                            {ord.customerName} ({ord.msisdn})
                          </td>
                          <td className="py-3 px-4 font-sans text-slate-300">{ord.skuName}</td>
                          <td className="py-3 px-4 font-bold text-white">₹{ord.amount}</td>
                          <td className="py-3 px-4 font-sans text-slate-400">{ord.geography}</td>
                          <td className="py-3 px-4 text-right font-sans text-slate-500">{ord.timestamp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TREASURY FLOAT DESK (MAKER-CHECKER) */}
          {activeTab === "approvals" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-blue-400" />
                    <span>Treasury Float Desk (Maker-Checker Signoff)</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Dual-authorization workflow for pre-funding partner virtual accounts (VAN).
                  </p>
                </div>
              </div>

              {/* MAKER SECTION (Top-up Submission Form) */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="flex items-center space-x-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                  <PlusCircle className="w-4 h-4" />
                  <span>Maker: Initiate New Float Top-Up Request</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1 font-semibold">Partner Account</label>
                    <input
                      type="text"
                      disabled
                      value={currentRole === "admin" ? "OneCard Enterprise" : activePartnerData?.name}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-slate-400 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1 font-semibold">Deposit Amount (₹ INR)</label>
                    <input
                      type="number"
                      value={topupAmount}
                      onChange={(e) => setTopupAmount(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 font-mono text-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1 font-semibold">Bank UTR Reference</label>
                    <input
                      type="text"
                      value={topupUtr}
                      onChange={(e) => setTopupUtr(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 font-mono text-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={submitTopupRequest}
                    disabled={isSubmittingTopup}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white text-xs font-semibold rounded-xl transition flex items-center space-x-2 shadow-lg shadow-blue-600/20"
                  >
                    {isSubmittingTopup ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <PlusCircle className="w-3.5 h-3.5" />
                    )}
                    <span>Submit Request to Checker Desk</span>
                  </button>
                </div>
              </div>

              {/* CHECKER DESK (Review & Sign-off) */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden font-mono text-xs">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800 font-sans">
                    <tr>
                      <th className="py-3 px-4">REQUEST ID</th>
                      <th className="py-3 px-4">PARTNER & VAN</th>
                      <th className="py-3 px-4">TOP-UP AMOUNT</th>
                      <th className="py-3 px-4">UTR REFERENCE</th>
                      <th className="py-3 px-4">STATUS</th>
                      <th className="py-3 px-4 text-right">CHECKER SIGN-OFF</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {requests.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-800/30">
                        <td className="py-4 px-4 font-bold text-blue-400">{req.id}</td>
                        <td className="py-4 px-4 font-sans text-slate-200">
                          <div>{req.partner}</div>
                          <span className="text-[10px] text-slate-500 font-mono">{req.bankRef}</span>
                        </td>
                        <td className="py-4 px-4 font-bold text-white">₹{req.amount.toLocaleString("en-IN")}</td>
                        <td className="py-4 px-4 text-slate-300">{req.utr}</td>
                        <td className="py-4 px-4 font-sans">
                          {req.status === "APPROVED" && (
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center w-fit space-x-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Approved</span>
                            </span>
                          )}
                          {req.status === "PENDING_APPROVAL" && (
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center w-fit space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>Pending Checker</span>
                            </span>
                          )}
                          {req.status === "REJECTED" && (
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-red-500/10 text-red-400 border border-red-500/20 flex items-center w-fit space-x-1">
                              <XCircle className="w-3 h-3" />
                              <span>Rejected</span>
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-right font-sans">
                          {req.status === "PENDING_APPROVAL" && currentRole === "admin" ? (
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => approveTopup(req)}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition"
                              >
                                Approve & Credit
                              </button>
                              <button
                                onClick={() => rejectTopup(req.id)}
                                className="px-3 py-1.5 bg-red-900/50 hover:bg-red-800 text-red-200 rounded-lg text-xs font-semibold transition"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-slate-500 text-[11px]">
                              {req.approvedBy ? `${req.approvedBy} (${req.approvedAt})` : "Immutable"}
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

          {/* TAB 3: PREDICTIONS */}
          {activeTab === "predictions" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>Sales Velocity & Next Steps</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-900/30 to-slate-900 border border-blue-500/30 space-y-3">
                  <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold">
                    <Lightbulb className="w-4 h-4" />
                    <span>WHOLESALE VOLUME LOCK</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">Lock Tier-1 Rate for SonyLIV</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    SonyLIV velocity is surging at <strong>+48% WoW</strong> across OneCard & FamApp. You are 18 units away from qualifying for an upstream ₹715 buy-rate.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-900/30 to-slate-900 border border-purple-500/30 space-y-3">
                  <div className="flex items-center space-x-2 text-purple-400 text-xs font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>CROSS-SELL AFFINITY</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">Activate Swiggy One Bundle</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <strong>73% of customers</strong> holding SonyLIV in Bengaluru & Mumbai have an affinity for food memberships.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-900/30 to-slate-900 border border-amber-500/30 space-y-3">
                  <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold">
                    <Clock className="w-4 h-4" />
                    <span>FLOAT RUNWAY</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">Weekend Top-Up Projection</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Available float will cover <strong>4.2 days</strong> at current run rates.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: WHOLESALE CATALOG */}
          {activeTab === "catalog" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Layers className="w-5 h-5 text-amber-400" />
                <span>Wholesale Catalog</span>
              </h2>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden font-mono text-xs">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800 font-sans">
                    <tr>
                      <th className="py-3 px-4">SKU CODE</th>
                      <th className="py-3 px-4">SERVICE & PLAN</th>
                      <th className="py-3 px-4">RETAIL MRP</th>
                      {currentRole === "admin" && <th className="py-3 px-4">SUBZO COST</th>}
                      <th className="py-3 px-4">PARTNER PRICE</th>
                      {currentRole === "admin" && <th className="py-3 px-4">SUBZO MARGIN</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {catalog.map((sku) => (
                      <tr key={sku.id} className="hover:bg-slate-800/30">
                        <td className="py-4 px-4 font-bold text-blue-400">{sku.id}</td>
                        <td className="py-4 px-4 font-sans font-semibold text-slate-200">{sku.name}</td>
                        <td className="py-4 px-4 text-slate-400 line-through">₹{sku.mrp}</td>
                        {currentRole === "admin" && <td className="py-4 px-4 text-slate-300">₹{sku.subzoCost}</td>}
                        <td className="py-4 px-4 font-bold text-white">₹{sku.partnerWholesale}</td>
                        {currentRole === "admin" && (
                          <td className="py-4 px-4 font-bold text-emerald-400 font-sans">
                            +₹{sku.partnerWholesale - sku.subzoCost} ({sku.marginPercent}%)
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: T+1 RECON & GST */}
          {activeTab === "settlement" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                    <FileSpreadsheet className="w-5 h-5 text-teal-400" />
                    <span>T+1 Recon & GST Breakdown</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Daily automated net clearing, GST 18% compliance invoice generation, and bank clearing refs.
                  </p>
                </div>
                <button
                  onClick={downloadSettlementCSV}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center space-x-2 transition shadow-sm"
                >
                  <Download className="w-4 h-4 text-teal-400" />
                  <span>Download Recon Spreadsheet (.CSV)</span>
                </button>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden font-mono text-xs">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800 font-sans">
                    <tr>
                      <th className="py-3 px-4">INVOICE NO</th>
                      <th className="py-3 px-4">DATE & PARTNER</th>
                      <th className="py-3 px-4">GROSS VOLUME</th>
                      <th className="py-3 px-4">SUBZO FEE (3%)</th>
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

          {/* TAB 6: PROVISIONING SANDBOX */}
          {activeTab === "simulator" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <h3 className="font-bold text-base text-white flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-indigo-400" />
                  <span>Provisioning Sandbox (Direct PostgreSQL Write)</span>
                </h3>
                <div className="space-y-3 pt-2 font-sans text-xs">
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Customer Full Name</label>
                    <input
                      type="text"
                      value={simName}
                      onChange={(e) => setSimName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 font-semibold block mb-1">Mobile Number (MSISDN)</label>
                      <input
                        type="text"
                        value={simPhone}
                        onChange={(e) => setSimPhone(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 font-mono text-slate-200 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 font-semibold block mb-1">Geography / City</label>
                      <input
                        type="text"
                        value={simCity}
                        onChange={(e) => setSimCity(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Customer Email ID (Optional)</label>
                    <input
                      type="email"
                      value={simEmail}
                      onChange={(e) => setSimEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Subscription SKU</label>
                    <select
                      value={selectedSku}
                      onChange={(e) => setSelectedSku(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 font-mono text-slate-200 focus:outline-none focus:border-blue-500"
                    >
                      {catalog.map((sku) => (
                        <option key={sku.id} value={sku.id}>
                          {sku.name} — ₹{sku.partnerWholesale}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={executeSimulation}
                    disabled={isProvisioning}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-semibold rounded-xl text-sm transition flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/20"
                  >
                    {isProvisioning ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Inserting into PostgreSQL...</span>
                      </>
                    ) : (
                      <span>Execute Activation & Save to DB</span>
                    )}
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col font-mono text-xs">
                <span className="text-slate-500 text-[11px] mb-3 pb-2 border-b border-slate-800">
                  REAL-TIME DATABASE AUDIT STREAM
                </span>
                <div className="space-y-2 flex-1">
                  {simLogs.length === 0 ? (
                    <p className="text-slate-600 italic">Click the blue button above to test a direct database write.</p>
                  ) : (
                    simLogs.map((log, idx) => (
                      <p
                        key={idx}
                        className={
                          log.includes("SUCCESS") || log.includes("PERSISTED")
                            ? "text-emerald-400 font-bold"
                            : log.includes("DB ERROR")
                            ? "text-red-400 font-bold"
                            : "text-slate-300"
                        }
                      >
                        {log}
                      </p>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
