import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getServiceBySlug, getActiveServices } from "@/lib/catalog";
import { ServiceDetailAction } from "@/components/services/ServiceDetailAction";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  CheckCircle2,
  Server,
  Shield,
  Clock,
  RotateCcw,
  HelpCircle,
  ArrowLeft,
} from "lucide-react";

import { getProductServiceSchema, getBreadcrumbSchema } from "@/lib/schema";

export const dynamic = "force-dynamic";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service || !service.active) {
    return {
      title: "Service Not Found | RyxerMart",
    };
  }

  const title = service.seoTitle || `${service.name} - ₹${service.price.toLocaleString("en-IN")} | RyxerMart`;
  const description = service.seoDescription || service.shortDescription;
  const canonicalUrl = `https://www.ryxer.site/services/${slug}`;

  return {
    title,
    description,
    keywords: service.seoKeywords ? service.seoKeywords.split(",").map((k) => k.trim()) : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: "RyxerMart",
      images: [
        {
          url: service.thumbnail || "/images/logo.png",
          alt: service.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [service.thumbnail || "/images/logo.png"],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;

  const service = await getServiceBySlug(slug);

  if (!service || !service.active) {
    notFound();
  }

  const productSchema = getProductServiceSchema(service);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: service.name, url: `/services/${service.slug}` },
  ]);

  // Related services in the same category or general
  const allServices = await getActiveServices();
  const relatedServices = allServices.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Breadcrumb / Back button */}
        <ScrollReveal animation="fade-down">
        <div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-brand-navy dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to all services
          </Link>
        </div>
      </ScrollReveal>

      {/* Main Grid: Left Details, Right Sticky Action Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Comprehensive Details */}
        <div className="lg:col-span-8 space-y-10">
          <ScrollReveal animation="fade-up">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-violet dark:text-purple-400">
                {service.category?.name || "Web Development"}
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-brand-navy dark:text-white tracking-tight mt-1">
                {service.name}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                {service.shortDescription}
              </p>
            </div>
          </ScrollReveal>

          {/* Key Specifications Grid */}
          <ScrollReveal animation="fade-up" delay={100}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle text-xs transition-colors">
              <div className="space-y-1">
                <span className="text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-violet dark:text-purple-400" /> Turnaround
                </span>
                <p className="font-bold text-slate-800 dark:text-slate-200">{service.deliveryTime || "3-5 Business Days"}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-brand-violet dark:text-purple-400" /> Included Hosting
                </span>
                <p className="font-bold text-slate-800 dark:text-slate-200">{service.hostingInfo || "SSD Cloud Hosting"}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-brand-violet dark:text-purple-400" /> Revisions
                </span>
                <p className="font-bold text-slate-800 dark:text-slate-200">{service.revisions || "Multiple Revisions"}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-brand-violet dark:text-purple-400" /> Support Guarantee
                </span>
                <p className="font-bold text-slate-800 dark:text-slate-200">{service.supportInfo || "Technical Support"}</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Deliverables & Features Checklist */}
          <ScrollReveal animation="fade-up" delay={200}>
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle space-y-6 transition-colors">
              <h2 className="text-xl font-bold text-brand-navy dark:text-white tracking-tight">
                Complete Package Inclusions
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(service.features || []).map((feat) => (
                  <div key={feat.id} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-snug">
                      {feat.featureText}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Full Description & Overview */}
          <ScrollReveal animation="fade-up" delay={300}>
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle space-y-4 transition-colors">
              <h2 className="text-xl font-bold text-brand-navy dark:text-white tracking-tight">
                Package Overview & Architecture
              </h2>
              <div className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed space-y-4 whitespace-pre-line">
                {service.fullDescription}
              </div>
            </div>
          </ScrollReveal>

          {/* Service FAQs (if any) */}
          {service.faqs && service.faqs.length > 0 && (
            <ScrollReveal animation="fade-up" delay={400}>
              <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle space-y-4 transition-colors">
                <h2 className="text-xl font-bold text-brand-navy dark:text-white tracking-tight">
                  Package Specific FAQs
                </h2>
                <div className="space-y-3">
                  {service.faqs.map((faq) => (
                    <div key={faq.id} className="border-b border-slate-100 dark:border-slate-800 pb-3 last:border-none">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-brand-violet dark:text-purple-400" />
                        <span>{faq.question}</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 pl-6">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>

        {/* Right Column: Sticky Action Box */}
        <div className="lg:col-span-4">
          <ScrollReveal animation="fade-up" delay={150}>
            <ServiceDetailAction service={service as any} />
          </ScrollReveal>
        </div>
      </div>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <div className="pt-12 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <ScrollReveal animation="fade-up">
            <h2 className="text-2xl font-black text-brand-navy dark:text-white tracking-tight">
              You Might Also Be Interested In
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((rel, index) => (
              <ScrollReveal key={rel.id} animation="fade-up" delay={index * 100}>
                <ServiceCard service={rel as any} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      )}
      </div>
    </>
  );
}
