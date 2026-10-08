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
          "violet-light": "#F5F3FF",
          "violet-subtle": "#EDE9FE",
          slate: "#F8FAFC",
          muted: "#64748B",
          dark: "#0B1120",
          border: "#E2E8F0",
          ice: "#F0F4FF",
          lavender: "#FAF8FF",
          surface: "#FFFFFF",
          "surface-muted": "#F8FAFC",
          "royal-glow": "rgba(14, 56, 122, 0.12)",
          "violet-glow": "rgba(108, 60, 233, 0.12)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        card: "0 4px 12px -2px rgba(10, 37, 88, 0.05), 0 2px 4px -1px rgba(10, 37, 88, 0.03)",
        "card-hover": "0 14px 28px -4px rgba(10, 37, 88, 0.09), 0 6px 12px -2px rgba(10, 37, 88, 0.04)",
        elevated: "0 20px 30px -6px rgba(10, 37, 88, 0.10), 0 8px 12px -4px rgba(10, 37, 88, 0.04)",
        "card-glow": "0 8px 25px -4px rgba(108, 60, 233, 0.15)",
        "dark-card": "0 4px 12px -2px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)",
        "dark-hover": "0 14px 28px -4px rgba(0, 0, 0, 0.5), 0 6px 12px -2px rgba(0, 0, 0, 0.3)",
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
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.15)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.92", transform: "scale(1.02)" },
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
        "shake-error": {
          "0%, 100%": { transform: "translateX(0)" },
          "20%, 60%": { transform: "translateX(-4px)" },
          "40%, 80%": { transform: "translateX(4px)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out forwards",
        "fade-up": "fade-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-down": "fade-down 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scale-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pop-in": "pop-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-right": "slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "bounce-subtle": "bounce-subtle 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "pulse-slow": "pulse-slow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
        "shimmer": "shimmer 2.5s infinite linear",
        "shake-error": "shake-error 0.4s ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;
