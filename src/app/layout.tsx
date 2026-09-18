import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ChatbotWidget } from "@/components/chat/ChatbotWidget";
import { getOrganizationSchema, getWebsiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ryxer.site"),
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
  ],
  authors: [{ name: "RyxerMart Web Solutions", url: "https://www.ryxer.site" }],
  creator: "RyxerMart",
  publisher: "RyxerMart",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://www.ryxer.site",
  },
  openGraph: {
    title: "RyxerMart | Professional Website & E-Commerce Development",
    description:
      "Modern, fast, mobile-friendly websites and online stores built for Indian businesses. Starting at ₹3,499 with 1 year free hosting and SSL included.",
    url: "https://www.ryxer.site",
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

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark light" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#090D1A] text-slate-900 dark:text-slate-100 selection:bg-brand-violet-subtle dark:selection:bg-brand-violet-hover/30 selection:text-brand-navy dark:selection:text-white transition-colors duration-200">
        <ThemeProvider>
          <ToastProvider>
            <CartProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
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
