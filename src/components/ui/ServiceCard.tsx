"use client";

import React, { useState } from "react";
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (addState !== "idle") return;

    setAddState("adding");

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
      }, 1600);
    }, 200);
  };

  const getServiceIcon = () => {
    const slug = service.slug.toLowerCase();
    if (slug.includes("ecommerce") || slug.includes("shop")) {
      return <ShoppingBag className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
    }
    if (slug.includes("royal") || slug.includes("admin")) {
      return <Shield className="w-5 h-5 text-brand-violet dark:text-purple-400" />;
    }
    return <Laptop className="w-5 h-5 text-brand-royal dark:text-blue-400" />;
  };

  const getBestForLabel = () => {
    const slug = service.slug.toLowerCase();
    if (slug.includes("ecommerce")) return "Best for Online Stores & Retailers";
    if (slug.includes("royal")) return "Best for Growing Brands & Companies";
    return "Best for Small Businesses & Trades";
  };

  return (
    <div
      className={`group relative flex flex-col justify-between bg-white dark:bg-slate-900 rounded-2xl border transition-[transform,box-shadow,border-color] duration-200 ease-out-emil card-lift w-full h-full ${
        service.featured
          ? "border-brand-violet/50 ring-2 ring-brand-violet/20 dark:ring-purple-500/20 shadow-card hover:shadow-card-hover z-10"
          : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-subtle hover:shadow-card"
      }`}
    >
      {/* Featured / Most Popular Badge */}
      {service.featured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-violet text-white text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
            <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            <span>Most Popular</span>
          </span>
        </div>
      )}

      <div className="p-6 sm:p-7 flex-1 flex flex-col">
        {/* Category & Turnaround */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
              {getServiceIcon()}
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-brand-violet dark:text-purple-300 block truncate">
                {service.category?.name || "Web Development"}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
                {getBestForLabel()}
              </span>
            </div>
          </div>

          {service.deliveryTime && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex-shrink-0 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-md">
              <Zap className="w-3 h-3 text-amber-500" />
              <span>{service.deliveryTime}</span>
            </span>
          )}
        </div>

        {/* Service Title */}
        <h3 className="text-xl font-bold text-brand-navy dark:text-white tracking-tight mb-2">
          {service.name}
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-5 leading-relaxed">
          {service.shortDescription}
        </p>

        {/* Authoritative Pricing */}
        <div className="py-4 border-y border-slate-100 dark:border-slate-800/80 mb-6 bg-slate-50/60 dark:bg-slate-800/40 -mx-6 sm:-mx-7 px-6 sm:px-7">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-brand-navy dark:text-white tabular-nums">
              ₹{service.price.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              one-time package price
            </span>
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
            ✓ 1 Year Free SSD Cloud Hosting &amp; SSL Included
          </p>
        </div>

        {/* Features Checklist */}
        <div className="space-y-2.5 flex-1 mb-6">
          <p className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
            What&apos;s Included:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {service.features?.slice(0, 6).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span className="leading-snug">{feat.featureText}</span>
              </li>
            ))}
          </ul>
          {service.features && service.features.length > 6 && (
            <p className="text-xs font-semibold text-brand-violet dark:text-purple-400 pt-1">
              + {service.features.length - 6} more included features
            </p>
          )}
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="p-6 sm:p-7 pt-0 mt-auto flex flex-col sm:flex-row items-center gap-2.5">
        <Link
          href={`/services/${service.slug}`}
          className="w-full sm:flex-1 py-3 px-4 text-center text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-brand-navy dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl btn-press flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet group/link"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-150 ease-out-emil" />
        </Link>
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={addState === "adding"}
          className={`w-full sm:flex-1 py-3 px-4 text-center text-xs font-bold text-white rounded-xl btn-press shadow-subtle flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet ${
            addState === "added"
              ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"
              : addState === "adding"
              ? "bg-brand-violet opacity-80 cursor-wait"
              : service.featured
              ? "bg-brand-violet hover:bg-brand-violet-hover"
              : "bg-brand-navy dark:bg-brand-royal hover:bg-brand-royal dark:hover:bg-brand-royal-light"
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
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
