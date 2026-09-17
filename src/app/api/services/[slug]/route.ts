import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const service = await db.service.findUnique({
      where: { slug },
      include: {
        category: true,
        features: {
          orderBy: { displayOrder: "asc" },
        },
        faqs: {
          orderBy: { displayOrder: "asc" },
        },
        images: {
          orderBy: { displayOrder: "asc" },
        },
      },
    });

    if (!service || !service.active) {
      return NextResponse.json(
        { error: "Service not found or currently inactive" },
        { status: 404 }
      );
    }

    // Fetch related services in same category
    const related = await db.service.findMany({
      where: {
        categoryId: service.categoryId,
        id: { not: service.id },
        active: true,
      },
      take: 3,
      include: {
        category: true,
      },
    });

    return NextResponse.json({
      service,
      related,
    });
  } catch (error) {
    console.error("Service detail API error:", error);
    return NextResponse.json(
      { error: "Failed to load service details" },
      { status: 500 }
    );
  }
}
