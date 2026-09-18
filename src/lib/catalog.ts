import { db } from "@/lib/db";
import { ServiceDTO, GeneralFAQDTO } from "@/types";

export const FALLBACK_SERVICES: ServiceDTO[] = [
  {
    id: "srv-starter",
    slug: "starter-website",
    name: "Starter Website",
    shortDescription: "Clean, fast, SEO-friendly 5–10 page business website with 1 year free hosting and WhatsApp integration.",
    fullDescription: "The Starter Website package is purpose-built for small businesses, local services, trades, and professionals looking to establish a credible, high-converting digital presence without hefty agency markups.\n\nEvery website is engineered for lightning-fast loading speeds on mobile networks across India, complete with SSL encryption, WhatsApp direct enquiry integration, interactive Google Maps, and seamless responsiveness across phones, tablets, laptops, and wide screens.",
    categoryId: "cat-websites",
    price: 3499,
    originalPrice: 6999,
    pricingType: "FIXED",
    featured: false,
    active: true,
    displayOrder: 1,
    thumbnail: "/images/services/starter-web.jpg",
    deliveryTime: "3–5 Business Days",
    revisions: "3 Rounds of Revisions",
    hostingInfo: "1 Year High-Speed SSD Hosting Free Included",
    supportInfo: "30 Days Free Technical & Maintenance Support",
    warrantyPeriod: "30 Days Bug-Free Guarantee",
    tags: "starter, business, landing page, responsive, hosting free",
    seoTitle: "Starter Website Package - ₹3,499 | RyxerMart",
    seoDescription: "Get a professional 5-10 page responsive business website with 1 year free hosting, SSL, and WhatsApp chat setup for ₹3,499.",
    seoKeywords: "website design, small business website, affordable web development, ryxermart, starter website",
    category: {
      id: "cat-websites",
      slug: "websites",
      name: "Website Development",
      description: "Fast, modern, mobile-friendly business websites designed to convert visitors into clients.",
      icon: "Globe",
      displayOrder: 1,
      active: true,
    },
    features: [
      { id: "f1", featureText: "1 Complete Website", isIncluded: true, displayOrder: 1 },
      { id: "f2", featureText: "5–10 Custom Pages", isIncluded: true, displayOrder: 2 },
      { id: "f3", featureText: "1 Year Hosting Free Included", isIncluded: true, displayOrder: 3 },
      { id: "f4", featureText: "SSL Security Certificate Free", isIncluded: true, displayOrder: 4 },
      { id: "f5", featureText: "Google Map & Business Location Integration", isIncluded: true, displayOrder: 5 },
      { id: "f6", featureText: "Full SEO Friendly Architecture & Meta Tags", isIncluded: true, displayOrder: 6 },
      { id: "f7", featureText: "WhatsApp Direct Enquiry Floating Setup", isIncluded: true, displayOrder: 7 },
      { id: "f8", featureText: "Quick Call Button Integration for Mobile Visitors", isIncluded: true, displayOrder: 8 },
      { id: "f9", featureText: "AI / Smart Chat Bot Integration", isIncluded: true, displayOrder: 9 },
      { id: "f10", featureText: "Social Media Profiles Integration", isIncluded: true, displayOrder: 10 },
      { id: "f11", featureText: "Fully Responsive across Mobile, Tablet, Laptop & Desktop", isIncluded: true, displayOrder: 11 },
    ],
  },
  {
    id: "srv-royal",
    slug: "royal-website",
    name: "Royal Website",
    shortDescription: "High-impact, custom-branded 10–15 page portal with 1 year free domain & hosting, premium animations, and CRM lead capture.",
    fullDescription: "Our signature, most popular package. Designed for growing companies, high-ticket services, and premium brands that require an authoritative online identity that commands trust.\n\nIncludes complete visual identity polish, customized interactive motion, blog/news publishing engine, high-converting lead generation funnels, speed optimization scoring 90+ on Google PageSpeed, and direct WhatsApp + Email lead routing.",
    categoryId: "cat-websites",
    price: 5499,
    originalPrice: 10999,
    pricingType: "FIXED",
    featured: true,
    active: true,
    displayOrder: 2,
    thumbnail: "/images/services/royal-web.jpg",
    deliveryTime: "4–6 Business Days",
    revisions: "5 Rounds of Revisions",
    hostingInfo: "1 Year Premium Cloud Hosting + Free .com / .in Domain",
    supportInfo: "60 Days Priority Technical Support",
    warrantyPeriod: "60 Days Extended Warranty",
    tags: "royal, premium, custom domain, animated, speed optimized, high converting",
    seoTitle: "Royal Website Package - ₹5,499 (Free Domain & Hosting) | RyxerMart",
    seoDescription: "High-end corporate website with free .com/.in domain, 1 year cloud hosting, dynamic lead capture, and priority support for ₹5,499.",
    seoKeywords: "corporate website, premium web design, best website package india, domain hosting free, ryxermart",
    category: {
      id: "cat-websites",
      slug: "websites",
      name: "Website Development",
      description: "Fast, modern, mobile-friendly business websites designed to convert visitors into clients.",
      icon: "Globe",
      displayOrder: 1,
      active: true,
    },
    features: [
      { id: "f12", featureText: "1 Premium Brand Website", isIncluded: true, displayOrder: 1 },
      { id: "f13", featureText: "10–15 Custom Tailored Pages", isIncluded: true, displayOrder: 2 },
      { id: "f14", featureText: "Free Domain (.com or .in) for 1 Year Included", isIncluded: true, displayOrder: 3 },
      { id: "f15", featureText: "1 Year Premium Cloud Hosting Included", isIncluded: true, displayOrder: 4 },
      { id: "f16", featureText: "SSL Certificate & Advanced Security Lockdown", isIncluded: true, displayOrder: 5 },
      { id: "f17", featureText: "Custom Motion Graphics & Scroll Reveals", isIncluded: true, displayOrder: 6 },
      { id: "f18", featureText: "Smart Contact & Consultation Lead Forms with Instant Email Delivery", isIncluded: true, displayOrder: 7 },
      { id: "f19", featureText: "Direct WhatsApp Order / Consultation Integration", isIncluded: true, displayOrder: 8 },
      { id: "f20", featureText: "Google Search Console & Analytics Setup", isIncluded: true, displayOrder: 9 },
      { id: "f21", featureText: "AI Chatbot Assistant with Smart Knowledge Base", isIncluded: true, displayOrder: 10 },
      { id: "f22", featureText: "60 Days Priority Technical Maintenance", isIncluded: true, displayOrder: 11 },
    ],
  },
  {
    id: "srv-ecom-starter",
    slug: "ecommerce-starter",
    name: "Ecommerce Starter",
    shortDescription: "Full e-commerce store with product catalog, cart, WhatsApp checkout, and payment gateway integration.",
    fullDescription: "Launch your retail brand online with a scalable, beautifully designed e-commerce storefront. Designed specifically for Indian D2C brands, boutique retailers, and wholesalers.\n\nFeaturing instant WhatsApp order routing (where customers can order in one tap with cart summaries sent to your business WhatsApp), automated order email alerts, mobile-first responsive checkout, and full control over products, orders, and customer messages.",
    categoryId: "cat-ecommerce",
    price: 9999,
    originalPrice: 17999,
    pricingType: "FIXED",
    featured: false,
    active: true,
    displayOrder: 3,
    thumbnail: "/images/services/ecommerce-starter.jpg",
    deliveryTime: "5–8 Business Days",
    revisions: "Unlimited Revisions during build",
    hostingInfo: "1 Year High-Performance E-Commerce Cloud Hosting",
    supportInfo: "90 Days Dedicated Technical & Store Operations Support",
    warrantyPeriod: "90 Days Full System Warranty",
    tags: "ecommerce, online store, shop, product catalog, payment gateway, cart, razorpay",
    seoTitle: "Ecommerce Starter Store Package - ₹9,999 | RyxerMart",
    seoDescription: "Complete online store with product catalog, cart system, WhatsApp order sync, and payment gateway integration for ₹9,999.",
    seoKeywords: "ecommerce store development, online store india, shop website, cart system, ryxermart ecommerce",
    category: {
      id: "cat-ecommerce",
      slug: "ecommerce",
      name: "E-Commerce Development",
      description: "Full-featured online stores, catalog systems, cart flows, and order management platforms.",
      icon: "ShoppingCart",
      displayOrder: 2,
      active: true,
    },
    features: [
      { id: "f23", featureText: "Full E-Commerce Web Storefront", isIncluded: true, displayOrder: 1 },
      { id: "f24", featureText: "Up to 100 Products Catalog Setup", isIncluded: true, displayOrder: 2 },
      { id: "f25", featureText: "Shopping Cart & Slide-Over Drawer Experience", isIncluded: true, displayOrder: 3 },
      { id: "f26", featureText: "WhatsApp 1-Tap Checkout with Order Summary Breakdown", isIncluded: true, displayOrder: 4 },
      { id: "f27", featureText: "UPI / Razorpay / Cash on Delivery (COD) Integration", isIncluded: true, displayOrder: 5 },
      { id: "f28", featureText: "1 Year Fast Cloud Hosting Free Included", isIncluded: true, displayOrder: 6 },
      { id: "f29", featureText: "Free SSL Encryption & Secure Checkout", isIncluded: true, displayOrder: 7 },
      { id: "f30", featureText: "Automated Customer & Admin Order Confirmation Emails", isIncluded: true, displayOrder: 8 },
      { id: "f31", featureText: "Full Admin Management Portal for Products, Categories & Orders", isIncluded: true, displayOrder: 9 },
      { id: "f32", featureText: "Coupon Code & Discount Engine", isIncluded: true, displayOrder: 10 },
      { id: "f33", featureText: "Customer Reviews & Rating System", isIncluded: true, displayOrder: 11 },
    ],
  },
  {
    id: "srv-ecom-premium",
    slug: "ecommerce-premium",
    name: "Ecommerce Premium",
    shortDescription: "Complete enterprise-grade online store with unlimited products, advanced checkout, inventory management, and multi-gateway payments.",
    fullDescription: "The ultimate digital storefront for scaling retail brands and high-volume sellers. Complete custom design, ultra-fast server architecture, multi-currency support, automated invoicing, SMS/WhatsApp order tracking, and comprehensive conversion rate optimization.",
    categoryId: "cat-ecommerce",
    price: 14999,
    originalPrice: 24999,
    pricingType: "STARTING_FROM",
    featured: true,
    active: true,
    displayOrder: 4,
    thumbnail: "/images/services/ecommerce-premium.jpg",
    deliveryTime: "7–10 Business Days",
    revisions: "Unlimited Revisions",
    hostingInfo: "1 Year High-Speed SSD Hosting Free Included",
    supportInfo: "6 Months Priority Support & Warranty",
    warrantyPeriod: "180 Days Enterprise Warranty",
    tags: "ecommerce, online store, shop, product catalog, payment gateway, cart, premium, enterprise, multi-vendor",
    seoTitle: "Ecommerce Premium Package - ₹14,999 | RyxerMart",
    seoDescription: "Enterprise e-commerce store with unlimited products, multi-gateway checkout, CRM sync, and 6 months dedicated support for ₹14,999.",
    seoKeywords: "premium ecommerce website, custom ecommerce store, enterprise shop india, ryxermart ecommerce premium",
    category: {
      id: "cat-ecommerce",
      slug: "ecommerce",
      name: "E-Commerce Development",
      description: "Full-featured online stores, catalog systems, cart flows, and order management platforms.",
      icon: "ShoppingCart",
      displayOrder: 2,
      active: true,
    },
    features: [
      { id: "f34", featureText: "Enterprise E-Commerce Storefront Architecture", isIncluded: true, displayOrder: 1 },
      { id: "f35", featureText: "Unlimited Products & SKU Variants Catalog", isIncluded: true, displayOrder: 2 },
      { id: "f36", featureText: "Multi-Gateway Payments (Razorpay, Stripe, PhonePe, Cashfree, COD)", isIncluded: true, displayOrder: 3 },
      { id: "f37", featureText: "Real-Time WhatsApp & SMS Order Status Tracking", isIncluded: true, displayOrder: 4 },
      { id: "f38", featureText: "Automated GST Tax Invoicing & Downloadable PDF Receipts", isIncluded: true, displayOrder: 5 },
      { id: "f39", featureText: "Inventory & Low-Stock Alert System", isIncluded: true, displayOrder: 6 },
      { id: "f40", featureText: "Advanced Customer Account Portal with Order History", isIncluded: true, displayOrder: 7 },
      { id: "f41", featureText: "AI Product Recommendation & Search Autocomplete", isIncluded: true, displayOrder: 8 },
      { id: "f42", featureText: "Speed Optimization scoring 95+ on Mobile & Desktop", isIncluded: true, displayOrder: 9 },
      { id: "f43", featureText: "6 Months Priority Engineering Support & Maintenance", isIncluded: true, displayOrder: 10 },
    ],
  },
];

