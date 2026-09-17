import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "Terms and Conditions | RyxerMart",
  description: "Terms of service and service development conditions for RyxerMart customers.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
      <ScrollReveal animation="fade-in" duration={400}>
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
          <h1 className="text-3xl font-black text-brand-navy dark:text-white tracking-tight">Terms and Conditions</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Last Updated: September 2026</p>
        </div>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" delay={100} duration={400}>
        <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-xl text-xs text-amber-800 dark:text-amber-300">
          <strong>Business Notice:</strong> These terms govern service delivery, package inclusions, client cooperation, and intellectual property. Please review with legal counsel for specific jurisdictional compliance.
        </div>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" delay={200} duration={500}>
        <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-700 dark:text-slate-300 space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-brand-navy dark:text-white">1. Scope of Services</h2>
            <p>
              RyxerMart provides website development, custom e-commerce stores, and digital web solutions as outlined in our active service packages. Detailed deliverables, revisions, and timelines for each package are specified on their respective service detail pages.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-brand-navy dark:text-white">2. Order & Enquiry Process</h2>
            <p>
              Submission of an order through this website constitutes a formal service enquiry. Our team coordinates with the client via WhatsApp and email to confirm exact requirements and milestones before development commences.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-brand-navy dark:text-white">3. Client Cooperation & Content</h2>
            <p>
              Timely delivery of your website depends on prompt submission of required assets, including company logo, images, text copy, contact details, and product catalogs. Delays in providing necessary materials may adjust estimated delivery timelines accordingly.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-brand-navy dark:text-white">4. Hosting & Domain Terms</h2>
            <p>
              Packages that include free hosting provide cloud SSD server access for the stated duration (e.g. 1 year or 6 months). After the initial promotional hosting term, renewal fees apply at standard market rates, or clients may migrate to their own independent hosting provider.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-brand-navy dark:text-white">5. Intellectual Property</h2>
            <p>
              Upon full settlement of agreed project fees, the client retains full ownership of their bespoke website design, uploaded content, and custom code assets.
            </p>
          </section>
        </div>
      </ScrollReveal>
    </div>
  );
}
