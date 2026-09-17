import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { logAudit } from "@/lib/audit";
import { getAuthSession } from "@/lib/auth";

export async function GET() {
  try {
    const config = await db.chatbotSetting.findUnique({
      where: { id: "default" },
    });
    return NextResponse.json({ config });
  } catch (error) {
    console.error("Admin chatbot config get error:", error);
    return NextResponse.json({ error: "Failed to fetch chatbot config" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getAuthSession();
    if (session?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden: Admin privileges required" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const updated = await db.chatbotSetting.upsert({
      where: { id: "default" },
      update: {
        systemPrompt: body.systemPrompt,
        businessInstructions: body.businessInstructions,
        restrictions: body.restrictions,
        tone: body.tone,
        welcomeMessage: body.welcomeMessage,
        fallbackMessage: body.fallbackMessage,
        isEnabled: body.isEnabled !== undefined ? Boolean(body.isEnabled) : true,
      },
      create: {
        id: "default",
        systemPrompt: body.systemPrompt || "",
        businessInstructions: body.businessInstructions || "",
        restrictions: body.restrictions || "",
        tone: body.tone || "professional",
        welcomeMessage: body.welcomeMessage || "Hello!",
        fallbackMessage: body.fallbackMessage || "Contact RyxerMart for details.",
        isEnabled: body.isEnabled !== undefined ? Boolean(body.isEnabled) : true,
      },
    });

    await logAudit({
      adminUserId: session.id,
      adminName: session.name,
      action: "CHATBOT_SETTINGS_UPDATE",
      targetType: "CHATBOT",
      metadata: { isEnabled: updated.isEnabled },
    });

    return NextResponse.json({ success: true, config: updated });
  } catch (error) {
    console.error("Admin chatbot config update error:", error);
    return NextResponse.json({ error: "Failed to update chatbot config" }, { status: 500 });
  }
}
