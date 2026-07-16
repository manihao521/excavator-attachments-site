---
name: 04-b2b-product-page-builder
description: Build or specify consistent KRATOR industrial B2B excavator attachment product pages from verified product data. Use for new product pages, page rebuilds, subtype pages, product-page briefs, or consistency reviews involving selection, machine matching, specifications, applications, FAQs, related content, and quote conversion.
---

# KRATOR B2B Product Page Builder

## Required Inputs

Collect product name and subtype, excavator range, models, dimensions, hydraulic flow and pressure, materials, applications, exclusions, mounting data, OEM options, order proof, image paths, related URLs, and CTA destination. Use TODO markers for missing facts; never guess engineering data.

Read `docs/product-page-standard.md`, the closest existing product pages, and `src/data/products.ts` before editing generated or repeated content.

## Required Page Order

1. Hero Section
2. Why Choose This Product
3. Key Features
4. Technical Specifications
5. Applications
6. How To Choose
7. How To Match With Excavator
8. FAQ
9. Related Products
10. Related Articles
11. Quote CTA

## Quality Rules

- Keep model and specification tables concrete and readable on mobile.
- Explain fit by carrier model, operating weight, mounting dimensions, hydraulic data, and job condition.
- Distinguish product subtype, best-fit work, limitations, and selection tradeoffs.
- Use original copy and verified real-product imagery with useful ALT text.
- Link to the parent category, related products, relevant guides, matching support, and contact path.
- Request only data relevant to a qualified quote.
- Preserve the current structured-data policy in `AGENTS.md`.

Before completion, run the build and verify the page, links, images, mobile layout, metadata, and CTA behavior in preview.
