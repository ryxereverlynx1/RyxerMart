"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, HelpCircle } from "lucide-react";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "General",
    displayOrder: 0,
    active: true,
  });

  const fetchFaqs = () => {
    setLoading(true);
    fetch("/api/admin/faqs")
      .then((res) => res.json())
      .then((data) => setFaqs(data.faqs || []))
      .catch((err) => console.error("FAQ fetch error:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleStartAdd = () => {
    setEditingId("new");
    setFormData({
      question: "",
      answer: "",
      category: "General",
      displayOrder: faqs.length + 1,
      active: true,
    });
  };

  const handleStartEdit = (faq: any) => {
    setEditingId(faq.id);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      displayOrder: faq.displayOrder,
      active: faq.active,
    });
  };

  const handleSave = async () => {
    if (!formData.question || !formData.answer) {
      alert("Question and Answer are required.");
      return;
    }

    try {
      const isNew = editingId === "new";
      const url = isNew ? "/api/admin/faqs" : `/api/admin/faqs/${editingId}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setEditingId(null);
        fetchFaqs();
      }
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    try {
      const res = await fetch(`/api/admin/faqs/${deleteTargetId}`, { method: "DELETE" });
      if (res.ok) fetchFaqs();
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy dark:text-white tracking-tight">
            FAQ Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage public FAQs displayed on the website and utilized by the AI chatbot.
          </p>
        </div>
        {editingId !== "new" && (
          <button
            onClick={handleStartAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-violet hover:bg-brand-violet-hover text-white text-xs font-bold rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" /> Add FAQ
          </button>
        )}
      </div>

      {editingId && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-brand-violet ring-2 ring-brand-violet/20 shadow-card space-y-4 animate-scale-in transition-colors">
          <h2 className="text-sm font-bold text-brand-navy dark:text-white">
            {editingId === "new" ? "Add New FAQ" : "Edit FAQ"}
          </h2>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Question</label>
            <input
              type="text"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Answer</label>
            <textarea
              rows={3}
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet resize-none"
            />
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setEditingId(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-brand-violet hover:bg-brand-violet-hover text-white text-xs font-bold rounded-xl"
            >
              Save FAQ
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {loading ? (
          <div className="p-8 text-center text-slate-400 dark:text-slate-500">Loading FAQs...</div>
        ) : faqs.length === 0 ? (
          <div className="p-8 text-center text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            No FAQs defined.
          </div>
        ) : (
          faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle flex items-start justify-between gap-4 transition-colors"
            >
              <div className="space-y-1.5 flex-1">
                <h3 className="text-sm font-bold text-brand-navy dark:text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-brand-violet dark:text-purple-400 flex-shrink-0" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 pl-6 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => handleStartEdit(faq)}
                  className="p-1.5 text-slate-400 hover:text-brand-violet dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteTargetId(faq.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Delete FAQ"
        message="Are you sure you want to delete this FAQ? It will no longer be visible on the public website."
        confirmText="Delete"
        isDestructive={true}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
