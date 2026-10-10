"use client";

import React, { useState } from "react";
import {
  IoLayersOutline,
  IoDocumentTextOutline,
  IoLogoWhatsapp,
  IoCodeSlashOutline,
  IoRocketOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import { BRAND } from "@/lib/brand";

export function InteractiveHowItWorks() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      number: "01",
      title: "Choose a Package",
      subtitle: "Fixed pricing from ₹3,499",
      description: "Select Starter, Royal, or Ecommerce based on your page requirements and whether you need an admin panel or online cart.",
      icon: IoLayersOutline,
      deliverable: "Transparent inclusions",
    },
    {
      number: "02",
      title: "Tell Us What You Need",
      subtitle: "Zero complex paperwork",
      description: "Submit your business name, contact details, and initial thoughts via our order checkout or direct enquiry form.",
      icon: IoDocumentTextOutline,
      deliverable: "Instant scope logging",
    },
    {
      number: "03",
      title: "Discuss & Confirm",
      subtitle: "Direct on WhatsApp",
      description: `We connect immediately on WhatsApp (${BRAND.phone}) to confirm your design direction, brand assets, and content.`,
      icon: IoLogoWhatsapp,
      deliverable: "1-on-1 engineer chat",
    },
    {
      number: "04",
      title: "We Build & Polish",
      subtitle: "Speed & mobile optimized",
      description: "Our engineering team codes your responsive website with free SSD cloud hosting, SSL security, and WhatsApp integration.",
      icon: IoCodeSlashOutline,
      deliverable: "3–5 day development",
    },
    {
      number: "05",
      title: "Your Website Goes Live",
      subtitle: "Ready to acquire customers",
      description: "Your site is deployed on your custom domain, submitted to Google Search Console, and handed over with full support.",
      icon: IoRocketOutline,
      deliverable: "Live & ranking ready",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Step Tabs / Numbers Progression */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isSelected = activeStep === index;
          return (
            <div
              key={step.number}
              onMouseEnter={() => setActiveStep(index)}
              onClick={() => setActiveStep(index)}
              className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 ${
                isSelected
                  ? "bg-white dark:bg-slate-800 border-brand-violet/50 dark:border-purple-500/50 shadow-card -translate-y-1"
                  : "bg-slate-50/70 dark:bg-slate-900/40 border-slate-200/70 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xl font-black transition-colors ${
                      isSelected
                        ? "text-brand-violet dark:text-purple-400"
                        : "text-slate-400 dark:text-slate-600"
                    }`}
                  >
                    {step.number}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-brand-violet text-white shadow-sm"
                        : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h4 className="text-sm font-bold text-brand-navy dark:text-white leading-tight">
                  {step.title}
                </h4>
                <p className="text-[11px] text-brand-violet dark:text-purple-300 font-semibold">
                  {step.subtitle}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                <IoCheckmarkCircleOutline className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span className="truncate">{step.deliverable}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
