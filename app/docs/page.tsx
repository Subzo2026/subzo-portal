"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Code2,
  Terminal,
  ShieldCheck,
  Zap,
  Ticket,
  Copy,
  Check,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  Layers,
  Server
} from "lucide-react";

export default function ApiDocsPage() {
  const [activeLang, setActiveLang] = useState<"curl" | "node" | "python">("curl");
  const [activeTab, setActiveTab] = useState<"provision" | "catalog" | "balance">("provision");
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const codeSnippets = {
    provision: {
      curl: `curl -X POST https://subzo.in/api/provision \\
  -H "Authorization: Bearer sbz_live_sk_948201948201" \\
  -H "Content-Type: application/json" \\
  -d '{
    "customerName": "Rahul Sharma",
    "msisdn": "+919876543210",
    "skuCode": "SKU-HOTSTAR-SUP",
    "skuName": "Disney+ Hotstar Super (Annual)",
    "amount": 865,
    "fulfillmentType": "COUPON_CODE"
  }'`,
      node: `import fetch from "node-fetch";

const response = await fetch("https://subzo.in/api/provision", {
  method: "POST",
  headers: {
    "Authorization": "Bearer sbz_live_sk_948201948201",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    customerName: "Rahul Sharma",
    msisdn: "+919876543210",
    skuCode: "SKU-HOTSTAR-SUP",
    skuName: "Disney+ Hotstar Super (Annual)",
    amount: 865,
    fulfillmentType: "COUPON_CODE"
  })
});

const data = await response.json();
console.log(data);`,
      python: `import requests

url = "https://subzo.in/api/provision"
headers = {
    "Authorization": "Bearer sbz_live_sk_948201948201",
    "Content-Type": "application/json"
}
payload = {
    "customerName": "Rahul Sharma",
    "msisdn": "+919876543210",
    "skuCode": "SKU-HOTSTAR-SUP",
    "skuName": "Disney+ Hotstar Super (Annual)",
    "amount": 865,
    "fulfillmentType": "COUPON_CODE"
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`
    },
    catalog: {
      curl: `curl -X GET https://subzo.in/api/catalog \\
  -H "Authorization: Bearer sbz_live_sk_948201948201"`,
      node: `const res = await fetch("https://subzo.in/api/catalog", {
  headers: { "Authorization": "Bearer sbz_live_sk_948201948201" }
});
const catalog = await res.json();`,
      python: `import requests
res = requests.get("https://subzo.in/api/catalog", headers={
    "Authorization": "Bearer sbz_live_sk_948201948201"
})
print(res.json())`
    },
    balance: {
      curl: `curl -X GET https://subzo.in/api/float-balance \\
  -H "Authorization: Bearer sbz_live_sk_948201948201"`,
      node: `const res = await fetch("https://subzo.in/api/float-balance", {
  headers: { "Authorization": "Bearer sbz_live_sk_948201948201" }
});
const balance = await res.json();`,
      python: `import requests
res = requests.get("https://subzo.in/api/float-balance", headers={
    "Authorization": "Bearer sbz_live_sk_948201948201"
})
print(res.json())`
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/60 sticky top-0 z-40 bg-slate-950/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
              S
            </Link>
            <div className="flex items-center space-x-2">
              <Link href="/" className="text-lg font-bold tracking-tight text-white hover:text-blue-400 transition">Subzo</Link>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                API Reference v1
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xs font-semibold text-slate-400 hover:text-white transition">
              Platform Home
            </Link>
            <Link
              href="/console"
              className="text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition flex items-center space-x-1.5"
            >
              <span>Partner Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Docs Body Layout */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Sticky Navigation */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="space-y-1">
            <p className="px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Getting Started</p>
            <a href="#overview" className="block px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-xl transition">
              Overview & Base URL
            </a>
            <a href="#auth" className="block px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-xl transition">
              Bearer Authentication
            </a>
            <a href="#dual-rails" className="block px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-xl transition">
              Fulfillment Routing
            </a>
          </div>

          <div className="space-y-1 pt-3 border-t border-slate-800/80">
            <p className="px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Core Endpoints</p>
            <button
              onClick={() => setActiveTab("provision")}
              className={`w-full text-left px-3 py-2 text-xs font-medium rounded-xl transition flex items-center justify-between ${
                activeTab === "provision" ? "bg-blue-600 text-white font-semibold" : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <span>POST /api/provision</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-800/60 text-blue-200">POST</span>
            </button>
            <button
              onClick={() => setActiveTab("catalog")}
              className={`w-full text-left px-3 py-2 text-xs font-medium rounded-xl transition flex items-center justify-between ${
                activeTab === "catalog" ? "bg-blue-600 text-white font-semibold" : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <span>GET /api/catalog</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">GET</span>
            </button>
            <button
              onClick={() => setActiveTab("balance")}
              className={`w-full text-left px-3 py-2 text-xs font-medium rounded-xl transition flex items-center justify-between ${
                activeTab === "balance" ? "bg-blue-600 text-white font-semibold" : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <span>GET /api/float-balance</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">GET</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-white flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Need API Keys?</span>
            </span>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Generate instant Sandbox and Production Bearer tokens in the Partner Console.
            </p>
            <Link
              href="/console"
              className="inline-flex items-center text-xs font-semibold text-blue-400 hover:text-blue-300 pt-1"
            >
              <span>Go to API Keys Desk</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="lg:col-span-9 space-y-12">
          {/* Section: Overview */}
          <section id="overview" className="space-y-4">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Subzo Digital Gateway Reference</h1>
            <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
              The Subzo REST API allows fintechs, credit card programs, and loyalty systems to programmatically provision OTT subscriptions and digital gift vouchers straight into cardholder experiences.
            </p>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 font-mono text-xs flex items-center justify-between">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Base Production URL</span>
                <span className="text-cyan-400 text-sm font-semibold">https://subzo.in/api</span>
              </div>
              <button
                onClick={() => copyToClipboard("https://subzo.in/api", "base-url")}
                className="text-slate-400 hover:text-white flex items-center space-x-1 text-xs"
              >
                {copied === "base-url" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied === "base-url" ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </section>

          {/* Section: Authentication */}
          <section id="auth" className="space-y-4 pt-6 border-t border-slate-800/80">
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              <span>Authentication</span>
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every request to Subzo endpoints must include your secret API key in the HTTP <code className="text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">Authorization</code> header as a Bearer token:
            </p>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-300">
              Authorization: Bearer sbz_live_sk_xxxxxxxxxxxxxxxx
            </div>
          </section>

          {/* Section: Interactive Endpoint Inspector */}
          <section className="space-y-6 pt-6 border-t border-slate-800/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                  POST
                </span>
                <h3 className="text-xl font-bold text-white inline-block ml-2">/api/provision</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Trigger atomic subscription activation or reserve a FIFO vault coupon.
                </p>
              </div>

              {/* Language Selector */}
              <div className="inline-flex rounded-xl bg-slate-900 p-1 border border-slate-800 text-xs">
                {(["curl", "node", "python"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveLang(lang)}
                    className={`px-3 py-1 rounded-lg font-semibold uppercase text-[11px] transition ${
                      activeLang === lang ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Box */}
            <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-5 font-mono text-xs shadow-2xl">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-[11px] text-slate-500">
                <span>Request Example ({activeLang})</span>
                <button
                  onClick={() => copyToClipboard(codeSnippets.provision[activeLang], "snippet")}
                  className="hover:text-white transition flex items-center space-x-1"
                >
                  {copied === "snippet" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === "snippet" ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <pre className="text-cyan-300 leading-relaxed overflow-x-auto">
                {codeSnippets.provision[activeLang]}
              </pre>
            </div>

            {/* Parameters Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Request Payload Parameters</h4>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden font-mono text-xs">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-900 text-slate-400 font-sans border-b border-slate-800 text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">FIELD</th>
                      <th className="py-2.5 px-4">TYPE</th>
                      <th className="py-2.5 px-4">REQUIRED</th>
                      <th className="py-2.5 px-4">DESCRIPTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    <tr>
                      <td className="py-3 px-4 font-bold text-blue-400">skuCode</td>
                      <td className="py-3 px-4 text-purple-400">string</td>
                      <td className="py-3 px-4 text-emerald-400 font-semibold font-sans">Required</td>
                      <td className="py-3 px-4 font-sans text-slate-300">Catalog identifier (e.g., SKU-HOTSTAR-SUP)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-blue-400">msisdn</td>
                      <td className="py-3 px-4 text-purple-400">string</td>
                      <td className="py-3 px-4 text-emerald-400 font-semibold font-sans">Required</td>
                      <td className="py-3 px-4 font-sans text-slate-300">Subscriber phone number with country code (+91)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-blue-400">customerName</td>
                      <td className="py-3 px-4 text-purple-400">string</td>
                      <td className="py-3 px-4 text-slate-500 font-sans">Optional</td>
                      <td className="py-3 px-4 font-sans text-slate-300">End-cardholder full name for order mapping</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-blue-400">fulfillmentType</td>
                      <td className="py-3 px-4 text-purple-400">string</td>
                      <td className="py-3 px-4 text-emerald-400 font-semibold font-sans">Required</td>
                      <td className="py-3 px-4 font-sans text-slate-300">DIRECT_API or COUPON_CODE</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Response Example */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Response Schema (200 OK)</h4>
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-emerald-400 leading-relaxed overflow-x-auto">
{`{
  "success": true,
  "orderId": "ORD-49102",
  "partnerId": "PRT-101",
  "newBalance": 675180,
  "voucherCode": "HS-SUP-NOV-001",
  "fulfillmentType": "COUPON_CODE"
}`}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
