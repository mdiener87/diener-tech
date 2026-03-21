import type { H3Event } from "h3";
import { getLikeStatus, normalizePostPath } from "~/server/utils/likes";

export default defineEventHandler(async (event: H3Event) => {
  const postPath = normalizePostPath(event.context.params?.slug);
  if (!postPath) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid blog post path",
    });
  }

  return getLikeStatus(event, postPath);
});
