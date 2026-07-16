import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const siteUrl = "https://www.kratorattachments.com";
const whatsappUrl =
  "https://wa.me/8613370928803?text=Hello%20KRATOR%2C%20I%20would%20like%20to%20get%20a%20matching%20attachment%20model%20for%20my%20excavator.";

const dataSource = fs.readFileSync(path.join(root, "src/data/products.ts"), "utf8");
const dataMatch = dataSource.match(/export const productCategories = ([\s\S]*?) satisfies ProductCategory\[\];/);

if (!dataMatch) {
  throw new Error("Unable to find productCategories in src/data/products.ts");
}

const productCategories = JSON.parse(dataMatch[1]);
const catalogSpecsSource = fs.readFileSync(path.join(root, "src/data/catalogSpecs.ts"), "utf8");
const catalogSpecsMatch = catalogSpecsSource.match(/export const catalogSpecs(?:\s*:[^=]+)?\s*=\s*([\s\S]*?)\s+as const;/);

if (!catalogSpecsMatch) {
  throw new Error("Unable to find catalogSpecs in src/data/catalogSpecs.ts");
}

const catalogSpecs = JSON.parse(catalogSpecsMatch[1]);
const productsIndexHtml = fs.readFileSync(path.join(root, "products/index.html"), "utf8");
const header = productsIndexHtml.match(/<header class="site-header homepage-header">[\s\S]*?<\/header>/)?.[0];
const footerDocumentTail = productsIndexHtml.match(/<footer class="footer">[\s\S]*?<\/html>/)?.[0];

if (!header || !footerDocumentTail) {
  throw new Error("Unable to extract shared header/footer from products/index.html");
}

const categoryImageMap = {
  "hydraulic-breaker": "/images/products/featured/raw/hydraulic-breaker.webp",
  "quick-coupler": "/images/products/featured/raw/quick-coupler.webp",
  "vibratory-pile-hammer": "/images/products/featured/raw/pile-driver.webp",
  "hydraulic-shear": "/images/products/featured/raw/hydraulic-shear.webp",
  "hydraulic-pulverizer": "/images/products/featured/raw/hydraulic-pulverizer.webp",
  grapples: "/images/products/featured/raw/grapple.webp",
  "plate-compactors": "/images/products/featured/raw/plate-compactor.webp",
  "earth-augers": "/images/products/featured/raw/earth-auger.webp",
  "excavator-buckets": "/images/products/featured/raw/heavy-duty-bucket.webp",
  rippers: "/images/products/featured/raw/excavator-ripper.webp",
  "custom-attachments": "/images/products/featured/raw/custom-attachments.webp",
};

const defaultBenefits = [
  "Heavy-Duty Steel Structure",
  "Model-Matched Bracket & Pin Size",
  "Stable Performance for Harsh Jobsites",
  "Factory-Direct Manufacturing",
  "Custom OEM / ODM Available",
  "Packed for Overseas Shipping",
];

const fitmentSteps = [
  {
    title: "Send Machine Info",
    icon: "upload",
  },
  {
    title: "Confirm Bracket & Pin Size",
    icon: "bracket",
  },
  {
    title: "Get Fast Recommendation",
    icon: "fastMatch",
  },
  {
    title: "WhatsApp / Email Quote",
    icon: "whatsapp",
  },
];

const detailIcons = {
  bracket: "bracket-pin-icon.webp",
  factory: "factory-manufacturing-icon.webp",
  shipping: "global-shipping-icon.webp",
  shippingEquipment: "global-shipping-equipment-icon.webp",
  impact: "impact-energy-icon.webp",
  fastMatch: "fast-attachment-match-icon.webp",
  quality: "quality-inspection-icon.webp",
  custom: "custom-attachment-service-icon.webp",
  steel: "steel-structure-icon.webp",
  service: "service-support-icon.webp",
  upload: "upload-machine-info-icon.webp",
  whatsapp: "whatsapp-chat-icon.webp",
  email: "email-contact-icon.webp",
  download: "download-catalog-icon.png",
};

const heroTags = [
  ["Model Matched Fit", "bracket"],
  ["OEM / ODM Support", "custom"],
  ["Factory Direct Price", "factory"],
  ["Global Shipping", "shipping"],
];

const trustItems = [
  ["Factory Manufacturer", "Direct Supply", "factory"],
  ["10+ Years Experience", "In Attachment Industry", "quality"],
  ["Exported to 30+", "Countries", "shippingEquipment"],
  ["OEM / ODM", "Customization", "custom"],
];

const advantageItems = [
  [
    "Heavy-Duty Steel Structure",
    "High strength steel, durable and reliable.",
    "steel",
  ],
  [
    "Precision Engineering",
    "Advanced technology for superior performance.",
    "quality",
  ],
  [
    "OEM Custom Bracket",
    "Perfect match for your excavator.",
    "bracket",
  ],
  [
    "Stable Performance",
    "High impact force, longer service life.",
    "impact",
  ],
  [
    "Easy Installation",
    "Simple structure, easy to operate.",
    "service",
  ],
  [
    "Low Maintenance",
    "Wear-resistant parts, cost effective.",
    "service",
  ],
];

