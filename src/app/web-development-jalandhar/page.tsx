import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Phone,
  MessageSquare,
  Shield,
  Zap,
  Globe,
  CheckCircle2,
  Building,
  Briefcase,
  GraduationCap,
  ShoppingBag,
  Stethoscope,
  Factory,
  ArrowRight,
  Star,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { InteractiveFAQAccordion } from "@/components/ui/InteractiveFAQAccordion";
import { getActiveServices } from "@/lib/catalog";
import {
  getLocalBusinessSchema,
  getBreadcrumbSchema,
  getFaqSchema,
} from "@/lib/schema";
import { BRAND } from "@/lib/brand";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Website Development in Jalandhar, Punjab — Ryxer Mart",
  description:
    "Top-rated website development company in Jalandhar, Punjab. Ryxer Mart (also searched as Ryzer Mart) builds fast, responsive business websites, e-commerce stores & portals from ₹3,499 with 1 year free SSD hosting, SSL & WhatsApp setup.",
  alternates: {
    canonical: "https://ryxer.site/web-development-jalandhar",
  },
  openGraph: {
    title: "Website Development in Jalandhar, Punjab | Ryxer Mart",
    description:
      "Looking for a website designer in Jalandhar? Ryxer Mart builds modern, responsive business websites and WhatsApp stores starting at ₹3,499 with free hosting & SSL.",
    url: "https://ryxer.site/web-development-jalandhar",
    siteName: "Ryxer Mart",
    type: "website",
  },
};

const JALANDHAR_FAQS = [
  {
    id: "j-faq-1",
    question: "Where is Ryxer Mart located in Jalandhar, Punjab?",
    answer:
      "Ryxer Mart is headquartered in Jalandhar, Punjab, India (PIN 144001). We serve businesses throughout Model Town, Civil Lines, Defence Colony, BMC Chowk, Leather Complex, Industrial Area, and surrounding Punjab cities including Ludhiana, Amritsar, and Chandigarh with direct WhatsApp and telephonic project consultations.",
    category: "Location & Service",
    displayOrder: 1,
    active: true,
  },
  {
    id: "j-faq-2",
    question: "Is Ryxer Mart the same company as Ryzer Mart?",
    answer:
      "Yes! Because 'Ryxer' and 'Ryzer' share identical phonetic pronunciation, many clients and searchers type 'Ryzer Mart' or 'RyzerMart'. Ryxer Mart Web Solutions (ryxer.site) is the official registered brand and digital studio based in Jalandhar, Punjab.",
    category: "Brand & Identity",
    displayOrder: 2,
    active: true,
  },
  {
    id: "j-faq-3",
    question: "How much does website development cost in Jalandhar?",
    answer:
      "Our website packages start at an all-inclusive fixed price of ₹3,499 for a 5–10 page Starter Website, ₹5,499 for a Royal Multi-Page Portal with dedicated Admin Panel (our most popular solution), and ₹9,999 for complete E-Commerce Stores with WhatsApp ordering and payment gateways. Every package includes 1 year free SSD cloud hosting and SSL security certificate.",
    category: "Pricing & Inclusions",
    displayOrder: 3,
    active: true,
  },
  {
    id: "j-faq-4",
    question: "How quickly can my Jalandhar business website go live?",
    answer:
      "Starter Websites are completed and deployed live in 3 to 5 business days. Royal Websites and E-Commerce platforms are typically ready within 4 to 7 business days once your business content, logo, and photos are provided over WhatsApp.",
    category: "Delivery Timeline",
    displayOrder: 4,
    active: true,
  },
  {
    id: "j-faq-5",
    question: "Will my website appear on Google Maps and local search for Jalandhar?",
    answer:
      "Yes. Every Ryxer Mart website is engineered with semantic HTML, local geo-tags (IN-PB, Jalandhar), interactive Google Maps embed, and Schema.org LocalBusiness structured data so local customers searching 'near me' in Jalandhar and Punjab can find you immediately.",
    category: "Local SEO & Visibility",
    displayOrder: 5,
    active: true,
  },
  {
    id: "j-faq-6",
    question: "Can I pay using UPI, GPay, PhonePe, or local bank transfer?",
    answer:
      "Absolutely. We support transparent Indian payment methods including UPI (Google Pay, PhonePe, Paytm), IMPS/NEFT Indian bank transfers, and major cards. No upfront card payment is taken online; our team confirms deliverables with you directly on WhatsApp first.",
    category: "Payment Options",
    displayOrder: 6,
    active: true,
  },
];

