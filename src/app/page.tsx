import React from "react";
import Link from "next/link";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ContactForm } from "@/components/home/ContactForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  IoArrowForwardOutline,
  IoLocationOutline,
  IoCallOutline,
  IoMailOutline,
  IoLogoWhatsapp,
  IoSparklesOutline,
} from "react-icons/io5";

import { HeroInteractive } from "@/components/home/HeroInteractive";
import { TrustValueStrip } from "@/components/home/TrustValueStrip";
import { QuickQuoteEstimator } from "@/components/home/QuickQuoteEstimator";
import { FeatureShowcase } from "@/components/home/FeatureShowcase";
import { ProblemSolutionComparison } from "@/components/home/ProblemSolutionComparison";
import { WebsiteShowcase } from "@/components/home/WebsiteShowcase";
import { PricingComparisonTable } from "@/components/home/PricingComparisonTable";
import { InteractiveHowItWorks } from "@/components/home/InteractiveHowItWorks";
import { InteractiveFAQAccordion } from "@/components/ui/InteractiveFAQAccordion";
import { FinalCtaBanner } from "@/components/home/FinalCtaBanner";
import { getActiveServices, getGeneralFaqs } from "@/lib/catalog";
import { getFaqSchema } from "@/lib/schema";
import { BRAND } from "@/lib/brand";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch active services with features and categories with zero-downtime fallback
  const services = await getActiveServices();

  // Fetch active general FAQs with zero-downtime fallback
  const faqs = await getGeneralFaqs();
  const faqSchema = getFaqSchema(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. HERO SECTION */}
      <section className="border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-b from-white via-slate-50/60 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
        <HeroInteractive />
      </section>

      {/* 2. TRUST & VALUE REASSURANCE STRIP */}
      <TrustValueStrip />

      <div className="space-y-24 sm:space-y-32 py-16 sm:py-24">
        {/* 3. INTERACTIVE PROJECT ESTIMATOR & LEAD CAPTURE (WEBZO-INSPIRED) */}
        <section id="estimator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <QuickQuoteEstimator />
          </ScrollReveal>
        </section>

        {/* 4. FEATURE SHOWCASE BENTO GRID (ORIGINAL GRAPHICS & CAPABILITIES) */}
        <ScrollReveal animation="fade-up">
          <FeatureShowcase />
        </ScrollReveal>

        {/* 5. BUSINESS PROBLEM VS SOLUTION (WITHOUT WEBSITE VS WITH RYXER MART) */}
        <ScrollReveal animation="fade-up">
          <ProblemSolutionComparison />
        </ScrollReveal>

        {/* 6. PURCHASABLE SERVICE PACKAGES & RESPONSIVE COMPARISON MATRIX */}
        <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-violet dark:text-purple-400">
                  Fixed Transparent Pricing
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-brand-navy dark:text-white tracking-tight mt-1">
                  Select Your Web Development Package
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                  Transparent, all-inclusive packages backed by database-driven configurations. Add to cart and connect directly with our engineering desk.
                </p>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-violet dark:text-purple-400 hover:underline self-start md:self-auto group"
              >
                <span>View all packages &amp; filters</span>
                <IoArrowForwardOutline className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {services.slice(0, 3).map((service, index) => (
              <ScrollReveal key={service.id} animation="fade-up" delay={index * 100} className="h-full flex flex-col">
                <ServiceCard service={service as any} />
              </ScrollReveal>
            ))}
          </div>

          {/* Interactive Side-by-Side Comparison Table (Dual Responsive Mode) */}
          <PricingComparisonTable />
        </section>

        {/* 7. WEBSITE POSSIBILITIES / OUR WORK */}
        <section id="showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-violet dark:text-purple-400">
                Website Possibilities
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-brand-navy dark:text-white tracking-tight mt-1">
                Explore What We Build For Businesses
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
                Clean, mobile-first websites tailored for real conversion. Preview interactive formats on desktop and mobile screens.
              </p>
            </div>
          </ScrollReveal>

          <WebsiteShowcase />
        </section>

        {/* 8. HOW IT WORKS (TRANSPARENT PROCESS) */}
        <section id="how-it-works" className="bg-slate-50/60 dark:bg-slate-900/50 py-20 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal animation="fade-up">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-violet dark:text-purple-400">
                  Straightforward Workflow
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-brand-navy dark:text-white tracking-tight mt-1">
                  How Ordering &amp; Development Works
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2">
                  Zero complicated paperwork. We keep the entire consultation and build cycle fast, clear, and direct on WhatsApp.
                </p>
              </div>
            </ScrollReveal>

            <InteractiveHowItWorks />
          </div>
        </section>

        {/* 9. FREQUENTLY ASKED QUESTIONS */}
        <section id="faq" className="bg-slate-50/60 dark:bg-slate-900/50 py-20 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal animation="fade-up">
              <div className="text-center mb-12">
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-violet dark:text-purple-400">
                  Clear Answers
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-brand-navy dark:text-white tracking-tight mt-1">
                  Frequently Asked Questions
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2">
                  Transparent answers regarding hosting, deliverables, payments, and development timelines.
                </p>
              </div>
            </ScrollReveal>

            <InteractiveFAQAccordion faqs={faqs} />

            <div className="text-center mt-10">
              <Link
                href="/faq"
                className="text-xs sm:text-sm font-bold text-brand-violet dark:text-purple-400 hover:underline inline-flex items-center gap-1.5 group"
              >
                <span>Browse complete knowledgebase &amp; FAQs</span>
                <IoArrowForwardOutline className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </section>

        {/* 10. FINAL HIGH-CONVERTING CTA BANNER */}
        <ScrollReveal animation="fade-up">
          <FinalCtaBanner />
        </ScrollReveal>

        {/* 11. CONTACT & BESPOKE PROJECT CONSULTATION */}
        <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Contact Information */}
            <ScrollReveal animation="fade-up" className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-violet dark:text-purple-400">
                  Contact &amp; Custom Scope
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-brand-navy dark:text-white tracking-tight mt-1">
                  Have a Custom Project in Mind?
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
                  Whether you need a bespoke corporate web platform, custom software integration, or specific additions to our standard packages, our engineers are ready to assist.
                </p>
              </div>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-subtle">
                  <IoLocationOutline className="w-5 h-5 text-brand-violet dark:text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-brand-navy dark:text-slate-200 uppercase tracking-wider">Office Location</h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      <Link
                        href="/web-development-jalandhar"
                        className="hover:text-brand-violet dark:hover:text-purple-400 transition-colors underline decoration-slate-300 dark:decoration-slate-700"
                      >
                        Jalandhar, Punjab, India (Local Web Hub)
                      </Link>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-subtle">
                  <IoCallOutline className="w-5 h-5 text-brand-violet dark:text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-brand-navy dark:text-slate-200 uppercase tracking-wider">Direct Phone Desk</h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      <a href={`tel:${BRAND.phoneRaw}`} className="hover:text-brand-violet dark:hover:text-purple-400 transition-colors">
                        {BRAND.phone}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-subtle">
                  <IoMailOutline className="w-5 h-5 text-brand-violet dark:text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-brand-navy dark:text-slate-200 uppercase tracking-wider">Business Email</h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      <a href={`mailto:${BRAND.email}`} className="hover:text-brand-violet dark:hover:text-purple-400 transition-colors">
                        {BRAND.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-900/50">
                  <IoLogoWhatsapp className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider">Instant WhatsApp Chat</h3>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">
                      For immediate package guidance and custom quotations, message our engineering lead directly.
                    </p>
                    <a
                      href={BRAND.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:underline group"
                    >
                      <span>Open WhatsApp Chat</span>
                      <IoArrowForwardOutline className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal animation="fade-up" delay={150} className="lg:col-span-6">
              <ContactForm />
            </ScrollReveal>
          </div>
        </section>
      </div>
    </>
  );
}
