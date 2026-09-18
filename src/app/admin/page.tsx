"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Package,
  AlertTriangle,
  Mail,
  ArrowRight,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error("Stats fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500 dark:text-slate-400 space-y-2">
        <div className="w-8 h-8 border-2 border-brand-violet border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs font-semibold">Loading dashboard statistics...</p>
      </div>
    );
  }

  const defaultStats = {
    totalOrders: 0,
    newOrders: 0,
    pendingOrders: 0,
    emailFailures: 0,
    totalServices: 4,
    activeServices: 4,
    featuredServices: 2,
    contactRequests: 0,
  };

  const stats = data?.stats || defaultStats;
  const recentOrders = Array.isArray(data?.recentOrders) ? data.recentOrders : [];

  return (
    <div className="space-y-8">
      {/* Top Welcome Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy dark:text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time business enquiries, order pipeline, and catalog metrics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/services/new"
            className="px-4 py-2 bg-brand-violet hover:bg-brand-violet-hover text-white text-xs font-bold rounded-xl transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet"
          >
            + Create Service
          </Link>
          <Link
            href="/admin/orders"
            className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet"
          >
            View All Orders
          </Link>
        </div>
      </div>

      {/* Email Failure Notice Banner if any */}
      {(stats.emailFailures || 0) > 0 && (
        <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-2xl flex items-center justify-between gap-4 transition-colors">
          <div className="flex items-center gap-3 text-amber-800 dark:text-amber-200">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold">
                {stats.emailFailures} enquiry notification {stats.emailFailures === 1 ? "email" : "emails"} failed to dispatch
              </p>
              <p className="text-[11px] text-amber-700 dark:text-amber-300">
                Check SMTP configuration in your environment variables. You can retry delivery from the Orders screen.
              </p>
            </div>
          </div>
          <Link
            href="/admin/orders"
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg whitespace-nowrap"
          >
            Review Orders
          </Link>
        </div>
      )}

      {/* Metrics Cards Grid with hover depth and colored accents */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1: Total Enquiries */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 border-t-4 border-t-brand-royal space-y-2">
          <div className="flex items-center justify-between text-slate-400 dark:text-slate-500">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Total Enquiries</span>
            <ShoppingBag className="w-4 h-4 text-brand-navy dark:text-purple-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-brand-navy dark:text-white">
              {stats.totalOrders || 0}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">orders logged</span>
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            {stats.newOrders || 0} new waiting review
          </p>
        </div>

        {/* Metric 2: Active Pipeline */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 border-t-4 border-t-brand-violet space-y-2">
          <div className="flex items-center justify-between text-slate-400 dark:text-slate-500">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Active Pipeline</span>
            <Clock className="w-4 h-4 text-brand-violet dark:text-purple-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-brand-violet dark:text-purple-400">
              {stats.pendingOrders || 0}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">in discussion</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
            Active enquiries progressing
          </p>
        </div>

        {/* Metric 3: Active Services */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 border-t-4 border-t-emerald-500 space-y-2">
          <div className="flex items-center justify-between text-slate-400 dark:text-slate-500">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Active Services</span>
            <Package className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white">
              {stats.activeServices || 0}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              of {stats.totalServices || 0} total
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
            {stats.featuredServices || 0} marked popular
          </p>
        </div>

        {/* Metric 4: Contact Submissions */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 border-t-4 border-t-blue-500 space-y-2">
          <div className="flex items-center justify-between text-slate-400 dark:text-slate-500">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Contact Requests</span>
            <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white">
              {stats.contactRequests || 0}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">unhandled</span>
          </div>
          <p className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
            From contact forms
          </p>
        </div>
      </div>

      {/* Recent Enquiries / Orders Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle overflow-hidden space-y-4 transition-colors">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-brand-navy dark:text-white">Recent Enquiries & Orders</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Latest client submissions via website cart checkout.
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-brand-violet dark:text-purple-400 hover:underline inline-flex items-center gap-1"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider border-y border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Phone / WhatsApp</th>
                <th className="py-3 px-4">Services</th>
                <th className="py-3 px-4 text-right">Total</th>
                <th className="py-3 px-4 text-center">Email</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-400 dark:text-slate-500">
                    No orders or enquiries recorded yet.
                  </td>
                </tr>
              ) : (
                recentOrders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-navy dark:text-white">
                      {order.orderNumber}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                      {order.customer.fullName}
                      <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-normal">
                        {order.customer.city}, {order.customer.state}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                      {order.customer.phone}
                    </td>
                    <td className="py-3.5 px-4">
                      {order.items.map((i: any) => i.serviceName).join(", ")}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-brand-navy dark:text-white">
                      ₹{order.total.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {order.emailStatus === "SENT" ? (
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" /> Sent
                        </span>
                      ) : order.emailStatus === "FAILED" ? (
                        <span className="inline-flex items-center gap-1 text-[10px] text-rose-700 dark:text-rose-300 font-bold bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-full">
                          <XCircle className="w-3 h-3" /> Failed
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Pending</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="p-1.5 text-slate-400 hover:text-brand-violet dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg inline-flex"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
