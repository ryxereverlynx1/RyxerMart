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
        slate: {
          750: "#243247",
          850: "#131C2E",
        },
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
        display: ["var(--font-outfit)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px 0 rgba(0, 0, 0, 0.04)",
        card: "0 4px 16px -2px rgba(10, 37, 88, 0.08), 0 2px 6px -1px rgba(10, 37, 88, 0.04), 0 0 0 1px rgba(10, 37, 88, 0.05)",
        "card-hover": "0 18px 36px -4px rgba(10, 37, 88, 0.15), 0 8px 16px -2px rgba(10, 37, 88, 0.08), 0 0 0 1px rgba(108, 60, 233, 0.25)",
        elevated: "0 24px 44px -8px rgba(10, 37, 88, 0.16), 0 10px 18px -4px rgba(10, 37, 88, 0.08), 0 0 0 1px rgba(10, 37, 88, 0.06)",
        "card-glow": "0 8px 32px -4px rgba(108, 60, 233, 0.25), 0 0 0 1px rgba(108, 60, 233, 0.3)",
        "dark-card": "0 8px 24px -4px rgba(0, 0, 0, 0.6), 0 2px 8px -1px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08)",
        "dark-hover": "0 20px 40px -4px rgba(0, 0, 0, 0.8), 0 8px 20px -2px rgba(108, 60, 233, 0.3), 0 0 0 1px rgba(108, 60, 233, 0.4)",
        "3d-stage": "0 20px 50px -10px rgba(10, 37, 88, 0.22), 0 40px 80px -20px rgba(10, 37, 88, 0.28), 0 0 0 1px rgba(10, 37, 88, 0.08)",
        "3d-stage-dark": "0 24px 60px -10px rgba(0, 0, 0, 0.85), 0 40px 90px -20px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(255, 255, 255, 0.12), 0 0 60px -15px rgba(108, 60, 233, 0.3)",
        "3d-floating": "0 10px 25px -4px rgba(10, 37, 88, 0.16), 0 20px 40px -8px rgba(10, 37, 88, 0.20), 0 2px 6px rgba(10, 37, 88, 0.06), 0 0 0 1px rgba(255, 255, 255, 0.9)",
        "3d-floating-dark": "0 12px 30px -4px rgba(0, 0, 0, 0.8), 0 24px 50px -8px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.15), 0 0 35px -8px rgba(108, 60, 233, 0.35)",
        "3d-phone": "0 20px 45px -10px rgba(10, 37, 88, 0.20), 0 35px 70px -15px rgba(10, 37, 88, 0.25), 0 0 0 1px rgba(10, 37, 88, 0.08)",
        "3d-phone-dark": "0 30px 70px -15px rgba(0, 0, 0, 0.95), 0 50px 100px -25px rgba(0, 0, 0, 1), 0 0 0 1px rgba(255, 255, 255, 0.18), 0 0 40px -10px rgba(108, 60, 233, 0.4)",
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
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "ambient-drift": {
          "0%": { transform: "translate(0px, 0px) scale(1)", opacity: "0.12" },
          "50%": { transform: "translate(20px, -15px) scale(1.08)", opacity: "0.22" },
          "100%": { transform: "translate(-15px, 15px) scale(0.96)", opacity: "0.14" },
        },
        "shake-error": {
          "0%, 100%": { transform: "translateX(0)" },
          "20%, 60%": { transform: "translateX(-4px)" },
          "40%, 80%": { transform: "translateX(4px)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      transitionTimingFunction: {
        "out-emil": "cubic-bezier(0.23, 1, 0.32, 1)",
        "in-out-emil": "cubic-bezier(0.77, 0, 0.175, 1)",
        drawer: "cubic-bezier(0.32, 0.72, 0, 1)",
        spring: "cubic-bezier(0.175, 0.885, 0.32, 1.15)",
      },
      animation: {
        "fade-in": "fade-in 0.24s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "fade-up": "fade-up 0.32s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "fade-down": "fade-down 0.24s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "scale-in": "scale-in 0.2s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "pop-in": "pop-in 0.24s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "slide-in-right": "slide-in-right 0.28s cubic-bezier(0.32, 0.72, 0, 1) forwards",
        "slide-down": "slide-down 0.22s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "bounce-subtle": "bounce-subtle 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "pulse-slow": "pulse-slow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
        "float-gentle": "float-gentle 4s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "ambient-drift": "ambient-drift 10s ease-in-out infinite alternate",
        "shimmer": "shimmer 2.5s infinite linear",
        "shake-error": "shake-error 0.4s ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;
