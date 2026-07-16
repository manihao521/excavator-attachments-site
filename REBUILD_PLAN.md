# Rebuild Plan

## Phase 1: Homepage Rebuild And Cleanup

Goals:

- Keep the current KRATOR industrial visual direction.
- Make the homepage easier to maintain.
- Remove or archive legacy Popular Products code if it is no longer used.
- Keep Featured Attachments as the main homepage product category entrance.
- Keep Applications, Dealer, Quote Form, and Footer as key conversion modules.

Tasks:

- Review `index.html` section order.
- Clean stale homepage-only styles after confirmation.
- Keep conversion buttons specific and action-oriented.
- Confirm all CTA links point to the correct form or WhatsApp link.
- Check desktop and mobile spacing for Hero, Dealer, Quote Form, and Footer.

## Phase 2: Component Unification

Goals:

- Reduce repeated markup.
- Make Header, Footer, WhatsApp buttons, product cards, and forms easier to maintain.
- Prepare the site for either continued static generation or a future framework migration.

Tasks:

- Treat Header, Footer, Product Card, Dealer CTA, and Quote Form as reusable components.
- Move repeated page-shell HTML into the generator where practical.
- Standardize button classes:
  - Primary quote button
  - Secondary outline button
  - WhatsApp icon button
  - Product detail button
- Standardize card styles:
  - Product category card
  - Product detail card
  - Glass CTA card
  - Footer QR card
- Centralize brand colors with CSS custom properties.

## Phase 3: Product Detail Page Rebuild

Goals:

- Use `src/data/products.ts` as the single product source.
- Make product pages better for Google SEO, AI search, and B2B inquiries.
- Improve each product page structure and internal linking.

Target product detail sections:

- Product Overview
- Types / Series
- Key Features
- Specifications
- Applications
- How to Choose Model
- FAQ
- Inquiry CTA
- WhatsApp CTA

Tasks:

- Review every product slug.
- Confirm category pages and detail pages are generated consistently.
- Add product-specific copy where current copy is too generic.
- Add real product images when available.
- Ensure structured data remains valid.
- Remove or redirect outdated product paths only after review.

## Phase 4: SEO Pages And Multilingual Pages

Goals:

- Keep English as the source of truth.
- Make multilingual pages consistent with the updated English site.
- Improve sitemap and llms.txt consistency.

Tasks:

- Update sitemap after product structure cleanup.
- Keep `robots.txt`, `sitemap.xml`, and `llms.txt`.
- Review hreflang entries.
- Rebuild Spanish, French, Russian, and Arabic pages from the current English structure.
- Avoid leaving old product categories in translated pages.
- Add localized product category pages only after the English product system is stable.

## Phase 5: Form And WhatsApp Inquiry Optimization

Goals:

- Increase B2B inquiry conversion.
- Keep WhatsApp, email, and form paths consistent.
- Avoid confusing generic CTA wording.

Tasks:

- Keep homepage Formspree form as the main inquiry form.
- Align Contact and Custom Service forms with homepage form fields.
- Use clear CTA wording:
  - Send Excavator Model
  - Get Matching Model
  - Get a Quote
  - Chat on WhatsApp
  - Apply as Dealer
- Use product-specific WhatsApp messages on product detail pages.
- Track required form fields consistently.
- Keep QR code text WhatsApp-only.

