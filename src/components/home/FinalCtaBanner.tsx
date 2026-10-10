"use client";

import React from "react";
import Link from "next/link";
import {
  IoRocketOutline,
  IoLogoWhatsapp,
  IoArrowForwardOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import { BRAND } from "@/lib/brand";

export function FinalCtaBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-navy via-slate-900 to-brand-navy text-white p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-card">
        {/* Ambient glow accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-violet/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-violet/30 border border-brand-violet/40 text-purple-200 text-xs font-bold uppercase tracking-wider">
            <IoRocketOutline className="w-3.5 h-3.5 text-amber-300" />
            <span>Launch Your Online Presence</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Ready to Build a Website That Grows Your Business?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            From local service businesses in Punjab to nationwide e-commerce stores. Get a fast, bespoke website with clear deliverables and transparent packages starting at <strong className="text-white font-bold">₹3,499</strong>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="/#services"
              className="w-full sm:w-auto px-8 py-4 bg-brand-violet hover:bg-brand-violet-hover text-white text-xs sm:text-sm font-bold rounded-xl shadow-card hover:shadow-card-hover btn-press flex items-center justify-center gap-2"
            >
              <span>Explore Packages (from ₹3,499)</span>
              <IoArrowForwardOutline className="w-4 h-4" />
            </Link>

            <a
              href={BRAND.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-subtle btn-press flex items-center justify-center gap-2"
            >
              <IoLogoWhatsapp className="w-4 h-4" />
              <span>Discuss on WhatsApp (+91 77194-21910)</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <IoCheckmarkCircleOutline className="w-3.5 h-3.5 text-emerald-400" />
              1-Year Free SSD Cloud Hosting
            </span>
            <span className="flex items-center gap-1">
              <IoCheckmarkCircleOutline className="w-3.5 h-3.5 text-emerald-400" />
              Free SSL Certificate
            </span>
            <span className="flex items-center gap-1">
              <IoCheckmarkCircleOutline className="w-3.5 h-3.5 text-emerald-400" />
              Direct Engineering Consultation
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
