interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up stale entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of store.entries()) {
      if (now > value.resetAt) {
        store.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

/**
 * Basic in-memory rate limiter for public endpoints (Orders, Contact, Chatbot)
 * @param identifier IP or unique client key
 * @param limit Max requests allowed in window
 * @param windowMs Time window in milliseconds
 */
export function checkRateLimit(
  identifier: string,
  limit = 20,
  windowMs = 60 * 1000
): { success: boolean; remaining: number; reset: number } {
  const now = Date.now();
  const entry = store.get(identifier);

  if (!entry || now > entry.resetAt) {
    store.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    });
    return { success: true, remaining: limit - 1, reset: now + windowMs };
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0, reset: entry.resetAt };
  }

  entry.count += 1;
  return {
    success: true,
    remaining: limit - entry.count,
    reset: entry.resetAt,
  };
}
