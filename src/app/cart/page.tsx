"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400 dark:text-slate-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-brand-navy dark:text-white tracking-tight">
          Your Service Cart is Empty
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-md mx-auto">
          You have not added any website or e-commerce packages yet. Explore our packages and start building your online business.
        </p>
        <div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-navy dark:bg-brand-royal hover:bg-brand-royal dark:hover:bg-brand-royal-light text-white text-sm font-bold rounded-xl shadow-subtle transition-all active:scale-98"
          >
            Explore Service Packages <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <ScrollReveal animation="fade-down">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-violet dark:text-purple-400">
              Enquiry Cart
            </span>
            <h1 className="text-3xl font-black text-brand-navy dark:text-white tracking-tight mt-1">
              Review Your Cart ({itemCount})
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
          >
            Clear All
          </button>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items list */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item, index) => (
            <ScrollReveal key={item.serviceId} animation="fade-up" delay={index * 80}>
              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
                <div className="space-y-1 flex-1">
                  <Link
                    href={`/services/${item.slug}`}
                    className="text-lg font-bold text-brand-navy dark:text-white hover:text-brand-violet dark:hover:text-purple-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                  {item.deliveryTime && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Estimated Delivery: {item.deliveryTime}
                    </p>
                  )}
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block sm:hidden pt-1">
                    ₹{item.price.toLocaleString("en-IN")} each
                  </span>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                  {/* Quantity */}
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800">
                    <button
                      onClick={() => updateQuantity(item.serviceId, item.quantity - 1)}
                      className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-slate-800 dark:text-slate-200">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.serviceId, item.quantity + 1)}
                      className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right min-w-[100px]">
                    <span className="text-lg font-bold text-brand-navy dark:text-white">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <button
                    onClick={() => removeItem(item.serviceId)}
                    className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}

          <div className="pt-2">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-bold text-brand-navy dark:text-slate-200 hover:text-brand-violet dark:hover:text-purple-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Add more packages or services
            </Link>
          </div>
        </div>

        {/* Order Summary & Checkout Action */}
        <div className="lg:col-span-4">
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card dark:shadow-dark-card space-y-6 transition-colors">
              <h2 className="text-lg font-bold text-brand-navy dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Estimated Discount</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">₹0</span>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-baseline">
                  <span className="font-bold text-brand-navy dark:text-white">Total Value</span>
                  <span className="text-2xl font-black text-brand-navy dark:text-white">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                No upfront payment is required on this website. Next, you will provide your details and send your project requirements directly to our team via WhatsApp.
              </p>

              <Link
                href="/checkout"
                className="w-full py-3.5 px-4 bg-brand-violet hover:bg-brand-violet-hover text-white text-sm font-extrabold rounded-xl shadow-card transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet active:scale-98"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
