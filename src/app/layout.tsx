import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ChatbotWidget } from "@/components/chat/ChatbotWidget";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "RyxerMart | Professional Website, E-Commerce & Digital Web Solutions",
  description:
    "Grow your business online with professional responsive websites, custom e-commerce stores, and digital web solutions starting at ₹3,499. Transparent pricing, free hosting, and direct WhatsApp support.",
  keywords: [
    "website development india",
    "ecommerce website",
    "web design punjab",
    "ryxermart",
    "affordable website",
    "business website",
    "whatsapp ecommerce",
  ],
  authors: [{ name: "RyxerMart Web Solutions" }],
  openGraph: {
    title: "RyxerMart | Professional Website & E-Commerce Development",
    description:
      "Modern, fast, mobile-friendly websites and e-commerce stores built for Indian businesses. Starting at ₹3,499.",
    url: "https://ryxermart.com",
    siteName: "RyxerMart",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 800,
        alt: "RyxerMart Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RyxerMart | Web Development & E-Commerce Solutions",
    description: "Launch your business online with affordable, high-converting websites.",
    images: ["/images/logo.png"],
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
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark light" />
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
