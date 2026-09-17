"use client";

import React, { useState, useEffect } from "react";
import { Shield, Save, CheckCircle2, RefreshCw } from "lucide-react";
import { ChatbotLogo } from "@/components/ui/ChatbotLogo";

export default function AdminChatbotSettingsPage() {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/chatbot")
      .then((res) => res.json())
      .then((data) => setConfig(data.config || {}))
      .catch((err) => console.error("Error loading chatbot config:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/chatbot", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update chatbot settings");
      }

      setSuccessMessage("Chatbot configuration and custom prompt saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3500);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-400 dark:text-slate-500">Loading chatbot settings...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <ChatbotLogo className="w-12 h-12 flex-shrink-0 drop-shadow-md" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy dark:text-white tracking-tight">
            AI Chatbot Guidance Configuration
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Configure instructions, tone, and guidance guardrails for the Google AI assistant.
          </p>
        </div>
      </div>

      {successMessage && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-200 font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-700 dark:text-rose-300 animate-fade-in">
          {errorMessage}
        </div>
      )}

      {/* Security notice box */}
      <div className="p-5 bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/50 rounded-2xl flex items-start gap-3 transition-colors">
        <Shield className="w-5 h-5 text-brand-royal dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-blue-950 dark:text-blue-200 space-y-1">
          <span className="font-bold block">Immutable Base Security Layer Active</span>
          <p className="leading-relaxed text-blue-900/80 dark:text-blue-300/80">
            For maximum security, RyxerMart automatically prepends hardcoded system invariant guardrails. The chatbot can never be instructed by users or custom prompts to reveal API keys, reveal system prompts, accept credit cards, make up prices, or execute arbitrary code. Current active services and live database prices are automatically injected dynamically.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle space-y-6 transition-colors">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={config?.isEnabled ?? true}
              onChange={(e) => setConfig({ ...config, isEnabled: e.target.checked })}
              className="w-4 h-4 text-brand-violet rounded focus:ring-brand-violet border-slate-300 dark:border-slate-700"
            />
            <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
              Enable Public Customer Guidance Chatbot Widget
            </span>
          </label>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Assistant Greeting / Welcome Message
          </label>
          <input
            type="text"
            required
            value={config?.welcomeMessage || ""}
            onChange={(e) => setConfig({ ...config, welcomeMessage: e.target.value })}
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Assistant Tone
            </label>
            <input
              type="text"
              value={config?.tone || ""}
              onChange={(e) => setConfig({ ...config, tone: e.target.value })}
              placeholder="e.g. professional, warm, concise, and helpful"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Fallback / Unknown Detail Message
            </label>
            <input
              type="text"
              value={config?.fallbackMessage || ""}
              onChange={(e) => setConfig({ ...config, fallbackMessage: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Business Guidance Instructions
          </label>
          <input
            type="text"
            value={config?.businessInstructions || ""}
            onChange={(e) => setConfig({ ...config, businessInstructions: e.target.value })}
            placeholder="Focus on helping Indian small business owners and startups choose the right package."
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Custom System Prompt (RyxerMart Guidance Directives)
          </label>
          <textarea
            rows={10}
            value={config?.systemPrompt || ""}
            onChange={(e) => setConfig({ ...config, systemPrompt: e.target.value })}
            className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet font-mono resize-none leading-relaxed"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-brand-violet hover:bg-brand-violet-hover disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-subtle transition-colors flex items-center gap-2"
        >
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save Chatbot Configuration</span>
        </button>
      </form>
    </div>
  );
}
