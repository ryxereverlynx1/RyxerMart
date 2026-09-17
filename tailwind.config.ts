import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0A2558",
          "navy-dark": "#061536",
          royal: "#0E387A",
          "royal-light": "#1E4DB7",
          violet: "#6C3CE9",
          "violet-hover": "#5825D5",
          "violet-light": "#F3EEFE",
          "violet-subtle": "#EDE9FE",
          slate: "#F8FAFC",
          muted: "#64748B",
          dark: "#0F172A",
          border: "#E2E8F0",
          ice: "#F0F4FF",
          lavender: "#F5F3FF",
          "royal-glow": "rgba(14, 56, 122, 0.15)",
          "violet-glow": "rgba(108, 60, 233, 0.15)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
        card: "0 4px 6px -1px rgba(10, 37, 88, 0.05), 0 2px 4px -2px rgba(10, 37, 88, 0.05)",
        "card-hover": "0 12px 24px -4px rgba(10, 37, 88, 0.08), 0 4px 6px -2px rgba(10, 37, 88, 0.03)",
        elevated: "0 20px 25px -5px rgba(10, 37, 88, 0.1), 0 8px 10px -6px rgba(10, 37, 88, 0.05)",
        "card-glow": "0 8px 30px rgba(108, 60, 233, 0.12)",
        "card-glow-blue": "0 8px 30px rgba(14, 56, 122, 0.12)",
        "dark-card": "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2)",
        "dark-hover": "0 12px 24px -4px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-down": {
          "0%": { opacity: "0", transform: "translateY(-16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "70%": { transform: "scale(1.03)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "float-reverse": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        "float-slow-delayed": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "blob-drift": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(20px, -20px) scale(1.05)" },
          "66%": { transform: "translate(-15px, 15px) scale(0.95)" },
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
        "gradient-shift": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        "shake-error": {
          "0%, 100%": { transform: "translateX(0)" },
          "20%, 60%": { transform: "translateX(-4px)" },
          "40%, 80%": { transform: "translateX(4px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.95)", opacity: "0.8" },
          "50%": { transform: "scale(1.08)", opacity: "0.4" },
          "100%": { transform: "scale(0.95)", opacity: "0.8" },
        },
        "mask-reveal": {
          "0%": { transform: "translateY(110%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out forwards",
        "fade-up": "fade-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-down": "fade-down 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scale-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pop-in": "pop-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "slide-in-right": "slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "bounce-subtle": "bounce-subtle 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "pulse-slow": "pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-ring": "pulse-ring 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float-slow 5s ease-in-out infinite",
        "float-reverse": "float-reverse 6s ease-in-out infinite",
        "float-slow-delayed": "float-slow-delayed 5.5s ease-in-out 1s infinite",
        "blob-drift": "blob-drift 14s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite linear",
        "gradient-shift": "gradient-shift 4s ease infinite",
        "shake-error": "shake-error 0.4s ease-in-out",
        "mask-reveal": "mask-reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
