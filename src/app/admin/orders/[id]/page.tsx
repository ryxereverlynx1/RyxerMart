"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  Mail,
  RefreshCw,
  Save,
  CheckCircle2,
  FileText,
  User,
} from "lucide-react";

export default function AdminOrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [retryingEmail, setRetryingEmail] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const fetchOrder = () => {
    setLoading(true);
    fetch(`/api/admin/orders/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.order) {
          setOrder(data.order);
          setStatus(data.order.status);
          setInternalNotes(data.order.internalNotes || "");
        }
      })
      .catch((err) => console.error("Error fetching order:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleSaveChanges = async () => {
    setSaving(true);
    setSaveMessage("");
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, internalNotes }),
      });
      if (res.ok) {
        setSaveMessage("Order status and private notes updated.");
        setTimeout(() => setSaveMessage(""), 3000);
        fetchOrder();
      }
    } catch (err) {
      console.error("Error updating order:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleRetryEmail = async () => {
    setRetryingEmail(true);
    try {
      const res = await fetch(`/api/admin/orders/${id}/retry-email`, {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        alert("Email successfully re-sent to admin!");
        fetchOrder();
      } else {
        alert(data.error || "Retry failed");
      }
    } catch (err) {
      console.error("Retry email error:", err);
    } finally {
      setRetryingEmail(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 dark:text-slate-400">
        <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-brand-violet" />
        <p className="text-xs font-semibold">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-12 text-center space-y-4">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Order Not Found</h2>
        <Link href="/admin/orders" className="text-xs font-bold text-brand-violet inline-flex items-center gap-1.5 hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to orders</span>
        </Link>
      </div>
    );
  }

  const cleanPhone = order.customer.phone.replace(/[^0-9]/g, "");
  const whatsappCustomerUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello ${order.customer.fullName}, this is RyxerMart regarding your website enquiry #${order.orderNumber}.`
  )}`;

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-brand-navy dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Orders
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-brand-navy dark:text-white tracking-tight">
              Order #{order.orderNumber}
            </h1>
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-brand-violet-light dark:bg-slate-800 text-brand-violet dark:text-purple-300">
              {order.status}
            </span>
          </div>
        </div>

        {/* Quick Customer Contact Actions */}
        <div className="flex items-center gap-2">
          <a
            href={`tel:${order.customer.phone}`}
            className="p-2.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors"
            title="Call Customer"
          >
            <Phone className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${order.customer.email}`}
            className="p-2.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors"
            title="Email Customer"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href={whatsappCustomerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-subtle"
          >
            <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
          </a>
        </div>
      </div>

      {saveMessage && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-200 font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Grid: Left Customer & Items, Right Status Updater & Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col */}
        <div className="lg:col-span-8 space-y-6">
          {/* Customer Profile Box */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle space-y-4 transition-colors">
            <div className="flex items-center gap-2 text-brand-navy dark:text-white font-bold text-sm border-b border-slate-100 dark:border-slate-800 pb-3">
              <User className="w-4 h-4 text-brand-violet dark:text-purple-400" />
              <span>Customer Information</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 dark:text-slate-500 block font-medium">Full Name</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{order.customer.fullName}</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-slate-500 block font-medium">Phone / WhatsApp</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{order.customer.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-slate-500 block font-medium">Email</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{order.customer.email}</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-slate-500 block font-medium">Location</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                  {order.customer.city}, {order.customer.state}, {order.customer.country}
                </span>
              </div>
              {order.customer.companyName && (
                <div>
                  <span className="text-slate-400 dark:text-slate-500 block font-medium">Company Name</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{order.customer.companyName}</span>
                </div>
              )}
              {order.customer.websiteUrl && (
                <div>
                  <span className="text-slate-400 dark:text-slate-500 block font-medium">Existing Website</span>
                  <a
                    href={order.customer.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-brand-violet dark:text-purple-400 hover:underline truncate block"
                  >
                    {order.customer.websiteUrl}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Enquired Packages */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle space-y-4 transition-colors">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-brand-navy dark:text-white">Purchased / Enquired Services</h2>
              <span className="text-xs text-slate-400 dark:text-slate-500">Authoritative Price Snapshot</span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {order.items.map((item: any) => (
                <div key={item.id} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{item.serviceName}</span>
                    <span className="text-slate-400 dark:text-slate-500 block text-xs">
                      ₹{item.unitPrice.toLocaleString("en-IN")} × {item.quantity}
                    </span>
                  </div>
                  <span className="font-bold text-brand-navy dark:text-white">
                    ₹{item.subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}

              <div className="pt-4 space-y-1.5 text-xs text-right">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">₹{order.subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Discount:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">₹{order.discount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-base font-black text-brand-navy dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span>Total Order:</span>
                  <span>₹{order.total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Requirements & Notes */}
          {order.requirements && (
            <div className="bg-amber-50/70 dark:bg-amber-950/30 p-6 rounded-2xl border border-amber-200/80 dark:border-amber-900/50 space-y-2 transition-colors">
              <h3 className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Customer Stated Requirements</span>
              </h3>
              <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-300 whitespace-pre-line leading-relaxed">
                {order.requirements}
              </p>
            </div>
          )}
        </div>

        {/* Right Col: Admin Controls & Private Notes */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status Updater */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle space-y-4 transition-colors">
            <h2 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Update Order Status
            </h2>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet font-bold text-brand-navy dark:text-white"
            >
              <option value="NEW">NEW</option>
              <option value="CONTACTED">CONTACTED</option>
              <option value="IN_DISCUSSION">IN_DISCUSSION</option>
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="CANCELLED">CANCELLED</option>
              <option value="ARCHIVED">ARCHIVED</option>
            </select>

            {/* Internal Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Private Admin Notes
              </label>
              <textarea
                rows={4}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Add private internal notes here (milestones, budget discussions, client calls). Never exposed to customer."
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet resize-none"
              />
              <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-1">
                * Kept strictly confidential in admin database.
              </span>
            </div>

            <button
              onClick={handleSaveChanges}
              disabled={saving}
              className="w-full py-2.5 bg-brand-navy dark:bg-brand-royal hover:bg-brand-royal dark:hover:bg-brand-royal-light disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>Save Status & Notes</span>
            </button>
          </div>

          {/* Email Notification Status Box */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle space-y-3 transition-colors">
            <h2 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Admin Email Status
            </h2>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Delivery:</span>
              <span
                className={`font-bold px-2 py-0.5 rounded-full ${
                  order.emailStatus === "SENT"
                    ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300"
                    : order.emailStatus === "FAILED"
                    ? "bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}
              >
                {order.emailStatus}
              </span>
            </div>

            {order.emailError && (
              <p className="text-[11px] text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-lg">
                Error: {order.emailError}
              </p>
            )}

            {order.emailStatus === "FAILED" && (
              <button
                onClick={handleRetryEmail}
                disabled={retryingEmail}
                className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                {retryingEmail && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                Retry Sending Email
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