export const FALLBACK_FAQS: GeneralFAQDTO[] = [
  {
    id: "faq-1",
    question: "What is included with free hosting in the packages?",
    answer: "Every website package includes 1 full year of ultra-fast SSD cloud hosting with an SSL security certificate pre-installed at no additional charge. There are zero hidden setup fees.",
    category: "Hosting & Technical",
    displayOrder: 1,
    active: true,
  },
  {
    id: "faq-2",
    question: "How does the WhatsApp order process work?",
    answer: "When you browse our packages, select the plan that fits your business, and click 'Order via WhatsApp' or checkout through our cart, an itemized order summary is generated. You connect directly with our engineering team on WhatsApp (+91 7719421910) to share your business details and begin development immediately.",
    category: "Ordering & Payment",
    displayOrder: 2,
    active: true,
  },
  {
    id: "faq-3",
    question: "How fast will my website be delivered?",
    answer: "Standard Starter Websites are delivered within 3 to 5 business days. Royal Websites and E-Commerce stores typically launch within 4 to 8 business days once your content and business assets are provided.",
    category: "Delivery & Process",
    displayOrder: 3,
    active: true,
  },
  {
    id: "faq-4",
    question: "Can I update products and content myself after the website is built?",
    answer: "Yes! All websites and e-commerce stores come with an intuitive administrative portal where you can update text, manage products, view inquiries, and modify settings without touching code.",
    category: "Support & Management",
    displayOrder: 4,
    active: true,
  },
];

