# KRATOR SEO Operating System

## Purpose

Operate KRATOR ATTACHMENTS SEO, GEO, content, technical health, and conversion as a connected B2B system. Default to read-only audits and approval-ready plans. Website changes, publication, indexation changes, deployment, and push are separate approval gates.

Primary outcome: qualified inquiries containing useful machine, application, quantity, and destination data. Traffic, rankings, or AI citations are not goals by themselves.

## 1. Weekly Workflow

1. Confirm scope and evidence date: source, current `dist/`, approved fresh build, preview, live site, GSC, or analytics.
2. Run `11-seo-autopilot` in Weekly SEO Review mode.
3. Route deterministic checks to `01-website-audit`.
4. Review build status, links, JSON-LD, canonical, robots/noindex, sitemap, metadata, H1, images, duplicate risks, internal links, content priorities, factual freshness, and conversion paths.
5. Classify findings as critical, high, medium, or optional.
6. Return a deployment recommendation without deploying.

Read-only command:

```bash
node .codex/skills/11-seo-autopilot/scripts/run-read-only-checks.mjs --root .
```

The helper does not replace an approved fresh build and preview review.

## 2. Monthly Workflow

1. Review the previous plan, available GSC trends, landing pages, search queries, countries, devices, and qualified inquiry themes.
2. Use `10-competitor-intelligence` for a bounded public gap review when live research is available.
3. Use `09-content-cluster-builder` to assign intent ownership and prevent cannibalization.
4. Recommend one pillar or buying guide, two to four support articles, one product improvement, one comparison, and one real trust/factory/case opportunity.
5. Include internal links, GEO improvement, competitor gap, inquiry relevance, and required factual materials.
6. Obtain approval before drafting, changing files, publishing, deploying, or pushing.

## 3. Quarterly Workflow

1. Audit Organization, Brand, About, Factory, author, publisher, Product, and article consistency.
2. Review product families, subtype coverage, applications, technical guides, comparisons, maintenance, and dealer resources.
3. Review real factory, quality, inspection, document, packing, and case-study evidence.
4. Review content clusters, intent overlap, obsolete pages, consolidation, pruning, and redirect candidates.
5. Review brand mentions, public authority opportunities, and representative GEO citation readiness.
6. Define the next quarter's evidence collection and small set of high-value releases.

## 4. Skill Routing Table

| Request | Primary skill | Supporting skill | Default action |
| --- | --- | --- | --- |
| Technical SEO audit | `01-website-audit` | `11-seo-autopilot` | Read-only report |
| Write or improve one page | `02-seo-content-writer` | `09-content-cluster-builder` when ownership is unclear | Brief before draft |
| Improve AI visibility | `03-geo-ai-search-optimizer` | `01-website-audit` | Audit before implementation |
| New product page | `04-b2b-product-page-builder` | 01, 03, 06, 07 | Fact intake and plan |
| Visible design issue | `05-frontend-design-system` | 07 | Only with explicit design approval |
| Image issue | `06-image-optimization` | 01 | Scoped asset audit |
| Conversion issue | `07-conversion-rate-optimizer` | 01 | Read-only journey review |
| Locale work | `08-multilingual-localization` | 01 | Preserve current noindex |
| Topic cluster or roadmap | `09-content-cluster-builder` | 02, 03 | Read-only plan |
| Competitor gap | `10-competitor-intelligence` | 09 | Public research report |
| Weekly/monthly/quarterly operation | `11-seo-autopilot` | Smallest relevant set | Read-only orchestration |

## 5. Approval Gates

| Gate | Required before | Evidence |
| --- | --- | --- |
| Facts | Drafting factual claims | Approved specifications, documents, images, company facts |
| URL and intent | Creating a page | Repository overlap and cannibalization decision |
| File change | Editing source | Scoped change plan and explicit instruction |
| Publication | Adding approved content to site | Final content and factual review |
| Indexation | Changing locale or page index status | Explicit strategy approval |
| Build | Release verification that writes `dist/` | Approved implementation scope |
| Deployment | Any production release | Explicit deployment instruction after regression checks |
| Push | Any repository push | Explicit push instruction |

No gate implies the next gate.

## 6. Publishing Checklist

- [ ] Page role, target buyer, primary intent, and canonical owner are clear
- [ ] Existing-page overlap and cannibalization are resolved
- [ ] Product and factory facts are verified
- [ ] Copy is original and uses professional industrial terminology
- [ ] Title, description, H1, headings, ALT, image dimensions, and dates are complete
- [ ] Product, guide, application, About/Factory, and inquiry links are relevant
- [ ] FAQ is visible and useful; schema is added only when parity is exact
- [ ] CTA requests useful qualification data
- [ ] Author, publisher, and structured data match visible content
- [ ] No fake certification, statistic, customer, review, result, or market claim
- [ ] Content publication is explicitly approved

## 7. Deployment Checklist

- [ ] Deployment is explicitly authorized
- [ ] `npm run build` passed from current source
- [ ] `dist/` audit passed or exceptions are documented
- [ ] Affected routes return expected status and content type in preview
- [ ] Images and direct assets exist in `dist/`
- [ ] Links, forms, WhatsApp, metadata, canonical, JSON-LD, and mobile behavior were checked
- [ ] English indexation and multilingual noindex policy are unchanged unless separately approved
- [ ] No `localhost` or `127.0.0.1` appears in source or build output
- [ ] Rollback or previous artifact is identifiable
- [ ] Push, when needed, has separate explicit authorization

## 8. Regression Checklist

- Build and required-file checks
- Source-to-dist route and asset parity
- Broken internal references and redirects
- Unique titles, descriptions, one H1, canonical, robots, hreflang, and sitemap
- Valid non-duplicate JSON-LD with visible-content parity
- Exactly one Product on real product pages and FAQPage only for visible FAQs
- No fabricated Offer, Review, AggregateRating, certification, price, stock, or business fact
- Image path, MIME type, dimensions, ALT, payload, and loading behavior
- Desktop/mobile overflow, controls, CTA, WhatsApp, email, and forms
- No unrelated layout, content, product-data, CSS, or deployment changes

## 9. GSC Review Checklist

Record the exact property, date range, comparison range, search type, country, device, and filters.

- Total and non-brand clicks, impressions, CTR, and average position
- Landing pages gaining or losing meaningful impressions
- Queries by product family, intent, country, and buyer question
- Indexing, canonical, crawl, sitemap, and rich-result reports
- New pages discovered versus approved published URLs
- Ranking declines separated from demand, seasonality, SERP, and tracking hypotheses
- Qualified inquiries associated with landing pages where measurement exists
- Screenshots or exports retained for claims used in recommendations

Do not infer GSC performance when the data is unavailable.

## 10. GEO Review Checklist

- Stable KRATOR organization, brand, website, product, author, publisher, About, and Factory relationships
- Main buyer question answered early and clearly
- Extractable specifications, comparisons, selection steps, limitations, and FAQs
- Claims supported by visible first-party evidence
- Technical articles have accurate dates and responsibility signals
- Product and article entities connect through visible internal links
- Representative Google AI, ChatGPT search, Perplexity, and Gemini tests record date, locale, prompt, result, citation, and landing page
- Observations are separated from hypotheses and recommendations
- Schema work stops once valid, relevant, and complete; evidence and content quality take priority

No workflow can guarantee inclusion or citation in an answer engine.
