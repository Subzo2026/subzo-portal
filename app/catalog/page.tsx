"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  Search,
  Filter,
  ArrowRight,
  Zap,
  Ticket,
  CheckCircle2,
  ExternalLink
} from "lucide-react";

export default function MasterCatalogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");

  const fullCatalog = [
    { sku: "SKU-HOTSTAR-12M-SUP", name: "JioHotstar Super", category: "OTT", period: "12 Months", retail: "₹899", wholesale: "₹765", type: "DIRECT_API", desc: "4K streaming on 2 devices, Live sports, Disney, HBO & regional hits.", stock: "Available" },
    { sku: "SKU-HOTSTAR-12M-PREM", name: "JioHotstar Premium", category: "OTT", period: "12 Months", retail: "₹1,499", wholesale: "₹1,275", type: "DIRECT_API", desc: "Ad-free 4K streaming across 4 concurrent screens.", stock: "Available" },
    { sku: "SKU-PRIME-12M", name: "Amazon Prime Annual", category: "OTT", period: "12 Months", retail: "₹1,499", wholesale: "₹1,299", type: "COUPON_CODE", desc: "Prime Video, Prime Music, gaming benefits and free 1-day delivery.", stock: "Available" },
    { sku: "SKU-SONYLIV-12M", name: "SonyLIV Premium Annual", category: "OTT", period: "12 Months", retail: "₹999", wholesale: "₹820", type: "DIRECT_API", desc: "UEFA, WWE, original series, live channels on 2 screens.", stock: "Available" },
    { sku: "SKU-ZEE5-12M", name: "ZEE5 All Access Annual", category: "OTT", period: "12 Months", retail: "₹699", wholesale: "₹540", type: "DIRECT_API", desc: "Full regional cinema library and live regional news.", stock: "Available" },
    { sku: "SKU-SWIGGY-12M", name: "Swiggy One Annual", category: "LIFESTYLE", period: "12 Months", retail: "₹1,199", wholesale: "₹940", type: "COUPON_CODE", desc: "Free food delivery, Instamart perks and dining discounts.", stock: "Available" },
    { sku: "SKU-SWIGGY-3M", name: "Swiggy One Quarterly", category: "LIFESTYLE", period: "3 Months", retail: "₹399", wholesale: "₹295", type: "COUPON_CODE", desc: "Quarterly pass for food orders and grocery delivery.", stock: "Available" },
    { sku: "SKU-AHA-TEL-12M", name: "Aha Video Telugu Gold", category: "OTT", period: "12 Months", retail: "₹699", wholesale: "₹530", type: "DIRECT_API", desc: "Complete 4K Telugu entertainment catalog and talk shows.", stock: "Available" },
    { sku: "SKU-AHA-TAM-12M", name: "Aha Video Tamil Annual", category: "OTT", period: "12 Months", retail: "₹499", wholesale: "₹385", type: "DIRECT_API", desc: "100% native Tamil cinema and web originals.", stock: "Available" },
    { sku: "SKU-KLIKK-12M", name: "Klikk Regional Annual", category: "OTT", period: "12 Months", retail: "₹399", wholesale: "₹280", type: "COUPON_CODE", desc: "Bengali movies, audio stories and regional web series.", stock: "Available" },
    { sku: "SKU-XBOX-GPU-1M", name: "Xbox Game Pass Ultimate", category: "GAMING", period: "1 Month Pass", retail: "₹829", wholesale: "₹690", type: "COUPON_CODE", desc: "Over 100 high-quality console & PC games with EA Play.", stock: "Available" },
    { sku: "SKU-PSN-WALLET-1000", name: "PlayStation Store ₹1,000", category: "GAMING", period: "Prepaid PIN", retail: "₹1,000", wholesale: "₹920", type: "COUPON_CODE", desc: "Direct PlayStation Network digital wallet card code.", stock: "Available" },
    { sku: "SKU-AI-CHATGPT-1M", name: "ChatGPT Plus Enterprise", category: "AI", period: "1 Month Pass", retail: "₹1,999", wholesale: "₹1,750", type: "COUPON_CODE", desc: "OpenAI GPT-4o multimodal workspace and data analysis access.", stock: "Available" },
    { sku: "SKU-AI-PERPLEXITY-12M", name: "Perplexity Pro Annual", category: "AI", period: "12 Months", retail: "₹16,500", wholesale: "₹13,800", type: "COUPON_CODE", desc: "Pro search, Claude 3.5 & GPT-4o research engine access.", stock: "Available" },
  ];

  const filtered = fullCatalog.filter((item) => {
    const matchesCategory = activeCategory === "ALL" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-800/60 sticky top-0 z-40 bg-slate-950/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
              S
            </Link>
            <Link href="/" className="text-xl font-bold tracking-tight text-white hover:text-blue-400 transition">
              Subzo
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-7 text-xs font-semibold text-slate-400">
            <Link href="/about" className="hover:text-white transition">About</Link>
            <Link href="/catalog" className="text-white font-bold">Catalog</Link>
            <Link href="/#usecases" className="hover:text-white transition">Use Cases</Link>
            <Link href="/#architecture" className="hover:text-white transition">Fulfillment Rails</Link>
            <Link href="/docs" className="hover:text-white transition">API Docs</Link>
            <Link href="/blogs" className="hover:text-white transition">Blogs</Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link href="/admin-login" className="text-xs font-semibold px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 transition">
              Sign In
            </Link>
            <Link href="/login" className="text-xs font-semibold px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition flex items-center space-x-1.5">
              <span>Partner Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Catalog Body */}
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Master Digital Inventory</span>
            <h1 className="text-3xl font-extrabold text-white mt-1">Full Wholesale Subscription Catalog</h1>
            <p className="text-xs text-slate-400 mt-1">
              Ready-to-provision streaming, quick commerce, gaming, and AI SKUs with direct carrier wholesale pricing.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by brand or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {["ALL", "OTT", "LIFESTYLE", "GAMING", "AI"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {cat === "ALL" ? "All Master SKUs" : cat}
            </button>
          ))}
        </div>

        {/* Catalog Table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden font-mono text-xs shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-900 text-slate-400 font-sans border-b border-slate-800 text-[11px]">
              <tr>
                <th className="py-3 px-4">SKU IDENTIFIER</th>
                <th className="py-3 px-4">BRAND & PLAN</th>
                <th className="py-3 px-4">FULFILLMENT</th>
                <th className="py-3 px-4">DURATION</th>
                <th className="py-3 px-4">MRP</th>
                <th className="py-3 px-4">WHOLESALE RATE</th>
                <th className="py-3 px-4">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filtered.map((item) => (
                <tr key={item.sku} className="hover:bg-slate-800/30 transition">
                  <td className="py-4 px-4 font-bold text-blue-400">{item.sku}</td>
                  <td className="py-4 px-4 font-sans">
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                  </td>
                  <td className="py-4 px-4 font-sans">
                    {item.type === "DIRECT_API" ? (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-flex items-center space-x-1">
                        <Zap className="w-3 h-3" />
                        <span>Direct MSISDN</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 inline-flex items-center space-x-1">
                        <Ticket className="w-3 h-3" />
                        <span>Voucher Vault</span>
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-slate-300 font-sans">{item.period}</td>
                  <td className="py-4 px-4 text-slate-500 line-through">{item.retail}</td>
                  <td className="py-4 px-4 font-bold text-emerald-400">{item.wholesale}</td>
                  <td className="py-4 px-4 font-sans">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      ● Active Rail
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-white text-sm">Need custom brand SKUs or exclusive enterprise allocations?</p>
            <p className="text-xs text-slate-400">We integrate new OEM brands within 48 hours for accredited institutional partners.</p>
          </div>
          <Link
            href="/#callback"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs transition whitespace-nowrap shadow-lg shadow-blue-600/20"
          >
            Request Brand Addition
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-10 max-w-7xl mx-auto px-6 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          <span>Subzo Technologies Pvt Ltd, India © 2026. All rights reserved.</span>
        </div>
        <div className="flex items-center space-x-1.5 text-slate-400 font-medium">
          <span>Made with</span>
          <span className="text-red-500">❤️</span>
          <span>in Pune</span>
        </div>
      </footer>
    </div>
  );
}