"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  IoDesktopOutline,
  IoPhonePortraitOutline,
  IoShieldCheckmarkOutline,
  IoCheckmarkOutline,
  IoArrowForwardOutline,
  IoLogoWhatsapp,
  IoSpeedometerOutline,
  IoSparklesOutline,
} from "react-icons/io5";

interface ShowcaseItem {
  id: string;
  title: string;
  category: "business" | "ecommerce" | "corporate";
  categoryLabel: string;
  description: string;
  packageRecommended: string;
  price: string;
  specs: string[];
  desktopFeatures: {
    badge: string;
    headline: string;
    subtext: string;
    stat: string;
  };
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "local-service",
    title: "Service Business & Clinic Architecture",
    category: "business",
    categoryLabel: "Small Business & Services",
    description: "High-speed landing and service architecture for local professionals, consulting practices, and service vendors.",
    packageRecommended: "Starter Website",
    price: "₹3,499",
    specs: ["5–10 Custom Pages", "1-Tap WhatsApp Consultation", "Interactive Google Location", "1-Year SSD Hosting Free"],
    desktopFeatures: {
      badge: "Instant Appointment Booking",
      headline: "Professional Care You Can Count On.",
      subtext: "Booking consultations online via WhatsApp with zero waiting time.",
      stat: "100% Mobile Optimized",
    },
  },
  {
    id: "royal-corporate",
    title: "Corporate Brand & Client Acquisition Portal",
    category: "corporate",
    categoryLabel: "Brand & Corporate",
    description: "Authoritative multi-page portal for industrial firms, corporate consultancies, and high-ticket service companies.",
    packageRecommended: "Royal Website (Most Popular)",
    price: "₹5,499",
    specs: ["15–20 Custom Pages", "Custom Admin Panel Access", "Free .com / .in Domain for 1 Yr", "Instant Lead Email Routing"],
    desktopFeatures: {
      badge: "Enterprise Authority",
      headline: "Engineering Solutions That Drive Growth.",
      subtext: "Secure portals with integrated admin panel management and priority support.",
      stat: "99+ PageSpeed Rating",
    },
  },
  {
    id: "d2c-store",
    title: "Retail D2C E-Commerce Storefront",
    category: "ecommerce",
    categoryLabel: "Retail & E-Commerce",
    description: "Full-scale storefront with interactive product catalog, shopping cart drawer, and WhatsApp 1-tap checkout.",
    packageRecommended: "Ecommerce Starter",
    price: "₹9,999",
    specs: ["Up to 100 Products Catalog", "WhatsApp Cart Checkout", "Payment Gateway Integration", "Inventory & Order Alerts"],
    desktopFeatures: {
      badge: "D2C Retail Ready",
      headline: "Curated Collection For Modern Lifestyles.",
      subtext: "One-click WhatsApp cart sync with automated email order confirmations.",
      stat: "Instant WhatsApp Checkout",
    },
  },
];

