import type { H3Event } from "h3";

const VISITOR_COOKIE_NAME = "dt_visitor";
const LIKE_RATE_LIMIT_KEY = "likes-rate-limit";

export interface LikeStatus {
  count: number;
  liked: boolean;
  enabled: boolean;
}

interface LikeRow {
  like_count: number;
}

interface CloudflareContext {
  env?: {
    BLOG_LIKES_DB?: D1Database;
  };
}

export function getLikesDatabase(event: H3Event): D1Database | null {
  const legacyCloudflare = event.context.cloudflare as CloudflareContext | undefined;
  const moduleCloudflare = (
    event.context._platform as { cloudflare?: CloudflareContext } | undefined
  )?.cloudflare;

  return legacyCloudflare?.env?.BLOG_LIKES_DB
    ?? moduleCloudflare?.env?.BLOG_LIKES_DB
    ?? null;
}

export function normalizePostPath(rawSlug: string | string[] | undefined): string | null {
  if (!rawSlug) {
    return null;
  }

  const slug = Array.isArray(rawSlug) ? rawSlug.join("/") : rawSlug;
  const trimmed = slug.replace(/^\/+/, "").trim();
  if (!trimmed.startsWith("blog/")) {
    return null;
  }

  return `/${trimmed}`;
}

export function getLikeRateLimitKey(event: H3Event): string {
  const ip = getRequestIP(event, { xForwardedFor: true }) || "unknown";
  return `${LIKE_RATE_LIMIT_KEY}:${ip}`;
}

export async function getOrCreateVisitorId(event: H3Event): Promise<string> {
  const existing = getCookie(event, VISITOR_COOKIE_NAME);
  if (existing) {
    return existing;
  }

  const visitorId = crypto.randomUUID();
  setCookie(event, VISITOR_COOKIE_NAME, visitorId, {
    httpOnly: true,
    sameSite: "lax",
    secure: !process.dev,
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });
  return visitorId;
}

export async function getVisitorHash(event: H3Event): Promise<string> {
  const config = useRuntimeConfig();
  const visitorId = await getOrCreateVisitorId(event);
  const ip = getRequestIP(event, { xForwardedFor: true }) || "unknown";
  const userAgent = getHeader(event, "user-agent") || "unknown";
  const raw = `${visitorId}:${ip}:${userAgent}:${config.likesVisitorSalt}`;
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(raw)
  );

  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function getLikeStatus(
  event: H3Event,
  postPath: string
): Promise<LikeStatus> {
  const db = getLikesDatabase(event);
  if (!db) {
    return { count: 0, liked: false, enabled: false };
  }

  const visitorHash = await getVisitorHash(event);
  const [countResult, likedResult] = await Promise.all([
    db
      .prepare("SELECT like_count FROM post_likes WHERE post_path = ?1")
      .bind(postPath)
      .first<LikeRow>(),
    db
      .prepare(
        "SELECT 1 as liked FROM post_like_visitors WHERE post_path = ?1 AND visitor_hash = ?2"
      )
      .bind(postPath, visitorHash)
      .first<{ liked: number }>(),
  ]);

  return {
    count: countResult?.like_count ?? 0,
    liked: Boolean(likedResult?.liked),
    enabled: true,
  };
}

export async function addLike(
  event: H3Event,
  postPath: string
): Promise<LikeStatus> {
  const db = getLikesDatabase(event);
  if (!db) {
    throw createError({
      statusCode: 503,
      statusMessage: "Likes are not configured",
    });
  }

  const visitorHash = await getVisitorHash(event);
  const inserted = await db
    .prepare(
      `
        INSERT OR IGNORE INTO post_like_visitors (post_path, visitor_hash, created_at)
        VALUES (?1, ?2, ?3)
      `
    )
    .bind(postPath, visitorHash, new Date().toISOString())
    .run();

  const created = (inserted.meta.changes ?? 0) > 0;
  if (created) {
    await db
      .prepare(
        `
          INSERT INTO post_likes (post_path, like_count, updated_at)
          VALUES (?1, 1, ?2)
          ON CONFLICT(post_path) DO UPDATE SET
            like_count = like_count + 1,
            updated_at = excluded.updated_at
        `
      )
      .bind(postPath, new Date().toISOString())
      .run();
  }

  const status = await getLikeStatus(event, postPath);
  return {
    ...status,
    liked: true,
  };
}

export async function removeLike(
  event: H3Event,
  postPath: string
): Promise<LikeStatus> {
  const db = getLikesDatabase(event);
  if (!db) {
    throw createError({
      statusCode: 503,
      statusMessage: "Likes are not configured",
    });
  }

  const visitorHash = await getVisitorHash(event);
  const removed = await db
    .prepare(
      "DELETE FROM post_like_visitors WHERE post_path = ?1 AND visitor_hash = ?2"
    )
    .bind(postPath, visitorHash)
    .run();

  if ((removed.meta.changes ?? 0) > 0) {
    await db
      .prepare(
        `
          UPDATE post_likes
          SET like_count = MAX(like_count - 1, 0), updated_at = ?2
          WHERE post_path = ?1
        `
      )
      .bind(postPath, new Date().toISOString())
      .run();
  }

  const status = await getLikeStatus(event, postPath);
  return {
    ...status,
    liked: false,
  };
}
