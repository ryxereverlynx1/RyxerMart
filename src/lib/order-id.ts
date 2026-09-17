import crypto from "crypto";

/**
 * Generates a human-readable unique order number.
 * Format: RXM-YYYYMMDD-XXXX (e.g. RXM-20260917-A8F2)
 */
export function generateOrderNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const randomSuffix = crypto.randomBytes(2).toString("hex").toUpperCase();

  return `RXM-${year}${month}${day}-${randomSuffix}`;
}
