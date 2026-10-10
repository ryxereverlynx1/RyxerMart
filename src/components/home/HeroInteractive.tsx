"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  MessageSquare,
  Sparkles,
  CheckCircle,
  Server,
  Smartphone,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { BRAND } from "@/lib/brand";

export function HeroInteractive() {
  const highlights = [
    {
      icon: Smartphone,
      title: "100% Mobile Responsive",
      subtitle: "Mobile, tablet & laptop displays",
    },
    {
      icon: Server,
      title: "1-Yr Free SSD Hosting",
      subtitle: "Cloud server + pre-installed SSL",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp 1-Tap Orders",
      subtitle: "Direct customer lead capture",
    },
    {
      icon: Zap,
      title: "Fast 3–5 Day Launch",
      subtitle: "Rapid deployment milestone",
    },
  ];

  return (
    <div className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-32">
      {/* Crisp architectural grid texture */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(#0A2558 1px, transparent 1px), linear-gradient(90deg, #0A2558 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Eyebrow Pill Label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-violet-subtle/80 dark:bg-purple-950/50 border border-brand-violet/20 dark:border-purple-500/30 text-brand-violet dark:text-purple-300 text-xs font-bold tracking-wide mb-6 animate-fade-up">
          <Sparkles className="w-3.5 h-3.5 text-brand-violet dark:text-purple-400" />
          <span>Web Development &amp; E-Commerce Studio</span>
        </div>

        {/* Main Headline */}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-navy dark:text-white tracking-tight leading-[1.12] max-w-4xl mx-auto animate-fade-up"
          style={{ animationDelay: "80ms" }}
        >
          Turn Your Business Into a Website That{" "}
          <span className="text-brand-violet dark:text-purple-400">Actually Sells.</span>
        </h1>

        {/* Subtitle with High Readability */}
        <p
          className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal mt-6 animate-fade-up"
          style={{ animationDelay: "160ms" }}
        >
          High-converting business websites, custom e-commerce stores, and digital solutions engineered for Indian entrepreneurs. Fixed transparent pricing starting from ₹3,499 with 1 year free SSD cloud hosting, free SSL, and direct WhatsApp customer ordering.
        </p>

        {/* Conversion CTA Group */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-8 animate-fade-up"
          style={{ animationDelay: "240ms" }}
        >
          <Link
            href="/#services"
            className="w-full sm:w-auto px-8 py-4 bg-brand-navy hover:bg-brand-royal dark:bg-brand-royal dark:hover:bg-brand-royal-light text-white text-sm font-bold rounded-xl shadow-card hover:shadow-card-hover btn-press btn-shimmer flex items-center justify-center gap-2"
          >
            <span>Explore Packages (from ₹3,499)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={BRAND.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-brand-navy dark:text-white text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 shadow-subtle hover:border-emerald-400 dark:hover:border-emerald-500/60 btn-press flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Talk on WhatsApp</span>
          </a>
        </div>

        {/* Reassurance Micro-Copy */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4 text-xs text-slate-500 dark:text-slate-400 font-medium animate-fade-up"
          style={{ animationDelay: "320ms" }}
        >
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            Zero Hidden Setup Fees
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            1-Year Free Hosting &amp; SSL
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            Pay After Discussion
          </span>
        </div>

        {/* Horizontal Pillars Strip with subtle stagger */}
        <div className="mt-14 pt-10 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-left">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-subtle flex items-start gap-3 card-lift animate-fade-up"
                style={{ animationDelay: `${380 + idx * 60}ms` }}
              >
                <div className="w-8 h-8 rounded-lg bg-brand-violet-light dark:bg-slate-800 text-brand-violet dark:text-purple-400 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h4 className="text-xs font-bold text-brand-navy dark:text-white truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
