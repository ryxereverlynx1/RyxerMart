import React from "react";
import { Metadata } from "next";
import { ServicesFilterView } from "@/components/services/ServicesFilterView";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getActiveServices, getActiveCategories } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Website & E-Commerce Development Packages | RyxerMart",
  description:
    "Explore our complete range of website development, online stores, and digital solutions packages. Transparent pricing from ₹3,499 with 1 year free SSD cloud hosting, free SSL, and WhatsApp checkout.",
  alternates: {
    canonical: "https://www.ryxer.site/services",
  },
  openGraph: {
    title: "Website & E-Commerce Development Packages | RyxerMart",
    description:
      "Choose from Starter, Royal, and E-Commerce website development packages with free hosting and SSL included. Transparent Indian agency pricing.",
    url: "https://www.ryxer.site/services",
    type: "website",
  },
};

export default async function ServicesPage() {
  const services = await getActiveServices();
  const categories = await getActiveCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Page Header */}
      <ScrollReveal animation="fade-down">
        <div className="max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-violet dark:text-purple-400">
            RyxerMart Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy dark:text-white tracking-tight mt-1">
            Website & Digital Solutions Packages
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
            Select from our transparently priced service packages. Every package includes responsive design, free SSL, free hosting options, and full WhatsApp enquiry setup.
          </p>
        </div>
      </ScrollReveal>

      {/* Interactive Search, Filter & List Component */}
      <ServicesFilterView
        initialServices={services as any}
        categories={categories as any}
      />
    </div>
  );
}
