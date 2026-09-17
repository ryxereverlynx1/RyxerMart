"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    itemCount,
    isDrawerOpen,
    setIsDrawerOpen,
  } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const [removingId, setRemovingId] = React.useState<string | null>(null);

  const handleRemove = (serviceId: string) => {
    setRemovingId(serviceId);
    setTimeout(() => {
      removeItem(serviceId);
      setRemovingId(null);
    }, 280);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen, setIsDrawerOpen]);

  // Trap scroll when drawer open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          ref={drawerRef}
          className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col focus:outline-none animate-slide-in-right transition-colors"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-800/60">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-brand-violet" />
              <h2 className="text-lg font-bold text-brand-navy dark:text-white">
                Your Service Cart ({itemCount})
              </h2>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-brand-violet dark:text-purple-400 shadow-subtle animate-float-slow">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                  Your cart is empty
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                  Explore our website development packages and add the services you need.
                </p>
                <Link
                  href="/services"
                  onClick={() => setIsDrawerOpen(false)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-violet hover:bg-brand-violet-hover text-white text-sm font-bold rounded-xl shadow-card transition-all hover:scale-105 active:scale-95 btn-shimmer"
                >
                  <span>Browse Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.serviceId}
                  className={`p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 shadow-subtle flex flex-col gap-3 transition-all hover:border-brand-violet/40 hover:shadow-card ${
                    removingId === item.serviceId ? "cart-item-exiting pointer-events-none" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/services/${item.slug}`}
                        onClick={() => setIsDrawerOpen(false)}
                        className="text-base font-bold text-brand-navy dark:text-white hover:text-brand-violet dark:hover:text-brand-violet-hover transition-colors line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      {item.deliveryTime && (
                        <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                          Estimated Delivery: {item.deliveryTime}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemove(item.serviceId)}
                      className="text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 p-1 rounded-md transition-all hover:scale-110 active:scale-75"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700/60">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800">
                      <button
                        onClick={() => updateQuantity(item.serviceId, item.quantity - 1)}
                        className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all hover:scale-105 active:scale-75"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-slate-800 dark:text-slate-100 transition-transform select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.serviceId, item.quantity + 1)}
                        className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all hover:scale-105 active:scale-75"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-bold text-brand-navy dark:text-white">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 block">
                          ₹{item.price.toLocaleString("en-IN")} each
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout CTA */}
          {items.length > 0 && (
            <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-base font-extrabold text-brand-navy dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span>Total (Estimated)</span>
                  <span className="text-xl text-brand-navy dark:text-white">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                  * Final pricing verified server-side. No online payment required now.
                </p>
              </div>

              <div className="space-y-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-brand-royal via-brand-violet to-brand-royal bg-[length:200%_auto] hover:bg-[position:right_center] text-white text-sm font-extrabold rounded-xl shadow-card hover:shadow-card-glow transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet active:scale-98 btn-shimmer"
                >
                  <span>Proceed to Order Review</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full py-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                >
                  Continue Browsing Services
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
