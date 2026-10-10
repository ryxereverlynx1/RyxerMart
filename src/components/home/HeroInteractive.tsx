"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  IoRocketOutline,
  IoSparklesOutline,
  IoLogoWhatsapp,
  IoArrowForwardOutline,
  IoDesktopOutline,
  IoPhonePortraitOutline,
  IoShieldCheckmarkOutline,
  IoSpeedometerOutline,
  IoCheckmarkCircleOutline,
  IoCheckmarkOutline,
  IoCartOutline,
  IoCallOutline,
  IoWifiOutline,
  IoBatteryFullOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { BRAND } from "@/lib/brand";

export function HeroInteractive() {
  const [activeDeviceView, setActiveDeviceView] = useState<"desktop" | "mobile">("desktop");

  return (
    <div className="relative overflow-hidden pt-8 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28">
      {/* Crisp architectural background grid */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(#0A2558 1px, transparent 1px), linear-gradient(90deg, #0A2558 1px, transparent 1px)`,
            backgroundSize: "36px 36px",
          }}
        />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ========================================================= */}
          {/* LEFT COLUMN: HIGH-CONVERTING PERSUASIVE VALUE PROPOSITION */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 space-y-6 text-left">
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
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl animate-fade-up"
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
          {/* RIGHT COLUMN: ORIGINAL INTERACTIVE BROWSER & MOCKUP ASSET */}
          {/* ========================================================= */}
          <div
            className="lg:col-span-5 animate-fade-up relative flex flex-col items-center"
            style={{ animationDelay: "200ms" }}
          >
            {/* Viewport Control Bar */}
            <div className="w-full flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300">
                <button
                  type="button"
                  onClick={() => setActiveDeviceView("desktop")}
                  className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-all ${
                    activeDeviceView === "desktop"
                      ? "bg-white dark:bg-slate-900 text-brand-navy dark:text-white shadow-sm"
                      : "hover:text-brand-navy dark:hover:text-white"
                  }`}
                >
                  <IoDesktopOutline className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDeviceView("mobile")}
                  className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-all ${
                    activeDeviceView === "mobile"
                      ? "bg-white dark:bg-slate-900 text-brand-navy dark:text-white shadow-sm"
                      : "hover:text-brand-navy dark:hover:text-white"
                  }`}
                >
                  <IoPhonePortraitOutline className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                Interactive Sample
              </span>
            </div>

            {/* ========================================================= */}
            {/* OPTION A: DESKTOP BROWSER FRAME MOCKUP                     */}
            {/* ========================================================= */}
            {activeDeviceView === "desktop" && (
              <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-card overflow-hidden transition-all duration-300">
                {/* Browser Top Window Bar */}
                <div className="px-4 py-3 bg-slate-100/90 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                  </div>

                  {/* Browser URL Pill */}
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 font-mono w-3/5 truncate">
                    <span className="text-emerald-500 font-bold">https://</span>
                    <span>yourbusiness.com</span>
                  </div>

                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                    SSL 256b
                  </span>
                </div>

                {/* Browser Inside Website Content Preview */}
                <div className="p-4 sm:p-5 space-y-4 bg-slate-50/40 dark:bg-slate-900/40">
                  {/* Miniature Store Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-brand-violet text-white font-black text-xs flex items-center justify-center">
                        R
                      </div>
                      <span className="text-xs font-black text-brand-navy dark:text-white">
                        Aura Luxe Studio
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                      <span>Products</span>
                      <span>About</span>
                      <span className="px-2 py-0.5 rounded bg-brand-violet text-white font-bold">
                        Cart (2)
                      </span>
                    </div>
                  </div>

                  {/* Miniature Hero Banner */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-brand-navy to-slate-800 text-white space-y-2 shadow-sm">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-purple-300">
                      New 2026 Collection
                    </span>
                    <h4 className="text-sm font-black leading-tight">
                      Handcrafted Lifestyle Goods for Modern Homes
                    </h4>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[10px] font-bold px-2 py-1 bg-brand-violet text-white rounded-md">
                        Shop Catalog
                      </span>
                      <span className="text-[10px] text-emerald-300 flex items-center gap-0.5">
                        <IoLogoWhatsapp className="w-3 h-3" /> WhatsApp Orders
                      </span>
                    </div>
                  </div>

                  {/* 2 Miniature Product Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 space-y-1 shadow-subtle">
                      <div className="h-14 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 text-xs font-semibold">
                        Aura Lamp
                      </div>
                      <span className="text-[11px] font-bold text-brand-navy dark:text-white block">
                        Nordic Table Lamp
                      </span>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-extrabold text-slate-700 dark:text-slate-300">₹1,899</span>
                        <span className="text-emerald-600 font-bold">In Stock</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 space-y-1 shadow-subtle">
                      <div className="h-14 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 text-xs font-semibold">
                        Ceramic Vase
                      </div>
                      <span className="text-[11px] font-bold text-brand-navy dark:text-white block">
                        Artisan Terra Vase
                      </span>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-extrabold text-slate-700 dark:text-slate-300">₹1,249</span>
                        <span className="text-emerald-600 font-bold">In Stock</span>
                      </div>
                    </div>
                  </div>

                  {/* Live Technology Performance Footer */}
                  <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                      <IoSpeedometerOutline className="w-3 h-3" />
                      99/100 Core Web Vitals
                    </span>
                    <span>1-Yr Free Cloud Hosting Included</span>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* OPTION B: REALISTIC TALL SMARTPHONE FRAME (ASPECT 9:19)    */}
            {/* ========================================================= */}
            {activeDeviceView === "mobile" && (
              <div className="w-[270px] sm:w-[280px] h-[550px] sm:h-[570px] rounded-[44px] bg-slate-950 p-2.5 shadow-2xl border-4 border-slate-800 dark:border-slate-700 ring-1 ring-slate-700/50 relative flex flex-col justify-between mx-auto overflow-hidden transition-all duration-300">
                {/* Smartphone Dynamic Island Notch & Status Bar */}
                <div className="w-full pt-1 pb-1.5 px-3 flex items-center justify-between text-white text-[10px] font-semibold shrink-0 z-10 bg-slate-950">
                  <span className="font-bold">9:41</span>
                  {/* Dynamic Island Pill */}
                  <div className="w-20 h-4 bg-black rounded-full flex items-center justify-center gap-1 border border-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-950" />
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-300">
                    <IoWifiOutline />
                    <IoBatteryFullOutline />
                  </div>
                </div>

                {/* Smartphone Inside Screen */}
                <div className="flex-1 rounded-[32px] bg-white dark:bg-slate-900 overflow-hidden flex flex-col justify-between border border-slate-200/60 dark:border-slate-800 text-left">
                  {/* Mobile Browser Top Bar */}
                  <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1 text-slate-500 font-mono truncate">
                      <span className="text-emerald-500">🔒</span>
                      <span>auraluxe.in</span>
                    </div>
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
                      SSL
                    </span>
                  </div>

                  {/* Mobile Website Body */}
                  <div className="p-3 space-y-2.5 flex-1 overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-md bg-brand-violet text-white font-black text-[10px] flex items-center justify-center">
                          A
                        </span>
                        <span className="text-xs font-black text-brand-navy dark:text-white">
                          Aura Luxe
                        </span>
                      </div>
                      <span className="text-[9px] bg-brand-violet text-white px-2 py-0.5 rounded-md font-bold">
                        Cart (1)
                      </span>
                    </div>

                    {/* Banner */}
                    <div className="p-3 rounded-xl bg-gradient-to-r from-brand-navy to-slate-800 text-white space-y-1 shadow-sm">
                      <span className="text-[8px] uppercase tracking-wider text-purple-300 font-extrabold block">
                        2026 Collection
                      </span>
                      <h5 className="text-xs font-black leading-tight">
                        Modern Decor Built for Style
                      </h5>
                      <span className="inline-block mt-1 text-[9px] font-bold px-2 py-0.5 bg-brand-violet text-white rounded">
                        Shop Now
                      </span>
                    </div>

                    {/* Product Card 1 */}
                    <div className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 flex items-center gap-2">
                      <div className="w-10 h-10 rounded-md bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[9px] font-bold text-slate-500 shrink-0">
                        Lamp
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[11px] font-bold text-brand-navy dark:text-white block truncate">
                          Nordic Lamp
                        </span>
                        <span className="text-[10px] font-extrabold text-slate-700 dark:text-slate-300">
                          ₹1,899
                        </span>
                      </div>
                      <a
                        href={BRAND.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1 bg-emerald-600 text-white text-[9px] font-bold rounded-md flex items-center gap-0.5 shrink-0"
                      >
                        <IoLogoWhatsapp className="w-2.5 h-2.5" /> Order
                      </a>
                    </div>

                    {/* Product Card 2 */}
                    <div className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 flex items-center gap-2">
                      <div className="w-10 h-10 rounded-md bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[9px] font-bold text-slate-500 shrink-0">
                        Vase
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[11px] font-bold text-brand-navy dark:text-white block truncate">
                          Ceramic Vase
                        </span>
                        <span className="text-[10px] font-extrabold text-slate-700 dark:text-slate-300">
                          ₹1,249
                        </span>
                      </div>
                      <a
                        href={BRAND.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1 bg-emerald-600 text-white text-[9px] font-bold rounded-md flex items-center gap-0.5 shrink-0"
                      >
                        <IoLogoWhatsapp className="w-2.5 h-2.5" /> Order
                      </a>
                    </div>

                    {/* Mobile Speed Callout */}
                    <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-center text-[9px] font-bold text-emerald-700 dark:text-emerald-300">
                      ⚡ 1-Tap WhatsApp Checkout &bull; 99/100 Mobile Speed
                    </div>
                  </div>

                  {/* Mobile Screen Bottom Floating Action Bar */}
                  <div className="p-2 bg-slate-100 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[9px] font-bold text-slate-600 dark:text-slate-300">
                    <span className="text-brand-violet dark:text-purple-400">● Home</span>
                    <span>Catalog</span>
                    <span>Cart (1)</span>
                    <span className="text-emerald-600 flex items-center gap-0.5">
                      <IoLogoWhatsapp /> Chat
                    </span>
                  </div>
                </div>

                {/* Smartphone Home Indicator Bar */}
                <div className="w-full pt-1.5 pb-0.5 flex justify-center shrink-0">
                  <div className="w-28 h-1 bg-slate-600 rounded-full" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
