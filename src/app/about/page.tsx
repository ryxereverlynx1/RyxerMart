import React from "react";
import Link from "next/link";
import { ShieldCheck, Code, Smartphone, ArrowRight, MessageSquare } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

import { Metadata } from "next";
import { getBreadcrumbSchema } from "@/lib/schema";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About Us — Web Development & E-Commerce Agency",
  description:
    "Learn about Ryxer Mart, an Indian web development and digital solutions company built to deliver high-performing, search-engine-ready websites and online stores without agency markup.",
  alternates: {
    canonical: "https://ryxer.site/about",
  },
  openGraph: {
    title: "About Ryxer Mart | Professional Web Agency in India",
    description: "Learn about Ryxer Mart's mission to deliver fast, transparent, high-converting websites starting at ₹3,499.",
    url: "https://ryxer.site/about",
    siteName: "Ryxer Mart",
    type: "website",
  },
};

export default function AboutPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
        {/* Intro Header */}
        <ScrollReveal animation="fade-down">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-violet dark:text-purple-400">
            About Ryxer Mart
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-brand-navy dark:text-white tracking-tight leading-tight">
            Crafting Professional Web &amp; E-Commerce Solutions for Growing Businesses.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Ryxer Mart was founded with a singular purpose: to deliver world-class, clean, search-engine-ready websites and online stores to Indian businesses without agency markup, jargon, or hidden costs.
          </p>
        </div>
      </ScrollReveal>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="bg-white dark:bg-slate-900 p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle space-y-3 h-full transition-colors">
            <div className="w-10 h-10 rounded-xl bg-brand-violet-light dark:bg-slate-800 text-brand-violet dark:text-purple-300 flex items-center justify-center">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy dark:text-white">Modern Code Standards</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              We write clean, semantic code with lightning-fast load speeds. No bloated templates, broken layouts, or sluggish page builders.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={200}>
          <div className="bg-white dark:bg-slate-900 p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle space-y-3 h-full transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy dark:text-white">Mobile First &amp; Accessible</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              More than 80% of Indian internet users browse on mobile devices. Every Ryxer Mart website is tested rigorously across phones and tablets.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={300}>
          <div className="bg-white dark:bg-slate-900 p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle space-y-3 h-full transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-brand-royal dark:text-blue-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy dark:text-white">Transparent Pricing</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              What you see is what you pay. Free SSD hosting, free SSL certificate, and warranty support are bundled in every package.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Brand Disambiguation & Clarification Card */}
      <ScrollReveal animation="fade-up">
        <div className="bg-slate-50 dark:bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <h3 className="text-base sm:text-lg font-bold text-brand-navy dark:text-white">
            Looking for Ryzer Mart or RyxerMart?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <strong>Ryxer Mart</strong> is the official name and registered brand of our website development, e-commerce, and software solutions agency. If you searched on Google for <em>&ldquo;Ryzer Mart&rdquo;</em>, <em>&ldquo;RyzerMart&rdquo;</em>, or <em>&ldquo;RyxerMart&rdquo;</em>, you have reached our official portal. We provide complete, transparent web packages starting from ₹3,499 with 1 year free SSD cloud hosting and SSL included.
          </p>
        </div>
      </ScrollReveal>

      {/* Our Approach */}
      <ScrollReveal animation="fade-up">
        <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-subtle space-y-6 transition-colors">
          <h2 className="text-2xl font-black text-brand-navy dark:text-white tracking-tight">
            The Ryxer Mart Philosophy
          </h2>
          <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              Many small business owners struggle with either generic, cookie-cutter website builders that fail to rank on Google, or large design agencies that charge exorbitant rates with months of delay.
            </p>
            <p>
              Ryxer Mart offers a modern, transparent service-commerce alternative: select your exact package online, see transparent deliverables, and communicate directly with real engineers over WhatsApp.
            </p>
          </div>
          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              href="/services"
              className="px-6 py-3 bg-brand-violet hover:bg-brand-violet-hover text-white text-sm font-bold rounded-xl transition-colors inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet active:scale-98"
            >
              Explore Service Packages <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={BRAND.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-brand-navy dark:text-slate-200 text-sm font-bold rounded-xl transition-colors inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet active:scale-98"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Message on WhatsApp
            </a>
          </div>
        </div>
      </ScrollReveal>
      </div>
    </>
  );
}
