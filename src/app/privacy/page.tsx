import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "Privacy Policy | RyxerMart",
  description: "Privacy policy describing how RyxerMart collects, uses, and protects customer inquiry information.",
  alternates: {
    canonical: "https://ryxer.site/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
      <ScrollReveal animation="fade-in" duration={400}>
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
          <h1 className="text-3xl font-black text-brand-navy dark:text-white tracking-tight">Privacy Policy</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Last Updated: September 2026</p>
        </div>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" delay={100} duration={400}>
        <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-xl text-xs text-amber-800 dark:text-amber-300">
          <strong>Business Notice:</strong> This privacy policy covers how RyxerMart handles visitor contact details and service orders. Please review and tailor any specific legal provisions as required for your jurisdiction.
        </div>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" delay={200} duration={500}>
        <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-700 dark:text-slate-300 space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-brand-navy dark:text-white">1. Information We Collect</h2>
            <p>
              When you submit an enquiry or order through RyxerMart, we collect personal information you explicitly provide, including your name, telephone/WhatsApp number, email address, city, state, country, and any project notes or specifications you supply.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-brand-navy dark:text-white">2. How We Use Your Information</h2>
            <p>We use your information exclusively to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Process, confirm, and coordinate your website or e-commerce development order.</li>
              <li>Communicate with you via WhatsApp, email, or telephone regarding your project requirements.</li>
              <li>Provide ongoing customer and maintenance support.</li>
              <li>Maintain internal business records and order history.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-brand-navy dark:text-white">3. Third-Party Sharing</h2>
            <p>
              RyxerMart does not sell, rent, or trade your personal data to third-party marketers. Information is only shared with service infrastructure providers (such as hosting and transactional email servers) strictly necessary to deliver your web services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-brand-navy dark:text-white">4. Data Security</h2>
            <p>
              We implement industry-standard technical safeguards to protect your personal information against unauthorized access, alteration, or disclosure.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-brand-navy dark:text-white">5. Contact Us</h2>
            <p>
              If you have questions regarding this Privacy Policy or wish to update or delete your contact records, please reach us at:
              <strong className="text-slate-900 dark:text-white">Email:</strong>{" "}
              <a href="mailto:ryxereverlynx@gmail.com" className="hover:text-brand-violet dark:hover:text-purple-400">
                ryxereverlynx@gmail.com
              </a>
              <br />
              <strong className="text-slate-900 dark:text-white">Location:</strong> Jalandhar, Punjab, India
            </p>
          </section>
        </div>
      </ScrollReveal>
    </div>
  );
}
