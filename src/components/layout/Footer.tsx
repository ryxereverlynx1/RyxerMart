"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MessageSquare, Phone, Mail, MapPin, ArrowRight } from "lucide-react";

export function Footer() {
  const pathname = usePathname();

  // Hide on admin dashboard
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">
      {/* Top Footer Banner */}
      <div className="bg-brand-navy py-8 px-4 sm:px-6 lg:px-8 border-b border-brand-royal/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">Ready to build your business website?</h3>
            <p className="text-slate-300 text-sm mt-1">
              Choose a package, send your requirements on WhatsApp, and launch within days.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/services"
              className="px-5 py-2.5 bg-brand-violet hover:bg-brand-violet-hover text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2"
            >
              Browse Packages <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/917719421910?text=Hello%20RyxerMart%2C%20I%20would%20like%20to%20discuss%20a%20website%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-lg transition-colors border border-white/20 flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 overflow-hidden rounded bg-white p-1">
                <Image
                  src="/images/logo.png"
                  alt="RyxerMart Web Solutions - Affordable Web Design Agency Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                RYXER<span className="text-brand-violet">MART</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed pr-4">
              RyxerMart provides high-impact website development, custom e-commerce stores, and digital web solutions designed specifically for Indian businesses, startups, and service providers. Transparent pricing with no hidden agency fees.
            </p>
            <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Accepting New Web & E-Commerce Projects</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Packages</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/services/starter-website" className="hover:text-white transition-colors">
                  Starter Website (₹3,499)
                </Link>
              </li>
              <li>
                <Link href="/services/royal-website" className="hover:text-white transition-colors">
                  Royal Website (₹5,499)
                </Link>
              </li>
              <li>
                <Link href="/services/ecommerce-starter" className="hover:text-white transition-colors">
                  Ecommerce Starter (₹9,999)
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors text-purple-400 font-semibold inline-flex items-center gap-1.5 group">
                  <span>All Service Packages</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About RyxerMart
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-white transition-colors">
                  How Ordering Works
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Get in Touch</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-violet flex-shrink-0 mt-0.5" />
                <span>Jalandhar, Punjab, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-violet flex-shrink-0" />
                <a href="tel:+917719421910" className="hover:text-white transition-colors">
                  +91 7719421910
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-violet flex-shrink-0" />
                <a href="mailto:ryxereverlynx@gmail.com" className="hover:text-white transition-colors">
                  ryxereverlynx@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href="https://wa.me/917719421910"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Support Desk
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal and Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} RyxerMart. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/refund-policy" className="hover:text-white transition-colors">
              Refund & Cancellation Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
