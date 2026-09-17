import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateOrderNumber } from "@/lib/order-id";
import { generateWhatsAppOrderLink } from "@/lib/whatsapp";
import { sendNewOrderEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";
import { z } from "zod";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100),
  phone: z.string().min(8, "Phone number must be at least 8 digits").max(20),
  email: z.string().email("Please enter a valid email address"),
  city: z.string().min(2, "City is required").max(100),
  state: z.string().min(2, "State is required").max(100),
  country: z.string().default("India"),
  companyName: z.string().max(100).optional().nullable(),
  websiteUrl: z.string().max(200).optional().nullable(),
  requirements: z.string().max(3000).optional().nullable(),
  agreeContact: z.literal(true, {
    errorMap: () => ({ message: "You must agree to be contacted regarding your enquiry" }),
  }),
  items: z
    .array(
      z.object({
        serviceId: z.string().min(1, "Service ID is required"),
        quantity: z.number().int().min(1).default(1),
      })
    )
    .min(1, "Your cart cannot be empty"),
});

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    // Rate limit: Max 10 orders per 10 minutes per IP
    const rateCheck = checkRateLimit(`order:${ip}`, 10, 10 * 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: "Too many requests. Please wait before submitting another order." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid order submission" },
        { status: 400 }
      );
    }

    const {
      fullName,
      phone,
      email,
      city,
      state,
      country,
      companyName,
      websiteUrl,
      requirements,
      items: submittedItems,
    } = parsed.data;

    // 1. Fetch current active services from database (AUTHORITATIVE PRICE LOOKUP)
    const serviceIds = submittedItems.map((item) => item.serviceId);
    const dbServices = await db.service.findMany({
      where: {
        id: { in: serviceIds },
        active: true,
      },
    });

    if (dbServices.length === 0) {
      return NextResponse.json(
        { error: "None of the selected services are currently active or available." },
        { status: 400 }
      );
    }

    // Map database services by ID
    const serviceMap = new Map(dbServices.map((s) => [s.id, s]));

    // 2. Server-side authoritative price recalculation
    let serverSubtotal = 0;
    const validatedItems: Array<{
      serviceId: string;
      serviceName: string;
      serviceSlug: string;
      unitPrice: number;
      quantity: number;
      subtotal: number;
    }> = [];

    for (const item of submittedItems) {
      const dbService = serviceMap.get(item.serviceId);
      if (!dbService) {
        return NextResponse.json(
          { error: `A selected service is no longer available. Please refresh your cart.` },
          { status: 400 }
        );
      }

      const unitPrice = dbService.price;
      const quantity = Math.max(1, item.quantity);
      const itemSubtotal = unitPrice * quantity;
      serverSubtotal += itemSubtotal;

      validatedItems.push({
        serviceId: dbService.id,
        serviceName: dbService.name,
        serviceSlug: dbService.slug,
        unitPrice,
        quantity,
        subtotal: itemSubtotal,
      });
    }

    const discount = 0; // Discount calculation server-side if coupon applied
    const serverTotal = serverSubtotal - discount;

    // 3. Upsert or find Customer record
    let customer = await db.customer.findFirst({
      where: {
        OR: [{ phone }, { email: email.toLowerCase() }],
      },
    });

    if (!customer) {
      customer = await db.customer.create({
        data: {
          fullName,
          phone,
          email: email.toLowerCase(),
          city,
          state,
          country,
          companyName: companyName || null,
          websiteUrl: websiteUrl || null,
        },
      });
    } else {
      // Update customer details with newest info
      customer = await db.customer.update({
        where: { id: customer.id },
        data: {
          fullName,
          city,
          state,
          country,
          companyName: companyName || customer.companyName,
          websiteUrl: websiteUrl || customer.websiteUrl,
        },
      });
    }

    // 4. Generate unique human-readable Order Number
    const orderNumber = generateOrderNumber();

    // 5. Create Order & OrderItems transactionally in DB
    const order = await db.order.create({
      data: {
        orderNumber,
        customerId: customer.id,
        subtotal: serverSubtotal,
        discount,
        total: serverTotal,
        requirements: requirements || null,
        preferredContact: "WhatsApp",
        status: "NEW",
        emailStatus: "PENDING",
        items: {
          create: validatedItems.map((item) => ({
            serviceId: item.serviceId,
            serviceName: item.serviceName,
            serviceSlug: item.serviceSlug,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            subtotal: item.subtotal,
          })),
        },
      },
      include: {
        customer: true,
        items: true,
      },
    });

    // 6. Generate official WhatsApp URL
    const whatsappLink = generateWhatsAppOrderLink({
      orderNumber: order.orderNumber,
      customerName: customer.fullName,
      customerPhone: customer.phone,
      customerEmail: customer.email,
      city: customer.city,
      state: customer.state,
      items: validatedItems,
      subtotal: serverSubtotal,
      total: serverTotal,
      requirements: order.requirements,
    });

    // Update order with generated whatsapp link
    await db.order.update({
      where: { id: order.id },
      data: { whatsappLinkGenerated: whatsappLink },
    });

    // 7. Trigger Admin Email in background (does NOT block WhatsApp or order creation)
    sendNewOrderEmail({
      orderId: order.id,
      orderNumber: order.orderNumber,
      customerName: customer.fullName,
      customerPhone: customer.phone,
      customerEmail: customer.email,
      city: customer.city,
      state: customer.state,
      country: customer.country,
      companyName: customer.companyName,
      websiteUrl: customer.websiteUrl,
      items: validatedItems,
      subtotal: serverSubtotal,
      discount,
      total: serverTotal,
      requirements: order.requirements,
      createdAt: order.createdAt,
      ipAddress: ip,
    }).catch((err) => console.error("Async email dispatch error:", err));

    // 8. Return response to frontend
    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        total: order.total,
        whatsappLink,
      },
    });
  } catch (error) {
    console.error("Order creation API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your order." },
      { status: 500 }
    );
  }
}