const applicationCards = [
  {
    title: "Mining",
    image: "/assets/images/applications/application-quarry-mining.webp",
    icon: "steel",
  },
  {
    title: "Demolition",
    image: "/assets/images/applications/application-demolition.jpg",
    icon: "impact",
  },
  {
    title: "Road Construction",
    image: "/assets/images/applications/application-road-construction.jpg",
    icon: "factory",
  },
  {
    title: "Quarry",
    image: "/assets/images/applications/application-quarry-mining.webp",
    icon: "steel",
  },
  {
    title: "Trenching",
    image: "/assets/images/applications/application-utility-pipeline.jpg",
    icon: "upload",
  },
  {
    title: "Recycling",
    image: "/assets/images/applications/application-scrap-recycling.jpg",
    icon: "custom",
  },
];

const bottomTrustItems = [
  ["Fast Response", "Within 12 Hours", "fastMatch"],
  ["Factory Direct Price", "Competitive & Reliable", "factory"],
  ["Global Shipping", "Worldwide Delivery", "shippingEquipment"],
  ["Professional Support", "Pre-sales & After-sales", "service"],
];

const breakerSpecRows = [
  ["KRB680", "1\u20133", "1200", "90\u2013120", "15\u201330", "40", "100", "Mini Excavator"],
  ["KRB1000", "6\u201312", "1950", "100\u2013140", "20\u201340", "45", "180", "Mini Excavator"],
  ["KRB1400", "12\u201318", "2700", "120\u2013150", "30\u201360", "53", "260", "Excavator"],
  ["KRB1750", "18\u201326", "4000", "130\u2013160", "40\u2013100", "68", "430", "Excavator"],
  ["KRB2100", "26\u201335", "5500", "150\u2013170", "60\u2013120", "75", "620", "Excavator"],
  ["KRB2600", "35\u201390", "9000", "160\u2013180", "80\u2013140", "140", "1250", "Excavator"],
];

const bestMatchedRelated = [
  {
    title: "Quick Coupler",
    tonnage: "1\u201390 Ton Excavators",
    image: "/images/products/featured/raw/quick-coupler.webp",
    route: "/products/quick-coupler/",
  },
  {
    title: "Excavator Bucket",
    tonnage: "1\u201390 Ton Excavators",
    image: "/images/products/featured/raw/heavy-duty-bucket.webp",
    route: "/products/excavator-buckets/",
  },
  {
    title: "Hydraulic Shear",
    tonnage: "5\u201390 Ton Excavators",
    image: "/images/products/featured/raw/hydraulic-shear.webp",
    route: "/products/hydraulic-shear/",
  },
  {
    title: "Hydraulic Grapple",
    tonnage: "1\u201390 Ton Excavators",
    image: "/images/products/featured/raw/grapple.webp",
    route: "/products/grapples/",
  },
  {
    title: "Vibro Hammer",
    tonnage: "5\u201390 Ton Excavators",
    image: "/images/products/featured/raw/pile-driver.webp",
    route: "/products/vibratory-pile-hammer/",
  },
];

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function normalizeTonnage(value = "") {
  return String(value)
        .replace(/\s+-\s+/g, "\u2013")
    .replace(/\bton\b/gi, "Ton")
    .trim();
}

function carrierText(product) {
  const value = normalizeTonnage(product.tonnage || "Custom Available");
  if (/ton/i.test(value) && !/excavator/i.test(value)) {
    return `${value} Excavators`;
  }
  return value;
}

function routeFor(category, product = null) {
  if (!product || product.slug === category.slug) {
    return `/products/${category.slug}/`;
  }
  return `/products/${category.slug}/${product.slug}/`;
}

function titleForCategory(category) {
  const singularMap = {
    "Hydraulic Breakers": "Hydraulic Breaker",
    "Quick Couplers": "Quick Coupler",
    "Vibratory Pile Hammers": "Vibratory Pile Hammer",
    "Hydraulic Shears": "Hydraulic Shear",
    "Demolition Shears": "Hydraulic Shear",
    "Hydraulic Pulverizers": "Hydraulic Pulverizer",
    "Hydraulic Grapples": "Hydraulic Grapple",
    "Plate Compactors": "Plate Compactor",
    "Earth Augers": "Earth Auger",
    "Excavator Buckets": "Excavator Bucket",
    "Excavator Rippers": "Excavator Ripper",
  };
  return singularMap[category.title] || singularMap[category.label] || category.title;
}

function imageFor(category, product = null) {
  return product?.image || category.image || categoryImageMap[category.slug] || "/images/products/featured/raw/hydraulic-breaker.webp";
}

const aliasSeoOverrides = {
  "products/box-type-hydraulic-breaker": {
    title: "Box Type Hydraulic Breaker for Excavators | KRATOR ATTACHMENTS",
    description:
      "Heavy-duty box type hydraulic breaker page for excavator demolition, quarrying and concrete breaking, with enclosed housing and KRATOR model matching support.",
  },
  "products/top-type-hydraulic-breaker": {
    title: "Top Type Hydraulic Breaker for Excavators | KRATOR ATTACHMENTS",
    description:
      "Top type hydraulic breaker page for excavators requiring easy positioning, wide visibility and KRATOR bracket matching support.",
  },
  "products/hydraulic-compactor": {
    title: "Hydraulic Compactor Attachments | KRATOR Plate Compactors",
    description:
      "Hydraulic compactor attachment page for excavator trench backfill, foundation, slope and road shoulder compaction with KRATOR bracket matching.",
  },
  "products/vibro-hammers": {
    title: "Excavator Vibro Hammers | KRATOR Pile Driving Attachments",
    description:
      "Excavator vibro hammer page for sheet pile, H-beam, pipe pile, concrete pile and timber pile driving applications.",
  },
};

