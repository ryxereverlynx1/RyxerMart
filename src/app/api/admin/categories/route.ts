import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { logAudit } from "@/lib/audit";
import { getAuthSession } from "@/lib/auth";
import { z } from "zod";

const categorySchema = z.object({
  slug: z.string().min(2).max(100),
  name: z.string().min(2).max(100),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  displayOrder: z.number().int().default(0),
  active: z.boolean().default(true),
});

export async function GET() {
  try {
    const categories = await db.category.findMany({
      orderBy: { displayOrder: "asc" },
      include: {
        _count: { select: { services: true } },
      },
    });
    return NextResponse.json({ categories });
  } catch (error) {
    console.warn("[Categories Notice] Serving fallback categories:", error);
    return NextResponse.json({
      categories: [
        { id: "cat-websites", slug: "websites", name: "Website Development", displayOrder: 1, active: true, _count: { services: 2 } },
        { id: "cat-ecommerce", slug: "ecommerce", name: "E-Commerce Development", displayOrder: 2, active: true, _count: { services: 2 } },
        { id: "cat-digital", slug: "digital-solutions", name: "Digital & Web Solutions", displayOrder: 3, active: true, _count: { services: 0 } },
      ],
    });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    const body = await request.json();
    const parsed = categorySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid category data" },
        { status: 400 }
      );
    }

    const existing = await db.category.findUnique({
      where: { slug: parsed.data.slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A category with this slug already exists" },
        { status: 400 }
      );
    }

    const category = await db.category.create({
      data: parsed.data,
    });

    await logAudit({
      adminUserId: session?.id,
      adminName: session?.name,
      action: "CATEGORY_CREATE",
      targetType: "CATEGORY",
      targetId: category.id,
      metadata: { name: category.name },
    });

    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.error("Admin category create error:", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
