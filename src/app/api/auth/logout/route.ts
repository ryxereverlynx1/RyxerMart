import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, getAuthSession } from "@/lib/auth";
import { logAudit } from "@/lib/audit";

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    if (session) {
      await logAudit({
        adminUserId: session.id,
        adminName: session.name,
        action: "LOGOUT",
        targetType: "AUTH",
      });
    }

    const response = NextResponse.json({ success: true, message: "Logged out successfully" });
    response.cookies.delete(AUTH_COOKIE_NAME);
    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}
