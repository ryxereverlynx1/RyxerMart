import { NextResponse } from "next/server";
import { runWithDbFallback } from "@/lib/db";
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
    const settings = await runWithDbFallback((client) => client.setting.findMany());
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
    let lastError = "";

    for (const [key, rawValue] of entries) {
      if (rawValue === undefined || rawValue === null) continue;
      const value = String(rawValue);
      try {
        await runWithDbFallback((client) =>
          client.setting.upsert({
            where: { key },
            update: { value },
            create: { key, value, group: "GENERAL" },
          })
        );
        savedCount++;
      } catch (upsertErr) {
        lastError = upsertErr instanceof Error ? upsertErr.message : String(upsertErr);
        console.warn(`[Settings Warning] Could not upsert key "${key}":`, upsertErr);
      }
    }

    if (savedCount === 0 && entries.length > 0) {
      return NextResponse.json(
        { error: `Database update failed: ${lastError || "Connection timed out"}. Please check your database connection.` },
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
