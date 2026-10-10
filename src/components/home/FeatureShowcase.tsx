"use client";

import React from "react";
import {
  IoPhonePortraitOutline,
  IoDesktopOutline,
  IoLogoWhatsapp,
  IoShieldCheckmarkOutline,
  IoSpeedometerOutline,
  IoCartOutline,
  IoSearchOutline,
  IoConstructOutline,
  IoCheckmarkCircleOutline,
  IoSparklesOutline,
  IoServerOutline,
} from "react-icons/io5";

export function FeatureShowcase() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs font-extrabold uppercase tracking-widest text-brand-violet dark:text-purple-400">
          Engineered Capabilities
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-brand-navy dark:text-white tracking-tight mt-1">
          Everything Your Business Needs to Thrive Online
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
          Not generic templates or bloated site builders. We craft fast, bespoke web systems designed for real commercial performance in India.
        </p>
      </div>

      {/* Asymmetric Bento Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        {/* ========================================================================= */}
        {/* BENTO 1: RESPONSIVE ARCHITECTURE (SPAN 7 COLS)                            */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-card flex flex-col justify-between card-lift">
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-brand-violet dark:text-purple-300">
                <IoPhonePortraitOutline className="w-5 h-5" />
              </span>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                All Plans (Starter, Royal, Ecommerce)
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white">
              Pixel-Perfect Across Every Screen Breakpoint
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              Over 75% of Indian web traffic happens on mobile devices. Every Ryxer Mart website is designed mobile-first, ensuring fluid navigation, readable typography, and zero layout shifting across 320px phones to 4K displays.
            </p>
          </div>

          {/* SVG / CSS Multi-Device Composition */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 flex items-center justify-around gap-4 pt-6">
            {/* Desktop Monitor Mini Graphic */}
            <div className="flex flex-col items-center gap-1.5 flex-1 max-w-[140px]">
              <div className="w-full h-20 rounded-lg bg-brand-navy text-white p-2 border border-slate-700 flex flex-col justify-between shadow-sm">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 w-3/4 bg-purple-300 rounded" />
                  <div className="h-1 w-1/2 bg-slate-400 rounded" />
                </div>
                <div className="h-1.5 w-1/3 bg-brand-violet rounded" />
              </div>
              <div className="w-6 h-2 bg-slate-300 dark:bg-slate-700 rounded-b" />
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Desktop 1440px</span>
            </div>

            {/* Tablet Mini Graphic */}
            <div className="flex flex-col items-center gap-1.5 flex-1 max-w-[100px]">
              <div className="w-full h-18 rounded-lg bg-slate-800 text-white p-1.5 border border-slate-700 flex flex-col justify-between shadow-sm">
                <div className="h-1 w-2/3 bg-purple-300 rounded" />
                <div className="grid grid-cols-2 gap-1 my-1">
                  <div className="h-4 bg-slate-700 rounded" />
                  <div className="h-4 bg-slate-700 rounded" />
                </div>
                <div className="h-1 w-1/2 bg-slate-400 rounded" />
              </div>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Tablet 768px</span>
            </div>

            {/* Mobile Phone Mini Graphic */}
            <div className="flex flex-col items-center gap-1.5 flex-1 max-w-[70px]">
              <div className="w-full h-20 rounded-xl bg-slate-900 text-white p-1.5 border-2 border-slate-700 flex flex-col justify-between shadow-sm">
                <div className="w-4 h-0.5 bg-slate-600 rounded-full mx-auto" />
                <div className="space-y-1 my-auto">
                  <div className="h-1 w-full bg-brand-violet rounded" />
                  <div className="h-1 w-3/4 bg-slate-400 rounded" />
                </div>
                <div className="w-2 h-2 rounded-full bg-slate-600 mx-auto" />
              </div>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Phone 390px</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BENTO 2: WHATSAPP LEAD CAPTURE (SPAN 5 COLS)                               */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-card flex flex-col justify-between card-lift">
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                <IoLogoWhatsapp className="w-5 h-5" />
              </span>
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                1-Tap Conversion
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white">
              Direct WhatsApp &amp; Mobile Leads
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Don&apos;t let customer inquiries get lost in unread emails. We connect floating WhatsApp consultation buttons, click-to-call links, and Google Map locations so customers can reach your phone instantly.
            </p>
          </div>

          {/* Interactive WhatsApp Lead Bubble Preview */}
          <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live WhatsApp Enquiry Routing</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-850 border border-emerald-200/60 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-sans shadow-sm">
              <p className="text-[11px] font-medium leading-relaxed">
                &ldquo;Hello! I saw your Website Package on Ryxer Mart and would like to get a quote for my business.&rdquo;
              </p>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5 pt-1 border-t border-slate-100 dark:border-slate-800">
                <span>Instant Delivery</span>
                <span>Sent from Mobile</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BENTO 3: ADMIN CONTROL PANEL (SPAN 5 COLS)                                 */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-card flex flex-col justify-between card-lift">
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-brand-violet dark:text-purple-300">
                <IoShieldCheckmarkOutline className="w-5 h-5" />
              </span>
              <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700 dark:text-purple-300">
                Royal &amp; Ecommerce Plans
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white">
              Dedicated Admin Control Panel
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              No developer dependency for basic changes. Update your service pricing, add new product listings, edit customer FAQs, and review all incoming customer messages from a secure password-protected portal.
            </p>
          </div>

          {/* Admin Mini Interface Graphic */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-violet" />
                Admin Dashboard
              </span>
              <span className="text-[10px] font-mono bg-purple-100 dark:bg-purple-950 px-2 py-0.5 rounded text-brand-violet dark:text-purple-300">
                /admin
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-extrabold text-brand-navy dark:text-white block">15 Orders</span>
                <span className="text-slate-400">This Month</span>
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-extrabold text-emerald-600 block">Active</span>
                <span className="text-slate-400">Database</span>
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-extrabold text-brand-violet dark:text-purple-400 block">Manage</span>
                <span className="text-slate-400">Services</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BENTO 4: FULL ECOMMERCE & PAYMENTS (SPAN 7 COLS)                            */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-card flex flex-col justify-between card-lift">
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-brand-violet dark:text-purple-300">
                <IoCartOutline className="w-5 h-5" />
              </span>
              <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700 dark:text-purple-300">
                Ecommerce Starter (₹9,999)
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white">
              Full E-Commerce Store with UPI &amp; Razorpay
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              Turn your retail business into an automated online store. Features include shopping cart, wishlist, coupon codes engine, customer reviews, automated email receipts, and seamless Indian checkout via UPI, Google Pay, Cards, and Net Banking.
            </p>
          </div>

          {/* Mini Checkout & UPI Strip */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 to-brand-navy text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div>
              <span className="text-[10px] text-purple-300 uppercase tracking-widest font-extrabold">
                Indian Payment Integrations
              </span>
              <h5 className="text-xs font-bold text-white mt-0.5">
                UPI • Razorpay • PhonePe • Google Pay • COD
              </h5>
            </div>
            <span className="px-3 py-1.5 rounded-lg bg-brand-violet text-white text-xs font-bold shrink-0">
              Zero Platform Commission
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BENTO 5: CLOUD HOSTING & SSL (SPAN 6 COLS)                                 */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-card flex flex-col justify-between card-lift">
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-brand-violet dark:text-purple-300">
                <IoServerOutline className="w-5 h-5" />
              </span>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Infrastructure Included
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-brand-navy dark:text-white">
              1-Year Free SSD Cloud Hosting &amp; SSL
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              No separate hosting bills in year one. We deploy your site on high-speed NVMe SSD cloud servers with 99.9% uptime and pre-installed 256-bit SSL encryption.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-emerald-600 dark:text-emerald-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1">
              <IoCheckmarkCircleOutline className="w-4 h-4" /> 100% Free Year 1
            </span>
            <span className="flex items-center gap-1">
              <IoCheckmarkCircleOutline className="w-4 h-4" /> Global CDN Included
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BENTO 6: GOOGLE SEO ARCHITECTURE (SPAN 6 COLS)                             */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-card flex flex-col justify-between card-lift">
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-brand-violet dark:text-purple-300">
                <IoSearchOutline className="w-5 h-5" />
              </span>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Search Visibility
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-brand-navy dark:text-white">
              Google SEO &amp; LocalBusiness Schema
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Clean semantic HTML5 hierarchy, automated XML sitemaps, Open Graph social share cards, and Schema.org JSON-LD structured data for Google Maps and local search.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-brand-violet dark:text-purple-300 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1">
              <IoCheckmarkCircleOutline className="w-4 h-4" /> Fast Google Indexing
            </span>
            <span className="flex items-center gap-1">
              <IoCheckmarkCircleOutline className="w-4 h-4" /> Local Jalandhar &amp; Punjab Meta
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
