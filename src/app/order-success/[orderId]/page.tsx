import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  FileText,
  Home,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface OrderSuccessProps {
  params: Promise<{ orderId: string }>;
}

export default async function OrderSuccessPage({ params }: OrderSuccessProps) {
  const { orderId } = await params;

  let order = null;
  try {
    order = await db.order.findFirst({
      where: {
        OR: [{ orderNumber: orderId }, { id: orderId }],
      },
      include: {
        customer: true,
        items: true,
      },
    });
  } catch (err) {
    console.error("[Database Notice] Could not fetch order:", err);
  }

  if (!order) {
    notFound();
  }

  const whatsappUrl =
    order.whatsappLinkGenerated ||
    `https://wa.me/917719421910?text=${encodeURIComponent(
      `Hello RyxerMart, I have submitted order #${order.orderNumber}. Please review my enquiry.`
    )}`;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <ScrollReveal animation="fade-up">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-elevated overflow-hidden transition-colors">
          {/* Top Banner */}
          <div className="bg-brand-navy dark:bg-slate-950 p-8 sm:p-10 text-white text-center border-b-4 border-brand-violet space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-400/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-brand-violet-light dark:text-purple-300 block">
                Enquiry Submitted Successfully
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Thank You, {order.customer.fullName}!
              </h1>
              <p className="text-sm text-slate-300 dark:text-slate-400 mt-2 max-w-md mx-auto">
                Your service order has been saved in our database and notification details have been sent to our engineering team.
              </p>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Order ID Box */}
            <div className="bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block">
                  Official Order Reference ID
                </span>
                <span className="text-xl font-mono font-black text-brand-navy dark:text-white">
                  #{order.orderNumber}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block">
                  Total Order Value
                </span>
                <span className="text-xl font-bold text-brand-navy dark:text-white">
                  ₹{order.total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* WhatsApp Primary Callout */}
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 rounded-2xl p-6 text-center space-y-3 transition-colors">
              <div className="flex items-center justify-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Continue Discussion on WhatsApp</span>
              </div>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 max-w-md mx-auto">
                Your order details have been pre-formatted for WhatsApp. If WhatsApp did not open automatically, please click the button below to connect with our team.
              </p>
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-extrabold rounded-xl shadow-card transition-all active:scale-98"
                >
                  <MessageSquare className="w-5 h-5" />
                  Open WhatsApp Chat Now
                </a>
              </div>
            </div>

            {/* Ordered Items Summary */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-violet dark:text-purple-400" />
                <span>Enquired Services</span>
              </h3>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white dark:bg-slate-800/40 flex items-center justify-between text-xs sm:text-sm"
                  >
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{item.serviceName}</span>
                      <span className="text-slate-500 dark:text-slate-400 block text-xs">Quantity: {item.quantity}</span>
                    </div>
                    <span className="font-bold text-brand-navy dark:text-white">
                      ₹{item.subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                What happens next?
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-brand-violet-light dark:bg-slate-800 text-brand-violet dark:text-purple-400 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <span>Our lead web developer will review your project requirements.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-brand-violet-light dark:bg-slate-800 text-brand-violet dark:text-purple-400 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <span>We connect with you on WhatsApp to clarify branding, content, and timeline.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-brand-violet-light dark:bg-slate-800 text-brand-violet dark:text-purple-400 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <span>Once approved, we begin building and provide a live staging demo.</span>
                </li>
              </ul>
            </div>

            {/* Navigation links */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/"
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-brand-navy dark:text-slate-200 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" /> Return to Homepage
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Browse More Services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
