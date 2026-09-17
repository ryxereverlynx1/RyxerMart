import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get("category");
    const searchQuery = searchParams.get("search");
    const sortBy = searchParams.get("sort") || "recommended";
    const featuredOnly = searchParams.get("featured") === "true";

    // Build Prisma where query
    const where: any = {
      active: true,
    };

    if (categorySlug && categorySlug !== "all") {
      where.category = { slug: categorySlug };
    }

    if (featuredOnly) {
      where.featured = true;
    }

    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.trim();
      where.OR = [
        { name: { contains: q } },
        { shortDescription: { contains: q } },
        { tags: { contains: q } },
      ];
    }

    // Build orderBy
    let orderBy: any = [{ displayOrder: "asc" }, { createdAt: "desc" }];
    if (sortBy === "price_asc") {
      orderBy = [{ price: "asc" }];
    } else if (sortBy === "price_desc") {
      orderBy = [{ price: "desc" }];
    } else if (sortBy === "newest") {
      orderBy = [{ createdAt: "desc" }];
    }

    const services = await db.service.findMany({
      where,
      orderBy,
      include: {
        category: true,
        features: {
          orderBy: { displayOrder: "asc" },
        },
      },
    });

    const categories = await db.category.findMany({
      where: { active: true },
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json({
      services,
      categories,
    });
  } catch (error) {
    console.error("Public services API error:", error);
    return NextResponse.json(
      { error: "Failed to load services" },
      { status: 500 }
    );
  }
}
