# KRATOR ATTACHMENTS Lightweight Cleanup Report

Date: 2026-06-12

## Scope

This cleanup followed `SITE_STRUCTURE.md` and `CONTENT_INVENTORY.md` and stayed intentionally conservative.

No homepage rebuild, visual redesign, image deletion, deployment change, SEO file change, or product data restructure was performed.

## What Changed

### 1. Core Frontend Comments

Updated `index.html` with lightweight HTML comments around core areas:

- Global header and Products mega menu
- Floating WhatsApp quick contact
- Homepage hero
- Featured Attachments product entry
- Dealer partner conversion block
- Formspree quote form
- Footer contact and QR code area

These comments are for maintenance only and do not affect rendering.

### 2. Safer JavaScript Organization

Updated `assets/main.js`:

- Added clear comments for mobile navigation, mega menu behavior, dealer CTA focus, and upload field handling.
- Wrapped legacy `data-popular-tab` logic in a guard so it only runs when old Popular Products markup exists.
- Renamed the repeated Popular Products query result to `legacyPopularTabs` to make its current status clear.

No interaction behavior was intentionally changed.

### 3. Marked Legacy Popular Products Styles

Updated `assets/styles.css`:

- Added a comment above the retained `.popular-section` styles.
- Marked the block as legacy because the current homepage uses Featured Attachments as the primary product entry.

The styles were not removed because older generated pages or future comparison work may still reference them.

### 4. Centralized Repeated CTA Labels in Maintenance Script

Updated `work/update-products.mjs`:

- Added a `CTA_LABELS` object for repeated button and link text such as:
  - `Get A Quote`
  - `Get Quote`
  - `Get Product Quote`
  - `View Details`
  - `View Types`
  - `Send Machine Info`
  - `Apply as Dealer`
  - `WhatsApp`
  - `Chat on WhatsApp`
- Updated the generator functions to use those constants in Header, mega menu, product cards, product pages, dealer block, and product detail CTAs.
- Added comments to clarify generator sections for Header, Footer, Products mega menu, Dealer block, Product category pages, Product detail pages, and Sitemap generation.

This does not directly alter the already-generated live HTML unless the generation script is run later.

## What Was Not Changed

- No image files were deleted or moved.
- No homepage layout, spacing, colors, image sizes, or visual CSS values were changed.
- No product categories, titles, specs, slugs, or page content were changed.
- No multilingual pages were edited.
- No Formspree endpoint was changed.
- No WhatsApp number, email, QR code, or conversion link was changed.
- No Cloudflare Pages workflow, `wrangler.toml`, `sitemap.xml`, `robots.txt`, or `llms.txt` was changed.
- No product pages were regenerated.

## Resource Notes

The following items were marked for review only. Nothing was deleted.

### Likely Duplicate Runtime Product Images

Both directories contain the same 11 product category images:

- `public/images/products/`
- `images/products/`

Current pages reference `/images/products/...`, while `work/update-products.mjs` keeps `public/images/products/` as the source and copies files into `images/products/`.

Recommendation: keep both for now. Later, decide whether `public/images/products/` is the source-of-truth upload folder and `images/products/` is the static runtime output.

### Legacy Popular Products Code

Found retained legacy assets/styles/logic:

- `.popular-section` styles in `assets/styles.css`
- `[data-popular-tab]` behavior in `assets/main.js`

Recommendation: keep until older generated pages and multilingual pages are audited. Remove only after confirming there are no live references.

### Unconfirmed Unused Icon

The file below appears in a processing script but was not found in current page markup:

- `assets/icons/quote/quote-confirm-pin-alt.png`

Recommendation: review visually before deletion. It may be a discarded variant from the quote-step icon updates.

### Work Directory Scripts

The `work/` directory contains local maintenance and asset-processing scripts. Some are one-off generation helpers.

Recommendation: do not delete during visual/product work. Later, move reusable scripts into a clearer `tools/` or `scripts/` directory and archive one-off processing scripts after confirmation.

## Risk Notes

Files that should be edited carefully:

- `index.html`: current homepage is hand-tuned and contains many visual modules.
- `assets/styles.css`: single global stylesheet controlling the entire site.
- `assets/main.js`: shared behavior for nav, legacy panels, dealer focus, and upload UI.
- `work/update-products.mjs`: generator for product pages and shared page fragments.
- `src/data/products.ts`: product taxonomy and content source.

Files safe for documentation-only updates:

- `PROJECT_CONTEXT.md`
- `SITE_STRUCTURE.md`
- `CONTENT_INVENTORY.md`
- `REBUILD_PLAN.md`
- `AGENTS.md`
- `CLEANUP_REPORT.md`

## Follow-Up Recommendations

1. Confirm whether `work/update-products.mjs` should become the official page generator or only a temporary migration script.
2. Decide one source-of-truth for product images and document the upload flow.
3. Audit multilingual pages for stale Popular Products markup before removing legacy JS/CSS.
4. Move reusable maintenance scripts from `work/` into a stable `scripts/` directory in a later cleanup pass.
5. Create a small shared content map for CTA labels, contact links, and WhatsApp message templates that can be used by both static HTML and generators.
6. After product structure is finalized, regenerate product category/detail pages from `src/data/products.ts` and verify sitemap aliases.

## Local Verification

- Confirmed `assets/main.js` still only handles navigation, legacy Popular Products tabs, dealer CTA focus, and upload field behavior.
- Confirmed `images/products/` and `public/images/products/` contain matching product image names.
- Confirmed `quote-confirm-pin-alt.png` is only referenced by a local processing script in the current search result.
- `git` is not available in the current PowerShell environment, so Git status/diff could not be run locally from this shell.