function productRecord(category, product = null, routeSlug = null) {
  const isCategory = !product || product.slug === category.slug;
  const categoryRouteSlug = routeSlug || category.slug;
  const productRouteSlug = !isCategory && routeSlug;
  const routePath = isCategory
    ? `products/${categoryRouteSlug}`
    : productRouteSlug
      ? `products/${productRouteSlug}`
      : `products/${category.slug}/${product.slug}`;
  const seoOverride = aliasSeoOverrides[routePath];
  return {
    slug: isCategory ? category.slug : product.slug,
    pagePath: isCategory
      ? path.join(root, "products", categoryRouteSlug, "index.html")
      : productRouteSlug
        ? path.join(root, "products", productRouteSlug, "index.html")
        : path.join(root, "products", category.slug, product.slug, "index.html"),
    route: isCategory ? `/products/${categoryRouteSlug}/` : productRouteSlug ? `/products/${productRouteSlug}/` : routeFor(category, product),
    parentRoute: routeFor(category),
    parentTitle: category.title,
    categoryName: isCategory ? category.category : product.category || category.category,
    name: isCategory ? titleForCategory(category) : product.title,
    metaTitle: seoOverride?.title || (isCategory ? category.metaTitle : product.metaTitle || `${product.title} | KRATOR Excavator Attachments`),
    metaDescription:
      seoOverride?.description ||
      (isCategory
        ? category.metaDescription
        : product.metaDescription || `${product.shortDescription} KRATOR matches bracket size, pin dimensions and quote details for overseas excavator buyers.`),
    eyebrow: "EXCAVATOR ATTACHMENT",
    description: isCategory
      ? category.shortDescription || category.metaDescription || category.overview
      : product.shortDescription,
    longDescription: isCategory ? category.overview : product.shortDescription,
    tonnage: carrierText(isCategory ? category : product),
    image: imageFor(category, product),
    tags: unique([
      ...(isCategory ? category.features || [] : product.bullets || []),
      "Model-Matched Bracket",
      "OEM Pin Size",
      "Factory Direct Price",
      "Global Shipping",
    ]).slice(0, 4),
    features: unique([...(isCategory ? category.features || [] : product.features || []), ...defaultBenefits]).slice(0, 6),
    applications: unique(isCategory ? category.applications || [] : product.applications || []).slice(0, 6),
    specs: isCategory ? category.specs || [] : product.specs || [],
    isCategory,
    categoryData: category,
    productData: product,
  };
}

function unique(items) {
  return [...new Set((items || []).filter(Boolean))];
}

function isHydraulicBreakerRecord(record) {
  return record.slug === "hydraulic-breaker" || record.categoryData?.slug === "hydraulic-breaker";
}

function heroTitle(record) {
  if (record.slug === "hydraulic-breaker") return "HYDRAULIC BREAKER";
  return record.name.toUpperCase();
}

function heroModel(record) {
  return isHydraulicBreakerRecord(record) ? "KRB1400" : record.productData?.model || record.categoryData?.model || "";
}

function heroDescription(record) {
  if (isHydraulicBreakerRecord(record)) {
    return "Heavy-duty hydraulic breaker for demolition, trenching, quarry and mining applications. Built for stability, high impact force and long service life.";
  }
  return record.description;
}

function heroCarrier(record) {
  if (isHydraulicBreakerRecord(record)) return "1\u201390 Ton Excavators";
  return record.tonnage;
}

function quickSpecCarrier(record) {
  return heroCarrier(record).replace(/\s+Excavators?$/i, "").trim();
}

function quickSpecs(record) {
  return [
    ["Carrier Weight", quickSpecCarrier(record), "fastMatch"],
    ["Pin Diameter", "Custom Match", "bracket"],
    ["Arm Width", "Custom Match", "upload"],
    ["Center Distance", "Custom Match", "upload"],
    ["Bracket Type", "OEM / ODM", "custom"],
  ];
}

function specificationRows(record) {
  const sourceSpecs = Object.fromEntries((record.specs || []).map(([label, value]) => [label.toLowerCase(), value]));
  return [
    ["Model", sourceSpecs["model / series"] || sourceSpecs["model series"] || record.productData?.model || record.categoryData.model || "Custom data available on request"],
    ["Carrier Weight", record.tonnage],
    ["Product Type", sourceSpecs["product type"] || record.name],
    ["Pin Diameter", "Custom data available on request"],
    ["Arm Width", "Custom data available on request"],
    ["Center Distance", sourceSpecs["key matching data"] || "Custom data available on request"],
    ["Oil Flow", "Custom data available on request"],
    ["Working Pressure", "Custom data available on request"],
    ["Weight", "Custom data available on request"],
    ["Remarks", sourceSpecs["common options"] || sourceSpecs.options || "Custom data available on request"],
  ];
}

