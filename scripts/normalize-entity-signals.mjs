import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const argumentRoot = process.argv.slice(2).find((argument) => !argument.startsWith("--"));
const projectRoot = argumentRoot ? path.resolve(argumentRoot) : path.resolve(scriptDirectory, "..");
const writeChanges = process.argv.includes("--write");
const siteOrigin = "https://www.kratorattachments.com";
const organizationId = `${siteOrigin}/#organization`;
const websiteId = `${siteOrigin}/#website`;
const brandId = `${siteOrigin}/#brand`;
const logoId = `${siteOrigin}/#logo`;
const organizationDescription = "KRATOR ATTACHMENTS is a China-based excavator attachment manufacturer and B2B supplier supporting machine matching, OEM brackets, manufacturing coordination, inspection documents and global shipping.";
const organizationTopics = [
  "Excavator attachments",
  "Hydraulic breakers",
  "Quick couplers",
  "Vibratory pile hammers",
  "Hydraulic demolition shears",
  "Hydraulic pulverizers",
  "Excavator attachment machine matching",
  "OEM excavator attachment brackets",
  "Excavator attachment manufacturing and quality inspection",
];
const localeDirs = new Set(["ar", "es", "fr", "pt", "ru"]);
const excludedDirs = new Set([".agents", ".codex", ".git", "dist", "docs", "node_modules", "outputs", "public", "src", "work"]);
const jsonLdPattern = /^[\t ]*<script\b([^>]*type=["']application\/ld\+json["'][^>]*)>([\s\S]*?)<\/script>[\t ]*(?:\r?\n)?/gim;

function walk(directory, output = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && excludedDirs.has(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath, output);
    else if (entry.isFile() && entry.name.endsWith(".html")) output.push(fullPath);
  }
  return output;
}

function relative(file) {
  return path.relative(projectRoot, file).split(path.sep).join("/");
}

function decodeHtml(value = "") {
  const named = { amp: "&", apos: "'", gt: ">", hellip: "...", laquo: "\u00ab", lt: "<", mdash: "\u2014", nbsp: " ", ndash: "\u2013", quot: '"', raquo: "\u00bb", reg: "\u00ae", times: "\u00d7", trade: "\u2122" };
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&([a-z]+);/gi, (match, name) => named[name.toLowerCase()] ?? match);
}

function visibleText(value = "") {
  return decodeHtml(value)
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function canonicalFrom(html) {
  return html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1] ?? "";
}

function metaContent(html, attribute, value) {
  const pattern = new RegExp(`<meta\\b(?=[^>]*\\b${attribute}=["']${value}["'])[^>]*\\bcontent=["']([^"']*)["'][^>]*>`, "i");
  return decodeHtml(html.match(pattern)?.[1] ?? "").trim();
}

function classElementText(html, className) {
  const pattern = new RegExp(`<([a-z][a-z0-9]*)\\b[^>]*class=["'][^"']*\\b${className}\\b[^"']*["'][^>]*>([\\s\\S]*?)<\\/\\1>`, "i");
  return visibleText(html.match(pattern)?.[2] ?? "");
}

function classImageSource(html, className) {
  const image = html.match(new RegExp(`<img\\b(?=[^>]*class=["'][^"']*\\b${className}\\b[^"']*["'])[^>]*>`, "i"))?.[0] ?? "";
  return image.match(/\bsrc=["']([^"']+)["']/i)?.[1] ?? "";
}

function typesOf(node) {
  const type = node?.["@type"];
  if (Array.isArray(type)) return type.filter((item) => typeof item === "string");
  return typeof type === "string" ? [type] : [];
}

function topLevelNodes(value) {
  if (Array.isArray(value)) return value.flatMap(topLevelNodes);
  if (!value || typeof value !== "object") return [];
  if (Array.isArray(value["@graph"])) return value["@graph"].flatMap(topLevelNodes);
  return [value];
}

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stableValue(value[key])]));
}

function fingerprint(value) {
  return JSON.stringify(stableValue(value));
}

