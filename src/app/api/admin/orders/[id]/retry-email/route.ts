import { NextResponse } from "next/server";
import { retryFailedOrderEmail } from "@/lib/email";
import { logAudit } from "@/lib/audit";
import { getAuthSession } from "@/lib/auth";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAuthSession();
    const { id } = await params;

    const result = await retryFailedOrderEmail(id);

    await logAudit({
      adminUserId: session?.id,
      adminName: session?.name,
      action: "RETRY_EMAIL",
      targetType: "ORDER",
      targetId: id,
      metadata: { success: result.success, error: result.error },
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Email retry failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order notification email sent successfully",
    });
  } catch (error) {
    console.error("Admin retry email error:", error);
    return NextResponse.json({ error: "Failed to retry email" }, { status: 500 });
  }
}
