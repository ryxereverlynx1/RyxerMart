import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const DEFAULT_STATS = {
  totalOrders: 0,
  newOrders: 0,
  pendingOrders: 0,
  emailFailures: 0,
  totalServices: 4,
  activeServices: 4,
  featuredServices: 2,
  contactRequests: 0,
};

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
      db.order.count().catch(() => 0),
      db.order.count({ where: { status: "NEW" } }).catch(() => 0),
      db.order.count({ where: { status: { in: ["NEW", "CONTACTED", "IN_DISCUSSION"] } } }).catch(() => 0),
      db.order.count({ where: { emailStatus: "FAILED" } }).catch(() => 0),
      db.service.count().catch(() => 4),
      db.service.count({ where: { active: true } }).catch(() => 4),
      db.service.count({ where: { featured: true } }).catch(() => 2),
      db.contactSubmission.count({ where: { status: "NEW" } }).catch(() => 0),
      db.order
        .findMany({
          take: 6,
          orderBy: { createdAt: "desc" },
          include: {
            customer: true,
            items: true,
          },
        })
        .catch(() => []),
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
      recentOrders: recentOrders || [],
    });
  } catch (error) {
    console.warn("[Admin Stats Warning] Database temporarily unreachable, returning default stats:", error);
    return NextResponse.json({
      stats: DEFAULT_STATS,
      recentOrders: [],
    });
  }
}
