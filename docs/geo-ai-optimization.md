# KRATOR GEO and AI Search Optimization

## Goal

Make KRATOR pages easy for search engines and answer systems to crawl, understand, verify, and cite. This supports Google AI Overviews, ChatGPT search, Perplexity, Gemini, and other retrieval-based systems, but no implementation can guarantee inclusion.

## Canonical Entity Record

Use consistent facts across visible content and structured data:

- Name: KRATOR ATTACHMENTS
- Domain: `https://www.kratorattachments.com/`
- Industry: excavator attachments
- Business model: international B2B manufacturing and supply
- Country: China
- Customers: distributors, equipment dealers, rental companies, contractors, demolition companies, and procurement buyers
- Contact channels: WhatsApp, email, and quote forms

Do not add a street address, founding date, factory size, employee count, certifications, export markets, or legal entity name until verified.

## Answer-Ready Page Pattern

Each important page should make these elements extractable without sacrificing the human experience:

1. Clear entity or product definition
2. Who the product or guidance is for
3. Primary applications
4. Selection and matching variables
5. Verified specifications or comparison criteria
6. Limitations and when another product is better
7. Order, inspection, packing, or support proof
8. Concise visible FAQs where appropriate
9. Stable internal links to deeper evidence and conversion pages

Lead with the useful answer. Do not bury the product definition under marketing language.

## Entity Optimization

- Use one formal brand spelling and a stable Organization `@id`.
- Connect homepage, about, quality, contact, product, and article pages through consistent internal links.
- Connect the Organization to its maintained Brand, verified expertise topics, AboutPage, and factory capability page.
- Connect Product entities to visible categories, specification PropertyValues, related products, and relevant technical articles.
- Connect BlogPosting entities to the Product topics they are about and the related products or guides they visibly mention.
- Keep company and contact facts synchronized.
- Clarify relationships between product families, subtypes, applications, and buyer roles.
- Use unambiguous terms such as `hydraulic pulverizer`, `demolition shear`, `quick coupler`, and `vibratory pile hammer`, then explain genuine synonyms.

## Authority and Proof

AI-search visibility depends on information that can be trusted and corroborated. Prioritize:

- Real technical tables and model data
- Machine-matching and measurement instructions
- Real product, factory, inspection, packing, and loading images
- Clear company profile and contact information
- Honest document availability language
- Named author or company responsibility for technical articles
- Published and updated dates when accurate
- Links from claims to relevant first-party evidence

Avoid invented experts, fake tests, fabricated customer stories, unsupported certifications, and vague "leading manufacturer" claims.

## FAQs

Use FAQs to answer recurring buyer questions in visible HTML. Keep each answer direct, qualified, and consistent with the main copy.

Use one `FAQPage` node only when the page contains the same visible questions and complete answers. Do not mark up hidden, unrelated, or partial FAQ content. KRATOR is not in the government or health categories for which Google normally shows FAQ rich results, so treat the markup as machine-readable content rather than a display guarantee.

## Product Data

Product content should expose real attributes in human-readable tables: carrier range, model, dimensions, weight, flow, pressure, mounting data, applications, materials, and order options.

Each real product page uses one canonical-aligned `Product` node with a visible name, description, image, brand, manufacturer, and URL. Do not place `Product` on product lists or unrelated pages. Do not add `Offer`, `Review`, or `AggregateRating` until matching public data is verified. Quote-only products without one of those properties are not eligible for Google's Product snippet.

## Company and Article Signals

- Homepage: `Organization` and `WebSite` with stable IDs and accurate contact data
- Company pages: `WebPage`, breadcrumbs, and visible entity proof
- Blog articles: `BlogPosting` or `Article`, headline, canonical URL, image, publisher, and accurate dates
- All pages: page-appropriate breadcrumbs and consistent canonical URLs

Keep Organization facts centralized and consistent instead of generating conflicting copies.

## Technical Discovery

- Keep important content in server-delivered HTML.
- Maintain crawlable internal links and valid canonical URLs.
- Keep English indexable and honor the current locale noindex policy.
- Ensure image and page resources return the correct status and MIME type.
- Keep sitemap and `llms.txt` aligned with approved indexable URLs.
- Remove invalid JSON-LD and local-only URLs from the build.

`llms.txt` can summarize important entities and routes, but it does not replace normal SEO, crawlability, or proof.

## Content Design for Citation

Prefer modules that answer a bounded question:

- Product A versus Product B comparison
- Model-selection table
- Excavator matching checklist
- Flow and pressure explanation
- Pin measurement steps
- Application suitability matrix
- Quote information checklist
- Inspection and packing process

State what varies by excavator or order. A qualified answer is more trustworthy than false precision.

## Measurement

Monitor:

- Crawling and indexation of important English pages
- Search impressions for entity and technical queries
- Pages receiving long-tail comparison or selection traffic
- Referrals from AI-search surfaces where available
- Brand mentions and cited pages observed in representative queries
- Qualified leads attributed to technical and comparison content

Use a repeatable query set and record date, location, language, result, citation, and landing page. Treat anecdotal AI results as directional, not guaranteed rankings.

## Workflow

1. Audit entity and page facts.
2. Map buyer questions and existing answers.
3. Improve the visible page with concise answers, proof, and internal links.
4. Apply only policy-approved structured data.
5. Build and validate HTML, JSON-LD, routes, and assets.
6. Measure search visibility and lead quality, then iterate from evidence.
