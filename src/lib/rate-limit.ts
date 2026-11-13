/**
 * Minimal fixed-window rate limiter, keyed by client IP.
 *
 * /api/chat calls a paid LLM (Groq) for anonymous visitors, so one script
 * looping on it costs real money. This keeps a per-IP count in memory. On
 * Vercel each serverless instance has its own memory, so the limit is
 * best-effort (per instance), which is enough to stop a single looping
 * client without adding a datastore.
 */

type Window = { count: number; resetAt: number };

const windows = new Map<string, Window>();
const MAX_TRACKED_KEYS = 10_000;

export type RateLimitResult =
  | { ok: true; remaining: number }
  | { ok: false; retryAfterSeconds: number };

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
  now: number = Date.now(),
): RateLimitResult {
  let entry = windows.get(key);
  if (!entry || entry.resetAt <= now) {
    if (windows.size >= MAX_TRACKED_KEYS) pruneExpired(now);
    entry = { count: 0, resetAt: now + windowMs };
    windows.set(key, entry);
  }
  entry.count += 1;
  if (entry.count > limit) {
    return {
      ok: false,
      retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }
  return { ok: true, remaining: limit - entry.count };
}

function pruneExpired(now: number) {
  for (const [key, entry] of windows) {
    if (entry.resetAt <= now) windows.delete(key);
  }
  // Still full (a flood of distinct IPs): start over rather than grow forever.
  if (windows.size >= MAX_TRACKED_KEYS) windows.clear();
}

/** First address in x-forwarded-for (set by Vercel), else x-real-ip. */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip")?.trim() || "unknown";
}

/** Test helper. */
export function resetRateLimits() {
  windows.clear();
}
