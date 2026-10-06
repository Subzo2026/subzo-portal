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
  Check,
  Tv,
  Gamepad2,
  Bot,
  Utensils
} from "lucide-react";

export default function SubzoLandingPage() {
  const [copied, setCopied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | "OTT" | "LIFESTYLE" | "GAMING" | "AI">("ALL");

  const copySnippet = () => {
    navigator.clipboard.writeText(`curl -X POST https://subzo.in/api/provision \\
  -H "Authorization: Bearer sbz_live_sk_..." \\
  -H "Content-Type: application/json" \\
  -d '{"skuCode":"SKU-HOTSTAR-12M","msisdn":"+919876543210"}'`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const platforms = [
    {
      title: "Fintech & Cards",
      icon: CreditCard,
      description:
        "Beyond activation milestone perks, power a native in-app subscription hub via Subzo API & SDK. Enable cardholders to discover, purchase, auto-renew, and split subscriptions using credit cards, UPI, or reward balances.",
      bg: "bg-blue-950/20 border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-950/30",
      iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20"
    },
    {
      title: "Loyalty & Rewards",
      icon: Award,
      description:
        "Enable frictionless 1-click points-to-perks redemption. Deliver instant OTT activations and lifestyle passes straight to consumer phone numbers with zero code-entry friction.",
      bg: "bg-purple-950/20 border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-950/30",
      iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/20"
    },
    {
      title: "Giveaways & Campaigns",
      icon: Gift,
      description:
        "Supercharge customer acquisition and referral campaigns with high-perceived-value digital subscriptions, issued dynamically with guaranteed single-use FIFO coupon security.",
      bg: "bg-emerald-950/20 border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-950/30",
      iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    },
    {
      title: "Corporate & Benefits",
      icon: Sparkles,
      description:
        "Automate monthly employee streaming, wellness allowances, and enterprise AI tooling passes through pre-funded corporate float rails and automated T+1 tax compliance.",
      bg: "bg-amber-950/20 border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-950/30",
      iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/20"
    }
  ];

  const brands = [
    {
      name: "JioHotstar",
      category: "OTT",
      plan: "Super & Premium 12M Tiers",
      badge: "Instant MSISDN / Voucher",
      content: "Cricket, HBO, Disney+ & regional blockbusters with 4K multi-screen support.",
      bg: "bg-blue-950/25 border-blue-500/25 hover:border-blue-400/50 hover:bg-blue-900/30",
      color: "text-blue-300",
      badgeColor: "bg-blue-500/10 text-blue-300 border-blue-500/20"
    },
    {
      name: "Amazon Prime",
      category: "OTT",
      plan: "Annual Full Access Membership",
      badge: "Voucher Delivery",
      content: "Prime Video 4K HDR streaming, free expedited shipping & Prime Music bundled.",
      bg: "bg-amber-950/25 border-amber-500/25 hover:border-amber-400/50 hover:bg-amber-900/30",
      color: "text-amber-300",
      badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/20"
    },
    {
      name: "SonyLIV",
      category: "OTT",
      plan: "12M Premium All Access",
      badge: "Direct OTT Provision",
      content: "UEFA Champions League, WWE Network, international movies & Sony originals.",
      bg: "bg-sky-950/25 border-sky-500/25 hover:border-sky-400/50 hover:bg-sky-900/30",
      color: "text-sky-300",
      badgeColor: "bg-sky-500/10 text-sky-300 border-sky-500/20"
    },
    {
      name: "ZEE5",
      category: "OTT",
      plan: "All Access Annual",
      badge: "Instant Activation",
      content: "500+ regional original series, live TV news, and expansive Indian cinema library.",
      bg: "bg-purple-950/25 border-purple-500/25 hover:border-purple-400/50 hover:bg-purple-900/30",
      color: "text-purple-300",
      badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/20"
    },
    {
      name: "Swiggy One",
      category: "LIFESTYLE",
      plan: "3M & 12M Membership",
      badge: "Encrypted Coupon",
      content: "Unlimited free food deliveries, Instamart grocery perks & Dineout dining discounts.",
      bg: "bg-orange-950/25 border-orange-500/25 hover:border-orange-400/50 hover:bg-orange-900/30",
      color: "text-orange-300",
      badgeColor: "bg-orange-500/10 text-orange-300 border-orange-500/20"
    },
    {
      name: "Aha Video",
      category: "OTT",
      plan: "Gold & Annual Telugu/Tamil",
      badge: "Direct Provision",
      content: "100% native regional Telugu & Tamil movies, exclusive chat shows, and theater hits.",
      bg: "bg-rose-950/25 border-rose-500/25 hover:border-rose-400/50 hover:bg-rose-900/30",
      color: "text-rose-300",
      badgeColor: "bg-rose-500/10 text-rose-300 border-rose-500/20"
    },
    {
      name: "Klikk",
      category: "OTT",
      plan: "Regional 12M Subscription",
      badge: "Instant Voucher",
      content: "Leading Bengali entertainment streaming hub with original web series and classics.",
      bg: "bg-emerald-950/25 border-emerald-500/25 hover:border-emerald-400/50 hover:bg-emerald-900/30",
      color: "text-emerald-300",
      badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
    },
    {
      name: "Xbox Game Pass",
      category: "GAMING",
      plan: "Ultimate & Core (PC/Console)",
      badge: "Digital Code Vault",
      content: "Day-one access to iconic franchises, EA Play catalog, and cloud gaming library.",
      bg: "bg-green-950/25 border-green-500/25 hover:border-green-400/50 hover:bg-green-900/30",
      color: "text-green-300",
      badgeColor: "bg-green-500/10 text-green-300 border-green-500/20"
    },
    {
      name: "PlayStation (PSN)",
      category: "GAMING",
      plan: "Wallet Top-up & Plus",
      badge: "Instant PIN Issue",
      content: "Online multiplayer access, monthly games catalog, and official PS Store credit.",
      bg: "bg-indigo-950/25 border-indigo-500/25 hover:border-indigo-400/50 hover:bg-indigo-900/30",
      color: "text-indigo-300",
      badgeColor: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20"
    },
    {
      name: "AI Subscriptions",
      category: "AI",
      plan: "ChatGPT Plus / Perplexity / Gemini",
      badge: "Corporate API Keys",
      content: "Frontier multimodal reasoning, developer workspaces, and research assistance tools.",
      bg: "bg-teal-950/25 border-teal-500/25 hover:border-teal-400/50 hover:bg-teal-900/30",
      color: "text-teal-300",
      badgeColor: "bg-teal-500/10 text-teal-300 border-teal-500/20"
    }
  ];

  const filteredBrands = selectedCategory === "ALL" 
    ? brands 
    : brands.filter(b => b.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
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

      {/* Target Use Cases (With Light-Tinted Themed Backgrounds) */}
      <section id="usecases" className="py-20 border-b border-slate-800/50 max-w-7xl mx-auto px-6">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Built For Every Customer Touchpoint</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Powering Growth Across Multiple Industries</h2>
          <p className="text-xs text-slate-400 max-w-2xl mx-auto">
            From co-branded card rewards to employee wellbeing programs and gamified acquisition flows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all duration-200 backdrop-blur-sm flex flex-col justify-between ${p.bg}`}
              >
                <div>
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 border ${p.iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{p.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Brand Catalog Grid (With Tailored Light Color Themes & Rich Brand Details) */}
      <section id="brands" className="py-20 border-b border-slate-800/50 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Brand Network</span>
            <h2 className="text-3xl font-bold text-white mt-1">Available Subscriptions & Perks</h2>
            <p className="text-xs text-slate-400 mt-1">Top-tier wholesale allocations directly integrated for Indian enterprise platforms.</p>
          </div>

          {/* Meaningful Ecosystem Filter */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1 hidden sm:inline">
              Top Tier & Niche Ecosystems:
            </span>
            {[
              { id: "ALL", label: "All Premium Catalog" },
              { id: "OTT", label: "Streaming & OTT" },
              { id: "LIFESTYLE", label: "Everyday Lifestyle" },
              { id: "GAMING", label: "Gaming Ecosystems" },
              { id: "AI", label: "Frontier AI Suites" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-medium transition whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? "bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30"
                    : "bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {filteredBrands.map((brand, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border backdrop-blur-md flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-lg ${brand.bg}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-base font-extrabold tracking-tight ${brand.color}`}>
                    {brand.name}
                  </span>
                  <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${brand.badgeColor}`}>
                    {brand.category}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-200">{brand.plan}</p>
                <p className="text-[11px] text-slate-300/80 mt-2 leading-relaxed">{brand.content}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-300">
                <span>{brand.badge}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400"></span>
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

      {/* Clean Footer (Redundant Links Removed) */}
      <footer className="py-12 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-xs">S</div>
          <span className="text-slate-300 font-semibold">Subzo Technologies India</span>
          <span>© 2026. All rights reserved.</span>
        </div>
        <p className="text-[11px] text-slate-500">
          Enterprise subscription distribution rails and digital voucher clearinghouse.
        </p>
      </footer>
    </div>
  );
}