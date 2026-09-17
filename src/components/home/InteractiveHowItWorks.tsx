"use client";

import React, { useState } from "react";
import { Search, ShoppingCart, Send, Rocket, CheckCircle2 } from "lucide-react";

export function InteractiveHowItWorks() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      number: "01",
      title: "Choose a Service",
      description: "Browse our fixed-price website and e-commerce packages. Compare features, delivery estimates, and included hosting specifications.",
      icon: Search,
      highlight: "Compare features & hosting",
    },
    {
      number: "02",
      title: "Add to Cart",
      description: "Select your desired package and review your order total with transparent, authoritative pricing and zero hidden fees.",
      icon: ShoppingCart,
      highlight: "Fixed transparent pricing",
    },
    {
      number: "03",
      title: "Send Your Scope",
      description: "Fill in your contact details and project requirements. Your order is logged in our database and emailed to our engineering team.",
      icon: Send,
      highlight: "Secure order logging",
    },
    {
      number: "04",
      title: "Build & Launch",
      description: "WhatsApp opens with your pre-formatted order summary. Our engineering lead reviews your scope and begins work right away.",
      icon: Rocket,
      highlight: "Direct WhatsApp kick-off",
    },
  ];

  return (
    <div className="relative">
      {/* Connecting animated line across steps on desktop */}
      <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-0.5 -translate-y-12 bg-slate-200 dark:bg-slate-800 -z-0" aria-hidden="true">
        <div
          className="h-full bg-gradient-to-r from-brand-royal via-brand-violet to-purple-400 transition-all duration-500 rounded-full"
          style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isSelected = activeStep === index;
          return (
            <div
              key={step.number}
              onMouseEnter={() => setActiveStep(index)}
              onClick={() => setActiveStep(index)}
              className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer relative space-y-4 h-full flex flex-col justify-between ${
                isSelected
                  ? "bg-white dark:bg-slate-800 border-brand-violet dark:border-purple-500 shadow-card-glow -translate-y-2"
                  : "bg-slate-50/80 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-1 shadow-subtle"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-2xl sm:text-3xl font-black transition-colors duration-200 ${
                      isSelected
                        ? "text-brand-violet dark:text-purple-400"
                        : "text-slate-400 dark:text-slate-600"
                    }`}
                  >
                    {step.number}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? "bg-brand-violet text-white shadow-md scale-110"
                        : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-brand-navy dark:text-white">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 text-[11px] font-bold text-brand-violet dark:text-purple-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{step.highlight}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
