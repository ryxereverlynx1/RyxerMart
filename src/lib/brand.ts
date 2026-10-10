// Centralized Brand Configuration & Single Source of Truth for Ryxer Mart
// Target: Consistent brand identity, entity signals, structured data, and alternate search queries.

export const BRAND = {
  name: "Ryxer Mart",
  legalName: "Ryxer Mart Web Solutions",
  compactName: "RyxerMart",
  alternateNames: [
    "RyxerMart",
    "Ryzer Mart",
    "RyzerMart",
    "Rixer Mart",
    "RixerMart",
    "Ryser Mart",
    "Rysermart",
    "Ryxar Mart",
  ] as string[],
  tagline: "Professional Website, E-Commerce & Web Solutions Agency",
  description:
    "Ryxer Mart builds modern, ultra-fast, mobile-first business websites and e-commerce stores starting at ₹3,499. Includes 1 year free high-speed SSD cloud hosting, free SSL security certificate, WhatsApp direct checkout, and 3–5 day delivery.",
  disambiguatingDescription:
    "Ryxer Mart (frequently searched as RyxerMart, Ryzer Mart, or RixerMart) is an Indian web development and e-commerce agency offering complete website packages with free hosting and SSL starting at ₹3,499.",
  websiteUrl: "https://ryxer.site",
  logoUrl: "https://ryxer.site/images/logo.png",
  ogImageUrl: "https://ryxer.site/images/og-image.png",
  phone: "+91 77194-21910",
  phoneRaw: "917719421910",
  whatsappUrl: "https://wa.me/917719421910?text=Hello%20Ryxer%20Mart%2C%20I%20would%20like%20to%20discuss%20a%20website%20project.",
  email: "ryxereverlynx@gmail.com",
  address: {
    streetAddress: "Model Town / Civil Lines",
    locality: "Jalandhar",
    region: "Punjab",
    postalCode: "144001",
    country: "IN",
    countryName: "India",
  },
  geo: {
    latitude: 31.3260,
    longitude: 75.5762,
  },
  priceRange: "₹3,499 - ₹14,999",
  currenciesAccepted: "INR",
  paymentAccepted: "UPI, Bank Transfer, Net Banking, Credit Card, Debit Card",
  socialProfiles: [
    "https://instagram.com/ryxermart",
    "https://facebook.com/ryxermart",
    "https://github.com/ryxereverlynx1/RyxerMart",
  ] as string[],
  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "20:00",
  },
} as const;

export type BrandConfig = typeof BRAND;
