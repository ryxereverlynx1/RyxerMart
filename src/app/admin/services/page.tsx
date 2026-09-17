"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Star, Check, X, Eye } from "lucide-react";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  const fetchServices = () => {
    setLoading(true);
    fetch("/api/admin/services")
      .then((res) => res.json())
      .then((data) => setServices(data.services || []))
      .catch((err) => console.error("Error fetching services:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleToggleActive = async (service: any) => {
    try {
      await fetch(`/api/admin/services/${service.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !service.active }),
      });
      fetchServices();
    } catch (err) {
      console.error("Error toggling active:", err);
    }
  };

  const handleToggleFeatured = async (service: any) => {
    try {
      await fetch(`/api/admin/services/${service.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !service.featured }),
      });
      fetchServices();
    } catch (err) {
      console.error("Error toggling featured:", err);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      const res = await fetch(`/api/admin/services/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchServices();
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy dark:text-white tracking-tight">
            Service Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Create, edit, price, and organize public website development packages.
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-violet hover:bg-brand-violet-hover text-white text-xs font-bold rounded-xl shadow-subtle transition-colors"
        >
          <Plus className="w-4 h-4" /> Add New Service
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4 text-right">Price</th>
                <th className="py-3.5 px-4 text-center">Featured</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Features</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400 dark:text-slate-500">
                    Loading services...
                  </td>
                </tr>
              ) : services.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400 dark:text-slate-500">
                    No services found. Click &quot;Add New Service&quot; to create one.
                  </td>
                </tr>
              ) : (
                services.map((service) => (
                  <tr key={service.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800 dark:text-slate-200">{service.name}</div>
                      <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                        /services/{service.slug}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-brand-navy dark:text-slate-200">
                      {service.category?.name || "General"}
                    </td>
                    <td className="py-3.5 px-4 text-right font-black text-brand-navy dark:text-white text-sm">
                      ₹{service.price.toLocaleString("en-IN")}
                      {service.originalPrice && (
                        <span className="block text-[10px] text-slate-400 dark:text-slate-500 line-through font-normal">
                          ₹{service.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleToggleFeatured(service)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          service.featured
                            ? "bg-brand-violet text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-brand-violet"
                        }`}
                        title={service.featured ? "Featured (Click to disable)" : "Not featured"}
                      >
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleToggleActive(service)}
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                          service.active
                            ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300"
                            : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {service.active ? (
                          <>
                            <Check className="w-3 h-3" /> Active
                          </>
                        ) : (
                          <>
                            <X className="w-3 h-3" /> Disabled
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-center font-medium text-slate-500 dark:text-slate-400">
                      {service.features?.length || 0} items
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      <Link
                        href={`/services/${service.slug}`}
                        target="_blank"
                        className="p-1.5 text-slate-400 hover:text-brand-navy dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg inline-flex transition-colors"
                        title="View Live"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/services/${service.id}`}
                        className="p-1.5 text-slate-400 hover:text-brand-violet dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg inline-flex transition-colors"
                        title="Edit Service"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteTarget({ id: service.id, name: service.name })}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg inline-flex transition-colors"
                        title="Delete Service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Service"
        message={`Are you sure you want to permanently delete "${deleteTarget?.name}"? This cannot be undone.`}
        confirmText="Delete"
        isDestructive={true}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
