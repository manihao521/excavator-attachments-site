import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const siteOrigin = "https://www.kratorattachments.com";
const manifest = JSON.parse(fs.readFileSync(path.join(projectRoot, "src", "data", "blog-posts.json"), "utf8"));
const blogIndex = fs.readFileSync(path.join(projectRoot, "blog", "index.html"), "utf8");
const sitemap = fs.readFileSync(path.join(projectRoot, "sitemap.xml"), "utf8");
const errors = [];

function decodeHtml(value = "") {
  const named = { amp: "&", apos: "'", gt: ">", lt: "<", mdash: "\u2014", nbsp: " ", ndash: "\u2013", quot: '"' };
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&([a-z]+);/gi, (match, name) => named[name.toLowerCase()] ?? match);
}

function visibleText(value = "") {
  return decodeHtml(value).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function assetFile(reference) {
  const pathname = reference.startsWith("http") ? new URL(reference).pathname : reference.split("?")[0];
  return path.join(projectRoot, decodeURIComponent(pathname).replace(/^\/+/, ""));
}

function region(source, start, end, label) {
  const startIndex = source.indexOf(start);
  const endIndex = source.indexOf(end);
  if (startIndex < 0 || endIndex < startIndex) {
    errors.push(`${label}: generated markers are missing`);
    return "";
  }
  return source.slice(startIndex + start.length, endIndex);
}

function duplicates(values) {
  const seen = new Set();
  const repeated = new Set();
  for (const value of values) seen.has(value) ? repeated.add(value) : seen.add(value);
  return [...repeated];
}

function difference(left, right) {
  const rightSet = new Set(right);
  return left.filter((value) => !rightSet.has(value));
}

const posts = Array.isArray(manifest.posts) ? manifest.posts : [];
const manifestSlugs = posts.map((post) => post.slug);
const manifestUrls = posts.map((post) => post.url);
for (const slug of duplicates(manifestSlugs)) errors.push(`duplicate slug: ${slug}`);
for (const url of duplicates(manifestUrls)) errors.push(`duplicate URL: ${url}`);

const articleSlugs = fs.readdirSync(path.join(projectRoot, "blog"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(projectRoot, "blog", entry.name, "index.html")))
  .map((entry) => entry.name)
  .sort();

for (const slug of difference(articleSlugs, manifestSlugs)) errors.push(`article HTML missing from manifest: ${slug}`);
for (const slug of difference(manifestSlugs, articleSlugs)) errors.push(`manifest article missing HTML: ${slug}`);

for (const post of posts) {
  const articleFile = path.join(projectRoot, "blog", post.slug, "index.html");
  if (!fs.existsSync(articleFile)) continue;
  const html = fs.readFileSync(articleFile, "utf8");
  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1] ?? "";
  const h1 = visibleText(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "");
  const description = decodeHtml(html.match(/<meta\b(?=[^>]*name=["']description["'])[^>]*content=["']([^"']*)["'][^>]*>/i)?.[1] ?? "");
  if (canonical !== post.url) errors.push(`${post.slug}: manifest URL differs from canonical`);
  if (h1 !== post.title) errors.push(`${post.slug}: manifest title differs from visible H1`);
  if (description !== post.metaDescription) errors.push(`${post.slug}: manifest description differs from source meta description`);
  for (const field of ["heroImage", "cardImage"]) {
    if (!post[field] || !fs.existsSync(assetFile(post[field]))) errors.push(`${post.slug}: invalid ${field} path ${post[field] || "(missing)"}`);
  }
  if (post.dateReviewRequired && post.publishDate) errors.push(`${post.slug}: dateReviewRequired conflicts with publishDate`);
  if (!post.publishDate && !post.dateReviewRequired) errors.push(`${post.slug}: missing publishDate is not marked for review`);
}

const listRegion = region(blogIndex, "<!-- BLOG_LIST_GENERATED_START -->", "<!-- BLOG_LIST_GENERATED_END -->", "blog list");
const cardMatches = [...listRegion.matchAll(/<article\b(?=[^>]*class=["'][^"']*\bblog-resource-card\b[^"']*["'])([^>]*)>([\s\S]*?)<\/article>/gi)];
const cards = cardMatches.map((match) => {
  const route = match[2].match(/href=["'](\/blog\/[^"']+\/)["']/i)?.[1] ?? "";
  const tags = match[1].match(/data-blog-category=["']([^"']*)["']/i)?.[1].split(/\s+/).filter(Boolean) ?? [];
  return { route, url: route ? `${siteOrigin}${route}` : "", tags };
});
for (const url of duplicates(cards.map((card) => card.url))) errors.push(`duplicate card: ${url}`);

const listedUrls = posts.filter((post) => post.listed).map((post) => post.url);
const cardUrls = cards.map((card) => card.url);
for (const url of difference(listedUrls, cardUrls)) errors.push(`article missing from blog listing: ${url}`);
for (const url of difference(cardUrls, manifestUrls)) errors.push(`blog card without manifest article: ${url}`);
for (const card of cards) {
  const slug = card.route.split("/").filter(Boolean).at(-1);
  if (!articleSlugs.includes(slug)) errors.push(`blog card without article HTML: ${card.route}`);
}

const filterRegion = region(blogIndex, "<!-- BLOG_FILTERS_GENERATED_START -->", "<!-- BLOG_FILTERS_GENERATED_END -->", "blog filters");
const filters = [...filterRegion.matchAll(/data-blog-filter=["']([^"']+)["']/gi)].map((match) => match[1]);
const nonAllFilters = filters.filter((filter) => filter !== "all");
const usedTags = [...new Set(cards.flatMap((card) => card.tags))];
for (const tag of difference(usedTags, nonAllFilters)) errors.push(`category without matching filter: ${tag}`);
for (const filter of difference(nonAllFilters, usedTags)) errors.push(`filter without matching category: ${filter}`);

const schemaRegion = region(blogIndex, "<!-- BLOG_COLLECTION_SCHEMA_START -->", "<!-- BLOG_COLLECTION_SCHEMA_END -->", "CollectionPage schema");
let collection = null;
try {
  const raw = schemaRegion.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i)?.[1] ?? "";
  collection = JSON.parse(raw.trim());
} catch (error) {
  errors.push(`CollectionPage JSON-LD is invalid: ${error.message}`);
}
const itemList = collection?.mainEntity?.itemListElement ?? [];
const itemUrls = itemList.map((entry) => entry?.item?.url).filter(Boolean);
if (collection?.mainEntity?.numberOfItems !== listedUrls.length) errors.push(`incorrect numberOfItems: ${collection?.mainEntity?.numberOfItems ?? "missing"}`);
for (const url of difference(listedUrls, itemUrls)) errors.push(`manifest listed article missing from ItemList: ${url}`);
for (const url of difference(itemUrls, listedUrls)) errors.push(`ItemList URL missing from listed manifest: ${url}`);
for (const url of duplicates(itemUrls)) errors.push(`duplicate ItemList URL: ${url}`);
const relatedLinks = Array.isArray(collection?.relatedLink) ? collection.relatedLink : [];
for (const url of difference(listedUrls, relatedLinks)) errors.push(`manifest listed article missing from CollectionPage relatedLink: ${url}`);

const sitemapUrls = [...sitemap.matchAll(/<loc>(https:\/\/www\.kratorattachments\.com\/blog\/[^<]+\/)<\/loc>/gi)]
  .map((match) => match[1])
  .filter((url) => url !== `${siteOrigin}/blog/`);
const manifestSitemapUrls = posts.filter((post) => post.sitemap).map((post) => post.url);
for (const url of difference(sitemapUrls, manifestSitemapUrls)) errors.push(`sitemap article missing from manifest: ${url}`);
for (const url of difference(manifestSitemapUrls, sitemapUrls)) errors.push(`manifest sitemap article missing from sitemap: ${url}`);
for (const url of duplicates(sitemapUrls)) errors.push(`duplicate sitemap blog URL: ${url}`);

const redirectsPath = path.join(projectRoot, "_redirects");
if (fs.existsSync(redirectsPath)) {
  const redirectSources = fs.readFileSync(redirectsPath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim().split(/\s+/)[0])
    .filter((route) => route?.startsWith("/blog/"))
    .map((route) => `${siteOrigin}${route}`);
  for (const url of sitemapUrls.filter((item) => redirectSources.includes(item))) errors.push(`redirect-source URL remains in sitemap: ${url}`);
}

const report = {
  htmlArticles: articleSlugs.length,
  manifestArticles: posts.length,
  listedManifestArticles: listedUrls.length,
  blogListingCards: cards.length,
  itemListEntries: itemUrls.length,
  collectionNumberOfItems: collection?.mainEntity?.numberOfItems ?? null,
  sitemapBlogArticles: sitemapUrls.length,
  filters: nonAllFilters,
  errors,
};

console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exitCode = 1;
