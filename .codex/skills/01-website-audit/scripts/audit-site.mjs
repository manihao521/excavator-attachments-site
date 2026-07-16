import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const rootArgIndex = args.indexOf("--root");
const projectRoot = path.resolve(
  rootArgIndex >= 0 && args[rootArgIndex + 1] ? args[rootArgIndex + 1] : process.cwd(),
);
const sampleLimit = 40;
const locales = new Set(["es", "pt", "fr", "ru", "ar"]);
const excludedDirectories = new Set([
  ".agents",
  ".codex",
  ".git",
  "docs",
  "node_modules",
  "outputs",
  "public",
  "src",
  "work",
]);
if (path.basename(projectRoot).toLowerCase() !== "dist") {
  excludedDirectories.add("dist");
}

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

function walk(directory, predicate, output = []) {
  if (!fs.existsSync(directory)) return output;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && excludedDirectories.has(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath, predicate, output);
    else if (entry.isFile() && predicate(fullPath)) output.push(fullPath);
  }
  return output;
}

function tags(html, tagName) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi"))].map(
    (match) => match[0],
  );
}

function attributes(tag) {
  const result = {};
  const body = tag.replace(/^<[^\s>]+\s*/i, "").replace(/\/?\s*>$/, "");
  const pattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  for (const match of body.matchAll(pattern)) {
    result[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? "";
  }
  return result;
}

function findTagByAttribute(html, tagName, name, expected) {
  return tags(html, tagName).map(attributes).find((attrs) => {
    const value = attrs[name]?.toLowerCase().split(/\s+/) ?? [];
    return value.includes(expected.toLowerCase());
  });
}

function textContent(value = "") {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractSchemaTypes(value, output = []) {
  if (Array.isArray(value)) {
    for (const item of value) extractSchemaTypes(item, output);
  } else if (value && typeof value === "object") {
    const type = value["@type"];
    if (Array.isArray(type)) output.push(...type.filter((item) => typeof item === "string"));
    else if (typeof type === "string") output.push(type);
    for (const nested of Object.values(value)) extractSchemaTypes(nested, output);
  }
  return output;
}

function routeFor(relativePath) {
  if (relativePath === "index.html") return "/";
  return `/${relativePath.replace(/index\.html$/, "")}`;
}

function parseRedirects() {
  const redirectsPath = path.join(projectRoot, "_redirects");
  if (!fs.existsSync(redirectsPath)) return [];
  return fs
    .readFileSync(redirectsPath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => line.split(/\s+/)[0]);
}

const redirectSources = parseRedirects();

function isRedirectSource(urlPath) {
  return redirectSources.some((source) => {
    const escaped = source
      .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
      .replace(/\*/g, ".*");
    return new RegExp(`^${escaped}/?$`).test(urlPath);
  });
}

function localTargetExists(rawUrl) {
  if (!rawUrl || rawUrl.startsWith("#") || rawUrl.startsWith("//")) return true;
  if (!rawUrl.startsWith("/")) return true;
  const pathname = rawUrl.split(/[?#]/)[0] || "/";
  if (isRedirectSource(pathname)) return true;
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    decoded = pathname;
  }
  const relative = decoded.replace(/^\/+/, "");
  const candidates = relative
    ? [relative, path.join(relative, "index.html")]
    : ["index.html"];
  return candidates.some((candidate) => fs.existsSync(path.join(projectRoot, candidate)));
}

function addIssue(collection, file, value) {
  collection.push(value === undefined ? file : { file, value });
}

const htmlFiles = walk(projectRoot, (file) => file.toLowerCase().endsWith(".html"));
const pageTypeCounts = {};
const localeCounts = {};
const schemaTypeCounts = {};
const schemaTypeCountsByLocale = {};
const productSchemaFiles = [];
const faqSchemaFiles = [];
const titleGroups = new Map();
const descriptionGroups = new Map();
const issues = {
  missingTitle: [],
  missingDescription: [],
  missingCanonical: [],
  missingLang: [],
  invalidH1Count: [],
  invalidJsonLd: [],
  englishNoindex: [],
  localeIndexable: [],
  brokenReferences: [],
  imagesMissingAlt: [],
  imagesEmptyAlt: [],
  imagesMissingDimensions: [],
  blogMissingArticleSchema: [],
  blogMissingProductLinks: [],
  blogMissingFaq: [],
  productMissingSpecs: [],
  productMissingFaq: [],
  productMissingRelatedArticles: [],
  productMissingQuoteCta: [],
};
let imageTagCount = 0;
let nonWebpImageReferenceCount = 0;
let blogArticleCount = 0;
let productDetailCount = 0;

const categorySlugs = new Set([
  "custom-attachments",
  "earth-augers",
  "excavator-buckets",
  "grapples",
  "hydraulic-breaker",
  "hydraulic-pulverizer",
  "hydraulic-shear",
  "plate-compactors",
  "quick-coupler",
  "rippers",
  "vibratory-pile-hammer",
]);

for (const file of htmlFiles) {
  const relativePath = toPosix(path.relative(projectRoot, file));
  const parts = relativePath.split("/");
  const locale = locales.has(parts[0]) ? parts[0] : "en";
  localeCounts[locale] = (localeCounts[locale] ?? 0) + 1;
  const routeParts = locale === "en" ? parts : parts.slice(1);
  const pageType = routeParts[0] === "products"
    ? "product"
    : routeParts[0] === "blog"
      ? "blog"
      : relativePath === "index.html" || (locale !== "en" && routeParts[0] === "index.html")
        ? "home"
        : "company";
  pageTypeCounts[pageType] = (pageTypeCounts[pageType] ?? 0) + 1;

  const html = fs.readFileSync(file, "utf8");
  const titleMatch = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  const title = textContent(titleMatch?.[1]);
  const description = findTagByAttribute(html, "meta", "name", "description")?.content?.trim() ?? "";
  const canonical = findTagByAttribute(html, "link", "rel", "canonical")?.href?.trim() ?? "";
  const htmlTag = tags(html, "html")[0];
  const lang = htmlTag ? attributes(htmlTag).lang?.trim() : "";
  const robots = findTagByAttribute(html, "meta", "name", "robots")?.content?.toLowerCase() ?? "";
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;

  if (!title) addIssue(issues.missingTitle, relativePath);
  if (!description) addIssue(issues.missingDescription, relativePath);
  if (!canonical) addIssue(issues.missingCanonical, relativePath);
  if (!lang) addIssue(issues.missingLang, relativePath);
  if (h1Count !== 1) addIssue(issues.invalidH1Count, relativePath, h1Count);
  if (locale === "en" && robots.includes("noindex")) addIssue(issues.englishNoindex, relativePath);
  if (locale !== "en" && !robots.includes("noindex")) addIssue(issues.localeIndexable, relativePath);

  if (title) {
    const key = title.toLowerCase();
    titleGroups.set(key, [...(titleGroups.get(key) ?? []), relativePath]);
  }
  if (description) {
    const key = description.toLowerCase();
    descriptionGroups.set(key, [...(descriptionGroups.get(key) ?? []), relativePath]);
  }

  const pageSchemaTypes = [];
  const jsonLdPattern = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(jsonLdPattern)) {
    try {
      const parsed = JSON.parse(match[1].trim());
      pageSchemaTypes.push(...extractSchemaTypes(parsed));
    } catch (error) {
      addIssue(issues.invalidJsonLd, relativePath, error.message);
    }
  }
  for (const type of new Set(pageSchemaTypes)) {
    schemaTypeCounts[type] = (schemaTypeCounts[type] ?? 0) + 1;
    schemaTypeCountsByLocale[locale] ??= {};
    schemaTypeCountsByLocale[locale][type] = (schemaTypeCountsByLocale[locale][type] ?? 0) + 1;
  }
  if (pageSchemaTypes.includes("Product")) productSchemaFiles.push(relativePath);
  if (pageSchemaTypes.includes("FAQPage")) faqSchemaFiles.push(relativePath);

  const anchors = tags(html, "a").map(attributes).map((attrs) => attrs.href).filter(Boolean);
  const images = tags(html, "img").map(attributes);
  const scripts = tags(html, "script").map(attributes).map((attrs) => attrs.src).filter(Boolean);
  const links = tags(html, "link").map(attributes).map((attrs) => attrs.href).filter(Boolean);
  const sources = tags(html, "source").map(attributes).flatMap((attrs) => {
    const values = [];
    if (attrs.src) values.push(attrs.src);
    if (attrs.srcset) {
      values.push(...attrs.srcset.split(",").map((item) => item.trim().split(/\s+/)[0]));
    }
    return values;
  });
  const references = [...anchors, ...images.map((attrs) => attrs.src).filter(Boolean), ...scripts, ...links, ...sources];
  for (const reference of new Set(references)) {
    if (!localTargetExists(reference)) {
      addIssue(issues.brokenReferences, relativePath, reference);
    }
  }

  for (const image of images) {
    imageTagCount += 1;
    if (!("alt" in image)) addIssue(issues.imagesMissingAlt, relativePath, image.src ?? "");
    else if (!image.alt.trim()) addIssue(issues.imagesEmptyAlt, relativePath, image.src ?? "");
    if (!("width" in image) || !("height" in image)) {
      addIssue(issues.imagesMissingDimensions, relativePath, image.src ?? "");
    }
    const cleanSource = (image.src ?? "").split(/[?#]/)[0].toLowerCase();
    if (cleanSource && !cleanSource.endsWith(".webp") && !cleanSource.endsWith(".svg")) {
      nonWebpImageReferenceCount += 1;
    }
  }

  const isEnglishBlogArticle = locale === "en" && routeParts[0] === "blog" && routeParts.length >= 3 && routeParts[1] !== "index.html";
  if (isEnglishBlogArticle) {
    blogArticleCount += 1;
    if (!pageSchemaTypes.some((type) => type === "BlogPosting" || type === "Article")) {
      addIssue(issues.blogMissingArticleSchema, relativePath);
    }
    if (!/href=["']\/products\//i.test(html)) addIssue(issues.blogMissingProductLinks, relativePath);
    if (!/\bfaq\b/i.test(html)) addIssue(issues.blogMissingFaq, relativePath);
  }

  const isEnglishProduct = locale === "en" && routeParts[0] === "products" && routeParts[1] && routeParts[1] !== "index.html";
  const isProductDetail = isEnglishProduct && (routeParts.length >= 4 || !categorySlugs.has(routeParts[1]));
  if (isProductDetail) {
    productDetailCount += 1;
    if (!/<table\b/i.test(html) || !/spec/i.test(html)) addIssue(issues.productMissingSpecs, relativePath);
    if (!/\bfaq\b/i.test(html)) addIssue(issues.productMissingFaq, relativePath);
    if (!/href=["']\/blog\//i.test(html)) addIssue(issues.productMissingRelatedArticles, relativePath);
    if (!/(get|request)[^<]{0,20}quote|whatsapp/i.test(html)) addIssue(issues.productMissingQuoteCta, relativePath);
  }
}

function duplicateGroups(groups) {
  return [...groups.values()]
    .filter((files) => files.length > 1)
    .sort((a, b) => b.length - a.length);
}

const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);
const deployedImageFiles = ["assets", "images"].flatMap((directory) =>
  walk(path.join(projectRoot, directory), (file) => imageExtensions.has(path.extname(file).toLowerCase())),
);
const imageFilesByExtension = {};
let deployedImageBytes = 0;
let rawPathImageBytes = 0;
let rawPathImageFiles = 0;
const largeImageFiles = [];
for (const file of deployedImageFiles) {
  const extension = path.extname(file).toLowerCase() || "none";
  const size = fs.statSync(file).size;
  imageFilesByExtension[extension] = (imageFilesByExtension[extension] ?? 0) + 1;
  deployedImageBytes += size;
  const relativeImagePath = toPosix(path.relative(projectRoot, file));
  if (relativeImagePath.split("/").includes("raw")) {
    rawPathImageFiles += 1;
    rawPathImageBytes += size;
  }
  if (size >= 500 * 1024) {
    largeImageFiles.push({ file: relativeImagePath, bytes: size });
  }
}
largeImageFiles.sort((a, b) => b.bytes - a.bytes);

const largestHtmlFiles = htmlFiles
  .map((file) => ({ file: toPosix(path.relative(projectRoot, file)), bytes: fs.statSync(file).size }))
  .sort((a, b) => b.bytes - a.bytes)
  .slice(0, 20);
const duplicateTitleGroups = duplicateGroups(titleGroups);
const duplicateDescriptionGroups = duplicateGroups(descriptionGroups);
const brokenTargetCounts = {};
for (const issue of issues.brokenReferences) {
  const target = issue.value;
  brokenTargetCounts[target] = (brokenTargetCounts[target] ?? 0) + 1;
}
const topBrokenTargets = Object.entries(brokenTargetCounts)
  .map(([target, occurrences]) => ({ target, occurrences }))
  .sort((a, b) => b.occurrences - a.occurrences)
  .slice(0, 30);

const report = {
  generatedAt: new Date().toISOString(),
  root: projectRoot,
  summary: {
    htmlPages: htmlFiles.length,
    pagesByLocale: localeCounts,
    pagesByType: pageTypeCounts,
    englishBlogArticles: blogArticleCount,
    englishProductDetails: productDetailCount,
    imageTags: imageTagCount,
  },
  metadata: {
    missingTitle: issues.missingTitle.length,
    missingDescription: issues.missingDescription.length,
    missingCanonical: issues.missingCanonical.length,
    missingLang: issues.missingLang.length,
    invalidH1Count: issues.invalidH1Count.length,
    duplicateTitleGroupCount: duplicateTitleGroups.length,
    duplicateDescriptionGroupCount: duplicateDescriptionGroups.length,
    duplicateTitleGroups: duplicateTitleGroups.slice(0, sampleLimit),
    duplicateDescriptionGroups: duplicateDescriptionGroups.slice(0, sampleLimit),
    samples: {
      missingTitle: issues.missingTitle.slice(0, sampleLimit),
      missingDescription: issues.missingDescription.slice(0, sampleLimit),
      missingCanonical: issues.missingCanonical.slice(0, sampleLimit),
      invalidH1Count: issues.invalidH1Count.slice(0, sampleLimit),
    },
  },
  indexationPolicy: {
    englishNoindex: issues.englishNoindex.length,
    multilingualMissingNoindex: issues.localeIndexable.length,
    samples: {
      englishNoindex: issues.englishNoindex.slice(0, sampleLimit),
      multilingualMissingNoindex: issues.localeIndexable.slice(0, sampleLimit),
    },
  },
  structuredData: {
    pagesByType: schemaTypeCounts,
    pagesByLocaleAndType: schemaTypeCountsByLocale,
    invalidJsonLd: issues.invalidJsonLd.length,
    blogArticlesMissingArticleSchema: issues.blogMissingArticleSchema.length,
    policyReview: {
      productSchemaPages: productSchemaFiles.length,
      faqPageSchemaPages: faqSchemaFiles.length,
      productSchemaSamples: productSchemaFiles.slice(0, sampleLimit),
      faqPageSchemaSamples: faqSchemaFiles.slice(0, sampleLimit),
    },
    samples: {
      invalidJsonLd: issues.invalidJsonLd.slice(0, sampleLimit),
      blogArticlesMissingArticleSchema: issues.blogMissingArticleSchema.slice(0, sampleLimit),
    },
  },
  references: {
    broken: issues.brokenReferences.length,
    uniqueBrokenTargets: Object.keys(brokenTargetCounts).length,
    topBrokenTargets,
    samples: issues.brokenReferences.slice(0, sampleLimit),
  },
  images: {
    missingAlt: issues.imagesMissingAlt.length,
    emptyAlt: issues.imagesEmptyAlt.length,
    missingDimensions: issues.imagesMissingDimensions.length,
    nonWebpOrSvgReferences: nonWebpImageReferenceCount,
    deployedFiles: deployedImageFiles.length,
    deployedBytes: deployedImageBytes,
    rawPathFiles: rawPathImageFiles,
    rawPathBytes: rawPathImageBytes,
    filesByExtension: imageFilesByExtension,
    filesAtLeast500Kb: largeImageFiles.length,
    largestFiles: largeImageFiles.slice(0, 30),
    samples: {
      missingAlt: issues.imagesMissingAlt.slice(0, sampleLimit),
      missingDimensions: issues.imagesMissingDimensions.slice(0, sampleLimit),
    },
  },
  contentGaps: {
    blogArticlesMissingProductLinks: issues.blogMissingProductLinks.length,
    blogArticlesMissingFaq: issues.blogMissingFaq.length,
    productDetailsMissingSpecificationTable: issues.productMissingSpecs.length,
    productDetailsMissingFaq: issues.productMissingFaq.length,
    productDetailsMissingRelatedArticles: issues.productMissingRelatedArticles.length,
    productDetailsMissingQuoteCta: issues.productMissingQuoteCta.length,
    samples: {
      blogArticlesMissingProductLinks: issues.blogMissingProductLinks.slice(0, sampleLimit),
      blogArticlesMissingFaq: issues.blogMissingFaq.slice(0, sampleLimit),
      productDetailsMissingSpecificationTable: issues.productMissingSpecs.slice(0, sampleLimit),
      productDetailsMissingFaq: issues.productMissingFaq.slice(0, sampleLimit),
      productDetailsMissingRelatedArticles: issues.productMissingRelatedArticles.slice(0, sampleLimit),
      productDetailsMissingQuoteCta: issues.productMissingQuoteCta.slice(0, sampleLimit),
    },
  },
  largestHtmlFiles,
};

console.log(JSON.stringify(report, null, 2));
