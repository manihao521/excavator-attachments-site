# Content Inventory

## Existing Product Categories

Current product structure is centered around `src/data/products.ts`.

Primary categories:

- Hydraulic Breakers
- Quick Couplers
- Vibratory Pile Hammers
- Demolition Shears
- Hydraulic Pulverizers
- Hydraulic Grapples
- Plate Compactors
- Earth Augers
- Excavator Buckets
- Excavator Rippers
- Custom Attachments

Legacy or older category paths still present:

- Hydraulic Compactor
- Vibro Hammers

These legacy paths should be reviewed before deletion because they may appear in sitemap, multilingual pages, or old generated content.

## Existing Product Copy

Product copy is mainly stored in:

- `src/data/products.ts`
- Generated files under `products/`
- Homepage product category cards in `index.html`
- Generated product pages from `work/update-products.mjs`

Current product data generally includes:

- Product name
- Model
- Tonnage
- Short description
- Features
- Applications
- Specifications

Content to keep:

- B2B-focused product descriptions
- Excavator tonnage matching logic
- Application-based product explanation
- Product detail page section structure

Content to improve later:

- More unique copy for each subtype
- More detailed specifications
- More model tables
- More product-specific FAQ content
- Better internal links between category pages and detail pages

## Existing Product Images

Product image directories:

- `images/products/`
- `public/images/products/`

Current product category images:

- `hydraulic-breaker.jpg`
- `quick-hitch.jpg`
- `hydraulic-pile-hammer.jpg`
- `hydraulic-shear.jpg`
- `hydraulic-pulverizer.jpg`
- `grapples.jpg`
- `plate-compactors.jpg`
- `earth-augers.jpg`
- `excavator-buckets.jpg`
- `rippers.jpg`
- `custom-attachments.jpg`

Recommended direction:

- Keep `images/products/` as the public product image source.
- Use consistent URLs such as `/images/products/hydraulic-breaker.jpg`.
- Replace category placeholder images with real product images later.
- Add separate images for important subtypes when available.

## Existing Brand And Contact Assets

Brand assets:

- `assets/brand/krator-logo.png`
- `assets/brand/whatsapp-qr.png`

WhatsApp asset:

- `assets/whatsapp-breathing-icon.svg`

Keep these assets unless a newer approved brand kit is provided.

## Existing Icon Assets

Icon directories:

- `assets/icons/assurance/`
- `assets/icons/applications/`
- `assets/icons/footer/`
- `assets/icons/oem/`
- `assets/icons/quality/`
- `assets/icons/quote/`
- `assets/icons/stats/`
- `assets/icons/upload/`

These icons support homepage sections and should be preserved during cleanup.

## Existing Scene Images

Application scene images:

- `assets/images/applications/`

These are used for the Applications section. They are useful for the current industrial visual direction and can be retained until replaced with final licensed product/application photos.

## Existing Factory / Manufacturing Images

Manufacturing image:

- `assets/images/quality-manufacturing-workshop.jpg`

This image supports the Quality & Manufacturing section and fits the current industrial B2B direction.

## Existing Blueprint / Background Assets

Current blueprint-style assets:

- `assets/images/footer-blueprint-bg.svg`
- `assets/images/quote-blueprint-bg.jpg`
- `assets/images/quote-excavator-blueprint.png`

These assets help maintain the deep-blue industrial engineering style.

## Content To Keep

- KRATOR ATTACHMENTS brand direction
- Main homepage structure
- Hero visual direction
- Featured Attachments product category entrance
- Applications section
- OEM & Service section
- Quality & Manufacturing section
- Become a KRATOR Dealer section
- Quote form structure
- WhatsApp contact path
- Footer layout and QR contact card
- Product data file structure

## Content To Replace Or Improve Later

- Placeholder or repeated product images
- Duplicated product image directories
- Old multilingual homepage content
- Legacy Popular Products styles and JavaScript
- Old product category paths
- Older contact page and custom service form layouts
- Product detail pages that reuse the same image too often

