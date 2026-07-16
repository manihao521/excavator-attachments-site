---
name: 01-website-audit
description: Audit KRATOR static website health, technical SEO, indexation controls, metadata, structured data, internal links, image delivery, mobile readiness, and build output. Use for baseline audits, pre-release checks, broken-page investigations, SEO regressions, and prioritized website roadmaps.
---

# KRATOR Website Audit

## Workflow

1. Read the nearest `AGENTS.md` and the relevant files in `docs/` before judging an issue.
2. Define the scope: source, fresh `dist/`, local preview, live site, or a combination. Do not treat an old `dist/` as current source truth.
3. Run the read-only scanner from the project root:

```bash
node .codex/skills/01-website-audit/scripts/audit-site.mjs --root .
```

For a structured-data audit, also run:

```bash
node .codex/skills/01-website-audit/scripts/audit-structured-data.mjs --root .
```

4. For release checks, run `npm run build`, scan `dist/`, and verify representative routes and assets in local preview.
5. Separate confirmed defects from recommendations. Cite the affected route or file for every finding.
6. Report findings in priority order: P0 blocks crawling or conversion, P1 materially harms discovery or leads, P2 is a measured improvement.

## Audit Lanes

- Crawl and indexation: status, redirects, canonical, robots directives, sitemap membership, locale policy.
- On-page SEO: unique title, useful description, one clear H1, heading order, intent match, internal links.
- Structured data: valid JSON-LD, visible-content parity, stable entity IDs, page-appropriate types.
- Product and FAQ: exactly one canonical-aligned `Product` per real product page; exactly one `FAQPage` only where complete matching FAQs are visible; no duplicate nodes. Report Product snippet ineligibility when verified Offer, Review, or AggregateRating data is unavailable rather than inventing it.
- Assets: real file existence, build copy behavior, MIME type, dimensions, ALT quality, compression, loading priority.
- Performance: oversized images and HTML, render-blocking assets, layout shift risks, unnecessary deployed raw files.
- Mobile and accessibility: overflow, readable controls, tap targets, focus, contrast, semantic labels.
- Conversion: working WhatsApp, email, forms, quote paths, and trust evidence.

## Guardrails

Do not edit content or code during an audit-only request. Do not invent failures from pattern checks; manually verify high-impact samples. Respect the current schema and multilingual indexation policies in `AGENTS.md`.

## Output

Include scope, evidence, impact, recommended action, owner, and verification method. End with a short list of tests not run or data not available.
