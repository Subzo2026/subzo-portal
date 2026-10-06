"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  Zap,
  Ticket,
  X,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

interface CatalogItem {
  id: string;
  brand: string;
  category: "OTT" | "LIFESTYLE" | "SAAS" | "GAMING" | "AI";
  plan: string;
  duration: string;
  mrp: string;
  status: "Available" | "Coming Soon";
  logoUrl: string;
  badgeBg: string;
  description: string;
  features: string[];
  termsAndConditions: string[];
}

export default function MasterCatalogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    "ALL" | "OTT" | "LIFESTYLE" | "SAAS" | "GAMING" | "AI"
  >("ALL");
  const [selectedBrand, setSelectedBrand] = useState<CatalogItem | null>(null);

  const fullCatalog: CatalogItem[] = [
    // Streaming & OTT
    {
      id: "hotstar-super",
      brand: "JioHotstar",
      category: "OTT",
      plan: "Super Plan",
      duration: "12 Months",
      mrp: "₹1,099",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=hotstar.com&sz=128",
      badgeBg: "bg-blue-500/10 text-blue-300 border-blue-500/20",
      description: "JioHotstar delivers live cricket tournaments, premier global sports, Disney+ cinematic hits, HBO originals, and multi-lingual Indian entertainment in Full HD.",
      features: [
        "Concurrent streaming on up to 2 screens (TV, Mobile, Laptop)",
        "Full HD (1080p) video quality with Dolby 5.1 audio",
        "Complete access to live cricket, live sports, and premium blockbusters",
        "Direct MSISDN phone-number provisioning supported"
      ],
      termsAndConditions: [
        "Active mobile number required for instant binding.",
        "Non-transferable once activated on the registered MSISDN.",
        "Valid for exactly 365 days from time of activation.",
        "Ads included on sports and live programming."
      ]
    },
    {
      id: "hotstar-prem",
      brand: "JioHotstar",
      category: "OTT",
      plan: "Premium Tier",
      duration: "12 Months",
      mrp: "₹2,199",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=hotstar.com&sz=128",
      badgeBg: "bg-blue-500/10 text-blue-300 border-blue-500/20",
      description: "The flagship 4K Ultra HD ad-free tier for JioHotstar, allowing 4 concurrent devices across smart televisions, home theatre systems, tablets, and phones.",
      features: [
        "Concurrent streaming on up to 4 devices simultaneously",
        "4K Ultra HD (2160p) with Dolby Atmos sound support",
        "Ad-free streaming experience across movies and entertainment series",
        "Available via direct telecom activation or encrypted vault vouchers"
      ],
      termsAndConditions: [
        "Single-use digital grant or direct number provision.",
        "Valid for 12 continuous calendar months.",
        "Ads may appear only during live sports broadcasts due to feed rights."
      ]
    },
    {
      id: "prime-annual",
      brand: "Amazon Prime",
      category: "OTT",
      plan: "Annual Full Access Membership",
      duration: "12 Months",
      mrp: "₹1,499",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=primevideo.com&sz=128",
      badgeBg: "bg-amber-500/10 text-amber-300 border-amber-500/20",
      description: "Comprehensive annual subscription bundling Prime Video 4K HDR streaming, unlimited expedited shipping on Amazon, Amazon Music ad-free, and Prime Gaming.",
      features: [
        "Prime Video multi-screen streaming with 4K UHD & X-Ray insight",
        "Unlimited free 1-Day and 2-Day guaranteed parcel delivery",
        "Ad-free access to 100M+ songs and top podcasts via Prime Music",
        "Issued as an encrypted single-use voucher code with redemption link"
      ],
      termsAndConditions: [
        "Redeemable on existing or new Amazon India consumer accounts.",
        "If an existing Prime membership is active, new code stacks to extend duration.",
        "Voucher cannot be exchanged for cash or Amazon Pay balance."
      ]
    },
    {
      id: "sonyliv-prem",
      brand: "SonyLIV",
      category: "OTT",
      plan: "Premium All Access",
      duration: "12 Months",
      mrp: "₹1,499",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=sonyliv.com&sz=128",
      badgeBg: "bg-sky-500/10 text-sky-300 border-sky-500/20",
      description: "SonyLIV Premium brings UEFA Champions League, WWE Network, live tennis Grand Slams, Sony entertainment series, and award-winning international cinema.",
      features: [
        "Stream on 2 screens simultaneously in Full HD and 4K",
        "Complete WWE live pay-per-view events and archive access",
        "Full access to SonyLIV Originals (Scam 1992, Gullak, Rocket Boys)",
        "Direct MSISDN binding supported via Subzo API gateway"
      ],
      termsAndConditions: [
        "Valid on web, mobile apps, and Smart TV SonyLIV applications.",
        "Sports feeds and live interactive games contain standard sponsor ads.",
        "Non-refundable once processed via API."
      ]
    },
    {
      id: "zee5-annual",
      brand: "ZEE5",
      category: "OTT",
      plan: "All Access Annual",
      duration: "12 Months",
      mrp: "₹699",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=zee5.com&sz=128",
      badgeBg: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      description: "India's largest multi-lingual storytelling platform featuring over 500+ regional originals, classic Bollywood blockbusters, and 90+ live news and entertainment channels.",
      features: [
        "Content across 12 languages: Hindi, Marathi, Tamil, Telugu, Bangla & more",
        "Simultaneous streaming on 2 screens",
        "Ad-free video on demand with 1080p HD picture quality",
        "Direct MSISDN auto-activation or instant coupon voucher"
      ],
      termsAndConditions: [
        "Binding succeeds immediately upon registered user phone number verification.",
        "Valid for 365 days from timestamp of issue.",
        "Available Pan-India."
      ]
    },
    {
      id: "aha-telugu",
      brand: "Aha Video",
      category: "OTT",
      plan: "Telugu Gold Annual",
      duration: "12 Months",
      mrp: "₹699",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=aha.video&sz=128",
      badgeBg: "bg-rose-500/10 text-rose-300 border-rose-500/20",
      description: "The 100% native regional Telugu entertainment hub featuring exclusive movie releases, original reality web shows, and regional comedy programs.",
      features: [
        "4K Ultra HD with Dolby 5.1 audio support",
        "Ad-free streaming for all movies and web series",
        "Offline downloads enabled on mobile devices",
        "Direct mobile phone provisioning"
      ],
      termsAndConditions: [
        "Valid only on Indian mobile network codes (+91).",
        "Valid for 1 year.",
        "Non-transferable once applied to an account."
      ]
    },
    {
      id: "klikk-annual",
      brand: "Klikk",
      category: "OTT",
      plan: "Regional Annual Pass",
      duration: "12 Months",
      mrp: "₹399",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=klikk.tv&sz=128",
      badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
      description: "Leading regional entertainment service dedicated to Bengali digital cinema, original web series, comedy sketches, animated kids content, and audio stories.",
      features: [
        "HD streaming across mobile, tablets, and smart televisions",
        "Original Bengali language content updated weekly",
        "Encrypted voucher delivery with 1-click redemption link"
      ],
      termsAndConditions: [
        "Voucher valid for redemption within 180 days of issue.",
        "Upon redemption, 365-day subscription starts immediately."
      ]
    },

    // Everyday Lifestyle
    {
      id: "swiggy-one-12m",
      brand: "Swiggy One",
      category: "LIFESTYLE",
      plan: "Annual All-in-One Membership",
      duration: "12 Months",
      mrp: "₹1,199",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=swiggy.com&sz=128",
      badgeBg: "bg-orange-500/10 text-orange-300 border-orange-500/20",
      description: "Single membership unlocking benefits across Swiggy: free food deliveries, Instamart grocery perks, Dineout dining discounts, and Genie courier privileges.",
      features: [
        "Unlimited free deliveries on food orders above ₹149 from select restaurants",
        "Free deliveries on Instamart grocery orders above ₹199",
        "Up to 40% additional off at 10,000+ top Dineout partner restaurants",
        "Zero surge fee surges on food deliveries during monsoons and peak rush"
      ],
      termsAndConditions: [
        "Delivered as an encrypted single-use coupon code.",
        "Applied in the Swiggy mobile app under 'Swiggy One Membership'.",
        "Valid for Indian cities serviced by Swiggy."
      ]
    },
    {
      id: "swiggy-one-3m",
      brand: "Swiggy One",
      category: "LIFESTYLE",
      plan: "Quarterly Membership",
      duration: "3 Months",
      mrp: "₹399",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=swiggy.com&sz=128",
      badgeBg: "bg-orange-500/10 text-orange-300 border-orange-500/20",
      description: "Quarterly edition of Swiggy's flagship membership pass, ideal for credit card onboarding campaigns and seasonal rewards burn.",
      features: [
        "Unlimited free food and grocery deliveries across 90 days",
        "Dineout restaurant perks and discounts",
        "Single-use encrypted vault code"
      ],
      termsAndConditions: [
        "Redeemable on Swiggy iOS and Android applications.",
        "Stacks automatically if the user already has an active Swiggy One plan."
      ]
    },
    {
      id: "times-prime-12m",
      brand: "Times Prime",
      category: "LIFESTYLE",
      plan: "Annual Master Privileges Pass",
      duration: "12 Months",
      mrp: "₹1,199",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=timesprime.com&sz=128",
      badgeBg: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
      description: "India's premier bundled digital lifestyle membership combining OTT subscriptions, dining perks, travel discounts, news passes, and health checks in a single account.",
      features: [
        "Includes complimentary subscriptions like Disney+ Hotstar, SonyLIV, Discovery+",
        "Food & dining perks from Starbucks, Swiggy, and Chaayos",
        "Healthcare consultations from Pharmeasy and Cult.fit",
        "Delivered as an instant gift activation key"
      ],
      termsAndConditions: [
        "Redeemable on the Times Prime website or mobile app.",
        "Individual brand perks inside the bundle must be activated within the membership period."
      ]
    },
    {
      id: "cultpass-live-12m",
      brand: "Cult.fit",
      category: "LIFESTYLE",
      plan: "Cultpass Live Annual",
      duration: "12 Months",
      mrp: "₹1,990",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=cult.fit&sz=128",
      badgeBg: "bg-pink-500/10 text-pink-300 border-pink-500/20",
      description: "Unlimited access to daily interactive fitness, yoga, and meditation masterclasses led by India's top celebrity trainers and wellness coaches.",
      features: [
        "Unlimited live workouts: HIIT, Strength, Dance Fitness, and Yoga",
        "Energy meter real-time tracking via smartphone camera",
        "Guided meditation and mental wellbeing audio sessions"
      ],
      termsAndConditions: [
        "Valid on Cult.fit iOS and Android apps.",
        "Access starts on the date the voucher is entered in the Cult wallet."
      ]
    },

    // SaaS & Tools
    {
      id: "notion-plus-12m",
      brand: "Notion",
      category: "SAAS",
      plan: "Notion Plus Annual Workspace",
      duration: "12 Months",
      mrp: "₹9,600",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=notion.so&sz=128",
      badgeBg: "bg-slate-800 text-slate-300 border-slate-700",
      description: "The connected workspace where better, faster work happens. Notion Plus provides unlimited file uploads, custom automation workflows, and collaborative databases.",
      features: [
        "Unlimited blocks for individuals and teams",
        "Unlimited file uploads (no 5MB cap)",
        "30-day page version history",
        "Direct seat provision or enterprise redemption voucher"
      ],
      termsAndConditions: [
        "Applicable to new or existing Notion workspace accounts.",
        "Valid for 1 full year from redemption."
      ]
    },
    {
      id: "canva-pro-12m",
      brand: "Canva",
      category: "SAAS",
      plan: "Canva Pro Annual Creative Suite",
      duration: "12 Months",
      mrp: "₹3,999",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=canva.com&sz=128",
      badgeBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
      description: "Complete visual design workspace unlocking over 100 million stock photos, premium templates, Magic Studio generative AI tools, and Brand Kits.",
      features: [
        "Unlimited access to 100M+ premium stock photos, graphics, audio, and videos",
        "One-click Magic Switch layout adaptation and background remover",
        "1TB cloud asset storage per workspace",
        "Delivered as an instant license activation key"
      ],
      termsAndConditions: [
        "Applies to 1 named user account.",
        "Redeemable on canva.com/redeem."
      ]
    },
    {
      id: "github-copilot-12m",
      brand: "GitHub",
      category: "SAAS",
      plan: "GitHub Copilot Individual",
      duration: "12 Months",
      mrp: "₹9,800",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=github.com&sz=128",
      badgeBg: "bg-slate-800 text-slate-300 border-slate-700",
      description: "The world's most widely adopted AI developer tool. Delivers multi-file autocompletions, real-time code chat, and unit test generation directly in IDEs.",
      features: [
        "Native extensions for VS Code, Visual Studio, JetBrains, and Neovim",
        "Turn natural language prompts into working code syntax",
        "Corporate API allowance or direct seat grant"
      ],
      termsAndConditions: [
        "Requires active GitHub account.",
        "Non-transferable once assigned to a GitHub handle."
      ]
    },

    // Gaming Ecosystems
    {
      id: "xbox-gpu-1m",
      brand: "Xbox Game Pass",
      category: "GAMING",
      plan: "Ultimate Tier (PC & Console)",
      duration: "1 Month Pass",
      mrp: "₹829",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=xbox.com&sz=128",
      badgeBg: "bg-green-500/10 text-green-300 border-green-500/20",
      description: "The premier subscription for gaming. Play hundreds of high-quality console, PC, and cloud games, plus an EA Play membership and exclusive member discounts.",
      features: [
        "Day-one access to new releases from Xbox Game Studios and Bethesda",
        "Includes EA Play catalog on PC and Xbox at no extra cost",
        "Cloud Gaming enabled: stream console titles on phone, tablet, or browser",
        "Digital 25-character vault code delivered instantly"
      ],
      termsAndConditions: [
        "Redeemable on microsoft.com/redeem or Xbox consoles.",
        "Valid in the India Xbox marketplace.",
        "Stacks up to 36 months on Microsoft accounts."
      ]
    },
    {
      id: "psn-wallet-1000",
      brand: "PlayStation (PSN)",
      category: "GAMING",
      plan: "PlayStation Store Wallet ₹1,000",
      duration: "Digital PIN Card",
      mrp: "₹1,000",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=playstation.com&sz=128",
      badgeBg: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
      description: "Official Sony PlayStation Network wallet voucher. Funds can be spent on games, add-on DLCs, PlayStation Plus tiers, and movie rentals.",
      features: [
        "Adds ₹1,000 credit straight to user's PlayStation Network Indian wallet",
        "Use on PS5, PS4, or the official web PlayStation Store",
        "Never expires once claimed to wallet balance"
      ],
      termsAndConditions: [
        "Must be redeemed on an Indian PSN account (region locked to India).",
        "12-digit alphanumeric code delivered via encrypted vault checkout."
      ]
    },
    {
      id: "steam-wallet-500",
      brand: "Steam",
      category: "GAMING",
      plan: "Steam Wallet Digital Gift ₹500",
      duration: "Digital PIN Card",
      mrp: "₹500",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=steampowered.com&sz=128",
      badgeBg: "bg-slate-800 text-slate-300 border-slate-700",
      description: "Direct wallet credits for Steam, the leading digital distribution platform for PC gaming. Redeemable against thousands of games, software, and in-game items.",
      features: [
        "Credits ₹500 directly into player's Steam wallet",
        "Redeemable during major Steam Seasonal sales (Summer/Winter Sale)",
        "Instant code issued with zero expiry date"
      ],
      termsAndConditions: [
        "Valid for Indian Steam accounts.",
        "Redeemable on store.steampowered.com/account/redeemwalletcode."
      ]
    },

    // Frontier AI Suites
    {
      id: "chatgpt-plus-1m",
      brand: "ChatGPT Plus",
      category: "AI",
      plan: "OpenAI Multimodal Pass",
      duration: "1 Month Pass",
      mrp: "₹1,999",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=openai.com&sz=128",
      badgeBg: "bg-teal-500/10 text-teal-300 border-teal-500/20",
      description: "Official OpenAI subscription granting priority access to GPT-4o, advanced voice mode, DALL·E 3 image generation, data analysis, and custom GPT builder.",
      features: [
        "Unlimited GPT-4o multimodal reasoning and code interpreter",
        "Real-time voice conversation mode on iOS and Android apps",
        "File upload, document analysis, and custom GPT creation tools",
        "Corporate API allowance voucher"
      ],
      termsAndConditions: [
        "Valid for personal or enterprise OpenAI consumer accounts.",
        "Expires 30 days from time of activation on account."
      ]
    },
    {
      id: "perplexity-pro-12m",
      brand: "Perplexity Pro",
      category: "AI",
      plan: "Annual AI Research Engine",
      duration: "12 Months",
      mrp: "₹16,500",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=perplexity.ai&sz=128",
      badgeBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
      description: "The conversational answer engine that cites verified real-time web sources. Pro unlocks unlimited search queries, file analysis, and choice between leading foundation models.",
      features: [
        "Unlimited Pro Search with comprehensive cited answers",
        "Switch reasoning models between Claude 3.5 Sonnet, GPT-4o, and Sonar",
        "Unlimited document, PDF, and data spreadsheet uploads",
        "Master redemption code delivered via vault"
      ],
      termsAndConditions: [
        "Redeemable on perplexity.ai.",
        "Valid for 1 full year from date of code claim."
      ]
    }
  ];

  const filteredCatalog = fullCatalog.filter((item) => {
    const matchesCategory =
      activeCategory === "ALL" || item.category === activeCategory;
    const matchesSearch =
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.plan.toLowerCase().includes(searchTerm.toLowerCase());
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
        <div className="space-y-2 border-b border-slate-800/80 pb-6">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
            Master Digital Inventory
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            Full Wholesale Subscription Catalog
          </h1>
          <p className="text-xs md:text-sm text-slate-400 max-w-3xl">
            Ready-to-provision streaming, quick commerce, gaming, and AI SKUs with direct carrier wholesale pricing.
          </p>
        </div>

        {/* Search & Ecosystem Filter Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            {[
              { id: "ALL", label: "All Master SKUs" },
              { id: "OTT", label: "Streaming & OTT" },
              { id: "LIFESTYLE", label: "Everyday Lifestyle" },
              { id: "SAAS", label: "SaaS & Tools" },
              { id: "GAMING", label: "Gaming Ecosystems" },
              { id: "AI", label: "Frontier AI Suites" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-medium transition whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30"
                    : "bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by brand or plan name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans"
            />
          </div>
        </div>

        {/* Catalog Table: BRAND, PLAN, DURATION, MRP, STATUS */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800 text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-5">BRAND</th>
                <th className="py-3 px-5">PLAN</th>
                <th className="py-3 px-5">DURATION</th>
                <th className="py-3 px-5">MRP</th>
                <th className="py-3 px-5">STATUS</th>
                <th className="py-3 px-5 text-right">OVERVIEW</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredCatalog.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => setSelectedBrand(item)}
                  className="hover:bg-slate-800/40 transition cursor-pointer group"
                >
                  <td className="py-4 px-5">
                    <div className="flex items-center space-x-3">
                      {/* Crisp Brand Logo in Table */}
                      <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 p-1 flex items-center justify-center shrink-0 shadow-sm">
                        <img
                          src={item.logoUrl}
                          alt={item.brand}
                          className="w-full h-full object-contain rounded"
                          loading="lazy"
                          onError={(e: any) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                      <div>
                        <p className="font-bold text-white group-hover:text-blue-400 transition">{item.brand}</p>
                        <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded border ${item.badgeBg}`}>
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5 font-semibold text-slate-200">
                    {item.plan}
                  </td>
                  <td className="py-4 px-5 text-slate-300 font-mono">
                    {item.duration}
                  </td>
                  <td className="py-4 px-5 font-bold font-mono text-white text-sm">
                    {item.mrp}
                  </td>
                  <td className="py-4 px-5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>{item.status}</span>
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <span className="text-[11px] text-blue-400 group-hover:text-blue-300 font-semibold inline-flex items-center space-x-1">
                      <span>View Specifications</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Drawer: Full Brand Specification View with Logo Watermark */}
        {selectedBrand && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-7 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto relative overflow-hidden">
              {/* Background Modal Logo Watermark */}
              <div className="absolute -right-8 -bottom-8 w-48 h-48 pointer-events-none opacity-[0.05]">
                <img
                  src={selectedBrand.logoUrl}
                  alt=""
                  className="w-full h-full object-contain filter grayscale invert"
                />
              </div>

              {/* Modal Top Bar */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-4 relative z-10">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 p-2 flex items-center justify-center shadow-lg">
                    <img
                      src={selectedBrand.logoUrl}
                      alt={selectedBrand.brand}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedBrand.brand}</h3>
                    <p className="text-xs text-blue-400 font-semibold">{selectedBrand.plan} • {selectedBrand.duration}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBrand(null)}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Brand Description */}
              <div className="space-y-2 relative z-10">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">About the Brand</h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  {selectedBrand.description}
                </p>
              </div>

              {/* Plan Specifications & MRP */}
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Retail Plan MRP</span>
                  <p className="text-2xl font-bold font-mono text-white">{selectedBrand.mrp}</p>
                  <p className="text-[10px] text-slate-400">Standard Indian consumer retail pricing</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Wholesale Allocation</span>
                  <p className="text-sm font-bold text-emerald-400 flex items-center mt-1">
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Available on Subzo Rails
                  </p>
                  <p className="text-[10px] text-slate-400">Pre-funded float & direct API binding</p>
                </div>
              </div>

              {/* Plan Benefits */}
              <div className="space-y-2 relative z-10">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Plan Inclusions & Benefits</h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {selectedBrand.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Terms and Conditions (T&C) */}
              <div className="space-y-2 relative z-10">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Terms & Conditions (T&C)</h4>
                <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800/80 text-[11px] text-slate-400 space-y-1.5">
                  {selectedBrand.termsAndConditions.map((tc, idx) => (
                    <p key={idx}>• {tc}</p>
                  ))}
                </div>
              </div>

              {/* Modal CTA */}
              <div className="pt-2 flex justify-end space-x-3 relative z-10">
                <Link
                  href="/#callback"
                  onClick={() => setSelectedBrand(null)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs transition"
                >
                  Request Wholesale Commercials for {selectedBrand.brand}
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-10 max-w-7xl mx-auto px-6 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          <span>Subzo Technologies Pvt Ltd, India © 2026. All rights reserved.</span>
        </div>
        <div className="flex items-center space-x-1.5 text-slate-400 font-medium">
          <span>Made with</span>
          <span className="text-red-500">❤️</span>
          <span>from Pune</span>
        </div>
      </footer>
    </div>
  );
}