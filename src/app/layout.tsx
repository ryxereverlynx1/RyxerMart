import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ChatbotWidget } from "@/components/chat/ChatbotWidget";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { Inter, Outfit } from "next/font/google";
import { getOrganizationSchema, getWebsiteSchema, getSiteNavigationSchema } from "@/lib/schema";
import { SEO_KEYWORDS } from "@/lib/keywords";
import { BRAND } from "@/lib/brand";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.websiteUrl),
  title: {
    default: "Ryxer Mart — Website & E-Commerce Development Services",
    template: "%s | Ryxer Mart",
  },
  description:
    "Ryxer Mart builds professional websites, e-commerce stores, and custom web solutions for businesses starting at ₹3,499. Includes 1 year free SSD hosting, SSL certificate, and WhatsApp ordering.",
  keywords: SEO_KEYWORDS,
  authors: [{ name: BRAND.legalName, url: BRAND.websiteUrl }],
  creator: BRAND.name,
  publisher: BRAND.name,
  category: "technology",
  classification: "Business, Web Development Agency, E-Commerce Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: BRAND.websiteUrl,
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "googlee8371948291f09c2",
    other: {
      "msvalidate.01": process.env.BING_SITE_VERIFICATION || "",
    },
  },
  openGraph: {
    title: "Ryxer Mart — Professional Website & E-Commerce Development",
    description:
      "Modern, fast, mobile-friendly websites and online stores built for Indian businesses. Starting at ₹3,499 with 1 year free hosting and SSL included.",
    url: BRAND.websiteUrl,
    siteName: BRAND.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: BRAND.ogImageUrl,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: `${BRAND.name} — Professional Website, E-Commerce & Web Solutions Agency`,
      },
      {
        url: BRAND.logoUrl,
        width: 512,
        height: 512,
        type: "image/png",
        alt: `${BRAND.name} Official Logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ryxer Mart — Web Development & E-Commerce Solutions",
    description: "Launch your business online with affordable, high-converting websites starting at ₹3,499.",
    images: [BRAND.ogImageUrl],
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
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
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <meta name="color-scheme" content="light dark" />
        {/* Favicons & SERP App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-48x48.png" type="image/png" sizes="48x48" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />

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
                  if (stored === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#090D1A] text-slate-900 dark:text-slate-100 selection:bg-brand-violet-subtle dark:selection:bg-brand-violet-hover/30 selection:text-brand-navy dark:selection:text-white transition-colors duration-200 overflow-x-hidden w-full antialiased`}>
        <ThemeProvider>
          <ToastProvider>
            <CartProvider>
              <Navbar />
              <main className="flex-1 overflow-x-hidden w-full">{children}</main>
              <Footer />
              <CartDrawer />
              <ChatbotWidget />
              <MobileStickyBar />
            </CartProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
