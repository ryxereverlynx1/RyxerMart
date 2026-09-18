import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "Refund & Cancellation Policy | RyxerMart",
  description: "RyxerMart policies on service cancellations, milestone approvals, and revisions.",
  alternates: {
    canonical: "https://www.ryxer.site/refund-policy",
  },
};

export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
      <ScrollReveal animation="fade-in" duration={400}>
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
          <h1 className="text-3xl font-black text-brand-navy dark:text-white tracking-tight">Refund & Cancellation Policy</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Last Updated: September 2026</p>
        </div>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" delay={100} duration={400}>
        <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-xl text-xs text-amber-800 dark:text-amber-300">
          <strong>Business Notice:</strong> This policy defines conditions for project cancellations, design revisions, and milestone guarantees. Please review to match your operational contracts.
        </div>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" delay={200} duration={500}>
        <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-700 dark:text-slate-300 space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-brand-navy dark:text-white">1. Custom Service Delivery</h2>
            <p>
              Because website development and custom programming involve dedicated engineering hours and intellectual creation customized for each client, full refunds cannot be issued once development work has commenced.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-brand-navy dark:text-white">2. Cancellation Prior to Work Commencement</h2>
            <p>
              If you submit an enquiry or place an order and decide not to proceed prior to project kickoff, no charges or penalty fees will apply.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-brand-navy dark:text-white">3. Revision & Satisfaction Guarantee</h2>
            <p>
              We stand behind our work. Each package includes dedicated revision cycles (e.g. 3 rounds of design revisions for Starter, or unlimited revisions during the design phase for Royal and Ecommerce packages) to ensure your website meets agreed expectations before deployment.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-brand-navy dark:text-white">4. 30-Day Bug Warranty</h2>
            <p>
              All deployed websites include a 30 to 90-day technical warranty against functional defects or coding errors. Any discovered bugs will be repaired at no additional cost.
            </p>
          </section>
        </div>
      </ScrollReveal>
    </div>
  );
}
