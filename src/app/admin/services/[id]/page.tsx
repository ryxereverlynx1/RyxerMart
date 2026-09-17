import React from "react";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ServiceFormEditor } from "@/components/admin/ServiceFormEditor";

export const dynamic = "force-dynamic";

interface EditServicePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  const { id } = await params;

  const [service, categories] = await Promise.all([
    db.service.findUnique({
      where: { id },
      include: {
        features: { orderBy: { displayOrder: "asc" } },
      },
    }),
    db.category.findMany({
      orderBy: { displayOrder: "asc" },
    }),
  ]);

  if (!service) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-brand-navy dark:text-white tracking-tight">
          Edit Service: {service.name}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Update prices, descriptions, and feature checklists. Changes instantly sync to the live store and AI assistant.
        </p>
      </div>

      <ServiceFormEditor
        initialData={service}
        categories={categories}
        isEditing={true}
      />
    </div>
  );
}
