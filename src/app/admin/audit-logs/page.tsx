"use client";

import React, { useState, useEffect } from "react";
import { ShieldAlert, Clock, Filter, User } from "lucide-react";

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState("ALL");

  useEffect(() => {
    setLoading(true);
    const query = actionFilter !== "ALL" ? `?action=${actionFilter}` : "";
    fetch(`/api/admin/audit-logs${query}`)
      .then((res) => res.json())
      .then((data) => setLogs(data.logs || []))
      .catch((err) => console.error("Audit log error:", err))
      .finally(() => setLoading(false));
  }, [actionFilter]);

  const getActionBadgeColor = (action: string) => {
    switch (action) {
      case "LOGIN":
        return "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300";
      case "FAILED_LOGIN":
        return "bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300";
      case "PRICE_CHANGE":
        return "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-black";
      case "SERVICE_CREATE":
      case "SERVICE_UPDATE":
        return "bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300";
      case "SERVICE_DELETE":
        return "bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300";
      case "STATUS_CHANGE":
        return "bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300";
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy dark:text-white tracking-tight">
            Security & System Audit Trail
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Immutable log of administrative operations, price adjustments, and authentication events.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            aria-label="Filter audit logs by action"
            className="px-3.5 py-2 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-violet font-semibold text-slate-700 dark:text-slate-200"
          >
            <option value="ALL">All Actions</option>
            <option value="LOGIN">Admin Login</option>
            <option value="FAILED_LOGIN">Failed Login Attempts</option>
            <option value="PRICE_CHANGE">Price Changes</option>
            <option value="SERVICE_CREATE">Service Created</option>
            <option value="SERVICE_UPDATE">Service Updated</option>
            <option value="SERVICE_DELETE">Service Deleted</option>
            <option value="STATUS_CHANGE">Order Status Changed</option>
            <option value="SETTINGS_UPDATE">Settings Updated</option>
            <option value="CHATBOT_SETTINGS_UPDATE">Chatbot Config Updated</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Actor</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">Target</th>
                <th className="py-3.5 px-4">Metadata</th>
                <th className="py-3.5 px-4 text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400 dark:text-slate-500">
                    Loading audit trail...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400 dark:text-slate-500">
                    No audit records matching filter found.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-100">
                      {log.adminName || "System"}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${getActionBadgeColor(
                          log.action
                        )}`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                      {log.targetType ? `${log.targetType}${log.targetId ? ` #${log.targetId.slice(0, 8)}` : ""}` : "—"}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate text-[11px] font-mono text-slate-600 dark:text-slate-300">
                      {log.metadata || "—"}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-[11px] text-slate-400 dark:text-slate-500">
                      {log.ipAddress || "—"}
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
