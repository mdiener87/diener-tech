import type { ParsedContent } from "@nuxt/content";
import readingTime from "reading-time";

/**
 * Collects plain text from an MDC AST tree so reading-time can generate stats.
 */
function extractTextFromBody(body: ParsedContent["body"]): string {
  if (!body) {
    return "";
  }

  const parts: string[] = [];
  const walk = (node: any) => {
    if (!node) {
      return;
    }

    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }

    if (typeof node === "string") {
      parts.push(node);
      return;
    }

    if (typeof node.value === "string") {
      parts.push(node.value);
    }

    if (node.props) {
      const content =
        typeof node.props.content === "string"
          ? node.props.content
          : typeof node.props.text === "string"
            ? node.props.text
            : undefined;
      if (content) {
        parts.push(content);
      }
    }

    if (node.children) {
      walk(node.children);
    }
  };

  walk((body as any).children ?? body);

  return parts.join(" ");
}

function isBlogMarkdown(document: ParsedContent) {
  const rawPath =
    (document as any)._path ||
    (document as any)._file ||
    (document as any)._id ||
    "";
  const normalized =
    typeof rawPath === "string"
      ? rawPath
          .replace(/^content:/, "")
          .replace(/:/g, "/")
          .replace(/^\/+/, "")
      : "";

  return normalized.startsWith("blog/");
}

export default defineNitroPlugin((nitroApp) => {
  // Runs after Content has parsed the markdown.
  nitroApp.hooks.hook("content:file:afterParse", (document: ParsedContent) => {
    // Only process markdown blog posts.
    if (!isBlogMarkdown(document)) {
      return;
    }

    const text =
      typeof (document as any).text === "string" && (document as any).text
        ? (document as any).text
        : typeof document.body === "string"
          ? document.body
          : extractTextFromBody(document.body);

    if (!text) {
      return;
    }

    const stats = readingTime(text);
    const minutes = Math.max(1, Math.ceil(stats.minutes));

    document.readingTime = {
      ...stats,
      minutes,
      text: `${minutes} min read`,
    };
  });
});
