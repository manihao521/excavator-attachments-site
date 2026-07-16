# Site Structure

## Technical Structure

This project is currently a static website deployed directly from the repository root to Cloudflare Pages.

Main technical files:

- `index.html`: English homepage
- `assets/styles.css`: Global stylesheet
- `assets/main.js`: Global JavaScript interactions
- `src/data/products.ts`: Unified product data source
- `work/update-products.mjs`: Product page / sitemap / llms generation helper
- `wrangler.toml`: Cloudflare Pages configuration
- `.github/workflows/deploy-cloudflare-pages.yml`: GitHub Actions deployment workflow

The project does not currently use a frontend framework such as React, Vue, Next.js, Astro, or Nuxt.

## Page List

Main pages and directories:

- `/`: Homepage
- `/products/`: Product index page
- `/products/<category>/`: Product category pages
- `/products/<category>/<product-slug>/`: Product detail pages
- `/about-us/`: About page
- `/applications/`: Application page
- `/custom-service/`: OEM / custom service page
- `/quality-control/`: Quality page
- `/contact/`: Contact page
- `/blog/`: Blog directory
- `/es/`: Spanish home page
- `/fr/`: French home page
- `/ru/`: Russian home page
- `/ar/`: Arabic home page
- `/sitemap.xml`: Sitemap
- `/robots.txt`: Robots file
- `/llms.txt`: AI search / LLM reference file

## Homepage Sections

Current homepage sections in `index.html`:

- Header / navigation / Products mega menu
- Hero banner
- Company strength strip
- Featured Attachments / core product categories
- Fits 1-90 Ton Excavators
- How to Get a Quote
- Applications
- OEM & Custom Service
- Quality & Manufacturing
- Stats strip
- Become a KRATOR Dealer
- Quote / inquiry form
- Footer
- Floating WhatsApp contact button

## Component-Like Areas

The current project is static HTML, so there are no formal component files. Reusable page blocks are currently repeated or generated through `work/update-products.mjs`.

Important reusable areas:

- Header
- Products mega menu
- Footer
- Product category cards
- Product detail page layout
- Quote form
- WhatsApp buttons
- Dealer CTA module

For future maintenance, these should be treated as components even before a framework migration.

## Style Files

Primary stylesheet:

- `assets/styles.css`

The stylesheet currently contains global styles for:

- Base layout
- Header and navigation
- Products mega menu
- Hero
- Featured product categories
- Tonnage strip
- Quote flow
- Applications
- OEM service
- Quality section
- Stats strip
- Dealer section
- Quote form
- Footer
- Product catalog pages
- Product detail pages
- Responsive styles

Known issue:

- Some legacy Popular Products styles remain after the module was removed from the homepage.

## JavaScript Files

Primary script:

- `assets/main.js`

Current script responsibilities:

- Mobile navigation toggle
- Products dropdown click behavior on mobile
- Legacy Popular Products tab logic
- Dealer CTA focus behavior
- File upload label behavior

Known issue:

- Legacy Popular Products tab logic may no longer be needed if the repeated Popular Products module is permanently removed.

## Image Resource Directories

Main image directories:

- `assets/brand/`: Logo and QR code
- `assets/images/`: Hero, footer, quote, quality, and other section images
- `assets/images/applications/`: Application scene images
- `assets/icons/`: UI and section icons
- `assets/placeholders/`: Older placeholder assets
- `assets/tonnage/`: Excavator tonnage images
- `images/products/`: Product category images used by public URLs
- `public/images/products/`: Duplicate product image copy / staging-style directory

Recommended public product image path:

- `/images/products/xxx.jpg`

## Forms And Contact Locations

Main inquiry form:

- `index.html`, quote section, posts to Formspree
- Endpoint: `https://formspree.io/f/xrevbydk`

Other form locations:

- `contact/index.html`
- `custom-service/index.html`

Contact details appear in:

- Header CTA / WhatsApp button
- Hero CTA
- Floating WhatsApp button
- Dealer section
- Quote form left panel
- Footer contact column
- Product detail pages
- JSON-LD organization data

Primary contact details:

- Email: manihao521@gmail.com
- WhatsApp: +8613370928803

## Multilingual Files

Current multilingual directories:

- `es/`
- `fr/`
- `ru/`
- `ar/`

Related generator / legacy helper:

- `work/generate_multilingual_home.py`

Known issue:

- Multilingual pages are not fully synchronized with the current English homepage and product structure.
- Some old product links may still exist in multilingual pages.

