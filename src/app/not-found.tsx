import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
      <ScrollReveal animation="fade-in" duration={400}>
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-slate dark:bg-slate-800 border-2 border-brand-border dark:border-slate-700 text-brand-navy dark:text-white font-black text-2xl">
          404
        </div>
      </ScrollReveal>
      <ScrollReveal animation="fade-up" delay={100} duration={400}>
        <h1 className="text-3xl font-black text-brand-navy dark:text-white tracking-tight">
          Page Not Found
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed mt-2">
          The web page or package you are looking for does not exist, has been removed, or is currently unavailable.
        </p>
      </ScrollReveal>
      <ScrollReveal animation="fade-up" delay={200} duration={500}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-brand-navy hover:bg-brand-royal dark:bg-brand-royal dark:hover:bg-brand-violet text-white text-xs font-bold rounded-xl shadow-subtle transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Go to Homepage
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" /> Browse Packages
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
