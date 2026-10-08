"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, ArrowRight } from "lucide-react";

export function MobileStickyBar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show once user has scrolled past initial hero (scrollY > 180)
      setIsVisible(window.scrollY > 180);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide on admin routes or checkout
  if (pathname.startsWith("/admin") || pathname.startsWith("/checkout") || !isVisible) {
    return null;
  }

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-2.5 px-4 shadow-elevated animate-fade-up"
      role="region"
      aria-label="Quick Mobile Actions"
    >
      <div className="flex items-center gap-2.5 max-w-md mx-auto">
        <Link
          href="/#services"
          className="flex-1 py-2.5 px-3 bg-brand-navy dark:bg-brand-royal text-white text-xs font-bold rounded-xl text-center shadow-subtle flex items-center justify-center gap-1.5 active:scale-95"
        >
          <span>Packages (₹3,499)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <a
          href="https://wa.me/917719421910?text=Hello%20Ryxer%20Mart%2C%20I%20would%20like%20to%20discuss%20a%20website%20project."
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-subtle active:scale-95 flex-shrink-0"
          aria-label="Chat directly on WhatsApp"
        >
          <MessageSquare className="w-3.5 h-3.5 text-white" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