const LOCAL_INDUSTRIES = [
  {
    icon: Factory,
    title: "Sports Goods & Leather Manufacturing",
    areas: "Leather Complex, Sports Market, Basti Nau",
    description: "B2B export catalog websites showcasing sports equipment, leather jackets, hand tools, and industrial goods for national and global buyers.",
  },
  {
    icon: Stethoscope,
    title: "Hospitals, Clinics & Doctors",
    areas: "Civil Lines, Model Town, Mahavir Marg",
    description: "Fast, reassuring clinic websites with doctor profiles, appointment booking request forms, Google Maps navigation, and patient reviews.",
  },
  {
    icon: GraduationCap,
    title: "Immigration, Visa & IELTS Institutes",
    areas: "BMC Chowk, Defence Colony, GT Road",
    description: "High-converting student enrollment websites with course modules, band score calculators, student testimonials, and 1-tap WhatsApp consultation desks.",
  },
  {
    icon: ShoppingBag,
    title: "Retail Boutiques, Jewelers & Fashion",
    areas: "Model Town Market, Rainak Bazaar, Jyoti Chowk",
    description: "Stunning visual catalog stores with WhatsApp cart ordering, high-resolution product galleries, and social media feed integrations.",
  },
  {
    icon: Building,
    title: "Real Estate Builders & Architects",
    areas: "Urban Estate, Jalandhar Cantt, Surya Enclave",
    description: "Property showcase websites featuring project floor plans, virtual walkthrough links, location maps, and buyer enquiry funnels.",
  },
  {
    icon: Briefcase,
    title: "CA Firms, Lawyers & Consultants",
    areas: "Ladowali Road, Court Complex, Nakodar Road",
    description: "Authoritative professional practice websites establishing trust, regulatory compliance notices, client consultation booking, and clear service matrices.",
  },
];

