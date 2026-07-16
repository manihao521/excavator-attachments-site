# KRATOR Blog Publishing Workflow

## Phase 1 Architecture

KRATOR blog articles remain standalone static HTML files:

```text
blog/<slug>/index.html
```

Each article HTML file remains the source of truth for its body, title, meta description, canonical, Open Graph metadata, BlogPosting, BreadcrumbList, FAQPage, visible FAQ, sidebar, Related Products, Related Articles, CTA, image paths, DOM classes, and visual layout.

The Phase 1 metadata source is `src/data/blog-posts.json`. It controls only:

- Blog listing cards
- Card category and filter tags
- Card image, ALT text, excerpt, and verified reading time
- Listed and featured status
- CollectionPage related links and ItemList
- English blog article entries in `sitemap.xml`

Do not manually edit the generated regions in `blog/index.html` or the generated English article region in `sitemap.xml`.

The separate Buyer Tools module remains a manually curated utility section during Phase 1. It is not counted as the canonical 17-card generated listing, and every linked article must still exist in the manifest.

## Publish One Article

1. Confirm URL ownership and cannibalization risk before creating a new route.
2. Create `blog/<slug>/index.html` using an existing approved KRATOR blog article structure.
3. Add deployable images under root `images/` using lowercase ASCII filenames and real extensions.
4. Add one manually reviewed record to `src/data/blog-posts.json`.
5. Run `npm run blog:generate`.
6. Run `npm run blog:audit`.
7. Run the normal build with `npm run build`.
8. Audit the fresh `dist/` and review the article, blog listing, filters, assets, console, and mobile layout in local preview.
9. Deploy only after explicit approval. Push requires separate explicit approval.

## Manifest Rules

- Keep `id` equal to the stable lowercase slug.
- Use the exact production canonical URL.
- Extract title, description, dates, author, images, and related links from the approved article HTML whenever possible.
- Never invent dates, categories, reading time, technical claims, certifications, customers, or business facts.
- Set `dateReviewRequired: true` when a publication date cannot be verified.
- Set `listed: false` only with an explicit editorial, redirect, noindex, or duplicate-content reason.
- Set `sitemap: false` for redirect sources, noindex pages, duplicate URLs, or other explicitly excluded pages.
- Use only filter tags supported by the blog filter controls.

## Commands

```bash
npm run blog:extract
npm run blog:generate
npm run blog:audit
npm run build
```

`blog:extract` is read-only. It prints candidate metadata from the current article HTML, listing, and sitemap. It never overwrites the reviewed manifest.

`blog:generate` validates the manifest before updating only marked regions in `blog/index.html` and `sitemap.xml`.

`blog:audit` fails when article HTML, manifest records, visible cards, CollectionPage ItemList, filters, images, or sitemap URLs lose parity.

## Approval Gates

- Article facts and images require subject-matter approval.
- A new URL requires intent and cannibalization approval.
- Article HTML and manifest changes require file-change approval.
- Preview and regression checks are required before publication.
- Deployment and push are separate explicit approvals.

## Phase 2 Option

Phase 2 may introduce a controlled template that generates only new article HTML. Existing articles should remain untouched until one article at a time passes DOM, metadata, schema, internal-link, screenshot, mobile, and SHA baseline review.

Do not batch-convert existing article bodies to Markdown. A future Markdown layer should support KRATOR tables, technical cards, images, FAQ parity, Related Products, Related Articles, sidebars, and CTAs without changing current URLs or design.
