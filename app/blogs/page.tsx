"use client";

import React from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  CreditCard,
  Zap,
  Sparkles
} from "lucide-react";

export default function BlogsPage() {
  const posts = [
    {
      id: "solving-ott-breakage-india",
      title: "Why 35% of Digital Vouchers Expire Unused and How Direct MSISDN Rails Fix It",
      excerpt: "Traditional voucher codes create massive cardholder drop-offs during redemption. We break down the mathematics of atomic phone-number account binding for Tier-1 Indian banks.",
      date: "06 Oct 2026",
      readTime: "4 min read",
      category: "Infrastructure",
      tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/20"
    },
    {
      id: "credit-card-activation-perks-2026",
      title: "How Neo-Credit Cards Boost 30-Day Activation Rates from 38% to 74% Using Digital Streaming Perks",
      excerpt: "Analyzing cohort data from top Indian credit card programs that replaced welcome gifts with instant Swiggy One and SonyLIV bundled subscriptions.",
      date: "05 Oct 2026",
      readTime: "6 min read",
      category: "Fintech Growth",
      tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    },
    {
      id: "ai-tooling-employee-allowance",
      title: "The Rise of Corporate AI Allowances: Provisioning ChatGPT Plus & Claude API Bundles at Scale",
      excerpt: "Enterprise companies are adopting recurring monthly AI tooling allowances. Learn how Subzo's virtual account float rails automate provisioning and monthly GST input reconciliation.",
      date: "04 Oct 2026",
      readTime: "5 min read",
      category: "Enterprise AI",
      tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/20"
    }
  ];

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
            <Link href="/catalog" className="hover:text-white transition">Catalog</Link>
            <Link href="/#usecases" className="hover:text-white transition">Use Cases</Link>
            <Link href="/#architecture" className="hover:text-white transition">Fulfillment Rails</Link>
            <Link href="/docs" className="hover:text-white transition">API Docs</Link>
            <Link href="/blogs" className="text-white font-bold">Blogs</Link>
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

      {/* Blog Listing */}
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-12">
        <div className="space-y-3">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Engineering & Insights</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">The Subzo Publication</h1>
          <p className="text-xs md:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Daily analysis on subscription economies, credit card activation psychology, fintech rails, and carrier API protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="p-7 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${post.tagColor}`}>
                  {post.category}
                </span>
                <div className="flex items-center space-x-3 text-slate-500 text-xs">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </span>
                </div>
              </div>

              <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition leading-snug">
                {post.title}
              </h2>

              <p className="text-xs text-slate-400 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="pt-2 flex items-center text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
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