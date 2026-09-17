import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const where: any = {};
    if (status && status !== "ALL") {
      where.status = status;
    }

    if (search && search.trim()) {
      const q = search.trim();
      where.OR = [
        { orderNumber: { contains: q } },
        { customer: { fullName: { contains: q } } },
        { customer: { phone: { contains: q } } },
        { customer: { email: { contains: q } } },
      ];
    }

    const orders = await db.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        customer: true,
        items: true,
      },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Admin orders list error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
