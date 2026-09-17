import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Phone number must be at least 8 digits").max(20),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const rateCheck = checkRateLimit(`contact:${ip}`, 5, 10 * 60 * 1000); // 5 submissions per 10 mins
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: "Too many messages sent. Please wait before contacting us again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid contact information" },
        { status: 400 }
      );
    }

    const { name, email, phone, message } = parsed.data;

    const submission = await db.contactSubmission.create({
      data: {
        name,
        email: email.toLowerCase(),
        phone,
        message,
        status: "NEW",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been received! Our team will contact you shortly.",
      id: submission.id,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact message. Please try again or reach us on WhatsApp." },
      { status: 500 }
    );
  }
}
