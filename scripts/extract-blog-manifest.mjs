import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const blogDirectory = path.join(projectRoot, "blog");
const blogIndexPath = path.join(blogDirectory, "index.html");
const sitemapPath = path.join(projectRoot, "sitemap.xml");
const siteOrigin = "https://www.kratorattachments.com";

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

function topLevelNodes(value) {
  if (Array.isArray(value)) return value.flatMap(topLevelNodes);
  if (!value || typeof value !== "object") return [];
  if (Array.isArray(value["@graph"])) return value["@graph"].flatMap(topLevelNodes);
  return [value];
}

function typesOf(node) {
  const type = node?.["@type"];
  return Array.isArray(type) ? type : typeof type === "string" ? [type] : [];
}

function schemaNodes(html, file) {
  const nodes = [];
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      nodes.push(...topLevelNodes(JSON.parse(match[1].trim())));
    } catch (error) {
      throw new Error(`${path.relative(projectRoot, file)}: invalid JSON-LD: ${error.message}`);
    }
  }
  return nodes;
}

function attribute(tag, name) {
  return decodeHtml(tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i"))?.[1] ?? "");
}

function classBlock(html, className, tagName = "div") {
  const pattern = new RegExp(`<${tagName}\\b(?=[^>]*class=["'][^"']*\\b${className}\\b[^"']*["'])[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i");
  return html.match(pattern)?.[1] ?? "";
}

function canonicalFrom(html) {
  return html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1] ?? "";
}

function metaDescriptionFrom(html) {
  return decodeHtml(html.match(/<meta\b(?=[^>]*name=["']description["'])[^>]*content=["']([^"']*)["'][^>]*>/i)?.[1] ?? "");
}

function firstHeroImage(html) {
  const hero = html.match(/<figure\b(?=[^>]*class=["'][^"']*\bblog-article-hero-media\b[^"']*["'])[^>]*>([\s\S]*?)<\/figure>/i)?.[1] ?? "";
  const tag = hero.match(/<img\b[^>]*>/i)?.[0] ?? "";
  return {
    src: attribute(tag, "src"),
    alt: attribute(tag, "alt"),
    width: Number.parseInt(attribute(tag, "width"), 10) || null,
    height: Number.parseInt(attribute(tag, "height"), 10) || null,
  };
}

function visibleExcerpt(html, fallback) {
  const heroCopy = classBlock(html, "blog-article-hero-copy");
  const paragraphs = [...heroCopy.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((match) => visibleText(match[1]))
    .filter(Boolean)
    .filter((text) => !/^(RESOURCE CENTER|[A-Z][A-Z\s/&-]+)$/.test(text));
  return paragraphs[0] || fallback;
}

function readingTimeFrom(html) {
  const meta = classBlock(html, "blog-article-meta");
  const values = [...meta.matchAll(/<span\b[^>]*>([\s\S]*?)<\/span>/gi)].map((match) => visibleText(match[1]));
  return values.find((value) => /^\d+\s+min\s+read$/i.test(value)) ?? null;
}

function internalLinks(html, pattern) {
  const links = [];
  for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)) {
    const href = match[1].split("#")[0];
    if (pattern.test(href) && !links.includes(href)) links.push(href);
  }
  return links;
}

function mainHtml(html) {
  return html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html;
}

function currentListingRecords(html) {
  const records = new Map();
  for (const match of html.matchAll(/<article\b(?=[^>]*class=["'][^"']*\bblog-resource-card\b[^"']*["'])([^>]*)>([\s\S]*?)<\/article>/gi)) {
    const attributes = match[1];
    const body = match[2];
    const href = body.match(/href=["'](\/blog\/[^"']+\/)["']/i)?.[1];
    if (!href) continue;
    const slug = href.split("/").filter(Boolean).at(-1);
    const imageTag = body.match(/<img\b[^>]*>/i)?.[0] ?? "";
    const category = visibleText(classBlock(body, "blog-card-category", "span"));
    const excerpt = visibleText(body.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i)?.[1] ?? "");
    const readingTime = visibleText(body.match(/<small\b[^>]*>([\s\S]*?)<\/small>/i)?.[1] ?? "");
    records.set(slug, {
      category,
      excerpt,
      filterTags: attribute(`<article ${attributes}>`, "data-blog-category").split(/\s+/).filter(Boolean),
      cardImage: attribute(imageTag, "src"),
      imageAlt: attribute(imageTag, "alt"),
      cardImageWidth: Number.parseInt(attribute(imageTag, "width"), 10) || null,
      cardImageHeight: Number.parseInt(attribute(imageTag, "height"), 10) || null,
      readingTime: /^\d+\s+min\s+read$/i.test(readingTime) ? readingTime : null,
      listed: true,
      listingSection: match.index < html.indexOf('id="buying-guides"') ? "demolition" : "guides",
    });
  }

  const linkedSlugs = new Set(
    [...html.matchAll(/href=["']\/blog\/([^/"']+)\/["']/gi)].map((match) => match[1]),
  );
  const featuredSlug = html.match(/<section\b(?=[^>]*data-featured-guide)[\s\S]*?href=["']\/blog\/([^/"']+)\//i)?.[1] ?? "";
  return { records, linkedSlugs, featuredSlug };
}

function sitemapRecords(xml) {
  const records = new Map();
  for (const match of xml.matchAll(/<url>\s*([\s\S]*?)<\/url>/gi)) {
    const body = match[1];
    const url = body.match(/<loc>([^<]+)<\/loc>/i)?.[1]?.trim() ?? "";
    const slug = url.match(/^https:\/\/www\.kratorattachments\.com\/blog\/([^/]+)\/$/i)?.[1];
    if (!slug) continue;
    records.set(slug, {
      sitemap: true,
      modifiedDate: body.match(/<lastmod>([^<]+)<\/lastmod>/i)?.[1]?.trim() ?? null,
      sitemapChangefreq: body.match(/<changefreq>([^<]+)<\/changefreq>/i)?.[1]?.trim() ?? null,
      sitemapPriority: Number.parseFloat(body.match(/<priority>([^<]+)<\/priority>/i)?.[1] ?? ""),
    });
  }
  return records;
}

const blogIndex = fs.readFileSync(blogIndexPath, "utf8");
const sitemap = fs.readFileSync(sitemapPath, "utf8");
const listing = currentListingRecords(blogIndex);
const sitemapBySlug = sitemapRecords(sitemap);
const posts = [];

for (const entry of fs.readdirSync(blogDirectory, { withFileTypes: true }).filter((item) => item.isDirectory()).sort((a, b) => a.name.localeCompare(b.name))) {
  const slug = entry.name;
  const file = path.join(blogDirectory, slug, "index.html");
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, "utf8");
  const nodes = schemaNodes(html, file);
  const article = nodes.find((node) => typesOf(node).includes("BlogPosting")) ?? {};
  const canonical = canonicalFrom(html);
  const expectedCanonical = `${siteOrigin}/blog/${slug}/`;
  if (canonical !== expectedCanonical) throw new Error(`${slug}: canonical does not match route`);

  const hero = firstHeroImage(html);
  const listed = listing.records.get(slug) ?? {};
  const sitemapRecord = sitemapBySlug.get(slug) ?? {};
  const title = visibleText(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || article.headline || "");
  const metaDescription = metaDescriptionFrom(html);
  const publishDate = article.datePublished ?? null;
  const modifiedDate = article.dateModified ?? sitemapRecord.modifiedDate ?? null;
  const imageValue = typeof article.image === "string" ? article.image : article.image?.url || article.image?.contentUrl || "";
  const articleImage = imageValue.startsWith(siteOrigin) ? imageValue.slice(siteOrigin.length) : imageValue;
  const articleMain = mainHtml(html);
  const relatedArticleIds = internalLinks(articleMain, /^\/blog\/[^/]+\/$/i)
    .map((href) => href.split("/").filter(Boolean).at(-1))
    .filter((id) => id !== slug);

  posts.push({
    id: slug,
    slug,
    url: canonical,
    title,
    metaDescription,
    excerpt: listed.excerpt || visibleExcerpt(html, metaDescription),
    publishDate,
    modifiedDate,
    dateReviewRequired: !publishDate,
    author: article.author?.name || article.author?.["@id"] || null,
    category: listed.category || article.articleSection || visibleText(classBlock(html, "blog-article-kicker", "span")) || null,
    filterTags: listed.filterTags || [],
    heroImage: hero.src || articleImage,
    cardImage: listed.cardImage || hero.src || articleImage,
    imageAlt: listed.imageAlt || hero.alt || title,
    cardImageWidth: listed.cardImageWidth || hero.width,
    cardImageHeight: listed.cardImageHeight || hero.height,
    readingTime: listed.readingTime || readingTimeFrom(html),
    listed: listing.linkedSlugs.has(slug),
    featured: listing.featuredSlug === slug,
    listingSection: listed.listingSection || "guides",
    sitemap: sitemapRecord.sitemap ?? false,
    sitemapPriority: Number.isFinite(sitemapRecord.sitemapPriority) ? sitemapRecord.sitemapPriority : null,
    sitemapChangefreq: sitemapRecord.sitemapChangefreq ?? null,
    relatedArticleIds,
    relatedProductUrls: internalLinks(articleMain, /^\/products\/.+\/$/i),
  });
}

process.stdout.write(`${JSON.stringify({ version: 1, posts }, null, 2)}\n`);
