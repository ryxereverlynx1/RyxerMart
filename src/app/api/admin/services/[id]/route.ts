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
    const service = await db.service.findUnique({
      where: { id },
      include: {
        category: true,
        features: { orderBy: { displayOrder: "asc" } },
        faqs: { orderBy: { displayOrder: "asc" } },
      },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ service });
  } catch (error) {
    console.error("Admin service get error:", error);
    return NextResponse.json({ error: "Failed to fetch service" }, { status: 500 });
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

    const existing = await db.service.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const { features, ...data } = body;

    // Check if price changed
    const oldPrice = existing.price;
    const newPrice = data.price !== undefined ? Number(data.price) : oldPrice;

    const updated = await db.service.update({
      where: { id },
      data: {
        ...data,
        price: newPrice,
        originalPrice:
          data.originalPrice !== undefined ? (data.originalPrice ? Number(data.originalPrice) : null) : existing.originalPrice,
        displayOrder:
          data.displayOrder !== undefined ? Number(data.displayOrder) : existing.displayOrder,
      },
      include: {
        category: true,
      },
    });

    // If features array was passed, replace features
    if (Array.isArray(features)) {
      await db.serviceFeature.deleteMany({ where: { serviceId: id } });
      if (features.length > 0) {
        await db.serviceFeature.createMany({
          data: features.map((f: string | { featureText: string; isIncluded?: boolean }, idx: number) => ({
            serviceId: id,
            featureText: typeof f === "string" ? f : f.featureText,
            isIncluded: typeof f === "string" ? true : f.isIncluded ?? true,
            displayOrder: idx + 1,
          })),
        });
      }
    }

    if (oldPrice !== newPrice) {
      await logAudit({
        adminUserId: session?.id,
        adminName: session?.name,
        action: "PRICE_CHANGE",
        targetType: "SERVICE",
        targetId: id,
        metadata: {
          serviceName: updated.name,
          oldPrice,
          newPrice,
        },
      });
    }

    await logAudit({
      adminUserId: session?.id,
      adminName: session?.name,
      action: "SERVICE_UPDATE",
      targetType: "SERVICE",
      targetId: id,
      metadata: { name: updated.name },
    });

    return NextResponse.json({ success: true, service: updated });
  } catch (error) {
    console.error("Admin service update error:", error);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAuthSession();
    const { id } = await params;

    const existing = await db.service.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    await db.service.delete({ where: { id } });

    await logAudit({
      adminUserId: session?.id,
      adminName: session?.name,
      action: "SERVICE_DELETE",
      targetType: "SERVICE",
      targetId: id,
      metadata: { name: existing.name },
    });

    return NextResponse.json({ success: true, message: "Service deleted" });
  } catch (error) {
    console.error("Admin service delete error:", error);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
