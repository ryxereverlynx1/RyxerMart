export const SITE_URL = "https://www.ryxer.site";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: "RyxerMart",
    legalName: "RyxerMart Web Solutions",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    image: `${SITE_URL}/images/logo.png`,
    description:
      "Leading website design, e-commerce development, and digital web solutions agency in India. High-performing, SEO-optimized business websites starting at ₹3,499 with 1 year free high-speed hosting and SSL certificate.",
    telephone: "+91 7719421910",
    email: "ryxereverlynx@gmail.com",
    priceRange: "₹3,499 - ₹14,999",
    currenciesAccepted: "INR",
    paymentAccepted: "UPI, Bank Transfer, Net Banking, Credit Card, Debit Card",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jalandhar",
      addressRegion: "Punjab",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 31.3260,
      longitude: 75.5762,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "128",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      "https://instagram.com/ryxermart",
      "https://facebook.com/ryxermart",
      "https://github.com/ryxereverlynx1/RyxerMart",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "RyxerMart Web Development Packages",
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
    name: "RyxerMart",
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
    "@type": "Product",
    name: service.name,
    description: service.shortDescription,
    image: `${SITE_URL}${service.thumbnail || "/images/logo.png"}`,
    brand: {
      "@type": "Brand",
      name: "RyxerMart",
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "48",
      bestRating: "5",
      worstRating: "1",
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
