import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ContactForm } from "@/components/home/ContactForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  ArrowRight,
  MessageSquare,
  Sparkles,
  Smartphone,
  ShieldCheck,
  Search,
  SlidersHorizontal,
  Layers,
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
} from "lucide-react";

import { HeroInteractive } from "@/components/home/HeroInteractive";
import { InteractiveHowItWorks } from "@/components/home/InteractiveHowItWorks";
import { InteractiveWhyCards } from "@/components/home/InteractiveWhyCards";
import { InteractiveFAQAccordion } from "@/components/ui/InteractiveFAQAccordion";
import { getActiveServices, getGeneralFaqs } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch active services with features and categories with zero-downtime fallback
  const services = await getActiveServices();

  // Fetch active general FAQs with zero-downtime fallback
  const faqs = await getGeneralFaqs();

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="border-b border-brand-border dark:border-slate-800 bg-gradient-to-b from-white via-brand-ice/40 to-slate-50 dark:from-slate-950 dark:via-brand-dark dark:to-slate-950">
        <HeroInteractive />
      </section>

      {/* 2. SERVICES SECTION */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-violet dark:text-purple-400">
                Purchasable Packages
              </span>
              <h2 className="text-3xl font-black text-brand-navy dark:text-white tracking-tight mt-1">
                Select Your Web Development Package
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 max-w-xl">
                Transparent, all-inclusive packages backed by database-driven configurations. Add to cart and connect directly with our engineering desk.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-violet dark:text-purple-400 hover:underline self-start md:self-auto group"
            >
              <span>View all services & filters</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {services.map((service, index) => (
            <ScrollReveal key={service.id} animation="fade-up" delay={index * 120}>
              <ServiceCard service={service as any} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section id="how-it-works" className="bg-white dark:bg-slate-900 py-16 border-y border-brand-border dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-violet dark:text-purple-400">
                Simple & Transparent
              </span>
              <h2 className="text-3xl font-black text-brand-navy dark:text-white tracking-tight mt-1">
                How Ordering Works
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
                Zero complicated paperwork. We keep the entire consultation and build cycle fast, clear, and direct.
              </p>
            </div>
          </ScrollReveal>

          <InteractiveHowItWorks />
        </div>
      </section>

      {/* 4. WHY RYXERMART */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-violet dark:text-purple-400">
              Engineered for Real Businesses
            </span>
            <h2 className="text-3xl font-black text-brand-navy dark:text-white tracking-tight mt-1">
              Why Businesses Choose RyxerMart
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
              We focus on tangible business outcomes: fast performance, clear customer communication, and clean maintainable code.
            </p>
          </div>
        </ScrollReveal>

        <InteractiveWhyCards />
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS */}
      <section className="bg-slate-100/60 dark:bg-slate-950/60 py-16 border-y border-brand-border dark:border-slate-800 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-12">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-violet dark:text-purple-400">
                Got Questions?
              </span>
              <h2 className="text-3xl font-black text-brand-navy dark:text-white tracking-tight mt-1">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
                Clear answers to the most common questions about ordering, hosting, and deliverables.
              </p>
            </div>
          </ScrollReveal>

          <InteractiveFAQAccordion faqs={faqs} />

          <div className="text-center mt-8">
            <Link
              href="/faq"
              className="text-xs font-bold text-brand-violet dark:text-purple-400 hover:underline inline-flex items-center gap-1.5 group"
            >
              <span>Browse complete FAQ knowledgebase</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <ScrollReveal animation="fade-up">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-violet dark:text-purple-400">
                  Contact &amp; Support
                </span>
                <h2 className="text-3xl font-black text-brand-navy dark:text-white tracking-tight mt-1">
                  Have a Custom Project in Mind?
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 leading-relaxed">
                  Whether you need a bespoke corporate web platform, custom web software, or adjustments to our pre-configured packages, our web engineers are ready to assist.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-subtle transition-colors">
                  <MapPin className="w-5 h-5 text-brand-violet dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-brand-navy dark:text-slate-200 uppercase tracking-wider">Office Location</h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300">Jalandhar, Punjab, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-subtle transition-colors">
                  <Phone className="w-5 h-5 text-brand-violet dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-brand-navy dark:text-slate-200 uppercase tracking-wider">Phone Consultation</h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-subtle transition-colors">
                  <Mail className="w-5 h-5 text-brand-violet dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-brand-navy dark:text-slate-200 uppercase tracking-wider">Business Inquiries</h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      <a href="mailto:ryxereverlynx@gmail.com" className="hover:text-brand-violet dark:hover:text-purple-400 transition-colors">
                        ryxereverlynx@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-900/50 transition-colors">
                  <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider">Instant WhatsApp Chat</h4>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">
                      For immediate questions regarding packages and quotations, message our support lead.
                    </p>
                    <a
                      href="https://wa.me/919876543210?text=Hello%20RyxerMart%2C%20I%20have%20a%20question%20about%20your%20services."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:underline group"
                    >
                      <span>Open WhatsApp Chat</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal animation="fade-up" delay={200}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
