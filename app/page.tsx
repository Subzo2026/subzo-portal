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
  Send,
  Building,
  Phone,
  Mail,
  MapPin,
  ChevronRight
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function SubzoLandingPage() {
  const [copied, setCopied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    "ALL" | "OTT" | "LIFESTYLE" | "SAAS" | "GAMING" | "AI"
  >("ALL");

  // Lead Enquiry Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [primaryInterest, setPrimaryInterest] = useState("Credit Card Perks & Milestones");
  const [monthlyVolume, setMonthlyVolume] = useState("1,000 - 10,000 activations/mo");
  const [requirements, setRequirements] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const copySnippet = () => {
    navigator.clipboard.writeText(`curl -X POST https://subzo.in/api/provision \\
  -H "Authorization: Bearer sbz_live_sk_..." \\
  -H "Content-Type: application/json" \\
  -d '{"skuCode":"SKU-HOTSTAR-12M","msisdn":"+919876543210"}'`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      const { error } = await supabase.from("enquiries").insert([
        {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          work_email: workEmail.trim().toLowerCase(),
          phone: phone.trim(),
          company: company.trim(),
          city: city.trim(),
          primary_interest: primaryInterest,
          monthly_volume: monthlyVolume,
          requirements: requirements.trim()
        }
      ]);

      if (error) throw error;
      setSubmitSuccess(true);
      setFirstName("");
      setLastName("");
      setWorkEmail("");
      setPhone("");
      setCompany("");
      setCity("");
      setRequirements("");
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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

  const allMasterBrands = [
    // Streaming & OTT
    { name: "JioHotstar", category: "OTT", plan: "Super & Premium 12M", badge: "Instant MSISDN / Voucher", content: "Cricket, HBO, Disney+ & regional blockbusters with 4K multi-screen support.", bg: "bg-blue-950/25 border-blue-500/25 hover:border-blue-400/50 hover:bg-blue-900/30", color: "text-blue-300", badgeColor: "bg-blue-500/10 text-blue-300 border-blue-500/20", priority: 1 },
    { name: "Amazon Prime", category: "OTT", plan: "Annual Full Access Membership", badge: "Voucher Delivery", content: "Prime Video 4K HDR streaming, free expedited shipping & Prime Music bundled.", bg: "bg-amber-950/25 border-amber-500/25 hover:border-amber-400/50 hover:bg-amber-900/30", color: "text-amber-300", badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/20", priority: 2 },
    { name: "SonyLIV", category: "OTT", plan: "12M Premium All Access", badge: "Direct OTT Provision", content: "UEFA Champions League, WWE Network, international movies & Sony originals.", bg: "bg-sky-950/25 border-sky-500/25 hover:border-sky-400/50 hover:bg-sky-900/30", color: "text-sky-300", badgeColor: "bg-sky-500/10 text-sky-300 border-sky-500/20", priority: 3 },
    { name: "ZEE5", category: "OTT", plan: "All Access Annual", badge: "Instant Activation", content: "500+ regional original series, live TV news, and expansive Indian cinema library.", bg: "bg-purple-950/25 border-purple-500/25 hover:border-purple-400/50 hover:bg-purple-900/30", color: "text-purple-300", badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/20", priority: 4 },
    { name: "Aha Video", category: "OTT", plan: "Gold & Annual Telugu/Tamil", badge: "Direct Provision", content: "100% native regional Telugu & Tamil movies, exclusive chat shows, and theater hits.", bg: "bg-rose-950/25 border-rose-500/25 hover:border-rose-400/50 hover:bg-rose-900/30", color: "text-rose-300", badgeColor: "bg-rose-500/10 text-rose-300 border-rose-500/20", priority: 6 },
    { name: "Klikk", category: "OTT", plan: "Regional 12M Subscription", badge: "Instant Voucher", content: "Leading Bengali entertainment streaming hub with original web series and classics.", bg: "bg-emerald-950/25 border-emerald-500/25 hover:border-emerald-400/50 hover:bg-emerald-900/30", color: "text-emerald-300", badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20", priority: 7 },
    { name: "Lionsgate Play", category: "OTT", plan: "Annual All Access", badge: "Direct Provision", content: "Hollywood action blockbusters, Starz originals, and international award winners.", bg: "bg-slate-900/40 border-slate-700/40 hover:border-slate-500", color: "text-slate-200", badgeColor: "bg-slate-800 text-slate-300 border-slate-700", priority: 11 },
    { name: "Sun NXT", category: "OTT", plan: "Annual South Premium", badge: "Instant Voucher", content: "4000+ South Indian movies, Sun TV serials, music videos and live channels.", bg: "bg-orange-950/20 border-orange-500/20 hover:border-orange-500/40", color: "text-orange-400", badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20", priority: 12 },
    { name: "Chaupal", category: "OTT", plan: "Annual Regional Trio", badge: "Instant Voucher", content: "Punjabi, Haryanvi, and Bhojpuri regional cinema and original streaming series.", bg: "bg-yellow-950/20 border-yellow-500/20 hover:border-yellow-500/40", color: "text-yellow-400", badgeColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", priority: 13 },
    { name: "Discovery+ Premium", category: "OTT", plan: "Annual All Access", badge: "Direct Provision", content: "Factual entertainment, science, nature documentaries, and global live motorsports.", bg: "bg-blue-950/20 border-blue-500/20 hover:border-blue-500/40", color: "text-blue-300", badgeColor: "bg-blue-500/10 text-blue-300 border-blue-500/20", priority: 14 },

    // Everyday Lifestyle
    { name: "Swiggy One", category: "LIFESTYLE", plan: "3M & 12M Membership", badge: "Encrypted Coupon", content: "Unlimited free food deliveries, Instamart grocery perks & Dineout dining discounts.", bg: "bg-orange-950/25 border-orange-500/25 hover:border-orange-400/50 hover:bg-orange-900/30", color: "text-orange-300", badgeColor: "bg-orange-500/10 text-orange-300 border-orange-500/20", priority: 5 },
    { name: "Zomato Gold", category: "LIFESTYLE", plan: "VIP Dining & Delivery", badge: "Voucher PIN", content: "Free food delivery, up to 40% off on dining out, and exclusive VIP rush hour perks.", bg: "bg-red-950/25 border-red-500/25 hover:border-red-400/50", color: "text-red-300", badgeColor: "bg-red-500/10 text-red-300 border-red-500/20", priority: 15 },
    { name: "Times Prime", category: "LIFESTYLE", plan: "All-in-One Annual Pass", badge: "Master Voucher", content: "Bundled subscriptions covering OTT, news, dining, travel, and healthcare perks.", bg: "bg-indigo-950/25 border-indigo-500/25 hover:border-indigo-400/50", color: "text-indigo-300", badgeColor: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20", priority: 16 },
    { name: "Cultpass Live", category: "LIFESTYLE", plan: "Annual Fitness & Mind", badge: "Direct Provision", content: "Unlimited live workout sessions, daily meditation classes, and fitness tracking.", bg: "bg-pink-950/20 border-pink-500/20 hover:border-pink-500/40", color: "text-pink-300", badgeColor: "bg-pink-500/10 text-pink-300 border-pink-500/20", priority: 17 },
    { name: "BookMyShow Stream", category: "LIFESTYLE", plan: "Cinema Voucher Pass", badge: "Encrypted Code", content: "Movie premiere digital rentals, theatre cinema vouchers, and live event passes.", bg: "bg-rose-950/20 border-rose-500/20 hover:border-rose-500/40", color: "text-rose-400", badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/20", priority: 18 },
    { name: "MakeMyTrip Black", category: "LIFESTYLE", plan: "VIP Travel Tier", badge: "Direct Provision", content: "Complimentary flight cancellations, airport lounge passes, and room upgrades.", bg: "bg-red-950/20 border-red-500/20 hover:border-red-500/40", color: "text-red-300", badgeColor: "bg-red-500/10 text-red-300 border-red-500/20", priority: 19 },
    { name: "Uber One", category: "LIFESTYLE", plan: "Quarterly Mobility Pass", badge: "Instant Code", content: "Ride discounts, zero cancellation charges, and priority airport ride dispatching.", bg: "bg-slate-900 border-slate-700 hover:border-slate-500", color: "text-slate-100", badgeColor: "bg-slate-800 text-slate-300 border-slate-700", priority: 20 },
    { name: "Blinkit VIP", category: "LIFESTYLE", plan: "Instant Grocery Pass", badge: "Coupon Lock", content: "Free instant 10-minute delivery, festival priority slots, and cashbacks.", bg: "bg-yellow-950/20 border-yellow-500/20 hover:border-yellow-500/40", color: "text-yellow-300", badgeColor: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20", priority: 21 },
    { name: "Practo Plus", category: "LIFESTYLE", plan: "Annual Health Plan", badge: "Direct Provision", content: "Unlimited 24x7 doctor consultations for the entire family with zero waiting time.", bg: "bg-teal-950/20 border-teal-500/20 hover:border-teal-500/40", color: "text-teal-300", badgeColor: "bg-teal-500/10 text-teal-300 border-teal-500/20", priority: 22 },
    { name: "Pharmeasy Plus", category: "LIFESTYLE", plan: "Annual Healthcare Pass", badge: "Encrypted Code", content: "Free medicine delivery, cashbacks, and complimentary diagnostic lab health checkups.", bg: "bg-emerald-950/20 border-emerald-500/20 hover:border-emerald-500/40", color: "text-emerald-400", badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", priority: 23 },

    // SaaS & Developer Tools
    { name: "GitHub Copilot", category: "SAAS", plan: "Individual & Business Pass", badge: "Corporate API Token", content: "AI pair programmer supporting all IDEs with code autocompletion and unit test generation.", bg: "bg-slate-900/60 border-slate-700 hover:border-slate-500", color: "text-slate-100", badgeColor: "bg-slate-800 text-slate-300 border-slate-700", priority: 24 },
    { name: "Notion Plus", category: "SAAS", plan: "Annual Workspace Pass", badge: "Direct Seat Grant", content: "Unlimited file uploads, custom automation workflows, and collaborative databases.", bg: "bg-slate-900 border-slate-800 hover:border-slate-600", color: "text-slate-200", badgeColor: "bg-slate-800 text-slate-300 border-slate-700", priority: 25 },
    { name: "Canva Pro", category: "SAAS", plan: "Annual Creative Suite", badge: "Instant Key", content: "100M+ premium stock assets, brand kits, AI magic resizing, and background removal.", bg: "bg-cyan-950/25 border-cyan-500/25 hover:border-cyan-400/50", color: "text-cyan-300", badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20", priority: 26 },
    { name: "Grammarly Business", category: "SAAS", plan: "Annual Writing Assistant", badge: "License Code", content: "Tone adjustments, generative writing suggestions, style guides, and plagiarism scans.", bg: "bg-emerald-950/25 border-emerald-500/25 hover:border-emerald-400/50", color: "text-emerald-300", badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20", priority: 27 },
    { name: "Figma Professional", category: "SAAS", plan: "Annual Design Workspace", badge: "Seat Provision", content: "Unlimited version history, shared team component libraries, and dev mode tools.", bg: "bg-purple-950/20 border-purple-500/20 hover:border-purple-500/40", color: "text-purple-300", badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/20", priority: 28 },
    { name: "1Password Teams", category: "SAAS", plan: "Annual Security Vault", badge: "Enterprise Voucher", content: "Zero-knowledge credential vaulting, watchtower alerts, and biometrics login.", bg: "bg-blue-950/20 border-blue-500/20 hover:border-blue-500/40", color: "text-blue-300", badgeColor: "bg-blue-500/10 text-blue-300 border-blue-500/20", priority: 29 },
    { name: "Zoom One Pro", category: "SAAS", plan: "Annual Video Conferencing", badge: "Direct Seat", content: "30-hour meeting limits, AI Companion summaries, and 5GB cloud recording storage.", bg: "bg-sky-950/20 border-sky-500/20 hover:border-sky-500/40", color: "text-sky-300", badgeColor: "bg-sky-500/10 text-sky-300 border-sky-500/20", priority: 30 },
    { name: "Linear Standard", category: "SAAS", plan: "Annual Issue Tracker", badge: "License Key", content: "Keyboard-first issue tracker, sprint planning cycles, and roadmaps.", bg: "bg-indigo-950/20 border-indigo-500/20 hover:border-indigo-500/40", color: "text-indigo-300", badgeColor: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20", priority: 31 },
    { name: "Loom Business", category: "SAAS", plan: "Annual Async Video", badge: "Seat Grant", content: "Unlimited video recordings, custom branding, viewer insights, and AI transcription.", bg: "bg-purple-950/20 border-purple-500/20 hover:border-purple-500/40", color: "text-purple-300", badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/20", priority: 32 },
    { name: "Superhuman", category: "SAAS", plan: "Annual High-Speed Email", badge: "Invite Token", content: "Blazing-fast email workflow with AI triage, instant split inboxes, and reminders.", bg: "bg-amber-950/20 border-amber-500/20 hover:border-amber-500/40", color: "text-amber-300", badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/20", priority: 33 },

    // Gaming Ecosystems
    { name: "Xbox Game Pass", category: "GAMING", plan: "Ultimate & Core (PC/Console)", badge: "Digital Code Vault", content: "Day-one access to iconic franchises, EA Play catalog, and cloud gaming library.", bg: "bg-green-950/25 border-green-500/25 hover:border-green-400/50 hover:bg-green-900/30", color: "text-green-300", badgeColor: "bg-green-500/10 text-green-300 border-green-500/20", priority: 8 },
    { name: "PlayStation (PSN)", category: "GAMING", plan: "Wallet Top-up & Plus", badge: "Instant PIN Issue", content: "Online multiplayer access, monthly games catalog, and official PS Store credit.", bg: "bg-indigo-950/25 border-indigo-500/25 hover:border-indigo-400/50 hover:bg-indigo-900/30", color: "text-indigo-300", badgeColor: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20", priority: 9 },
    { name: "Steam Wallet", category: "GAMING", plan: "Global Digital Gift Card", badge: "Encrypted PIN", content: "Direct Steam currency vouchers redeemable for thousands of PC game titles and DLCs.", bg: "bg-slate-900 border-slate-700 hover:border-slate-500", color: "text-slate-200", badgeColor: "bg-slate-800 text-slate-300 border-slate-700", priority: 34 },
    { name: "Riot Access PIN", category: "GAMING", plan: "Valorant & LoL Points", badge: "Digital Code", content: "Official Riot Points code for in-game skins, battle passes, and weapon packs.", bg: "bg-red-950/20 border-red-500/20 hover:border-red-500/40", color: "text-red-400", badgeColor: "bg-red-500/10 text-red-400 border-red-500/20", priority: 35 },
    { name: "Nintendo eShop", category: "GAMING", plan: "Prepaid Digital Card", badge: "Vault PIN", content: "Download classic Nintendo Switch titles, indie hits, and DLCs straight to console.", bg: "bg-red-950/20 border-red-500/20 hover:border-red-500/40", color: "text-red-300", badgeColor: "bg-red-500/10 text-red-300 border-red-500/20", priority: 36 },
    { name: "Roblox Gift Code", category: "GAMING", plan: "Robux & Virtual Items", badge: "Instant PIN", content: "In-game virtual currency for game upgrades, accessories, and avatar customisation.", bg: "bg-slate-900 border-slate-800 hover:border-slate-600", color: "text-slate-300", badgeColor: "bg-slate-800 text-slate-400 border-slate-700", priority: 37 },
    { name: "Discord Nitro", category: "GAMING", plan: "Monthly & Annual Pass", badge: "Gift Link API", content: "500MB file uploads, custom HD streaming, emoji everywhere, and 2 Server Boosts.", bg: "bg-indigo-950/20 border-indigo-500/20 hover:border-indigo-500/40", color: "text-indigo-400", badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20", priority: 38 },
    { name: "Battle.net Balance", category: "GAMING", plan: "Blizzard Digital Card", badge: "Instant PIN", content: "Purchase World of Warcraft game time, Diablo bundles, and Call of Duty items.", bg: "bg-blue-950/20 border-blue-500/20 hover:border-blue-500/40", color: "text-blue-300", badgeColor: "bg-blue-500/10 text-blue-300 border-blue-500/20", priority: 39 },
    { name: "Apple App Store", category: "GAMING", plan: "Universal Media Card", badge: "Digital Code", content: "Direct redemption for mobile gaming microtransactions and Apple Arcade passes.", bg: "bg-slate-900 border-slate-700 hover:border-slate-500", color: "text-slate-100", badgeColor: "bg-slate-800 text-slate-300 border-slate-700", priority: 40 },
    { name: "Google Play Card", category: "GAMING", plan: "Android Gaming Code", badge: "Instant PIN", content: "In-app purchases, Android mobile battle passes, and premium mobile games.", bg: "bg-emerald-950/20 border-emerald-500/20 hover:border-emerald-500/40", color: "text-emerald-300", badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20", priority: 41 },

    // Frontier AI Suites
    { name: "AI Subscriptions", category: "AI", plan: "ChatGPT Plus / Perplexity / Gemini", badge: "Corporate API Keys", content: "Frontier multimodal reasoning, developer workspaces, and research assistance tools.", bg: "bg-teal-950/25 border-teal-500/25 hover:border-teal-400/50 hover:bg-teal-900/30", color: "text-teal-300", badgeColor: "bg-teal-500/10 text-teal-300 border-teal-500/20", priority: 10 },
    { name: "ChatGPT Plus", category: "AI", plan: "OpenAI Multimodal 1M Pass", badge: "Corporate Key", content: "Advanced voice mode, GPT-4o image generation, custom GPTs, and data analysis.", bg: "bg-teal-950/25 border-teal-500/25 hover:border-teal-400/50", color: "text-teal-300", badgeColor: "bg-teal-500/10 text-teal-300 border-teal-500/20", priority: 42 },
    { name: "Perplexity Pro", category: "AI", plan: "Annual Research Engine", badge: "Master Voucher", content: "Unlimited Pro queries, multi-model switcher (Claude, Sonar, GPT-4o), and file analysis.", bg: "bg-cyan-950/25 border-cyan-500/25 hover:border-cyan-400/50", color: "text-cyan-300", badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20", priority: 43 },
    { name: "Claude Pro", category: "AI", plan: "Anthropic Enterprise Seat", badge: "Seat Grant", content: "Extended 200K token reasoning window, Projects workspace, and code synthesis.", bg: "bg-amber-950/20 border-amber-500/20 hover:border-amber-500/40", color: "text-amber-300", badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/20", priority: 44 },
    { name: "Midjourney Pro", category: "AI", plan: "Creative Imaging Pass", badge: "Access Token", content: "Relaxed & Fast GPU hours, stealth mode generation, and high-resolution upscales.", bg: "bg-indigo-950/20 border-indigo-500/20 hover:border-indigo-500/40", color: "text-indigo-300", badgeColor: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20", priority: 45 },
    { name: "Cursor Pro", category: "AI", plan: "AI Code Editor Pass", badge: "License Code", content: "Fast code completions, multi-file codebase reasoning, and inline smart diffs.", bg: "bg-slate-900 border-slate-700 hover:border-slate-500", color: "text-slate-100", badgeColor: "bg-slate-800 text-slate-300 border-slate-700", priority: 46 },
    { name: "ElevenLabs Creator", category: "AI", plan: "Voice & Speech Synthesis", badge: "API Allowance", content: "Human-grade voice cloning, multilingual voice generation, and audio dubbing.", bg: "bg-violet-950/20 border-violet-500/20 hover:border-violet-500/40", color: "text-violet-300", badgeColor: "bg-violet-500/10 text-violet-300 border-violet-500/20", priority: 47 },
    { name: "Runway Gen-3", category: "AI", plan: "Creative Video Generator", badge: "Credits Bundle", content: "High-fidelity cinematic text-to-video, motion brush control, and video stylisation.", bg: "bg-rose-950/20 border-rose-500/20 hover:border-rose-500/40", color: "text-rose-300", badgeColor: "bg-rose-500/10 text-rose-300 border-rose-500/20", priority: 48 },
    { name: "Otter.ai Business", category: "AI", plan: "Annual Meeting Intelligence", badge: "Direct Seat", content: "Automated meeting notes, real-time transcription, and automated action summaries.", bg: "bg-blue-950/20 border-blue-500/20 hover:border-blue-500/40", color: "text-blue-300", badgeColor: "bg-blue-500/10 text-blue-300 border-blue-500/20", priority: 49 },
    { name: "Grammarly AI", category: "AI", plan: "Generative Professional", badge: "License Key", content: "Context-aware co-writing, tone calibration, and enterprise-grade privacy protection.", bg: "bg-emerald-950/20 border-emerald-500/20 hover:border-emerald-500/40", color: "text-emerald-300", badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20", priority: 50 },
  ];

  const filteredBrands =
    selectedCategory === "ALL"
      ? allMasterBrands.filter((b) => b.priority <= 10)
      : allMasterBrands.filter((b) => b.category === selectedCategory).slice(0, 10);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
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
            <a href="#usecases" className="hover:text-white transition">Use Cases</a>
            <a href="#architecture" className="hover:text-white transition">Fulfillment Rails</a>
            <Link href="/docs" className="hover:text-white transition">API Docs</Link>
            <Link href="/blogs" className="hover:text-white transition">Blogs</Link>
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

          <div className="pt-2 flex items-center justify-center">
            <a
              href="#callback"
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide shadow-xl shadow-blue-600/25 transition flex items-center space-x-2"
            >
              <span>Talk to Subscription Infrastructure Lead</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Target Use Cases */}
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

      {/* Brand Catalog Preview */}
      <section id="brands" className="py-20 border-b border-slate-800/50 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Brand Network</span>
            <h2 className="text-3xl font-bold text-white mt-1">Available Subscriptions & Perks</h2>
            <p className="text-xs text-slate-400 mt-1">
              Top curated wholesale allocations displayed per ecosystem.
            </p>
          </div>

          {/* Clean Ecosystem Filter Selector */}
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

        {/* Dynamic Brand Cards Grid */}
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

        <div className="mt-10 text-center">
          <Link
            href="/catalog"
            className="inline-flex items-center space-x-2 text-xs font-semibold px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-blue-400 hover:text-white hover:bg-slate-800 transition"
          >
            <span>Explore Complete Master Catalog & Full Brand Specifications</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
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

      {/* Enterprise Callback Enquiry Desk */}
      <section id="callback" className="py-24 border-b border-slate-800/50 bg-slate-900/20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Enterprise Partnerships</span>
            <h2 className="text-3xl font-extrabold text-white">Request Platform Call Back & Wholesale Rates</h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Tell us about your customer volume, desired brands, and perks architecture. Our partnerships lead will connect with custom commercial terms.
            </p>
          </div>

          <form onSubmit={handleEnquirySubmit} className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-5">
            {submitSuccess && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 text-xs flex items-center space-x-3">
                <Check className="w-5 h-5 shrink-0" />
                <div>
                  <strong className="font-bold block">Enquiry Received Successfully!</strong>
                  <span>Our enterprise lead will call you back within 2 business hours.</span>
                </div>
              </div>
            )}

            {submitError && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs">
                {submitError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 font-semibold text-xs block mb-1.5">First Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-sans"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold text-xs block mb-1.5">Last Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sharma"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-sans"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 font-semibold text-xs block mb-1.5">Official Work Email *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-semibold text-xs block mb-1.5">Phone Number (with Country Code) *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-sans"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 font-semibold text-xs block mb-1.5">Company / Organization Name</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. Fintech Bank / Digital Platform"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-semibold text-xs block mb-1.5">Current City *</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pune, Bengaluru, Mumbai"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-sans"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 font-semibold text-xs block mb-1.5">Primary Use Case</label>
                <select
                  value={primaryInterest}
                  onChange={(e) => setPrimaryInterest(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-sans"
                >
                  <option value="Credit Card Perks & Milestones">Credit Card Perks & Milestones</option>
                  <option value="Rewards & Loyalty Points Burn">Rewards & Loyalty Points Burn</option>
                  <option value="Giveaways & User Acquisition">Giveaways & User Acquisition</option>
                  <option value="Employee Benefits & Corporate Wellness">Employee Benefits & Corporate Wellness</option>
                  <option value="Custom API & Co-Branded Hub">Custom In-App API Subscription Hub</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-semibold text-xs block mb-1.5">Projected Monthly Volume</label>
                <select
                  value={monthlyVolume}
                  onChange={(e) => setMonthlyVolume(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-sans"
                >
                  <option value="< 1,000 activations/mo">&lt; 1,000 activations/mo</option>
                  <option value="1,000 - 10,000 activations/mo">1,000 - 10,000 activations/mo</option>
                  <option value="10,000 - 50,000 activations/mo">10,000 - 50,000 activations/mo</option>
                  <option value="50,000+ activations/mo">50,000+ activations/mo (High Volume)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-slate-400 font-semibold text-xs block mb-1.5">
                What are you looking for? (Specific brands, delivery models, integration timeline)
              </label>
              <textarea
                rows={3}
                placeholder="e.g. We are looking to distribute annual OTT & lifestyle vouchers to our cardholders with webhook notifications..."
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs transition flex items-center justify-center space-x-2 shadow-xl shadow-blue-600/25"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? "Submitting Call Back Request..." : "Request Partnership Call Back"}</span>
            </button>
          </form>
        </div>
      </section>

      {/* Clean Footer with Social Media & Pune Attribution */}
      <footer className="py-12 max-w-7xl mx-auto px-6 border-t border-slate-900 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs">
            <span className="text-slate-400 font-medium">Subzo Technologies Pvt Ltd, India © 2026. All rights reserved.</span>

            <div className="flex items-center space-x-3 text-slate-400">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-blue-400 hover:border-blue-500/40 transition"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 1 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.39 9.74v-8.37H5.07v8.37z" />
                </svg>
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-slate-600 transition"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-red-500 hover:border-red-500/40 transition"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-pink-400 hover:border-pink-500/40 transition"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-blue-500 hover:border-blue-500/40 transition"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="https://reddit.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Reddit"
                className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-orange-500 hover:border-orange-500/40 transition"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.56 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.609a1.24 1.24 0 0 1 1.108-.703zM9.25 12C8.56 12 8 12.562 8 13.252s.562 1.252 1.25 1.252c.69 0 1.252-.562 1.252-1.252S9.94 12 9.25 12zm5.5 0c-.69 0-1.252.562-1.252 1.252s.562 1.252 1.252 1.252c.688 0 1.25-.562 1.25-1.252S15.44 12 14.75 12zm-5.464 3.99a.347.347 0 0 0-.16.037.34.34 0 0 0-.134.468c.55 1.01 1.77 1.637 2.994 1.637 1.223 0 2.443-.627 2.994-1.637a.34.34 0 0 0-.134-.468.345.345 0 0 0-.469.134c-.404.742-1.396 1.22-2.391 1.22-.996 0-1.988-.478-2.392-1.22a.343.343 0 0 0-.308-.171z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 text-slate-400 font-medium text-xs">
            <span>Made with</span>
            <span className="text-red-500">❤️</span>
            <span>from Pune</span>
          </div>
        </div>
      </footer>
    </div>
  );
}