export function WebsiteShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "business" | "corporate" | "ecommerce">("all");
  const [activeItem, setActiveItem] = useState<ShowcaseItem>(SHOWCASE_ITEMS[1]);
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop");

  const filteredItems = selectedCategory === "all"
    ? SHOWCASE_ITEMS
    : SHOWCASE_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-10">
      {/* Category Pills & Device Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-750 overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setActiveItem(SHOWCASE_ITEMS[0]);
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              selectedCategory === "all"
                ? "bg-white dark:bg-slate-900 text-brand-navy dark:text-white shadow-subtle"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            All Formats
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("corporate");
              setActiveItem(SHOWCASE_ITEMS[1]);
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              selectedCategory === "corporate"
                ? "bg-white dark:bg-slate-900 text-brand-violet dark:text-purple-300 shadow-subtle"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Corporate &amp; Brand
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("ecommerce");
              setActiveItem(SHOWCASE_ITEMS[2]);
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              selectedCategory === "ecommerce"
                ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-subtle"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            E-Commerce Store
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("business");
              setActiveItem(SHOWCASE_ITEMS[0]);
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              selectedCategory === "business"
                ? "bg-white dark:bg-slate-900 text-brand-navy dark:text-white shadow-subtle"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Local Business
          </button>
        </div>

        {/* Desktop / Mobile Frame Toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-750">
          <button
            type="button"
            onClick={() => setDeviceMode("desktop")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              deviceMode === "desktop"
                ? "bg-white dark:bg-slate-900 text-brand-navy dark:text-white shadow-subtle"
                : "text-slate-500 dark:text-slate-400"
            }`}
            aria-label="Desktop preview view"
          >
            <IoDesktopOutline className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode("mobile")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              deviceMode === "mobile"
                ? "bg-white dark:bg-slate-900 text-brand-navy dark:text-white shadow-subtle"
                : "text-slate-500 dark:text-slate-400"
            }`}
            aria-label="Mobile preview view"
          >
            <IoPhonePortraitOutline className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Showcase Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Interactive Device Frame */}
        <div className="lg:col-span-8 flex justify-center">
          {deviceMode === "desktop" ? (
            /* Desktop Browser Frame */
            <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-3d-stage dark:shadow-3d-stage-dark overflow-hidden transition-all duration-300">
              {/* Window Bar */}
              <div className="px-4 py-3 bg-slate-100/80 dark:bg-slate-850 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                </div>
                <div className="py-1 px-4 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 text-[10px] text-slate-500 dark:text-slate-400 font-mono flex items-center gap-2">
                  <IoShieldCheckmarkOutline className="w-3 h-3 text-emerald-600" />
                  <span>Architecture Demo • {activeItem.categoryLabel}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  {activeItem.desktopFeatures.stat}
                </span>
              </div>

              {/* Website Preview Canvas */}
              <div className="p-8 sm:p-10 space-y-6 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/30 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 min-h-[360px] flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-violet-light dark:bg-purple-950/60 text-brand-violet dark:text-purple-300">
                    {activeItem.desktopFeatures.badge}
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-black text-brand-navy dark:text-white tracking-tight max-w-lg">
                    {activeItem.desktopFeatures.headline}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
                    {activeItem.desktopFeatures.subtext}
                  </p>
                </div>

                {/* Sub-cards inside preview */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  {activeItem.specs.slice(0, 3).map((spec, i) => (
                    <div
                      key={i}
                      className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2"
                    >
                      <IoCheckmarkOutline className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Mobile Phone Frame */
            <div className="w-[280px] sm:w-[320px] bg-slate-900 rounded-[36px] p-3 shadow-3d-phone dark:shadow-3d-phone-dark border-4 border-slate-800 relative transition-all duration-300">
              {/* Notch */}
              <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-2" />

              {/* Screen */}
              <div className="bg-white dark:bg-slate-900 rounded-[28px] overflow-hidden p-5 space-y-4 text-center min-h-[440px] flex flex-col justify-between">
                <div className="space-y-3 pt-2">
                  <span className="inline-block text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-brand-violet-light dark:bg-purple-950 text-brand-violet dark:text-purple-300">
                    {activeItem.desktopFeatures.badge}
                  </span>
                  <h5 className="text-lg font-black text-brand-navy dark:text-white leading-tight">
                    {activeItem.desktopFeatures.headline}
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {activeItem.desktopFeatures.subtext}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1.5">
                    <IoLogoWhatsapp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp 1-Tap Trigger</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-brand-navy dark:bg-brand-royal text-white text-[11px] font-bold">
                    <span>Explore This Package</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Format Details & Package Link */}
        <div className="lg:col-span-4 space-y-5">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-violet dark:text-purple-400">
              Format Specification
            </span>
            <h4 className="text-2xl font-black text-brand-navy dark:text-white tracking-tight mt-1">
              {activeItem.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              {activeItem.description}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Built using package
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-bold text-brand-navy dark:text-white">
                {activeItem.packageRecommended}
              </span>
              <span className="text-base font-black text-brand-violet dark:text-purple-300">
                {activeItem.price}
              </span>
            </div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              Includes 1 year free SSD cloud hosting &amp; SSL certificate
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Included Deliverables:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              {activeItem.specs.map((spec, i) => (
                <li key={i} className="flex items-center gap-2">
                  <IoCheckmarkOutline className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2">
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-navy hover:bg-brand-royal dark:bg-brand-royal dark:hover:bg-brand-royal-light text-white text-xs font-bold rounded-xl transition-all shadow-subtle active:scale-98"
            >
              <span>Select This Package</span>
              <IoArrowForwardOutline className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Honest Distinction Note */}
      <div className="text-center pt-4 text-xs text-slate-400 dark:text-slate-500 font-medium">
        <span>* Interactive architecture demonstrations. Every client website is custom-designed and tailored to your specific commercial niche.</span>
      </div>
    </div>
  );
}
