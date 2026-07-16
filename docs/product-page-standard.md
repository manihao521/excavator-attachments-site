# KRATOR B2B Product Page Standard

## Purpose

A KRATOR product page must help a professional buyer decide whether an attachment is suitable, understand what data KRATOR needs, and start a qualified quotation. It is not a generic product brochure.

## Required Input Sheet

Do not draft final technical claims until these inputs are verified where relevant:

- Product name, subtype, and intended use
- Model list and excavator operating-weight range
- Attachment weight and key dimensions
- Hydraulic flow and working pressure
- Pin diameter, arm width, center distance, and bracket options
- Material, structure, wear parts, and replaceable components
- Rotation, cylinder, valve, motor, or control details
- Suitable and unsuitable applications
- OEM color, logo, hose, bracket, and packing options
- Inspection, test, document, and shipment proof available for the order
- Product, factory, application, and detail images
- Related product and blog URLs
- Quote destination and required form fields

If a fact is missing, mark it as a required input. Do not infer a number from another model or competitor.

## Required Page Structure

### 1. Hero Section

- Literal product name as H1
- Concise buyer-oriented description
- Verified carrier range or key fit statement
- Clear product image
- `Get Quote` and `WhatsApp Us`
- Breadcrumbs and parent category link

### 2. Why Choose This Product

Explain the specific buyer problem, best-fit work, meaningful advantages, and important limits. Avoid generic claims.

### 3. Key Features

Use verified features tied to outcomes such as fit, control, durability, maintenance, handling, or order flexibility.

### 4. Technical Specifications

Use a real table with one row per model and clearly labeled units. Typical fields include model, carrier weight, attachment weight, opening, length, width, hydraulic flow, pressure, rotation, and cutting or crushing data where applicable.

Do not replace a multi-model table with "customized according to request." For custom attachments, provide an engineering-input table and explain what is confirmed per project.

### 5. Applications

Describe real materials, job types, and working conditions. Link to relevant application pages. State exclusions or selection cautions where they prevent a bad match.

### 6. How To Choose

Compare subtypes and model options. Explain the decision variables and tradeoffs a dealer, fleet, or contractor should use.

### 7. How To Match With Excavator

Request and explain:

- Excavator brand and model
- Operating weight
- Pin diameter
- Arm width
- Center distance
- Hydraulic flow
- Working pressure
- Coupler or direct-pin arrangement
- Hose and control requirements
- Jobsite material and working condition

### 8. FAQ

Answer practical buyer questions visible on the page. Cover fit, hydraulics, bracket confirmation, wear parts, OEM, packing, documents, and quote data when relevant. Keep exactly one `FAQPage` node only when its questions and complete answers match the visible FAQ.

### 9. Related Products

Show products that solve an adjacent job, offer another subtype, or complete the workflow. Explain the relationship in the link context.

### 10. Related Articles

Link to useful comparison, measurement, selection, operation, or maintenance guides. Product pages must not be dead ends.

### 11. Quote CTA

Ask for the smallest complete data set needed to recommend a model and quote. Keep WhatsApp, email, and form paths working on desktop and mobile.

## SEO Requirements

- Unique title and meta description
- One H1 matching the actual product entity
- Canonical URL and valid breadcrumbs
- Descriptive headings and original subtype copy
- Accurate ALT text and image dimensions
- Internal links to category, products, guides, proof, and contact
- Visible content aligned with JSON-LD

Keep exactly one `Product` node with a canonical URL, visible name, description and image, plus truthful brand and manufacturer data. Do not add `Offer`, `Review`, or `AggregateRating` without verified public source data. A quote-only Product will not qualify for Google's Product snippet. Keep one `FAQPage` only when a matching FAQ is visible.

## Design and Conversion

- Follow `docs/brand-guideline.md` and existing product templates.
- Keep the product clearly visible in the first viewport.
- Make tables usable on narrow screens without hiding data.
- Use real proof and technical clarity instead of decorative badges.
- Keep the CTA present at decision points without obscuring content.

## Completion Gate

1. Product facts have a named source or are marked unverified.
2. Specification units and model relationships are internally consistent.
3. All local links and images exist in source and fresh `dist/`.
4. Metadata, canonical, headings, ALT text, and structured data are valid.
5. Desktop and mobile preview show no overlap or horizontal overflow.
6. WhatsApp and quote paths work and request relevant data.
7. `npm run build` passes.
