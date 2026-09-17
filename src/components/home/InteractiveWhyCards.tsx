"use client";

import React, { useState } from "react";
import {
  Smartphone,
  MessageSquare,
  Search,
  SlidersHorizontal,
  Layers,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export function InteractiveWhyCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    {
      title: "Responsive Mobile-First Design",
      description: "Every website adapts seamlessly across 320px smartphone displays, tablets, laptops, and ultra-wide desktop monitors.",
      icon: Smartphone,
      color: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-50 dark:bg-blue-950/50",
      textColor: "text-blue-600 dark:text-blue-400",
      tag: "Touch & Keyboard Optimized",
    },
    {
      title: "Direct WhatsApp Integration",
      description: "Equipped with click-to-chat widgets and call triggers so Indian customers can reach your sales desk directly without friction.",
      icon: MessageSquare,
      color: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-50 dark:bg-emerald-950/50",
      textColor: "text-emerald-600 dark:text-emerald-400",
      tag: "Instant Customer Chat",
    },
    {
      title: "SEO-Friendly Architecture",
      description: "Clean semantic HTML, OpenGraph tags, JSON-LD Schema markup, and speed-optimized assets to rank effectively on Google.",
      icon: Search,
      color: "from-violet-500 to-purple-600",
      bgLight: "bg-purple-50 dark:bg-purple-950/50",
      textColor: "text-purple-600 dark:text-purple-400",
      tag: "Google Ready Metadata",
    },
    {
      title: "Admin-Managed Websites",
      description: "Our Royal and Ecommerce packages come with intuitive admin interfaces so you can edit text, prices, and banners independently.",
      icon: SlidersHorizontal,
      color: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50 dark:bg-amber-950/50",
      textColor: "text-amber-600 dark:text-amber-400",
      tag: "Zero Coding Required",
    },
    {
      title: "Custom Feature Readiness",
      description: "Need custom booking forms, multi-currency display, or payment gateway integration? We tailor features to your specific workflow.",
      icon: Layers,
      color: "from-pink-500 to-rose-600",
      bgLight: "bg-rose-50 dark:bg-rose-950/50",
      textColor: "text-rose-600 dark:text-rose-400",
      tag: "Bespoke Engineering",
    },
    {
      title: "SSL & Hosting Included",
      description: "We eliminate hidden operational fees by bundling high-speed SSD cloud hosting and SSL security certificates in our packages.",
      icon: ShieldCheck,
      color: "from-cyan-500 to-blue-600",
      bgLight: "bg-cyan-50 dark:bg-cyan-950/50",
      textColor: "text-cyan-600 dark:text-cyan-400",
      tag: "100% Free Setup",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        const isHovered = hoveredIndex === index;
        return (
          <div
            key={feature.title}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 relative space-y-3.5 h-full flex flex-col justify-between ${
              isHovered
                ? "bg-white dark:bg-slate-800 border-brand-violet/50 dark:border-purple-500/50 shadow-card-glow -translate-y-1.5"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-subtle hover:border-slate-300 dark:hover:border-slate-700"
            }`}
          >
            <div className="space-y-3">
              <div
                className={`w-12 h-12 rounded-xl ${feature.bgLight} ${feature.textColor} flex items-center justify-center transition-all duration-300 ${
                  isHovered ? "scale-110 rotate-3 shadow-sm" : ""
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-brand-navy dark:text-white transition-colors">
                {feature.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {feature.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <span className={`text-[11px] font-bold ${feature.textColor}`}>
                {feature.tag}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-violet group-hover:translate-x-1 transition-all duration-200" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
