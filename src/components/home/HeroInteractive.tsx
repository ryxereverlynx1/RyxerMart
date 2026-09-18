"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageSquare, Sparkles, CheckCircle, Star, ShoppingBag, Laptop, Shield } from "lucide-react";

export function HeroInteractive() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="relative overflow-hidden pt-8 pb-16 sm:pt-12 md:pt-16 md:pb-24 transition-colors">
      {/* Dynamic Multi-layered Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Drifting ambient blue and purple blobs */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-royal/10 dark:bg-brand-royal/20 blur-3xl animate-blob-drift"
          style={{ willChange: "transform" }}
        />
        <div
          className="absolute top-1/4 -right-32 w-[28rem] h-[28rem] rounded-full bg-brand-violet/10 dark:bg-brand-violet/20 blur-3xl animate-blob-drift"
          style={{ animationDelay: "-5s", willChange: "transform" }}
        />
        <div
          className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-indigo-500/10 dark:bg-purple-900/15 blur-3xl animate-blob-drift"
          style={{ animationDelay: "-9s", willChange: "transform" }}
        />

        {/* Subtle decorative grid dots */}
        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.18]"
          style={{
            backgroundImage: `radial-gradient(rgba(10, 37, 88, 0.25) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Value Prop, CTA */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            {/* Top Badges Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-violet-light/80 dark:bg-brand-navy/60 border border-brand-violet/20 dark:border-indigo-500/30 text-brand-violet dark:text-purple-300 text-xs font-bold uppercase tracking-wider shadow-subtle hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-brand-violet dark:text-purple-400" />
                <span>Reliable Indian Web Development Agency</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-[11px] font-semibold text-amber-800 dark:text-amber-300 shadow-subtle">
                <div className="flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                </div>
                <span>4.9/5 Rating (120+ Businesses)</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-brand-navy dark:text-white tracking-tight leading-[1.12]">
              Build Your Business <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-violet via-purple-400 to-indigo-400">
                Online &amp; Fast.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              High-converting websites, custom e-commerce stores, and digital solutions engineered for Indian entrepreneurs. Fixed transparent pricing, free cloud hosting, and direct WhatsApp project coordination.
            </p>

            {/* Interactive CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/services"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-royal via-brand-violet to-brand-royal bg-[length:200%_auto] hover:bg-[position:right_center] text-white text-base font-bold rounded-xl shadow-card hover:shadow-card-glow transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-95 btn-shimmer group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet"
              >
                <span>Explore Packages</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <a
                href="https://wa.me/917719421910?text=Hello%20RyxerMart%2C%20I%20would%20like%20to%20discuss%20a%20website%20project%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-brand-navy dark:text-slate-200 text-base font-bold rounded-xl border border-slate-200 dark:border-slate-700 shadow-subtle hover:border-emerald-400 dark:hover:border-emerald-500/50 transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-200" />
                <span>Talk on WhatsApp</span>
              </a>
            </div>

            {/* Trust Highlights Strip */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left border-t border-slate-200/80 dark:border-slate-800">
              <div className="space-y-1 group">
                <span className="text-xs font-bold text-brand-navy dark:text-slate-200 flex items-center gap-1.5 group-hover:text-brand-violet dark:group-hover:text-purple-300 transition-colors">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> 100% Mobile Ready
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Phones, tablets &amp; laptops</p>
              </div>
              <div className="space-y-1 group">
                <span className="text-xs font-bold text-brand-navy dark:text-slate-200 flex items-center gap-1.5 group-hover:text-brand-violet dark:group-hover:text-purple-300 transition-colors">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Free SSD Hosting
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Included free with SSL</p>
              </div>
              <div className="space-y-1 group">
                <span className="text-xs font-bold text-brand-navy dark:text-slate-200 flex items-center gap-1.5 group-hover:text-brand-violet dark:group-hover:text-purple-300 transition-colors">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Google SEO Ready
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Fast ranking architecture</p>
              </div>
              <div className="space-y-1 group">
                <span className="text-xs font-bold text-brand-navy dark:text-slate-200 flex items-center gap-1.5 group-hover:text-brand-violet dark:group-hover:text-purple-300 transition-colors">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> WhatsApp Orders
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Direct client leads</p>
              </div>
            </div>
          </div>

          {/* Right Column: Automatic Floating Service Cards (Continuous Gentle Up/Down Motion, No Mouse Tracking) */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full max-w-md mx-auto space-y-4">
              {/* Floating Card 1: Starter Website (Continuous gentle up-down float) */}
              <div className="animate-float-slow will-change-transform">
                <Link
                  href="/services/starter-website"
                  onMouseEnter={() => setHoveredCard(1)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`block p-5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border transition-all duration-300 shadow-card hover:z-20 ${
                    hoveredCard === 1
                      ? "scale-[1.02] border-brand-violet shadow-card-glow dark:shadow-card-glow"
                      : hoveredCard !== null
                      ? "opacity-75 scale-[0.99] border-slate-200 dark:border-slate-800"
                      : "border-slate-200 dark:border-slate-800 hover:border-brand-violet/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-brand-royal dark:text-blue-400 flex items-center justify-center">
                        <Laptop className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-brand-navy dark:text-white">Starter Website</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">5–10 Pages • 1 Yr Free Hosting</p>
                      </div>
                    </div>
                    <span className="text-base font-black text-brand-navy dark:text-white">₹3,499</span>
                  </div>
                </Link>
              </div>

              {/* Floating Card 2: Royal Website (Continuous reverse gentle up-down float) */}
              <div className="animate-float-reverse will-change-transform">
                <Link
                  href="/services/royal-website"
                  onMouseEnter={() => setHoveredCard(2)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`block p-5 rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-300 shadow-elevated relative overflow-hidden hover:z-20 ${
                    hoveredCard === 2
                      ? "scale-[1.02] border-brand-violet shadow-card-glow"
                      : hoveredCard !== null
                      ? "opacity-75 scale-[0.99] border-brand-violet/30"
                      : "border-brand-violet/40 hover:border-brand-violet"
                  }`}
                >
                  {/* Popular Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="popular-badge-shine inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-brand-royal to-brand-violet text-white text-[10px] font-extrabold tracking-wide uppercase shadow-sm">
                      <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                      Most Popular
                    </span>
                  </div>

                  <div className="flex items-center gap-3 pr-24">
                    <div className="w-11 h-11 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-brand-violet dark:text-purple-400 flex items-center justify-center">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-brand-navy dark:text-white">Royal Website</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">15–20 Pages • Admin Panel Included</p>
                    </div>
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between group">
                    <span className="text-xs text-brand-violet dark:text-purple-400 font-semibold flex items-center gap-1.5">
                      Instant WhatsApp Enquiry
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-lg font-black text-brand-violet dark:text-purple-400">₹5,499</span>
                  </div>
                </Link>
              </div>

              {/* Floating Card 3: Ecommerce Starter (Continuous delayed gentle up-down float) */}
              <div className="animate-float-slow-delayed will-change-transform">
                <Link
                  href="/services/ecommerce-starter"
                  onMouseEnter={() => setHoveredCard(3)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`block p-5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border transition-all duration-300 shadow-card hover:z-20 ${
                    hoveredCard === 3
                      ? "scale-[1.02] border-brand-violet shadow-card-glow"
                      : hoveredCard !== null
                      ? "opacity-75 scale-[0.99] border-slate-200 dark:border-slate-800"
                      : "border-slate-200 dark:border-slate-800 hover:border-brand-violet/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-brand-navy dark:text-white">Ecommerce Starter</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">Full Store • Product DB • Cart</p>
                      </div>
                    </div>
                    <span className="text-base font-black text-brand-navy dark:text-white">₹9,999</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
