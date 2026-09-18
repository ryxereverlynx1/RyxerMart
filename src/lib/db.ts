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

const FALLBACK_NEON_DATABASE_URL =
  "postgresql://neondb_owner:npg_6jP9pdCnUHfB@ep-purple-forest-aw70ebcf-pooler.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require&connect_timeout=15";

const FALLBACK_NEON_DIRECT_URL =
  "postgresql://neondb_owner:npg_6jP9pdCnUHfB@ep-purple-forest-aw70ebcf.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require";

function getValidString(val?: string): string | undefined {
  if (!val) return undefined;
  const trimmed = val.trim().replace(/^["']|["']$/g, "");
  return trimmed.length > 0 ? trimmed : undefined;
}

const rawPrimary =
  getValidString(process.env.DATABASE_URL) ||
  getValidString(process.env.POSTGRES_PRISMA_URL) ||
  getValidString(process.env.POSTGRES_URL) ||
  getValidString(process.env.DATABASE_URL_UNPOOLED) ||
  FALLBACK_NEON_DATABASE_URL;

const rawUnpooled =
  getValidString(process.env.DATABASE_URL_UNPOOLED) ||
  getValidString(process.env.POSTGRES_URL_NON_POOLING) ||
  deriveDirectUrl(rawPrimary) ||
  FALLBACK_NEON_DIRECT_URL;

const primaryUrl = cleanDatabaseUrl(rawPrimary) || FALLBACK_NEON_DATABASE_URL;
const unpooledUrl = cleanDatabaseUrl(rawUnpooled) || FALLBACK_NEON_DIRECT_URL;

// ALWAYS ensure process.env.DATABASE_URL has a valid connection string so Prisma schema validation never fails
process.env.DATABASE_URL = primaryUrl;
if (!getValidString(process.env.DATABASE_URL_UNPOOLED)) {
  process.env.DATABASE_URL_UNPOOLED = unpooledUrl;
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

