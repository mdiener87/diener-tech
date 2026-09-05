import test from "node:test";
import assert from "node:assert/strict";
import { formatDate } from "../utils/dateFormatter.ts";
import { serializeContent } from "../server/utils/feedContent.ts";

test("publication dates stay on the same day across timezones", () => {
  const original = process.env.TZ;
  try {
    for (const zone of [
      "America/Denver",
      "Pacific/Honolulu",
      "Pacific/Kiritimati",
    ]) {
      process.env.TZ = zone;
      assert.equal(formatDate("2026-06-09"), "June 9, 2026");
      assert.equal(formatDate("2026-06-09T00:00:00.000Z"), "June 9, 2026");
    }
    assert.equal(formatDate(""), "");
    assert.equal(formatDate("invalid"), "");
  } finally {
    if (original === undefined) delete process.env.TZ;
    else process.env.TZ = original;
  }
});

test("feed preserves nested text, links, images, tables, and code", () => {
  const text = (value) => ({ type: "text", value });
  const el = (tag, children, props = {}) => ({
    type: "element",
    tag,
    children,
    props,
  });
  const ast = {
    type: "root",
    children: [
      el("p", [
        text("A "),
        el("strong", [text("useful")]),
        text(" "),
        el("a", [text("previous run")], { href: "scaling-sparknet.md" }),
      ]),
      el("blog-image", [], { src: "chart.webp", alt: "Loss & accuracy" }),
      el("table", [
        el("tbody", [el("tr", [el("td", [el("em", [text("60%")])])])]),
      ]),
      el("pre", [el("code", [text("x < 3 && y > 1")])]),
    ],
  };
  const html = serializeContent(ast, "/blog/the-eval-was-lying-to-me");
  assert.match(
    html,
    /A <strong>useful<\/strong> <a href="https:\/\/diener.tech\/blog\/scaling-sparknet">previous run<\/a>/,
  );
  assert.match(
    html,
    /src="https:\/\/diener.tech\/images\/blog\/the-eval-was-lying-to-me\/chart.webp" alt="Loss &amp; accuracy"/,
  );
  assert.match(html, /<td><em>60%<\/em><\/td>/);
  assert.match(html, /x &lt; 3 &amp;&amp; y &gt; 1/);
});

test("feed omits executable markup and supplies a link for interactive components", () => {
  const html = serializeContent(
    {
      children: [
        { tag: "script", children: [{ type: "text", value: "alert(1)" }] },
        {
          tag: "a",
          props: { href: "javascript:alert(1)" },
          children: [{ type: "text", value: "Text" }],
        },
        { tag: "acc-norm-benchmark-chart" },
      ],
    },
    "/blog/example",
  );
  assert.doesNotMatch(html, /javascript:|<script|alert/);
  assert.match(html, /href="https:\/\/diener.tech\/blog\/example"/);
});
