"use client";

import React from "react";
import {
  Server,
  ShieldCheck,
  MessageSquare,
  Smartphone,
  Clock,
  BadgeCheck,
} from "lucide-react";

export function TrustValueStrip() {
  const valueProps = [
    {
      icon: Server,
      title: "1-Year SSD Hosting Free",
      description: "Fast cloud servers included with zero setup charges.",
    },
    {
      icon: ShieldCheck,
      title: "Free SSL Certificate",
      description: "Pre-installed HTTPS lockdown for trusted browsing.",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp 1-Tap Ordering",
      description: "Direct engineering coordination with zero bureaucracy.",
    },
    {
      icon: Smartphone,
      title: "100% Mobile Responsive",
      description: "Pixel-perfect on phones, tablets, laptops & desktops.",
    },
    {
      icon: Clock,
      title: "3–5 Day Delivery",
      description: "Fast turnarounds so your business launches quickly.",
    },
    {
      icon: BadgeCheck,
      title: "Transparent Fixed Pricing",
      description: "Clear packages from ₹3,499 with zero hidden invoices.",
    },
  ];

  return (
    <div className="border-y border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/60 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-start">
          {valueProps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="space-y-1.5 text-left">
                <div className="w-8 h-8 rounded-lg bg-brand-violet-light dark:bg-slate-800 text-brand-violet dark:text-purple-400 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-brand-navy dark:text-white leading-tight">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
