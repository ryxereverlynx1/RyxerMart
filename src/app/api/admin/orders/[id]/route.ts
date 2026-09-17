import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { logAudit } from "@/lib/audit";
import { getAuthSession } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = await db.order.findUnique({
      where: { id },
      include: {
        customer: true,
        items: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Admin get order error:", error);
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAuthSession();
    const { id } = await params;
    const body = await request.json();

    const existing = await db.order.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const { status, internalNotes } = body;

    const updated = await db.order.update({
      where: { id },
      data: {
        status: status || existing.status,
        internalNotes: internalNotes !== undefined ? internalNotes : existing.internalNotes,
      },
      include: {
        customer: true,
        items: true,
      },
    });

    if (status && status !== existing.status) {
      await logAudit({
        adminUserId: session?.id,
        adminName: session?.name,
        action: "STATUS_CHANGE",
        targetType: "ORDER",
        targetId: id,
        metadata: {
          orderNumber: existing.orderNumber,
          oldStatus: existing.status,
          newStatus: status,
        },
      });
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    console.error("Admin order update error:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