export default async function JalandharWebDevelopmentPage() {
  const services = await getActiveServices();
  const localSchema = getLocalBusinessSchema();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "Web Development Jalandhar", url: "/web-development-jalandhar" },
  ]);
  const faqSchema = getFaqSchema(JALANDHAR_FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="space-y-20 sm:space-y-28 py-10 sm:py-16">
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <ScrollReveal animation="fade-down">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-violet/10 dark:bg-purple-950/40 border border-brand-violet/30 dark:border-purple-800 text-xs font-extrabold uppercase tracking-widest text-brand-violet dark:text-purple-300">
                <MapPin className="w-3.5 h-3.5" />
                <span>Official Jalandhar, Punjab Web Development Studio</span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100}>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-brand-navy dark:text-white tracking-tight leading-[1.15]">
                Professional Website Development in{" "}
                <span className="bg-gradient-to-r from-brand-royal to-brand-violet bg-clip-text text-transparent">
                  Jalandhar, Punjab
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                <strong>Ryxer Mart</strong> (also frequently searched as <em>Ryzer Mart</em>) is Jalandhar&apos;s trusted digital engineering agency. We build ultra-fast, mobile-first business websites and WhatsApp e-commerce stores starting at just ₹3,499 with <strong>1 year free SSD cloud hosting</strong> and <strong>SSL certificate</strong> included.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={300}>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href="#packages"
                  className="px-7 py-3.5 bg-brand-navy dark:bg-brand-royal hover:bg-brand-royal dark:hover:bg-brand-navy text-white text-sm font-bold rounded-xl shadow-md transition-all active:scale-98 flex items-center gap-2"
                >
                  <span>Explore Jalandhar Packages</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/917719421910?text=Hello%20Ryxer%20Mart%20Jalandhar%2C%20I%20am%20looking%20for%20a%20website%20for%20my%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-md transition-all active:scale-98 flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Talk on WhatsApp (+91 77194-21910)</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Quick Local Signal Badges */}
            <ScrollReveal animation="fade-up" delay={400}>
              <div className="pt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Jalandhar Local Desk
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 1-Year Free SSD Cloud Hosting
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 3–5 Days Turnaround
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Local Business Schema &amp; Maps Ready
                </span>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* LOCAL VALUE PROPOSITION */}
        <section className="bg-white dark:bg-slate-900 py-16 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal animation="fade-up">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-violet dark:text-purple-400">
                  Local Advantage
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-brand-navy dark:text-white tracking-tight mt-1">
                  Why Punjab Businesses Choose Ryxer Mart
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
                  No remote agency excuses, no surprise invoices. Work directly with developers who understand the local Punjabi business landscape.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollReveal animation="fade-up" delay={100}>
                <div className="p-7 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-violet/10 dark:bg-purple-950/50 text-brand-violet dark:text-purple-300 flex items-center justify-center font-bold">
                    01
                  </div>
                  <h3 className="text-lg font-bold text-brand-navy dark:text-white">Direct WhatsApp Ordering</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Local business runs on WhatsApp. Every website we build includes floating 1-tap WhatsApp consultation and automated customer enquiry routing.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={200}>
                <div className="p-7 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    02
                  </div>
                  <h3 className="text-lg font-bold text-brand-navy dark:text-white">Google Maps &amp; Local SEO</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    We embed interactive Google Maps, Schema.org LocalBusiness markup, and Jalandhar geo-signals so you rank at the top of local Google Map Pack searches.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={300}>
                <div className="p-7 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-brand-royal dark:text-blue-400 flex items-center justify-center font-bold">
                    03
                  </div>
                  <h3 className="text-lg font-bold text-brand-navy dark:text-white">Transparent INR Pricing</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Packages start from ₹3,499 with 1 year free SSD cloud hosting and SSL certificate included. Transparent payments via UPI, GPay, or bank transfer.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* LOCAL INDUSTRIES SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-violet dark:text-purple-400">
                Industry Expertise
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-brand-navy dark:text-white tracking-tight mt-1">
                Custom Web Solutions for Key Jalandhar Sectors
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
                We craft specialized website architectures tailored to how Jalandhar businesses and clients interact online.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LOCAL_INDUSTRIES.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <ScrollReveal key={ind.title} animation="fade-up" delay={i * 75}>
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle space-y-3 h-full flex flex-col justify-between transition-colors">
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-violet-light dark:bg-slate-800 text-brand-violet dark:text-purple-300 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-brand-navy dark:text-white">{ind.title}</h3>
                      <p className="text-xs font-semibold text-brand-violet dark:text-purple-400">{ind.areas}</p>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {ind.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* PACKAGES FOR JALANDHAR CLIENTS */}
        <section id="packages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-violet dark:text-purple-400">
                Transparent Pricing
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-brand-navy dark:text-white tracking-tight mt-1">
                All-Inclusive Web Development Packages
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
                Choose your package below. Add to cart or message our engineering desk on WhatsApp directly.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {services.slice(0, 3).map((service, index) => (
              <ScrollReveal key={service.id} animation="fade-up" delay={index * 100} className="h-full flex flex-col">
                <ServiceCard service={service as any} />
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/services"
              className="text-xs sm:text-sm font-bold text-brand-violet dark:text-purple-400 hover:underline inline-flex items-center gap-1.5 group"
            >
              <span>Explore all enterprise packages &amp; add-ons</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </section>

        {/* JALANDHAR & PUNJAB FAQS */}
        <section className="bg-slate-50/70 dark:bg-slate-900/50 py-16 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal animation="fade-up">
              <div className="text-center mb-12">
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-violet dark:text-purple-400">
                  Local Questions Answered
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-brand-navy dark:text-white tracking-tight mt-1">
                  Jalandhar Web Design FAQs
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                  Clear, honest details for businesses in Jalandhar, Ludhiana, Amritsar, and Punjab.
                </p>
              </div>
            </ScrollReveal>

            <InteractiveFAQAccordion faqs={JALANDHAR_FAQS} defaultOpenIndex={0} />
          </div>
        </section>

        {/* LOCAL CONTACT / MAP CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-brand-navy to-brand-royal text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl space-y-5 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-emerald-300 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for Immediate Consultation in Jalandhar</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Ready to Launch Your Business Website in Jalandhar?
              </h2>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                Connect directly with our lead web engineer on WhatsApp. Share your business goals, get a free consultation, and have your website live in days.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="https://wa.me/917719421910?text=Hello%20Ryxer%20Mart%20Jalandhar%2C%20I%20would%20like%20to%20discuss%20my%20website%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-xl transition-all shadow-md active:scale-98 flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> Message on WhatsApp (+91 77194-21910)
                </a>
                <a
                  href="tel:+917719421910"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-xl transition-all border border-white/20 active:scale-98 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" /> Call Direct Desk
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
