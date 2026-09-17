"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, MessageSquare, Sparkles, CheckCircle, Star, ShoppingBag, Laptop, Shield } from "lucide-react";

export function HeroInteractive() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect touch devices to disable pointer parallax
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 transition-colors"
      style={
        {
          "--mouse-x": `${mousePos.x}%`,
          "--mouse-y": `${mousePos.y}%`,
        } as React.CSSProperties
      }
    >
      {/* Dynamic Multi-layered Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Slow drifting ambient blue and purple blobs */}
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

        {/* Interactive Desktop Mouse Follower Spotlight */}
        {!isTouchDevice && (
          <div
            className="absolute inset-0 opacity-40 dark:opacity-25 transition-opacity duration-300"
            style={{
              background: `radial-gradient(650px circle at ${mousePos.x}% ${mousePos.y}%, rgba(108, 60, 233, 0.12), transparent 70%)`,
            }}
          />
        )}

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
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-violet-light/80 dark:bg-brand-navy/60 border border-brand-violet/20 dark:border-indigo-500/30 text-brand-violet dark:text-purple-300 text-xs font-bold uppercase tracking-wider shadow-subtle hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Reliable Indian Web Development Agency</span>
            </div>

            {/* Main Headline with Staggered Word-Mask Reveal */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-navy dark:text-white tracking-tight leading-[1.08]">
              <span className="inline-block">
                <span className="word-mask"><span className="word-mask-inner" style={{ animationDelay: "0ms" }}>Build</span></span>{" "}
                <span className="word-mask"><span className="word-mask-inner" style={{ animationDelay: "70ms" }}>Your</span></span>{" "}
                <span className="word-mask"><span className="word-mask-inner" style={{ animationDelay: "140ms" }}>Business</span></span>
              </span>{" "}
              <span className="inline-block animated-gradient-text">
                <span className="word-mask"><span className="word-mask-inner" style={{ animationDelay: "210ms" }}>Online</span></span>{" "}
                <span className="word-mask"><span className="word-mask-inner" style={{ animationDelay: "280ms" }}>&amp;</span></span>{" "}
                <span className="word-mask"><span className="word-mask-inner" style={{ animationDelay: "350ms" }}>Fast.</span></span>
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
                href="https://wa.me/919876543210?text=Hello%20RyxerMart%2C%20I%20would%20like%20to%20discuss%20a%20website%20project%20for%20my%20business."
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

          {/* Right Column: Interactive Floating Service Showcase with Parallax */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full max-w-md mx-auto space-y-4">
              {/* Floating Card 1: Starter Website */}
              <div
                className="transition-transform duration-300 ease-out will-change-transform"
                style={{
                  transform: isTouchDevice
                    ? "none"
                    : `translate3d(${(mousePos.x - 50) * -0.12}px, ${(mousePos.y - 50) * -0.12}px, 0)`,
                }}
              >
                <Link
                  href="/services/starter-website"
                  onMouseEnter={() => setHoveredCard(1)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`block p-5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border transition-all duration-300 shadow-card animate-float-slow hover:z-20 ${
                    hoveredCard === 1
                      ? "scale-105 border-brand-violet shadow-card-glow dark:shadow-card-glow"
                      : hoveredCard !== null
                      ? "opacity-75 scale-98 border-slate-200 dark:border-slate-800"
                      : "border-slate-200 dark:border-slate-800 hover:border-brand-violet/40"
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

              {/* Floating Card 2: Royal Website (Most Popular) */}
              <div
                className="transition-transform duration-300 ease-out will-change-transform"
                style={{
                  transform: isTouchDevice
                    ? "none"
                    : `translate3d(${(mousePos.x - 50) * 0.16}px, ${(mousePos.y - 50) * 0.16}px, 0)`,
                }}
              >
                <Link
                  href="/services/royal-website"
                  onMouseEnter={() => setHoveredCard(2)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`block p-5 rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-300 shadow-elevated relative overflow-hidden animate-float-reverse hover:z-20 ${
                    hoveredCard === 2
                      ? "scale-105 border-brand-violet shadow-card-glow"
                      : hoveredCard !== null
                      ? "opacity-75 scale-98 border-brand-violet/30"
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

              {/* Floating Card 3: Ecommerce Starter */}
              <div
                className="transition-transform duration-300 ease-out will-change-transform"
                style={{
                  transform: isTouchDevice
                    ? "none"
                    : `translate3d(${(mousePos.x - 50) * -0.2}px, ${(mousePos.y - 50) * -0.2}px, 0)`,
                }}
              >
                <Link
                  href="/services/ecommerce-starter"
                  onMouseEnter={() => setHoveredCard(3)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`block p-5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border transition-all duration-300 shadow-card animate-float-slow hover:z-20 ${
                    hoveredCard === 3
                      ? "scale-105 border-brand-violet shadow-card-glow"
                      : hoveredCard !== null
                      ? "opacity-75 scale-98 border-slate-200 dark:border-slate-800"
                      : "border-slate-200 dark:border-slate-800 hover:border-brand-violet/40"
                  }`}
                  style={{ animationDelay: "-2.5s" }}
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
