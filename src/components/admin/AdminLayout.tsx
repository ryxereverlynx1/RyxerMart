"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  HelpCircle,
  MessageSquare,
  Bot,
  Settings,
  ShieldAlert,
  LogOut,
  Menu,
  X,
  User,
  ExternalLink,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<{ name: string; email: string; role: string } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => setAdminUser(data.user))
      .catch(() => {
        // If on login page, ignore
        if (pathname !== "/admin/login") {
          router.push("/admin/login");
        }
      });
  }, [pathname, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error("Logout error", e);
    }
  };

  // If on login page, render children directly without admin sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Orders & Enquiries", href: "/admin/orders", icon: ShoppingBag },
    { name: "Services", href: "/admin/services", icon: Package },
    { name: "Categories", href: "/admin/categories", icon: Layers },
    { name: "FAQs", href: "/admin/faqs", icon: HelpCircle },
    { name: "Contact Messages", href: "/admin/contact-messages", icon: MessageSquare },
    { name: "Chatbot Prompt", href: "/admin/chatbot", icon: Bot },
    { name: "Settings", href: "/admin/settings", icon: Settings },
    { name: "Audit Logs", href: "/admin/audit-logs", icon: ShieldAlert },
  ];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row transition-colors">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 inset-y-0 left-0 z-50 w-64 bg-slate-900 dark:bg-slate-950 text-slate-300 flex flex-col justify-between border-r border-slate-800 transition-transform duration-200 ease-in-out md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 flex flex-col h-full overflow-y-auto">
          {/* Brand Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-6">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-white p-1 relative flex-shrink-0">
                <Image src="/images/logo.png" alt="RyxerMart" fill className="object-contain" />
              </div>
              <div>
                <span className="text-base font-black text-white tracking-tight">
                  RYXER<span className="text-brand-violet">MART</span>
                </span>
                <span className="block text-[10px] uppercase font-bold text-slate-400">
                  Control Center
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 flex-1">
            {menuItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                    isActive
                      ? "bg-brand-violet text-white shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-slate-800 dark:hover:bg-slate-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom user profile and external link */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-semibold text-slate-400">Theme</span>
              <ThemeToggle />
            </div>

            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between text-xs text-slate-400 hover:text-white px-2 py-1 transition-colors"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center justify-between bg-slate-800/80 dark:bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-7 h-7 rounded-full bg-brand-violet/30 text-brand-violet flex items-center justify-center font-bold text-xs flex-shrink-0">
                  <User className="w-3.5 h-3.5 text-brand-violet-light" />
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold text-white truncate">
                    {adminUser?.name || "Admin"}
                  </p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    {adminUser?.role || "ADMIN"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-700/50 rounded-lg transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Bar on Mobile */}
        <header className="md:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1 text-slate-300 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="font-bold text-sm">RyxerMart Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button onClick={handleLogout} className="p-1 text-slate-400 hover:text-rose-400">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Child Pages */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
