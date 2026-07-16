---
name: 11-seo-autopilot
description: Orchestrate recurring KRATOR SEO, GEO, content, performance, conversion, product-launch, blog-publishing, ranking-investigation, regression, and multilingual-readiness operations by routing work to existing project skills. Use for weekly SEO reviews, monthly growth plans, quarterly authority audits, new product launches, blog workflows, ranking declines, AI-search audits, technical regressions, conversion reviews, and multilingual readiness.
---

# KRATOR SEO Autopilot

## Default Behavior

Operate in audit and recommendation mode by default. Do not change website code, publish content, deploy, or push unless the user explicitly approves that action. Before any approved file modification, present a scoped change plan. After modifications, run the relevant regression checks.

Read `AGENTS.md`, `docs/seo-operating-system.md`, and the relevant mode checklist in `references/operating-checklists.md`.

## Route, Do Not Duplicate

| Need | Workflow |
| --- | --- |
| Technical health, metadata, links, schema, build | `01-website-audit` |
| Individual brief or approved content draft | `02-seo-content-writer` |
| Entity, GEO, and AI citation readiness | `03-geo-ai-search-optimizer` |
| Product page planning or implementation | `04-b2b-product-page-builder` |
| Visible frontend issue explicitly approved | `05-frontend-design-system` |
| Image delivery and performance | `06-image-optimization` |
| Quote, WhatsApp, form, and buyer journey | `07-conversion-rate-optimizer` |
| Approved multilingual localization/readiness | `08-multilingual-localization` |
| Topic clusters and cannibalization | `09-content-cluster-builder` |
| Public competitor evidence and gaps | `10-competitor-intelligence` |

Use the smallest relevant set and state the order. Do not restate another skill's full workflow.

## Operating Modes

1. **Weekly SEO Review:** Technical and content regression triage with a deployment recommendation.
2. **Monthly Growth Plan:** One focused month of connected content, product, trust, linking, GEO, and competitor work.
3. **Quarterly Authority Audit:** Entity, proof, product coverage, clusters, cases, authorship, external authority, pruning, and citation readiness.
4. **New Product Launch Workflow:** Fact intake, taxonomy, product page, image, links, schema, conversion, build, and approval gates.
5. **Blog Publishing Workflow:** Intent ownership, brief, factual review, links, metadata, schema eligibility, build, and publishing approval.
6. **Ranking Decline Investigation:** Require date range and Search Console evidence; separate technical, query, page, competitor, seasonality, and tracking hypotheses.
7. **GEO / AI Search Audit:** Entity consistency, answer extraction, proof, author/publisher, semantic links, and representative citation tests.
8. **Technical SEO Regression Check:** Build, links, metadata, canonical, robots, sitemap, schema, images, routes, and local-only URL checks.
9. **Conversion Improvement Review:** Landing intent, product understanding, fit confirmation, proof, CTA, form, WhatsApp, and lead-quality path.
10. **Multilingual Readiness Review:** Source approval, terminology, parity, hreflang/canonical, noindex preservation, assets, schema, and visual readiness.

## Weekly Minimum

Review and report:

- Build status
- Broken internal links
- JSON-LD validity
- Canonical status
- Robots and noindex status
- Sitemap consistency
- Missing title or description
- Missing H1
- Image width and height
- Oversized image regression
- Internal-link opportunities
- Thin or duplicate page risks
- New content priorities
- Pages requiring factual updates
- Conversion-path problems
- Deployment recommendation

Use the read-only helper when useful:

```bash
node .codex/skills/11-seo-autopilot/scripts/run-read-only-checks.mjs --root .
```

The helper does not build, write, publish, deploy, or push. An approved release review must still run a fresh build and scan `dist/`.

## Monthly Minimum

Recommend:

- One pillar or buying guide
- Two to four supporting articles
- One product-page improvement
- One comparison topic
- One factory, trust, or case-study opportunity
- Internal-link work
- One GEO improvement
- One competitor gap
- Expected inquiry relevance
- Required factual materials

Run `09-content-cluster-builder` before recommending new article URLs and `10-competitor-intelligence` only when live public research is available or a research plan is explicitly sufficient.

## Quarterly Minimum

Audit entity consistency, About and Factory authority, product coverage, content clusters, case studies, quality-control evidence, author and publisher signals, brand mentions, external authority opportunities, GEO citation readiness, and content pruning or consolidation.

## Safety And Approval Gates

- Preserve English as the primary indexed language and the current multilingual `noindex` strategy.
- Preserve KRATOR naming, industrial identity, and existing design unless an approved task requires otherwise.
- Never fabricate statistics, reviews, certificates, customers, addresses, factory data, export claims, or performance results.
- Do not generate or publish large batches of pages automatically.
- Do not repeat low-value schema edits after syntax, policy, parity, and entity relationships have passed validation.
- Require evidence before factual content, case studies, regional claims, or competitor conclusions.
- Require explicit approval for file changes, publishing, indexation changes, deployment, and push as separate gates.

## Reporting

Separate every report into:

1. Critical errors
2. High-priority improvements
3. Medium-priority improvements
4. Optional ideas

For each recommendation state why it matters, affected pages, expected benefit, risk, required evidence, and the skill that should own implementation. Use `references/report-template.md`.

Do not promise rankings, AI citations, traffic, or inquiries. Clearly list unavailable data and checks not run.
