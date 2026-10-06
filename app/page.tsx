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
  Check
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
            <a href="#catalog" className="hover:text-white transition">Brand Network</a>
            <a href="#api" className="hover:text-white transition">API Specs</a>
            <a href="#treasury" className="hover:text-white transition">Settlement Engine</a>
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
            <a
              href="#api"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-xs transition flex items-center justify-center space-x-2"
            >
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>Read Gateway Docs</span>
            </a>
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

      {/* Dual Rails Architecture */}
      <section id="architecture" className="py-24 border-b border-slate-800/50 max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Architectural Pillars</span>
          <h2 className="text-3xl font-bold text-white">Two Provisioning Models. One Single API.</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Subzo seamlessly bridges direct telecom carrier-grade subscriber activation and high-volume encrypted voucher inventory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Direct API */}
          <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 relative overflow-hidden group hover:border-blue-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Direct API Instant Activation</h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Subscriptions are bound directly to the subscriber&apos;s phone number (MSISDN). No vouchers, no friction—the user simply logs into the OTT app and streams immediately.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300 font-mono">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Zero-touch customer onboarding</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Sub-second account binding</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Native OTT carrier integration</span>
              </li>
            </ul>
          </div>

          {/* Voucher Vault */}
          <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 relative overflow-hidden group hover:border-amber-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-6">
              <Ticket className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Encrypted Voucher Code Vault</h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Ingest supplier batches with upload & expiry metadata. Our atomic checkout protocol issues genuine codes in First-In-First-Out (FIFO) sequence with 100% single-use locking.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300 font-mono">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-amber-400" />
                <span>Batch ingest with automated expiry checks</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-amber-400" />
                <span>Circuit breaker: Out-of-inventory protection</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-amber-400" />
                <span>Tied to recipient order ID & MSISDN</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Developer API Section */}
      <section id="api" className="py-24 border-b border-slate-800/50 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-xs font-semibold">
                <Code2 className="w-3.5 h-3.5" />
                <span>Enterprise Developer Gateway</span>
              </div>
              <h2 className="text-3xl font-bold text-white">Integrate in Minutes With Standard REST & Bearer Auth</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Issue subscription benefits at checkout, rewards redemption, or loyalty milestone completion. Designed for high-throughput mobile banking backends.
              </p>
              <div className="space-y-3 text-xs text-slate-300 font-mono">
                <div className="flex items-start space-x-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white">Idempotent Delivery:</span> Prevents double-charges even on network timeouts.
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                  <Server className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white">Real-Time Float Debit:</span> Debits from your pre-funded partner ICICI virtual account.
                  </div>
                </div>
              </div>
            </div>

            {/* Code Box */}
            <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-5 shadow-2xl font-mono text-xs text-slate-300">
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
    "skuCode": "SKU-SLIV-12M"
  }'`}
              </pre>
            </div>
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
          <Link href="/console" className="hover:text-slate-300 transition">Partner Console</Link>
          <a href="#api" className="hover:text-slate-300 transition">API Documentation</a>
          <span className="font-mono text-emerald-400">● 100% System Operational</span>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm">Enterprise Partner Authentication</h3>
              <button onClick={() => setShowLoginModal(false)} className="text-slate-400 hover:text-white text-xs">Close</button>
            </div>
            <p className="text-xs text-slate-400">Enter your Partner Portal access key to proceed into the cockpit.</p>
            <input
              type="password"
              placeholder="Enter Partner PIN or Admin Access Code"
              value={portalKey}
              onChange={(e) => setPortalKey(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
            />
            <div className="flex justify-end space-x-2 pt-2">
              <Link
                href="/console"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition"
              >
                Access Console
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
