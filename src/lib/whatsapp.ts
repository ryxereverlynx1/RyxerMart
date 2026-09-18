export interface WhatsAppOrderData {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  city: string;
  state: string;
  items: Array<{
    serviceName: string;
    unitPrice: number;
    quantity: number;
    subtotal: number;
  }>;
  subtotal: number;
  total: number;
  requirements?: string | null;
}

/**
 * Formats order details into a clean, human-readable WhatsApp enquiry message.
 */
export function formatWhatsAppMessage(data: WhatsAppOrderData): string {
  const serviceLines = data.items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.serviceName}\n   Price: ₹${item.unitPrice.toLocaleString("en-IN")}\n   Quantity: ${item.quantity}`
    )
    .join("\n\n");

  const requirementsText = data.requirements?.trim()
    ? `\n\nAdditional Requirements:\n${data.requirements.trim()}`
    : "";

  return `Hello RyxerMart,

I would like to enquire about the following services:

Order ID: #${data.orderNumber}

Customer Details:
Name: ${data.customerName}
Phone: ${data.customerPhone}
Email: ${data.customerEmail}
City: ${data.city}
State: ${data.state}

Services:

${serviceLines}

Subtotal: ₹${data.subtotal.toLocaleString("en-IN")}
Total: ₹${data.total.toLocaleString("en-IN")}${requirementsText}

Please contact me regarding this order.

Thank you,
${data.customerName}`;
}

/**
 * Generates an official WhatsApp click-to-chat URL (wa.me)
 */
export function generateWhatsAppOrderLink(
  data: WhatsAppOrderData,
  businessNumberOverride?: string
): string {
  const rawNumber =
    businessNumberOverride || process.env.WHATSAPP_NUMBER || "917719421910";
  // Clean non-digits from phone number
  const cleanNumber = rawNumber.replace(/[^0-9]/g, "");
  const message = formatWhatsAppMessage(data);

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates a simple general WhatsApp contact link
 */
export function generateWhatsAppContactLink(
  message = "Hello RyxerMart, I would like to inquire about your website development services.",
  businessNumberOverride?: string
): string {
  const rawNumber =
    businessNumberOverride || process.env.WHATSAPP_NUMBER || "917719421910";
  const cleanNumber = rawNumber.replace(/[^0-9]/g, "");

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
