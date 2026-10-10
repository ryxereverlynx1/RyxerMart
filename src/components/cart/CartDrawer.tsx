"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";

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

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div
          ref={drawerRef}
          className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col focus:outline-none animate-slide-in-right transition-colors"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-violet-light dark:bg-slate-800 text-brand-violet dark:text-purple-400 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-brand-navy dark:text-white leading-tight">
                  Your Selected Packages ({itemCount})
                </h2>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Fixed pricing • WhatsApp checkout
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200/80 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Reassurance Banner */}
          <div className="px-5 py-2.5 bg-emerald-50 dark:bg-emerald-950/30 border-b border-emerald-100 dark:border-emerald-900/40 flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            <ShieldCheck className="w-4 h-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>1-Year SSD Cloud Hosting &amp; SSL included free in packages</span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-slate-400 shadow-subtle">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                    Your cart is empty
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto mt-1">
                    Explore our website packages and select the best fit for your business goals.
                  </p>
                </div>
                <Link
                  href="/#services"
                  onClick={() => setIsDrawerOpen(false)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-navy hover:bg-brand-royal dark:bg-brand-royal text-white text-xs font-bold rounded-xl shadow-subtle transition-all active:scale-95"
                >
                  <span>Explore Packages</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.serviceId}
                  className={`p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 shadow-subtle flex flex-col gap-3 transition-all hover:border-slate-300 ${
                    removingId === item.serviceId ? "cart-item-exiting pointer-events-none" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/services/${item.slug}`}
                        onClick={() => setIsDrawerOpen(false)}
                        className="text-sm font-bold text-brand-navy dark:text-white hover:text-brand-violet dark:hover:text-purple-300 transition-colors line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      {item.deliveryTime && (
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                          Estimated Delivery: {item.deliveryTime}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemove(item.serviceId)}
                      className="text-slate-400 hover:text-rose-500 p-1 rounded-md transition-colors"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800">
                      <button
                        onClick={() => updateQuantity(item.serviceId, item.quantity - 1)}
                        className="p-1 px-2 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-slate-800 dark:text-slate-100 select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.serviceId, item.quantity + 1)}
                        className="p-1 px-2 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-bold text-brand-navy dark:text-white">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout CTA */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-850 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-base font-extrabold text-brand-navy dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span>Total Package Value</span>
                  <span className="text-xl text-brand-navy dark:text-white">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
                  * No online card payment required now. Proceed to send order details on WhatsApp.
                </p>
              </div>

              <div className="space-y-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full py-3.5 px-4 bg-brand-violet hover:bg-brand-violet-hover text-white text-sm font-bold rounded-xl shadow-subtle hover:shadow-card btn-press flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet"
                >
                  <span>Continue to Order Review</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                >
                  Continue Browsing Packages
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
