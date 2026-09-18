import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { logAudit } from "@/lib/audit";
import { getAuthSession } from "@/lib/auth";

const DEFAULT_SETTINGS: Record<string, string> = {
  business_name: "RyxerMart Web Solutions",
  business_email: "ryxereverlynx@gmail.com",
  admin_email: "ryxereverlynx@gmail.com",
  business_phone: "+91 7719421910",
  whatsapp_number: "+91 7719421910",
  business_address: "Jalandhar, Punjab, India",
  currency: "INR",
  currency_symbol: "₹",
  notification_email_enabled: "true",
  chatbot_enabled: "true",
  maintenance_mode: "false",
};

export async function GET() {
  try {
    const settings = await db.setting.findMany();
    const settingsMap = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);

    return NextResponse.json({
      settings: Object.keys(settingsMap).length > 0 ? settingsMap : DEFAULT_SETTINGS,
    });
  } catch (error) {
    console.warn("[Settings Notice] Database offline or slow, serving default settings:", error);
    return NextResponse.json({ settings: DEFAULT_SETTINGS });
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
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid settings payload" }, { status: 400 });
    }

    const entries = Object.entries(body);
    let savedCount = 0;

    for (const [key, rawValue] of entries) {
      if (rawValue === undefined || rawValue === null) continue;
      const value = String(rawValue);
      try {
        await db.setting.upsert({
          where: { key },
          update: { value },
          create: { key, value, group: "GENERAL" },
        });
        savedCount++;
      } catch (upsertErr) {
        console.warn(`[Settings Warning] Could not upsert key "${key}":`, upsertErr);
      }
    }

    // If first pass saved nothing and there were items to save, pause briefly and retry (handles cold start)
    if (savedCount === 0 && entries.length > 0) {
      await new Promise((res) => setTimeout(res, 1200));
      for (const [key, rawValue] of entries) {
        if (rawValue === undefined || rawValue === null) continue;
        const value = String(rawValue);
        try {
          await db.setting.upsert({
            where: { key },
            update: { value },
            create: { key, value, group: "GENERAL" },
          });
          savedCount++;
        } catch (retryErr) {
          console.error(`[Settings Error] Retry failed for "${key}":`, retryErr);
        }
      }
    }

    if (savedCount === 0 && entries.length > 0) {
      return NextResponse.json(
        { error: "Database was temporarily unreachable during update. Please try again." },
        { status: 503 }
      );
    }

    await logAudit({
      adminUserId: session.id,
      adminName: session.name || "Admin",
      action: "SETTINGS_UPDATE",
      targetType: "SETTING",
      metadata: { updatedKeys: Object.keys(body), savedCount },
    });

    return NextResponse.json({ success: true, message: "Settings saved successfully" });
  } catch (error) {
    console.error("Admin settings update error:", error);
    const message = error instanceof Error ? error.message : "Failed to update settings";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
