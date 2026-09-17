"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  CheckCircle2,
  XCircle,
  Eye,
  Filter,
} from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchOrders = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (statusFilter !== "ALL") params.set("status", statusFilter);
    if (searchQuery.trim()) params.set("search", searchQuery.trim());

    fetch(`/api/admin/orders?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []))
      .catch((err) => console.error("Error fetching orders:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy dark:text-white tracking-tight">
            Customer Orders & Enquiries
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage customer leads, progress order statuses, and review project requirements.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors">
        <form onSubmit={handleSearch} className="w-full sm:w-80 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID, name, phone..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
          />
        </form>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by order status"
            className="w-full sm:w-auto px-3.5 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet font-semibold"
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">New Enquiries</option>
            <option value="CONTACTED">Contacted</option>
            <option value="IN_DISCUSSION">In Discussion</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Phone / WhatsApp</th>
                <th className="py-3.5 px-4">Packages</th>
                <th className="py-3.5 px-4 text-right">Total</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Admin Email</th>
                <th className="py-3.5 px-4 text-right">Date</th>
                <th className="py-3.5 px-4 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-slate-400 dark:text-slate-500">
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-slate-400 dark:text-slate-500">
                    No orders matching criteria found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-navy dark:text-white">
                      #{order.orderNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800 dark:text-slate-200">{order.customer.fullName}</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500">{order.customer.city}, {order.customer.state}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                      {order.customer.phone}
                    </td>
                    <td className="py-3.5 px-4">
                      {order.items.map((i: any) => i.serviceName).join(", ")}
                    </td>
                    <td className="py-3.5 px-4 text-right font-black text-brand-navy dark:text-white">
                      ₹{order.total.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-brand-navy dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                        {order.status}
                      </span>
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
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">Pending</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="p-1.5 text-slate-400 hover:text-brand-violet dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg inline-flex transition-colors"
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
