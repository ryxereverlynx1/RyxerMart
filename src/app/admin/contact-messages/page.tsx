"use client";

import React, { useState, useEffect } from "react";
import { Mail, Phone, Clock, MessageSquare } from "lucide-react";

export default function AdminContactMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/contact-messages")
      .then((res) => res.json())
      .then((data) => setMessages(data.messages || []))
      .catch((err) => console.error("Error fetching messages:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-brand-navy dark:text-white tracking-tight">
          Contact Form Submissions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Review general website enquiries submitted via the public contact form.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle overflow-hidden transition-colors">
        {loading ? (
          <div className="p-8 text-center text-slate-400 dark:text-slate-500">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="p-8 text-center text-slate-400 dark:text-slate-500">
            No contact submissions received yet.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {messages.map((msg) => (
              <div key={msg.id} className="p-5 sm:p-6 space-y-3 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{msg.name}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300">
                      {msg.status}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(msg.createdAt).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-300">
                  <a href={`mailto:${msg.email}`} className="flex items-center gap-1.5 hover:text-brand-violet dark:hover:text-purple-400">
                    <Mail className="w-3.5 h-3.5 text-brand-violet dark:text-purple-400" />
                    <span>{msg.email}</span>
                  </a>
                  <a href={`tel:${msg.phone}`} className="flex items-center gap-1.5 hover:text-brand-violet dark:hover:text-purple-400">
                    <Phone className="w-3.5 h-3.5 text-brand-violet dark:text-purple-400" />
                    <span>{msg.phone}</span>
                  </a>
                  <a
                    href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 font-bold"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 whitespace-pre-line leading-relaxed">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
