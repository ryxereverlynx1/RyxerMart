"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: "fade-up" | "fade-in" | "fade-down" | "scale-up";
  delay?: number; // In milliseconds
  duration?: number; // In milliseconds
  className?: string;
  threshold?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 500,
  className = "",
  threshold = 0.1,
  once = true,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setPrefersReducedMotion(true);
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  // Base transformations
  let initialTransform = "translateY(24px)";
  if (animation === "fade-in") initialTransform = "translateY(0)";
  if (animation === "fade-down") initialTransform = "translateY(-24px)";
  if (animation === "scale-up") initialTransform = "scale(0.95)";

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "none" : initialTransform,
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: isVisible ? "auto" : "opacity, transform",
  };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}
