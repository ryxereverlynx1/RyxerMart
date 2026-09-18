import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const messages = await db.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json({ messages });
  } catch (error) {
    console.warn("[Contact Messages Notice] Database offline or slow, serving empty messages:", error);
    return NextResponse.json({ messages: [] });
  }
}
