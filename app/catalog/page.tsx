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
  category: "OTT" | "LIFESTYLE" | "MUSIC" | "SAAS" | "GAMING" | "AI" | "LEARNING" | "MISC";
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
    "ALL" | "OTT" | "LIFESTYLE" | "MUSIC" | "SAAS" | "GAMING" | "AI" | "LEARNING" | "MISC"
  >("ALL");
  const [selectedBrand, setSelectedBrand] = useState<CatalogItem | null>(null);

  const fullCatalog: CatalogItem[] = [
    // ==========================================
    // 1. STREAMING & OTT
    // ==========================================
    {
      id: "jiohotstar-super",
      brand: "JioHotstar",
      category: "OTT",
      plan: "Super Plan",
      duration: "12 Months",
      mrp: "₹1,099",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=hotstar.com&sz=128",
      badgeBg: "bg-blue-500/10 text-blue-300 border-blue-500/20",
      description: "Live sports, ICC tournaments, Premier League, Disney+ hits, HBO blockbusters, and multi-lingual Indian entertainment in Full HD.",
      features: [
        "Concurrent streaming on up to 2 screens (TV, Mobile, Laptop)",
        "Full HD (1080p) video quality with Dolby 5.1 audio",
        "Direct MSISDN binding or instant voucher delivery"
      ],
      termsAndConditions: [
        "Valid for 365 days from activation timestamp.",
        "Non-transferable once activated on customer MSISDN.",
        "Standard sponsor ads apply to live sports feeds."
      ]
    },
    {
      id: "jiohotstar-premium",
      brand: "JioHotstar",
      category: "OTT",
      plan: "Premium Tier",
      duration: "12 Months",
      mrp: "₹2,199",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=hotstar.com&sz=128",
      badgeBg: "bg-blue-500/10 text-blue-300 border-blue-500/20",
      description: "Flagship 4K Ultra HD ad-free tier for JioHotstar, supporting 4 concurrent devices across smart televisions and phones.",
      features: [
        "Concurrent streaming on up to 4 devices simultaneously",
        "4K Ultra HD (2160p) with Dolby Atmos audio",
        "Ad-free streaming for all non-live entertainment series"
      ],
      termsAndConditions: [
        "Valid for 12 months.",
        "Live sports feeds contain standard sponsor ads."
      ]
    },
    {
      id: "amazon-prime",
      brand: "Amazon Prime",
      category: "OTT",
      plan: "Annual Full Access Membership",
      duration: "12 Months",
      mrp: "₹1,499",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=primevideo.com&sz=128",
      badgeBg: "bg-amber-500/10 text-amber-300 border-amber-500/20",
      description: "Prime Video 4K HDR streaming, free expedited shipping, Amazon Music, and Prime Gaming bundle.",
      features: [
        "Prime Video 4K HDR across TV, mobile, and web",
        "Free 1-Day & 2-Day guaranteed parcel shipping",
        "Ad-free access to 100M+ tracks on Amazon Music"
      ],
      termsAndConditions: [
        "Redeemable on Amazon India consumer accounts.",
        "Stacks automatically if existing Prime plan is running."
      ]
    },
    {
      id: "netflix-premium",
      brand: "Netflix",
      category: "OTT",
      plan: "Premium 4K Ultra HD",
      duration: "Monthly / Annual Pass",
      mrp: "₹649 / mo",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=netflix.com&sz=128",
      badgeBg: "bg-red-500/10 text-red-300 border-red-500/20",
      description: "Global award-winning original series, Indian cinema, anime, and documentaries with spatial audio.",
      features: [
        "Stream on 4 supported devices at a time",
        "Ultra HD (4K) and HDR resolution",
        "Download on 6 supported devices"
      ],
      termsAndConditions: [
        "Delivered as direct Netflix Gift Voucher PIN.",
        "Redeemable on netflix.com/redeem."
      ]
    },
    {
      id: "sonyliv-premium",
      brand: "SonyLIV",
      category: "OTT",
      plan: "Premium All Access",
      duration: "12 Months",
      mrp: "₹1,499",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=sonyliv.com&sz=128",
      badgeBg: "bg-sky-500/10 text-sky-300 border-sky-500/20",
      description: "UEFA Champions League, WWE Network, live Grand Slam tennis, and SonyLIV original blockbusters.",
      features: [
        "Stream on 2 screens simultaneously in Full HD / 4K",
        "Complete WWE live pay-per-view events and library",
        "Direct MSISDN binding supported"
      ],
      termsAndConditions: [
        "Valid on web, iOS, Android, and Smart TV apps.",
        "Non-refundable once provisioned."
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
      description: "500+ regional originals, Hindi blockbusters, and 90+ live news & regional television channels.",
      features: [
        "Content across 12 Indian regional languages",
        "Concurrent streaming on 2 screens",
        "Direct MSISDN auto-activation supported"
      ],
      termsAndConditions: [
        "Valid for 365 days across Pan-India.",
        "Active phone number required for direct activation."
      ]
    },
    {
      id: "aha-video",
      brand: "Aha Video",
      category: "OTT",
      plan: "Telugu Gold Annual",
      duration: "12 Months",
      mrp: "₹699",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=aha.video&sz=128",
      badgeBg: "bg-rose-500/10 text-rose-300 border-rose-500/20",
      description: "100% native regional Telugu & Tamil entertainment hub with exclusive movies, chat shows, and originals.",
      features: [
        "4K Ultra HD with Dolby 5.1 sound",
        "Ad-free streaming on all movies and shows",
        "Direct mobile phone binding"
      ],
      termsAndConditions: [
        "Valid on Indian mobile numbers (+91).",
        "Valid for 1 full year."
      ]
    },
    {
      id: "hoichoi-annual",
      brand: "hoichoi",
      category: "OTT",
      plan: "Bengali All Access Annual",
      duration: "12 Months",
      mrp: "₹899",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=hoichoi.tv&sz=128",
      badgeBg: "bg-red-500/10 text-red-300 border-red-500/20",
      description: "The world's largest Bengali entertainment platform with 600+ movies, web series, and exclusive premieres.",
      features: [
        "Simultaneous streaming on 2 devices",
        "Full HD quality with English subtitles",
        "Direct voucher delivery"
      ],
      termsAndConditions: [
        "Redeemable on hoichoi.tv.",
        "Valid for 1 year from redemption."
      ]
    },
    {
      id: "lionsgate-play",
      brand: "Lionsgate Play",
      category: "OTT",
      plan: "Annual All Access",
      duration: "12 Months",
      mrp: "₹699",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=lionsgateplay.com&sz=128",
      badgeBg: "bg-slate-800 text-slate-300 border-slate-700",
      description: "Hollywood franchises, John Wick, Starz originals, and global cinema available in Indian regional dubs.",
      features: [
        "5 simultaneous device streams",
        "Ad-free across all content",
        "Full HD streaming quality"
      ],
      termsAndConditions: [
        "Valid on iOS, Android, and Smart TV apps.",
        "Non-transferable once activated."
      ]
    },
    {
      id: "sun-nxt",
      brand: "Sun NXT",
      category: "OTT",
      plan: "South Cinema Annual",
      duration: "12 Months",
      mrp: "₹480",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=sunnxt.com&sz=128",
      badgeBg: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      description: "4,000+ South Indian movies in Tamil, Telugu, Malayalam, and Kannada, live TV channels, and music.",
      features: [
        "Access to Sun TV serials and live channels",
        "Multiple South Indian language audio feeds",
        "Direct voucher activation"
      ],
      termsAndConditions: [
        "Valid for 12 months.",
        "Available Pan-India."
      ]
    },
    {
      id: "discovery-plus",
      brand: "Discovery+",
      category: "OTT",
      plan: "Premium Annual",
      duration: "12 Months",
      mrp: "₹399",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=discoveryplus.in&sz=128",
      badgeBg: "bg-blue-500/10 text-blue-300 border-blue-500/20",
      description: "Documentaries, science, nature, automotive series, and exclusive international factual programming.",
      features: [
        "Ad-free streaming on factual content",
        "Exclusive motor-racing live feeds",
        "Stream on mobile, tablet, and TV"
      ],
      termsAndConditions: [
        "Valid across India.",
        "Redeemable on discoveryplus.in."
      ]
    },
    {
      id: "apple-tv-plus",
      brand: "Apple TV+",
      category: "OTT",
      plan: "Annual Pass",
      duration: "12 Months",
      mrp: "₹1,188",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=apple.com&sz=128",
      badgeBg: "bg-slate-800 text-slate-200 border-slate-700",
      description: "Apple Original series and movies, Ted Lasso, The Morning Show, Severance in 4K HDR and spatial audio.",
      features: [
        "Family Sharing with up to 5 members",
        "4K HDR with Dolby Vision & Dolby Atmos",
        "Ad-free viewing experience"
      ],
      termsAndConditions: [
        "Requires Apple ID.",
        "Redeemable on Apple devices and the Apple TV app."
      ]
    },
    {
      id: "crunchyroll-fan",
      brand: "Crunchyroll",
      category: "OTT",
      plan: "Mega Fan Annual",
      duration: "12 Months",
      mrp: "₹999",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=crunchyroll.com&sz=128",
      badgeBg: "bg-orange-500/10 text-orange-300 border-orange-500/20",
      description: "World's largest dedicated anime library: Demon Slayer, Jujutsu Kaisen, Attack on Titan with Hindi/Tamil dubs.",
      features: [
        "Simultaneous streaming on 4 screens",
        "Offline viewing on mobile devices",
        "Same-day releases as Japan broadcast"
      ],
      termsAndConditions: [
        "Delivered as direct digital gift voucher.",
        "Valid on Crunchyroll India."
      ]
    },
    {
      id: "chaupal-annual",
      brand: "Chaupal",
      category: "OTT",
      plan: "Punjabi, Haryanvi & Bhojpuri Trio",
      duration: "12 Months",
      mrp: "₹999",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=chaupal.tv&sz=128",
      badgeBg: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      description: "North India's dedicated regional powerhouse with regional cinema, web series, and music in 3 languages.",
      features: [
        "Full HD ad-free regional streaming",
        "2 concurrent screens",
        "Direct code voucher delivery"
      ],
      termsAndConditions: [
        "Valid for 1 year.",
        "Redeemable on chaupal.tv."
      ]
    },

    // ==========================================
    // 2. EVERYDAY LIFESTYLE
    // ==========================================
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
      description: "Free food delivery, Instamart grocery perks, Dineout discounts, and Genie courier privileges across India.",
      features: [
        "Free deliveries on food orders above ₹149",
        "Free deliveries on Instamart orders above ₹199",
        "Up to 40% extra discounts at Dineout partner restaurants",
        "Zero surge fee surges on food orders"
      ],
      termsAndConditions: [
        "Delivered as single-use coupon code.",
        "Applied in Swiggy mobile app under Membership tab."
      ]
    },
    {
      id: "zomato-gold",
      brand: "Zomato Gold",
      category: "LIFESTYLE",
      plan: "VIP Delivery & Dining",
      duration: "12 Months",
      mrp: "₹999",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=zomato.com&sz=128",
      badgeBg: "bg-red-500/10 text-red-300 border-red-500/20",
      description: "Free food delivery on orders, up to 40% off on dining out, and exclusive VIP rush hour delivery priority.",
      features: [
        "Free delivery at all partner restaurants within 7-10 km",
        "Dine-in savings across top metropolitan cities",
        "Priority customer support"
      ],
      termsAndConditions: [
        "Applied in the Zomato app under Gold membership.",
        "Valid in all Zomato serviced Indian cities."
      ]
    },
    {
      id: "times-prime",
      brand: "Times Prime",
      category: "LIFESTYLE",
      plan: "Master Privileges Pass",
      duration: "12 Months",
      mrp: "₹1,199",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=timesprime.com&sz=128",
      badgeBg: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
      description: "Mega bundle with Disney+ Hotstar, SonyLIV, Starbucks perks, Swiggy, and Uber mobility vouchers.",
      features: [
        "Multiple complimentary OTT subscriptions included",
        "Food, travel, and dining discounts",
        "Master redemption code delivered via vault"
      ],
      termsAndConditions: [
        "Redeemable on the Times Prime app.",
        "Individual brand perks must be activated during the validity term."
      ]
    },
    {
      id: "cult-fit-live",
      brand: "Cult.fit",
      category: "LIFESTYLE",
      plan: "Cultpass Live Annual",
      duration: "12 Months",
      mrp: "₹1,990",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=cult.fit&sz=128",
      badgeBg: "bg-pink-500/10 text-pink-300 border-pink-500/20",
      description: "Interactive fitness, yoga, and meditation masterclasses led by India's top celebrity trainers.",
      features: [
        "Unlimited live workouts: HIIT, Strength, Dance, Yoga",
        "Real-time energy meter tracking via phone camera",
        "Guided meditation and nutrition sessions"
      ],
      termsAndConditions: [
        "Valid on Cult.fit iOS & Android applications.",
        "Access starts when voucher is added to wallet."
      ]
    },
    {
      id: "fitpass-pro",
      brand: "FITPASS",
      category: "LIFESTYLE",
      plan: "Multi-Gym Access Pass",
      duration: "3 Months",
      mrp: "₹3,999",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=fitpass.co.in&sz=128",
      badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
      description: "Access 12,000+ gyms and fitness centers across 150+ Indian cities with a single universal membership.",
      features: [
        "Work out at partner gyms anywhere in India",
        "Zumba, MMA, boxing, swimming, and pilates included",
        "FITFEAST dedicated certified nutritionist diet guidance"
      ],
      termsAndConditions: [
        "Redeemable in the FITPASS app.",
        "Non-transferable once registered to an individual."
      ]
    },
    {
      id: "pvr-inox-passport",
      brand: "PVR INOX",
      category: "LIFESTYLE",
      plan: "Cinema Passport Monthly",
      duration: "Monthly Pass",
      mrp: "₹349 / mo",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=pvrcinemas.com&sz=128",
      badgeBg: "bg-amber-500/10 text-amber-300 border-amber-500/20",
      description: "Subscription movie pass allowing up to 10 cinema tickets a month on weekdays across PVR INOX screens.",
      features: [
        "Watch movies from Monday to Thursday at zero ticket cost",
        "Valid across regular 2D and 3D formats",
        "Instant digital code delivery"
      ],
      termsAndConditions: [
        "Excludes recliner seats and IMAX/Gold formats unless upgraded.",
        "Non-transferable government ID required at theatre box office."
      ]
    },
    {
      id: "makemytrip-black",
      brand: "MakeMyTrip",
      category: "LIFESTYLE",
      plan: "MMT Black VIP Travel",
      duration: "12 Months",
      mrp: "₹1,499",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=makemytrip.com&sz=128",
      badgeBg: "bg-red-500/10 text-red-300 border-red-500/20",
      description: "Complimentary flight cancellations, airport lounge passes, early hotel check-ins, and free room upgrades.",
      features: [
        "Zero flight cancellation fees",
        "Airport fast-track and lounge vouchers",
        "Dedicated VIP relationship manager support"
      ],
      termsAndConditions: [
        "Redeemable on the MakeMyTrip account.",
        "Valid for 1 year from activation."
      ]
    },
    {
      id: "uber-one",
      brand: "Uber One",
      category: "LIFESTYLE",
      plan: "Quarterly Mobility Pass",
      duration: "3 Months",
      mrp: "₹449",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=uber.com&sz=128",
      badgeBg: "bg-slate-800 text-slate-100 border-slate-700",
      description: "Discounts on rides, priority airport dispatching, and zero fee on cancellations.",
      features: [
        "Up to 10% off on top-rated Uber Premier rides",
        "Priority driver dispatching during rush hours",
        "Single-use encrypted vault coupon"
      ],
      termsAndConditions: [
        "Valid on Indian Uber accounts.",
        "Redeemable under Uber Wallet."
      ]
    },
    {
      id: "practo-plus",
      brand: "Practo",
      category: "LIFESTYLE",
      plan: "Practo Plus Family Health",
      duration: "12 Months",
      mrp: "₹2,499",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=practo.com&sz=128",
      badgeBg: "bg-teal-500/10 text-teal-300 border-teal-500/20",
      description: "Unlimited 24x7 online doctor consultations across 20+ specialties for up to 6 family members.",
      features: [
        "Zero consultation fees for general physicians and specialists",
        "Prescriptions and diagnostic advice within 15 minutes",
        "Discounts on in-clinic visits and medicines"
      ],
      termsAndConditions: [
        "Valid for up to 6 family members.",
        "Valid across all Indian pin codes."
      ]
    },

    // ==========================================
    // 3. MUSIC & AUDIO
    // ==========================================
    {
      id: "spotify-premium",
      brand: "Spotify",
      category: "MUSIC",
      plan: "Premium Individual Annual",
      duration: "12 Months",
      mrp: "₹1,189",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=spotify.com&sz=128",
      badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
      description: "Ad-free music streaming, unlimited skips, offline downloads, and high-fidelity audio across 100M+ tracks.",
      features: [
        "Ad-free music listening on mobile, desktop, and smart speakers",
        "Download songs for offline listening",
        "Organize listening queues and shared Jam sessions"
      ],
      termsAndConditions: [
        "Delivered as official Spotify E-Gift Voucher PIN.",
        "Redeemable on spotify.com/redeem."
      ]
    },
    {
      id: "youtube-premium",
      brand: "YouTube Premium",
      category: "MUSIC",
      plan: "Individual Annual Membership",
      duration: "12 Months",
      mrp: "₹1,490",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=youtube.com&sz=128",
      badgeBg: "bg-red-500/10 text-red-300 border-red-500/20",
      description: "Ad-free YouTube videos, background play while using other apps, offline downloads, and YouTube Music Premium.",
      features: [
        "Completely ad-free YouTube video streaming",
        "Picture-in-picture background audio playback",
        "Full YouTube Music Premium catalog bundled at no extra cost"
      ],
      termsAndConditions: [
        "Valid for Google accounts in India.",
        "Stacks on existing YouTube memberships."
      ]
    },
    {
      id: "apple-music",
      brand: "Apple Music",
      category: "MUSIC",
      plan: "Individual Annual Pass",
      duration: "12 Months",
      mrp: "₹1,188",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=music.apple.com&sz=128",
      badgeBg: "bg-rose-500/10 text-rose-300 border-rose-500/20",
      description: "Lossless audio up to 24-bit/192kHz, Spatial Audio with Dolby Atmos, and curated live radio stations.",
      features: [
        "100M+ songs in pristine lossless audio",
        "Time-synced lyrics with vocal sliders (Apple Music Sing)",
        "Works on iOS, Android, Windows, and web"
      ],
      termsAndConditions: [
        "Requires active Apple ID.",
        "Redeemable via Apple Gift Card balance."
      ]
    },
    {
      id: "jiosaavn-pro",
      brand: "JioSaavn",
      category: "MUSIC",
      plan: "Pro Annual",
      duration: "12 Months",
      mrp: "₹749",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=jiosaavn.com&sz=128",
      badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      description: "Unlimited ad-free music, unlimited JioTune caller tunes, 320kbps HD audio, and multi-lingual Indian libraries.",
      features: [
        "Unlimited JioTunes changes every month",
        "Ad-free streaming with offline downloads",
        "Direct phone number activation"
      ],
      termsAndConditions: [
        "Valid on all Indian mobile carrier networks.",
        "Valid for 1 full year."
      ]
    },
    {
      id: "audible-membership",
      brand: "Audible",
      category: "MUSIC",
      plan: "Audible Premium Plus",
      duration: "12 Months",
      mrp: "₹2,388",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=audible.in&sz=128",
      badgeBg: "bg-amber-500/10 text-amber-300 border-amber-500/20",
      description: "Amazon's premier audiobook membership. 1 credit every month to buy and keep any audiobook permanently.",
      features: [
        "Unlimited access to thousands of Audible Plus audio titles",
        "Exclusive member discounts of 30% on additional purchases",
        "Keep audiobooks permanently even after membership expires"
      ],
      termsAndConditions: [
        "Redeemable on audible.in using an Amazon India login."
      ]
    },
    {
      id: "kuku-fm",
      brand: "Kuku FM",
      category: "MUSIC",
      plan: "Annual Audiobooks Pass",
      duration: "12 Months",
      mrp: "₹899",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=kukufm.com&sz=128",
      badgeBg: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      description: "India's leading vernacular audio platform offering book summaries, personal finance stories, and motivation.",
      features: [
        "Audio stories and summaries in 7 Indian regional languages",
        "Ad-free listening with offline download mode",
        "Direct coupon code delivery"
      ],
      termsAndConditions: [
        "Valid for 365 days from redemption on the Kuku FM app."
      ]
    },

    // ==========================================
    // 4. SAAS & DEVELOPER TOOLS
    // ==========================================
    {
      id: "github-copilot",
      brand: "GitHub",
      category: "SAAS",
      plan: "GitHub Copilot Individual",
      duration: "12 Months",
      mrp: "₹9,800",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=github.com&sz=128",
      badgeBg: "bg-slate-800 text-slate-300 border-slate-700",
      description: "The world's leading AI developer tool for multi-file autocompletions, real-time code chat, and testing.",
      features: [
        "Native extensions for VS Code, Visual Studio, JetBrains, and Neovim",
        "Natural language to code syntax conversion",
        "Corporate API allowance or direct seat grant"
      ],
      termsAndConditions: [
        "Requires active GitHub handle.",
        "Non-transferable once assigned."
      ]
    },
    {
      id: "notion-plus",
      brand: "Notion",
      category: "SAAS",
      plan: "Notion Plus Annual Workspace",
      duration: "12 Months",
      mrp: "₹9,600",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=notion.so&sz=128",
      badgeBg: "bg-slate-800 text-slate-300 border-slate-700",
      description: "Connected workspace for docs, project roadmaps, and custom team automation databases.",
      features: [
        "Unlimited blocks for individuals and teams",
        "Unlimited file uploads (no 5MB cap)",
        "30-day page version history"
      ],
      termsAndConditions: [
        "Applicable to new or existing Notion workspace accounts.",
        "Valid for 1 full year."
      ]
    },
    {
      id: "canva-pro",
      brand: "Canva",
      category: "SAAS",
      plan: "Canva Pro Annual Suite",
      duration: "12 Months",
      mrp: "₹3,999",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=canva.com&sz=128",
      badgeBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
      description: "Complete visual design workspace unlocking 100M+ stock assets, Magic Studio AI tools, and Brand Kits.",
      features: [
        "100M+ premium stock photos, graphics, and video clips",
        "One-click Magic Switch layout adaptation & background remover",
        "1TB cloud asset storage"
      ],
      termsAndConditions: [
        "Redeemable on canva.com/redeem.",
        "Applies to 1 named user account."
      ]
    },
    {
      id: "figma-pro",
      brand: "Figma",
      category: "SAAS",
      plan: "Figma Professional Annual",
      duration: "12 Months",
      mrp: "₹14,400",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=figma.com&sz=128",
      badgeBg: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      description: "Industry-standard collaborative interface design and prototyping tool with Dev Mode and design systems.",
      features: [
        "Unlimited Figma files and version history",
        "Shared team component libraries",
        "Dev Mode for inspect and export tools"
      ],
      termsAndConditions: [
        "Assigned as direct user seat grant.",
        "Valid for 1 year."
      ]
    },
    {
      id: "grammarly-pro",
      brand: "Grammarly",
      category: "SAAS",
      plan: "Grammarly Premium Annual",
      duration: "12 Months",
      mrp: "₹11,500",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=grammarly.com&sz=128",
      badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
      description: "AI writing assistant delivering tone adjustments, generative rewriting, style guide alignment, and plagiarism checks.",
      features: [
        "Full sentence rewrites for clarity and impact",
        "Tone suggestions and professional vocabulary enhancements",
        "Works across all desktop apps, web browsers, and email"
      ],
      termsAndConditions: [
        "Redeemable on grammarly.com."
      ]
    },
    {
      id: "onepassword",
      brand: "1Password",
      category: "SAAS",
      plan: "1Password Individual Annual",
      duration: "12 Months",
      mrp: "₹3,499",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=1password.com&sz=128",
      badgeBg: "bg-blue-500/10 text-blue-300 border-blue-500/20",
      description: "End-to-end encrypted password manager, passkey vault, and credential autofill tool for all devices.",
      features: [
        "Unlimited password and passkey storage",
        "Watchtower alerts for compromised credentials",
        "Cross-platform sync on iOS, Android, Mac, and Windows"
      ],
      termsAndConditions: [
        "Valid for 1 full calendar year."
      ]
    },
    {
      id: "zoom-pro",
      brand: "Zoom",
      category: "SAAS",
      plan: "Zoom Workplace Pro",
      duration: "12 Months",
      mrp: "₹13,200",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=zoom.us&sz=128",
      badgeBg: "bg-sky-500/10 text-sky-300 border-sky-500/20",
      description: "HD video conferencing up to 30 hours per meeting, AI Companion meeting summaries, and 5GB cloud storage.",
      features: [
        "Meetings up to 30 hours with 100 participants",
        "AI Companion automated meeting transcripts and action points",
        "Cloud video recordings"
      ],
      termsAndConditions: [
        "Assigned to corporate email user profile."
      ]
    },
    {
      id: "microsoft-365",
      brand: "Microsoft 365",
      category: "SAAS",
      plan: "Personal Annual Subscription",
      duration: "12 Months",
      mrp: "₹4,899",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=microsoft.com&sz=128",
      badgeBg: "bg-blue-500/10 text-blue-300 border-blue-500/20",
      description: "Premium Word, Excel, PowerPoint, Outlook apps, and 1TB OneDrive cloud storage with ransomware detection.",
      features: [
        "Desktop apps with offline work capabilities",
        "1TB OneDrive cloud storage with personal vault",
        "Advanced security features in Outlook"
      ],
      termsAndConditions: [
        "Delivered as 25-character digital product key.",
        "Redeemable on setup.office.com."
      ]
    },

    // ==========================================
    // 5. GAMING ECOSYSTEMS
    // ==========================================
    {
      id: "xbox-gpu",
      brand: "Xbox Game Pass",
      category: "GAMING",
      plan: "Ultimate Tier (PC & Console)",
      duration: "1 Month Pass",
      mrp: "₹829",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=xbox.com&sz=128",
      badgeBg: "bg-green-500/10 text-green-300 border-green-500/20",
      description: "Play hundreds of high-quality console and PC games, EA Play catalog, and cloud gaming.",
      features: [
        "Day-one access to new releases from Xbox Game Studios and Bethesda",
        "Includes EA Play catalog on PC and Xbox",
        "Cloud Gaming enabled: stream on phones and tablets"
      ],
      termsAndConditions: [
        "Redeemable on microsoft.com/redeem or Xbox consoles in India.",
        "Stacks up to 36 months on Microsoft accounts."
      ]
    },
    {
      id: "psn-wallet",
      brand: "PlayStation (PSN)",
      category: "GAMING",
      plan: "PlayStation Store Wallet ₹1,000",
      duration: "Digital PIN Card",
      mrp: "₹1,000",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=playstation.com&sz=128",
      badgeBg: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
      description: "Official Sony PlayStation Network wallet voucher for games, DLCs, and PlayStation Plus subscriptions.",
      features: [
        "Adds ₹1,000 credit directly to Indian PSN account wallet",
        "Use on PS5, PS4, or PlayStation Store web",
        "Zero expiration date once added to balance"
      ],
      termsAndConditions: [
        "Must be redeemed on an Indian PSN account (+91 region locked).",
        "12-digit alphanumeric code delivered via vault."
      ]
    },
    {
      id: "steam-wallet",
      brand: "Steam",
      category: "GAMING",
      plan: "Steam Wallet Digital Gift ₹500",
      duration: "Digital PIN Card",
      mrp: "₹500",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=steampowered.com&sz=128",
      badgeBg: "bg-slate-800 text-slate-300 border-slate-700",
      description: "Direct wallet credits for Steam, the leading digital distribution platform for PC gaming worldwide.",
      features: [
        "Credits ₹500 directly into player's Steam wallet",
        "Redeemable during major seasonal sales (Summer / Winter Sale)",
        "Instant code issued with zero expiry date"
      ],
      termsAndConditions: [
        "Valid for Indian Steam accounts.",
        "Redeemable on store.steampowered.com."
      ]
    },
    {
      id: "discord-nitro",
      brand: "Discord",
      category: "GAMING",
      plan: "Discord Nitro Annual",
      duration: "12 Months",
      mrp: "₹4,999",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=discord.com&sz=128",
      badgeBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      description: "500MB file uploads, custom HD 4K 60fps streaming, emoji everywhere, and 2 Server Boosts.",
      features: [
        "Stream in 4K 60fps across voice channels",
        "Custom badges, animated avatars, and banners",
        "2 Free Server Boosts plus 30% off extra boosts"
      ],
      termsAndConditions: [
        "Delivered as direct gift activation link.",
        "Redeemable on any active Discord profile."
      ]
    },
    {
      id: "riot-points",
      brand: "Riot Games",
      category: "GAMING",
      plan: "Valorant Points (VP) Voucher",
      duration: "Prepaid Code",
      mrp: "₹1,000",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=riotgames.com&sz=128",
      badgeBg: "bg-red-500/10 text-red-400 border-red-500/20",
      description: "Official Valorant Points code for in-game weapon skins, battle passes, and Radianite points.",
      features: [
        "Instant credit to Indian server Valorant profile",
        "Unlock premium weapon skins and knife upgrades",
        "Single-use encrypted code"
      ],
      termsAndConditions: [
        "Redeemable in the in-game Valorant client."
      ]
    },
    {
      id: "roblox-code",
      brand: "Roblox",
      category: "GAMING",
      plan: "Robux Digital Gift Card ₹1,000",
      duration: "Digital PIN Card",
      mrp: "₹1,000",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=roblox.com&sz=128",
      badgeBg: "bg-slate-800 text-slate-300 border-slate-700",
      description: "Robux in-game virtual currency to purchase avatar accessories, items, and experience perks.",
      features: [
        "Adds currency balance straight to Roblox user account",
        "Free virtual exclusive item included with redemption",
        "Zero expiry date"
      ],
      termsAndConditions: [
        "Redeemable on roblox.com/redeem."
      ]
    },

    // ==========================================
    // 6. FRONTIER AI SUITES
    // ==========================================
    {
      id: "chatgpt-plus",
      brand: "ChatGPT Plus",
      category: "AI",
      plan: "OpenAI Multimodal Pass",
      duration: "1 Month Pass",
      mrp: "₹1,999",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=openai.com&sz=128",
      badgeBg: "bg-teal-500/10 text-teal-300 border-teal-500/20",
      description: "Official OpenAI subscription granting priority access to GPT-4o, advanced voice mode, and custom GPTs.",
      features: [
        "Unlimited GPT-4o multimodal reasoning and code interpreter",
        "Real-time voice conversation mode on iOS & Android",
        "File uploads and document data analysis"
      ],
      termsAndConditions: [
        "Valid for personal or enterprise OpenAI consumer accounts.",
        "Valid for 30 days from activation."
      ]
    },
    {
      id: "perplexity-pro",
      brand: "Perplexity Pro",
      category: "AI",
      plan: "Annual AI Research Engine",
      duration: "12 Months",
      mrp: "₹16,500",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=perplexity.ai&sz=128",
      badgeBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
      description: "Conversational answer engine citing real-time web sources with choice between Claude 3.5 and GPT-4o.",
      features: [
        "Unlimited Pro Search with comprehensive cited answers",
        "Multi-model switcher: Claude 3.5 Sonnet, GPT-4o, and Sonar",
        "Unlimited document and PDF research uploads"
      ],
      termsAndConditions: [
        "Redeemable on perplexity.ai.",
        "Valid for 1 full year."
      ]
    },
    {
      id: "claude-pro",
      brand: "Claude Pro",
      category: "AI",
      plan: "Anthropic Reasoning Suite",
      duration: "1 Month Pass",
      mrp: "₹1,999",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=anthropic.com&sz=128",
      badgeBg: "bg-amber-500/10 text-amber-300 border-amber-500/20",
      description: "Extended 200,000 token context window, Claude 3.5 Sonnet Artifacts, and priority peak access.",
      features: [
        "5x more usage compared to free tier",
        "Create interactive frontend components inside Artifacts",
        "Long document synthesis and financial model analysis"
      ],
      termsAndConditions: [
        "Redeemable on claude.ai."
      ]
    },
    {
      id: "midjourney-pro",
      brand: "Midjourney",
      category: "AI",
      plan: "Standard Creative Imaging",
      duration: "1 Month Pass",
      mrp: "₹2,499",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=midjourney.com&sz=128",
      badgeBg: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
      description: "State-of-the-art generative imaging engine with 15 Fast GPU hours, unlimited Relaxed hours, and web creation.",
      features: [
        "Photorealistic 8K image generation",
        "Web creation canvas and inpainting tools",
        "Commercial usage rights included"
      ],
      termsAndConditions: [
        "Assigned to Discord or Midjourney web account."
      ]
    },
    {
      id: "cursor-pro",
      brand: "Cursor",
      category: "AI",
      plan: "AI Code Editor Pro",
      duration: "1 Month Pass",
      mrp: "₹1,699",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=cursor.com&sz=128",
      badgeBg: "bg-slate-800 text-slate-100 border-slate-700",
      description: "The AI-first fork of VS Code. Full codebase indexing, instant multi-file edits, and smart terminal debugging.",
      features: [
        "500 fast premium requests per month",
        "Unlimited slow requests and cursor-tab autocompletes",
        "Real-time indexing of private git repositories"
      ],
      termsAndConditions: [
        "Redeemable on cursor.com."
      ]
    },

    // ==========================================
    // 7. NEWS, BUSINESS & LEARNING
    // ==========================================
    {
      id: "the-ken",
      brand: "The Ken",
      category: "LEARNING",
      plan: "Annual All-Access Journalism",
      duration: "12 Months",
      mrp: "₹3,499",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=the-ken.com&sz=128",
      badgeBg: "bg-red-500/10 text-red-300 border-red-500/20",
      description: "India's premier subscription-only business journalism covering technology, startups, and public policy.",
      features: [
        "One deeply reported analytical business story every day",
        "Access to narrative podcasts and subscriber-only newsletters",
        "Full unmetered archive access across 8+ years"
      ],
      termsAndConditions: [
        "Redeemable on the-ken.com.",
        "Valid for 1 year from activation."
      ]
    },
    {
      id: "morning-context",
      brand: "The Morning Context",
      category: "LEARNING",
      plan: "Annual News & Analysis",
      duration: "12 Months",
      mrp: "₹3,499",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=themorningcontext.com&sz=128",
      badgeBg: "bg-blue-500/10 text-blue-300 border-blue-500/20",
      description: "Investigative business and technology journalism focusing on governance, fintech, and venture capital.",
      features: [
        "Independent reporting across Internet, Business, and Chaos beats",
        "Subscriber-exclusive morning briefings",
        "Unlimited access across web and mobile apps"
      ],
      termsAndConditions: [
        "Redeemable on themorningcontext.com."
      ]
    },
    {
      id: "et-prime",
      brand: "Economic Times Prime",
      category: "LEARNING",
      plan: "ET Prime Annual Membership",
      duration: "12 Months",
      mrp: "₹2,499",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=economictimes.indiatimes.com&sz=128",
      badgeBg: "bg-amber-500/10 text-amber-300 border-amber-500/20",
      description: "Deep-dive financial analysis, sectoral research reports, stock market intelligence, and executive insights.",
      features: [
        "Minimal ad reading experience on Economic Times",
        "Stock research reports and analyst consensus calls",
        "Complimentary TOI+ and DocuBay passes bundled"
      ],
      termsAndConditions: [
        "Redeemable on economictimes.com/prime."
      ]
    },
    {
      id: "duolingo-super",
      brand: "Duolingo",
      category: "LEARNING",
      plan: "Super Duolingo Annual",
      duration: "12 Months",
      mrp: "₹1,799",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=duolingo.com&sz=128",
      badgeBg: "bg-green-500/10 text-green-300 border-green-500/20",
      description: "Master Spanish, French, German, or Japanese with unlimited hearts, personalized mistakes review, and zero ads.",
      features: [
        "Unlimited hearts to learn at own pace without waiting",
        "Practice Hub to review personalized weak words",
        "No ads interrupting language lessons"
      ],
      termsAndConditions: [
        "Redeemable on duolingo.com/redeem."
      ]
    },
    {
      id: "coursera-plus",
      brand: "Coursera",
      category: "LEARNING",
      plan: "Coursera Plus Annual Pass",
      duration: "12 Months",
      mrp: "₹32,500",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=coursera.org&sz=128",
      badgeBg: "bg-blue-500/10 text-blue-300 border-blue-500/20",
      description: "Unlimited access to 7,000+ courses, professional certificates from Google, IBM, and top global universities.",
      features: [
        "Unlimited verified certificates to add to LinkedIn",
        "Hands-on projects and interactive labs",
        "Learn at your own pace with offline video support"
      ],
      termsAndConditions: [
        "Redeemable on coursera.org.",
        "Non-transferable once registered."
      ]
    },

    // ==========================================
    // 8. MISCELLANEOUS (LIFESTYLE, UTILITIES, DATING)
    // ==========================================
    {
      id: "tata-neupass",
      brand: "Tata NeuPass",
      category: "MISC",
      plan: "Annual Ecosystem Pass",
      duration: "12 Months",
      mrp: "₹1,499",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=tataneu.com&sz=128",
      badgeBg: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      description: "Rewards and privileges across Tata brands: 5% NeuCoins on BigBasket, Croma, 1mg, Taj Hotels, and Air India.",
      features: [
        "5% extra NeuCoins across all Tata consumer brands",
        "Free delivery on BigBasket grocery orders",
        "Complimentary dining vouchers at Taj Hotels"
      ],
      termsAndConditions: [
        "Valid on the Tata Neu app.",
        "Requires Indian phone number."
      ]
    },
    {
      id: "truecaller-premium",
      brand: "Truecaller",
      category: "MISC",
      plan: "Truecaller Premium Annual",
      duration: "12 Months",
      mrp: "₹529",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=truecaller.com&sz=128",
      badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      description: "Ad-free caller ID, advanced spam blocking, who viewed my profile notifications, and incognito mode.",
      features: [
        "Automatic spam and robocall blocking",
        "See who viewed your phone number profile",
        "Premium badge on your caller profile"
      ],
      termsAndConditions: [
        "Linked to user's registered phone number.",
        "Valid on Android and iOS."
      ]
    },
    {
      id: "cleartrip-pass",
      brand: "Cleartrip",
      category: "MISC",
      plan: "Cleartrip Plus Annual",
      duration: "12 Months",
      mrp: "₹999",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=cleartrip.com&sz=128",
      badgeBg: "bg-orange-500/10 text-orange-300 border-orange-500/20",
      description: "Free flight date changes, zero convenience fee on bookings, and instant hotel upgrade vouchers.",
      features: [
        "Change flight dates up to 12 hours before departure for free",
        "Zero convenience charges across all bookings",
        "Flat hotel savings"
      ],
      termsAndConditions: [
        "Redeemable on cleartrip.com."
      ]
    },
    {
      id: "bumble-premium",
      brand: "Bumble",
      category: "MISC",
      plan: "Bumble Premium 3M Pass",
      duration: "3 Months",
      mrp: "₹2,499",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=bumble.com&sz=128",
      badgeBg: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      description: "See who liked you, unlimited filters, travel mode to match in any city worldwide, and unlimited extends.",
      features: [
        "Beeline: instantly see who already swiped right on you",
        "Travel Mode to connect in other cities before landing",
        "Unlimited rematches on expired connections"
      ],
      termsAndConditions: [
        "Redeemable as voucher PIN on bumble.com.",
        "Valid on Indian accounts."
      ]
    },
    {
      id: "headspace-plus",
      brand: "Headspace",
      category: "MISC",
      plan: "Headspace Plus Annual Mind",
      duration: "12 Months",
      mrp: "₹1,499",
      status: "Available",
      logoUrl: "https://www.google.com/s2/favicons?domain=headspace.com&sz=128",
      badgeBg: "bg-orange-500/10 text-orange-300 border-orange-500/20",
      description: "Mindfulness and meditation app with 500+ guided meditations for stress, focus, sleep audio, and workouts.",
      features: [
        "Sleepcasts and relaxing sleep ambient soundscapes",
        "Quick 3-minute SOS meditations for stress and panic",
        "Focus music designed with leading neuroscience researchers"
      ],
      termsAndConditions: [
        "Redeemable on headspace.com/redeem."
      ]
    }
  ];

  // Filtering Logic
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

        {/* Search & Dynamic Category Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            {[
              { id: "ALL", label: "All Master SKUs" },
              { id: "OTT", label: "Streaming & OTT" },
              { id: "LIFESTYLE", label: "Everyday Lifestyle" },
              { id: "MUSIC", label: "Music & Audio" },
              { id: "SAAS", label: "SaaS & Tools" },
              { id: "GAMING", label: "Gaming Ecosystems" },
              { id: "AI", label: "Frontier AI Suites" },
              { id: "LEARNING", label: "News & Learning" },
              { id: "MISC", label: "Miscellaneous" }
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
              placeholder="Search across all brands or plans..."
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

        {/* Modal Drawer: Full Brand Specification View */}
        {selectedBrand && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-7 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-48 h-48 pointer-events-none opacity-[0.05]">
                <img
                  src={selectedBrand.logoUrl}
                  alt=""
                  className="w-full h-full object-contain filter grayscale invert"
                />
              </div>

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

              <div className="space-y-2 relative z-10">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">About the Brand</h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  {selectedBrand.description}
                </p>
              </div>

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

              <div className="space-y-2 relative z-10">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Terms & Conditions (T&C)</h4>
                <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800/80 text-[11px] text-slate-400 space-y-1.5">
                  {selectedBrand.termsAndConditions.map((tc, idx) => (
                    <p key={idx}>• {tc}</p>
                  ))}
                </div>
              </div>

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