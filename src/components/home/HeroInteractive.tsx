"use client";

import React from "react";
import Link from "next/link";
import {
  IoSparklesOutline,
  IoLogoWhatsapp,
  IoArrowForwardOutline,
  IoPhonePortraitOutline,
  IoShieldCheckmarkOutline,
  IoSpeedometerOutline,
  IoCheckmarkCircleOutline,
  IoCartOutline,
  IoWifiOutline,
  IoBatteryFullOutline,
  IoLockClosedOutline,
  IoFlashOutline,
  IoServerOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { BRAND } from "@/lib/brand";

export function HeroInteractive() {
  return (
    <div className="relative overflow-hidden pt-6 pb-12 sm:pt-12 sm:pb-20 lg:pt-20 lg:pb-28">
      {/* ========================================================= */}
      {/* ARCHITECTURAL BACKGROUND: GRID + AMBIENT LIGHT DRIFT      */}
      {/* ========================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Low-contrast architectural grid lines */}
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(#0A2558 1px, transparent 1px), linear-gradient(90deg, #0A2558 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
          }}
        />

        {/* Ambient brand-color radial spotlight behind hero cards */}
        <div className="absolute top-1/4 right-0 lg:right-12 w-[540px] h-[540px] rounded-full bg-gradient-to-tr from-brand-violet/20 via-brand-royal/10 to-transparent blur-3xl animate-ambient-drift pointer-events-none" />

        {/* Crisp structural top divider */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* ========================================================= */}
          {/* LEFT COLUMN: PERSUASIVE VALUE PROPOSITION & CTAS          */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-violet-subtle/80 dark:bg-purple-950/50 border border-brand-violet/20 dark:border-purple-500/30 text-brand-violet dark:text-purple-300 text-xs font-bold tracking-wide animate-fade-up">
              <IoSparklesOutline className="w-3.5 h-3.5 text-brand-violet dark:text-purple-400" />
              <span>Web Development &amp; E-Commerce Studio</span>
            </div>

            {/* Headline */}
            <h1
              className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black text-brand-navy dark:text-white tracking-tight leading-[1.12] animate-fade-up"
              style={{ animationDelay: "80ms" }}
            >
              A Better Website for the{" "}
              <span className="text-brand-violet dark:text-purple-400">Business You&apos;re Building.</span>
            </h1>

            {/* Supporting Copy */}
            <p
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-xl animate-fade-up"
              style={{ animationDelay: "160ms" }}
            >
              From local service ventures to high-converting online stores. Get a fast, responsive website designed around your real commercial goals—with transparent packages starting at <strong className="text-brand-navy dark:text-white font-bold">₹3,499</strong>, including 1-year free SSD cloud hosting, free SSL, and direct WhatsApp customer ordering.
            </p>

            {/* CTA Group */}
            <div
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 animate-fade-up"
              style={{ animationDelay: "240ms" }}
            >
              <Link
                href="/#services"
                className="px-7 py-3.5 bg-brand-navy hover:bg-brand-royal dark:bg-brand-royal dark:hover:bg-brand-royal-light text-white text-xs sm:text-sm font-bold rounded-xl shadow-card hover:shadow-card-hover btn-press btn-shimmer flex items-center justify-center gap-2 text-center"
              >
                <span>Explore Packages (from ₹3,499)</span>
                <IoArrowForwardOutline className="w-4 h-4" />
              </Link>

              <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-brand-navy dark:text-white text-xs sm:text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 shadow-subtle hover:border-emerald-400 dark:hover:border-emerald-500/60 btn-press flex items-center justify-center gap-2 text-center"
              >
                <IoLogoWhatsapp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Discuss on WhatsApp</span>
              </a>
            </div>

            {/* Reassurance Trust Pills */}
            <div
              className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs text-slate-500 dark:text-slate-400 font-medium animate-fade-up"
              style={{ animationDelay: "320ms" }}
            >
              <span className="inline-flex items-center gap-1.5">
                <IoCheckmarkCircleOutline className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                Zero Hidden Setup Fees
              </span>
              <span className="inline-flex items-center gap-1.5">
                <IoCheckmarkCircleOutline className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                1-Year Free SSD Hosting &amp; SSL
              </span>
              <span className="inline-flex items-center gap-1.5">
                <IoCheckmarkCircleOutline className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                3–5 Days Rapid Delivery
              </span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: 2D MULTI-LAYER COMPOSITION WITH 3D SHADOWS  */}
          {/* ========================================================= */}
          <div
            className="lg:col-span-6 relative flex flex-col items-center animate-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            {/* Visual Stage Container for Desktop (hidden on mobile, full 3D layout on desktop) */}
            <div className="hidden lg:block w-full relative py-6 px-4 select-none">
              
              {/* ========================================================= */}
              {/* MINI CARD 1 (Top-Left): Core Web Vitals 99/100            */}
              {/* ========================================================= */}
              <div
                className="absolute -top-3 left-0 sm:-top-5 sm:-left-3 z-30 p-2.5 sm:p-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-700 shadow-3d-floating dark:shadow-3d-floating-dark flex items-center gap-2.5 animate-float-card-1 pointer-events-none"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-black text-xs shrink-0 shadow-sm">
                  99
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1 text-[11px] font-black text-brand-navy dark:text-white">
                    <IoFlashOutline className="w-3.5 h-3.5 text-amber-500" />
                    <span>Core Web Vitals</span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">
                    99/100 Mobile Speed • 0.8s LCP
                  </span>
                </div>
              </div>

              {/* ========================================================= */}
              {/* MINI CARD 2 (Top-Right): Free SSD Cloud Hosting & Uptime  */}
              {/* ========================================================= */}
              <div
                className="absolute -top-4 right-2 sm:-top-6 sm:right-0 z-30 p-2.5 sm:p-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-700 shadow-3d-floating dark:shadow-3d-floating-dark flex items-center gap-2.5 animate-float-card-2 pointer-events-none"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-brand-violet dark:text-purple-400 shrink-0 shadow-sm">
                  <IoServerOutline className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5 text-[11px] font-black text-brand-navy dark:text-white">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Free Cloud SSD</span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">
                    1-Yr Included • 99.9% Uptime
                  </span>
                </div>
              </div>

              {/* ========================================================= */}
              {/* PRIMARY DESKTOP BROWSER FRAME (HEAVY PHYSICAL 3D SHADOW)  */}
              {/* ========================================================= */}
              <div
                className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-3d-stage dark:shadow-3d-stage-dark overflow-hidden transition-all duration-300 relative z-10"
              >
                {/* Browser Header Bar with realistic chrome & padlock */}
                <div className="px-4 py-3 bg-slate-100/95 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                  </div>

                  {/* Browser Address Bar */}
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 font-mono w-3/5 truncate shadow-inner">
                    <IoLockClosedOutline className="text-emerald-500 w-3 h-3 shrink-0" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">https://</span>
                    <span>yourbusiness.com</span>
                  </div>

                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded flex items-center gap-1 border border-emerald-200/50 dark:border-emerald-800/50">
                    <IoShieldCheckmarkOutline className="w-3 h-3" />
                    <span>SSL 256b</span>
                  </span>
                </div>

                {/* Inside Desktop Web Preview */}
                <div className="p-4 sm:p-5 space-y-4 bg-slate-50/40 dark:bg-slate-900/40 text-left">
                  {/* Mini Brand Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-brand-violet text-white font-black text-xs flex items-center justify-center shadow-sm">
                        A
                      </div>
                      <span className="text-xs font-black text-brand-navy dark:text-white">
                        Aura Luxe Studio
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                      <span className="hidden sm:inline">Collection</span>
                      <span className="hidden sm:inline">About</span>
                      <span className="px-2 py-0.5 rounded bg-brand-violet text-white font-bold flex items-center gap-1 shadow-sm">
                        <IoCartOutline className="w-3 h-3" />
                        <span>Cart (2)</span>
                      </span>
                    </div>
                  </div>

                  {/* Mini Hero Store Banner */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-brand-navy to-slate-800 text-white space-y-2 shadow-md relative overflow-hidden">
                    <div className="relative z-10">
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-purple-300 block">
                        2026 Collection
                      </span>
                      <h4 className="text-sm font-black leading-tight mt-0.5">
                        Handcrafted Lifestyle Goods for Modern Homes
                      </h4>
                      <div className="flex items-center gap-2 pt-1.5">
                        <span className="text-[10px] font-bold px-2 py-1 bg-brand-violet text-white rounded-md shadow-sm">
                          Shop Catalog
                        </span>
                        <span className="text-[10px] text-emerald-300 flex items-center gap-1 font-semibold">
                          <IoLogoWhatsapp className="w-3 h-3" /> 1-Tap WhatsApp
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mini Product Cards Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 space-y-1 shadow-card">
                      <div className="h-14 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 text-xs font-semibold">
                        Nordic Lamp
                      </div>
                      <span className="text-[11px] font-bold text-brand-navy dark:text-white block truncate">
                        Nordic Table Lamp
                      </span>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-extrabold text-slate-700 dark:text-slate-300">₹1,899</span>
                        <span className="text-emerald-600 font-bold">In Stock</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 space-y-1 shadow-card">
                      <div className="h-14 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 text-xs font-semibold">
                        Terra Vase
                      </div>
                      <span className="text-[11px] font-bold text-brand-navy dark:text-white block truncate">
                        Artisan Terra Vase
                      </span>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-extrabold text-slate-700 dark:text-slate-300">₹1,249</span>
                        <span className="text-emerald-600 font-bold">In Stock</span>
                      </div>
                    </div>
                  </div>

                  {/* Performance Bar */}
                  <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                      <IoSpeedometerOutline className="w-3 h-3" />
                      99/100 Core Web Vitals
                    </span>
                    <span>1-Yr Cloud Hosting Included</span>
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* FOREGROUND OVERLAPPING SMARTPHONE MOCKUP (DEEP 3D SHADOW)  */}
              {/* ========================================================= */}
              <div
                className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:-right-4 w-[220px] sm:w-[245px] h-[460px] sm:h-[490px] z-20 rounded-[40px] bg-slate-200/90 dark:bg-slate-950 p-2 shadow-3d-phone dark:shadow-3d-phone-dark border-4 border-slate-300 dark:border-slate-800 ring-1 ring-slate-200 dark:ring-slate-700/60 flex flex-col justify-between overflow-hidden animate-float-card-3 pointer-events-none transition-colors"
              >
                {/* Dynamic Island & Status Bar */}
                <div className="w-full pt-1 pb-1 px-3 flex items-center justify-between text-slate-800 dark:text-white text-[10px] font-semibold shrink-0 z-10 bg-slate-200/90 dark:bg-slate-950 transition-colors">
                  <span className="font-bold">9:41</span>
                  <div className="w-16 h-3.5 bg-slate-900 dark:bg-black rounded-full flex items-center justify-center gap-1 border border-slate-700/60 dark:border-slate-800">
                    <span className="w-1 h-1 rounded-full bg-slate-800" />
                    <span className="w-1 h-1 rounded-full bg-blue-950" />
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-700 dark:text-slate-300">
                    <IoWifiOutline />
                    <IoBatteryFullOutline />
                  </div>
                </div>

                {/* Inside Smartphone Screen */}
                <div className="flex-1 rounded-[30px] bg-white dark:bg-slate-900 overflow-hidden flex flex-col justify-between border border-slate-200/60 dark:border-slate-800 text-left shadow-inner">
                  {/* Mobile URL bar */}
                  <div className="px-2.5 py-1 bg-slate-100 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1 text-slate-500 font-mono truncate">
                      <IoLockClosedOutline className="text-emerald-500 w-2.5 h-2.5" />
                      <span>auraluxe.in</span>
                    </div>
                    <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-1 py-0.2 rounded">
                      SSL
                    </span>
                  </div>

                  {/* Mobile Website Body */}
                  <div className="p-2.5 space-y-2 flex-1 overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-1">
                        <span className="w-4 h-4 rounded bg-brand-violet text-white font-black text-[9px] flex items-center justify-center">
                          A
                        </span>
                        <span className="text-[11px] font-black text-brand-navy dark:text-white">
                          Aura Luxe
                        </span>
                      </div>
                      <span className="text-[8px] bg-brand-violet text-white px-1.5 py-0.5 rounded font-bold shadow-sm">
                        Cart (1)
                      </span>
                    </div>

                    {/* Banner */}
                    <div className="p-2.5 rounded-lg bg-gradient-to-r from-brand-navy to-slate-800 text-white space-y-0.5 shadow-sm">
                      <span className="text-[7px] uppercase tracking-wider text-purple-300 font-extrabold block">
                        2026 Collection
                      </span>
                      <h5 className="text-[10px] font-black leading-tight">
                        Modern Lifestyle Decor
                      </h5>
                      <span className="inline-block mt-0.5 text-[8px] font-bold px-1.5 py-0.5 bg-brand-violet text-white rounded shadow-sm">
                        Shop
                      </span>
                    </div>

                    {/* Product Card 1 */}
                    <div className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 flex items-center gap-1.5 shadow-subtle">
                      <div className="w-8 h-8 rounded bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[8px] font-bold text-slate-500 shrink-0">
                        Lamp
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold text-brand-navy dark:text-white block truncate">
                          Nordic Lamp
                        </span>
                        <span className="text-[9px] font-extrabold text-slate-700 dark:text-slate-300">
                          ₹1,899
                        </span>
                      </div>
                      <span className="px-1.5 py-0.5 bg-emerald-600 text-white text-[8px] font-bold rounded flex items-center gap-0.5 shrink-0 shadow-sm">
                        <IoLogoWhatsapp className="w-2 h-2" /> Order
                      </span>
                    </div>

                    {/* Product Card 2 */}
                    <div className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 flex items-center gap-1.5 shadow-subtle">
                      <div className="w-8 h-8 rounded bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[8px] font-bold text-slate-500 shrink-0">
                        Vase
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold text-brand-navy dark:text-white block truncate">
                          Ceramic Vase
                        </span>
                        <span className="text-[9px] font-extrabold text-slate-700 dark:text-slate-300">
                          ₹1,249
                        </span>
                      </div>
                      <span className="px-1.5 py-0.5 bg-emerald-600 text-white text-[8px] font-bold rounded flex items-center gap-0.5 shrink-0 shadow-sm">
                        <IoLogoWhatsapp className="w-2 h-2" /> Order
                      </span>
                    </div>

                    {/* Mobile Speed Callout */}
                    <div className="p-1.5 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-center text-[8px] font-bold text-emerald-700 dark:text-emerald-300 shadow-sm">
                      ⚡ 1-Tap WhatsApp Checkout &bull; 99/100 Speed
                    </div>
                  </div>

                  {/* Mobile Dock */}
                  <div className="p-1.5 bg-slate-100 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[8px] font-bold text-slate-600 dark:text-slate-300">
                    <span className="text-brand-violet dark:text-purple-400">● Home</span>
                    <span>Catalog</span>
                    <span>Cart (1)</span>
                    <span className="text-emerald-600 flex items-center gap-0.5">
                      <IoLogoWhatsapp /> Chat
                    </span>
                  </div>
                </div>

                {/* Smartphone Home Indicator Bar */}
                <div className="w-full pt-1 pb-0.5 flex justify-center shrink-0 bg-slate-200/90 dark:bg-slate-950 transition-colors">
                  <div className="w-20 h-1 bg-slate-400 dark:bg-slate-600 rounded-full" />
                </div>
              </div>

              {/* ========================================================= */}
              {/* MINI CARD 3 (Bottom-Left): Direct WhatsApp Lead Funnel     */}
              {/* ========================================================= */}
              <div
                className="absolute -bottom-4 left-1 sm:-bottom-5 sm:left-2 z-30 p-2.5 sm:p-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-700 shadow-3d-floating dark:shadow-3d-floating-dark flex items-center gap-2.5 animate-float-card-2 pointer-events-none"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 shadow-sm">
                  <IoLogoWhatsapp className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5 text-[11px] font-black text-brand-navy dark:text-white">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>WhatsApp Lead Funnel</span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">
                    1-Tap Connect • Zero Lead Drop-Off
                  </span>
                </div>
              </div>

              {/* ========================================================= */}
              {/* MINI CARD 4 (Mid-Left Floating): Google SEO Schema Ready  */}
              {/* ========================================================= */}
              <div
                className="hidden sm:flex absolute top-1/2 -left-6 z-30 p-2.5 sm:p-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-700 shadow-3d-floating dark:shadow-3d-floating-dark items-center gap-2.5 animate-float-card-side pointer-events-none"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 shadow-sm">
                  <IoSearchOutline className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1 text-[11px] font-black text-brand-navy dark:text-white">
                    <span>Google SEO Schema</span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">
                    JSON-LD &amp; Maps Indexed
                  </span>
                </div>
              </div>

              {/* ========================================================= */}
              {/* MINI CARD 5 (Floating Center Bottom): Mobile-First UX      */}
              {/* ========================================================= */}
              <div
                className="hidden md:flex absolute bottom-12 right-48 z-30 p-2.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-700 shadow-3d-floating dark:shadow-3d-floating-dark items-center gap-2 animate-float-card-4 pointer-events-none"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 shadow-sm">
                  <IoPhonePortraitOutline className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-[11px] font-black text-brand-navy dark:text-white block">
                    Mobile-First UX
                  </span>
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 block font-medium">
                    320px–4K Displays
                  </span>
                </div>
              </div>

            </div>

            {/* ========================================================= */}
            {/* 2. MOBILE COMPACT HERO PREVIEW (Visible on < lg viewports) */}
            {/* Streamlined preview without screen-dominating animations  */}
            {/* ========================================================= */}
            <div className="block lg:hidden w-full select-none mt-2 sm:mt-4">
              <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-3d-card dark:shadow-3d-card-dark overflow-hidden">
                {/* Browser Header Bar */}
                <div className="px-3.5 py-2.5 bg-slate-100/95 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
                    <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                  </div>

                  {/* Browser Address Bar */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400 font-mono flex-1 max-w-[210px] truncate shadow-inner">
                    <IoLockClosedOutline className="text-emerald-500 w-2.5 h-2.5 shrink-0" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">https://</span>
                    <span>yourbusiness.com</span>
                  </div>

                  <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded flex items-center gap-1 border border-emerald-200/50 dark:border-emerald-800/50 shrink-0">
                    <IoShieldCheckmarkOutline className="w-2.5 h-2.5" />
                    <span>SSL</span>
                  </span>
                </div>

                {/* Inside Compact Web Preview */}
                <div className="p-3.5 sm:p-4 space-y-3 bg-slate-50/40 dark:bg-slate-900/40 text-left">
                  {/* Brand & Speed Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/70 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-brand-violet text-white font-black text-[10px] flex items-center justify-center shadow-sm">
                        A
                      </div>
                      <span className="text-xs font-black text-brand-navy dark:text-white">
                        Aura Luxe Studio
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200/60 dark:border-emerald-800/60">
                      <IoFlashOutline className="w-3 h-3 text-amber-500" />
                      <span>99/100 Speed</span>
                    </span>
                  </div>

                  {/* Hero Store Banner */}
                  <div className="p-3 rounded-xl bg-gradient-to-r from-brand-navy to-slate-800 text-white space-y-1 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-extrabold uppercase tracking-widest text-purple-300 block">
                        Live Client Architecture Demo
                      </span>
                      <span className="text-[8px] font-bold px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-400/30">
                        Active
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-black leading-snug">
                      Handcrafted Lifestyle Goods for Modern Homes
                    </h4>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[9px] font-bold px-2 py-0.5 bg-brand-violet text-white rounded shadow-sm">
                        Shop Catalog
                      </span>
                      <span className="text-[9px] text-emerald-300 flex items-center gap-1 font-semibold">
                        <IoLogoWhatsapp className="w-2.5 h-2.5 text-emerald-400" />
                        1-Tap WhatsApp Checkout
                      </span>
                    </div>
                  </div>

                  {/* Highlights Strip */}
                  <div className="pt-0.5 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                      <IoSpeedometerOutline className="w-3 h-3" />
                      0.8s LCP Fast Load
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <IoServerOutline className="w-3 h-3 text-brand-violet" />
                      Free 1-Yr Cloud SSD
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
