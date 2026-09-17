import React from "react";
import Image from "next/image";

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
  const style = size ? { width: `${size}px`, height: `${size}px` } : undefined;

  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none ${className}`}
      style={style}
      aria-hidden={ariaHidden}
    >
      <Image
        src="/images/chatbot-logo.png"
        alt="RyxerMart AI Chatbot Assistant"
        fill
        sizes="(max-width: 768px) 48px, 64px"
        className="object-contain drop-shadow-sm"
        priority
      />
    </div>
  );
}
