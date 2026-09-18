import { PrismaClient } from "@prisma/client";

function cleanDatabaseUrl(url?: string): string | undefined {
  if (!url) return url;
  // Remove channel_binding parameter which causes connection drops on PgBouncer
  let cleaned = url.replace(/channel_binding=[^&]+&?/g, "").replace(/[?&]$/, "");
  // Ensure sufficient connect timeout for serverless database cold starts
  if (!cleaned.includes("connect_timeout=")) {
    const sep = cleaned.includes("?") ? "&" : "?";
    cleaned = `${cleaned}${sep}connect_timeout=15`;
  }
  return cleaned;
}

const cleanedUrl = cleanDatabaseUrl(process.env.DATABASE_URL);
if (cleanedUrl && process.env.DATABASE_URL !== cleanedUrl) {
  process.env.DATABASE_URL = cleanedUrl;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: cleanedUrl ? { db: { url: cleanedUrl } } : undefined,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

// Keep connection cached in global scope across hot reloads and serverless invocations
globalForPrisma.prisma = db;
