"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Menu, X, MessageSquare, ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const { itemCount, setIsDrawerOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Track scroll for dynamic navbar sizing
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // If in admin panel, hide main visitor navbar
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Packages", href: "/#services" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Why Us", href: "/#why-us" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
        isScrolled
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-slate-200/90 dark:border-slate-800 shadow-subtle"
          : "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? "h-16" : "h-20"
          }`}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet rounded-lg p-1 transition-transform duration-200 hover:scale-[1.01]"
          >
            <div
              className={`relative overflow-hidden rounded-xl flex-shrink-0 transition-all duration-300 ${
                isScrolled ? "w-9 h-9" : "w-11 h-11"
              }`}
            >
              <Image
                src="/images/logo.png"
                alt="Ryxer Mart — Web Development & E-Commerce Agency"
                fill
                sizes="48px"
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight leading-none text-brand-navy dark:text-white transition-colors">
                RYXER <span className="text-brand-violet">MART</span>
              </span>
              <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400 mt-0.5">
                Web Development Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors duration-150 py-1.5 relative ${
                    isActive
                      ? "text-brand-violet dark:text-purple-300 font-bold"
                      : "text-slate-600 dark:text-slate-300 hover:text-brand-navy dark:hover:text-white"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-violet rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* WhatsApp Quick CTA */}
            <a
              href="https://wa.me/917719421910?text=Hello%20Ryxer%20Mart%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet"
              aria-label="Direct WhatsApp Message"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2 rounded-xl text-brand-navy dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-subtle transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet"
              aria-label={`Open shopping cart with ${itemCount} items`}
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-violet text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 animate-scale-in shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Primary Get Started CTA */}
            <Link
              href="/#services"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-brand-navy hover:bg-brand-royal dark:bg-brand-royal dark:hover:bg-brand-royal-light text-white text-xs font-bold rounded-xl transition-all shadow-subtle hover:shadow-card active:scale-98"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Hamburger Toggle with Rotational Morph */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative w-10 h-10 flex items-center justify-center md:hidden text-slate-700 dark:text-slate-200 hover:text-brand-navy dark:hover:text-white rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet transition-colors active:scale-95"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <div
                className={`transition-all duration-200 transform ${
                  mobileMenuOpen ? "rotate-90 scale-105" : "rotate-0 scale-100"
                }`}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-brand-violet" />
                ) : (
                  <Menu className="w-6 h-6 text-brand-navy dark:text-slate-200" />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-5 pt-3 pb-6 space-y-3 shadow-elevated transition-all animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-3 py-1">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Theme</span>
              <ThemeToggle showLabel />
            </div>
            <Link
              href="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-brand-violet hover:bg-brand-violet-hover text-white rounded-xl text-sm font-bold shadow-subtle transition-all active:scale-98"
            >
              <span>Explore Packages (from ₹3,499)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/917719421910?text=Hello%20Ryxer%20Mart%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-brand-navy dark:text-white rounded-xl text-sm font-bold border border-slate-200 dark:border-slate-700 transition-colors active:scale-98"
            >
              <MessageSquare className="w-4 h-4 text-emerald-500" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
