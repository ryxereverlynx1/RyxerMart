import { PrismaClient } from "@prisma/client";

function cleanDatabaseUrl(url?: string): string | undefined {
  if (!url) return url;
  let cleaned = url.trim().replace(/^["']|["']$/g, "");
  if (!cleaned.includes("connect_timeout=")) {
    const sep = cleaned.includes("?") ? "&" : "?";
    cleaned = `${cleaned}${sep}connect_timeout=15`;
  }
  return cleaned;
}

function deriveDirectUrl(url?: string): string | undefined {
  if (!url) return url;
  let cleaned = url.trim().replace(/^["']|["']$/g, "");
  // For Neon: replace -pooler. with . and strip channel_binding which direct postgres does not need
  if (cleaned.includes("-pooler.")) {
    cleaned = cleaned
      .replace(/-pooler\./, ".")
      .replace(/channel_binding=[^&]+&?/g, "")
      .replace(/[?&]$/, "");
  }
  if (!cleaned.includes("connect_timeout=")) {
    const sep = cleaned.includes("?") ? "&" : "?";
    cleaned = `${cleaned}${sep}connect_timeout=15`;
  }
  return cleaned;
}

const rawPrimary =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL_UNPOOLED;

const rawUnpooled =
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.POSTGRES_URL_NON_POOLING ||
  deriveDirectUrl(rawPrimary);

const primaryUrl = cleanDatabaseUrl(rawPrimary);
const unpooledUrl = cleanDatabaseUrl(rawUnpooled);

if (primaryUrl && !process.env.DATABASE_URL) {
  process.env.DATABASE_URL = primaryUrl;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  prismaDirect: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: primaryUrl ? { db: { url: primaryUrl } } : undefined,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

export const unpooledDb =
  globalForPrisma.prismaDirect ??
  new PrismaClient({
    datasources: unpooledUrl ? { db: { url: unpooledUrl } } : undefined,
    log: ["error"],
  });

globalForPrisma.prisma = db;
globalForPrisma.prismaDirect = unpooledDb;

/**
 * Executes a database operation with automatic failover to the direct unpooled
 * connection if the pooled connection experiences latency or PgBouncer errors.
 */
export async function runWithDbFallback<T>(
  action: (client: PrismaClient) => Promise<T>
): Promise<T> {
  try {
    return await action(db);
  } catch (primaryErr) {
    console.warn("[Database Notice] Primary connection attempt failed, switching to direct unpooled connection:", primaryErr);
    try {
      return await action(unpooledDb);
    } catch (fallbackErr) {
      console.error("[Database Error] Direct fallback connection also failed:", fallbackErr);
      throw fallbackErr;
    }
  }
}

