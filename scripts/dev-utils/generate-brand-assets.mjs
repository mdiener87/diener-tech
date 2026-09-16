// Run from the repository root: node scripts/dev-utils/generate-brand-assets.mjs
// Sharp is supplied by the site's existing @nuxt/image dependency.
import { readFile, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import sharp from "sharp";

const root = new URL("../../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");
const write = (path, data) => writeFile(new URL(path, root), data);
const paths = (svg) => svg.slice(svg.indexOf(">") + 1, svg.lastIndexOf("</svg>"));
const monogram = paths(await read("public/branding/dienertech-monogram-on-dark.svg"));
const logo = paths(await read("public/branding/dienertech-logo-on-dark.svg"));

// A permanent navy tile keeps the mark legible on light and dark browser chrome.
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect x="1" y="1" width="62" height="62" rx="13" fill="#0f172a" stroke="#64748b" stroke-width="2"/>
  <svg x="9" y="9" width="46" height="46" viewBox="-4.881139998435974 -1.09 2.173 2.173">${monogram}</svg>
</svg>\n`;
await write("public/favicon.svg", icon);
const sizes = [[16, "favicon-16x16"], [32, "favicon-32x32"], [180, "apple-touch-icon"], [192, "android-chrome-192x192"], [512, "android-chrome-512x512"]];
for (const [size, name] of sizes) {
  const rendered = sharp(Buffer.from(icon)).resize(size, size);
  if (size >= 180) rendered.flatten({ background: "#0f172a" });
  await rendered.clone().png().toFile(new URL(`public/${name}.png`, root).pathname);
  await rendered.webp({ lossless: true }).toFile(new URL(`public/${name}.webp`, root).pathname);
}

// ICO supports PNG payloads; include three resolutions for desktop browsers.
const frames = await Promise.all([16, 32, 48].map((size) => sharp(Buffer.from(icon)).resize(size, size).png().toBuffer()));
const directory = Buffer.alloc(6 + frames.length * 16);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(frames.length, 4);
let offset = directory.length;
frames.forEach((frame, i) => {
  const entry = 6 + i * 16;
  directory[entry] = directory[entry + 1] = [16, 32, 48][i];
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(frame.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += frame.length;
});
await write("public/favicon.ico", Buffer.concat([directory, ...frames]));

// Editable vector source, PNG master, and WebP used by the site.
const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs><linearGradient id="surface" x2="1" y2="1"><stop stop-color="#172640"/><stop offset="1" stop-color="#0f172a"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#surface)"/>
  <path d="M900 0V630M1000 0V630M1100 0V630M850 115H1200M850 215H1200M850 315H1200M850 415H1200M850 515H1200" stroke="#24364f" fill="none"/>
  <path d="M80 64H160" stroke="#5eead4" stroke-width="6"/>
  <svg x="68" y="100" width="700" height="156" viewBox="-4.9 -1.09 9.8 2.173">${logo}</svg>
  <g font-family="DejaVu Sans, sans-serif">
    <text x="80" y="343" fill="#f4f7fb" font-size="48" font-weight="700">Welcome to</text>
    <text x="80" y="406" fill="#60a5fa" font-size="48" font-weight="700">DienerTech.</text>
    <text x="80" y="497" fill="#cbd5e1" font-size="25">Michael Diener / AI engineer &amp; builder</text>
    <text x="80" y="565" fill="#5eead4" font-size="22">diener.tech</text>
  </g>
</svg>\n`;
await write("public/branding/dienertech-social.svg", social);
await sharp(Buffer.from(social)).png().toFile(new URL("public/branding/dienertech-social.png", root).pathname);
await sharp(Buffer.from(social)).webp({ quality: 80 }).toFile(new URL("public/branding/dienertech-social.webp", root).pathname);
// Match the repository's image metadata policy (exiftool is also used by its
// pre-commit hook). SVG rendering otherwise adds PNG resolution metadata.
execFileSync("exiftool", ["-all=", "-overwrite_original",
  ...sizes.map(([, name]) => new URL(`public/${name}.png`, root).pathname),
  new URL("public/branding/dienertech-social.png", root).pathname,
]);
console.log("Generated favicons, launcher icons, and the 1200 × 630 social image.");
