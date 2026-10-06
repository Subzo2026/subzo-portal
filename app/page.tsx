"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  Ticket,
  Layers,
  ArrowRight,
  Code2,
  Lock,
  ChevronRight,
  Server,
  FileCheck,
  Building2,
  ExternalLink,
  Copy,
  Check,
  CreditCard,
  Award
} from "lucide-react";

export default function SubzoLandingPage() {
  const [copied, setCopied] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [portalKey, setPortalKey] = useState("");

  const copySnippet = () => {
    navigator.clipboard.writeText(`curl -X POST https://subzo.in/api/provision \\
  -H "Authorization: Bearer sbz_live_sk_..." \\
  -H "Content-Type: application/json" \\
  -d '{"skuCode":"SKU-SLIV-12M","msisdn":"+919876543210"}'`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Status Bar */}
      <div className="border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md px-4 py-2 text-center text-xs text-slate-400">
        <span className="inline-flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-slate-300">Subzo Infrastructure Rails</span>
          <span>•</span>
          <span>Production Ready on India (.IN) Virtual Payment Rails</span>
        </span>
      </div>

      {/* Main Header */}
      <header className="border-b border-slate-800/60 sticky top-0 z-40 bg-slate-950/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
              S
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight text-white">Subzo</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Rails
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold text-slate-400">
            <a href="#architecture" className="hover:text-white transition">Dual Rails</a>
            <a href="#solutions" className="hover:text-white transition">Solutions</a>
            <a href="/docs" className="hover:text-white transition">API Reference</a>
            <a href="/console" className="hover:text-white transition">Console</a>
          </nav>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowLoginModal(true)}
              className="text-xs font-semibold px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 transition"
            >
              Sign In
            </button>
            <Link
              href="/console"
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
            <span>Unified Digital Subscription Supply Gateway</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            The Digital Subscription Rails for <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-300 bg-clip-text text-transparent">
              Credit Cards, Fintechs & Neobanks
            </span>
          </h1>

          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Distribute OTT streaming, lifestyle perks, and digital vouchers straight into cardholder apps. Real-time MSISDN activation, pre-funded virtual account float, and automated T+1 tax reconciliation.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/console"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide shadow-xl shadow-blue-600/25 transition flex items-center justify-center space-x-2"
            >
              <span>Open Operations Console</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/docs"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-xs transition flex items-center justify-center space-x-2"
            >
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>Read Gateway Docs</span>
            </Link>
          </div>

          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-left border-t border-slate-800/60 max-w-4xl mx-auto">
            <div>
              <p className="text-2xl font-bold font-mono text-white">99.98%</p>
              <p className="text-xs text-slate-500 mt-0.5">Fulfillment SLA</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-emerald-400">&lt; 350ms</p>
              <p className="text-xs text-slate-500 mt-0.5">API Latency</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-blue-400">T+1</p>
              <p className="text-xs text-slate-500 mt-0.5">Automated GST Recon</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-purple-400">FIFO</p>
              <p className="text-xs text-slate-500 mt-0.5">Vault Code Locking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 border-b border-slate-800/50 max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Target Use Cases</span>
          <h2 className="text-3xl font-bold text-white">Built for High-Growth Indian Fintech Rails</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/40 transition space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Fintechs & Credit Cards</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automate welcome vouchers, monthly spend milestones, and premium category rewards directly in-app.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-purple-500/40 transition space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Loyalty & Points Portals</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time point-to-subscription burn rails with dynamic margin calculation and zero inventory liability.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-emerald-500/40 transition space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Corporate Gifting & Perks</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Single-dashboard bulk disbursements, compliant GST invoicing, and instantaneous SMS/WhatsApp voucher claims.
            </p>
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
        <