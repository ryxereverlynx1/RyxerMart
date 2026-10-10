"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  IoSparklesOutline,
  IoCallOutline,
  IoLogoWhatsapp,
  IoArrowForwardOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { BRAND } from "@/lib/brand";

export function AnnouncementStrip() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      role="region"
      aria-label="Promotional announcements"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className="bg-brand-navy dark:bg-slate-950 text-white border-b border-slate-800/80 text-[11px] sm:text-xs py-2 px-3 sm:px-6 relative z-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Highlight Pill & Real Notice */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-violet text-white text-[10px] font-extrabold uppercase tracking-wider shrink-0 shadow-sm">
            <IoSparklesOutline className="w-3 h-3 text-amber-300" />
            <span>Launch Offer</span>
          </span>

          <p className="truncate text-slate-200">
            <span className="font-semibold text-white">Full Business Websites from ₹3,499</span>
            <span className="hidden md:inline text-slate-400"> • 1-Yr Free SSD Cloud Hosting &amp; SSL included</span>
            <span className="hidden lg:inline text-purple-300"> • E-Commerce with UPI/Razorpay at ₹9,999</span>
          </p>
        </div>

        {/* Right: Direct Actions & WhatsApp Desk */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0 font-medium">
          <Link
            href="/#services"
            className="hidden sm:inline-flex items-center gap-1 text-purple-300 hover:text-white transition-colors"
          >
            <span>View Packages</span>
            <IoArrowForwardOutline className="w-3 h-3" />
          </Link>

          <span className="hidden sm:inline text-slate-700">|</span>

          <a
            href={BRAND.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-bold"
            aria-label="Direct WhatsApp consultation"
          >
            <IoLogoWhatsapp className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp Help:</span>
            <span>+91 77194-21910</span>
          </a>
        </div>
      </div>
    </div>
  );
}
