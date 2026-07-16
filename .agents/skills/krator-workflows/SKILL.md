---
name: krator-workflows
description: Route KRATOR website development, audits, SEO, GEO, content clusters, competitor research, recurring operations, product content, frontend, image, conversion, and multilingual tasks to project workflows under .codex/skills. Use whenever work concerns KRATOR ATTACHMENTS and a specialized repeatable workflow would improve safety, consistency, planning, or verification.
---

# KRATOR Workflow Router

Read the nearest `AGENTS.md`, then load only the workflow needed for the request:

- Audit or regression: `../../../.codex/skills/01-website-audit/SKILL.md`
- SEO content: `../../../.codex/skills/02-seo-content-writer/SKILL.md`
- GEO and AI search: `../../../.codex/skills/03-geo-ai-search-optimizer/SKILL.md`
- Product page: `../../../.codex/skills/04-b2b-product-page-builder/SKILL.md`
- Frontend design: `../../../.codex/skills/05-frontend-design-system/SKILL.md`
- Image optimization: `../../../.codex/skills/06-image-optimization/SKILL.md`
- Conversion: `../../../.codex/skills/07-conversion-rate-optimizer/SKILL.md`
- Localization: `../../../.codex/skills/08-multilingual-localization/SKILL.md`
- Content clusters and cannibalization: `../../../.codex/skills/09-content-cluster-builder/SKILL.md`
- Public competitor research: `../../../.codex/skills/10-competitor-intelligence/SKILL.md`
- Recurring SEO operations: `../../../.codex/skills/11-seo-autopilot/SKILL.md`

## Intent Routing

- "Plan content clusters" or "plan blog topics" -> `09-content-cluster-builder`
- "Analyze competitors" or "compare competitor content" -> `10-competitor-intelligence`
- "Run weekly SEO review" -> `11-seo-autopilot`
- "Plan next month's SEO work" -> `11-seo-autopilot`
- "Find missing topics" -> `10-competitor-intelligence`, then `09-content-cluster-builder`
- "Create an article" -> `02-seo-content-writer`; use `09-content-cluster-builder` first only when intent ownership is unresolved
- "Audit technical SEO" -> `01-website-audit`
- "Improve AI visibility" -> `03-geo-ai-search-optimizer`

For mixed tasks, combine the smallest relevant set and state the order. The router does not authorize implementation. Keep audits, plans, recurring reviews, and competitor research read-only unless file changes are explicitly approved. Follow the factual, deployment, push, schema, image-path, design, content-volume, cannibalization, and multilingual rules in `AGENTS.md`.
