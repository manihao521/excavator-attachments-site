import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const rootIndex = args.indexOf("--root");
const scanRoot = path.resolve(rootIndex >= 0 && args[rootIndex + 1] ? args[rootIndex + 1] : process.cwd());
const projectRoot = path.basename(scanRoot).toLowerCase() === "dist" ? path.dirname(scanRoot) : scanRoot;

function runJson(script, root) {
  if (!fs.existsSync(script)) throw new Error(`Required audit script is missing: ${script}`);
  const result = spawnSync(process.execPath, [script, "--root", root], {
    cwd: projectRoot,
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
  if (result.status !== 0) throw new Error(result.stderr || `Audit failed: ${script}`);
  return JSON.parse(result.stdout);
}

function item(name, count, samples = []) {
  return { name, count, samples: samples.slice(0, 8) };
}

function add(list, name, count, samples = []) {
  if (count > 0) list.push(item(name, count, samples));
}

function englishOnlyDuplicateGroups(groups = []) {
  const localePattern = /^(?:ar|es|fr|pt|ru)\//;
  return groups
    .map((group) => group.filter((file) => !localePattern.test(file)))
    .filter((group) => group.length > 1);
}

function newestMtime(directory, excluded = new Set()) {
  if (!fs.existsSync(directory)) return 0;
  let newest = fs.statSync(directory).mtimeMs;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && excluded.has(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    newest = Math.max(newest, entry.isDirectory() ? newestMtime(fullPath, excluded) : fs.statSync(fullPath).mtimeMs);
  }
  return newest;
}

const auditDirectory = path.join(projectRoot, ".codex", "skills", "01-website-audit", "scripts");
const site = runJson(path.join(auditDirectory, "audit-site.mjs"), scanRoot);
const structured = runJson(path.join(auditDirectory, "audit-structured-data.mjs"), scanRoot);

const criticalErrors = [];
const highPriority = [];
const mediumPriority = [];
const optionalIdeas = [];
const englishDuplicateTitleGroups = englishOnlyDuplicateGroups(site.metadata.duplicateTitleGroups);
const englishDuplicateDescriptionGroups = englishOnlyDuplicateGroups(site.metadata.duplicateDescriptionGroups);

add(criticalErrors, "Invalid JSON-LD", structured.invalid.blocks, structured.invalid.samples);
add(criticalErrors, "Missing canonical", site.metadata.missingCanonical, site.metadata.samples.missingCanonical);
add(criticalErrors, "English pages marked noindex", site.indexationPolicy.englishNoindex, site.indexationPolicy.samples.englishNoindex);
add(criticalErrors, "Locale pages missing noindex", site.indexationPolicy.multilingualMissingNoindex, site.indexationPolicy.samples.multilingualMissingNoindex);
add(criticalErrors, "Duplicate structured-data entities", structured.duplicate.nodes, structured.duplicate.samples);

add(highPriority, "Missing title", site.metadata.missingTitle, site.metadata.samples.missingTitle);
add(highPriority, "Broken internal references", site.references.broken, site.references.samples);
add(highPriority, "Missing meta description", site.metadata.missingDescription, site.metadata.samples.missingDescription);
add(highPriority, "Invalid H1 count", site.metadata.invalidH1Count, site.metadata.samples.invalidH1Count);
add(highPriority, "Product pages missing Product", structured.product.detailPagesMissingProduct, structured.product.missingSamples);
add(highPriority, "FAQ visible/schema mismatch", structured.faq.visibleContentMismatch, structured.faq.samples);
add(highPriority, "Images missing dimensions", site.images.missingDimensions, site.images.samples.missingDimensions);
add(highPriority, "Product pages missing quote CTA", site.contentGaps.productDetailsMissingQuoteCta, site.contentGaps.samples.productDetailsMissingQuoteCta);

add(mediumPriority, "English duplicate title groups", englishDuplicateTitleGroups.length, englishDuplicateTitleGroups);
add(mediumPriority, "English duplicate description groups", englishDuplicateDescriptionGroups.length, englishDuplicateDescriptionGroups);
add(mediumPriority, "Source images at least 500 KB; confirm deployed dist usage", site.images.filesAtLeast500Kb, site.images.largestFiles);
add(mediumPriority, "Blog articles missing product links", site.contentGaps.blogArticlesMissingProductLinks, site.contentGaps.samples.blogArticlesMissingProductLinks);
add(mediumPriority, "Product pages missing related guides", site.contentGaps.productDetailsMissingRelatedArticles, site.contentGaps.samples.productDetailsMissingRelatedArticles);

optionalIdeas.push({
  name: "Manual content and conversion review",
  note: "Thin content, factual freshness, internal-link opportunities, and form friction require intent-aware review; deterministic checks alone are insufficient.",
});

const distRoot = path.join(projectRoot, "dist");
const excluded = new Set([".agents", ".codex", ".git", "dist", "node_modules", "outputs", "work"]);
const latestSource = newestMtime(projectRoot, excluded);
const latestDist = newestMtime(distRoot);
const distExists = fs.existsSync(distRoot);

const report = {
  mode: "read-only",
  generatedAt: new Date().toISOString(),
  scanRoot,
  buildStatus: {
    executed: false,
    distExists,
    appearsStale: distExists ? latestSource > latestDist : true,
    note: "This helper never runs the build. Run an explicitly approved fresh build before a release decision.",
  },
  criticalErrors,
  highPriority,
  mediumPriority,
  optionalIdeas,
  summary: {
    htmlPages: site.summary.htmlPages,
    pagesByLocale: site.summary.pagesByLocale,
    brokenReferences: site.references.broken,
    invalidJsonLd: structured.invalid.blocks,
    duplicateSchemaNodes: structured.duplicate.nodes,
    missingCanonical: site.metadata.missingCanonical,
    englishNoindex: site.indexationPolicy.englishNoindex,
    localeMissingNoindex: site.indexationPolicy.multilingualMissingNoindex,
    imagesMissingDimensions: site.images.missingDimensions,
    oversizedImages: site.images.filesAtLeast500Kb,
    duplicateTitleGroups: englishDuplicateTitleGroups.length,
    duplicateDescriptionGroups: englishDuplicateDescriptionGroups.length,
    productPagesMissingGuides: site.contentGaps.productDetailsMissingRelatedArticles,
    productPagesMissingQuoteCta: site.contentGaps.productDetailsMissingQuoteCta,
    prohibitedOfferNodes: structured.prohibitedClaims.offerNodes,
    prohibitedReviewNodes: structured.prohibitedClaims.reviewNodes,
    prohibitedAggregateRatingNodes: structured.prohibitedClaims.aggregateRatingNodes,
  },
  manualReviewsRequired: [
    "Sitemap consistency against an approved fresh dist build",
    "Thin or obsolete content and factual freshness",
    "Contextual internal-link opportunities and cannibalization",
    "WhatsApp, form, and conversion behavior in preview",
    "GSC trends, queries, pages, countries, devices, and indexation evidence",
    "GEO citation observations in representative search and answer systems",
  ],
  deploymentRecommendation: "Hold. This was a read-only source audit; deployment and push require explicit approval after a fresh build and preview regression check.",
};

console.log(JSON.stringify(report, null, 2));
