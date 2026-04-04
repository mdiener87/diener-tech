import type { H3Event } from "h3";
import { RateLimiter } from "~/utils/rateLimit";
import { normalizePostPath, removeLike } from "~/server/utils/likes";

export default defineEventHandler(async (event: H3Event) => {
  const postPath = normalizePostPath(event.context.params?.slug);
  if (!postPath) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid blog post path",
    });
  }

  const kvStorage = useStorage("kv");
  if (kvStorage) {
    const rateLimiter = new RateLimiter(kvStorage, {
      maxAttempts: 12,
      windowSeconds: 60,
    });
    const ip = getRequestIP(event, { xForwardedFor: true }) || "unknown";
    const isLimited = await rateLimiter.isRateLimited(ip);
    if (isLimited) {
      throw createError({
        statusCode: 429,
        statusMessage: "Too many like attempts. Please try again shortly.",
      });
    }
  }

  return removeLike(event, postPath);
});
