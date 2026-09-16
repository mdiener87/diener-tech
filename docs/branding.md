# Website branding review

Source: `C:\Users\nullv\OneDrive\Documents\Projects\DienerTech\Branding` (September 2026). Only the top-level SVG logo and monogram were used; `Legacy` was excluded. Source files remain unchanged.

## Applied

- Header and footer: the supplied logo geometry, with tighter SVG canvas spacing for navigation. Removed the previous rotating accent colors and alternate text wordmark.
- Company card: the DT monogram replaces the generic building icon.
- Browser and device icons: SVG, multi-resolution ICO, 16/32px PNGs, Apple touch icon, and 192/512px launcher icons. The navy tile and subtle border work on either browser theme. Existing WebP versions were refreshed too.
- Social sharing: artwork with an editable 1200 × 630 SVG source and PNG master uses the homepage headline and existing author description. The WebP export is the shared SEO default, the website project artwork, and the project-card fallback. Explicit article images still take precedence.
- Theme control: blue sun/moon icons and an accessible label describing the next mode.
- Manifest: supplied the missing website name and connected the icon manifest in the page head. It uses browser display mode; this site does not provide an offline app experience.

## Color and usage guide

| Surface | Main lettering | Blue | Teal |
| --- | --- | --- | --- |
| Light | `#0f172a` | `#2563eb` | `#0f766e` |
| Dark | `#f4f7fb` | `#60a5fa` | `#5eead4` |

The dark-surface colors come from the supplied SVG. The light-surface version is a website adaptation, preserving every path and deepening the accents for contrast. Asset suffixes describe the **background**: `on-light` and `on-dark`.

Use `BrandLogo` inside a named link or beside visible identifying text; its duplicate theme images are decorative to screen readers. Both images are rendered on the server and CSS selects one from the site's theme class, so a saved website preference takes precedence over the operating system. No image filter or client-only logo is needed.

The header opts into `BrandLogo`’s `interactive` prop: hovering or focusing the home link draws a blue/teal line with a brief traveling signal beneath the logo. It plays once per interaction, preserves the supplied artwork, and becomes a static line for reduced-motion preferences. The footer keeps the static version. The homepage and shared social artwork now use “Welcome to DienerTech.”

Keep logos proportional and preserve their SVG padding. Use the monogram for square or compact placements. Use the fixed navy tile for contexts that cannot follow the website theme, such as bookmarks and social sharing. The original monochrome SVGs remain available in the source directory if a future one-color placement needs them.

Regenerate PNG/WebP/ICO assets and the social image with:

```sh
node scripts/dev-utils/generate-brand-assets.mjs
```

This uses Sharp from the existing image dependency and `exiftool`, also required by the repository's image metadata hook. The four logo/monogram SVGs in `public/branding` are the web masters; edit those to change the shapes or colors. The generator owns the social SVG's layout and text.

## Useful content still to add

1. **Page-specific sharing artwork.** The new default covers missing artwork. Dedicated cards for VectorXR, SparkNet, and major essays would describe those destinations more clearly. “Starting an AI Engineering Team” uses its dedicated WebP title image.
2. **A fuller brand guide.** This document supplies website color and placement rules. Confirm preferred typography, formal minimum sizes/clear space, approved light-background colors, and whether a tagline should be part of the broader identity.
3. **Fresh product and project media.** A current website screenshot and curated light/dark VectorXR screenshots or a short captioned walkthrough would add more useful context than additional decorative logos. Existing product identities and editorial images retain their own artwork.

The rendered logo sheet, avatar, video openers, and audio signature are available in the source folder. They were not added to the page payload: the SVGs are small and crisp, the homepage already has a personal portrait, and video and audio would be better suited to a deliberate product demo. No new factual claims or testimonials were invented.

## Validation

Follow-up website tuning: production build and content/feed tests passed. Chromium checks covered the homepage, blog, and Subscribe page at 320, 390, 768, and 1440px in both themes, with no horizontal overflow or page JavaScript exceptions. Checks also covered dropdown clicks and keyboard/Escape behavior, mobile navigation, logo hover and reduced motion, technology categories and shuffle, search examples and empty results, native email validation, and the RSS response. The Buttondown form destination was verified without submitting a subscription.

- Production build passed (`npm run build`).
- Chromium checks passed on localhost:3000 at 320, 390, 768, and 1440px in both themes: logo loading, no horizontal overflow, manual theme toggle and persistence after reload, saved preference overriding the opposite OS theme, mobile navigation to the company monogram, social metadata, and icon/manifest URLs. No page JavaScript exceptions were recorded.
- Light logo colors measure 17.85:1, 5.17:1, and 5.47:1 against white; dark logo colors measure 16.61:1, 7.02:1, and 12.07:1 against navy.
- All 173 public images passed the repository metadata validator. `git diff --check` passed.

Preview limitation: the existing Nuxt/IPX image pipeline returns HTTP 500 for the profile photo, VectorXR screenshot, and mountain photo on localhost:3000. The response reports that `sharp-linux-x64.node` did not self-register. The source images exist; this is a local image-processing runtime issue, not missing branding content. It also affects project-card images served through NuxtImg. Direct branding SVG/PNG and favicon requests pass. The dependency/runtime issue was left outside this branding change.
