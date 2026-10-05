"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  CheckCircle,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Download,
  Lock,
  UserCheck,
  KeyRound,
  FileSpreadsheet,
  Check,
  X,
  CreditCard,
  RefreshCw,
  Wallet,
  Copy,
  Eye,
  EyeOff,
  BellRing,
  Layers,
  Send,
  SlidersHorizontal
} from "lucide-react";

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
  partnerNet: number;
  status: "SETTLED" | "PENDING_RECON";
  ordersCount: number;
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
}

export default function SubzoPlatform() {
  const [activeTab, setActiveTab] = useState<"approvals" | "settlement" | "simulator" | "developer" | "catalog">("approvals");

  // Balances
  const [partnerBalance, setPartnerBalance] = useState<number>(676045);
  const [lastActionMessage, setLastActionMessage] = useState<string | null>(null);

  // Four-Eyes Float Requests
  const [requests, setRequests] = useState<TopupRequest[]>([
    {
      id: "TOP-8921",
      partner: "OneCard Enterprise",
      amount: 500000,
      utr: "CMS49201948201",
      bankRef: "ICICI-VAN-9920",
      requestedBy: "ops.maker@subzo.io",
      requestedAt: "1:42 PM (10 mins ago)",
      status: "APPROVED",
      approvedBy: "satish.checker@subzo.io",
      approvedAt: "Just now"
    },
    {
      id: "TOP-8919",
      partner: "FamApp Revenue",
      amount: 250000,
      utr: "CMS49190182740",
      bankRef: "ICICI-VAN-4811",
      requestedBy: "ops.maker@subzo.io",
      requestedAt: "11:15 AM",
      status: "APPROVED",
      approvedBy: "satish.checker@subzo.io",
      approvedAt: "11:20 AM"
    }
  ]);

  // Settlements Data
  const settlements: SettlementRecord[] = [
    {
      cycleId: "SETTLE-2026-10-04",
      date: "04 Oct 2026",
      partner: "OneCard Enterprise",
      grossVolume: 489200,
      subzoTakeRate: 14676,
      partnerNet: 474524,
      status: "SETTLED",
      ordersCount: 542
    },
    {
      cycleId: "SETTLE-2026-10-03",
      date: "03 Oct 2026",
      partner: "FamApp",
      grossVolume: 310500,
      subzoTakeRate: 9315,
      partnerNet: 301185,
      status: "SETTLED",
      ordersCount: 388
    },
    {
      cycleId: "SETTLE-2026-10-05 (Today)",
      date: "05 Oct 2026",
      partner: "OneCard Enterprise",
      grossVolume: 184500,
      subzoTakeRate: 5535,
      partnerNet: 178965,
      status: "PENDING_RECON",
      ordersCount: 204
    }
  ];

  // Catalog State
  const [catalog, setCatalog] = useState<CatalogItem[]>([
    {
      id: "SKU-SLIV-12M",
      name: "SonyLIV Premium (Annual)",
      category: "OTT Streaming",
      mrp: 999,
      subzoCost: 740,
      partnerWholesale: 799,
      marginPercent: 7.9,
      enabled: true
    },
    {
      id: "SKU-ZEE5-12M",
      name: "Zee5 All-Access (Annual)",
      category: "OTT Streaming",
      mrp: 699,
      subzoCost: 410,
      partnerWholesale: 449,
      marginPercent: 9.5,
      enabled: true
    },
    {
      id: "SKU-HOTSTAR-SUP",
      name: "Disney+ Hotstar Super (Annual)",
      category: "OTT Streaming",
      mrp: 899,
      subzoCost: 830,
      partnerWholesale: 865,
      marginPercent: 4.2,
      enabled: true
    },
    {
      id: "SKU-SWIGGY-12M",
      name: "Swiggy One (Annual)",
      category: "Delivery & Lifestyle",
      mrp: 1499,
      subzoCost: 1100,
      partnerWholesale: 1199,
      marginPercent: 9.0,
      enabled: false
    }
  ]);

  // Developer Keys & Webhooks State
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("https://api.onecard.in/webhooks/subzo-events");
  const [webhookTestStatus, setWebhookTestStatus] = useState<string | null>(null);

  // Simulation State
  const [phoneNumber, setPhoneNumber] = useState("9876543210");
  const [selectedSku, setSelectedSku] = useState("SONY_LIV_12M");
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [simLogs, setSimLogs] = useState<string[]>([]);

  // Handlers
  const handleApprove = (id: string, amount: number) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status: "APPROVED",
              approvedBy: "satish.checker@subzo.io",
              approvedAt: "Just now"
            }
          : req
      )
    );
    setPartnerBalance((prev) => prev + amount);
    setLastActionMessage(`Successfully approved UTR & credited ₹${amount.toLocaleString("en-IN")} to partner float.`);
    setTimeout(() => setLastActionMessage(null), 5000);
  };

  const handleReject = (id: string) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "REJECTED" } : req))
    );
  };

  const toggleSku = (id: string) => {
    setCatalog((prev) =>
      prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item))
    );
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText("sbz_live_sec_99410bf982ad4e07a3c7");
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const testWebhook = () => {
    setWebhookTestStatus("DISPATCHING...");
    setTimeout(() => {
      setWebhookTestStatus("HTTP 200 OK — Signature Verified (114ms)");
      setTimeout(() => setWebhookTestStatus(null), 4000);
    }, 800);
  };

  const triggerSimulation = () => {
    setIsProvisioning(true);
    setSimLogs(["[SUBZO GATEWAY] Authenticating partner API key...", "[LEDGER] Verifying float adequacy... OK"]);
    setTimeout(() => {
      setSimLogs((prev) => [
        ...prev,
        "[OTT PROVISION] Dispatching payload to OTT Server...",
        `[OTT PROVISION] +91 ${phoneNumber} successfully provisioned on ${selectedSku}.`,
        "[FLOAT DEBIT] Deducted ₹799 from float. Ledger balance updated."
      ]);
      setPartnerBalance((prev) => prev - 799);
      setIsProvisioning(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
            S
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight">Subzo</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Core Gateway
              </span>
            </div>
            <p className="text-xs text-slate-400">B2B Digital Subscription Rails & Ledger</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab("approvals")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === "approvals" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Treasury Float Authorizations
          </button>
          <button
            onClick={() => setActiveTab("settlement")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === "settlement" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            T+1 Reconciliation
          </button>
          <button
            onClick={() => setActiveTab("catalog")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === "catalog" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            SKU Catalog & Margins
          </button>
          <button
            onClick={() => setActiveTab("developer")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === "developer" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            API Keys & Webhooks
          </button>
          <button
            onClick={() => setActiveTab("simulator")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === "simulator" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Provisioning Sandbox
          </button>
        </nav>

        {/* User Identity */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-xs font-semibold text-slate-200">Satish Chavan</p>
            <p className="text-[11px] text-emerald-400 font-mono flex items-center justify-end">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1.5 animate-pulse"></span>
              Checker Role (Authorized)
            </p>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="p-8 max-w-7xl mx-auto w-full space-y-6 flex-1">
        {/* Banner Alert */}
        {lastActionMessage && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{lastActionMessage}</span>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>ACTIVE FLOAT POOL</span>
              <Wallet className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-2xl font-bold font-mono text-white">
              ₹{partnerBalance.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-emerald-400 mt-2 flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-1" /> Real-time Virtual Account Pool
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>PENDING APPROVALS</span>
              <Lock className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl font-bold font-mono text-amber-400">
              ₹
              {requests
                .filter((r) => r.status === "PENDING_APPROVAL")
                .reduce((acc, r) => acc + r.amount, 0)
                .toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-slate-400 mt-2">Requires Checker dual-key signoff</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>TODAY'S PROVISIONED GMV</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold font-mono text-white">₹1,84,500</p>
            <p className="text-xs text-slate-400 mt-2">204 Instant API fulfillments</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>FLOAT HEALTH</span>
              <BellRing className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold font-mono text-emerald-400">Optimal</p>
            <p className="text-xs text-slate-400 mt-2">Low-balance threshold: ₹50,000</p>
          </div>
        </div>

        {/* TAB 1: TREASURY FLOAT AUTHORIZATIONS */}
        {activeTab === "approvals" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-blue-400" />
                  <span>Treasury Float Authorizations (Maker-Checker Desk)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  In compliance with payment operations regulations, top-up requests initiated by the Maker cannot credit partner float until verified by the Checker.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">REQUEST ID</th>
                    <th className="py-3 px-4">PARTNER & VAN</th>
                    <th className="py-3 px-4">TOP-UP AMOUNT</th>
                    <th className="py-3 px-4">UTR REFERENCE</th>
                    <th className="py-3 px-4">MAKER (INITIATED BY)</th>
                    <th className="py-3 px-4">CHECKER STATUS</th>
                    <th className="py-3 px-4 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  {requests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-800/30 transition">
                      <td className="py-4 px-4 font-bold text-blue-400">{req.id}</td>
                      <td className="py-4 px-4 font-sans">
                        <p className="font-semibold text-slate-200">{req.partner}</p>
                        <p className="text-[11px] text-slate-500 font-mono">{req.bankRef}</p>
                      </td>
                      <td className="py-4 px-4 font-bold text-slate-100 text-sm">
                        ₹{req.amount.toLocaleString("en-IN")}
                      </td>
                      <td className="py-4 px-4 text-slate-300">{req.utr}</td>
                      <td className="py-4 px-4 font-sans">
                        <p className="text-slate-300">{req.requestedBy}</p>
                        <p className="text-[10px] text-slate-500">{req.requestedAt}</p>
                      </td>
                      <td className="py-4 px-4">
                        {req.status === "PENDING_APPROVAL" && (
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-sans font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            <Clock className="w-3 h-3 mr-1" /> Awaiting Checker
                          </span>
                        )}
                        {req.status === "APPROVED" && (
                          <div>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-sans font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              <Check className="w-3 h-3 mr-1" /> Approved & Credited
                            </span>
                            <p className="text-[10px] text-slate-500 font-sans mt-0.5">
                              by {req.approvedBy}
                            </p>
                          </div>
                        )}
                        {req.status === "REJECTED" && (
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-sans font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
                            <X className="w-3 h-3 mr-1" /> Rejected
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-right">
                        {req.status === "PENDING_APPROVAL" ? (
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => handleApprove(req.id, req.amount)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-sans font-semibold text-xs flex items-center transition shadow-md shadow-emerald-600/20"
                            >
                              <UserCheck className="w-3.5 h-3.5 mr-1" /> Approve Float
                            </button>
                            <button
                              onClick={() => handleReject(req.id)}
                              className="px-2.5 py-1.5 bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg text-xs transition"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-slate-600 font-sans text-xs">Immutable</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: T+1 SETTLEMENT */}
        {activeTab === "settlement" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                  <FileSpreadsheet className="w-5 h-5 text-purple-400" />
                  <span>Automated T+1 Settlement & Margin Split Ledger</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Daily net batch clearing calculating gross vouchers, wholesale supplier costs, and partner payouts.
                </p>
              </div>
              <button
                onClick={() => alert("Downloading formatted RBI-standard CSV batch reconciliation file...")}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center transition"
              >
                <Download className="w-3.5 h-3.5 mr-1.5 text-blue-400" /> Export Recon Report (CSV)
              </button>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">CYCLE ID</th>
                    <th className="py-3 px-4">SETTLEMENT DATE</th>
                    <th className="py-3 px-4">PARTNER</th>
                    <th className="py-3 px-4">ORDERS</th>
                    <th className="py-3 px-4">GROSS VOLUME</th>
                    <th className="py-3 px-4">SUBZO TAKE (3%)</th>
                    <th className="py-3 px-4">NET SETTLEMENT</th>
                    <th className="py-3 px-4 text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  {settlements.map((item) => (
                    <tr key={item.cycleId} className="hover:bg-slate-800/30 transition">
                      <td className="py-4 px-4 font-bold text-purple-400">{item.cycleId}</td>
                      <td className="py-4 px-4 text-slate-300 font-sans">{item.date}</td>
                      <td className="py-4 px-4 font-sans font-semibold text-slate-200">{item.partner}</td>
                      <td className="py-4 px-4 text-slate-300">{item.ordersCount} txns</td>
                      <td className="py-4 px-4 font-bold text-slate-200">₹{item.grossVolume.toLocaleString("en-IN")}</td>
                      <td className="py-4 px-4 text-emerald-400 font-bold">+₹{item.subzoTakeRate.toLocaleString("en-IN")}</td>
                      <td className="py-4 px-4 font-bold text-white">₹{item.partnerNet.toLocaleString("en-IN")}</td>
                      <td className="py-4 px-4 text-right font-sans">
                        {item.status === "SETTLED" ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Disbursed
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            Reconciling (T+1)
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

        {/* TAB 3: SKU CATALOG & MARGINS */}
        {activeTab === "catalog" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Layers className="w-5 h-5 text-blue-400" />
                  <span>Wholesale SKU Catalog & Margin Matrix</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Manage live OTT provisions, wholesale buy-rates from aggregators, and partner distribution pricing.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">SKU CODE</th>
                    <th className="py-3 px-4">SERVICE & PLAN</th>
                    <th className="py-3 px-4">RETAIL MRP</th>
                    <th className="py-3 px-4">SUBZO PROCUREMENT PRICE</th>
                    <th className="py-3 px-4">PARTNER PRICE</th>
                    <th className="py-3 px-4">SUBZO MARGIN</th>
                    <th className="py-3 px-4 text-right">GATEWAY STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  {catalog.map((sku) => (
                    <tr key={sku.id} className="hover:bg-slate-800/30 transition">
                      <td className="py-4 px-4 font-bold text-blue-400">{sku.id}</td>
                      <td className="py-4 px-4 font-sans">
                        <p className="font-semibold text-slate-200">{sku.name}</p>
                        <p className="text-[11px] text-slate-500">{sku.category}</p>
                      </td>
                      <td className="py-4 px-4 text-slate-400 line-through">₹{sku.mrp}</td>
                      <td className="py-4 px-4 text-slate-300">₹{sku.subzoCost}</td>
                      <td className="py-4 px-4 font-bold text-white">₹{sku.partnerWholesale}</td>
                      <td className="py-4 px-4 font-bold text-emerald-400 font-sans">
                        +₹{sku.partnerWholesale - sku.subzoCost} ({sku.marginPercent}%)
                      </td>
                      <td className="py-4 px-4 text-right font-sans">
                        <button
                          onClick={() => toggleSku(sku.id)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                            sku.enabled
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-slate-800 text-slate-500 border border-slate-700"
                          }`}
                        >
                          {sku.enabled ? "Active" : "Disabled"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: API KEYS & WEBHOOKS */}
        {activeTab === "developer" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* API Keys */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="font-bold text-base text-white flex items-center space-x-2">
                <KeyRound className="w-5 h-5 text-blue-400" />
                <span>Production API Gateway Credentials</span>
              </h3>
              <p className="text-xs text-slate-400">
                Use this bearer token to authenticate programmatic activation requests from your backend microservices.
              </p>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-1">
                    Partner Client ID
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="subzo_client_onecard_prod_9921"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-300 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-1">
                    Live Secret Key
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type={apiKeyVisible ? "text" : "password"}
                      readOnly
                      value="sbz_live_sec_99410bf982ad4e07a3c7"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-300 font-mono"
                    />
                    <button
                      onClick={() => setApiKeyVisible(!apiKeyVisible)}
                      className="px-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400"
                    >
                      {apiKeyVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={copyApiKey}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-semibold text-white flex items-center shrink-0"
                    >
                      <Copy className="w-3.5 h-3.5 mr-1" />
                      {copiedKey ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Webhook Endpoints */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="font-bold text-base text-white flex items-center space-x-2">
                <Send className="w-5 h-5 text-purple-400" />
                <span>Real-Time Webhook Dispatcher</span>
              </h3>
              <p className="text-xs text-slate-400">
                Subzo dispatches cryptographic events (`subscription.activated`, `float.depleted`) directly to this endpoint.
              </p>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-1">
                    HTTPS Callback URL
                  </label>
                  <input
                    type="text"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={testWebhook}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center transition border border-slate-700"
                  >
                    <RefreshCw className="w-3.5 h-3.5 mr-1.5 text-purple-400" /> Dispatch Test Event Ping
                  </button>
                  {webhookTestStatus && (
                    <span className="text-xs font-mono text-emerald-400 animate-in fade-in">
                      {webhookTestStatus}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PROVISIONING SANDBOX */}
        {activeTab === "simulator" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="font-bold text-base text-white flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-blue-400" />
                <span>Simulate Instant Partner Activation</span>
              </h3>
              <p className="text-xs text-slate-400">
                Trigger a live API request payload mimicking OneCard or FamApp's backend hitting Subzo's gateway.
              </p>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-1">
                    Subscriber Mobile Number (MSISDN)
                  </label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-200 font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-1">
                    Subscription SKU
                  </label>
                  <select
                    value={selectedSku}
                    onChange={(e) => setSelectedSku(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-200 font-mono focus:outline-none focus:border-blue-500"
                  >
                    <option value="SONY_LIV_12M">SonyLIV Premium (12M) - ₹799</option>
                    <option value="ZEE5_ALL_ACCESS_12M">Zee5 All-Access (12M) - ₹449</option>
                    <option value="DISNEY_HOTSTAR_SUPER">Disney+ Hotstar Super (12M) - ₹899</option>
                  </select>
                </div>

                <button
                  onClick={triggerSimulation}
                  disabled={isProvisioning}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-semibold rounded-xl text-sm transition flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/20"
                >
                  {isProvisioning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Provisioning SKU via OTT Gateway...</span>
                    </>
                  ) : (
                    <span>Execute Test Activation</span>
                  )}
                </button>
              </div>
            </div>

            {/* Realtime Terminal output */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col font-mono text-xs">
              <span className="text-slate-500 text-[11px] mb-3 pb-2 border-b border-slate-800">
                GATEWAY RESPONSE & LEDGER AUDIT STREAM
              </span>
              <div className="space-y-2 flex-1">
                {simLogs.length === 0 ? (
                  <p className="text-slate-600 italic">No provisioning calls executed yet. Click "Execute Test Activation" to test.</p>
                ) : (
                  simLogs.map((log, idx) => (
                    <p key={idx} className={log.includes("successfully") ? "text-emerald-400 font-bold" : "text-slate-300"}>
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
  );
}