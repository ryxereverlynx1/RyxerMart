import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { logAudit } from "@/lib/audit";
import { getAuthSession } from "@/lib/auth";

export async function GET() {
  try {
    const settings = await db.setting.findMany();
    const settingsMap = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);

    return NextResponse.json({ settings: settingsMap });
  } catch (error) {
    console.error("Admin settings get error:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getAuthSession();
    if (session?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden: Admin privileges required to update settings" },
        { status: 403 }
      );
    }

    const body = await request.json();

    for (const [key, value] of Object.entries(body)) {
      if (typeof value === "string") {
        await db.setting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
      }
    }

    await logAudit({
      adminUserId: session.id,
      adminName: session.name,
      action: "SETTINGS_UPDATE",
      targetType: "SETTING",
      metadata: { updatedKeys: Object.keys(body) },
    });

    return NextResponse.json({ success: true, message: "Settings saved successfully" });
  } catch (error) {
    console.error("Admin settings update error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
