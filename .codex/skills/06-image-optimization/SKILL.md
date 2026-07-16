---
name: 06-image-optimization
description: Audit and optimize KRATOR website images for delivery, WebP conversion, file size, dimensions, SEO filenames, ALT text, responsive loading, and build inclusion. Use for broken images, oversized assets, new product photography, hero images, blog media, image-path migrations, and performance reviews.
---

# KRATOR Image Optimization

## Path Model

The current build copies root `images/` to `dist/images/`. Treat `images/` as the deploy source. `public/images/` may contain raw or staging files but is not copied by `scripts/build.mjs`; synchronize an approved asset into `images/` and verify `dist/` when the page uses `/images/...`.

## Workflow

1. Confirm the referenced filename, case, extension, query string behavior, and source file signature.
2. Use lowercase ASCII words separated by hyphens. Prefer `.webp` for suitable photographs and rendered graphics.
3. Preserve enough resolution for the rendered size, avoid upscaling, and keep text out of hero imagery unless it is necessary content.
4. Add accurate, concise ALT text for informative images; use empty ALT only for genuinely decorative images.
5. Add intrinsic `width` and `height`. Keep likely LCP imagery eager and high priority; lazy-load below-the-fold images.
6. Run the existing Sharp workflow only for configured inputs and review its output. Do not bulk-convert unrelated assets.
7. Run `npm run build`, verify the exact file in `dist/images/`, and check local HTTP status plus `Content-Type`.
8. Verify the image in every page location that references it, including cards, hero media, Open Graph, and JSON-LD.

Do not alter the subject, crop, color, logo, or embedded engineering information without explicit approval.
