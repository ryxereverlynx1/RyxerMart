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
    console.error("Admin contact messages error:", error);
    return NextResponse.json({ error: "Failed to fetch contact messages" }, { status: 500 });
  }
}
