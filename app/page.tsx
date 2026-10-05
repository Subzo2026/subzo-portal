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
  PlusCircle,
  Building2,
  Activity,
  UserCog,
  Users,
  Sparkles,
  MapPin,
  ChevronRight,
  Lightbulb,
  ArrowRight
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
    "approvals" | "customers" | "predictions" | "settlement" | "catalog" | "developer" | "simulator" | "telemetry"
  >("approvals");

  const [partnerBalance, setPartnerBalance] = useState<number>(676045);
  const [lastActionMessage, setLastActionMessage] = useState<string | null>(null);

  // Partners Registry
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

  // Customer Orders Stream
  const [orders, setOrders] = useState<CustomerOrder[]>([
    {
      orderId: "ORD-98201",
      partnerId: "PRT-101",
      customerName: "Rahul Sharma",
      msisdn: "+91 98765 43210",
      email: "rahul.s@gmail.com",
      geography: "Bengaluru, KA",
      skuCode: "SKU-SLIV-12M",
      skuName: "SonyLIV Premium (Annual)",
      amount: 799,
      timestamp: "Today, 3:05 PM",
      status: "ACTIVE"
    },
    {
      orderId: "ORD-98202",
      partnerId: "PRT-101",
      customerName: "Rahul Sharma",
      msisdn: "+91 98765 43210",
      email: "rahul.s@gmail.com",
      geography: "Bengaluru, KA",
      skuCode: "SKU-ZEE5-12M",
      skuName: "Zee5 All-Access (Annual)",
      amount: 449,
      timestamp: "02 Oct 2026",
      status: "ACTIVE"
    },
    {
      orderId: "ORD-98190",
      partnerId: "PRT-101",
      customerName: "Pooja Verma",
      msisdn: "+91 91234 56789",
      email: "pooja.v@outlook.com",
      geography: "Mumbai, MH",
      skuCode: "SKU-HOTSTAR-SUP",
      skuName: "Disney+ Hotstar Super",
      amount: 865,
      timestamp: "Today, 1:22 PM",
      status: "ACTIVE"
    },
    {
      orderId: "ORD-97811",
      partnerId: "PRT-102",
      customerName: "Aman Mehta",
      msisdn: "+91 97654 32190",
      email: "aman.m@famapp.in",
      geography: "Delhi-NCR",
      skuCode: "SKU-SLIV-12M",
      skuName: "SonyLIV Premium (Annual)",
      amount: 799,
      timestamp: "Today, 11:15 AM",
      status: "ACTIVE"
    },
    {
      orderId: "ORD-97805",
      partnerId: "PRT-102",
      customerName: "Ananya Roy",
      msisdn: "+91 95432 10987",
      email: "",
      geography: "Kolkata, WB",
      skuCode: "SKU-ZEE5-12M",
      skuName: "Zee5 All-Access (Annual)",
      amount: 449,
      timestamp: "04 Oct 2026",
      status: "ACTIVE"
    }
  ]);

  // Catalog State with Predictive Metrics
  const [catalog, setCatalog] = useState<CatalogItem[]>([
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
    },
    {
      id: "SKU-SWIGGY-12M",
      name: "Swiggy One (Annual)",
      category: "Delivery & Lifestyle",
      mrp: 1499,
      subzoCost: 1100,
      partnerWholesale: 1199,
      marginPercent: 9.0,
      enabled: false,
      velocityScore: 40,
      wowGrowth: "Pending Launch"
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
      gstAmount: 2642,
      partnerNet: 471882,
      status: "SETTLED",
      ordersCount: 542,
      invoiceNo: "SBZ/26-27/INV-0481"
    },
    {
      cycleId: "SETTLE-2026-10-03",
      date: "03 Oct 2026",
      partner: "FamApp",
      grossVolume: 310500,
      subzoTakeRate: 9315,
      gstAmount: 1677,
      partnerNet: 299508,
      status: "SETTLED",
      ordersCount: 388,
      invoiceNo: "SBZ/26-27/INV-0479"
    }
  ];

  // Requests Data
  const [requests] = useState<TopupRequest[]>([
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
    }
  ]);

  // Simulation Form State
  const [simName, setSimName] = useState("Vikas Saxena");
  const [simPhone, setSimPhone] = useState("9811223344");
  const [simEmail, setSimEmail] = useState("vikas@cardholder.in");
  const [simCity, setSimCity] = useState("Bengaluru, KA");
  const [selectedSku, setSelectedSku] = useState("SKU-SLIV-12M");
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [simLogs, setSimLogs] = useState<string[]>([]);

  // Computed Aggregated Customers
  const filteredOrders = orders.filter((o) =>
    currentRole === "admin" ? true : o.partnerId === currentRole
  );

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

  const executeSimulation = () => {
    setIsProvisioning(true);
    setSimLogs(["[GATEWAY] Validating partner bearer token...", "[LEDGER] Verifying float adequacy..."]);
    setTimeout(() => {
      const chosenSku = catalog.find((c) => c.id === selectedSku)!;
      const newOrder: CustomerOrder = {
        orderId: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
        partnerId: currentRole === "admin" ? "PRT-101" : currentRole,
        customerName: simName,
        msisdn: `+91 ${simPhone}`,
        email: simEmail,
        geography: simCity,
        skuCode: chosenSku.id,
        skuName: chosenSku.name,
        amount: chosenSku.partnerWholesale,
        timestamp: "Just now",
        status: "ACTIVE"
      };

      setOrders((prev) => [newOrder, ...prev]);
      setPartnerBalance((prev) => prev - chosenSku.partnerWholesale);
      setSimLogs((prev) => [
        ...prev,
        `[CX-LEDGER] Tagged to customer ${simName} (${simPhone})`,
        `[PROVISION SUCCESS] ${chosenSku.name} activated. Order ID: ${newOrder.orderId}`,
        `[FLOAT DEBIT] Deducted ₹${chosenSku.partnerWholesale} from partner float.`
      ]);
      setIsProvisioning(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur px-6 py-3.5 flex items-center justify-between sticky top-0 z-50">
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

        {/* Dynamic Navigation */}
        <nav className="flex space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {currentRole === "admin" && (
            <button
              onClick={() => setActiveTab("approvals")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                activeTab === "approvals" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Treasury Float Desk
            </button>
          )}

          <button
            onClick={() => setActiveTab("customers")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 ${
              activeTab === "customers" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Customer 360° & Orders</span>
          </button>

          <button
            onClick={() => setActiveTab("predictions")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 ${
              activeTab === "predictions" ? "bg-purple-600 text-white shadow" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span>Sales Velocity & Next Steps</span>
          </button>

          <button
            onClick={() => setActiveTab("catalog")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === "catalog" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Wholesale Catalog
          </button>

          <button
            onClick={() => setActiveTab("settlement")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === "settlement" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            T+1 Recon & GST
          </button>

          <button
            onClick={() => setActiveTab("simulator")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === "simulator" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Provisioning Sandbox
          </button>
        </nav>

        {/* View Switcher */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5">
            <UserCog className="w-3.5 h-3.5 text-blue-400" />
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value as any)}
              className="bg-transparent text-xs text-slate-200 font-medium focus:outline-none cursor-pointer"
            >
              <option value="admin" className="bg-slate-900 text-white">Subzo Admin (Platform View)</option>
              <option value="PRT-101" className="bg-slate-900 text-blue-300">View as OneCard Enterprise</option>
              <option value="PRT-102" className="bg-slate-900 text-purple-300">View as FamApp Revenue</option>
            </select>
          </div>

          <div className="text-right">
            <p className="text-xs font-semibold text-slate-200">
              {currentRole === "admin" ? "Satish Chavan" : activePartnerData?.name}
            </p>
            <p className="text-[10px] text-emerald-400 font-mono">
              {currentRole === "admin" ? "Checker Role (Authorized)" : "Partner Portal Access"}
            </p>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="p-8 max-w-7xl mx-auto w-full space-y-6 flex-1">
        {/* Metric Cards */}
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
              {currentRole === "admin" ? "Real-time Virtual Account Pool" : `Linked to ${activePartnerData?.van}`}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>ACTIVE CUSTOMERS (CX)</span>
              <Users className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold font-mono text-white">{customerProfiles.length}</p>
            <p className="text-xs text-slate-400 mt-2">Unique MSISDNs provisioned</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>AVG SUBSCRIPTIONS PER CX</span>
              <Layers className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl font-bold font-mono text-purple-400">
              {(orders.length / (customerProfiles.length || 1)).toFixed(1)} Active
            </p>
            <p className="text-xs text-slate-400 mt-2">Cross-sell index</p>
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

        {/* TAB: CUSTOMER 360 & SUBSCRIBER INTELLIGENCE */}
        {activeTab === "customers" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span>Subscriber Profiles & Subscription Density</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Track individual customers, phone numbers, locations, and how many concurrent subscriptions they hold.
                </p>
              </div>
              <button
                onClick={() => alert("Exporting Customer 360 Master Record (CSV)...")}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center transition"
              >
                <Download className="w-3.5 h-3.5 mr-1.5 text-blue-400" /> Export Customer List (CSV)
              </button>
            </div>

            {/* Customers Master Table */}
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

            {/* Individual Orders Audit Stream */}
            <div className="space-y-3 pt-4">
              <h3 className="text-sm font-bold text-slate-300">Recent Customer Provisioning Orders</h3>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-900/80 text-slate-400 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-4">ORDER ID</th>
                      <th className="py-2.5 px-4">CUSTOMER</th>
                      <th className="py-2.5 px-4">PLAN / SKU</th>
                      <th className="py-2.5 px-4">AMOUNT</th>
                      <th className="py-2.5 px-4">LOCATION</th>
                      <th className="py-2.5 px-4 text-right">PROVISIONED AT</th>
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

        {/* TAB: PREDICTIVE VELOCITY & ANTICIPATED NEXT STEPS */}
        {activeTab === "predictions" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>Sales Velocity & Prescriptive Next Steps</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                The algorithm analyzes redemption velocity, cross-brand affinity, and float runway to anticipate high-yield commercial actions.
              </p>
            </div>

            {/* Prescriptive Strategic Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-900/30 to-slate-900 border border-blue-500/30 space-y-3">
                <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold">
                  <Lightbulb className="w-4 h-4" />
                  <span>WHOLESALE VOLUME LOCK</span>
                </div>
                <h4 className="font-bold text-white text-sm">Lock Tier-1 Rate for SonyLIV</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  SonyLIV velocity is surging at <strong>+48% WoW</strong> across OneCard & FamApp. You are 18 units away from qualifying for an upstream ₹715 buy-rate (saving +₹25/unit).
                </p>
                <div className="pt-2">
                  <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center transition">
                    Apply Volume Tier <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-900/30 to-slate-900 border border-purple-500/30 space-y-3">
                <div className="flex items-center space-x-2 text-purple-400 text-xs font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>CROSS-SELL AFFINITY ENGINE</span>
                </div>
                <h4 className="font-bold text-white text-sm">Activate Swiggy One Bundle</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong>73% of customers</strong> holding SonyLIV in Bengaluru & Mumbai have an affinity for food memberships. Enabling Swiggy One could yield ~₹1.2L additional GMV this month.
                </p>
                <div className="pt-2">
                  <button className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold flex items-center transition">
                    Enable Swiggy SKU <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-900/30 to-slate-900 border border-amber-500/30 space-y-3">
                <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold">
                  <Clock className="w-4 h-4" />
                  <span>FLOAT RUNWAY DEPLETION</span>
                </div>
                <h4 className="font-bold text-white text-sm">Weekend Top-Up Projection</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  At the current 24h burn rate, available float will cover <strong>4.2 days</strong>. Projected weekend demand will accelerate burn by 2.4x. Suggest client treasury initiate top-up by Friday.
                </p>
                <div className="pt-2">
                  <button className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold flex items-center transition">
                    Send Treasury Alert <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Velocity Leaderboard */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">SKU SALES VELOCITY MATRIX</span>
                <span className="text-[11px] text-slate-400 font-mono">Algorithm: EWMA 7-Day Velocity</span>
              </div>
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-900/60 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">BRAND & SKU</th>
                    <th className="py-3 px-4">CATEGORY</th>
                    <th className="py-3 px-4">VELOCITY SCORE</th>
                    <th className="py-3 px-4">WoW DEMAND SPIKE</th>
                    <th className="py-3 px-4">RECOMMENDED ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-sans">
                  {catalog.map((sku) => (
                    <tr key={sku.id} className="hover:bg-slate-800/30">
                      <td className="py-4 px-4 font-bold text-slate-200">{sku.name}</td>
                      <td className="py-4 px-4 text-slate-400">{sku.category}</td>
                      <td className="py-4 px-4 font-mono">
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-blue-500 h-full rounded-full"
                              style={{ width: `${sku.velocityScore}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-bold text-blue-400">{sku.velocityScore}/100</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-mono font-bold text-emerald-400">{sku.wowGrowth}</td>
                      <td className="py-4 px-4 text-slate-300">
                        {sku.velocityScore > 80
                          ? "Prioritize in partner in-app hero banner"
                          : sku.velocityScore > 50
                          ? "Package as reward points redemption incentive"
                          : "Enable to test demographic demand"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: WHOLESALE CATALOG */}
        {activeTab === "catalog" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Layers className="w-5 h-5 text-blue-400" />
                <span>Wholesale SKU Catalog</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Wholesale pricing and procurement spreads across digital subscription inventory.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden">
              <table className="w-full text-left text-xs border-collapse font-mono">
                <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800 font-sans">
                  <tr>
                    <th className="py-3 px-4">SKU CODE</th>
                    <th className="py-3 px-4">SERVICE & PLAN</th>
                    <th className="py-3 px-4">RETAIL MRP</th>
                    {currentRole === "admin" && <th className="py-3 px-4">SUBZO PROCUREMENT PRICE</th>}
                    <th className="py-3 px-4">PARTNER PRICE</th>
                    {currentRole === "admin" && <th className="py-3 px-4">SUBZO MARGIN</th>}
                    <th className="py-3 px-4 text-right">GATEWAY STATUS</th>
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
                      <td className="py-4 px-4 text-right font-sans">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: TREASURY FLOAT DESK (ADMIN) */}
        {activeTab === "approvals" && currentRole === "admin" && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              <span>Treasury Float Authorizations (Maker-Checker Desk)</span>
            </h2>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden font-mono text-xs">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800 font-sans">
                  <tr>
                    <th className="py-3 px-4">REQUEST ID</th>
                    <th className="py-3 px-4">PARTNER & VAN</th>
                    <th className="py-3 px-4">TOP-UP AMOUNT</th>
                    <th className="py-3 px-4">UTR REFERENCE</th>
                    <th className="py-3 px-4">CHECKER STATUS</th>
                    <th className="py-3 px-4 text-right">ACTION</th>
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
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Approved & Credited
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right font-sans text-slate-500">Immutable</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: T+1 RECONCILIATION */}
        {activeTab === "settlement" && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <FileSpreadsheet className="w-5 h-5 text-purple-400" />
              <span>T+1 Settlement & Tax Invoices</span>
            </h2>
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
                    <th className="py-3 px-4 text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {settlements.map((item) => (
                    <tr key={item.cycleId} className="hover:bg-slate-800/30">
                      <td className="py-4 px-4 font-bold text-purple-400">{item.invoiceNo}</td>
                      <td className="py-4 px-4 font-sans text-slate-200">{item.partner}</td>
                      <td className="py-4 px-4 font-bold text-white">₹{item.grossVolume.toLocaleString("en-IN")}</td>
                      <td className="py-4 px-4 text-emerald-400">+₹{item.subzoTakeRate.toLocaleString("en-IN")}</td>
                      <td className="py-4 px-4 text-amber-400">₹{item.gstAmount.toLocaleString("en-IN")}</td>
                      <td className="py-4 px-4 font-bold text-white">₹{item.partnerNet.toLocaleString("en-IN")}</td>
                      <td className="py-4 px-4 text-right font-sans">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Disbursed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: PROVISIONING SANDBOX */}
        {activeTab === "simulator" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="font-bold text-base text-white flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-blue-400" />
                <span>Simulate Real-Time Partner Activation</span>
              </h3>
              <p className="text-xs text-slate-400">
                Executes an instant API provisioning call that tags end-user (Cx) metadata, MSISDN, location, and debits partner float.
              </p>

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
                      <span>Provisioning & Tagging Customer...</span>
                    </>
                  ) : (
                    <span>Execute Activation</span>
                  )}
                </button>
              </div>
            </div>

            {/* Terminal Response */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col font-mono text-xs">
              <span className="text-slate-500 text-[11px] mb-3 pb-2 border-b border-slate-800">
                GATEWAY RESPONSE & LEDGER AUDIT STREAM
              </span>
              <div className="space-y-2 flex-1">
                {simLogs.length === 0 ? (
                  <p className="text-slate-600 italic">No provisioning calls executed yet. Click "Execute Activation" to test.</p>
                ) : (
                  simLogs.map((log, idx) => (
                    <p key={idx} className={log.includes("SUCCESS") ? "text-emerald-400 font-bold" : "text-slate-300"}>
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