function schemaBlocks(html) {
  return [...html.matchAll(jsonLdPattern)].map((match) => match[2].trim());
}

function schemaNodes(html, file) {
  const nodes = [];
  for (const raw of schemaBlocks(html)) {
    let value;
    try {
      value = JSON.parse(raw);
    } catch (error) {
      throw new Error(`${relative(file)}: ${error.message}`);
    }
    nodes.push(...topLevelNodes(value));
  }
  return nodes;
}

function localeFor(file) {
  const first = relative(file).split("/")[0];
  return localeDirs.has(first) ? first : "";
}

function languageFor(html) {
  return html.match(/<html\b[^>]*\blang=["']([^"']+)["']/i)?.[1] ?? "en";
}

function baseRoute(file) {
  const parts = relative(file).split("/");
  if (localeDirs.has(parts[0])) parts.shift();
  return parts.join("/");
}

function isProductPage(file, html) {
  return /(^|\/)products\//.test(relative(file))
    && /<body\b[^>]*class=["'][^"']*(?:product-detail-page|product-detail-template)/i.test(html);
}

function isBlogPage(file) {
  return /(^|\/)blog\//.test(relative(file));
}

function isEnglishBlogIndex(file) {
  return relative(file) === "blog/index.html";
}

function isCompanyPage(file) {
  return ["about-us/index.html", "quality-control/index.html"].includes(baseRoute(file));
}

function isHomePage(file) {
  return baseRoute(file) === "index.html";
}

function absoluteUrl(value) {
  return new URL(value, `${siteOrigin}/`).toString();
}

function pageType(types) {
  return types.some((type) => ["WebPage", "AboutPage", "CollectionPage"].includes(type));
}

function mainHtml(html) {
  return html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
}

function normalizedInternalUrl(value) {
  if (!value || value.startsWith("#")) return "";
  const url = new URL(value, `${siteOrigin}/`);
  if (url.origin !== siteOrigin) return "";
  url.hash = "";
  url.search = "";
  return url.toString();
}

function anchorLinks(fragment) {
  const links = [];
  for (const match of fragment.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const url = normalizedInternalUrl(match[1]);
    if (!url) continue;
    links.push({ url, text: visibleText(match[2]) });
  }
  return links;
}

function uniqueBy(items, key) {
  const seen = new Set();
  return items.filter((item) => {
    const value = key(item);
    if (!value || seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

function localeFromUrl(url) {
  const first = new URL(url).pathname.split("/").filter(Boolean)[0] || "";
  return localeDirs.has(first) ? first : "";
}

function semanticRelatedUrls(html, file, wholeDocument = false) {
  const canonical = canonicalFrom(html);
  const pageLocale = localeFor(file);
  const links = anchorLinks(wholeDocument ? html : mainHtml(html));
  return uniqueBy(links, (link) => link.url)
    .map((link) => link.url)
    .filter((url) => url !== canonical)
    .filter((url) => localeFromUrl(url) === pageLocale)
    .filter((url) => /\/(?:about-us|applications|blog|custom-service|products|quality-control)\//.test(new URL(url).pathname))
    .slice(0, 24);
}

function productReference(url) {
  return { "@type": "Product", "@id": `${url}#product` };
}

function articleReference(url) {
  return { "@type": "BlogPosting", "@id": `${url}#article` };
}

function linkedProductReferences(html, file, wholeDocument = false) {
  const canonical = canonicalFrom(html);
  return semanticRelatedUrls(html, file, wholeDocument)
    .filter((url) => /\/products\/(?!$)/.test(new URL(url).pathname))
    .filter((url) => url !== canonical)
    .map(productReference);
}

function linkedArticleReferences(html, file) {
  const canonical = canonicalFrom(html);
  return semanticRelatedUrls(html, file)
    .filter((url) => /\/blog\/(?!$)/.test(new URL(url).pathname))
    .filter((url) => url !== canonical)
    .map(articleReference);
}

function relatedProductReferences(html, file) {
  const canonical = canonicalFrom(html);
  const sections = [...html.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/gi)].map((match) => match[0]);
  const relatedSection = sections.find((section) => /RELATED PRODUCTS/i.test(visibleText(section)));
  const source = relatedSection || mainHtml(html);
  return uniqueBy(anchorLinks(source), (link) => link.url)
    .map((link) => link.url)
    .filter((url) => /\/products\/(?!$)/.test(new URL(url).pathname) && url !== canonical)
    .slice(0, 8)
    .map(productReference);
}

function quickSpecProperties(html) {
  const properties = [];
  for (const match of html.matchAll(/<article\b(?=[^>]*class=["'][^"']*pdp-quick-spec-card[^"']*["'])[^>]*>([\s\S]*?)<\/article>/gi)) {
    const block = match[1];
    const name = classElementText(block, "pdp-quick-spec-label");
    const value = classElementText(block, "pdp-quick-spec-value");
    if (name && value) properties.push({ "@type": "PropertyValue", name, value });
  }
  return uniqueBy(properties, (property) => `${property.name}\u0000${property.value}`);
}

function productCategory(html, file) {
  const breadcrumb = schemaNodes(html, file).find((node) => typesOf(node).includes("BreadcrumbList"));
  const items = Array.isArray(breadcrumb?.itemListElement) ? breadcrumb.itemListElement : [];
  return items.find((item) => Number(item.position) === 3)?.name
    || items.at(-1)?.name
    || "Excavator Attachments";
}

function productModel(html, file) {
  const breadcrumb = schemaNodes(html, file).find((node) => typesOf(node).includes("BreadcrumbList"));
  const items = Array.isArray(breadcrumb?.itemListElement) ? breadcrumb.itemListElement : [];
  return items.length >= 4 ? classElementText(html, "pdp-hero-model") : "";
}

function articleSection(html) {
  return classElementText(html, "blog-article-kicker")
    || classElementText(html, "eyebrow")
    || "Excavator Attachment Guides";
}

function collectionItems(html) {
  const candidates = anchorLinks(mainHtml(html)).filter((link) => /\/blog\/(?!$)/.test(new URL(link.url).pathname));
  const byUrl = new Map();
  for (const link of candidates) {
    const current = byUrl.get(link.url);
    if (!current || link.text.length > current.text.length) byUrl.set(link.url, link);
  }
  return [...byUrl.values()].map((link, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "BlogPosting",
      "@id": `${link.url}#article`,
      url: link.url,
      headline: link.text,
    },
  }));
}

function classOrId(attributes = "") {
  return [...attributes.matchAll(/\b(?:class|id)=["']([^"']+)["']/gi)].map((match) => match[1]).join(" ");
}

function faqIntervals(html) {
  const intervals = [];
  const stack = [];
  const voidTags = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
  for (const match of html.matchAll(/<\/?([a-z][a-z0-9-]*)\b([^>]*)>/gi)) {
    const closing = match[0].startsWith("</");
    const tag = match[1].toLowerCase();
    if (!closing && !voidTags.has(tag) && !match[0].endsWith("/>")) {
      const marker = classOrId(match[2]);
      stack.push({ tag, start: match.index, faq: /\bfaq\b/i.test(marker) && !/form|quote/i.test(marker) });
      continue;
    }
    if (!closing) continue;
    for (let index = stack.length - 1; index >= 0; index -= 1) {
      if (stack[index].tag !== tag) continue;
      const [entry] = stack.splice(index, 1);
      if (entry.faq) intervals.push([entry.start, match.index + match[0].length]);
      break;
    }
  }
  return intervals;
}

function visibleFaqPairs(html) {
  const intervals = faqIntervals(html);
  const pairs = [];
  for (const match of html.matchAll(/<details\b[^>]*>([\s\S]*?)<\/details>/gi)) {
    if (!intervals.some(([start, end]) => match.index >= start && match.index < end)) continue;
    const summaryMatch = match[1].match(/<summary\b[^>]*>([\s\S]*?)<\/summary>/i);
    if (!summaryMatch) continue;
    const question = visibleText(summaryMatch[1]);
    const answer = visibleText(match[1].replace(summaryMatch[0], " "));
    if (question && answer) pairs.push({ question, answer });
  }
  return pairs;
}

function reference(id) {
  return { "@id": id };
}

function pageTopic(file, html) {
  const canonical = canonicalFrom(html);
  if (isProductPage(file, html)) return `${canonical}#product`;
  if (isBlogPage(file)) return `${canonical}#article`;
  return organizationId;
}

function mainEntityId(file, html) {
  if (isProductPage(file, html) || isBlogPage(file) || isCompanyPage(file) || isHomePage(file)) {
    return pageTopic(file, html);
  }
  return "";
}

function normalizeContactPoint(value) {
  if (Array.isArray(value)) return value.map(normalizeContactPoint);
  const contact = value && typeof value === "object" ? value : {};
  return {
    ...contact,
    "@type": "ContactPoint",
    contactType: contact.contactType || "sales",
    email: contact.email || "manihao521@gmail.com",
    telephone: contact.telephone || "+8613370928803",
    areaServed: contact.areaServed || "Worldwide",
  };
}

function normalizeNode(node, file, html, topLevel = true, report) {
  if (Array.isArray(node)) return node.map((item) => normalizeNode(item, file, html, topLevel, report)).filter(Boolean);
  if (!node || typeof node !== "object") return node;

  if (Array.isArray(node["@graph"])) {
    const graph = node["@graph"].map((item) => normalizeNode(item, file, html, true, report)).filter(Boolean);
    return graph.length ? { ...node, "@graph": graph } : null;
  }

  const types = typesOf(node);
  if (topLevel && types.includes("Product")) {
    report.product.removed += 1;
    return null;
  }
  if (topLevel && types.includes("FAQPage")) {
    report.faq.removed += 1;
    return null;
  }

  let normalized = Object.fromEntries(
    Object.entries(node).map(([key, value]) => [key, normalizeNode(value, file, html, false, report)]),
  );
  const canonical = canonicalFrom(html);

  if (types.includes("Organization")) {
    normalized = {
      ...normalized,
      "@type": normalized["@type"] || "Organization",
      "@id": organizationId,
      name: "KRATOR ATTACHMENTS",
      alternateName: "KRATOR Attachments",
      url: `${siteOrigin}/`,
    };
    if (topLevel) {
      normalized.description = organizationDescription;
      normalized.logo = {
        "@type": "ImageObject",
        "@id": logoId,
        url: `${siteOrigin}/assets/brand/krator-logo.webp`,
        contentUrl: `${siteOrigin}/assets/brand/krator-logo.webp`,
        width: 980,
        height: 265,
      };
      normalized.email = normalized.email || "manihao521@gmail.com";
      normalized.telephone = normalized.telephone || "+8613370928803";
      normalized.contactPoint = normalizeContactPoint(normalized.contactPoint);
      normalized.location = { "@type": "Country", name: "China" };
      normalized.areaServed = "Worldwide";
      normalized.brand = {
        "@type": "Brand",
        "@id": brandId,
        name: "KRATOR ATTACHMENTS",
        url: `${siteOrigin}/`,
        logo: reference(logoId),
      };
      normalized.knowsAbout = organizationTopics;
      normalized.subjectOf = [
        { "@type": "AboutPage", "@id": `${siteOrigin}/about-us/#webpage` },
        { "@type": "WebPage", "@id": `${siteOrigin}/quality-control/#webpage` },
      ];
    }
    report.organization.normalized += 1;
  }

  if (topLevel && types.includes("WebSite")) {
    const { potentialAction, ...withoutUnsupportedSearch } = normalized;
    if (potentialAction) report.website.searchActionsRemoved += 1;
    normalized = {
      ...withoutUnsupportedSearch,
      "@id": websiteId,
      name: "KRATOR ATTACHMENTS",
      alternateName: "KRATOR Attachments",
      url: `${siteOrigin}/`,
      publisher: reference(organizationId),
      inLanguage: ["en", "es", "pt-BR", "fr", "ru", "ar"],
    };
    report.website.normalized += 1;
  }

  if (topLevel && types.includes("BreadcrumbList") && canonical) {
    normalized["@id"] = `${canonical}#breadcrumb`;
    report.breadcrumb.normalized += 1;
  }

  if (topLevel && types.includes("BlogPosting") && canonical) {
    const productTopics = linkedProductReferences(html, file).slice(0, 8);
    normalized["@id"] = `${canonical}#article`;
    normalized.url = canonical;
    normalized.mainEntityOfPage = reference(`${canonical}#webpage`);
    normalized.isPartOf = reference(websiteId);
    normalized.inLanguage = languageFor(html);
    normalized.author = { "@type": "Organization", "@id": organizationId, name: "KRATOR ATTACHMENTS", url: `${siteOrigin}/` };
    normalized.publisher = { "@type": "Organization", "@id": organizationId, name: "KRATOR ATTACHMENTS", url: `${siteOrigin}/` };
    normalized.articleSection = articleSection(html);
    normalized.about = productTopics.slice(0, 3);
    normalized.mentions = productTopics;
    if (visibleFaqPairs(html).length) normalized.hasPart = reference(`${canonical}#faq`);
    report.article.normalized += 1;
  }

  if (topLevel && pageType(types) && !types.includes("CollectionPage") && canonical) {
    const entityId = mainEntityId(file, html);
    if (baseRoute(file) === "about-us/index.html") normalized["@type"] = "AboutPage";
    normalized["@id"] = `${canonical}#webpage`;
    normalized.url = canonical;
    normalized.inLanguage = languageFor(html);
    normalized.isPartOf = reference(websiteId);
    normalized.publisher = reference(organizationId);
    normalized.about = reference(pageTopic(file, html));
    if (entityId) normalized.mainEntity = reference(entityId);
    normalized.relatedLink = semanticRelatedUrls(html, file, isCompanyPage(file));
    if (baseRoute(file) === "about-us/index.html") {
      normalized.mentions = linkedProductReferences(html, file, true).slice(0, 16);
    }
    if (baseRoute(file) === "quality-control/index.html") {
      normalized.mentions = [
        { "@type": "Thing", name: "Excavator attachment manufacturing" },
        { "@type": "Thing", name: "Robotic welding" },
        { "@type": "Thing", name: "CNC machining" },
        { "@type": "Thing", name: "Excavator attachment quality inspection" },
        { "@type": "Thing", name: "OEM excavator attachment manufacturing" },
      ];
      normalized.hasPart = [
        { "@type": "WebPageElement", "@id": `${canonical}#factory-capability`, name: "Core Manufacturing Capability" },
        { "@type": "WebPageElement", "@id": `${canonical}#manufacturing-process-quality`, name: "Manufacturing Process and Quality Control" },
        { "@type": "WebPageElement", "@id": `${canonical}#oem-custom-manufacturing`, name: "OEM and Custom Attachment Manufacturing" },
      ];
    }
    if (schemaNodesFromValue(node).some((item) => typesOf(item).includes("BreadcrumbList"))) {
      normalized.breadcrumb = reference(`${canonical}#breadcrumb`);
    }
    report.webPage.normalized += 1;
  }

  if (topLevel && types.includes("CollectionPage") && canonical) {
    const generatedItems = isEnglishBlogIndex(file) && html.includes("BLOG_COLLECTION_SCHEMA_START")
      ? normalized.mainEntity?.itemListElement
      : null;
    const items = Array.isArray(generatedItems) ? generatedItems : collectionItems(html);
    normalized["@id"] = `${canonical}#webpage`;
    normalized.url = canonical;
    normalized.inLanguage = languageFor(html);
    normalized.isPartOf = reference(websiteId);
    normalized.publisher = reference(organizationId);
    normalized.about = reference(organizationId);
    normalized.relatedLink = items.map((item) => item.item.url);
    if (isEnglishBlogIndex(file)) normalized.breadcrumb = reference(`${canonical}#breadcrumb`);
    normalized.mainEntity = {
      "@type": "ItemList",
      "@id": `${canonical}#articles`,
      name: "KRATOR Excavator Attachment Guides",
      numberOfItems: items.length,
      itemListElement: items,
    };
    report.collection.normalized += 1;
  }

  return normalized;
}

function schemaNodesFromValue(value) {
  return topLevelNodes(value);
}

function productSchema(html, file) {
  const canonical = canonicalFrom(html);
  const name = visibleText(html.match(/<h1\b[^>]*>([\s\S]*?)(?:<\/h1>|\/h1>)/i)?.[1] ?? "");
  const description = classElementText(html, "pdp-hero-text") || metaContent(html, "name", "description");
  const image = classImageSource(html, "pdp-main-image") || metaContent(html, "property", "og:image");
  const model = productModel(html, file);
  const specifications = quickSpecProperties(html);
  const relatedProducts = relatedProductReferences(html, file);
  const relatedArticles = linkedArticleReferences(html, file).slice(0, 8);
  if (!canonical || !name || !description || !image) {
    throw new Error(`${relative(file)}: Product needs a canonical, visible H1, description, and image`);
  }
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${canonical}#product`,
    name,
    description,
    url: canonical,
    image: absoluteUrl(image),
    category: productCategory(html, file),
    ...(model ? { model } : {}),
    ...(specifications.length ? { additionalProperty: specifications } : {}),
    ...(relatedProducts.length ? { isRelatedTo: relatedProducts } : {}),
    ...(relatedArticles.length ? { subjectOf: relatedArticles } : {}),
    mainEntityOfPage: reference(`${canonical}#webpage`),
    brand: { "@type": "Brand", "@id": brandId, name: "KRATOR ATTACHMENTS" },
    manufacturer: { "@type": "Organization", "@id": organizationId, name: "KRATOR ATTACHMENTS", url: `${siteOrigin}/` },
  };
}

function faqSchema(html, file, pairs) {
  const canonical = canonicalFrom(html);
  if (!canonical) throw new Error(`${relative(file)}: FAQPage needs a canonical URL`);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    isPartOf: reference(`${canonical}#webpage`),
    about: reference(pageTopic(file, html)),
    mainEntity: pairs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

function blogIndexBreadcrumbSchema(html) {
  const canonical = canonicalFrom(html);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteOrigin}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: canonical },
    ],
  };
}

function pageName(html) {
  return metaContent(html, "property", "og:title")
    || visibleText(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "")
    || visibleText(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "");
}

function webPageSchema(html, file, hasBreadcrumb) {
  const canonical = canonicalFrom(html);
  if (!canonical) throw new Error(`${relative(file)}: WebPage needs a canonical URL`);
  const value = {
    "@context": "https://schema.org",
    "@type": baseRoute(file) === "about-us/index.html" ? "AboutPage" : "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: pageName(html),
    description: metaContent(html, "name", "description"),
    inLanguage: languageFor(html),
    isPartOf: reference(websiteId),
    publisher: reference(organizationId),
    about: reference(pageTopic(file, html)),
    relatedLink: semanticRelatedUrls(html, file, isCompanyPage(file)),
  };
  const entityId = mainEntityId(file, html);
  if (entityId) value.mainEntity = reference(entityId);
  if (baseRoute(file) === "about-us/index.html") value.mentions = linkedProductReferences(html, file, true).slice(0, 16);
  if (baseRoute(file) === "quality-control/index.html") {
    value.mentions = [
      { "@type": "Thing", name: "Excavator attachment manufacturing" },
      { "@type": "Thing", name: "Robotic welding" },
      { "@type": "Thing", name: "CNC machining" },
      { "@type": "Thing", name: "Excavator attachment quality inspection" },
      { "@type": "Thing", name: "OEM excavator attachment manufacturing" },
    ];
    value.hasPart = [
      { "@type": "WebPageElement", "@id": `${canonical}#factory-capability`, name: "Core Manufacturing Capability" },
      { "@type": "WebPageElement", "@id": `${canonical}#manufacturing-process-quality`, name: "Manufacturing Process and Quality Control" },
      { "@type": "WebPageElement", "@id": `${canonical}#oem-custom-manufacturing`, name: "OEM and Custom Attachment Manufacturing" },
    ];
  }
  if (hasBreadcrumb) value.breadcrumb = reference(`${canonical}#breadcrumb`);
  return value;
}

function renderSchema(value) {
  return `  <script type="application/ld+json">\n${JSON.stringify(value, null, 2)}\n  </script>\n`;
}

function withoutStructuredData(html) {
  return html.replace(jsonLdPattern, " ").replace(/\s+/g, " ").trim();
}

function idOf(value) {
  return value && typeof value === "object" ? value["@id"] ?? "" : typeof value === "string" ? value : "";
}

function validatePage(html, file) {
  const nodes = schemaNodes(html, file);
  const canonical = canonicalFrom(html);
  const product = nodes.filter((node) => typesOf(node).includes("Product"));
  const faq = nodes.filter((node) => typesOf(node).includes("FAQPage"));
  const webPages = nodes.filter((node) => pageType(typesOf(node)));
  const breadcrumbs = nodes.filter((node) => typesOf(node).includes("BreadcrumbList"));
  const faqPairs = visibleFaqPairs(html);
  const needsWebPage = isProductPage(file, html) || faqPairs.length || isCompanyPage(file) || isBlogPage(file);

  if (product.length !== (isProductPage(file, html) ? 1 : 0)) throw new Error(`${relative(file)}: invalid Product count`);
  if (faq.length !== (faqPairs.length ? 1 : 0)) throw new Error(`${relative(file)}: invalid FAQPage count`);
  if (needsWebPage && webPages.length !== 1) throw new Error(`${relative(file)}: expected one WebPage`);
  if (isEnglishBlogIndex(file) && breadcrumbs.length !== 1) throw new Error(`${relative(file)}: expected one visible BreadcrumbList`);
  if (faq[0] && faq[0].mainEntity?.length !== faqPairs.length) throw new Error(`${relative(file)}: FAQ visible/schema mismatch`);

  for (const organization of nodes.filter((node) => typesOf(node).includes("Organization"))) {
    if (organization["@id"] !== organizationId || organization.name !== "KRATOR ATTACHMENTS") {
      throw new Error(`${relative(file)}: inconsistent Organization identity`);
    }
  }
  if (product[0]) {
    if (idOf(product[0].brand) !== brandId || idOf(product[0].manufacturer) !== organizationId || idOf(product[0].mainEntityOfPage) !== `${canonical}#webpage`) {
      throw new Error(`${relative(file)}: incomplete Product entity links`);
    }
    if (!product[0].category || !Array.isArray(product[0].additionalProperty) || !product[0].additionalProperty.length) {
      throw new Error(`${relative(file)}: Product authority properties are incomplete`);
    }
  }
  if (faq[0]) {
    if (idOf(faq[0].isPartOf) !== `${canonical}#webpage` || !idOf(faq[0].about)) {
      throw new Error(`${relative(file)}: incomplete FAQPage entity links`);
    }
  }
  if (html.includes('"@type": "SearchAction"') || html.includes('"@type":"SearchAction"')) {
    throw new Error(`${relative(file)}: unsupported SearchAction remains`);
  }
  if (!localeFor(file)) {
    const article = nodes.find((node) => typesOf(node).includes("BlogPosting"));
    if (article && (!idOf(article.author) || !Array.isArray(article.about) || !article.about.length || !Array.isArray(article.mentions) || !article.mentions.length)) {
      throw new Error(`${relative(file)}: BlogPosting authority relationships are incomplete`);
    }
    const page = webPages[0];
    if ((isProductPage(file, html) || isBlogPage(file) || isCompanyPage(file)) && !Array.isArray(page?.relatedLink)) {
      throw new Error(`${relative(file)}: WebPage semantic related links are missing`);
    }
    if (baseRoute(file) === "about-us/index.html" && !typesOf(page).includes("AboutPage")) {
      throw new Error(`${relative(file)}: About page must use AboutPage`);
    }
  }
}

const report = {
  mode: writeChanges ? "write" : "dry-run",
  scannedPages: 0,
  changedPages: 0,
  product: { pages: 0, removed: 0, added: 0 },
  faq: { pages: 0, visibleQuestions: 0, removed: 0, added: 0 },
  organization: { normalized: 0 },
  website: { normalized: 0, searchActionsRemoved: 0 },
  webPage: { normalized: 0, added: 0 },
  collection: { normalized: 0 },
  article: { normalized: 0 },
  breadcrumb: { normalized: 0, added: 0 },
  duplicateBlocksRemoved: 0,
  robotsDirectivesChanged: 0,
  nonSchemaContentChanged: 0,
};

for (const file of walk(projectRoot).sort()) {
  report.scannedPages += 1;
  const original = fs.readFileSync(file, "utf8");
  const robotsBefore = original.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i)?.[1] ?? "";
  const seen = new Set();

  let updated = original.replace(jsonLdPattern, (match, attrs, rawJson) => {
    let value;
    try {
      value = JSON.parse(rawJson.trim());
    } catch (error) {
      throw new Error(`${relative(file)}: ${error.message}`);
    }
    const normalized = normalizeNode(value, file, original, true, report);
    if (!normalized) return "";
    const key = fingerprint(normalized);
    if (seen.has(key)) {
      report.duplicateBlocksRemoved += 1;
      return "";
    }
    seen.add(key);
    return fingerprint(normalized) === fingerprint(value) ? match : renderSchema(normalized);
  });

  const faqPairs = visibleFaqPairs(updated);
  const existingNodes = schemaNodes(updated, file);
  const additions = [];
  const needsWebPage = isProductPage(file, updated) || faqPairs.length || isCompanyPage(file) || isBlogPage(file);
  const hasWebPage = existingNodes.some((node) => pageType(typesOf(node)));
  const hasBreadcrumb = existingNodes.some((node) => typesOf(node).includes("BreadcrumbList"));

  if (isEnglishBlogIndex(file) && !hasBreadcrumb) {
    additions.push(blogIndexBreadcrumbSchema(updated));
    report.breadcrumb.added += 1;
  }
  if (needsWebPage && !hasWebPage) {
    additions.push(webPageSchema(updated, file, hasBreadcrumb));
    report.webPage.added += 1;
  }
  if (isProductPage(file, updated)) {
    additions.push(productSchema(updated, file));
    report.product.pages += 1;
    report.product.added += 1;
  }
  if (faqPairs.length) {
    additions.push(faqSchema(updated, file, faqPairs));
    report.faq.pages += 1;
    report.faq.visibleQuestions += faqPairs.length;
    report.faq.added += 1;
  }
  if (additions.length) {
    updated = updated.replace(/<\/head>/i, `${additions.map(renderSchema).join("")}</head>`);
  }

  validatePage(updated, file);
  const robotsAfter = updated.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i)?.[1] ?? "";
  if (robotsBefore !== robotsAfter) report.robotsDirectivesChanged += 1;
  if (withoutStructuredData(original) !== withoutStructuredData(updated)) report.nonSchemaContentChanged += 1;

  if (updated !== original) {
    report.changedPages += 1;
    if (writeChanges) fs.writeFileSync(file, updated, "utf8");
  }
}

if (report.robotsDirectivesChanged) throw new Error("A robots meta directive changed unexpectedly");
if (report.nonSchemaContentChanged) throw new Error("Non-schema HTML changed unexpectedly");
console.log(JSON.stringify(report, null, 2));
