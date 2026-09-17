"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastOptions {
  type?: ToastType;
  title?: string;
  duration?: number;
}

interface ToastContextType {
  toast: (message: string, options?: ToastOptions) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, options?: ToastOptions) => {
      const id = "toast-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7);
      const duration = options?.duration ?? 3500;
      const newToast: ToastItem = {
        id,
        message,
        type: options?.type ?? "info",
        title: options?.title,
        duration,
      };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          dismissToast(id);
        }, duration);
      }
    },
    [dismissToast]
  );

  return (
    <ToastContext.Provider value={{ toast, dismissToast }}>
      {children}
      {/* Toast Render Area */}
      <div
        aria-live="polite"
        className="fixed top-20 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-elevated transition-all duration-300 animate-fade-down ${
              t.type === "success"
                ? "bg-white dark:bg-slate-900 border-emerald-200 dark:border-emerald-800 text-slate-900 dark:text-slate-100"
                : t.type === "error"
                ? "bg-white dark:bg-slate-900 border-rose-200 dark:border-rose-800 text-slate-900 dark:text-slate-100"
                : t.type === "warning"
                ? "bg-white dark:bg-slate-900 border-amber-200 dark:border-amber-800 text-slate-900 dark:text-slate-100"
                : "bg-white dark:bg-slate-900 border-brand-border dark:border-slate-800 text-slate-900 dark:text-slate-100"
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {t.type === "success" && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              )}
              {t.type === "error" && (
                <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              )}
              {t.type === "warning" && (
                <AlertTriangle className="w-5 h-5 text-amber-500" />
              )}
              {t.type === "info" && (
                <Info className="w-5 h-5 text-brand-violet dark:text-brand-violet-hover" />
              )}
            </div>
            <div className="flex-1 text-sm">
              {t.title && <div className="font-bold text-slate-900 dark:text-white mb-0.5">{t.title}</div>}
              <div className="text-slate-700 dark:text-slate-300 leading-snug">{t.message}</div>
            </div>
            <button
              onClick={() => dismissToast(t.id)}
              className="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
