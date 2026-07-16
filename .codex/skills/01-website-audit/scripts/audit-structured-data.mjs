import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const rootIndex = args.indexOf("--root");
const root = path.resolve(rootIndex >= 0 && args[rootIndex + 1] ? args[rootIndex + 1] : process.cwd());
const sampleLimit = 40;
const localeDirs = new Set(["ar", "es", "fr", "pt", "ru"]);
const excludedDirs = new Set([".agents", ".codex", ".git", "docs", "node_modules", "outputs", "public", "src", "work"]);
if (path.basename(root).toLowerCase() !== "dist") excludedDirs.add("dist");
const jsonLdPattern = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

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
  return path.relative(root, file).split(path.sep).join("/");
}

function localeFor(file) {
  const first = relative(file).split("/")[0];
  return localeDirs.has(first) ? first : "en";
}

function decodeText(value = "") {
  const named = {
    amp: "&", apos: "'", gt: ">", hellip: "...", laquo: "\u00ab", lt: "<",
    mdash: "\u2014", nbsp: " ", ndash: "\u2013", quot: '"', raquo: "\u00bb",
    reg: "\u00ae", times: "\u00d7", trade: "\u2122",
  };
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&([a-z]+);/gi, (match, name) => named[name.toLowerCase()] ?? match)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalize(value = "") {
  return decodeText(String(value)).toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

function topLevelNodes(value) {
  if (Array.isArray(value)) return value.flatMap(topLevelNodes);
  if (!value || typeof value !== "object") return [];
  if (Array.isArray(value["@graph"])) return value["@graph"].flatMap(topLevelNodes);
  return [value];
}

function typesOf(node) {
  const type = node?.["@type"];
  if (Array.isArray(type)) return type.filter((item) => typeof item === "string");
  return typeof type === "string" ? [type] : [];
}

function nodeSignature(node) {
  const identity = node["@id"] || node.url || node.name || node.headline || "";
  return `${typesOf(node).sort().join("+")}|${normalize(identity)}`;
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
    const block = match[1];
    const summary = block.match(/<summary\b[^>]*>([\s\S]*?)<\/summary>/i);
    const question = summary?.[1] ?? "";
    const answer = summary ? block.replace(summary[0], " ") : "";
    if (normalize(question) && normalize(answer)) pairs.push({ question: normalize(question), answer: normalize(answer) });
  }
  return pairs;
}

function faqQuestions(node) {
  const entities = Array.isArray(node.mainEntity) ? node.mainEntity : node.mainEntity ? [node.mainEntity] : [];
  return entities.map((question) => ({
    question: normalize(question?.name),
    answer: normalize(question?.acceptedAnswer?.text),
  }));
}

function addSample(list, value) {
  if (list.length < sampleLimit) list.push(value);
}

const report = {
  root,
  summary: { pages: 0, jsonLdBlocks: 0, parsedNodes: 0 },
  invalid: { blocks: 0, byLocale: {}, byRawType: {}, samples: [] },
  duplicate: { pages: 0, nodes: 0, samples: [] },
  product: {
    detailPages: 0,
    detailPagesMissingProduct: 0,
    detailPagesWithDuplicateProduct: 0,
    categoryPagesWithProduct: 0,
    productNodes: 0,
    schemaOrgEntityValid: 0,
    googleProductSnippetEligible: 0,
    canonicalMismatch: 0,
    visibleNameMismatch: 0,
    missingSamples: [],
    samples: [],
  },
  faq: {
    visibleFaqPages: 0,
    faqPageNodes: 0,
    faqWithoutVisibleContent: 0,
    duplicateFaqPage: 0,
    missingRequiredFields: 0,
    visibleContentMismatch: 0,
    visibleFaqWithoutSchema: 0,
    samples: [],
  },
  breadcrumb: {
    nodes: 0,
    invalidRequiredFields: 0,
    canonicalMismatch: 0,
    samples: [],
  },
  article: {
    nodes: 0,
    missingRecommendedFields: 0,
    samples: [],
  },
  organization: {
    nodes: 0,
    missingIdentityFields: 0,
    samples: [],
  },
  website: {
    nodes: 0,
    missingIdentityFields: 0,
    samples: [],
  },
  prohibitedClaims: {
    offerNodes: 0,
    reviewNodes: 0,
    aggregateRatingNodes: 0,
  },
  topLevelTypesByLocale: {},
};

