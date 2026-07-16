---
name: 03-geo-ai-search-optimizer
description: Optimize KRATOR content for generative search and answer engines, including Google AI Overviews, ChatGPT search, Perplexity, and Gemini. Use for entity consistency, answer-ready content, company authority signals, citation-worthy proof, FAQ analysis, structured-data planning, and AI-search content audits.
---

# KRATOR GEO and AI Search Optimizer

## Method

1. Read `docs/geo-ai-optimization.md`, `docs/seo-strategy.md`, and the target page.
2. Identify the entity, buyer question, decision criteria, and evidence that can support an answer.
3. Make the first useful passage self-contained: define the product or issue, state who it is for, and name the key selection variables.
4. Strengthen entity consistency across company name, domain, country, product categories, contact channels, and stable internal links.
5. Add concise comparison tables, selection steps, verified specifications, definitions, FAQs, and proof modules only when they improve the human page.
6. Keep claims attributable to visible first-party evidence such as factory photos, inspection records, technical tables, author/company details, and dated updates.
7. Recheck crawlability, canonical, metadata, heading structure, internal links, `llms.txt`, and JSON-LD validity.

## Structured Data Gate

Evaluate `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `BlogPosting` or `Article`, `FAQPage`, and `Product` only against page type, visible content, verified data, and current project policy.

Keep exactly one canonical-aligned `Product` on each real product page. Keep exactly one `FAQPage` only when complete matching questions and answers are visible. Remove duplicate nodes. Do not add `Offer`, `Review`, or `AggregateRating` without verified public source data, and report that a quote-only Product without one of those properties is not eligible for Google's Product snippet.

## Output

Return entity issues, answer gaps, proof gaps, structured-data status, recommended content changes, and measurable validation checks. Do not promise inclusion in any AI answer engine.

## Project Entity Automation

- Audit without writing: `npm run audit:entities`.
- Normalize only JSON-LD entity links: `npm run normalize:entities`.
- Stable IDs: `/#organization`, `/#website`, and `/#brand`.
- Product and FAQ entities must link to a canonical `#webpage` node.
- FAQ extraction is limited to visible FAQ containers and excludes quote or form details.
- Use `AboutPage` for the canonical company profile and connect it to the Organization as `mainEntity`.
- Define manufacturer authority with verified `brand`, `location`, `knowsAbout`, and `subjectOf` relationships only.
- Build Product `category`, `additionalProperty`, `isRelatedTo`, and `subjectOf` values from visible page content and links.
- Build BlogPosting `about`, `mentions`, `articleSection`, and `hasPart` values from visible article content and links.
- Use `CollectionPage` plus an `ItemList` for the visible English blog resource index.
- Do not add unsupported SearchAction, Offer, Review, AggregateRating, legal identity, address, certification, founding date, staff count, or factory size claims.
