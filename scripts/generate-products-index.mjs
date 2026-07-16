import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const productDataFile = path.join(root, "src", "data", "products.ts");
const productsIndexFile = path.join(root, "products", "index.html");
const whatsappBase = "https://wa.me/8613370928803";

function loadProductCategories() {
  const source = fs.readFileSync(productDataFile, "utf8");
  const match = source.match(/export const productCategories = (\[[\s\S]*\]) satisfies ProductCategory\[\];/);
  if (!match) {
    throw new Error(`Could not read productCategories from ${productDataFile}`);
  }
  return vm.runInNewContext(`(${match[1]})`, Object.freeze({}));
}

const categories = loadProductCategories();

const dropdownDescriptions = {
  "Hydraulic Breakers": "Side / Box / Top type breakers",
  "Quick Couplers": "P type, hydraulic and tilt couplers",
  "Vibratory Pile Hammers": "Side grip, top clamp and custom jaws",
  "Demolition Shears": "Rotating, fixed and steel cutting shears",
  "Hydraulic Pulverizers": "Concrete crushing and rebar separation",
  "Hydraulic Grapples": "Sorting, demolition, log and orange peel grapples",
  "Plate Compactors": "Trench, slope and foundation compaction",
  "Earth Augers": "Drilling for poles, foundations and landscaping",
  "Excavator Buckets": "Standard, rock, tilt and skeleton buckets",
  "Excavator Rippers": "Hard soil, rock and frozen ground ripping",
  "Custom Attachments": "OEM / ODM and special mounting solutions",
};

const categoryKickers = {
  "Hydraulic Breakers": "Breaker family",
  "Quick Couplers": "Coupler family",
  "Vibratory Pile Hammers": "Piling family",
  "Demolition Shears": "Demolition family",
  "Hydraulic Pulverizers": "Crushing family",
  "Hydraulic Grapples": "Handling family",
  "Plate Compactors": "Compaction family",
  "Earth Augers": "Drilling family",
  "Excavator Buckets": "Bucket family",
  "Excavator Rippers": "Ripping family",
  "Custom Attachments": "OEM / ODM family",
};

const categoryDescriptions = {
  "Hydraulic Breakers": "Heavy-duty breakers for demolition, quarry, trenching and concrete breaking.",
  "Quick Couplers": "Fast attachment change solutions for buckets, breakers and hydraulic tools.",
  "Vibratory Pile Hammers": "Excavator-mounted pile driving solutions for sheet piles and foundation work.",
  "Demolition Shears": "Steel cutting and demolition tools for scrap recycling and structure removal.",
  "Hydraulic Pulverizers": "Concrete crushing attachments for demolition and rebar separation.",
  "Hydraulic Grapples": "Grapples for sorting, demolition, log handling and scrap recycling.",
  "Plate Compactors": "Hydraulic compactors for trench, slope, foundation and road shoulder work.",
  "Earth Augers": "Auger drives and drill bits for foundation, pole and landscaping work.",
  "Excavator Buckets": "Standard, rock, heavy-duty and custom buckets for earthmoving and mining.",
  "Excavator Rippers": "Heavy-duty ripping tools for hard soil, rock and frozen ground.",
  "Custom Attachments": "Custom brackets, clamps and private label attachments for dealers.",
};

const featuredProductSlugs = [
  "side-type-hydraulic-breaker",
  "box-type-hydraulic-breaker",
  "top-type-hydraulic-breaker",
  "p-type-quick-coupler",
  "hydraulic-quick-coupler",
  "side-grip-vibratory-pile-hammer",
  "hydraulic-shear",
  "hydraulic-pulverizer",
  "grapples",
  "plate-compactors",
  "earth-augers",
  "heavy-duty-bucket",
];

const categoryFilterGroups = {
  breakers: "breakers",
  couplers: "couplers",
  "pile-hammers": "pile-hammers",
  shears: "shears",
  pulverizers: "pulverizers",
  grapples: "grapples",
  buckets: "buckets",
  compactors: "others",
  "earth-augers": "others",
  rippers: "others",
  "custom-attachments": "others",
};

