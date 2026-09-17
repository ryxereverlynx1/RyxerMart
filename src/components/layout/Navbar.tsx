"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Menu, X, MessageSquare } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const { itemCount, setIsDrawerOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Track scroll for dynamic navbar sizing and reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (winHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / winHeight) * 100)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // If in admin panel, hide main visitor navbar
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "About", href: "/about" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full backdrop-blur-md transition-all duration-300 border-b ${
        isScrolled
          ? "bg-white/95 dark:bg-slate-900/95 border-slate-200 dark:border-slate-800 shadow-card"
          : "bg-white/80 dark:bg-slate-900/80 border-brand-border/60 dark:border-slate-800/60 shadow-subtle"
      }`}
    >
      {/* Reading Progress Line */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-brand-royal via-brand-violet to-purple-400 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? "h-16" : "h-20"
          }`}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet rounded-lg p-1 transition-transform duration-200 hover:scale-[1.02]"
          >
            <div
              className={`relative overflow-hidden rounded-xl flex-shrink-0 transition-all duration-300 group-hover:shadow-card-glow ${
                isScrolled ? "w-10 h-10" : "w-12 h-12"
              }`}
            >
              <Image
                src="/images/logo.png"
                alt="RyxerMart Logo"
                fill
                sizes="48px"
                className="object-contain group-hover:scale-110 group-hover:rotate-1 transition-all duration-300"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight leading-none text-brand-navy dark:text-white transition-colors group-hover:text-brand-royal dark:group-hover:text-indigo-200">
                RYXER<span className="text-brand-violet group-hover:text-brand-violet-hover">MART</span>
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400 mt-0.5 transition-colors">
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
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`group text-sm font-semibold transition-all duration-200 py-1.5 relative ${
                    isActive
                      ? "text-brand-violet dark:text-purple-300 font-bold"
                      : "text-slate-600 dark:text-slate-300 hover:text-brand-navy dark:hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {/* Dynamic underline on hover and active */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-full bg-gradient-to-r from-brand-royal via-brand-violet to-purple-400"
                        : "w-0 group-hover:w-full bg-brand-violet/70 dark:bg-purple-400/70"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* WhatsApp Quick CTA */}
            <a
              href="https://wa.me/919876543210?text=Hello%20RyxerMart%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-brand-navy dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] btn-shimmer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet"
              aria-label="Direct WhatsApp Message"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:animate-bounce-subtle" />
              <span>WhatsApp</span>
            </a>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2 rounded-xl text-brand-navy dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 border border-brand-border dark:border-slate-700 hover:border-brand-violet/40 dark:hover:border-purple-500/40 shadow-subtle hover:shadow-card-glow transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet"
              aria-label={`Open shopping cart with ${itemCount} items`}
            >
              <ShoppingCart className="w-5 h-5 transition-transform duration-200 hover:rotate-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-brand-violet to-purple-600 text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 animate-bounce-subtle shadow-md">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle with Rotational Morph */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative w-10 h-10 flex items-center justify-center md:hidden text-slate-700 dark:text-slate-200 hover:text-brand-navy dark:hover:text-white rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet transition-colors active:scale-90"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <div
                className={`transition-all duration-300 transform ${
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
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-brand-border dark:border-slate-800 px-4 pt-3 pb-6 space-y-3 shadow-elevated transition-all animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-semibold text-slate-700 dark:text-slate-200 hover:text-brand-navy dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-3 py-1">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Theme</span>
              <ThemeToggle showLabel />
            </div>
            <a
              href="https://wa.me/919876543210?text=Hello%20RyxerMart%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-navy dark:bg-brand-royal text-white rounded-lg text-sm font-bold shadow-subtle hover:opacity-95 transition-opacity active:scale-98"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Talk on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
