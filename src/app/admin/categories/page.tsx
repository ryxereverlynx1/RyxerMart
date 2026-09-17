"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    displayOrder: 0,
    active: true,
  });

  const fetchCategories = () => {
    setLoading(true);
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []))
      .catch((err) => console.error("Category fetch error:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleStartAdd = () => {
    setEditingId("new");
    setFormData({
      name: "",
      slug: "",
      description: "",
      displayOrder: categories.length + 1,
      active: true,
    });
  };

  const handleStartEdit = (cat: any) => {
    setEditingId(cat.id);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || "",
      displayOrder: cat.displayOrder,
      active: cat.active,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.slug) {
      alert("Name and slug are required");
      return;
    }

    try {
      const isNew = editingId === "new";
      const url = isNew
        ? "/api/admin/categories"
        : `/api/admin/categories/${editingId}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Failed to save category");
        return;
      }

      setEditingId(null);
      fetchCategories();
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      const res = await fetch(`/api/admin/categories/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (res.ok) fetchCategories();
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy dark:text-white tracking-tight">
            Category Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Organize web packages into business categories.
          </p>
        </div>
        {editingId !== "new" && (
          <button
            onClick={handleStartAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-violet hover:bg-brand-violet-hover text-white text-xs font-bold rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Category
          </button>
        )}
      </div>

      {/* Inline Editor / Create form */}
      {editingId && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-brand-violet ring-2 ring-brand-violet/20 shadow-card space-y-4 animate-scale-in transition-colors">
          <h2 className="text-sm font-bold text-brand-navy dark:text-white">
            {editingId === "new" ? "Create New Category" : "Edit Category"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Category Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setFormData({
                    ...formData,
                    name,
                    slug: editingId === "new"
                      ? name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
                      : formData.slug,
                  });
                }}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                URL Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
            />
          </div>
          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-4 h-4 rounded text-brand-violet focus:ring-brand-violet border-slate-300 dark:border-slate-700"
              />
              <span>Active</span>
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-brand-violet hover:bg-brand-violet-hover text-white text-xs font-bold rounded-xl"
              >
                Save Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle overflow-hidden transition-colors">
        <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
          <thead className="bg-slate-50 dark:bg-slate-800/80 text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="py-3.5 px-4">Name</th>
              <th className="py-3.5 px-4">Slug</th>
              <th className="py-3.5 px-4">Description</th>
              <th className="py-3.5 px-4 text-center">Services</th>
              <th className="py-3.5 px-4 text-center">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-slate-400 dark:text-slate-500">
                  Loading categories...
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-slate-400 dark:text-slate-500">
                  No categories defined.
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-brand-navy dark:text-white">
                    {cat.name}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-500 dark:text-slate-400">
                    {cat.slug}
                  </td>
                  <td className="py-3.5 px-4 max-w-xs truncate text-slate-600 dark:text-slate-300">
                    {cat.description || "—"}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-800 dark:text-slate-200">
                    {cat._count?.services || 0}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        cat.active
                          ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300"
                          : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {cat.active ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-1">
                    <button
                      onClick={() => handleStartEdit(cat)}
                      className="p-1.5 text-slate-400 hover:text-brand-violet dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg inline-flex"
                      title="Edit Category"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget({ id: cat.id, name: cat.name })}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg inline-flex"
                      title="Delete Category"
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

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Category"
        message={`Are you sure you want to delete category "${deleteTarget?.name}"? Services linked will also be affected.`}
        confirmText="Delete"
        isDestructive={true}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
