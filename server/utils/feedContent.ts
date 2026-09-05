interface ContentNode {
  type?: string;
  tag?: string;
  value?: string;
  props?: Record<string, unknown>;
  children?: ContentNode[];
}
const siteUrl = "https://diener.tech";
const escape = (value: unknown) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!,
  );
const allowedTags = new Set([
  "p",
  "a",
  "strong",
  "em",
  "b",
  "i",
  "s",
  "del",
  "blockquote",
  "code",
  "pre",
  "ul",
  "ol",
  "li",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "figure",
  "figcaption",
  "br",
  "hr",
  "span",
  "div",
  "sup",
  "sub",
]);

function absoluteUrl(value: unknown, postPath: string, image = false): string {
  if (typeof value !== "string" || !value.trim()) return "";
  let path = value.trim();
  if (image && !/^(?:[a-z]+:|\/)/i.test(path))
    path = `/images/blog/${postPath.split("/").pop()}/${path}`;
  const url = new URL(path, `${siteUrl}${postPath}`);
  if (
    !["https:", "http:", ...(image ? [] : ["mailto:"])].includes(url.protocol)
  )
    return "";
  if (!image && url.origin === siteUrl)
    url.pathname = url.pathname.replace(/\.md$/, "");
  return url.href;
}

/** Serialize Nuxt Content's nested AST into portable HTML for feed readers. */
export function serializeContent(
  content: ContentNode | string | undefined,
  postPath: string,
): string {
  if (!content) return "";
  if (typeof content === "string") return escape(content);
  function render(node: ContentNode): string {
    if (node.type === "text") return escape(node.value);
    const tag = (node.tag || "").toLowerCase();
    if (["script", "style", "iframe"].includes(tag)) return "";
    const props = node.props || {};
    const children = (node.children || []).map(render).join("");
    if (tag === "img" || tag === "blog-image" || tag === "blogimage") {
      const src = absoluteUrl(props.src, postPath, true);
      if (!src) return children;
      return `<figure><img src="${escape(src)}" alt="${escape(props.alt)}">${props.caption ? `<figcaption>${escape(props.caption)}</figcaption>` : ""}</figure>`;
    }
    if (!tag) return children;
    if (!allowedTags.has(tag)) {
      return (
        children ||
        `<p><a href="${escape(siteUrl + postPath)}">View this interactive component in the full article.</a></p>`
      );
    }
    let attrs = "";
    if (props.id) attrs += ` id="${escape(props.id)}"`;
    if (tag === "a") {
      const href = absoluteUrl(props.href, postPath);
      if (href) attrs += ` href="${escape(href)}"`;
    }
    if (tag === "ol" && props.start) attrs += ` start="${escape(props.start)}"`;
    if (tag === "td" || tag === "th") {
      for (const attr of ["colspan", "rowspan"])
        if (props[attr]) attrs += ` ${attr}="${escape(props[attr])}"`;
    }
    if (tag === "br" || tag === "hr") return `<${tag}${attrs}>`;
    return `<${tag}${attrs}>${children}</${tag}>`;
  }
  return render(content);
}
