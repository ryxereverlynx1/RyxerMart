"use client";

import React, { useState } from "react";
import {
  Check,
  Minus,
  ArrowRight,
  Star,
  ShoppingCart,
  Layers,
  Table as TableIcon,
  ChevronDown,
  ChevronUp,
  MessageCircle,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { generateWhatsAppContactLink } from "@/lib/whatsapp";

interface FeatureRow {
  name: string;
  category: string;
  starter: string | boolean;
  royal: string | boolean;
  ecommerce: string | boolean;
}

const CATEGORIES = [
  "Scope & Design",
  "Hosting & Infrastructure",
  "Lead Generation",
  "Management & Tech",
  "SEO & Support",
] as const;

type CategoryName = (typeof CATEGORIES)[number];

const COMPARISON_DATA: FeatureRow[] = [
  // Core Specs
  { name: "Pages Included", category: "Scope & Design", starter: "5–10 Custom Pages", royal: "15–20 Custom Pages", ecommerce: "Unlimited Products & Pages" },
  { name: "Delivery Timeline", category: "Scope & Design", starter: "3–5 Business Days", royal: "4–6 Business Days", ecommerce: "5–8 Business Days" },
  { name: "Responsive Across All Devices", category: "Scope & Design", starter: true, royal: true, ecommerce: true },
  { name: "Custom Visual Identity", category: "Scope & Design", starter: "Standard Clean", royal: "High-Impact Premium", ecommerce: "Retail E-Commerce Brand" },

  // Hosting & Security
  { name: "High-Speed SSD Cloud Hosting", category: "Hosting & Infrastructure", starter: "1 Year Free Included", royal: "1 Year Free Included", ecommerce: "1 Year Free Included" },
  { name: "SSL Security Certificate", category: "Hosting & Infrastructure", starter: "Free Pre-installed", royal: "Free Pre-installed", ecommerce: "Free Pre-installed" },
  { name: "Free Domain (.com / .in)", category: "Hosting & Infrastructure", starter: false, royal: "1 Year Included", ecommerce: false },

  // Communication & Conversion
  { name: "WhatsApp Direct Enquiry Setup", category: "Lead Generation", starter: true, royal: true, ecommerce: true },
  { name: "Mobile Call Button Integration", category: "Lead Generation", starter: true, royal: true, ecommerce: true },
  { name: "Google Map & Location Embed", category: "Lead Generation", starter: true, royal: true, ecommerce: true },
  { name: "Contact & Consultation Form", category: "Lead Generation", starter: true, royal: "Instant Email Routing", ecommerce: "Customer Account & Alerts" },
  { name: "AI Guidance Chatbot", category: "Lead Generation", starter: true, royal: "Smart Assistant", ecommerce: "Smart Assistant" },

  // Management & E-Commerce
  { name: "Dedicated Admin Panel", category: "Management & Tech", starter: false, royal: "Content & Lead Manager", ecommerce: "Full Store Dashboard" },
  { name: "Product Catalog & Cart System", category: "Management & Tech", starter: false, royal: "WhatsApp Catalog", ecommerce: "Up to 100 Products Setup" },
  { name: "Payment Gateway (UPI/Razorpay/COD)", category: "Management & Tech", starter: false, royal: false, ecommerce: true },
  { name: "Coupons & Discount Engine", category: "Management & Tech", starter: false, royal: false, ecommerce: true },
  { name: "Customer Reviews & Rating System", category: "Management & Tech", starter: false, royal: false, ecommerce: true },

  // SEO & Support
  { name: "Google SEO Friendly Architecture", category: "SEO & Support", starter: true, royal: "Advanced Meta + Console Setup", ecommerce: "Product Schema + SEO" },
  { name: "Technical Maintenance Support", category: "SEO & Support", starter: "30 Days Free", royal: "60 Days Priority", ecommerce: "90 Days Dedicated" },
];

type TierKey = "starter" | "royal" | "ecommerce";

interface TierConfig {
  key: TierKey;
  name: string;
  shortName: string;
  badge: string;
  isPopular?: boolean;
  price: number;
  formattedPrice: string;
  slug: string;
  tagline: string;
  delivery: string;
}

const TIERS: TierConfig[] = [
  {
    key: "starter",
    name: "Starter Website",
    shortName: "Starter",
    badge: "Quick Launch",
    isPopular: false,
    price: 3499,
    formattedPrice: "₹3,499",
    slug: "starter-website",
    tagline: "Essential web presence for startups & local businesses.",
    delivery: "3–5 Days",
  },
  {
    key: "royal",
    name: "Royal Website",
    shortName: "Royal",
    badge: "Most Popular ★",
    isPopular: true,
    price: 5499,
    formattedPrice: "₹5,499",
    slug: "royal-website",
    tagline: "Flagship package with custom branding, free domain & lead panel.",
    delivery: "4–6 Days",
  },
  {
    key: "ecommerce",
    name: "Ecommerce Starter",
    shortName: "Ecommerce",
    badge: "Online Store",
    isPopular: false,
    price: 9999,
    formattedPrice: "₹9,999",
    slug: "ecommerce-starter",
    tagline: "Full online store with payment gateway, cart & order dashboard.",
    delivery: "5–8 Days",
  },
];

export function PricingComparisonTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMode, setMobileMode] = useState<"cards" | "matrix">("cards");
  const [activeTierKey, setActiveTierKey] = useState<TierKey>("royal");
  const { addItem } = useCart();
  const { toast } = useToast();

  const activeTier = TIERS.find((t) => t.key === activeTierKey) || TIERS[1];

  const handleQuickAdd = (slug: string, name: string, price: number) => {
    addItem(
      {
        serviceId: slug,
        slug,
        name,
        price,
      },
      1,
      false
    );
    toast(`"${name}" was added to your cart.`, {
      type: "success",
      title: "Package Added",
    });
  };

  const renderValue = (val: string | boolean) => {
    if (typeof val === "boolean") {
      return val ? (
        <div className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
      ) : (
        <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
          <Minus className="w-3.5 h-3.5" />
        </div>
      );
    }
    return (
      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 leading-snug">
        {val}
      </span>
    );
  };

  return (
    <div
      id="comparison-matrix"
      className="mt-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle overflow-hidden"
    >
      {/* Header Bar */}
      <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-violet dark:text-purple-400">
            Side-by-Side Evaluation
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white tracking-tight mt-0.5">
            Compare All Package Specifications
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Evaluate exact deliverables across Starter (₹3,499), Royal (₹5,499), and Ecommerce (₹9,999).
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="px-5 py-2.5 rounded-xl text-xs font-bold transition-all bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-brand-navy dark:text-white border border-slate-200 dark:border-slate-700 shadow-subtle flex items-center gap-2 btn-press shrink-0"
        >
          <span>{isOpen ? "Hide Comparison" : "View Detailed Comparison Table"}</span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-brand-violet dark:text-purple-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-brand-violet dark:text-purple-400" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="animate-fade-in transition-opacity">
          {/* ========================================================================= */}
          {/* MOBILE RESPONSIVE VIEW (< md): DUAL MODE (SINGLE PAGE OR MATRIX WITH STICKY) */}
          {/* ========================================================================= */}
          <div className="block md:hidden p-4 sm:p-5">
            {/* View Mode Switcher: Fit to Single Page vs Side-by-Side Matrix */}
            <div className="flex items-center justify-between gap-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl mb-4 border border-slate-200/60 dark:border-slate-750">
              <button
                type="button"
                onClick={() => setMobileMode("cards")}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  mobileMode === "cards"
                    ? "bg-white dark:bg-slate-900 text-brand-navy dark:text-white shadow-subtle"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-brand-violet dark:text-purple-400" />
                <span>Single Page View</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileMode("matrix")}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  mobileMode === "matrix"
                    ? "bg-white dark:bg-slate-900 text-brand-navy dark:text-white shadow-subtle"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <TableIcon className="w-3.5 h-3.5 text-brand-violet dark:text-purple-400" />
                <span>Side-by-Side Grid</span>
              </button>
            </div>

            {/* OPTION 1: SINGLE-PAGE VIEW (FITS 100% ON SCREEN WITH NO HORIZONTAL SCROLL) */}
            {mobileMode === "cards" && (
              <div className="space-y-4">
                {/* 3-Tier Segmented Tabs */}
                <div
                  role="tablist"
                  aria-label="Pricing Packages"
                  className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/70 rounded-xl"
                >
                  {TIERS.map((tier) => {
                    const isSelected = activeTierKey === tier.key;
                    return (
                      <button
                        key={tier.key}
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setActiveTierKey(tier.key)}
                        className={`py-2 px-1.5 rounded-lg text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-0.5 active:scale-95 ${
                          isSelected
                            ? tier.isPopular
                              ? "bg-brand-violet text-white shadow-md shadow-brand-violet/20"
                              : "bg-brand-navy text-white shadow-md"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        <span className="truncate w-full flex items-center justify-center gap-1 text-[11px] font-extrabold">
                          {tier.isPopular && (
                            <Star className="w-2.5 h-2.5 fill-amber-300 text-amber-300 inline shrink-0" />
                          )}
                          {tier.shortName}
                        </span>
                        <span className="text-[10px] font-bold opacity-90 tabular-nums">
                          {tier.formattedPrice}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Tier Hero Summary Card */}
                <div
                  className={`p-4 rounded-xl border transition-all ${
                    activeTier.isPopular
                      ? "border-brand-violet/40 bg-purple-50/50 dark:bg-purple-950/20"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="text-base font-black text-brand-navy dark:text-white">
                          {activeTier.name}
                        </h4>
                        {activeTier.isPopular && (
                          <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-violet text-white">
                            Most Popular
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-snug">
                        {activeTier.tagline}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xl font-black text-brand-navy dark:text-white tabular-nums">
                          {activeTier.formattedPrice}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                          • One-time • {activeTier.delivery}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleQuickAdd(activeTier.slug, activeTier.name, activeTier.price)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold text-white shadow-sm flex items-center gap-1.5 shrink-0 active:scale-95 transition-transform ${
                        activeTier.isPopular
                          ? "bg-brand-violet hover:bg-brand-violet-hover"
                          : "bg-brand-navy hover:bg-brand-navy-light"
                      }`}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>

                {/* Grouped Feature Items (100% Width, Zero Horizontal Scroll) */}
                <div className="space-y-4">
                  {CATEGORIES.map((category) => {
                    const rows = COMPARISON_DATA.filter((r) => r.category === category);
                    return (
                      <div
                        key={category}
                        className="rounded-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900"
                      >
                        {/* Category Divider Header */}
                        <div className="px-3.5 py-2 bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200/80 dark:border-slate-800 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-violet dark:bg-purple-400"></span>
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                            {category}
                          </span>
                        </div>

                        {/* Feature Rows */}
                        <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                          {rows.map((row, rIdx) => {
                            const val = row[activeTierKey];
                            const isIncluded = val !== false;

                            return (
                              <div
                                key={rIdx}
                                className={`px-3.5 py-2.5 flex items-center justify-between gap-3 text-xs ${
                                  !isIncluded ? "opacity-60 bg-slate-50/40 dark:bg-slate-900/40" : ""
                                }`}
                              >
                                <span className="font-medium text-slate-800 dark:text-slate-200 flex-1 pr-2 leading-snug">
                                  {row.name}
                                </span>

                                <div className="shrink-0 text-right">
                                  {typeof val === "boolean" ? (
                                    val ? (
                                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 px-2 py-0.5 rounded-md">
                                        <Check className="w-3 h-3 stroke-[2.5]" />
                                        Included
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                                        <Minus className="w-3 h-3" />
                                        Not in tier
                                      </span>
                                    )
                                  ) : (
                                    <span className="inline-block text-[11px] font-bold text-brand-navy dark:text-purple-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md text-right border border-slate-200/50 dark:border-slate-750">
                                      {val}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Quick-Action Banner */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 via-brand-navy to-slate-900 text-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-md mt-4">
                  <div>
                    <span className="text-[11px] text-purple-200 block font-semibold">
                      Ready to launch your project?
                    </span>
                    <span className="text-sm font-black text-white">
                      {activeTier.name} — {activeTier.formattedPrice}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuickAdd(activeTier.slug, activeTier.name, activeTier.price)}
                      className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold bg-brand-violet hover:bg-brand-violet-hover text-white shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                    <a
                      href={generateWhatsAppContactLink(`Hello RyxerMart, I want to discuss the ${activeTier.name} package (${activeTier.formattedPrice}).`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center justify-center gap-1 active:scale-95 transition-transform"
                      title="Enquire on WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span className="sr-only sm:not-sr-only">WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* OPTION 2: SIDE-BY-SIDE MATRIX WITH STICKY LOCKED DELIVERABLE COLUMN */}
            {mobileMode === "matrix" && (
              <div className="space-y-2">
                {/* Horizontal Swipe Guidance */}
                <div className="flex items-center justify-between px-3 py-1.5 bg-brand-violet-light/30 dark:bg-purple-950/30 border border-brand-violet/20 rounded-lg text-[11px] text-brand-violet dark:text-purple-300 font-semibold">
                  <span>↔ Swipe horizontally to compare tiers</span>
                  <span className="font-extrabold">Feature names locked</span>
                </div>

                <div className="overflow-x-auto -webkit-overflow-scrolling-touch rounded-xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-left border-collapse min-w-[560px]">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                        {/* Sticky Column 1 Header */}
                        <th className="p-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 sticky left-0 z-20 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-[2px_0_6px_-1px_rgba(0,0,0,0.06)] dark:shadow-[2px_0_6px_-1px_rgba(0,0,0,0.5)] w-[140px] min-w-[140px]">
                          Feature
                        </th>

                        {/* Starter */}
                        <th className="p-2.5 text-center w-[130px] min-w-[130px]">
                          <div className="space-y-1">
                            <span className="text-xs font-bold text-brand-navy dark:text-white block">Starter</span>
                            <span className="text-sm font-black text-brand-navy dark:text-white block tabular-nums">
                              ₹3,499
                            </span>
                            <button
                              type="button"
                              onClick={() => handleQuickAdd("starter-website", "Starter Website", 3499)}
                              className="text-[10px] font-bold px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 inline-flex items-center gap-1 active:scale-95"
                            >
                              <ShoppingCart className="w-2.5 h-2.5" />
                              Add
                            </button>
                          </div>
                        </th>

                        {/* Royal (Highlighted) */}
                        <th className="p-2.5 text-center w-[140px] min-w-[140px] bg-brand-violet-light/30 dark:bg-purple-950/30 border-x border-brand-violet/20">
                          <div className="space-y-1">
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-brand-violet text-white text-[8px] font-black uppercase">
                              <Star className="w-2 h-2 fill-amber-300 text-amber-300" />
                              Royal
                            </span>
                            <span className="text-sm font-black text-brand-violet dark:text-purple-300 block tabular-nums">
                              ₹5,499
                            </span>
                            <button
                              type="button"
                              onClick={() => handleQuickAdd("royal-website", "Royal Website", 5499)}
                              className="text-[10px] font-bold px-2 py-1 rounded-md bg-brand-violet text-white inline-flex items-center gap-1 active:scale-95"
                            >
                              <ShoppingCart className="w-2.5 h-2.5" />
                              Add
                            </button>
                          </div>
                        </th>

                        {/* Ecommerce */}
                        <th className="p-2.5 text-center w-[130px] min-w-[130px]">
                          <div className="space-y-1">
                            <span className="text-xs font-bold text-brand-navy dark:text-white block">Ecommerce</span>
                            <span className="text-sm font-black text-brand-navy dark:text-white block tabular-nums">
                              ₹9,999
                            </span>
                            <button
                              type="button"
                              onClick={() => handleQuickAdd("ecommerce-starter", "Ecommerce Starter", 9999)}
                              className="text-[10px] font-bold px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 inline-flex items-center gap-1 active:scale-95"
                            >
                              <ShoppingCart className="w-2.5 h-2.5" />
                              Add
                            </button>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                      {CATEGORIES.map((category) => {
                        const rows = COMPARISON_DATA.filter((r) => r.category === category);
                        return (
                          <React.Fragment key={`cat-grp-${category}`}>
                            {/* Category Section Row with Sticky Left Header */}
                            <tr className="bg-slate-100/90 dark:bg-slate-800/90 border-y border-slate-200 dark:border-slate-700">
                              <td className="sticky left-0 z-20 bg-slate-100 dark:bg-slate-800 p-2 text-left text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-200 border-r border-slate-200 dark:border-slate-700 shadow-[2px_0_6px_-1px_rgba(0,0,0,0.06)] dark:shadow-[2px_0_6px_-1px_rgba(0,0,0,0.5)]">
                                {category}
                              </td>
                              <td
                                colSpan={3}
                                className="p-2 text-left text-[10px] text-slate-500 dark:text-slate-400 font-semibold"
                              >
                                Specifications
                              </td>
                            </tr>

                            {/* Features */}
                            {rows.map((row, rIdx) => (
                              <tr
                                key={`m-row-${rIdx}`}
                                className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 text-center"
                              >
                                <td className="p-2 text-left text-xs font-semibold text-slate-800 dark:text-slate-200 sticky left-0 z-10 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-[2px_0_6px_-1px_rgba(0,0,0,0.06)] dark:shadow-[2px_0_6px_-1px_rgba(0,0,0,0.5)]">
                                  <span className="line-clamp-2">{row.name}</span>
                                </td>
                                <td className="p-2">{renderValue(row.starter)}</td>
                                <td className="p-2 bg-brand-violet-light/20 dark:bg-purple-950/20 border-x border-brand-violet/20 font-semibold">
                                  {renderValue(row.royal)}
                                </td>
                                <td className="p-2">{renderValue(row.ecommerce)}</td>
                              </tr>
                            ))}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* DESKTOP & TABLET VIEW (>= md): FULL 4-COLUMN SIDE-BY-SIDE COMPARISON      */}
          {/* ========================================================================= */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-2/5">
                    Package Deliverables
                  </th>
                  <th className="p-5 text-center w-1/5">
                    <div className="space-y-1">
                      <span className="text-sm font-bold text-brand-navy dark:text-white block">Starter</span>
                      <span className="text-xl font-black text-brand-navy dark:text-white block tabular-nums">
                        ₹3,499
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQuickAdd("starter-website", "Starter Website", 3499)}
                        className="mt-2 text-xs font-bold px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors inline-flex items-center gap-1 active:scale-95"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Add to Cart
                      </button>
                    </div>
                  </th>
                  <th className="p-5 text-center w-1/5 bg-brand-violet-light/30 dark:bg-purple-950/20 border-x border-brand-violet/20">
                    <div className="space-y-1 relative">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-violet text-white text-[9px] font-extrabold uppercase mb-1">
                        <Star className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
                        Most Popular
                      </span>
                      <span className="text-sm font-bold text-brand-violet dark:text-purple-300 block">Royal</span>
                      <span className="text-xl font-black text-brand-violet dark:text-purple-300 block tabular-nums">
                        ₹5,499
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQuickAdd("royal-website", "Royal Website", 5499)}
                        className="mt-2 text-xs font-bold px-3.5 py-1.5 rounded-lg bg-brand-violet hover:bg-brand-violet-hover text-white transition-colors inline-flex items-center gap-1 active:scale-95"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Add to Cart
                      </button>
                    </div>
                  </th>
                  <th className="p-5 text-center w-1/5">
                    <div className="space-y-1">
                      <span className="text-sm font-bold text-brand-navy dark:text-white block">Ecommerce</span>
                      <span className="text-xl font-black text-brand-navy dark:text-white block tabular-nums">
                        ₹9,999
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQuickAdd("ecommerce-starter", "Ecommerce Starter", 9999)}
                        className="mt-2 text-xs font-bold px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors inline-flex items-center gap-1 active:scale-95"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Add to Cart
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {CATEGORIES.map((category) => {
                  const rows = COMPARISON_DATA.filter((r) => r.category === category);
                  return (
                    <React.Fragment key={`desk-cat-${category}`}>
                      {/* Category Section Divider Header */}
                      <tr className="bg-slate-100/70 dark:bg-slate-800/60 border-y border-slate-200/80 dark:border-slate-750">
                        <td
                          colSpan={4}
                          className="py-2.5 px-5 text-left text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-brand-violet dark:bg-purple-400"></span>
                            <span>{category}</span>
                          </div>
                        </td>
                      </tr>

                      {/* Rows for Category */}
                      {rows.map((row, idx) => (
                        <tr
                          key={`desk-row-${idx}`}
                          className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors text-center"
                        >
                          <td className="p-4 sm:p-5 text-left text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                            <div>
                              <span>{row.name}</span>
                              <span className="text-[10px] text-slate-400 dark:text-slate-500 block">
                                {row.category}
                              </span>
                            </div>
                          </td>
                          <td className="p-4 sm:p-5">{renderValue(row.starter)}</td>
                          <td className="p-4 sm:p-5 bg-brand-violet-light/15 dark:bg-purple-950/15 border-x border-brand-violet/20 font-semibold">
                            {renderValue(row.royal)}
                          </td>
                          <td className="p-4 sm:p-5">{renderValue(row.ecommerce)}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
