"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ServiceDTO } from "@/types";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { Check, ArrowRight, ShoppingCart, Star, Laptop, Shield, ShoppingBag, Loader2, Zap } from "lucide-react";

interface ServiceCardProps {
  service: ServiceDTO;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [addState, setAddState] = useState<"idle" | "adding" | "added">("idle");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
    }
  }, []);

  // Pointer spotlight and subtle 3D micro-tilt (max 2 degrees)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--mouse-x", `${x}%`);
    cardRef.current.style.setProperty("--mouse-y", `${y}%`);

    // Calculate subtle tilt: -2 to +2 degrees
    const tiltX = ((y - 50) / 50) * -2;
    const tiltY = ((x - 50) / 50) * 2;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (addState !== "idle") return;

    setAddState("adding");

    // Tactile brief transition to "Adding..."
    setTimeout(() => {
      addItem(
        {
          serviceId: service.id,
          slug: service.slug,
          name: service.name,
          price: service.price,
          originalPrice: service.originalPrice,
          thumbnail: service.thumbnail,
          deliveryTime: service.deliveryTime,
        },
        1,
        false
      );

      setAddState("added");
      toast(`"${service.name}" was added to your cart.`, {
        type: "success",
        title: "Added to Cart",
      });

      setTimeout(() => {
        setAddState("idle");
      }, 1800);
    }, 250);
  };

  // Select appropriate service icon based on slug or name
  const getServiceIcon = () => {
    const slug = service.slug.toLowerCase();
    if (slug.includes("ecommerce") || slug.includes("shop")) {
      return <ShoppingBag className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />;
    }
    if (slug.includes("royal") || slug.includes("admin")) {
      return <Shield className="w-5 h-5 text-brand-violet dark:text-purple-400 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300" />;
    }
    return <Laptop className="w-5 h-5 text-brand-royal dark:text-blue-400 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" />;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered && !isTouchDevice
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-8px) scale(1.01)`
          : undefined,
        willChange: "transform",
      }}
      className={`card-spotlight group relative flex flex-col justify-between bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-300 ${
        service.featured
          ? "border-brand-violet/50 ring-2 ring-brand-violet/20 dark:ring-brand-violet/40 shadow-card dark:shadow-dark-card hover:shadow-card-glow dark:hover:shadow-card-glow hover:border-brand-violet"
          : "border-slate-200 dark:border-slate-800 hover:border-brand-violet/40 dark:hover:border-purple-500/40 shadow-subtle hover:shadow-card-hover dark:hover:shadow-dark-hover"
      }`}
    >
      {/* Featured / Most Popular Badge */}
      {service.featured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
          <span className="popular-badge-shine inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-brand-royal via-brand-violet to-purple-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md">
            <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300 animate-pulse" />
            <span>Most Popular Package</span>
          </span>
        </div>
      )}

      <div className="p-6 sm:p-7 flex-1 flex flex-col relative z-10">
        {/* Category & Header with interactive Icon */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center transition-all duration-300 group-hover:shadow-sm">
              {getServiceIcon()}
            </div>
            <span className="text-[11px] uppercase tracking-wider font-bold text-brand-violet dark:text-purple-300 bg-brand-violet-light/80 dark:bg-slate-800 px-2.5 py-1 rounded-lg transition-colors">
              {service.category?.name || "Web Development"}
            </span>
          </div>

          {service.deliveryTime && (
            <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <Zap className="w-3 h-3 text-amber-500 flex-shrink-0" />
              <span>{service.deliveryTime}</span>
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-brand-navy dark:text-white tracking-tight mt-1 mb-2 group-hover:text-brand-royal dark:group-hover:text-indigo-200 group-hover:translate-x-1.5 transition-all duration-200">
          {service.name}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 mb-6 leading-relaxed flex-shrink-0">
          {service.shortDescription}
        </p>

        {/* Pricing Area with subtle hover elevation */}
        <div className="py-4 border-y border-slate-100 dark:border-slate-800/80 mb-6 bg-slate-50/70 dark:bg-slate-800/40 -mx-6 sm:-mx-7 px-6 sm:px-7 rounded-none transition-all duration-200 group-hover:bg-brand-ice/30 dark:group-hover:bg-slate-800/70">
          <div className="flex items-baseline gap-2.5 transition-transform duration-200 group-hover:-translate-y-1">
            <span className="text-3xl font-black text-brand-navy dark:text-white group-hover:text-brand-royal dark:group-hover:text-white transition-colors">
              ₹{service.price.toLocaleString("en-IN")}
            </span>
            {service.originalPrice && (
              <span className="text-sm text-slate-400 dark:text-slate-500 line-through font-medium">
                ₹{service.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 block font-medium">
            {service.pricingType === "FIXED" ? "One-time package price (No hidden charges)" : service.pricingType}
          </span>
        </div>

        {/* Features Preview List with hover reactions */}
        <div className="space-y-2.5 flex-1 mb-6">
          <p className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
            What&apos;s Included:
          </p>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            {service.features?.slice(0, 6).map((feat, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm group/feat hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/feat:scale-110 group-hover/feat:bg-emerald-200 transition-all">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span className="leading-tight group-hover/feat:translate-x-0.5 transition-transform">
                  {feat.featureText}
                </span>
              </li>
            ))}
            {service.features && service.features.length > 6 && (
              <li className="text-xs font-semibold text-brand-violet dark:text-purple-400 pt-1">
                + {service.features.length - 6} more included features
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Card Actions with multi-stage interactive buttons */}
      <div className="p-6 sm:p-7 pt-0 flex flex-col sm:flex-row items-center gap-2.5 relative z-10">
        <Link
          href={`/services/${service.slug}`}
          className="w-full sm:flex-1 py-3 px-4 text-center text-xs sm:text-sm font-bold text-brand-navy dark:text-slate-200 hover:text-brand-violet dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 rounded-xl transition-all flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet hover:scale-[1.02] active:scale-[0.95]"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
        </Link>
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={addState === "adding"}
          className={`w-full sm:flex-1 py-3 px-4 text-center text-xs sm:text-sm font-bold text-white rounded-xl transition-all duration-200 shadow-subtle flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet hover:scale-[1.02] active:scale-[0.92] btn-shimmer ${
            addState === "added"
              ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"
              : addState === "adding"
              ? "bg-brand-violet opacity-80 cursor-wait"
              : service.featured
              ? "bg-brand-violet hover:bg-brand-violet-hover shadow-brand-violet/25"
              : "bg-brand-navy dark:bg-brand-royal hover:bg-brand-royal dark:hover:bg-brand-royal-light shadow-brand-navy/20"
          }`}
        >
          {addState === "added" ? (
            <span className="inline-flex items-center gap-1.5">
              <span>Added</span>
              <Check className="w-4 h-4 animate-scale-in" />
            </span>
          ) : addState === "adding" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Adding...</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
