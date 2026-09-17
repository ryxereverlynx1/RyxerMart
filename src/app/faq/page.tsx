import React from "react";
import { db } from "@/lib/db";
import { HelpCircle, MessageSquare } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { InteractiveFAQAccordion } from "@/components/ui/InteractiveFAQAccordion";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Frequently Asked Questions | RyxerMart",
  description:
    "Everything you need to know about RyxerMart website packages, hosting, domains, WhatsApp ordering, and delivery timelines.",
};

export default async function FAQPage() {
  const faqs = await db.generalFAQ.findMany({
    where: { active: true },
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      <ScrollReveal animation="fade-down">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-violet dark:text-purple-400">
            Help & Guidance
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy dark:text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Got questions about our website development or e-commerce packages? Browse answers below or message us directly on WhatsApp.
          </p>
        </div>
      </ScrollReveal>

      <div className="space-y-4">
        <ScrollReveal animation="fade-up" delay={100}>
          <InteractiveFAQAccordion faqs={faqs} defaultOpenIndex={0} />
        </ScrollReveal>
      </div>

      <ScrollReveal animation="fade-up">
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center space-y-4 transition-colors">
          <h3 className="text-lg font-bold text-brand-navy dark:text-white">Still have a question?</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
            Our customer support desk is available on WhatsApp to answer any specific questions about your business requirements.
          </p>
          <a
            href="https://wa.me/919876543210?text=Hello%20RyxerMart%2C%20I%20have%20a%20question%20not%20covered%20in%20the%20FAQ."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-98"
          >
            <MessageSquare className="w-4 h-4" /> Ask Us on WhatsApp
          </a>
        </div>
      </ScrollReveal>
    </div>
  );
}