for (const file of walk(root).sort()) {
  report.summary.pages += 1;
  const fileName = relative(file);
  const locale = localeFor(file);
  const html = fs.readFileSync(file, "utf8");
  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1] ?? "";
  const visibleText = normalize(html.replace(/<script\b[\s\S]*?<\/script>/gi, " ").replace(/<style\b[\s\S]*?<\/style>/gi, " "));
  const faqPairs = visibleFaqPairs(html);
  const hasVisibleFaq = faqPairs.length > 0 && /\bfaq\b/i.test(html);
  if (hasVisibleFaq) report.faq.visibleFaqPages += 1;

  const pageNodes = [];
  for (const match of html.matchAll(jsonLdPattern)) {
    report.summary.jsonLdBlocks += 1;
    const raw = match[1].trim();
    try {
      pageNodes.push(...topLevelNodes(JSON.parse(raw)));
    } catch (error) {
      const rawType = raw.match(/"@type"\s*:\s*"([^"]+)"/)?.[1] ?? "Unknown";
      report.invalid.blocks += 1;
      report.invalid.byLocale[locale] = (report.invalid.byLocale[locale] ?? 0) + 1;
      report.invalid.byRawType[rawType] = (report.invalid.byRawType[rawType] ?? 0) + 1;
      addSample(report.invalid.samples, { file: fileName, type: rawType, error: error.message });
    }
  }

  report.summary.parsedNodes += pageNodes.length;
  report.topLevelTypesByLocale[locale] ??= {};
  for (const node of pageNodes) {
    for (const type of typesOf(node)) {
      report.topLevelTypesByLocale[locale][type] = (report.topLevelTypesByLocale[locale][type] ?? 0) + 1;
    }
  }

  const signatureCounts = {};
  for (const node of pageNodes) {
    const signature = nodeSignature(node);
    signatureCounts[signature] = (signatureCounts[signature] ?? 0) + 1;
  }
  const duplicates = Object.entries(signatureCounts).filter(([, count]) => count > 1);
  if (duplicates.length) {
    report.duplicate.pages += 1;
    report.duplicate.nodes += duplicates.reduce((total, [, count]) => total + count - 1, 0);
    addSample(report.duplicate.samples, { file: fileName, duplicates });
  }

  const productNodes = pageNodes.filter((node) => typesOf(node).includes("Product"));
  const isProductRoute = /(^|\/)products\//.test(fileName);
  const isProductDetail = isProductRoute && /<body\b[^>]*class=["'][^"']*(?:product-detail-page|product-detail-template)/i.test(html);
  if (isProductDetail) {
    report.product.detailPages += 1;
    if (productNodes.length === 0) {
      report.product.detailPagesMissingProduct += 1;
      addSample(report.product.missingSamples, { file: fileName });
    }
    if (productNodes.length > 1) report.product.detailPagesWithDuplicateProduct += 1;
  } else if (isProductRoute && productNodes.length > 0) {
    report.product.categoryPagesWithProduct += 1;
  }

  for (const product of productNodes) {
    report.product.productNodes += 1;
    const hasName = typeof product.name === "string" && product.name.trim();
    const hasEntityFields = Boolean(hasName && product.url && product.image && product.brand);
    if (hasEntityFields) report.product.schemaOrgEntityValid += 1;
    const offers = Array.isArray(product.offers) ? product.offers : product.offers ? [product.offers] : [];
    const reviews = Array.isArray(product.review) ? product.review : product.review ? [product.review] : [];
    const hasValidOffer = offers.some((offer) => offer?.price != null && typeof offer?.priceCurrency === "string");
    const hasValidReview = reviews.some((review) => review?.reviewRating?.ratingValue != null && review?.author);
    const hasValidAggregateRating = product.aggregateRating?.ratingValue != null
      && (product.aggregateRating?.reviewCount != null || product.aggregateRating?.ratingCount != null);
    if (hasName && (hasValidOffer || hasValidReview || hasValidAggregateRating)) {
      report.product.googleProductSnippetEligible += 1;
    }
    if (product.url !== canonical) report.product.canonicalMismatch += 1;
    if (hasName && !visibleText.includes(normalize(product.name))) report.product.visibleNameMismatch += 1;
    if (!hasEntityFields || product.url !== canonical || (hasName && !visibleText.includes(normalize(product.name)))) {
      addSample(report.product.samples, {
        file: fileName,
        hasEntityFields,
        googleEligible: Boolean(hasName && (hasValidOffer || hasValidReview || hasValidAggregateRating)),
        canonical: product.url === canonical,
        visibleName: Boolean(hasName && visibleText.includes(normalize(product.name))),
      });
    }
  }

  const faqNodes = pageNodes.filter((node) => typesOf(node).includes("FAQPage"));
  report.faq.faqPageNodes += faqNodes.length;
  if (faqNodes.length > 1) report.faq.duplicateFaqPage += 1;
  if (faqNodes.length && !hasVisibleFaq) report.faq.faqWithoutVisibleContent += 1;
  if (hasVisibleFaq && faqNodes.length === 0) report.faq.visibleFaqWithoutSchema += 1;

  for (const faqNode of faqNodes) {
    const questions = faqQuestions(faqNode);
    const missingRequired = questions.length === 0 || questions.some((item) => !item.question || !item.answer);
    if (missingRequired) report.faq.missingRequiredFields += 1;
    const mismatch = !hasVisibleFaq || questions.length !== faqPairs.length || questions.some((item) =>
      !faqPairs.some((pair) => pair.question === item.question && pair.answer === item.answer),
    );
    if (mismatch) report.faq.visibleContentMismatch += 1;
    if (missingRequired || mismatch) {
      addSample(report.faq.samples, { file: fileName, missingRequired, visibleContentMismatch: mismatch });
    }
  }

  for (const breadcrumb of pageNodes.filter((node) => typesOf(node).includes("BreadcrumbList"))) {
    report.breadcrumb.nodes += 1;
    const items = Array.isArray(breadcrumb.itemListElement) ? breadcrumb.itemListElement : [];
    const invalid = items.length < 2 || items.some((item, index) => {
      const hasItem = index === items.length - 1 || (typeof item?.item === "string" && /^https?:\/\//.test(item.item));
      return !typesOf(item).includes("ListItem")
        || item.position !== index + 1
        || typeof item.name !== "string"
        || !item.name.trim()
        || !hasItem;
    });
    const finalItem = items.at(-1)?.item;
    const canonicalMismatch = Boolean(finalItem && canonical && finalItem !== canonical);
    if (invalid) report.breadcrumb.invalidRequiredFields += 1;
    if (canonicalMismatch) report.breadcrumb.canonicalMismatch += 1;
    if (invalid || canonicalMismatch) addSample(report.breadcrumb.samples, { file: fileName, invalid, canonicalMismatch });
  }

  for (const article of pageNodes.filter((node) => typesOf(node).some((type) => type === "Article" || type === "BlogPosting"))) {
    report.article.nodes += 1;
    const missing = ["headline", "image", "datePublished", "author"].filter((field) => !article[field]);
    if (missing.length) {
      report.article.missingRecommendedFields += 1;
      addSample(report.article.samples, { file: fileName, missing });
    }
  }

  for (const organization of pageNodes.filter((node) => typesOf(node).includes("Organization"))) {
    report.organization.nodes += 1;
    const missing = ["name", "url"].filter((field) => !organization[field]);
    if (missing.length) {
      report.organization.missingIdentityFields += 1;
      addSample(report.organization.samples, { file: fileName, missing });
    }
  }

  for (const website of pageNodes.filter((node) => typesOf(node).includes("WebSite"))) {
    report.website.nodes += 1;
    const missing = ["name", "url"].filter((field) => !website[field]);
    if (missing.length) {
      report.website.missingIdentityFields += 1;
      addSample(report.website.samples, { file: fileName, missing });
    }
  }

  report.prohibitedClaims.offerNodes += pageNodes.filter((node) => typesOf(node).includes("Offer")).length;
  report.prohibitedClaims.reviewNodes += pageNodes.filter((node) => typesOf(node).includes("Review")).length;
  report.prohibitedClaims.aggregateRatingNodes += pageNodes.filter((node) => typesOf(node).includes("AggregateRating")).length;
}

console.log(JSON.stringify(report, null, 2));
