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
} from "react-icons/io5";
import { BRAND } from "@/lib/brand";

export function HeroInteractive() {
  const [activeDeviceView, setActiveDeviceView] = useState<"desktop" | "mobile">("desktop");
  const [activePreviewNiche, setActivePreviewNiche] = useState<"retail" | "service">("retail");

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
            className="lg:col-span-5 animate-fade-up relative"
            style={{ animationDelay: "200ms" }}
          >
            {/* Viewport Control Bar */}
            <div className="flex items-center justify-between mb-3 px-1">
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

            {/* Desktop Browser Frame Mockup */}
            {activeDeviceView === "desktop" && (
              <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-card overflow-hidden transition-all duration-300">
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

            {/* Mobile Phone Frame Mockup */}
            {activeDeviceView === "mobile" && (
              <div className="max-w-[280px] mx-auto rounded-3xl border-4 border-slate-800 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-card overflow-hidden transition-all duration-300">
                {/* Phone Speaker Notch */}
                <div className="bg-slate-800 dark:bg-slate-750 py-1 flex justify-center">
                  <div className="w-16 h-1 bg-slate-600 rounded-full" />
                </div>

                {/* Mobile Screen Inside */}
                <div className="p-3.5 space-y-3 bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-xs font-black text-brand-navy dark:text-white">
                      Aura Luxe
                    </span>
                    <span className="text-[10px] bg-brand-violet text-white px-2 py-0.5 rounded font-bold">
                      Menu
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-brand-navy text-white space-y-1">
                    <span className="text-[8px] uppercase tracking-wider text-purple-300 font-bold">
                      Mobile Responsive
                    </span>
                    <h5 className="text-xs font-black leading-tight">
                      Fast 1-Tap WhatsApp Checkout
                    </h5>
                    <p className="text-[9px] text-slate-300">
                      Optimized for all Android &amp; iOS screens.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 flex items-center gap-2">
                    <div className="w-10 h-10 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[9px] font-bold text-slate-500">
                      Product
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-brand-navy dark:text-white block truncate">
                        Nordic Lamp
                      </span>
                      <span className="text-[9px] font-extrabold text-slate-700 dark:text-slate-300">
                        ₹1,899
                      </span>
                    </div>
                    <span className="px-2 py-1 bg-emerald-600 text-white text-[9px] font-bold rounded flex items-center gap-0.5">
                      <IoLogoWhatsapp className="w-2.5 h-2.5" /> Order
                    </span>
                  </div>

                  <div className="text-center pt-1">
                    <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
                      ⚡ 100% Mobile Optimized Architecture
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
