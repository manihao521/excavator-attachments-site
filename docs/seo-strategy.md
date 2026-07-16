# KRATOR ATTACHMENTS SEO Strategy

## Objective

Grow qualified international B2B inquiries for excavator attachments while building durable topical authority. Organic traffic is useful only when it reaches buyers who can provide machine, application, quantity, and destination information.

Primary conversions:

- WhatsApp inquiry
- Email inquiry
- Quote form submission

## Site Roles

| Page type | Search role | Buyer need | Primary conversion |
| --- | --- | --- | --- |
| Homepage | Brand and category discovery | Understand supplier scope and trust | Start quote or visit a category |
| Product category | Commercial investigation | Compare attachment families and subtypes | Select a product or request matching |
| Product detail | High-intent evaluation | Confirm fit, specifications, application, and order details | Send machine data or request quote |
| Application | Problem and jobsite discovery | Find attachments for a working condition | Move to relevant product pages |
| Blog guide | Informational and comparison intent | Learn selection, maintenance, measurement, and buying criteria | Continue to product or quote path |
| About, quality, custom service | Entity and trust validation | Reduce supplier and order risk | Contact KRATOR |
| Contact | Conversion | Submit qualified requirements | Complete inquiry |

## Topic Architecture

Build one connected cluster for each commercial product family:

1. Category page defines types, applications, selection logic, and links to subtypes.
2. Product pages cover specific models, fit, specifications, and quote requirements.
3. Blog guides answer comparison, sizing, maintenance, measurement, and troubleshooting questions.
4. Application pages connect job conditions to several suitable attachments.
5. Quality, custom service, and company pages provide proof and entity context.

Avoid publishing isolated blog posts with no route to a product or buyer action.

## Keyword and Intent Method

For every proposed page, record:

- Primary query and close variants
- Country or language, if relevant
- Buyer role and stage
- Product or application entity
- Decision variables the page must answer
- Existing page that may already own the intent
- Internal links in and out
- Conversion action

Do not create a new URL when an existing page can satisfy the intent through a focused improvement. Resolve cannibalization before expanding similar pages.

## On-Page Standard

- Write a unique title that identifies the actual product, category, comparison, or guide.
- Write a useful meta description that previews the decision value and B2B action.
- Use one H1 and a logical heading structure.
- Answer the main intent in the first useful section.
- Include verified specifications, selection criteria, applications, and limitations.
- Use tables where buyers compare models or requirements.
- Add visible FAQs only for real recurring questions.
- Add descriptive ALT text and intrinsic image dimensions.
- Link to parent, child, related, proof, and conversion pages where contextually useful.

Length is not a target. A page should be complete enough to support the decision without padding.

## Internal Linking Model

- Homepage -> core categories, applications, company proof, quote path
- Category -> subtype products, selection guides, application pages
- Product -> parent category, related products, relevant guides, quality/custom service, contact
- Blog -> product/category pages, related guides, matching support, quote path
- Application -> relevant products and technical guides
- Company proof -> product categories and contact

Use descriptive anchor text. Do not create links to nonexistent, excluded, or temporary paths. Validate source and fresh `dist/` because redirects and build exclusions can differ.

## Technical SEO

- English pages are indexable.
- `es`, `pt`, `fr`, `ru`, and `ar` remain `noindex` until quality and parity gates are met.
- Noindex locale pages stay out of the sitemap.
- Canonical and hreflang must map to real routes and approved language equivalents.
- `robots.txt`, sitemap, redirects, canonical, and locale policy change only with explicit scope.
- Build output must contain every referenced asset with the correct MIME type.
- Broken links, invalid JSON-LD, missing titles, and local-only URLs are release blockers.

## Structured Data

Current approved types are `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `BlogPosting` or `Article` for blog pages, `Product` for real product pages, and `FAQPage` where complete matching FAQs are visible.

Product pages must contain exactly one canonical-aligned `Product`; non-product pages must not. Keep one `FAQPage` only when all marked-up questions and answers match visible content. Do not add `Offer`, `Review`, or `AggregateRating` without verified public data. All JSON-LD must parse, avoid duplicate entities, and match visible page content.

Use stable entity IDs and avoid repeating conflicting Organization facts across templates.

## Content Quality

Prefer first-party, buyer-useful information:

- Excavator carrier range and model-matching inputs
- Hydraulic flow and working pressure
- Pin diameter, arm width, and center distance
- Material, structure, wear parts, and service considerations
- Application fit and limitations
- Inspection, packing, order proof, and document availability
- Decision tables and measurement instructions

Never invent certifications, production scale, delivery promises, prices, ratings, customer names, or performance results.

## Measurement

Track by landing page and product family:

- Search impressions and clicks, branded versus non-branded
- Query coverage for commercial and technical intent
- Indexation and rich-result errors
- Core Web Vitals and image delivery
- WhatsApp clicks, email clicks, form starts, form completions
- Qualified inquiries containing machine and project data
- Leads and opportunities by landing page and country
- AI-search referrals and cited pages where observable

Do not optimize for traffic volume alone. Lead quality and product relevance are the primary outcome.

## Operating Rhythm

Monthly:

1. Audit build health, links, metadata, schema, indexation, and top landing pages.
2. Review search queries and qualified lead themes.
3. Select a small number of high-value page improvements or new briefs.
4. Update internal links and proof assets with each content release.
5. Build, preview, validate, and document the result before deployment approval.

Quarterly, review product taxonomy, content overlap, locale readiness, image payload, and conversion paths.
