import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ChatbotWidget } from "@/components/chat/ChatbotWidget";
import { getOrganizationSchema, getWebsiteSchema, getSiteNavigationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  metadataBase: new URL("https://ryxer.site"),
  title: {
    default: "RyxerMart | Professional Website, E-Commerce & Web Solutions Agency",
    template: "%s | RyxerMart",
  },
  description:
    "RyxerMart builds modern, ultra-fast, mobile-first business websites and e-commerce stores starting at ₹3,499. Includes 1 year free high-speed SSD cloud hosting, free SSL security certificate, WhatsApp direct checkout, and 3–5 day delivery.",
  keywords: [
    "website development india",
    "ecommerce website development",
    "web design company punjab",
    "custom business website",
    "affordable website package",
    "whatsapp ecommerce store",
    "starter website package",
    "royal website package",
    "nextjs website design",
    "seo friendly web development",
    "ryxermart",
    "ryxer site",
    "fast loading business website",
    "best web design agency",
    "website designer jalandhar",
    "website developer punjab",
    "online store maker india",
  ],
  authors: [{ name: "RyxerMart Web Solutions", url: "https://ryxer.site" }],
  creator: "RyxerMart",
  publisher: "RyxerMart",
  category: "technology",
  classification: "Business, Web Development Agency, E-Commerce Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://ryxer.site",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "googlee8371948291f09c2",
    other: {
      "msvalidate.01": process.env.BING_SITE_VERIFICATION || "",
    },
  },
  openGraph: {
    title: "RyxerMart | Professional Website & E-Commerce Development",
    description:
      "Modern, fast, mobile-friendly websites and online stores built for Indian businesses. Starting at ₹3,499 with 1 year free hosting and SSL included.",
    url: "https://ryxer.site",
    siteName: "RyxerMart",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 800,
        alt: "RyxerMart Web Solutions Agency Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RyxerMart | Web Development & E-Commerce Solutions",
    description: "Launch your business online with affordable, high-converting websites starting at ₹3,499.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = getOrganizationSchema();
  const websiteSchema = getWebsiteSchema();
  const siteNavSchema = getSiteNavigationSchema();

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark light" />
        {/* Geo-targeting for Indian Local & National Search */}
        <meta name="geo.region" content="IN-PB" />
        <meta name="geo.placename" content="Jalandhar, Punjab" />
        <meta name="geo.position" content="31.3260;75.5762" />
        <meta name="ICBM" content="31.3260, 75.5762" />
        {/* Global Distribution & Crawl Frequency */}
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="2 days" />
        <meta name="target" content="all" />

        {/* Structured Data Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavSchema) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('ryxermart_theme');
                  if (stored === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#090D1A] text-slate-900 dark:text-slate-100 selection:bg-brand-violet-subtle dark:selection:bg-brand-violet-hover/30 selection:text-brand-navy dark:selection:text-white transition-colors duration-200 overflow-x-hidden w-full">
        <ThemeProvider>
          <ToastProvider>
            <CartProvider>
              <Navbar />
              <main className="flex-1 overflow-x-hidden w-full">{children}</main>
              <Footer />
              <CartDrawer />
              <ChatbotWidget />
            </CartProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
