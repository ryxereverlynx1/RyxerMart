import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [
      totalOrders,
      newOrders,
      pendingOrders,
      emailFailures,
      totalServices,
      activeServices,
      featuredServices,
      contactRequests,
      recentOrders,
    ] = await Promise.all([
      db.order.count(),
      db.order.count({ where: { status: "NEW" } }),
      db.order.count({ where: { status: { in: ["NEW", "CONTACTED", "IN_DISCUSSION"] } } }),
      db.order.count({ where: { emailStatus: "FAILED" } }),
      db.service.count(),
      db.service.count({ where: { active: true } }),
      db.service.count({ where: { featured: true } }),
      db.contactSubmission.count({ where: { status: "NEW" } }),
      db.order.findMany({
        take: 6,
        orderBy: { createdAt: "desc" },
        include: {
          customer: true,
          items: true,
        },
      }),
    ]);

    return NextResponse.json({
      stats: {
        totalOrders,
        newOrders,
        pendingOrders,
        emailFailures,
        totalServices,
        activeServices,
        featuredServices,
        contactRequests,
      },
      recentOrders,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ error: "Failed to load dashboard statistics" }, { status: 500 });
  }
}