const catalogSpecAliases = {
  "hydraulic-breaker": ["hydraulic_breaker"],
  "side-type-hydraulic-breaker": ["hydraulic_breaker"],
  "box-type-hydraulic-breaker": ["hydraulic_breaker"],
  "top-type-hydraulic-breaker": ["hydraulic_breaker"],
  "silence-type-hydraulic-breaker": ["hydraulic_breaker"],
  "quick-hitch": [
    "p_type_quick_hitch_coupler",
    "tilting_quick_coupler",
  ],
  "quick-hitch-coupler": ["p_type_quick_hitch_coupler", "tilting_quick_coupler"],
  "quick-coupler": ["p_type_quick_hitch_coupler", "tilting_quick_coupler"],
  "p-type-quick-coupler": ["p_type_quick_hitch_coupler"],
  "p-type-quick-hitch-coupler": ["p_type_quick_hitch_coupler"],
  "hydraulic-quick-coupler": ["h_type_quick_hitch_coupler"],
  "h-type-quick-hitch-coupler": ["h_type_quick_hitch_coupler"],
  "mechanical-quick-coupler": ["p_type_quick_hitch_coupler"],
  "tilt-quick-coupler": ["tilting_quick_coupler"],
  "tilting-quick-coupler": ["tilting_quick_coupler"],
  "rotating-quick-coupler": ["rotating_quick_coupler"],
  "rotary-quick-coupler": ["rotating_quick_coupler"],
  "vibratory-pile-hammer": ["hydraulic_pile_hammer"],
  "hydraulic-pile-hammer": ["hydraulic_pile_hammer"],
  "vibro-hammers": ["hydraulic_pile_hammer"],
  "vibratory-pile-driver": ["hydraulic_pile_hammer"],
  "pile-driving-attachment": ["hydraulic_pile_hammer"],
  "hydraulic-shear": ["double_cylinder_hydraulic_shear"],
  "rotating-demolition-shear": ["double_cylinder_hydraulic_shear"],
  "fixed-demolition-shear": ["double_cylinder_hydraulic_shear"],
  "steel-cutting-shear": ["double_cylinder_hydraulic_shear"],
  "scrap-shear": ["double_cylinder_hydraulic_shear"],
  "double-cylinder-demolition-shear": ["double_cylinder_hydraulic_shear"],
  "double-cylinder-hydraulic-shear": ["double_cylinder_hydraulic_shear"],
  "demolition-shear": ["double_cylinder_hydraulic_shear"],
  "hydraulic-pulverizer": ["hydraulic_pulverizer"],
  "concrete-pulverizer": ["hydraulic_pulverizer"],
  "demolition-pulverizer": ["hydraulic_pulverizer"],
  "grapples": ["log_grapple", "hydraulic_orange_peel_grapple"],
  "log-grapple": ["log_grapple"],
  "timber-grapple": ["log_grapple"],
  "wood-grapple": ["log_grapple"],
  "orange-peel-grapple": ["hydraulic_orange_peel_grapple"],
  "hydraulic-orange-peel-grapple": ["hydraulic_orange_peel_grapple"],
  "scrap-grapple": ["hydraulic_orange_peel_grapple"],
  "sorting-grapple": ["hydraulic_orange_peel_grapple"],
  "demolition-grapple": ["hydraulic_orange_peel_grapple"],
  "stone-grapple": ["log_grapple"],
  "earth-augers": ["earth_auger"],
  "earth-auger": ["earth_auger"],
  "excavator-earth-auger": ["earth_auger"],
  "hydraulic-earth-auger": ["earth_auger"],
  "auger-drive": ["earth_auger"],
  "auger-drive-unit": ["earth_auger"],
  "plate-compactors": ["hydraulic_compactor"],
  "hydraulic-compactor": ["hydraulic_compactor"],
  "plate-compactor": ["hydraulic_compactor"],
  "excavator-compactor": ["hydraulic_compactor"],
  "hydraulic-plate-compactor": ["hydraulic_compactor"],
  "standard-plate-compactor": ["hydraulic_compactor"],
  "tilt-plate-compactor": ["hydraulic_compactor"],
  "heavy-duty-plate-compactor": ["hydraulic_compactor"],
};

const catalogSpecsByKey = new Map(catalogSpecs.map((set) => [set.key, set]));

function cleanCatalogText(value = "") {
  const cleaned = String(value)
    .replace(/\s+/g, " ")
    .trim();
  return cleaned || "-";
}

function displayCatalogModel(model = "") {
  return cleanCatalogText(model)
    .replace(/^ZSB/, "KSB")
    .replace(/^ZSS/, "KSS")
    .replace(/^ZSP/, "KSP")
    .replace(/^ZSH/, "KSH")
    .replace(/^ZSG/, "KSG")
    .replace(/^ZS(?=[A-Z0-9-])/, "KS");
}

function catalogKeysForSlugs(slugs = []) {
  const keys = new Set();
  const slugSet = new Set(slugs.filter(Boolean));

  for (const slug of slugSet) {
    for (const key of catalogSpecAliases[slug] || []) {
      keys.add(key);
    }
  }

  for (const set of catalogSpecs) {
    if ((set.websiteSlugCandidates || []).some((slug) => slugSet.has(slug))) {
      keys.add(set.key);
    }
  }

  return [...keys];
}

