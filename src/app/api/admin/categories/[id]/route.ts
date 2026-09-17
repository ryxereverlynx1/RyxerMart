import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { logAudit } from "@/lib/audit";
import { getAuthSession } from "@/lib/auth";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAuthSession();
    const { id } = await params;
    const body = await request.json();

    const category = await db.category.update({
      where: { id },
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        icon: body.icon,
        displayOrder: body.displayOrder !== undefined ? Number(body.displayOrder) : undefined,
        active: body.active !== undefined ? Boolean(body.active) : undefined,
      },
    });

    await logAudit({
      adminUserId: session?.id,
      adminName: session?.name,
      action: "CATEGORY_UPDATE",
      targetType: "CATEGORY",
      targetId: id,
      metadata: { name: category.name },
    });

    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.error("Admin category update error:", error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAuthSession();
    const { id } = await params;

    const existing = await db.category.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    await db.category.delete({ where: { id } });

    await logAudit({
      adminUserId: session?.id,
      adminName: session?.name,
      action: "CATEGORY_DELETE",
      targetType: "CATEGORY",
      targetId: id,
      metadata: { name: existing.name },
    });

    return NextResponse.json({ success: true, message: "Category deleted" });
  } catch (error) {
    console.error("Admin category delete error:", error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
