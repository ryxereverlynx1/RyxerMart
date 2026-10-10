"use client";

import React from "react";
import Link from "next/link";
import {
  IoCloseCircleOutline,
  IoCheckmarkCircleOutline,
  IoArrowForwardOutline,
  IoSparklesOutline,
  IoLogoWhatsapp,
} from "react-icons/io5";
import { BRAND } from "@/lib/brand";

export function ProblemSolutionComparison() {
  const problems = [
    {
      title: "Lost Local Inquiries",
      desc: "Potential buyers searching on Google cannot find your verified contact details or official location.",
    },
    {
      title: "Relying Solely on Social Media",
      desc: "Instagram algorithms and fragmented WhatsApp chats make tracking orders and inquiries chaotic.",
    },
    {
      title: "No Catalog or Price Clarity",
      desc: "You waste hours answering the exact same pricing questions and explaining services manually.",
    },
    {
      title: "Hesitant Buyers & Trust Gap",
      desc: "First-time customers often doubt businesses without an official domain and professional web presence.",
    },
  ];

  const solutions = [
    {
      title: "24/7 Verified Digital Presence",
      desc: "Your business ranks on Google Search with complete hours, services, and Google Maps direction pin.",
    },
    {
      title: "Structured 1-Tap Lead Routing",
      desc: "Floating WhatsApp buttons and consultation forms send organized inquiries straight to your phone.",
    },
    {
      title: "Clear Interactive Deliverables",
      desc: "Services, portfolios, and product prices are displayed transparently, filtering for high-intent clients.",
    },
    {
      title: "Immediate Commercial Credibility",
      desc: "A bespoke domain (.com / .in), SSL security padlock, and professional branding build instant customer trust.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs font-extrabold uppercase tracking-widest text-brand-violet dark:text-purple-400">
          The Real Difference
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-brand-navy dark:text-white tracking-tight mt-1">
          Your Customers Are Searching Online. What Do They Find?
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
          See the tangible operational difference between relying on informal messaging and operating an authoritative, conversion-optimized website.
        </p>
      </div>

      {/* Two-Column Side-by-Side Comparison Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* ========================================================================= */}
        {/* COLUMN 1: WITHOUT A WEBSITE (THE FRICTION & MISSED LEADS)                 */}
        {/* ========================================================================= */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
              <span className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-sm">
                ✕
              </span>
              <div>
                <h3 className="text-lg font-bold text-brand-navy dark:text-white">
                  Without a Professional Website
                </h3>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                  Informal channels, manual overhead &amp; lost conversions
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {problems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <IoCloseCircleOutline className="w-5 h-5 text-rose-500 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
            <span>Result: Lost customer inquiries and time spent answering repetitive questions.</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COLUMN 2: WITH A RYXER MART WEBSITE (AUTHORITY & CONVERSION)              */}
        {/* ========================================================================= */}
        <div className="rounded-2xl border border-brand-violet/30 dark:border-purple-500/30 bg-purple-50/20 dark:bg-purple-950/20 p-6 sm:p-8 shadow-card flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-violet/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-purple-200/60 dark:border-purple-800/60">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-brand-violet text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  ✓
                </span>
                <div>
                  <h3 className="text-lg font-bold text-brand-navy dark:text-white">
                    With a Ryxer Mart Website
                  </h3>
                  <span className="text-[11px] text-brand-violet dark:text-purple-300 font-semibold">
                    Automated showcase, 24/7 visibility &amp; clear enquiries
                  </span>
                </div>
              </div>

              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-violet text-white">
                <IoSparklesOutline className="w-2.5 h-2.5 text-amber-300" /> Recommended
              </span>
            </div>

            <div className="space-y-4">
              {solutions.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <IoCheckmarkCircleOutline className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-brand-navy dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-purple-200/60 dark:border-purple-800/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <span className="text-xs font-bold text-brand-navy dark:text-white">
              Launch packages from ₹3,499 with 1-Yr hosting free
            </span>

            <Link
              href="/#services"
              className="px-4 py-2 bg-brand-violet hover:bg-brand-violet-hover text-white text-xs font-bold rounded-xl shadow-sm inline-flex items-center justify-center gap-1.5 active:scale-95 transition-all text-center"
            >
              <span>Explore Packages</span>
              <IoArrowForwardOutline className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
