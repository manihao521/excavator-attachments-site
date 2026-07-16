# KRATOR Website Improvement Roadmap

## Baseline

Audit date: 2026-07-10

Scope: local source, fresh `dist/` static analysis, and local preview checks at representative desktop and mobile widths. The audit did not change website HTML, CSS, JavaScript, content, robots, sitemap, redirects, or schema. Network field data, Search Console, analytics, backlink data, and Lighthouse/Core Web Vitals were not available in this baseline.

Current structure:

- Static HTML/CSS/JavaScript site built by `scripts/build.mjs`
- 561 source HTML pages: 101 English and 92 each in Arabic, Spanish, French, Brazilian Portuguese, and Russian
- 544 HTML pages in current `dist/` after build exclusions
- 67 English product-detail pages and 15 English blog articles
- English is indexable; all five locale sets are noindex
- Root `images/` and `assets/` are copied into `dist/`

## What Is Working

- All scanned pages have a meta description, canonical URL, language attribute, and exactly one H1.
- No English page is accidentally noindex.
- No multilingual page is accidentally indexable under the current policy.
- All 15 English blog articles include article schema and links to product pages.
- No `<img>` tag is missing the ALT attribute, although many empty ALT values need contextual review.
- The current build completes its required-file and homepage-marker checks.
- Homepage, hydraulic-breaker category, target blog article, About, and Contact showed no horizontal overflow, broken loaded images, JSON-LD parse errors, or console errors in the sampled desktop and mobile preview.

## Priority Findings

| Priority | Finding | Evidence | Impact | Recommended next action |
| --- | --- | --- | --- | --- |
| P2 | Structured-data regression prevention | Current structured-data audit reports 0 invalid blocks and 0 duplicate nodes in source and fresh `dist/` | A future generator or locale sync could reintroduce syntax and parity errors | Keep `audit-structured-data.mjs` in the build and release checks |
| P0 | Broken internal locale routes and image references | 637 occurrences across 26 unique targets in `dist/`; the largest groups point to missing `/[locale]/products/quick-coupler/` routes, plus `/images/products/quick-coupler.jpg`. Representative route and image checks returned 404 in preview | Repeated crawl dead ends and broken buyer journeys | Decide the canonical localized slug, add real routes or redirects, update templates, and verify fresh `dist/` |
| P1 | Product rich-result limitation | Product pages have canonical-aligned entity markup, but no verified public Offer, Review, or AggregateRating data | Google Product snippets are not available under the current quote-only data model | Keep truthful Product entities and add eligibility fields only when matching public business data exists |
| P1 | Missing titles in locale pages | 3 files: Arabic hydraulic compactor, Arabic quick hitch, Russian quick hitch | Weak or blank search snippets if policy changes, and poor quality signal now | Fix source templates before any locale becomes indexable |
| P1 | Multilingual duplication and incomplete localization | 58 duplicate-title groups and 91 duplicate-description groups; many groups reuse English across all locales | Locale pages are not ready for indexation and can confuse maintenance | Establish approved English source, terminology glossary, locale QA, and parity gates; keep noindex until passed |
| P1 | Oversized deployed image library | 401 image files total about 145.3 MB; 75 files exceed 500 KB; 129 files under `raw` paths total about 60.8 MB | Larger deployments, cache waste, and likely heavy page assets where referenced | Create an image inventory, stop deploying unused raw files, convert or resize referenced assets, and preserve only required originals outside deployed paths |
| P1 | Layout-shift risk from missing image dimensions | 3,081 image tags in current `dist/` lack width or height | Potential CLS and unstable mobile rendering | Fix shared templates first, then high-traffic page-specific images |
| P1 | Large monolithic stylesheet | Source CSS is about 412 KB; minified `dist/assets/styles.css` is about 340 KB | More render-blocking CSS and difficult design-system maintenance | Measure coverage by template, remove confirmed legacy rules, and split only when a safe build strategy is defined |
| Resolved | Demolition comparison intent consolidation | `/blog/hydraulic-pulverizer-vs-hydraulic-shear/` is the sole canonical owner; the outdated URL permanently redirects | Prevents cannibalization and consolidates internal authority | Keep the old URL out of source content, internal links, and the sitemap |
| P2 | Sparse content coverage for several product families | 15 English articles across a broad catalog; limited deep guidance for compactors, augers, rippers, grapple hydraulics, and custom attachment briefs | Missed non-brand discovery and weaker product-page support | Build small evidence-led clusters based on query and lead data, not a bulk publishing quota |
| P2 | Inconsistent page-level schema graph | `WebPage` appears on only 5 pages while Organization is repeated widely | Entity relationships are less consistent than they could be | Design a stable approved graph for English templates before touching locale schema |

