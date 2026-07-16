# KRATOR ATTACHMENTS Project Instructions

## Project Identity

- Brand: KRATOR ATTACHMENTS
- Industry: excavator attachments manufacturer and B2B export supplier
- Primary market: international B2B
- Target customers: global distributors, construction equipment dealers, rental companies, contractors, demolition companies, and procurement buyers
- Website goal: generate qualified inquiries through WhatsApp, email, and quote forms
- Official domain: `https://www.kratorattachments.com/`

## Positioning

Present KRATOR as a premium industrial manufacturer and practical attachment-matching partner. Content and design must feel specific, technically grounded, export-ready, and trustworthy. Do not create generic AI copy, vague factory claims, fake proof, or thin pages.

## Project Architecture

- The website is static HTML, CSS, and JavaScript; there is no frontend framework.
- English source pages live at the project root and in route directories such as `products/`, `blog/`, and `about-us/`.
- Locale directories are `es/`, `pt/`, `fr/`, `ru/`, and `ar/`.
- Shared styles and scripts are `assets/styles.css` and `assets/main.js`.
- Product data and generators live in `src/data/` and `scripts/`; inspect them before changing repeated product output.
- `scripts/build.mjs` recreates `dist/`. Never edit `dist/` as source.
- The build copies root `images/` into `dist/images/`. Files under `public/images/` are not copied by the current build unless another process synchronizes them.

## Project Workflows

Reusable workflows live under `.codex/skills/`:

- `01-website-audit`
- `02-seo-content-writer`
- `03-geo-ai-search-optimizer`
- `04-b2b-product-page-builder`
- `05-frontend-design-system`
- `06-image-optimization`
- `07-conversion-rate-optimizer`
- `08-multilingual-localization`
- `09-content-cluster-builder`
- `10-competitor-intelligence`
- `11-seo-autopilot`

The repo-discoverable dispatcher is `.agents/skills/krator-workflows/SKILL.md`. Read the smallest relevant workflow before substantial work.

Supporting standards:

- `docs/brand-guideline.md`
- `docs/seo-strategy.md`
- `docs/product-page-standard.md`
- `docs/geo-ai-optimization.md`
- `docs/seo-operating-system.md`
- `docs/website-improvement-roadmap.md`

## Authorization and Scope

- Do not deploy unless the user explicitly confirms deployment.
- Do not push unless the user explicitly confirms push.
- For audit or diagnosis requests, inspect and report; do not implement fixes unless requested.
- Recurring SEO operations, cluster plans, and competitor research default to read-only recommendations.
- Keep changes scoped. Do not redesign, rewrite, or refactor unrelated pages.
- Preserve existing user changes and do not regenerate broad page sets without confirming the source and blast radius.
- Do not publish uncontrolled batches of pages or articles. Confirm intent ownership and cannibalization before creating a URL.
- Use only public competitor information, record sources, and never copy competitor content, tables, images, or page structures.
- Do not fabricate business facts, statistics, certifications, customers, factory data, reviews, rankings, or competitor performance claims.

## Development Priorities

1. Preserve factual accuracy and qualified lead quality.
2. Protect crawlability, indexation, metadata, canonical URLs, and internal links.
3. Improve AI-search visibility with clear entities, answer-ready passages, and verifiable proof.
4. Maintain premium manufacturer positioning and mobile usability.
5. Keep builds deterministic and verify source-to-`dist` behavior.

## SEO Rules

Every indexable page should include:

- A unique, useful SEO title
- A useful meta description
- One clear H1 and structured H2/H3 headings
- Contextual internal links
- Accurate image ALT text
- A visible FAQ when it serves genuine buyer questions
- A canonical URL consistent with the route

Avoid doorway pages, keyword stuffing, near-duplicate subtype copy, and unsupported superlatives. Product pages and blog articles must connect in both directions where relevant.

## GEO and AI Search Rules

- Use the stable entity name `KRATOR ATTACHMENTS` and consistent company/contact facts.
- Answer the buyer's main question early, then support it with specifications, selection criteria, process, and proof.
- Make claims easy to verify from visible page content.
- Maintain `llms.txt` as a secondary discovery aid, not a substitute for crawlable HTML and internal links.
- Do not promise inclusion in Google AI Overviews, ChatGPT, Perplexity, Gemini, or any other answer engine.

