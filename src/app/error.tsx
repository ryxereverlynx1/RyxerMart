"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home, AlertCircle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log sanitized error without exposing secrets
    console.error("Application error boundary triggered:", error.message);
  }, [error]);

  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight">
        Something Went Wrong
      </h1>
      <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
        An unexpected error occurred while processing your request. Please try refreshing the page or connect with our support desk on WhatsApp.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={() => reset()}
          className="w-full sm:w-auto px-6 py-3 bg-brand-violet hover:bg-brand-violet-hover text-white text-xs font-bold rounded-xl shadow-subtle transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Try Again
        </button>
        <Link
          href="/"
          className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-brand-navy text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" /> Return to Homepage
        </Link>
      </div>
    </div>
  );
}