export async function getActiveServices(): Promise<ServiceDTO[]> {
  try {
    const services = await db.service.findMany({
      where: { active: true },
      orderBy: { displayOrder: "asc" },
      include: {
        category: true,
        features: {
          where: { isIncluded: true },
          orderBy: { displayOrder: "asc" },
        },
      },
    });

    if (services && services.length > 0) {
      return services as unknown as ServiceDTO[];
    }
  } catch (error) {
    console.error("[Database Notice] Error fetching services from database, serving fallback data:", error);
  }

  return FALLBACK_SERVICES;
}

export async function getServiceBySlug(slug: string): Promise<ServiceDTO | null> {
  try {
    const service = await db.service.findUnique({
      where: { slug },
      include: {
        category: true,
        features: {
          orderBy: { displayOrder: "asc" },
        },
        faqs: {
          orderBy: { displayOrder: "asc" },
        },
        images: {
          orderBy: { displayOrder: "asc" },
        },
      },
    });

    if (service) {
      return service as unknown as ServiceDTO;
    }
  } catch (error) {
    console.error(`[Database Notice] Error fetching service '${slug}' from database, serving fallback:`, error);
  }

  const fallback = FALLBACK_SERVICES.find((s) => s.slug === slug);
  return fallback || null;
}

export async function getGeneralFaqs(): Promise<GeneralFAQDTO[]> {
  try {
    const faqs = await db.generalFAQ.findMany({
      where: { active: true },
      orderBy: { displayOrder: "asc" },
    });

    if (faqs && faqs.length > 0) {
      return faqs as unknown as GeneralFAQDTO[];
    }
  } catch (error) {
    console.error("[Database Notice] Error fetching FAQs from database, serving fallback data:", error);
  }

  return FALLBACK_FAQS;
}

export const FALLBACK_CATEGORIES = [
  { id: "cat-websites", slug: "websites", name: "Website Development", displayOrder: 1, active: true },
  { id: "cat-ecommerce", slug: "ecommerce", name: "E-Commerce Development", displayOrder: 2, active: true },
  { id: "cat-digital", slug: "digital-solutions", name: "Digital & Web Solutions", displayOrder: 3, active: true },
];

export async function getActiveCategories() {
  try {
    const categories = await db.category.findMany({
      where: { active: true },
      orderBy: { displayOrder: "asc" },
    });

    if (categories && categories.length > 0) {
      return categories;
    }
  } catch (error) {
    console.error("[Database Notice] Error fetching categories from database, serving fallback data:", error);
  }

  return FALLBACK_CATEGORIES;
}

