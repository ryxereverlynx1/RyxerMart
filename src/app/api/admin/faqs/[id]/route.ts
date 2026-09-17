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

    const faq = await db.generalFAQ.update({
      where: { id },
      data: {
        question: body.question,
        answer: body.answer,
        category: body.category,
        displayOrder: body.displayOrder !== undefined ? Number(body.displayOrder) : undefined,
        active: body.active !== undefined ? Boolean(body.active) : undefined,
      },
    });

    await logAudit({
      adminUserId: session?.id,
      adminName: session?.name,
      action: "FAQ_UPDATE",
      targetType: "FAQ",
      targetId: id,
    });

    return NextResponse.json({ success: true, faq });
  } catch (error) {
    console.error("Admin FAQ update error:", error);
    return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAuthSession();
    const { id } = await params;

    await db.generalFAQ.delete({ where: { id } });

    await logAudit({
      adminUserId: session?.id,
      adminName: session?.name,
      action: "FAQ_DELETE",
      targetType: "FAQ",
      targetId: id,
    });

    return NextResponse.json({ success: true, message: "FAQ deleted" });
  } catch (error) {
    console.error("Admin FAQ delete error:", error);
    return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
  }
}
