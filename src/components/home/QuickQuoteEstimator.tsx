"use client";

import React, { useState } from "react";
import {
  IoSparklesOutline,
  IoLogoWhatsapp,
  IoSendOutline,
  IoCheckmarkCircleOutline,
  IoAlertCircleOutline,
  IoSyncOutline,
  IoCalculatorOutline,
} from "react-icons/io5";
import { useToast } from "@/context/ToastContext";
import { BRAND } from "@/lib/brand";

interface PackageChoice {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  tagline: string;
}

const PACKAGE_OPTIONS: PackageChoice[] = [
  {
    id: "starter",
    name: "Starter Website",
    price: 3499,
    formattedPrice: "₹3,499",
    tagline: "5–10 Pages • 1-Yr Hosting • SSL • WhatsApp",
  },
  {
    id: "royal",
    name: "Royal Website (Most Popular)",
    price: 5499,
    formattedPrice: "₹5,499",
    tagline: "15–20 Pages • Admin Panel • Free Domain • SEO",
  },
  {
    id: "ecommerce",
    name: "Ecommerce Starter",
    price: 9999,
    formattedPrice: "₹9,999",
    tagline: "Full Online Store • Payments • Cart • Admin",
  },
  {
    id: "custom",
    name: "Custom Bespoke Scope",
    price: 0,
    formattedPrice: "Custom Quote",
    tagline: "Tailored web applications & custom software",
  },
];

export function QuickQuoteEstimator() {
  const { toast } = useToast();
  const [selectedPkg, setSelectedPkg] = useState<string>("royal");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    requirements: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const activeOption = PACKAGE_OPTIONS.find((p) => p.id === selectedPkg) || PACKAGE_OPTIONS[1];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim() || `${formData.name.toLowerCase().replace(/\s+/g, "")}@enquiry.ryxermart.com`,
        phone: formData.phone.trim(),
        message: `Package Interested: ${activeOption.name} (${activeOption.formattedPrice})\nRequirements: ${formData.requirements.trim() || "Standard package consultation requested."}`,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit quote request");
      }

      setStatus("success");
      toast("Your project enquiry has been submitted. Our team will contact you shortly!", {
        type: "success",
        title: "Quote Request Sent",
      });
      setFormData({ name: "", phone: "", email: "", requirements: "" });
    } catch (err: unknown) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : "Submission failed. Please message us on WhatsApp.";
      setErrorMessage(msg);
      toast(msg, { type: "error", title: "Error" });
    }
  };

  const getWhatsAppEstimateLink = () => {
    const text = `Hello Ryxer Mart, I would like a quote for the ${activeOption.name} (${activeOption.formattedPrice}). My name is ${formData.name || "[Name]"}. Phone: ${formData.phone || "[Phone]"}. Additional details: ${formData.requirements || "None"}.`;
    return `https://wa.me/917719421910?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-3d-card overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-violet dark:text-purple-400">
            Interactive Project Estimator
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white tracking-tight mt-0.5">
            Get an Instant Project Scope &amp; Quote
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Choose your desired website tier and tell us what you need. Zero obligations.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/80 text-brand-violet dark:text-purple-300 text-xs font-bold shrink-0">
          <IoCalculatorOutline className="w-4 h-4" />
          <span>Starting at ₹3,499</span>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {status === "success" ? (
          <div className="p-8 text-center space-y-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl animate-fade-in">
            <IoCheckmarkCircleOutline className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
            <h4 className="text-lg font-bold text-emerald-900 dark:text-emerald-100">
              Quote Request Received
            </h4>
            <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 max-w-md mx-auto">
              Thank you for sharing your project details. Our lead developer will review your request and connect with you on WhatsApp / Phone within 2 hours.
            </p>
            <div className="pt-3">
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {status === "error" && (
              <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                <IoAlertCircleOutline className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Step 1: Package Selector Tabs */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                1. Select Desired Website Scope / Package
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {PACKAGE_OPTIONS.map((pkg) => {
                  const isSelected = selectedPkg === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPkg(pkg.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "border-brand-violet bg-brand-violet-subtle/50 dark:bg-purple-950/40 ring-2 ring-brand-violet/20"
                          : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-bold text-brand-navy dark:text-white truncate">
                          {pkg.name}
                        </span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-brand-violet shrink-0" />
                        )}
                      </div>
                      <span className="text-sm font-black text-brand-violet dark:text-purple-300 block">
                        {pkg.formattedPrice}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-1 leading-tight">
                        {pkg.tagline}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  WhatsApp / Phone <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="rahul@business.com"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet transition-all"
                />
              </div>
            </div>

            {/* Step 3: Project Requirements */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Tell Us Briefly About Your Business &amp; Website Goals
              </label>
              <textarea
                rows={3}
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                placeholder="e.g. We run a boutique fashion store in Punjab and need an online catalogue with WhatsApp ordering and Google Maps location."
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet transition-all resize-none"
              />
            </div>

            {/* Dual Submission Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                <span>Selected Package: </span>
                <strong className="text-brand-navy dark:text-white font-bold">
                  {activeOption.name} ({activeOption.formattedPrice})
                </strong>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={getWhatsAppEstimateLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                >
                  <IoLogoWhatsapp className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </a>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-6 py-3 rounded-xl text-xs font-bold bg-brand-navy hover:bg-brand-royal dark:bg-brand-royal dark:hover:bg-brand-royal-light text-white shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                >
                  {status === "loading" ? (
                    <>
                      <IoSyncOutline className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <IoSendOutline className="w-4 h-4" />
                      <span>Submit Form</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
