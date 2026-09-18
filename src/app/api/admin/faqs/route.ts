import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { logAudit } from "@/lib/audit";
import { getAuthSession } from "@/lib/auth";
import { z } from "zod";

const faqSchema = z.object({
  question: z.string().min(5),
  answer: z.string().min(5),
  category: z.string().default("General"),
  displayOrder: z.number().int().default(0),
  active: z.boolean().default(true),
});

export async function GET() {
  try {
    const faqs = await db.generalFAQ.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ faqs });
  } catch (error) {
    console.warn("[FAQs Notice] Serving fallback faqs:", error);
    return NextResponse.json({
      faqs: [
        { id: "faq-1", question: "What is included with free hosting in the packages?", answer: "Every website package includes 1 full year of ultra-fast SSD cloud hosting with an SSL security certificate pre-installed at no additional charge.", category: "Hosting & Technical", displayOrder: 1, active: true },
        { id: "faq-2", question: "How does the WhatsApp order process work?", answer: "When you browse our packages, select the plan that fits your business, and click 'Order via WhatsApp' or checkout through our cart, an itemized order summary is generated.", category: "Ordering & Payment", displayOrder: 2, active: true },
      ],
    });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    const body = await request.json();
    const parsed = faqSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid FAQ data" },
        { status: 400 }
      );
    }

    const faq = await db.generalFAQ.create({
      data: parsed.data,
    });

    await logAudit({
      adminUserId: session?.id,
      adminName: session?.name,
      action: "FAQ_CREATE",
      targetType: "FAQ",
      targetId: faq.id,
      metadata: { question: faq.question },
    });

    return NextResponse.json({ success: true, faq });
  } catch (error) {
    console.error("Admin FAQ create error:", error);
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
  }
}
