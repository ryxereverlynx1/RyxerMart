"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export function ContactForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit contact enquiry");
      }

      setStatus("success");
      toast("Your enquiry has been received! Our team will contact you shortly.", {
        type: "success",
        title: "Enquiry Submitted",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try WhatsApp.";
      setErrorMessage(msg);
      toast(msg, { type: "error", title: "Submission Failed" });
    }
  };

  if (status === "success") {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-8 text-center space-y-3 animate-fade-in">
        <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
        <h4 className="text-lg font-bold text-emerald-900 dark:text-emerald-100">Message Received!</h4>
        <p className="text-sm text-emerald-700 dark:text-emerald-300 max-w-sm mx-auto">
          Thank you for reaching out. Our development team has received your enquiry and will respond via phone or WhatsApp shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card dark:shadow-dark-card transition-colors"
    >
      <h3 className="text-xl font-bold text-brand-navy dark:text-white tracking-tight mb-2">
        Send Us an Enquiry
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Fill out this form and our web development specialists will get in touch within 24 hours.
      </p>

      {status === "error" && (
        <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2 animate-shake-error">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
          Your Name <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Gurpreet Singh"
          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet transition-all duration-200"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet transition-all duration-200"
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
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet transition-all duration-200"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
          Project Details / Message <span className="text-rose-500">*</span>
        </label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us about your business, the type of website or e-commerce solution you need, and any questions you have."
          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet resize-none transition-all duration-200"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3.5 px-4 bg-gradient-to-r from-brand-navy via-brand-royal to-brand-navy dark:from-brand-royal dark:via-brand-violet dark:to-brand-royal hover:shadow-card-glow text-white text-sm font-bold rounded-xl shadow-card transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet active:scale-98 btn-shimmer"
      >
        {status === "loading" ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Sending Enquiry...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            <span>Submit Enquiry</span>
          </>
        )}
      </button>
    </form>
  );
}
