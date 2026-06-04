# Cloudflare Pages Deployment Guide

This is a static B2B inquiry website for excavator attachments. It is ready for Cloudflare Pages drag-and-drop or Git deployment.

## 1. Replace placeholders before publishing

Search and replace these values across files:

- `KRATOR Attachments` → your real brand name
- `https://www.yourdomain.com` → your domain, e.g. `https://www.example.com`
- `manihao521@gmail.com` → your business email
- `+8613370928803` → your WhatsApp number
- `https://formspree.io/f/your-form-id` → your actual form endpoint

## 2. Deploy on Cloudflare Pages

Option A: Drag-and-drop
1. Zip the contents of this folder, not the parent folder.
2. Cloudflare Dashboard → Workers & Pages → Pages → Upload assets.
3. Upload the zip.
4. Add your custom domain.

Option B: Git deployment
1. Push this folder to GitHub.
2. Cloudflare Pages → Connect to Git.
3. Framework preset: None.
4. Build command: leave empty.
5. Build output directory: `/`.

## 3. Google indexing setup

After the domain is live:
1. Add the domain to Google Search Console.
2. Submit `/sitemap.xml`.
3. Check crawl/index coverage.
4. Test structured data with Google's Rich Results Test.

## 4. SEO/GEO notes

- Product pages include JSON-LD Product schema.
- The site includes `robots.txt`, `sitemap.xml`, and `llms.txt`.
- For AI search visibility, keep pages factual, structured, and machine-readable.
- Add original product photos, factory/process photos and real application cases before serious promotion.

## 5. Current product structure

- Hydraulic Breakers: ZSB model structure
- Quick Couplers: ZSN/ZSP product naming and ZSH parameter table
- Hydraulic Pile Hammers: S model structure
- Hydraulic Shears: HS model structure
- Hydraulic Pulverizers: ZOSIN model naming reference retained in placeholder form; rename if needed for your own brand strategy
- Hydraulic Compactors: ZS model structure

