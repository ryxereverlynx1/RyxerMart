import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { logAudit } from "@/lib/audit";
import { getAuthSession } from "@/lib/auth";
import { z } from "zod";
import { FALLBACK_SERVICES } from "@/lib/catalog";

const serviceSchema = z.object({
  slug: z.string().min(2).max(100),
  name: z.string().min(2).max(100),
  shortDescription: z.string().min(5).max(300),
  fullDescription: z.string().min(10),
  categoryId: z.string().min(1),
  price: z.number().int().min(0),
  originalPrice: z.number().int().min(0).optional().nullable(),
  pricingType: z.string().default("FIXED"),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
  deliveryTime: z.string().optional().nullable(),
  revisions: z.string().optional().nullable(),
  hostingInfo: z.string().optional().nullable(),
  supportInfo: z.string().optional().nullable(),
  warrantyPeriod: z.string().optional().nullable(),
  tags: z.string().optional().nullable(),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  features: z.array(z.string()).optional().default([]),
});

export async function GET() {
  try {
    const services = await db.service.findMany({
      orderBy: { displayOrder: "asc" },
      include: {
        category: true,
        features: { orderBy: { displayOrder: "asc" } },
      },
    });
    return NextResponse.json({ services });
  } catch (error) {
    console.warn("[Services Notice] Database offline or slow, serving fallback services:", error);
    return NextResponse.json({ services: FALLBACK_SERVICES });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    const body = await request.json();
    const parsed = serviceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid service data" },
        { status: 400 }
      );
    }

    const { features, ...data } = parsed.data;

    // Check slug uniqueness
    const existing = await db.service.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A service with this slug already exists. Please pick a unique slug." },
        { status: 400 }
      );
    }

    const service = await db.service.create({
      data: {
        ...data,
        features: {
          create: features.map((featureText, idx) => ({
            featureText,
            displayOrder: idx + 1,
            isIncluded: true,
          })),
        },
      },
      include: {
        category: true,
        features: true,
      },
    });

    await logAudit({
      adminUserId: session?.id,
      adminName: session?.name,
      action: "SERVICE_CREATE",
      targetType: "SERVICE",
      targetId: service.id,
      metadata: { name: service.name, price: service.price },
    });

    return NextResponse.json({ success: true, service });
  } catch (error) {
    console.error("Admin service create error:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
