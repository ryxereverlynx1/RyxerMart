"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Minus, ArrowRight, Star, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

interface FeatureRow {
  name: string;
  category: string;
  starter: string | boolean;
  royal: string | boolean;
  ecommerce: string | boolean;
}

const COMPARISON_DATA: FeatureRow[] = [
  // Core Specs
  { name: "Pages Included", category: "Scope & Design", starter: "5–10 Custom Pages", royal: "15–20 Custom Pages", ecommerce: "Unlimited Products & Pages" },
  { name: "Delivery Timeline", category: "Scope & Design", starter: "3–5 Business Days", royal: "4–6 Business Days", ecommerce: "5–8 Business Days" },
  { name: "Responsive Across All Devices", category: "Scope & Design", starter: true, royal: true, ecommerce: true },
  { name: "Custom Visual Identity", category: "Scope & Design", starter: "Standard Clean", royal: "High-Impact Premium", ecommerce: "Retail E-Commerce Brand" },

  // Hosting & Security
  { name: "High-Speed SSD Cloud Hosting", category: "Hosting & Infrastructure", starter: "1 Year Free Included", royal: "1 Year Free Included", ecommerce: "1 Year Free Included" },
  { name: "SSL Security Certificate", category: "Hosting & Infrastructure", starter: "Free Pre-installed", royal: "Free Pre-installed", ecommerce: "Free Pre-installed" },
  { name: "Free Domain (.com / .in)", category: "Hosting & Infrastructure", starter: false, royal: "1 Year Included", ecommerce: false },

  // Communication & Conversion
  { name: "WhatsApp Direct Enquiry Setup", category: "Lead Generation", starter: true, royal: true, ecommerce: true },
  { name: "Mobile Call Button Integration", category: "Lead Generation", starter: true, royal: true, ecommerce: true },
  { name: "Google Map & Location Embed", category: "Lead Generation", starter: true, royal: true, ecommerce: true },
  { name: "Contact & Consultation Form", category: "Lead Generation", starter: true, royal: "Instant Email Routing", ecommerce: "Customer Account & Order Alerts" },
  { name: "AI Guidance Chatbot", category: "Lead Generation", starter: true, royal: "Smart Assistant", ecommerce: "Smart Assistant" },

  // Management & E-Commerce
  { name: "Dedicated Admin Panel", category: "Management & Tech", starter: false, royal: "Content & Lead Manager", ecommerce: "Full Store & Order Dashboard" },
  { name: "Product Catalog & Cart System", category: "Management & Tech", starter: false, royal: "WhatsApp Catalog", ecommerce: "Up to 100 Products Setup" },
  { name: "Payment Gateway (UPI/Razorpay/COD)", category: "Management & Tech", starter: false, royal: false, ecommerce: true },
  { name: "Coupons & Discount Engine", category: "Management & Tech", starter: false, royal: false, ecommerce: true },
  { name: "Customer Reviews & Rating System", category: "Management & Tech", starter: false, royal: false, ecommerce: true },

  // SEO & Support
  { name: "Google SEO Friendly Architecture", category: "SEO & Support", starter: true, royal: "Advanced Meta + Console Setup", ecommerce: "Product Schema + SEO" },
  { name: "Technical Maintenance Support", category: "SEO & Support", starter: "30 Days Free", royal: "60 Days Priority", ecommerce: "90 Days Dedicated" },
];

export function PricingComparisonTable() {
  const [isOpen, setIsOpen] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleQuickAdd = (slug: string, name: string, price: number) => {
    addItem(
      {
        serviceId: slug,
        slug,
        name,
        price,
      },
      1,
      false
    );
    toast(`"${name}" was added to your cart.`, {
      type: "success",
      title: "Package Added",
    });
  };

  const renderValue = (val: string | boolean) => {
    if (typeof val === "boolean") {
      return val ? (
        <div className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
      ) : (
        <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
          <Minus className="w-3.5 h-3.5" />
        </div>
      );
    }
    return <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{val}</span>;
  };

  return (
    <div className="mt-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle overflow-hidden">
      {/* Header Bar */}
      <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-violet dark:text-purple-400">
            Side-by-Side Evaluation
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white tracking-tight mt-0.5">
            Compare All Package Specifications
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Evaluate exact deliverables across Starter, Royal, and E-Commerce plans.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="px-5 py-2.5 rounded-xl text-xs font-bold transition-all bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-brand-navy dark:text-white border border-slate-200 dark:border-slate-700 shadow-subtle flex items-center gap-2 active:scale-98"
        >
          <span>{isOpen ? "Hide Full Comparison" : "View Detailed Comparison Table"}</span>
          <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} />
        </button>
      </div>

      {isOpen && (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-2/5">
                  Package Deliverables
                </th>
                <th className="p-4 sm:p-5 text-center w-1/5">
                  <div className="space-y-1">
                    <span className="text-sm font-bold text-brand-navy dark:text-white block">Starter</span>
                    <span className="text-lg font-black text-brand-navy dark:text-white block">₹3,499</span>
                    <button
                      type="button"
                      onClick={() => handleQuickAdd("starter-website", "Starter Website", 3499)}
                      className="mt-2 text-[11px] font-bold px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors inline-flex items-center gap-1"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      Add to Cart
                    </button>
                  </div>
                </th>
                <th className="p-4 sm:p-5 text-center w-1/5 bg-brand-violet-light/30 dark:bg-purple-950/20 border-x border-brand-violet/20">
                  <div className="space-y-1 relative">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-violet text-white text-[9px] font-extrabold uppercase mb-1">
                      <Star className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
                      Most Popular
                    </span>
                    <span className="text-sm font-bold text-brand-violet dark:text-purple-300 block">Royal</span>
                    <span className="text-lg font-black text-brand-violet dark:text-purple-300 block">₹5,499</span>
                    <button
                      type="button"
                      onClick={() => handleQuickAdd("royal-website", "Royal Website", 5499)}
                      className="mt-2 text-[11px] font-bold px-3 py-1 rounded-lg bg-brand-violet hover:bg-brand-violet-hover text-white transition-colors inline-flex items-center gap-1"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      Add to Cart
                    </button>
                  </div>
                </th>
                <th className="p-4 sm:p-5 text-center w-1/5">
                  <div className="space-y-1">
                    <span className="text-sm font-bold text-brand-navy dark:text-white block">Ecommerce</span>
                    <span className="text-lg font-black text-brand-navy dark:text-white block">₹9,999</span>
                    <button
                      type="button"
                      onClick={() => handleQuickAdd("ecommerce-starter", "Ecommerce Starter", 9999)}
                      className="mt-2 text-[11px] font-bold px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors inline-flex items-center gap-1"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      Add to Cart
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {COMPARISON_DATA.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors text-center"
                >
                  <td className="p-4 sm:p-5 text-left text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                    <div>
                      <span>{row.name}</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 block">
                        {row.category}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5">{renderValue(row.starter)}</td>
                  <td className="p-4 sm:p-5 bg-brand-violet-light/20 dark:bg-purple-950/15 border-x border-brand-violet/20 font-semibold">
                    {renderValue(row.royal)}
                  </td>
                  <td className="p-4 sm:p-5">{renderValue(row.ecommerce)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
