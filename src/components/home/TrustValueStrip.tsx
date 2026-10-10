"use client";

import React from "react";
import {
  IoSpeedometerOutline,
  IoShieldCheckmarkOutline,
  IoLogoWhatsapp,
  IoPhonePortraitOutline,
  IoRocketOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";

export function TrustValueStrip() {
  const valueProps = [
    {
      icon: IoSpeedometerOutline,
      title: "1-Yr Free SSD Hosting",
      description: "Cloud servers included with pre-installed SSL.",
    },
    {
      icon: IoShieldCheckmarkOutline,
      title: "SSL Security Lockdown",
      description: "256-bit HTTPS encryption for customer trust.",
    },
    {
      icon: IoLogoWhatsapp,
      title: "WhatsApp Direct Enquiry",
      description: "Direct customer leads sent straight to your phone.",
    },
    {
      icon: IoPhonePortraitOutline,
      title: "100% Mobile Responsive",
      description: "Fluid UX across phones, tablets & laptops.",
    },
    {
      icon: IoRocketOutline,
      title: "Rapid 3–5 Day Launch",
      description: "Clear milestones to get your brand live fast.",
    },
    {
      icon: IoCheckmarkCircleOutline,
      title: "Transparent Fixed Pricing",
      description: "Packages from ₹3,499 with zero hidden invoices.",
    },
  ];

  return (
    <div className="border-y border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/60 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-start">
          {valueProps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="space-y-1.5 text-left p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-850/70 border border-slate-200/70 dark:border-slate-800 shadow-subtle hover:shadow-3d-floating dark:hover:shadow-3d-floating-dark card-lift transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-violet-light dark:bg-slate-800 text-brand-violet dark:text-purple-400 flex items-center justify-center transition-colors shadow-sm">
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
