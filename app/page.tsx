"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  Ticket,
  ArrowRight,
  Code2,
  Lock,
  Sparkles,
  Gift,
  Award,
  CreditCard,
  Copy,
  Check
} from "lucide-react";

export default function SubzoLandingPage() {
  const [copied, setCopied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | "OTT" | "GAMING" | "LIFESTYLE" | "AI">("ALL");

  const copySnippet = () => {
    navigator.clipboard.writeText(`curl -X POST https://subzo.in/api/provision \\
  -H "Authorization: Bearer sbz_live_sk_..." \\
  -H "Content-Type: application/json" \\
  -d '{"skuCode":"SKU-HOTSTAR-12M","msisdn":"+919876543210"}'`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const brands = [
    { name: "JioHotstar", category: "OTT", plan: "Super & Premium 12M", badge: "Instant MSISDN / Voucher", bg: "from-blue-600/20 to-indigo-600/10", border: "border-blue-500/30", color: "text-blue-400" },
    { name: "Amazon Prime", category: "OTT", plan: "Annual Membership", badge: "Voucher Delivery", bg: "from-amber-600/20 to-orange-600/10", border: "border-amber-500/30", color: "text-amber-400" },
    { name: "SonyLIV", category: "OTT", plan: "12M Premium All Access", badge: "Direct OTT Provision", bg: "from-sky-600/20 to-blue-600/10", border: "border-sky-500/30", color: "text-sky-400" },
    { name: "ZEE5", category: "OTT", plan: "All Access Annual", badge: "Instant Activation", bg: "from-purple-600/20 to-pink-600/10", border: "border-purple-500/30", color: "text-purple-400" },
    { name: "Swiggy One", category: "LIFESTYLE", plan: "3M & 12M Membership", badge: "Encrypted Coupon", bg: "from-orange-600/20 to-red-600/10", border: "border-orange-500/30", color: "text-orange-400" },
    { name: "Aha Video", category: "OTT", plan: "Gold & Annual Telugu/Tamil", badge: "Direct Provision", bg: "from-red-600/20 to-orange-600/10", border: "border-red-500/30", color: "text-red-400" },
    { name: "Klikk", category: "OTT", plan: "Regional 12M Subscription", badge: "Instant Voucher", bg: "from-emerald-600/20 to-teal-600/10", border: "border-emerald-500/30", color: "text-emerald-400" },
    { name: "Xbox Game Pass", category: "GAMING", plan: "Ultimate & Core (PC/Console)", badge: "Digital Code Vault", bg: "from-green-600/20 to-emerald-600/10", border: "border-green-500/30", color: "text-green-400" },
    { name: "PlayStation (PSN)", category: "GAMING", plan: "Wallet Top-up & Plus", badge: "Instant Pin Issue", bg: "from-blue-700/20 to-indigo-700/10", border: "border-blue-500/30", color: "text-blue-300" },
    { name: "AI Subscriptions", category: "AI", plan: "ChatGPT Plus / Perplexity / Gemini", badge: "Corporate API Keys", bg: "from-teal-600/20 to-cyan-600/10", border: "border-teal-500/30", color: "text-teal-300" },
  ];

  const filteredBrands = selectedCategory === "ALL" 
    ? brands 
    : brands.filter(b => b.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Main Header */}
      <header className="border-b border-slate-800/60 sticky top-0 z-40 bg-slate-950/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
              S
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Subzo</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold text-slate-400">
            <a href="#brands" className="hover:text-white transition">Catalog</a>
            <a href="#usecases" className="hover:text-white transition">Use Cases</a>
            <a href="#architecture" className="hover:text-white transition">Fulfillment Rails</a>
            <Link href="/docs" className="hover:text-white transition">API Docs</Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link
              href="/admin-login"
              className="text-xs font-semibold px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 transition"
            >
              Sign In
            </Link>
            <Link
              href="/login"
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition flex items-center space-x-1.5"
            >
              <span>Partner Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-slate-800/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(255,255,255,0))]"></div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>One Integration. Unlimited Digital Subscriptions.</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            The Digital Subscription Platform for <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-300 bg-clip-text text-transparent">
              Credit Cards, Rewards, Loyalty & Giveaways
            </span>
          </h1>

          <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Provision OTT memberships, lifestyle benefits, gaming passes, and AI subscriptions instantly into your user experience. Built with dual fulfillment: direct MSISDN activation and secure voucher delivery.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide shadow-xl shadow-blue-600/25 transition flex items-center justify-center space-x-2"
            >
              <span>Launch Partner Console</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/docs"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-xs transition flex items-center justify-center space-x-2"
            >
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>Explore Developer Docs</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Target Use Cases */}
      <section id="usecases" className="py-16 border-b border-slate-800/50 max-w-7xl mx-auto px-6">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Built For Every Customer Touchpoint</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Powering Growth Across Multiple Industries</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Fintech & Cards</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bundle OTT and food subscriptions as card activation milestone perks and welcome vouchers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Loyalty & Rewards</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Let users burn reward points for genuine subscriptions with zero friction and instant activation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Gift className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Giveaways & Campaigns</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Run marketing sweepstakes, referral rewards, and user acquisition campaigns with brand perks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Corporate & Benefits</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automate monthly employee wellness, streaming, and AI tool allowances through wholesale bulk rails.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Catalog Grid */}
      <section id="brands" className="py-20 border-b border-slate-800/50 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Brand Network</span>
            <h2 className="text-3xl font-bold text-white mt-1">Available Subscriptions & Perks</h2>
            <p className="text-xs text-slate-400 mt-1">Direct wholesale allocations for Indian consumer enterprises.</p>
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            {(["ALL", "OTT", "LIFESTYLE", "GAMING", "AI"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-medium transition ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white font-semibold shadow"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {filteredBrands.map((brand, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl bg-gradient-to-br ${brand.bg} border ${brand.border} backdrop-blur-sm flex flex-col justify-between hover:scale-[1.02] transition-transform shadow-lg`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-base font-extrabold tracking-tight ${brand.color}`}>
                    {brand.name}
                  </span>
                  <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-950/60 border border-slate-800 text-slate-300">
                    {brand.category}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-200">{brand.plan}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                <span>{brand.badge}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Developer Architecture */}
      <section id="architecture" className="py-20 border-b border-slate-800/50 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Enterprise Architecture</span>
            <h2 className="text-3xl font-bold text-white leading-tight">Instant Provisioning via Simple REST Endpoints</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Integrate once and dispatch any subscription SKU across your mobile app, checkout flow, or reward portal.
            </p>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start space-x-3 p-3.5 bg-slate-900/60 rounded-xl border border-slate-800">
                <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Direct MSISDN Binding:</strong> Zero customer friction. OTT subscription links straight to customer mobile number.
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3.5 bg-slate-900/60 rounded-xl border border-slate-800">
                <Ticket className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Encrypted Voucher Vault:</strong> First-In-First-Out (FIFO) single-use codes revealed strictly upon customer redemption.
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-5 shadow-2xl font-mono text-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-[11px] text-slate-500">
              <span>POST /api/provision</span>
              <button
                onClick={copySnippet}
                className="hover:text-white transition flex items-center space-x-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy cURL"}</span>
              </button>
            </div>
            <pre className="text-cyan-300 leading-relaxed overflow-x-auto">
{`curl -X POST https://subzo.in/api/provision \\
  -H "Authorization: Bearer sbz_live_sk_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "partnerId": "PRT-101",
    "customerName": "Rahul Sharma",
    "msisdn": "+919876543210",
    "skuCode": "SKU-HOTSTAR-12M"
  }'`}
            </pre>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-xs">S</div>
          <span className="text-slate-300 font-semibold">Subzo Technologies India</span>
          <span>© 2026. All rights reserved.</span>
        </div>
        <div className="flex items-center space-x-6">
          <Link href="/login" className="hover:text-slate-300 transition">Partner Console</Link>
          <Link href="/admin-login" className="hover:text-slate-300 transition">Subzo Team Sign In</Link>
          <Link href="/docs" className="hover:text-slate-300 transition">API Docs</Link>
          <span className="font-mono text-emerald-400">● Systems 100% Operational</span>
        </div>
      </footer>
    </div>
  );
}