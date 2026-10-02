import { BRAND } from "@/lib/brand";

export const SITE_URL = BRAND.websiteUrl;

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: BRAND.name,
    legalName: BRAND.legalName,
    alternateName: BRAND.alternateNames,
    disambiguatingDescription: BRAND.disambiguatingDescription,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      url: BRAND.logoUrl,
      caption: `${BRAND.name} Official Logo`,
      width: "512",
      height: "512",
    },
    image: BRAND.ogImageUrl,
    description: BRAND.description,
    telephone: BRAND.phone,
    email: BRAND.email,
    priceRange: BRAND.priceRange,
    currenciesAccepted: BRAND.currenciesAccepted,
    paymentAccepted: BRAND.paymentAccepted,
    address: {
      "@type": "PostalAddress",
      addressLocality: BRAND.address.locality,
      addressRegion: BRAND.address.region,
      addressCountry: BRAND.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BRAND.geo.latitude,
      longitude: BRAND.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: BRAND.openingHours.days,
        opens: BRAND.openingHours.opens,
        closes: BRAND.openingHours.closes,
      },
    ],
    sameAs: BRAND.socialProfiles,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${BRAND.name} Web Development Packages`,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Starter Website Package",
            description: "Clean, fast, SEO-friendly 5–10 page business website with 1 year free hosting and WhatsApp integration.",
          },
          price: "3499",
          priceCurrency: "INR",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Royal Website Package",
            description: "High-impact, custom-branded 10–15 page portal with 1 year free domain & hosting, premium animations, and CRM lead capture.",
          },
          price: "5499",
          priceCurrency: "INR",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Ecommerce Starter Package",
            description: "Full-featured online shop with product catalogue, cart, checkout, payment gateway integration, and customer order alerts.",
          },
          price: "9999",
          priceCurrency: "INR",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Ecommerce Premium Package",
            description: "Enterprise e-commerce portal with unlimited products, advanced inventory, coupon engine, analytics dashboard, and priority SLA.",
          },
          price: "14999",
          priceCurrency: "INR",
        },
      ],
    },
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BRAND.name,
    alternateName: ["RyxerMart", "Ryzer Mart", "RyzerMart"],
    description: "Professional Website & E-Commerce Solutions for Growing Indian Businesses",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/services?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getProductServiceSchema(service: {
  name: string;
  shortDescription: string;
  slug: string;
  price: number;
  thumbnail?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.shortDescription,
    image: `${SITE_URL}${service.thumbnail || "/images/logo.png"}`,
    provider: {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#organization`,
      name: BRAND.name,
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/services/${service.slug}`,
      priceCurrency: "INR",
      price: service.price,
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      seller: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function getSiteNavigationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SiteNavigationElement",
        "@id": `${SITE_URL}/#nav-services`,
        name: "Website Packages & Catalog",
        description: "Browse all transparently priced website and e-commerce development packages starting from ₹3,499.",
        url: `${SITE_URL}/services`,
      },
      {
        "@type": "SiteNavigationElement",
        "@id": `${SITE_URL}/#nav-how-it-works`,
        name: "How Ordering Works",
        description: `Learn about ${BRAND.name}'s rapid 3–5 day development, review, and deployment cycle.`,
        url: `${SITE_URL}/#how-it-works`,
      },
      {
        "@type": "SiteNavigationElement",
        "@id": `${SITE_URL}/#nav-faq`,
        name: "Frequently Asked Questions",
        description: "Comprehensive answers regarding free hosting, SSL, domain setup, revisions, and post-launch support.",
        url: `${SITE_URL}/faq`,
      },
      {
        "@type": "SiteNavigationElement",
        "@id": `${SITE_URL}/#nav-about`,
        name: `About ${BRAND.name}`,
        description: "Professional web and e-commerce development agency engineering digital growth for Indian businesses.",
        url: `${SITE_URL}/about`,
      },
      {
        "@type": "SiteNavigationElement",
        "@id": `${SITE_URL}/#nav-contact`,
        name: "Contact & Consultation Desk",
        description: "Get in touch via direct WhatsApp consultation or email for custom project estimates.",
        url: `${SITE_URL}/contact`,
      },
    ],
  };
}
