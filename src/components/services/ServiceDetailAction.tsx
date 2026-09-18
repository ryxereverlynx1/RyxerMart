"use client";

import React, { useState } from "react";
import { ServiceDTO } from "@/types";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { ShoppingCart, MessageSquare, Check, Shield, Clock, Server, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface ServiceDetailActionProps {
  service: ServiceDTO;
}

export function ServiceDetailAction({ service }: ServiceDetailActionProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
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
    setAdded(true);
    toast(`"${service.name}" was added to your cart.`, {
      type: "success",
      title: "Added to Cart",
    });
    setTimeout(() => setAdded(false), 2000);
  };

  const handleEnquireNow = () => {
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
    router.push("/checkout");
  };

  const whatsappDirectUrl = `https://wa.me/917719421910?text=${encodeURIComponent(
    `Hello RyxerMart, I am interested in the ${service.name} (₹${service.price.toLocaleString("en-IN")}) package. Please provide more details.`
  )}`;

  return (
    <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card dark:shadow-dark-card space-y-6 sticky top-28 transition-colors">
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-brand-violet dark:text-purple-300 bg-brand-violet-light dark:bg-slate-800 px-2.5 py-1 rounded-md">
          {service.category?.name || "Web Service"}
        </span>
        <h2 className="text-2xl font-black text-brand-navy dark:text-white tracking-tight mt-2">
          {service.name}
        </h2>
      </div>

      {/* Pricing and Discount */}
      <div className="py-4 border-y border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 -mx-6 sm:-mx-8 px-6 sm:px-8 space-y-1">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl sm:text-4xl font-black text-brand-navy dark:text-white">
            ₹{service.price.toLocaleString("en-IN")}
          </span>
          {service.originalPrice && (
            <span className="text-base text-slate-400 dark:text-slate-500 line-through">
              ₹{service.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
          {service.originalPrice && service.originalPrice > service.price && (
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
              Save ₹{(service.originalPrice - service.price).toLocaleString("en-IN")}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Fixed package price. Zero recurring monthly platform fees.
        </p>
      </div>

      {/* Highlights checklist */}
      <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
        {service.deliveryTime && (
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-brand-violet dark:text-purple-400 flex-shrink-0" />
            <span>Delivery: <strong>{service.deliveryTime}</strong></span>
          </div>
        )}
        {service.hostingInfo && (
          <div className="flex items-center gap-2.5">
            <Server className="w-4 h-4 text-brand-violet dark:text-purple-400 flex-shrink-0" />
            <span>Hosting: <strong>{service.hostingInfo}</strong></span>
          </div>
        )}
        {service.warrantyPeriod && (
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-brand-violet dark:text-purple-400 flex-shrink-0" />
            <span>Warranty: <strong>{service.warrantyPeriod}</strong></span>
          </div>
        )}
      </div>

      {/* Primary Action Buttons */}
      <div className="space-y-3 pt-2">
        <button
          onClick={handleAddToCart}
          className={`w-full py-3.5 px-4 text-sm font-bold text-white rounded-xl shadow-card transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet active:scale-98 ${
            added ? "bg-emerald-600" : "bg-brand-violet hover:bg-brand-violet-hover"
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4 animate-scale-in" /> Added to Cart!
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" /> Add Package to Cart
            </>
          )}
        </button>

        <button
          onClick={handleEnquireNow}
          className="w-full py-3 px-4 text-sm font-bold text-brand-navy dark:text-slate-200 hover:text-white dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-brand-navy dark:hover:bg-brand-royal rounded-xl transition-all border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet active:scale-98 group"
        >
          <span>Order / Review Checkout</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </button>

        <a
          href={whatsappDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-4 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 rounded-xl transition-colors flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          Ask Questions on WhatsApp
        </a>
      </div>
    </div>
  );
}
