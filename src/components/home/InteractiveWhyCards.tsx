"use client";

import React, { useState } from "react";
import {
  Smartphone,
  MessageSquare,
  Search,
  SlidersHorizontal,
  Server,
  Clock,
  ArrowRight,
} from "lucide-react";

export function InteractiveWhyCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    {
      title: "Mobile-First Architecture",
      description: "Over 80% of web traffic in India comes from mobile smartphones. Every page is tailored to load instantly on 4G/5G mobile connections.",
      icon: Smartphone,
      tag: "Tested on 320px–4K displays",
    },
    {
      title: "Direct WhatsApp Lead Funnels",
      description: "Instead of complex checkout roadblocks, customers connect directly to your business WhatsApp with pre-filled package queries.",
      icon: MessageSquare,
      tag: "Zero drop-off communication",
    },
    {
      title: "Clean Semantic Google SEO",
      description: "Includes JSON-LD structured schema markup, OpenGraph metadata, fast core web vitals, and clean sitemaps so search engines index you easily.",
      icon: Search,
      tag: "Google Search Console ready",
    },
    {
      title: "Intuitive Admin Control",
      description: "Royal and Ecommerce packages include clean, secure admin portals where you can update content, products, and prices independently.",
      icon: SlidersHorizontal,
      tag: "No coding needed after launch",
    },
    {
      title: "Bundled SSD Cloud Hosting & SSL",
      description: "We eliminate surprising annual hosting bills by including 1 full year of ultra-fast cloud hosting and pre-installed SSL certificates.",
      icon: Server,
      tag: "Zero hidden launch fees",
    },
    {
      title: "Fast 3–5 Day Turnaround",
      description: "We don't drag projects out for months. Once your business scope is confirmed, our dedicated engineers build and launch your site quickly.",
      icon: Clock,
      tag: "Rapid market deployment",
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
            className={`p-6 sm:p-7 rounded-2xl border transition-[transform,border-color,box-shadow,background-color] duration-200 ease-out-emil card-lift relative space-y-4 h-full flex flex-col justify-between ${
              isHovered
                ? "bg-white dark:bg-slate-800 border-brand-violet/40 dark:border-purple-500/40 shadow-card"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-subtle hover:border-slate-300 dark:hover:border-slate-700"
            }`}
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-violet-light dark:bg-slate-800 text-brand-violet dark:text-purple-400 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-brand-navy dark:text-white">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {feature.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-brand-violet dark:text-purple-300 font-semibold">
              <span>{feature.tag}</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
