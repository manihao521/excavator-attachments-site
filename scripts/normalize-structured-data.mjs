import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const writeChanges = process.argv.includes("--write");
const siteOrigin = "https://www.kratorattachments.com";
const organizationId = `${siteOrigin}/#organization`;
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
  const named = {
    amp: "&",
    apos: "'",
    gt: ">",
    hellip: "...",
    laquo: "\u00ab",
    lt: "<",
    mdash: "\u2014",
    nbsp: " ",
    ndash: "\u2013",
    quot: '"',
    raquo: "\u00bb",
    reg: "\u00ae",
    times: "\u00d7",
    trade: "\u2122",
  };
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

function rawType(raw) {
  return raw.match(/"@type"\s*:\s*"([^"]+)"/)?.[1] ?? "Unknown";
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

function removeManagedNodes(value, report) {
  if (Array.isArray(value)) {
    const items = value.map((item) => removeManagedNodes(item, report)).filter(Boolean);
    return items.length ? items : null;
  }
  if (!value || typeof value !== "object") return value;
  if (Array.isArray(value["@graph"])) {
    const graph = value["@graph"].map((item) => removeManagedNodes(item, report)).filter(Boolean);
    return graph.length ? { ...value, "@graph": graph } : null;
  }
  const types = typesOf(value);
  if (types.includes("Product")) {
    report.product.removed += 1;
    return null;
  }
  if (types.includes("FAQPage")) {
    report.faq.removed += 1;
    return null;
  }
  return value;
}

function schemaBlocks(html) {
  return [...html.matchAll(jsonLdPattern)].map((match) => match[2].trim());
}

function localeFor(file) {
  const first = relative(file).split("/")[0];
  return localeDirs.has(first) ? first : "";
}

function localizeBreadcrumbItems(value, locale, key = "") {
  if (Array.isArray(value)) return value.map((item) => localizeBreadcrumbItems(item, locale, key));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([childKey, childValue]) => [
        childKey,
        localizeBreadcrumbItems(childValue, locale, childKey),
      ]),
    );
  }
  if (key !== "item" || !locale || typeof value !== "string" || !value.startsWith(siteOrigin)) return value;
  const url = new URL(value);
  url.pathname = url.pathname === "/" ? `/${locale}/` : `/${locale}${url.pathname}`;
  return url.toString();
}

function alignSiteUrl(value, locale) {
  if (typeof value !== "string" || !value.startsWith(siteOrigin)) return value;
  const url = new URL(value);
  const segments = url.pathname.split("/").filter(Boolean);
  if (localeDirs.has(segments[0])) segments.shift();
  url.pathname = `/${[...(locale ? [locale] : []), ...segments].join("/")}${segments.length || locale ? "/" : ""}`;
  return url.toString();
}

function alignBreadcrumbNodes(value, file, canonical, report) {
  if (Array.isArray(value)) return value.map((item) => alignBreadcrumbNodes(item, file, canonical, report));
  if (!value || typeof value !== "object") return value;
  if (Array.isArray(value["@graph"])) {
    return { ...value, "@graph": value["@graph"].map((item) => alignBreadcrumbNodes(item, file, canonical, report)) };
  }
  if (!typesOf(value).includes("BreadcrumbList")) return value;

  const locale = localeFor(file);
  const items = Array.isArray(value.itemListElement)
    ? value.itemListElement.map((item) => ({ ...item, item: alignSiteUrl(item.item, locale) }))
    : value.itemListElement;
  if (Array.isArray(items) && items.length && canonical) items[items.length - 1].item = canonical;
  const aligned = { ...value, itemListElement: items };
  if (fingerprint(aligned) !== fingerprint(value)) report.breadcrumb.aligned += 1;
  return aligned;
}

function repairedBreadcrumb(file) {
  const locale = localeFor(file);
  if (!locale) throw new Error(`${relative(file)}: cannot repair an English breadcrumb without a valid source`);
  const englishFile = path.join(projectRoot, relative(file).split("/").slice(1).join(path.sep));
  if (!fs.existsSync(englishFile)) throw new Error(`${relative(file)}: English counterpart is missing`);
  for (const raw of schemaBlocks(fs.readFileSync(englishFile, "utf8"))) {
    let value;
    try {
      value = JSON.parse(raw);
    } catch {
      continue;
    }
    const breadcrumb = topLevelNodes(value).find((node) => typesOf(node).includes("BreadcrumbList"));
    if (breadcrumb) return localizeBreadcrumbItems(breadcrumb, locale);
  }
  throw new Error(`${relative(file)}: English counterpart has no valid BreadcrumbList`);
}

