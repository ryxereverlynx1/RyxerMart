import React from "react";
import { db } from "@/lib/db";
import { ServiceFormEditor } from "@/components/admin/ServiceFormEditor";

export const dynamic = "force-dynamic";

export default async function NewServicePage() {
  const categories = await db.category.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-brand-navy dark:text-white tracking-tight">
          Create New Service Package
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Fill out service specifications and features. It will immediately be available on the live marketplace and accessible to the AI chatbot.
        </p>
      </div>

      <ServiceFormEditor categories={categories} isEditing={false} />
    </div>
  );
}
