import React from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";

export const metadata = {
  title: "Admin Panel | Ryxer Mart",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