function visibleFaqPairs(html) {
  const pairs = [];
  for (const match of html.matchAll(/<details\b[^>]*>([\s\S]*?)<\/details>/gi)) {
    const block = match[1];
    const summaryMatch = block.match(/<summary\b[^>]*>([\s\S]*?)<\/summary>/i);
    if (!summaryMatch) continue;
    const question = visibleText(summaryMatch[1]);
    const answer = visibleText(block.replace(summaryMatch[0], " "));
    if (question && answer) pairs.push({ question, answer });
  }
  const hasFaqLabel = /class=["'][^"']*faq[^"']*["']/i.test(html)
    || /<h[1-6]\b[^>]*>[^<]*(?:FAQ|frequently asked)/i.test(html);
  return hasFaqLabel ? pairs : [];
}

function isProductPage(file, html) {
  return /(^|\/)products\//.test(relative(file))
    && /<body\b[^>]*class=["'][^"']*(?:product-detail-page|product-detail-template)/i.test(html);
}

function absoluteUrl(value) {
  return new URL(value, `${siteOrigin}/`).toString();
}

function productSchema(html, file) {
  const canonical = canonicalFrom(html);
  // Some noindex locale files contain a damaged closing H1 tag. Stop at either
  // form so the schema still reflects the text a browser exposes in that H1.
  const name = visibleText(html.match(/<h1\b[^>]*>([\s\S]*?)(?:<\/h1>|\/h1>)/i)?.[1] ?? "");
  const description = classElementText(html, "pdp-hero-text") || metaContent(html, "name", "description");
  const image = classImageSource(html, "pdp-main-image") || metaContent(html, "property", "og:image");
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
    brand: {
      "@type": "Brand",
      name: "KRATOR ATTACHMENTS",
    },
    manufacturer: {
      "@type": "Organization",
      "@id": organizationId,
      name: "KRATOR ATTACHMENTS",
      url: `${siteOrigin}/`,
    },
  };
}

function faqSchema(html, pairs) {
  const canonical = canonicalFrom(html);
  if (!canonical) throw new Error("FAQPage needs a canonical URL");
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    mainEntity: pairs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

function renderSchema(value) {
  return `  <script type="application/ld+json">\n${JSON.stringify(value, null, 2)}\n  </script>\n`;
}

function validatePage(html, file) {
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
  const productCount = nodes.filter((node) => typesOf(node).includes("Product")).length;
  const faqCount = nodes.filter((node) => typesOf(node).includes("FAQPage")).length;
  const expectedProduct = isProductPage(file, html) ? 1 : 0;
  const expectedFaq = visibleFaqPairs(html).length ? 1 : 0;
  if (productCount !== expectedProduct) throw new Error(`${relative(file)}: expected ${expectedProduct} Product, found ${productCount}`);
  if (faqCount !== expectedFaq) throw new Error(`${relative(file)}: expected ${expectedFaq} FAQPage, found ${faqCount}`);
}

function withoutStructuredData(html) {
  return html.replace(jsonLdPattern, " ").replace(/\s+/g, " ").trim();
}

const report = {
  mode: writeChanges ? "write" : "dry-run",
  scannedPages: 0,
  changedPages: 0,
  invalid: { removedManaged: 0, repairedBreadcrumbs: 0 },
  duplicatesRemoved: 0,
  breadcrumb: { aligned: 0 },
  product: { pages: 0, removed: 0, added: 0 },
  faq: { visiblePages: 0, removed: 0, added: 0 },
  robotsDirectivesChanged: 0,
  nonSchemaContentChanged: 0,
};

for (const file of walk(projectRoot).sort()) {
  report.scannedPages += 1;
  const original = fs.readFileSync(file, "utf8");
  const robotsBefore = original.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i)?.[1] ?? "";
  const seen = new Set();

  let updated = original.replace(jsonLdPattern, (match, attrs, rawJson) => {
    const raw = rawJson.trim();
    let value;
    try {
      value = JSON.parse(raw);
    } catch {
      const type = rawType(raw);
      if (type === "Product" || type === "FAQPage") {
        report.invalid.removedManaged += 1;
        if (type === "Product") report.product.removed += 1;
        else report.faq.removed += 1;
        return "";
      }
      if (type === "BreadcrumbList") {
        const repaired = alignBreadcrumbNodes(repairedBreadcrumb(file), file, canonicalFrom(original), report);
        const key = fingerprint(repaired);
        if (seen.has(key)) {
          report.duplicatesRemoved += 1;
          return "";
        }
        seen.add(key);
        report.invalid.repairedBreadcrumbs += 1;
        return renderSchema(repaired);
      }
      throw new Error(`${relative(file)}: unsupported invalid schema type ${type}`);
    }

    const filtered = alignBreadcrumbNodes(
      removeManagedNodes(value, report),
      file,
      canonicalFrom(original),
      report,
    );
    if (!filtered) return "";
    const key = fingerprint(filtered);
    if (seen.has(key)) {
      report.duplicatesRemoved += 1;
      return "";
    }
    seen.add(key);
    return fingerprint(filtered) === fingerprint(value) ? match : renderSchema(filtered);
  });

  const additions = [];
  if (isProductPage(file, updated)) {
    report.product.pages += 1;
    report.product.added += 1;
    additions.push(productSchema(updated, file));
  }
  const faqPairs = visibleFaqPairs(updated);
  if (faqPairs.length) {
    report.faq.visiblePages += 1;
    report.faq.added += 1;
    additions.push(faqSchema(updated, faqPairs));
  }
  if (additions.length) {
    updated = updated.replace(/<\/head>/i, `${additions.map(renderSchema).join("")}</head>`);
  }

  validatePage(updated, file);
  if (withoutStructuredData(original) !== withoutStructuredData(updated)) {
    report.nonSchemaContentChanged += 1;
  }
  const robotsAfter = updated.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i)?.[1] ?? "";
  if (robotsBefore !== robotsAfter) report.robotsDirectivesChanged += 1;

  if (updated !== original) {
    report.changedPages += 1;
    if (writeChanges) fs.writeFileSync(file, updated, "utf8");
  }
}

if (report.robotsDirectivesChanged) throw new Error("A robots meta directive changed unexpectedly");
if (report.nonSchemaContentChanged) throw new Error("Non-schema HTML changed unexpectedly");
if (writeChanges && !process.argv.includes("--skip-entity-signals")) {
  const entityResult = spawnSync(
    process.execPath,
    [path.join(scriptDirectory, "normalize-entity-signals.mjs"), "--write"],
    { cwd: projectRoot, encoding: "utf8", stdio: "inherit" },
  );
  if (entityResult.status !== 0) throw new Error("Entity signal normalization failed");
}
console.log(JSON.stringify(report, null, 2));
