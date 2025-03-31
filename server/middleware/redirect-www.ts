import { defineEventHandler, sendRedirect } from "h3";

export default defineEventHandler((event) => {
  const host = event.node.req.headers.host;

  if (host && host.startsWith("www.")) {
    const url = new URL(
      `https://${host.replace(/^www\./, "")}${event.node.req.url}`
    );
    return sendRedirect(event, url.toString(), 301);
  }
});
