"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  MessageSquare,
  ShieldCheck,
  AlertCircle,
  RefreshCw,
  ArrowLeft,
  Lock,
  CheckCircle,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    country: "India",
    companyName: "",
    websiteUrl: "",
    requirements: "",
    agreeContact: true,
  });

  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
          <Lock className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-brand-navy dark:text-white">Your Cart is Empty</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Please add a web development package before proceeding to checkout.
        </p>
        <Link
          href="/#services"
          className="inline-block px-6 py-3 bg-brand-navy dark:bg-brand-royal text-white text-xs font-bold rounded-xl hover:opacity-90 transition-opacity"
        >
          Browse Packages (from ₹3,499)
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setErrorMessage("");

    try {
      const payload = {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        city: formData.city.trim() || "India",
        state: formData.state.trim() || "Punjab",
        country: formData.country.trim() || "India",
        companyName: formData.companyName.trim() || undefined,
        websiteUrl: formData.websiteUrl.trim() || undefined,
        requirements: formData.requirements.trim() || undefined,
        agreeContact: formData.agreeContact,
        items: items.map((item) => ({
          serviceId: item.serviceId,
          quantity: item.quantity,
        })),
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to process order submission.");
      }

      // Order saved in database
      clearCart();

      if (data.order?.whatsappLink) {
        sessionStorage.setItem("last_whatsapp_link", data.order.whatsappLink);
      }

      // Open WhatsApp in popup if permitted
      try {
        if (data.order?.whatsappLink) {
          window.open(data.order.whatsappLink, "_blank");
        }
      } catch (e) {
        console.warn("Popup blocked or not supported:", e);
      }

      router.push(`/order-success/${data.order.orderNumber}`);
    } catch (err: unknown) {
      console.error("Submission error:", err);
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please check your details."
      );
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      {/* 3-Step Progress Header */}
      <ScrollReveal animation="fade-down">
        <div className="space-y-4">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-brand-navy dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Packages
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
              <CheckCircle className="w-3.5 h-3.5" /> 1. Package Selected
            </span>
            <span>&rarr;</span>
            <span className="font-bold text-brand-violet dark:text-purple-300">
              2. Contact Scope
            </span>
            <span>&rarr;</span>
            <span>3. WhatsApp Confirmation</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy dark:text-white tracking-tight">
            Review &amp; Send Order Enquiry
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            No upfront card payment is required. Your scope is saved in our database, emailed to our engineers, and prepared for instant WhatsApp discussion.
          </p>
        </div>
      </ScrollReveal>

      {errorMessage && (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs sm:text-sm text-rose-700 dark:text-rose-300 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Customer Information Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-brand-navy dark:text-white font-bold text-base">
              <Lock className="w-4 h-4 text-brand-violet dark:text-purple-400" />
              <span>Contact Information</span>
            </div>
            <span className="text-[11px] text-slate-400">Required fields marked *</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Rajesh Sharma"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  WhatsApp / Phone <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765-43210"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@business.com"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
                />
              </div>
            </div>

            {/* Progressive Disclosure Toggle for Optional Details */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowOptionalFields(!showOptionalFields)}
                className="text-xs font-bold text-brand-violet dark:text-purple-300 flex items-center gap-1.5 hover:underline focus:outline-none"
              >
                <span>{showOptionalFields ? "Hide business details" : "+ Add company name & project notes (optional)"}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showOptionalFields ? "rotate-180" : ""}`} />
              </button>
            </div>

            {showOptionalFields && (
              <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Company / Business Name
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Sharma Enterprises"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Existing Website (if any)
                    </label>
                    <input
                      type="url"
                      value={formData.websiteUrl}
                      onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                      placeholder="https://example.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Jalandhar"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="e.g. Punjab"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Project Notes &amp; Preferred Features
                  </label>
                  <textarea
                    rows={3}
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    placeholder="Mention any specific design inspirations, target launch dates, or custom requirements."
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet resize-none"
                  />
                </div>
              </div>
            )}

            {/* WhatsApp Contact Consent */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreeContact}
                  onChange={(e) => setFormData({ ...formData, agreeContact: e.target.checked })}
                  className="w-4 h-4 rounded text-brand-violet focus:ring-brand-violet border-slate-300 dark:border-slate-700 mt-0.5"
                />
                <span className="text-xs text-slate-600 dark:text-slate-300 leading-normal">
                  I agree to be contacted via WhatsApp and email regarding my website project enquiry.
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Right: Order Review & Reassurance Box */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="font-bold text-brand-navy dark:text-white text-base">Order Review</h2>
            <Link href="/cart" className="text-xs font-bold text-brand-violet dark:text-purple-400 hover:underline">
              Edit Cart
            </Link>
          </div>

          {/* Items breakdown */}
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.serviceId} className="flex justify-between items-start text-xs sm:text-sm">
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{item.name}</span>
                  <span className="text-slate-500 dark:text-slate-400 block text-xs">Qty: {item.quantity}</span>
                </div>
                <span className="font-bold text-brand-navy dark:text-white">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            ))}

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2 text-sm">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 dark:border-slate-800 text-base">
                <span className="font-black text-brand-navy dark:text-white">Total Package Price</span>
                <span className="text-2xl font-black text-brand-navy dark:text-white">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* Transparent Reassurance */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span>No Upfront Card Payment</span>
            </div>
            <p className="leading-relaxed">
              Clicking below stores your order in our database and opens WhatsApp with your pre-formatted enquiry so you can communicate directly with our engineers.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 px-4 bg-brand-violet hover:bg-brand-violet-hover disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white text-base font-bold rounded-xl shadow-subtle hover:shadow-card transition-all flex items-center justify-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet active:scale-98"
          >
            {submitting ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Preparing Order &amp; WhatsApp...</span>
              </>
            ) : (
              <>
                <MessageSquare className="w-5 h-5 text-white" />
                <span>Send Order on WhatsApp</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
