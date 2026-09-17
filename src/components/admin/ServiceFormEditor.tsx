"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ArrowLeft, RefreshCw, Check } from "lucide-react";
import Link from "next/link";

interface ServiceFormEditorProps {
  initialData?: any;
  categories: any[];
  isEditing?: boolean;
}

export function ServiceFormEditor({
  initialData,
  categories,
  isEditing = false,
}: ServiceFormEditorProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    categoryId: initialData?.categoryId || categories[0]?.id || "",
    price: initialData?.price ? String(initialData.price) : "3499",
    originalPrice: initialData?.originalPrice ? String(initialData.originalPrice) : "",
    pricingType: initialData?.pricingType || "FIXED",
    shortDescription: initialData?.shortDescription || "",
    fullDescription: initialData?.fullDescription || "",
    deliveryTime: initialData?.deliveryTime || "3-5 Business Days",
    revisions: initialData?.revisions || "3 Rounds",
    hostingInfo: initialData?.hostingInfo || "1 Year Free SSD Hosting",
    supportInfo: initialData?.supportInfo || "30 Days Free Technical Support",
    warrantyPeriod: initialData?.warrantyPeriod || "30 Days Warranty",
    tags: initialData?.tags || "",
    featured: initialData?.featured || false,
    active: initialData?.active !== undefined ? initialData.active : true,
    displayOrder: initialData?.displayOrder ? String(initialData.displayOrder) : "0",
  });

  const [features, setFeatures] = useState<string[]>(
    initialData?.features?.map((f: any) => f.featureText) || [
      "1 Website",
      "5–10 Custom Pages",
      "1 Year Hosting Free Included",
      "SSL Security Certificate Free",
    ]
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddFeature = () => {
    setFeatures([...features, ""]);
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...formData,
        price: parseInt(formData.price, 10),
        originalPrice: formData.originalPrice ? parseInt(formData.originalPrice, 10) : null,
        displayOrder: parseInt(formData.displayOrder, 10) || 0,
        features: features.filter((f) => f.trim() !== ""),
      };

      const url = isEditing
        ? `/api/admin/services/${initialData.id}`
        : "/api/admin/services";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save service");
      }

      router.push("/admin/services");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error saving service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/services"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-brand-navy dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Services List
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="btn-shimmer px-6 py-2.5 bg-brand-violet hover:bg-brand-violet-hover disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-subtle transition-all duration-200 active:scale-95 flex items-center gap-2"
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Check className="w-4 h-4" />
          )}
          <span>{isEditing ? "Save Changes" : "Create Service"}</span>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-700 dark:text-rose-300 animate-fade-in">
          {error}
        </div>
      )}

      {/* Main Details */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle space-y-6 transition-colors">
        <h2 className="text-base font-bold text-brand-navy dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
          Basic Service Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Service Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => {
                const name = e.target.value;
                setFormData({
                  ...formData,
                  name,
                  slug: !isEditing
                    ? name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
                    : formData.slug,
                });
              }}
              placeholder="e.g. Royal Website"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              URL Slug <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="e.g. royal-website"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Category <span className="text-rose-500">*</span>
            </label>
            <select
              required
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Pricing Type
            </label>
            <select
              value={formData.pricingType}
              onChange={(e) => setFormData({ ...formData, pricingType: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
            >
              <option value="FIXED">Fixed Price</option>
              <option value="STARTING_FROM">Starting From</option>
              <option value="CUSTOM_QUOTE">Custom Quote</option>
              <option value="ENQUIRY">Enquiry</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Price (INR ₹) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              required
              min={0}
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Original Price (INR ₹ for strikethrough)
            </label>
            <input
              type="number"
              min={0}
              value={formData.originalPrice}
              onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
              placeholder="e.g. 11999"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Display Order
            </label>
            <input
              type="number"
              value={formData.displayOrder}
              onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Short Description (Card Summary) <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            placeholder="Brief 1-2 sentence description for service cards."
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Full Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            rows={5}
            value={formData.fullDescription}
            onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
            placeholder="Detailed description of deliverables, technology stack, and business value."
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet resize-none"
          />
        </div>

        {/* Toggles */}
        <div className="flex flex-wrap items-center gap-6 pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="w-4 h-4 text-brand-violet rounded focus:ring-brand-violet border-slate-300 dark:border-slate-700"
            />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Active (Visible on Website)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 text-brand-violet rounded focus:ring-brand-violet border-slate-300 dark:border-slate-700"
            />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Featured (Most Popular Badge)</span>
          </label>
        </div>
      </div>

      {/* Dynamic Features Editor */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle space-y-4 transition-colors">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-brand-navy dark:text-white">Included Features List</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Each feature appears as a green checkmark item on the service page.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddFeature}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 text-brand-navy dark:text-slate-200 text-xs font-bold rounded-lg transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> Add Feature
          </button>
        </div>

        <div className="space-y-2.5">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 animate-fade-in">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 w-6 text-right">
                {idx + 1}.
              </span>
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(idx, e.target.value)}
                placeholder="e.g. 1 Year Hosting Free Included"
                className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet transition-colors"
              />
              <button
                type="button"
                onClick={() => handleRemoveFeature(idx)}
                className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 active:scale-90 transition-all rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30"
                title="Remove feature"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Specifications & Terms */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle space-y-4 transition-colors">
        <h2 className="text-base font-bold text-brand-navy dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
          Specifications & Terms
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Estimated Delivery Timeline
            </label>
            <input
              type="text"
              value={formData.deliveryTime}
              onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
              placeholder="e.g. 3–5 Business Days"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Revisions Allowance
            </label>
            <input
              type="text"
              value={formData.revisions}
              onChange={(e) => setFormData({ ...formData, revisions: e.target.value })}
              placeholder="e.g. 3 Rounds of Design Revisions"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Hosting Information
            </label>
            <input
              type="text"
              value={formData.hostingInfo}
              onChange={(e) => setFormData({ ...formData, hostingInfo: e.target.value })}
              placeholder="e.g. 1 Year High-Speed SSD Hosting Free"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Technical Support & Warranty
            </label>
            <input
              type="text"
              value={formData.supportInfo}
              onChange={(e) => setFormData({ ...formData, supportInfo: e.target.value })}
              placeholder="e.g. 30 Days Free Maintenance & Bug Warranty"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Search Tags (Comma separated)
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="starter, business, ecommerce, responsive"
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
          />
        </div>
      </div>
    </form>
  );
}
