import React from "react";

interface ChatbotLogoProps {
  className?: string;
  size?: number;
  "aria-hidden"?: boolean | "true" | "false";
}

export function ChatbotLogo({
  className = "w-6 h-6",
  size,
  "aria-hidden": ariaHidden = true,
}: ChatbotLogoProps) {
  const width = size || 28;
  const height = size || 28;

  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none ${className}`}
      style={size ? { width: `${size}px`, height: `${size}px` } : undefined}
      aria-hidden={ariaHidden}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        width={width}
        height={height}
      >
        <defs>
          <linearGradient id="ryxerBotGradient" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0E387A" />
            <stop offset="50%" stopColor="#6C3CE9" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="ryxerSparkGradient" x1="10" y1="10" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#EDE9FE" />
          </linearGradient>
          <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#6C3CE9" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Outer Rounded Squircle Badge */}
        <rect
          x="2"
          y="2"
          width="28"
          height="28"
          rx="9"
          fill="url(#ryxerBotGradient)"
          filter="url(#subtleGlow)"
        />

        {/* Inner Tech Ring */}
        <rect
          x="3.5"
          y="3.5"
          width="25"
          height="25"
          rx="7.5"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="1"
          strokeDasharray="2 2"
        />

        {/* Digital Pulse Core (Geometric Ryxer Star/Spark) */}
        <path
          d="M16 7L18.2 13.8L25 16L18.2 18.2L16 25L13.8 18.2L7 16L13.8 13.8L16 7Z"
          fill="url(#ryxerSparkGradient)"
        />

        {/* Inner Node Accent */}
        <circle cx="16" cy="16" r="2.2" fill="#0A2558" />
        <circle cx="16.5" cy="15.5" r="0.75" fill="#FFFFFF" opacity="0.9" />

        {/* Micro Signals */}
        <circle cx="23" cy="9" r="1.2" fill="#A78BFA" opacity="0.85" />
        <circle cx="9" cy="23" r="1.2" fill="#A78BFA" opacity="0.85" />
      </svg>
    </div>
  );
}