## Phase 0: Integrity and Policy, 0-2 Weeks

1. Fix JSON-LD generation and add a parser check that fails on invalid blocks.
2. Resolve the 26 unique broken targets, beginning with localized quick-coupler routes and the missing product image.
3. Add checks for missing titles, broken local assets, local-only URLs, and current schema-policy violations.
4. Decide the future schema policy using verified business data. Do not add more schema until that decision is recorded.
5. Preserve the current multilingual noindex state.

Exit gate: fresh `dist/` has zero invalid JSON-LD, zero unintended broken internal targets, zero missing titles, and no new policy violations.

## Phase 1: Performance and Template Hygiene, 2-6 Weeks

1. Inventory every deployed image by URL, source, usage count, dimensions, format, and size.
2. Move unused raw assets out of copied deployment directories after reference checks.
3. Optimize the actual LCP image for homepage, product index, core product categories, blog index, and contact.
4. Add intrinsic dimensions at template level and verify desktop/mobile layout stability.
5. Audit CSS coverage and remove only confirmed legacy modules, beginning with styles and JavaScript for removed homepage features.
6. Run Lighthouse or equivalent lab tests and record mobile baselines for representative templates.

Exit gate: representative templates pass Core Web Vitals targets in field or lab evidence, key images are appropriately sized, and no deployment contains unreferenced raw batches.

## Phase 2: English SEO, GEO, and Conversion, 1-3 Months

1. Consolidate overlapping comparison pages using Search Console and lead data.
2. Strengthen company entity consistency across homepage, about, quality, contact, and articles.
3. Add author/company responsibility, accurate update dates, and links to first-party proof where appropriate.
4. Improve one commercial topic cluster at a time: category, product pages, selection guide, application link, and quote path.
5. Prioritize missing high-intent guides for plate compactor selection, auger sizing by soil and carrier, ripper selection, grapple hydraulic matching, bucket capacity and wear selection, and custom attachment engineering inputs.
6. Review WhatsApp and form events, lead qualification fields, confirmation states, and landing-page attribution.

Exit gate: each priority product family has a coherent internal-link cluster, distinct intent ownership, verified technical content, and measurable qualified conversion paths.

## Phase 3: Multilingual Readiness, After English Stabilizes

1. Select markets using real inquiry and search opportunity data.
2. Localize only approved, current English pages using the terminology and QA workflow.
3. Eliminate untranslated metadata and body content, invalid JSON-LD, missing routes, and mixed-language modules.
4. Verify canonical, hreflang, RTL behavior, forms, images, and legal or compliance claims.
5. Change indexation and sitemap policy one locale at a time only after explicit approval.

Exit gate: the selected locale has complete content parity, professional terminology, valid structured data, working links, and a documented indexation decision.

## Phase 4: Ongoing AI-Assisted Operations

Weekly or per release:

- Build and scan fresh `dist/`
- Preview affected routes and direct assets
- Validate links, metadata, schema, images, forms, and mobile behavior
- Record changed files and verification evidence

Monthly:

- Review Search Console query and page trends
- Review qualified leads by product, landing page, and country
- Refresh one proven commercial cluster or fix one technical debt group
- Check AI-search referrals and representative citations where observable

Quarterly:

- Re-audit schema policy, image payload, content overlap, product taxonomy, locale readiness, and conversion paths
- Update this roadmap from measured outcomes

## KPIs

- Zero invalid JSON-LD in source and `dist/`
- Zero unintended broken internal routes or image references
- Zero missing titles on deployable pages
- No indexation-policy drift
- Core Web Vitals pass rate for representative templates
- Declining deployed raw-image bytes and oversized referenced assets
- Growth in non-brand commercial and technical query coverage
- Qualified WhatsApp, email, and form leads by landing page
- Higher percentage of inquiries containing machine and project data
- AI-search citations and referrals where they can be observed reliably

## Decision Rules

- Fix crawl, route, schema, and asset integrity before publishing more content.
- Improve existing intent ownership before adding a similar URL.
- Require verified technical and company facts before generating copy or schema.
- Keep multilingual pages noindex until each locale passes its own quality gate.
- Treat AI visibility as an outcome of clear entities, useful answers, proof, and crawlability, not as a separate content gimmick.
