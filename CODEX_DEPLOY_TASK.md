# Codex Deployment Task

You are deploying a static B2B inquiry website for excavator attachments and piling/demolition tools.

## Goal
Deploy this repository to Cloudflare Pages with a production branch named `main`.

## Important business rules
- Keep the website as an independent new brand.
- Do not copy the old reference website's visual style, layout, images, or wording.
- Keep product model naming and parameter logic aligned with the reference product system:
  - Hydraulic Breaker: ZSB series
  - Quick Hitch / Quick Coupler: ZSN / ZSP / ZSH naming logic
  - Hydraulic Pile Hammer: S series
  - Hydraulic Shear / Pulverizer / Compactor categories
- Optimize for Google search, AI search, and high-quality B2B inquiries.

## What to do
1. Create or use a GitHub repository.
2. Commit all files in this folder to the repository root.
3. In Cloudflare Dashboard, create a Pages project or prepare a project name.
4. Create a Cloudflare API token with Cloudflare Pages edit/deploy permissions.
5. Add these GitHub repository secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
   - `CLOUDFLARE_PAGES_PROJECT`
6. Push to the `main` branch.
7. Confirm the GitHub Actions workflow `Deploy to Cloudflare Pages` finishes successfully.
8. After deployment, check:
   - `/`
   - `/products/`
   - `/products/hydraulic-breaker/`
   - `/products/quick-hitch/`
   - `/products/hydraulic-pile-hammer/`
   - `/contact/`
   - `/sitemap.xml`
   - `/robots.txt`
   - `/llms.txt`
9. Report the final Cloudflare Pages URL and any deployment warnings.

## Manual deploy fallback
If GitHub Actions is not configured yet, run:

```bash
npm install
npx wrangler login
npx wrangler pages deploy . --project-name=<your-pages-project-name> --branch=main
```

## Before launch replacements
Replace placeholders across the site:
- `KRATOR Attachments`
- `https://www.yourdomain.com`
- `manihao521@gmail.com`
- `+8613370928803`
- `https://formspree.io/f/your-form-id`

Then re-run deployment.
