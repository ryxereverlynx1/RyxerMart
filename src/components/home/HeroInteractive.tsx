"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  MessageSquare,
  Sparkles,
  CheckCircle,
  Zap,
  Shield,
  Smartphone,
  Globe,
  ShoppingCart,
  Sliders,
  Check,
} from "lucide-react";

export function HeroInteractive() {
  const [activeTab, setActiveTab] = useState<"business" | "ecommerce" | "corporate">("business");

  const previewData = {
    business: {
      title: "Clean Local Business Website",
      category: "Starter Package • ₹3,499",
      features: ["5–10 Custom Pages", "1-Year SSD Hosting Free", "SSL Certificate Included", "WhatsApp Enquiry Setup"],
      badge: "Delivery in 3–5 Days",
      speed: "98/100",
      cta: "Enquire on WhatsApp",
    },
    ecommerce: {
      title: "Modern Online Store & Catalog",
      category: "Ecommerce Starter • ₹9,999",
      features: ["Product Catalog & Cart", "WhatsApp Order Checkout", "Payment Gateway Ready", "Customer Reviews System"],
      badge: "High Conversion Store",
      speed: "95/100",
      cta: "Explore Store Features",
    },
    corporate: {
      title: "Authoritative Brand & Admin Portal",
      category: "Royal Package • ₹5,499 (Most Popular)",
      features: ["15–20 Custom Pages", "Admin Dashboard Access", "WhatsApp E-Commerce", "Free Domain & Hosting"],
      badge: "Most Popular Choice",
      speed: "99/100",
      cta: "View Royal Specs",
    },
  };

  const currentPreview = previewData[activeTab];

  return (
    <div className="relative overflow-hidden pt-10 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28">
      {/* Subtle, restrained background geometry */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 right-1/4 w-96 h-96 rounded-full bg-brand-royal-glow blur-3xl opacity-60" />
        <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-brand-violet-glow blur-3xl opacity-50" />
        <div
          className="absolute inset-0 opacity-[0.25] dark:opacity-[0.12]"
          style={{
            backgroundImage: `radial-gradient(rgba(10, 37, 88, 0.2) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-violet-light dark:bg-slate-800 border border-brand-violet/20 dark:border-purple-500/20 text-brand-violet dark:text-purple-300 text-xs font-bold tracking-wide shadow-subtle">
              <Sparkles className="w-3.5 h-3.5 text-brand-violet dark:text-purple-400" />
              <span>Website Development for Modern Businesses</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-navy dark:text-white tracking-tight leading-[1.12]">
              Turn Your Business Into a Website That{" "}
              <span className="text-brand-violet">Actually Sells.</span>
            </h1>

            {/* Subtitle with High Readability */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              High-converting business websites, custom e-commerce stores, and digital solutions engineered for Indian entrepreneurs. Fixed transparent pricing starting from ₹3,499 with 1 year free SSD cloud hosting, free SSL, and direct WhatsApp customer ordering.
            </p>

            {/* Conversion CTA Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
              <Link
                href="/#services"
                className="w-full sm:w-auto px-7 py-3.5 bg-brand-navy hover:bg-brand-royal dark:bg-brand-royal dark:hover:bg-brand-royal-light text-white text-sm font-bold rounded-xl shadow-card transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.98] btn-shimmer"
              >
                <span>Explore Packages (from ₹3,499)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/917719421910?text=Hello%20Ryxer%20Mart%2C%20I%20would%20like%20to%20discuss%20a%20website%20project%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-brand-navy dark:text-white text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 shadow-subtle hover:border-emerald-400 dark:hover:border-emerald-500/60 transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Talk on WhatsApp</span>
              </a>
            </div>

            {/* Key Transparent Inclusions Strip */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left border-t border-slate-200/80 dark:border-slate-800">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-brand-navy dark:text-slate-200 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  100% Responsive
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Mobile, tablet &amp; laptop</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-brand-navy dark:text-slate-200 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  Free SSD Hosting
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">1 full year + SSL free</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-brand-navy dark:text-slate-200 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  WhatsApp Orders
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Direct client enquiries</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-brand-navy dark:text-slate-200 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  Fast 3–5 Day Launch
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Quick project delivery</p>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Browser Showcase */}
          <div className="lg:col-span-5 relative">
            {/* Category Segmented Control */}
            <div className="flex items-center justify-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-4 max-w-sm mx-auto border border-slate-200/80 dark:border-slate-700/80">
              <button
                type="button"
                onClick={() => setActiveTab("business")}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeTab === "business"
                    ? "bg-white dark:bg-slate-900 text-brand-navy dark:text-white shadow-subtle"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                Starter
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("corporate")}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeTab === "corporate"
                    ? "bg-white dark:bg-slate-900 text-brand-violet dark:text-purple-300 shadow-subtle"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                Royal (Popular)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("ecommerce")}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeTab === "ecommerce"
                    ? "bg-white dark:bg-slate-900 text-brand-navy dark:text-white shadow-subtle"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                E-Commerce
              </button>
            </div>

            {/* Browser Window Frame */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-elevated overflow-hidden transition-all duration-300">
              {/* Browser Header Bar */}
              <div className="px-4 py-3 bg-slate-50 dark:bg-slate-850 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <div className="flex-1 max-w-[210px] mx-auto py-1 px-3 bg-white dark:bg-slate-800 rounded-md border border-slate-200/70 dark:border-slate-700/70 text-[10px] text-slate-500 dark:text-slate-400 font-mono text-center truncate flex items-center justify-center gap-1.5">
                  <Shield className="w-3 h-3 text-emerald-600" />
                  <span>https://yourbusiness.in</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                  <Zap className="w-3 h-3" />
                  <span>{currentPreview.speed}</span>
                </div>
              </div>

              {/* Browser Content Canvas */}
              <div className="p-6 space-y-5 bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 min-h-[320px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-brand-violet dark:text-purple-400 uppercase tracking-wider">
                      {currentPreview.category}
                    </span>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {currentPreview.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-brand-navy dark:text-white tracking-tight">
                    {currentPreview.title}
                  </h3>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentPreview.features.map((feat, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-200 font-medium"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Embedded Website Action Bar */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-brand-violet/10 dark:bg-brand-violet/20 text-brand-violet dark:text-purple-400 flex items-center justify-center">
                      {activeTab === "ecommerce" ? (
                        <ShoppingCart className="w-4 h-4" />
                      ) : activeTab === "corporate" ? (
                        <Sliders className="w-4 h-4" />
                      ) : (
                        <Globe className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 block leading-none">
                        Ryxer Mart Stack
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">
                        Ultra-fast Next.js + WhatsApp
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/#services"
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-brand-violet hover:bg-brand-violet-hover rounded-lg transition-all shadow-subtle"
                  >
                    {currentPreview.cta}
                  </Link>
                </div>
              </div>
            </div>

            {/* Contextual Anchored Badges */}
            <div className="hidden sm:flex items-center justify-between mt-3 text-[11px] text-slate-500 dark:text-slate-400 px-2">
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Google SEO Structured Data
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                No Card Needed Upfront
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