function catalogSpecSetsFor(record) {
  const directKeys = catalogKeysForSlugs([record.slug, record.productData?.slug]);
  const keys = directKeys.length
    ? directKeys
    : catalogKeysForSlugs([record.categoryData?.slug, ...(record.categoryData?.aliases || [])]);

  return keys.map((key) => catalogSpecsByKey.get(key)).filter(Boolean);
}

function compactModels(models = []) {
  if (models.length <= 6) return models;
  const positions = [0, 0.2, 0.4, 0.6, 0.8, 1].map((ratio) => Math.round((models.length - 1) * ratio));
  return [...new Set(positions.map((index) => models[index]).filter(Boolean))];
}

function ProductSpecsTable(specSet, options = {}) {
  const models = options.models || specSet.models || [];
  const minWidth = Math.max(880, 300 + models.length * 120);
  const title = options.title ?? true;
  const tableClass = options.compact ? "pdp-spec-table pdp-catalog-table pdp-catalog-table-compact" : "pdp-spec-table pdp-catalog-table";

  return `<div class="pdp-catalog-spec-set">
    ${title ? `<h3>${escapeHtml(cleanCatalogText(specSet.title))}</h3>` : ""}
    <p class="pdp-spec-swipe-hint">Swipe to view more models</p>
    <div class="pdp-table-wrap pdp-catalog-table-wrap" role="region" aria-label="${escapeHtml(cleanCatalogText(specSet.title))} technical specifications" tabindex="0">
      <table class="${tableClass}" style="min-width: ${minWidth}px">
        <thead>
          <tr>
            <th class="pdp-spec-param-head" scope="col" rowspan="2">Parameter</th>
            <th class="pdp-spec-unit-head" scope="col" rowspan="2">Unit</th>
            <th class="pdp-spec-models-head" scope="col" colspan="${models.length}">Models</th>
          </tr>
          <tr>
            ${models.map((model) => `<th class="pdp-spec-model-head" scope="col">${escapeHtml(displayCatalogModel(model))}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${(specSet.parameters || []).map((parameter) => `<tr>
            <th scope="row">${escapeHtml(cleanCatalogText(parameter.name))}</th>
            <td class="pdp-spec-unit-cell">${escapeHtml(cleanCatalogText(parameter.unit))}</td>
            ${models.map((model) => `<td>${escapeHtml(cleanCatalogText(parameter.values?.[model]))}</td>`).join("")}
          </tr>`).join("")}
        </tbody>
      </table>
    </div>
  </div>`;
}

function ProductSpecsSet(specSet) {
  const previewModels = compactModels(specSet.models || []);

  return `<div class="pdp-spec-group">
    <h3>${escapeHtml(cleanCatalogText(specSet.title))}</h3>
    ${ProductSpecsTable(specSet, { models: previewModels, title: false, compact: true })}
  </div>`;
}

function BreakerSpecsPreview() {
  const headers = [
    "Model",
    "Carrier Weight (Ton)",
    "Impact Energy (J)",
    "Working Pressure (Bar)",
    "Oil Flow (L/min)",
    "Tool Diameter (mm)",
    "Weight (Kg)",
    "Application",
  ];

  return `<div class="pdp-spec-group pdp-breaker-spec-group">
    <p class="pdp-spec-swipe-hint">Swipe to view more models</p>
    <div class="pdp-table-wrap pdp-breaker-table-wrap" role="region" aria-label="Hydraulic breaker key specifications" tabindex="0">
      <table class="pdp-breaker-spec-table">
        <thead>
          <tr>${headers.map((header) => `<th scope="col">${escapeHtml(header)}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${breakerSpecRows.map((row) => `<tr${row[0] === "KRB1400" ? ' class="is-highlight"' : ""}>${row.map((value, index) => index === 0 ? `<th scope="row">${escapeHtml(value)}</th>` : `<td>${escapeHtml(value)}</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table>
    </div>
  </div>`;
}

function renderTechnicalSpecifications(record) {
  const catalogTables = catalogSpecSetsFor(record);
  const note =
    "Specifications may vary by excavator configuration and jobsite conditions. Contact KRATOR for model selection.";

  if (catalogTables.length) {
    return `<section class="pdp-section pdp-technical-specs">
    ${sectionHeader("", "TECHNICAL SPECIFICATIONS", "Key model data for detailed comparison and model selection.")}
    ${isHydraulicBreakerRecord(record)
      ? catalogTables.map((specSet) => ProductSpecsTable(specSet, { title: true })).join("")
      : catalogTables.map((specSet) => ProductSpecsSet(specSet)).join("")}
    <p class="pdp-spec-note">${escapeHtml(note)}</p>
  </section>`;
  }

  return `<section class="pdp-section pdp-technical-specs">
    ${sectionHeader("", "TECHNICAL SPECIFICATIONS", "Custom data available on request when exact bracket, hydraulic or carrier information depends on your excavator model.")}
    <div class="pdp-table-wrap">
      <table class="pdp-spec-table">
        <tbody>
          ${specificationRows(record).map(([label, value]) => `<tr><th>${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`).join("")}
        </tbody>
      </table>
    </div>
    <p class="pdp-spec-note">${escapeHtml(note)}</p>
  </section>`;
}

function relatedProducts(record) {
  if (record.isCategory) {
    return record.categoryData.types.slice(0, 4).map((item) => ({
      title: item.title,
      tonnage: carrierText(item),
      description: item.shortDescription,
      image: imageFor(record.categoryData, item),
      route: routeFor(record.categoryData, item),
    }));
  }

  const siblings = record.categoryData.types
    .filter((item) => item.slug !== record.slug)
    .slice(0, 3)
    .map((item) => ({
      title: item.title,
      tonnage: carrierText(item),
      description: item.shortDescription,
      image: imageFor(record.categoryData, item),
      route: routeFor(record.categoryData, item),
    }));

  if (siblings.length >= 4) return siblings;

  const otherCategories = productCategories
    .filter((category) => category.slug !== record.categoryData.slug)
    .slice(0, 4 - siblings.length)
    .map((category) => {
      const categoryRecord = productRecord(category);
      return {
        title: categoryRecord.name,
        tonnage: categoryRecord.tonnage,
        description: categoryRecord.description,
        image: categoryRecord.image,
        route: categoryRecord.route,
      };
    });

  return [...siblings, ...otherCategories];
}

function iconSvg(type = "check") {
  const icons = {
    check: '<path d="M5 12.5l4 4L19 6.5"></path><circle cx="12" cy="12" r="9"></circle>',
    shield: '<path d="M12 3l7 3v5c0 5-3.2 8.4-7 10-3.8-1.6-7-5-7-10V6l7-3z"></path><path d="M8.5 12l2.4 2.4 4.9-5"></path>',
    bracket: '<path d="M5 7h8a6 6 0 0 1 0 12H5z"></path><path d="M8 10h5a3 3 0 0 1 0 6H8z"></path><path d="M17 6l2 2-2 2"></path>',
    factory: '<path d="M4 19V9l5 3V9l5 3V5h6v14z"></path><path d="M7 16h2M12 16h2M17 16h2"></path>',
    packing: '<path d="M4 8l8-4 8 4-8 4z"></path><path d="M4 8v8l8 4 8-4V8"></path><path d="M12 12v8"></path>',
    application: '<path d="M4 17l4-8 4 6 3-5 5 7z"></path><path d="M3 20h18"></path>',
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${icons[type] || icons.check}</svg>`;
}

function detailIcon(type, className = "product-detail-icon") {
  const file = detailIcons[type] || detailIcons.fastMatch;
  return `<img class="${className}" src="/images/icons/product-detail/${file}" alt="" aria-hidden="true" loading="lazy" width="320" height="320" decoding="async">`;
}

function seoImageUrl(image = "") {
  return `${siteUrl}${String(image).replace(/^\/public\//, "/")}`;
}

function actionButtons(productName) {
  const wa = `${whatsappUrl}%20Product%3A%20${encodeURIComponent(productName)}`;
  return `<div class="pdp-actions">
    <a class="pdp-btn pdp-btn-primary" href="/#quote-form">${detailIcon("email", "product-detail-icon pdp-btn-icon")}Get Quote in 24 Hours</a>
    <a class="pdp-btn pdp-btn-outline" href="${wa}" target="_blank" rel="noopener">${detailIcon("whatsapp", "product-detail-icon pdp-btn-icon")}WhatsApp Instant Reply</a>
  </div>`;
}

function sectionHeader(eyebrow, title, text = "") {
  return `<div class="pdp-section-head">
    ${eyebrow ? `<p class="pdp-eyebrow">${escapeHtml(eyebrow)}</p>` : ""}
    <h2>${escapeHtml(title)}</h2>
    <span class="pdp-title-line" aria-hidden="true"></span>
    ${text ? `<p>${escapeHtml(text)}</p>` : ""}
  </div>`;
}

function mediaGallery(record) {
  return `<div class="pdp-media-card product-media-showcase" aria-label="${escapeHtml(record.name)} product image">
        <div class="pdp-media-stage">
          <img class="pdp-main-image" src="${record.image}" alt="${escapeHtml(record.name)}" loading="eager" fetchpriority="high" width="900" height="900" decoding="async">
        </div>
      </div>`;
}

function renderPage(record) {
  const canonical = `${siteUrl}${record.route}`;
  const specs = quickSpecs(record);
  const related = relatedProducts(record);
  const schemaRelatedProducts = bestMatchedRelated
    .filter((item) => item.route !== record.route)
    .map((item) => ({ "@type": "Product", "@id": `${siteUrl}${item.route}#product` }));
  const wa = `${whatsappUrl}%20Product%3A%20${encodeURIComponent(record.name)}`;
  // Keep a truthful Product entity without inventing price, stock, ratings, or reviews.
  // Quote-only pages are valid entity markup but are not Product snippet eligible.
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${canonical}#product`,
    name: record.name,
    description: heroDescription(record),
    url: canonical,
    image: seoImageUrl(record.image),
    category: record.categoryName,
    ...(!record.isCategory && heroModel(record) ? { model: heroModel(record) } : {}),
    additionalProperty: specs.map(([name, value]) => ({ "@type": "PropertyValue", name, value })),
    isRelatedTo: schemaRelatedProducts,
    mainEntityOfPage: { "@id": `${canonical}#webpage` },
    brand: {
      "@type": "Brand",
      "@id": `${siteUrl}/#brand`,
      name: "KRATOR ATTACHMENTS",
    },
    manufacturer: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "KRATOR ATTACHMENTS",
      url: `${siteUrl}/`,
    },
  };
  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Products", item: `${siteUrl}/products/` },
    {
      "@type": "ListItem",
      position: 3,
      name: record.isCategory ? record.name : record.parentTitle,
      item: record.isCategory ? canonical : `${siteUrl}${record.parentRoute}`,
    },
  ];
  if (!record.isCategory) {
    breadcrumbItems.push({ "@type": "ListItem", position: 4, name: record.name, item: canonical });
  }
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: breadcrumbItems,
  };
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: record.metaTitle,
    description: record.metaDescription,
    inLanguage: "en",
    isPartOf: { "@id": `${siteUrl}/#website` },
    publisher: { "@id": `${siteUrl}/#organization` },
    about: { "@id": `${canonical}#product` },
    mainEntity: { "@id": `${canonical}#product` },
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
    relatedLink: schemaRelatedProducts.map((item) => item["@id"].replace(/#product$/, "")),
  };

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(record.metaTitle)}</title>
  <meta name="description" content="${escapeHtml(record.metaDescription)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${escapeHtml(record.metaTitle)}">
  <meta property="og:description" content="${escapeHtml(record.metaDescription)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${seoImageUrl(record.image)}">
  <link rel="stylesheet" href="/assets/styles.css">
  <script type="application/ld+json">${JSON.stringify(webPageSchema)}</script>
  <script type="application/ld+json">${JSON.stringify(productSchema)}</script>
  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>
</head>
<body class="product-detail-page system-page product-detail-template">
${header}
<main class="pdp-main">
  <section class="pdp-hero">
    <div class="pdp-hero-media">
      ${mediaGallery(record)}
    </div>
    <div class="pdp-hero-copy">
      <nav class="pdp-breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a><span>/</span><a href="/products/">Products</a><span>/</span>${record.isCategory ? `<span>${escapeHtml(record.name)}</span>` : `<a href="${record.parentRoute}">${escapeHtml(record.parentTitle)}</a><span>/</span><span>${escapeHtml(record.name)}</span>`}
      </nav>
      <p class="pdp-eyebrow">${escapeHtml(record.eyebrow)}</p>
      <h1>${escapeHtml(heroTitle(record))}</h1>
      ${heroModel(record) ? `<div class="pdp-hero-model">${escapeHtml(heroModel(record))}</div>` : ""}
      <p class="pdp-hero-text">${escapeHtml(heroDescription(record))}</p>
      <div class="pdp-carrier">For <strong>${escapeHtml(heroCarrier(record))}</strong></div>
      <div class="pdp-tag-list">${heroTags.map(([tag, icon]) => `<span>${detailIcon(icon, "product-detail-icon pdp-tag-icon")}${escapeHtml(tag)}</span>`).join("")}</div>
      ${actionButtons(record.name)}
    </div>
  </section>

  <section class="pdp-section pdp-trust-bar" aria-label="KRATOR manufacturing trust">
    ${trustItems.map(([title, text, icon]) => `<article class="pdp-trust-item">${detailIcon(icon, "product-detail-icon pdp-trust-icon")}<span><strong>${escapeHtml(title)}</strong><em>${escapeHtml(text)}</em></span></article>`).join("")}
  </section>

  <section class="pdp-section pdp-quick-specs" aria-label="Quick specifications">
    ${specs.map(([label, value, icon]) => `<article class="pdp-spec-card pdp-quick-spec-card">${detailIcon(icon, "product-detail-icon pdp-spec-icon")}<div class="pdp-quick-spec-copy"><span class="pdp-quick-spec-label">${escapeHtml(label)}</span><strong class="pdp-quick-spec-value">${escapeHtml(value)}</strong></div></article>`).join("")}
  </section>

  <section class="pdp-section">
    ${sectionHeader("", "WHY CHOOSE THIS PRODUCT")}
    <div class="pdp-benefit-grid">
      ${advantageItems.map(([title, text, icon]) => `<article class="pdp-benefit-card">
        <div class="pdp-benefit-head">${detailIcon(icon, "product-detail-icon pdp-benefit-icon")}<h3>${escapeHtml(title)}</h3></div>
        <p>${escapeHtml(text)}</p>
      </article>`).join("")}
    </div>
  </section>

  <section class="pdp-section pdp-fitment-section pdp-fitment-compact">
    <div class="pdp-fitment-visual" aria-hidden="true">
      <img src="/images/matching-service/raw/excavator-line.webp" alt="" loading="lazy" width="1100" height="825" decoding="async">
    </div>
    <div class="pdp-fitment-table">
      <h2 class="pdp-fitment-title">MAKE SURE IT FITS YOUR EXCAVATOR</h2>
      <div class="pdp-fitment-specs" role="table" aria-label="Excavator fitment information">
        <div class="pdp-fitment-row" role="row"><div class="pdp-fitment-key" role="cell">Excavator Brand</div><div class="pdp-fitment-value" role="cell">(e.g. Komatsu)</div></div>
        <div class="pdp-fitment-row" role="row"><div class="pdp-fitment-key" role="cell">Excavator Model</div><div class="pdp-fitment-value" role="cell">(e.g. PC300)</div></div>
        <div class="pdp-fitment-row" role="row"><div class="pdp-fitment-key" role="cell">Operating Weight</div><div class="pdp-fitment-value" role="cell">(e.g. 30 Ton)</div></div>
        <div class="pdp-fitment-row" role="row"><div class="pdp-fitment-key" role="cell">Pin Diameter</div><div class="pdp-fitment-value" role="cell">(e.g. 60mm)</div></div>
        <div class="pdp-fitment-row" role="row"><div class="pdp-fitment-key" role="cell">Arm Width</div><div class="pdp-fitment-value" role="cell">(e.g. 280mm)</div></div>
      </div>
    </div>
    <div class="pdp-fitment-cta">
      <h3>Not sure about the fitment?</h3>
      <p>Send us your machine information, our experts will recommend the best model for you.</p>
      <a class="pdp-btn pdp-btn-outline pdp-fitment-btn" href="${wa}" target="_blank" rel="noopener">${detailIcon("whatsapp", "product-detail-icon pdp-btn-icon")}Send Machine Info on WhatsApp</a>
    </div>
  </section>

  <section class="pdp-section">
    ${sectionHeader("", "WIDE APPLICATIONS")}
    <div class="pdp-application-grid">
      ${applicationCards.map((item) => `<article class="pdp-application-card pdp-application-image-card">
        <img src="${String(item.image).replace(/\.jpg$/, ".webp")}" alt="${escapeHtml(item.title)} application" loading="lazy" width="960" height="540" decoding="async">
        <span class="pdp-application-overlay" aria-hidden="true"></span>
        <span class="pdp-card-icon">${detailIcon(item.icon, "product-detail-icon pdp-application-icon")}</span>
        <strong>${escapeHtml(item.title)}</strong>
      </article>`).join("")}
    </div>
  </section>

  ${renderTechnicalSpecifications(record)}

  <section class="pdp-section pdp-mid-cta">
    <span class="pdp-mid-cta-bg" aria-hidden="true"></span>
    <div>
      <p class="pdp-eyebrow">MODEL SUPPORT</p>
      <h2>NOT SURE WHICH MODEL IS RIGHT FOR YOU?</h2>
      <p>Get free expert recommendation and quotation.</p>
    </div>
    <a class="pdp-btn pdp-btn-primary" href="/#quote-form">${detailIcon("email", "product-detail-icon pdp-btn-icon")}Get Free Recommendation</a>
  </section>

  <section class="pdp-section">
    ${sectionHeader("", "RELATED PRODUCTS")}
    <div class="pdp-related-grid">
      ${bestMatchedRelated.map((item) => `<article class="pdp-related-card">
        <a class="pdp-related-main" href="${item.route}">
          <img src="${item.image}" alt="${escapeHtml(item.title)}" loading="lazy" width="900" height="900" decoding="async">
          <span>${escapeHtml(item.tonnage)}</span>
          <h3>${escapeHtml(item.title)}</h3>
        </a>
        <div class="pdp-related-actions">
          <a class="pdp-related-link" href="${item.route}">View Details</a>
        </div>
      </article>`).join("")}
    </div>
  </section>

  <section class="pdp-section pdp-bottom-cta">
    <div>
      <p class="pdp-eyebrow">QUOTE SUPPORT</p>
      <h2>READY TO GET YOUR QUOTATION?</h2>
      <p>Contact us now, reply within 12 hours!</p>
    </div>
    ${actionButtons(record.name)}
    <div class="pdp-bottom-trust">
      ${bottomTrustItems.map(([title, text, icon]) => `<article>${detailIcon(icon, "product-detail-icon pdp-bottom-trust-icon")}<span><strong>${escapeHtml(title)}</strong><em>${escapeHtml(text)}</em></span></article>`).join("")}
    </div>
  </section>
</main>
<div class="pdp-mobile-cta" aria-label="Product quick inquiry">
  <a class="pdp-mobile-whatsapp" href="${wa}" target="_blank" rel="noopener">${detailIcon("whatsapp", "product-detail-icon pdp-mobile-cta-icon")}WhatsApp</a>
  <a class="pdp-mobile-quote" href="/#quote-form">${detailIcon("email", "product-detail-icon pdp-mobile-cta-icon")}Get Quote</a>
</div>
${footerDocumentTail}`;
}

let generated = 0;

for (const category of productCategories) {
  const categoryRecord = productRecord(category);
  fs.mkdirSync(path.dirname(categoryRecord.pagePath), { recursive: true });
  fs.writeFileSync(categoryRecord.pagePath, renderPage(categoryRecord), "utf8");
  generated += 1;

  for (const alias of category.aliases || []) {
    const aliasRecord = productRecord(category, null, alias);
    fs.mkdirSync(path.dirname(aliasRecord.pagePath), { recursive: true });
    fs.writeFileSync(aliasRecord.pagePath, renderPage(aliasRecord), "utf8");
    generated += 1;
  }

  for (const product of category.types) {
    const record = productRecord(category, product);
    fs.mkdirSync(path.dirname(record.pagePath), { recursive: true });
    fs.writeFileSync(record.pagePath, renderPage(record), "utf8");
    generated += 1;

    for (const alias of product.aliases || []) {
      const aliasRecord = productRecord(category, product, alias);
      fs.mkdirSync(path.dirname(aliasRecord.pagePath), { recursive: true });
      fs.writeFileSync(aliasRecord.pagePath, renderPage(aliasRecord), "utf8");
      generated += 1;
    }
  }
}

console.log(`Generated ${generated} product detail pages.`);


