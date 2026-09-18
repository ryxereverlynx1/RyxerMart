import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    const where: any = {};
    if (action && action !== "ALL") {
      where.action = action;
    }

    const logs = await db.auditLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return NextResponse.json({ logs });
  } catch (error) {
    console.warn("[Audit Logs Notice] Database offline or slow, serving empty logs:", error);
    return NextResponse.json({ logs: [] });
  }
}
