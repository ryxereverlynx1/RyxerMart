"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-14 h-7 rounded-full border border-slate-700 bg-slate-800 opacity-60 ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        onClick={toggleTheme}
        className={`relative inline-flex items-center w-14 h-7 p-0.5 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet focus-visible:ring-offset-2 ${
          isDark
            ? "bg-slate-800 border border-slate-700 shadow-inner"
            : "bg-slate-200/90 border border-slate-300 shadow-inner"
        }`}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <span className="sr-only">{isDark ? "Switch to light mode" : "Switch to dark mode"}</span>

        {/* Ambient static icons in track */}
        <span className="absolute left-1.5 flex items-center justify-center text-amber-500 pointer-events-none transition-opacity duration-200">
          <Sun className="w-3.5 h-3.5" />
        </span>
        <span className="absolute right-1.5 flex items-center justify-center text-indigo-400 pointer-events-none transition-opacity duration-200">
          <Moon className="w-3.5 h-3.5" />
        </span>

        {/* Sliding thumb pill with dynamic icon */}
        <span
          className={`relative z-10 flex items-center justify-center w-6 h-6 rounded-full shadow-md transition-transform duration-300 cubic-bezier(0.34, 1.56, 0.64, 1) ${
            isDark
              ? "translate-x-7 bg-brand-navy text-indigo-300 border border-indigo-500/40"
              : "translate-x-0 bg-white text-amber-500 border border-amber-200/60"
          }`}
        >
          {isDark ? (
            <Moon className="w-3.5 h-3.5 transition-transform duration-300 rotate-0" />
          ) : (
            <Sun className="w-3.5 h-3.5 transition-transform duration-300 rotate-0" />
          )}
        </span>
      </button>

      {showLabel && (
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 select-none">
          {isDark ? "Dark Mode" : "Light Mode"}
        </span>
      )}
    </div>
  );
}
