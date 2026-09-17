import nodemailer from "nodemailer";
import { db } from "./db";

export interface OrderEmailData {
  orderId: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  city: string;
  state: string;
  country: string;
  companyName?: string | null;
  websiteUrl?: string | null;
  items: Array<{
    serviceName: string;
    unitPrice: number;
    quantity: number;
    subtotal: number;
  }>;
  subtotal: number;
  discount: number;
  total: number;
  requirements?: string | null;
  createdAt: Date;
  ipAddress?: string;
}

/**
 * Creates Nodemailer transporter based on SMTP configuration in .env
 */
function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

/**
 * Sends order notification email to the admin.
 * If SMTP credentials are missing or fail, updates order.emailStatus = "FAILED"
 * without failing or deleting the customer order.
 */
export async function sendNewOrderEmail(
  data: OrderEmailData
): Promise<{ success: boolean; error?: string }> {
  // Determine admin recipient email safely (avoid unroutable @ryxermart.com placeholders)
  let adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail || adminEmail.includes("@ryxermart.com")) {
    try {
      const setting = await db.setting.findUnique({ where: { key: "admin_email" } });
      if (setting?.value && !setting.value.includes("@ryxermart.com")) {
        adminEmail = setting.value;
      }
    } catch {
      // ignore db error
    }
  }
  if (!adminEmail || adminEmail.includes("@ryxermart.com")) {
    adminEmail = process.env.SMTP_USER || "ryxereverlynx@gmail.com";
  }

  const fromEmail =
    process.env.SMTP_FROM ||
    (process.env.SMTP_USER
      ? `RyxerMart <${process.env.SMTP_USER}>`
      : `RyxerMart <ryxereverlynx@gmail.com>`);

  const transporter = createTransporter();

  const formattedDate = data.createdAt.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const itemsHtml = data.items
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #E2E8F0;">
        <td style="padding: 12px 16px; font-weight: 600; color: #0A2558;">${item.serviceName}</td>
        <td style="padding: 12px 16px; text-align: center; color: #475569;">${item.quantity}</td>
        <td style="padding: 12px 16px; text-align: right; color: #475569;">₹${item.unitPrice.toLocaleString("en-IN")}</td>
        <td style="padding: 12px 16px; text-align: right; font-weight: 600; color: #0F172A;">₹${item.subtotal.toLocaleString("en-IN")}</td>
      </tr>
    `
    )
    .join("");

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F8FAFC; margin: 0; padding: 24px; }
          .container { max-width: 650px; margin: 0 auto; background: #FFFFFF; border-radius: 8px; border: 1px solid #E2E8F0; overflow: hidden; }
          .header { background: #0A2558; padding: 24px 32px; color: #FFFFFF; border-bottom: 4px solid #6C3CE9; }
          .badge { display: inline-block; background: #6C3CE9; color: #FFFFFF; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; }
          .content { padding: 32px; }
          .section-title { font-size: 14px; font-weight: 700; text-transform: uppercase; color: #6C3CE9; letter-spacing: 0.05em; margin-bottom: 12px; margin-top: 24px; }
          .info-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .info-table td { padding: 8px 0; font-size: 14px; }
          .info-label { color: #64748B; width: 35%; font-weight: 500; }
          .info-val { color: #0F172A; font-weight: 600; }
          .items-table { width: 100%; border-collapse: collapse; margin-top: 12px; margin-bottom: 20px; font-size: 14px; }
          .items-table th { background: #F1F5F9; padding: 10px 16px; text-align: left; color: #0A2558; font-weight: 600; }
          .total-box { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; padding: 16px 20px; text-align: right; margin-top: 16px; }
          .total-amount { font-size: 20px; font-weight: 700; color: #0A2558; }
          .requirements-box { background: #FFFBEB; border: 1px solid #FDE68A; border-radius: 6px; padding: 16px; font-size: 14px; color: #92400E; margin-top: 12px; }
          .footer { background: #F8FAFC; padding: 20px 32px; font-size: 12px; color: #64748B; border-top: 1px solid #E2E8F0; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="badge">New Order / Service Enquiry</span>
            <h1 style="margin: 8px 0 0 0; font-size: 24px; font-weight: 700;">RYXERMART</h1>
            <p style="margin: 4px 0 0 0; font-size: 14px; opacity: 0.85;">Order #${data.orderNumber}</p>
          </div>
          <div class="content">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #E2E8F0; padding-bottom: 12px;">
              <span style="font-size: 13px; color: #64748B;">Received: <strong>${formattedDate}</strong></span>
              <span style="font-size: 13px; color: #64748B;">Internal ID: <code>${data.orderId}</code></span>
            </div>

            <div class="section-title">Customer Details</div>
            <table class="info-table">
              <tr>
                <td class="info-label">Full Name:</td>
                <td class="info-val">${data.customerName}</td>
              </tr>
              <tr>
                <td class="info-label">Phone / WhatsApp:</td>
                <td class="info-val"><a href="tel:${data.customerPhone}">${data.customerPhone}</a></td>
              </tr>
              <tr>
                <td class="info-label">Email:</td>
                <td class="info-val"><a href="mailto:${data.customerEmail}">${data.customerEmail}</a></td>
              </tr>
              <tr>
                <td class="info-label">Location:</td>
                <td class="info-val">${data.city}, ${data.state}, ${data.country}</td>
              </tr>
              ${
                data.companyName
                  ? `<tr><td class="info-label">Company:</td><td class="info-val">${data.companyName}</td></tr>`
                  : ""
              }
              ${
                data.websiteUrl
                  ? `<tr><td class="info-label">Existing Website:</td><td class="info-val"><a href="${data.websiteUrl}">${data.websiteUrl}</a></td></tr>`
                  : ""
              }
            </table>

            <div class="section-title">Enquired Services</div>
            <table class="items-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th style="text-align: center;">Qty</th>
                  <th style="text-align: right;">Unit Price</th>
                  <th style="text-align: right;">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div class="total-box">
              <span style="color: #64748B; font-size: 14px;">Total Order Value: </span>
              <span class="total-amount">₹${data.total.toLocaleString("en-IN")}</span>
            </div>

            ${
              data.requirements
                ? `
              <div class="section-title">Customer Requirements & Notes</div>
              <div class="requirements-box">
                ${data.requirements.replace(/\n/g, "<br>")}
              </div>
            `
                : ""
            }

            <div style="margin-top: 24px; padding: 12px; background: #F8FAFC; border-radius: 6px; font-size: 12px; color: #64748B;">
              <strong>Consent:</strong> Customer agreed to be contacted regarding this enquiry.<br>
              <strong>Status:</strong> NEW (Enquiry logged in database; WhatsApp click-to-chat link dispatched to customer).
            </div>
          </div>
          <div class="footer">
            RyxerMart Commerce Platform &copy; ${new Date().getFullYear()} RyxerMart. Confidential business notice.
          </div>
        </div>
      </body>
    </html>
  `;

  if (!transporter) {
    const errorMsg = "SMTP transporter not configured in environment variables";
    console.warn(`[Email Notification Skipped]: ${errorMsg}`);
    await db.order.update({
      where: { id: data.orderId },
      data: {
        emailStatus: "FAILED",
        emailError: errorMsg,
      },
    });
    return { success: false, error: errorMsg };
  }

  try {
    await transporter.sendMail({
      from: fromEmail,
      to: adminEmail,
      subject: `[New RyxerMart Order] #${data.orderNumber} - ${data.customerName} (₹${data.total.toLocaleString("en-IN")})`,
      html: htmlContent,
    });

    await db.order.update({
      where: { id: data.orderId },
      data: {
        emailStatus: "SENT",
        emailError: null,
      },
    });

    return { success: true };
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Unknown email failure";
    console.error("[Email Notification Failed]:", error);

    await db.order.update({
      where: { id: data.orderId },
      data: {
        emailStatus: "FAILED",
        emailError: errorMsg,
      },
    });

    return { success: false, error: errorMsg };
  }
}

/**
 * Retries sending the email for a failed order
 */
export async function retryFailedOrderEmail(
  orderId: string
): Promise<{ success: boolean; error?: string }> {
  const order = await db.order.findUnique({
    where: { id: orderId },
    include: {
      customer: true,
      items: true,
    },
  });

  if (!order) {
    return { success: false, error: "Order not found" };
  }

  return sendNewOrderEmail({
    orderId: order.id,
    orderNumber: order.orderNumber,
    customerName: order.customer.fullName,
    customerPhone: order.customer.phone,
    customerEmail: order.customer.email,
    city: order.customer.city,
    state: order.customer.state,
    country: order.customer.country,
    companyName: order.customer.companyName,
    websiteUrl: order.customer.websiteUrl,
    items: order.items,
    subtotal: order.subtotal,
    discount: order.discount,
    total: order.total,
    requirements: order.requirements,
    createdAt: order.createdAt,
  });
}