## Structured Data Policy

Allowed under the current policy:

- `Organization`
- `WebSite`
- `WebPage`
- `AboutPage` for the canonical company profile
- `CollectionPage` and `ItemList` for a visible resource collection
- `BreadcrumbList`
- `BlogPosting` or `Article` for blog pages
- `Product` on a real product page, using only visible and verified fields
- One `FAQPage` when the same questions and complete answers are visible on the page
- Supporting `Brand`, `ImageObject`, `PropertyValue`, and `WebPageElement` nodes when they describe visible, verified content

Do not add without verified public source data:

- `Offer`
- `Review`
- `AggregateRating`

Each product page must contain exactly one canonical-aligned `Product` node. Product lists and non-product pages must not contain `Product`. A quote-only Product without a real Offer, Review, or AggregateRating is useful entity markup but is not eligible for Google's Product snippet; do not fabricate those properties to obtain eligibility. Keep `FAQPage` only when visible-content parity is exact, and remove duplicate nodes. Structured data must parse as JSON and must never contain invented price, stock, rating, certification, or review data.

## Product Page Rules

- Follow `docs/product-page-standard.md`.
- Concrete products need real multi-model technical specification tables.
- Custom attachments may use project-based specification logic, but must state the inputs needed for engineering confirmation.
- Do not replace verified tables with vague language such as "data available on request."
- Machine matching should consider excavator model, operating weight, pin diameter, arm width, center distance, hydraulic flow, pressure, and job conditions as relevant.

## Blog Rules

Desktop articles use a hero, article body, and visible right sidebar. Mobile uses one column with a near-top table of contents. Keep related products, visible FAQ, related articles, and the bottom CTA after the article. FAQ accordions may remain closed by default; keep one `FAQPage` node only when its questions and answers exactly match those visible accordions.

Every article should link to relevant product pages. Product pages should link back to useful guides. Never link to nonexistent or temporary routes.

## Image Rules

- Deployable public URLs use `/images/...`; the matching source must exist under root `images/...` for the current build.
- Use lowercase ASCII filenames with hyphens, no spaces, no Chinese characters, and the real file extension.
- Prefer WebP for suitable photographs and rendered graphics.
- Use real industrial product, factory, inspection, packing, and jobsite imagery. Avoid cartoon or generic AI-looking visuals.
- Add meaningful ALT text for informative images, empty ALT only for decorative images, and intrinsic width/height.
- Verify exact files in `dist/images/` and HTTP `Content-Type` after building.

## Multilingual Rules

- English is the primary indexable site.
- Spanish, Brazilian Portuguese, French, Russian, and Arabic remain `noindex` until the user explicitly changes the policy.
- Do not add noindex locale pages to the sitemap.
- Do not translate literally. Use professional industrial terminology and preserve model names, units, dimensions, and factual qualifiers.
- Arabic pages require `dir="rtl"` and visual checks for mixed Latin model names and numbers.
- Do not change robots, sitemap, canonical, hreflang, or multilingual indexation policy unless specifically requested.

## Design Rules

- Dark industrial style, real factory feeling, high trust, professional engineering brand.
- Core palette: dark navy, engineering yellow, steel gray, white.
- Avoid startup SaaS styling, excessive gradients, cartoon imagery, decorative glass effects, and unverified badges.
- Maintain desktop/mobile content consistency, readable tables, accessible controls, and no horizontal overflow.
- Do not change the header/footer structure or unrelated page layout unless requested.

## Conversion Rules

Primary actions are `Get Quote` and `WhatsApp Us`. Quote paths should request only useful qualification data such as excavator model, operating weight, attachment type, hydraulic flow, pressure, mounting dimensions, working condition, quantity, and destination.

Do not use fake urgency, fake scarcity, invented testimonials, or misleading manufacturer claims.

## Verification

Before reporting a completed implementation:

1. Run `npm run build`.
2. Run `node .codex/skills/01-website-audit/scripts/audit-site.mjs --root dist` for broad changes.
3. Start local preview and verify affected routes and direct assets.
4. Check status, MIME type, images, internal links, metadata, schema, forms, and mobile overflow as relevant.
5. Confirm there is no hardcoded `localhost` or `127.0.0.1` in source or build output.
6. Report changed files, build result, preview URL, and any checks not run.

Never deploy or push as part of verification without explicit user approval.