const productFilterOverrides = {
  "custom-jaw-solution": "others",
  "custom-mounting-brackets": "others",
  "custom-pile-clamps": "others",
  "oem-odm-attachments": "others",
  "private-label-attachments": "others",
};

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function normalizePath(value = "") {
  return String(value).replace(/^\/public\//, "/");
}

function routeFor(category, product = null) {
  return product ? `/products/${category.slug}/${product.slug}/` : `/products/${category.slug}/`;
}

function imageFor(category, product = null) {
  return normalizePath(product?.image || category.image || "/images/products/featured/raw/hydraulic-breaker.webp");
}

function categoryTags(category) {
  const source = category.types?.length ? category.types.map((type) => type.title) : category.features || [];
  return source.slice(0, 3);
}

function filterGroupFor(category, product = null) {
  if (product?.slug && productFilterOverrides[product.slug]) {
    return productFilterOverrides[product.slug];
  }
  return categoryFilterGroups[category.key] || "others";
}

function productRecord(category, product = null) {
  const isCategory = !product;
  return {
    slug: isCategory ? category.slug : product.slug,
    title: isCategory ? category.label : product.title,
    category: category.label,
    image: imageFor(category, product),
    href: isCategory ? routeFor(category) : routeFor(category, product),
    tonnage: isCategory ? category.tonnage : product.tonnage,
    description: isCategory
      ? categoryDescriptions[category.label] || category.shortDescription || category.metaDescription
      : product.shortDescription,
    filterGroup: filterGroupFor(category, product),
    isCategory,
  };
}

function allProductRecords() {
  const records = [];
  for (const category of categories) {
    records.push(productRecord(category));
    for (const product of category.types || []) {
      records.push(productRecord(category, product));
    }
  }
  return records;
}

function featuredProductRecords() {
  const records = allProductRecords();
  const bySlug = new Map(records.map((record) => [record.slug, record]));
  const featured = featuredProductSlugs.map((slug) => bySlug.get(slug)).filter(Boolean);
  const remaining = records.filter((record) => !record.isCategory && !featuredProductSlugs.includes(record.slug));
  return [...featured, ...remaining];
}

function quoteHref(productName = "") {
  const text = productName
    ? `Hello KRATOR, I would like to get a quote for ${productName}.`
    : "Hello KRATOR, I would like to get a quote for excavator attachments.";
  return `${whatsappBase}?text=${encodeURIComponent(text)}`;
}

function categoryCard(category) {
  const description = categoryDescriptions[category.label] || category.shortDescription || category.metaDescription;
  return `<a class="product-index-card" href="${routeFor(category)}">
      <img src="${imageFor(category)}" alt="${escapeHtml(category.label)}">
      <div>
        <span>${escapeHtml(categoryKickers[category.label] || category.eyebrow || "Product family")}</span>
        <h3>${escapeHtml(category.label)}</h3>
        <p>${escapeHtml(description)}</p>
        <ul>${categoryTags(category).map((tag) => `<li>${escapeHtml(tag)}</li>`).join("")}</ul>
        <b class="product-index-action">View Category</b>
      </div>
    </a>`;
}

function subtypeCard(record) {
  return `<article class="catalog-product-card" data-group="${escapeHtml(record.filterGroup)}">
      <a class="catalog-product-main" href="${record.href}">
        <img src="${record.image}" alt="${escapeHtml(record.title)}">
        <span>${escapeHtml(record.category)}</span>
        <h3>${escapeHtml(record.title)}</h3>
        <p>${escapeHtml(record.description)}</p>
      </a>
      <div class="product-card-actions">
        <a class="details-chip" href="${record.href}">View Details</a>
        <a class="quote-chip" href="/#quote-form">Get Quote</a>
      </div>
    </article>`;
}

function productsMain() {
  const categoryCards = categories.map(categoryCard).join("\n    ");
  const productCards = featuredProductRecords().map(subtypeCard).join("\n    ");

  return `<main class="products-page">

<section class="page-hero products-page-hero">
  <div class="products-hero-copy">
    <nav class="inner-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span>Products</span></nav>
    <p class="eyebrow">PRODUCT CENTER</p>
    <h1><span>Excavator Attachments</span><span>Product Center</span></h1>
    <p>Browse KRATOR hydraulic breakers, quick couplers, pile hammers, demolition tools, buckets, grapples and custom attachments for 1&ndash;90 ton excavators.</p>
    <div class="actions products-hero-actions">
      <a class="btn primary" href="/#quote-form"><img src="/images/icons/product-detail/email-contact-icon.webp" alt="" aria-hidden="true">Get Quote in 24 Hours</a>
      <a class="btn outline" href="${quoteHref("excavator attachment matching")}" target="_blank" rel="noopener"><img src="/images/icons/product-detail/whatsapp-chat-icon.webp" alt="" aria-hidden="true">WhatsApp Instant Reply</a>
    </div>
  </div>
  <aside class="products-hero-panel" aria-label="Fast matching support">
    <span>FAST ATTACHMENT MATCHING</span>
    <strong>Fast Attachment Matching</strong>
    <p>Send your excavator model, tonnage and working condition. KRATOR will recommend the right attachment, bracket and shipping solution.</p>
    <ul>
      <li>1&ndash;90 Ton Excavator Matching</li>
      <li>OEM Bracket &amp; Pin Size</li>
      <li>Factory Direct Quote</li>
    </ul>
  </aside>
</section>
<section class="section products-category-section">
  <div class="section-head products-section-head">
    <p class="eyebrow">CORE PRODUCT CATEGORIES</p>
    <h2>Choose by Attachment Category</h2>
    <p>Start with the main product family, then open a category page to review subtypes, applications and model matching details.</p>
  </div>
  <div class="product-index-grid">
    ${categoryCards}
  </div>
</section>
<section class="products-mid-cta" aria-label="Attachment matching support">
  <div class="products-mid-cta__copy">
    <img class="products-mid-cta__icon" src="/images/products/cta/matching-support-icon.webp" alt="" aria-hidden="true">
    <div>
      <h2>Not Sure Which Attachment Fits Your Excavator?</h2>
      <p>Send machine model, tonnage and working condition. We will recommend the right attachment and bracket size.</p>
    </div>
  </div>
  <a class="btn primary" href="/#quote-form">Get Matching Recommendation</a>
</section>
<section class="section muted products-subtype-section" id="product-types">
  <div class="section-head products-subtypes-head"><p class="eyebrow">PRODUCT SUBTYPES</p><h2>Featured Product Types</h2><p>Choose a specific attachment configuration, then open the detail page to review features, applications and model matching data.</p></div>
  <nav class="product-subtype-tabs" aria-label="Product subtype filters">
    <button class="product-subtype-tab is-active" type="button" data-filter="all" aria-pressed="true">All</button>
    <button class="product-subtype-tab" type="button" data-filter="breakers" aria-pressed="false">Breakers</button>
    <button class="product-subtype-tab" type="button" data-filter="couplers" aria-pressed="false">Couplers</button>
    <button class="product-subtype-tab" type="button" data-filter="pile-hammers" aria-pressed="false">Pile Hammers</button>
    <button class="product-subtype-tab" type="button" data-filter="shears" aria-pressed="false">Shears</button>
    <button class="product-subtype-tab" type="button" data-filter="pulverizers" aria-pressed="false">Pulverizers</button>
    <button class="product-subtype-tab" type="button" data-filter="grapples" aria-pressed="false">Grapples</button>
    <button class="product-subtype-tab" type="button" data-filter="buckets" aria-pressed="false">Buckets</button>
    <button class="product-subtype-tab" type="button" data-filter="others" aria-pressed="false">Others</button>
  </nav>
  <div class="catalog-product-grid">
    ${productCards}
  </div>
  <p class="product-filter-empty" hidden>No products found in this category. Please contact us for custom attachment support.</p>
</section>
<section class="products-bottom-cta" aria-label="Products quote support">
  <div class="products-bottom-cta__top">
    <div class="products-bottom-cta__copy">
      <h2>Ready to Get Your Attachment Quote?</h2>
      <p>Factory direct price, professional support and fast delivery.</p>
    </div>
    <div class="products-bottom-cta__actions">
      <a class="btn primary" href="/#quote-form"><img src="/images/icons/product-detail/email-contact-icon.webp" alt="" aria-hidden="true">Get Quote in 24 Hours</a>
      <a class="btn outline" href="${quoteHref("excavator attachment matching")}" target="_blank" rel="noopener"><img src="/images/icons/product-detail/whatsapp-chat-icon.webp" alt="" aria-hidden="true">WhatsApp Instant Reply</a>
    </div>
  </div>
  <div class="products-bottom-cta__trust">
    <div class="products-bottom-cta__trust-item">
      <img class="products-bottom-cta__trust-icon" src="/images/icons/product-detail/factory-manufacturing-icon.webp" alt="" aria-hidden="true">
      <span><strong>Factory Direct Price</strong><em>Competitive pricing with strict quality control.</em></span>
    </div>
    <div class="products-bottom-cta__trust-item">
      <img class="products-bottom-cta__trust-icon" src="/images/icons/product-detail/custom-attachment-service-icon.webp" alt="" aria-hidden="true">
      <span><strong>OEM / ODM Available</strong><em>Custom design, logo and packaging supported.</em></span>
    </div>
    <div class="products-bottom-cta__trust-item">
      <img class="products-bottom-cta__trust-icon" src="/images/icons/product-detail/global-shipping-equipment-icon.webp" alt="" aria-hidden="true">
      <span><strong>Global Shipping</strong><em>Reliable logistics to 100+ countries worldwide.</em></span>
    </div>
    <div class="products-bottom-cta__trust-item">
      <img class="products-bottom-cta__trust-icon" src="/images/icons/product-detail/fast-attachment-match-icon.webp" alt="" aria-hidden="true">
      <span><strong>Fast Response</strong><em>Professional team, quick reply within 24 hours.</em></span>
    </div>
  </div>
</section>
</main>`;
}

function dropdownGrid() {
  return categories.map((category) => `<a class="dropdown-product-link" href="${routeFor(category)}">
          <span class="dropdown-product-thumb"><img src="${imageFor(category)}" alt="" aria-hidden="true"></span>
          <span class="dropdown-product-text"><strong>${escapeHtml(category.label)}</strong><em>${escapeHtml(dropdownDescriptions[category.label] || category.shortDescription || "")}</em></span>
          <b aria-hidden="true">&#8250;</b>
        </a>`).join("\n        ");
}

function syncHeaderDropdown(html) {
  return html.replace(
    /<div class="dropdown-product-grid">[\s\S]*?<\/div>\s*<aside class="dropdown-feature-panel">/,
    `<div class="dropdown-product-grid">
        ${dropdownGrid()}
          </div>
          <aside class="dropdown-feature-panel">`,
  );
}

function htmlFiles(dir) {
  const skip = new Set([".git", "work", "outputs", "node_modules"]);
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...htmlFiles(full));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

const productsHtml = fs.readFileSync(productsIndexFile, "utf8");
const nextProductsHtml = productsHtml.replace(/<main class="products-page">[\s\S]*?<\/main>/, productsMain());
fs.writeFileSync(productsIndexFile, syncHeaderDropdown(nextProductsHtml), "utf8");

let syncedHeaders = 0;
for (const file of htmlFiles(root)) {
  const html = fs.readFileSync(file, "utf8");
  if (!html.includes("dropdown-product-grid")) continue;
  const next = syncHeaderDropdown(html);
  if (next !== html) {
    fs.writeFileSync(file, next, "utf8");
    syncedHeaders += 1;
  }
}

console.log(`Generated products index from ${categories.length} categories and synced ${syncedHeaders} product dropdowns.`);
