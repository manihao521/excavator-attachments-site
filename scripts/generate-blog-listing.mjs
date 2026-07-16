import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const manifestPath = path.join(projectRoot, "src", "data", "blog-posts.json");
const blogIndexPath = path.join(projectRoot, "blog", "index.html");
const sitemapPath = path.join(projectRoot, "sitemap.xml");
const siteOrigin = "https://www.kratorattachments.com";

const markers = {
  schema: ["<!-- BLOG_COLLECTION_SCHEMA_START -->", "<!-- BLOG_COLLECTION_SCHEMA_END -->"],
  filters: ["<!-- BLOG_FILTERS_GENERATED_START -->", "<!-- BLOG_FILTERS_GENERATED_END -->"],
  featured: ["<!-- BLOG_FEATURED_GENERATED_START -->", "<!-- BLOG_FEATURED_GENERATED_END -->"],
  list: ["<!-- BLOG_LIST_GENERATED_START -->", "<!-- BLOG_LIST_GENERATED_END -->"],
  sitemap: ["<!-- BLOG_SITEMAP_GENERATED_START -->", "<!-- BLOG_SITEMAP_GENERATED_END -->"],
};

const filterLabels = new Map([
  ["hydraulic-breakers", "Hydraulic Breakers"],
  ["quick-couplers", "Quick Couplers"],
  ["pile-hammers", "Pile Hammers"],
  ["demolition-tools", "Demolition Tools"],
  ["grapples", "Grapples"],
  ["buckets", "Buckets"],
  ["maintenance", "Maintenance"],
  ["buying-guides", "Buying Guides"],
]);

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function routeFromUrl(url) {
  const parsed = new URL(url);
  if (parsed.origin !== siteOrigin) throw new Error(`Manifest URL uses an unexpected origin: ${url}`);
  return parsed.pathname;
}

function assetFile(reference) {
  const pathname = reference.startsWith("http") ? new URL(reference).pathname : reference.split("?")[0];
  return path.join(projectRoot, decodeURIComponent(pathname).replace(/^\/+/, ""));
}

function loadManifest() {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  if (manifest.version !== 1 || !Array.isArray(manifest.posts)) throw new Error("Unsupported blog manifest format");
  const slugs = new Set();
  const urls = new Set();
  const orders = new Set();
  for (const post of manifest.posts) {
    const requiredStrings = ["id", "slug", "url", "title", "metaDescription", "excerpt", "author", "category", "heroImage", "cardImage", "imageAlt", "sitemapChangefreq"];
    for (const field of requiredStrings) {
      if (typeof post[field] !== "string" || !post[field].trim()) throw new Error(`${post.slug || "unknown"}: missing ${field}`);
    }
    if (post.id !== post.slug) throw new Error(`${post.slug}: id must equal slug`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) throw new Error(`${post.slug}: invalid slug`);
    if (slugs.has(post.slug)) throw new Error(`${post.slug}: duplicate slug`);
    if (urls.has(post.url)) throw new Error(`${post.url}: duplicate URL`);
    if (!Number.isInteger(post.listingOrder) || post.listingOrder < 1 || orders.has(post.listingOrder)) throw new Error(`${post.slug}: invalid or duplicate listingOrder`);
    if (!Array.isArray(post.filterTags) || post.filterTags.length === 0) throw new Error(`${post.slug}: filterTags must not be empty`);
    if (!Array.isArray(post.relatedArticleIds) || !Array.isArray(post.relatedProductUrls)) throw new Error(`${post.slug}: related link fields must be arrays`);
    if (typeof post.listed !== "boolean" || typeof post.featured !== "boolean" || typeof post.sitemap !== "boolean") throw new Error(`${post.slug}: invalid status flags`);
    if (!Number.isInteger(post.cardImageWidth) || !Number.isInteger(post.cardImageHeight)) throw new Error(`${post.slug}: card image dimensions are required`);
    const expectedUrl = `${siteOrigin}/blog/${post.slug}/`;
    if (post.url !== expectedUrl) throw new Error(`${post.slug}: URL must be ${expectedUrl}`);
    const articleFile = path.join(projectRoot, "blog", post.slug, "index.html");
    if (!fs.existsSync(articleFile)) throw new Error(`${post.slug}: article HTML does not exist`);
    if (!fs.existsSync(assetFile(post.cardImage))) throw new Error(`${post.slug}: card image does not exist: ${post.cardImage}`);
    for (const tag of post.filterTags) {
      if (!filterLabels.has(tag)) throw new Error(`${post.slug}: unsupported filter tag ${tag}`);
    }
    slugs.add(post.slug);
    urls.add(post.url);
    orders.add(post.listingOrder);
  }
  for (const post of manifest.posts) {
    for (const id of post.relatedArticleIds) {
      if (!slugs.has(id)) throw new Error(`${post.slug}: related article does not exist: ${id}`);
    }
  }
  return manifest;
}

function generatedRegion([start, end], content, eol) {
  return `${start}${eol}${content}${eol}${end}`;
}

function replaceMarkedRegion(source, markerPair, content, eol) {
  const [start, end] = markerPair;
  const startIndex = source.indexOf(start);
  const endIndex = source.indexOf(end);
  if (startIndex < 0 || endIndex < startIndex) return null;
  return source.slice(0, startIndex) + generatedRegion(markerPair, content, eol) + source.slice(endIndex + end.length);
}

function replaceSlice(source, start, end, replacement) {
  if (start < 0 || end <= start) throw new Error("Unable to locate initial generated region");
  return source.slice(0, start) + replacement + source.slice(end);
}

function renderCollectionSchema(posts) {
  const canonical = `${siteOrigin}/blog/`;
  const value = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Excavator Attachment Resource Center",
    description: "Buying guides and technical tips for selecting excavator attachments.",
    url: canonical,
    publisher: { "@id": `${siteOrigin}/#organization` },
    "@id": `${canonical}#webpage`,
    inLanguage: "en",
    isPartOf: { "@id": `${siteOrigin}/#website` },
    about: { "@id": `${siteOrigin}/#organization` },
    relatedLink: posts.map((post) => post.url),
    mainEntity: {
      "@type": "ItemList",
      "@id": `${canonical}#articles`,
      name: "KRATOR Excavator Attachment Guides",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "BlogPosting",
          "@id": `${post.url}#article`,
          url: post.url,
          headline: post.title,
        },
      })),
    },
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
  };
  return `  <script type="application/ld+json">\n${JSON.stringify(value, null, 2)}\n  </script>`;
}

function renderFilters(posts, eol) {
  const used = new Set(posts.flatMap((post) => post.filterTags));
  const buttons = [
    '    <button class="is-active" type="button" data-blog-filter="all" aria-pressed="true">All</button>',
    ...[...filterLabels].filter(([tag]) => used.has(tag)).map(([tag, label]) => `    <button type="button" data-blog-filter="${tag}" aria-pressed="false">${escapeHtml(label)}</button>`),
  ];
  return [`  <nav class="blog-category-filter" aria-label="Resource categories">`, ...buttons, "  </nav>"].join(eol);
}

function renderFeatured(post, seriesCount, eol) {
  const route = routeFromUrl(post.url);
  return [
    '  <section class="blog-featured-guide" data-featured-guide>',
    '    <div class="blog-featured-copy">',
    '      <span class="blog-card-category">Featured Guide</span>',
    `      <h2>${escapeHtml(post.title)}</h2>`,
    `      <p>${escapeHtml(post.excerpt)}</p>`,
    '      <div class="featured-guide-footer">',
    '        <div class="featured-guide-meta">',
    `          <span>${seriesCount}-guide series</span>`,
    '          <i aria-hidden="true"></i>',
    `          <span>${escapeHtml(post.category)}</span>`,
    '        </div>',
    `        <a class="featured-guide-button" href="${route}">Read Guide <span aria-hidden="true">&rarr;</span></a>`,
    '      </div>',
    '    </div>',
    '  </section>',
  ].join(eol);
}

function renderCard(post, eol) {
  const route = routeFromUrl(post.url);
  const readingTime = post.readingTime ? `<small>${escapeHtml(post.readingTime)}</small>` : "";
  return [
    `      <article class="blog-resource-card" data-blog-category="${post.filterTags.join(" ")}">`,
    `        <a href="${route}" class="blog-card-image"><img src="${escapeHtml(post.cardImage)}" alt="${escapeHtml(post.imageAlt)}" width="${post.cardImageWidth}" height="${post.cardImageHeight}" decoding="async" loading="lazy"></a>`,
    `        <div class="blog-card-body"><span class="blog-card-category">${escapeHtml(post.category)}</span><h3><a href="${route}">${escapeHtml(post.title)}</a></h3><p>${escapeHtml(post.excerpt)}</p><div class="blog-card-footer">${readingTime}<a href="${route}" aria-label="Read guide: ${escapeHtml(post.title)}">Read Guide <span>&rarr;</span></a></div></div>`,
    '      </article>',
  ].join(eol);
}

function renderListing(posts, eol) {
  const demolition = posts.filter((post) => post.listingSection === "demolition");
  const guides = posts.filter((post) => post.listingSection !== "demolition");
  return [
    '  <section class="blog-articles-section blog-demolition-guides" id="featured-demolition-guides">',
    '    <div class="blog-section-head">',
    '      <p class="eyebrow">DEMOLITION RESOURCE CENTER</p>',
    '      <h2>Featured Demolition Guides</h2>',
    '      <p>A focused 4-guide set for demolition contractors and dealers: choose the right attachment mix, compare pulverizer vs shear use cases, check concrete pulverizer buying data and prepare fast quote information.</p>',
    '    </div>',
    '    <div class="blog-resource-grid">',
    demolition.map((post) => renderCard(post, eol)).join(eol),
    '    </div>',
    '  </section>',
    '  <section class="blog-articles-section" id="buying-guides">',
    '    <div class="blog-section-head">',
    '      <p class="eyebrow">TECHNICAL ARTICLES</p>',
    '      <h2>Buying Guides &amp; Selection Tips</h2>',
    '      <p>Practical resources for dealers, contractors and rental fleets choosing excavator attachments for real working conditions.</p>',
    '    </div>',
    '    <div class="blog-resource-grid">',
    guides.map((post) => renderCard(post, eol)).join(eol),
    '    </div>',
    '  </section>',
  ].join(eol);
}

function updateBlogIndex(posts) {
  const original = fs.readFileSync(blogIndexPath, "utf8");
  const eol = original.includes("\r\n") ? "\r\n" : "\n";
  let html = original;

  const schema = renderCollectionSchema(posts).replaceAll("\n", eol);
  const markedSchema = replaceMarkedRegion(html, markers.schema, schema, eol);
  if (markedSchema !== null) {
    html = markedSchema;
  } else {
    const blocks = [...html.matchAll(/^[\t ]*<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>[\t ]*(?:\r?\n)?/gim)];
    const block = blocks.find((match) => /"@type"\s*:\s*"CollectionPage"/.test(match[0]));
    if (!block) throw new Error("blog/index.html: CollectionPage schema not found");
    html = replaceSlice(html, block.index, block.index + block[0].length, `${generatedRegion(markers.schema, schema, eol)}${eol}`);
  }

  const filters = renderFilters(posts, eol);
  const markedFilters = replaceMarkedRegion(html, markers.filters, filters, eol);
  if (markedFilters !== null) {
    html = markedFilters;
  } else {
    const match = html.match(/^[\t ]*<nav\b(?=[^>]*class=["'][^"']*\bblog-category-filter\b[^"']*["'])[^>]*>[\s\S]*?<\/nav>[\t ]*(?:\r?\n)?/im);
    if (!match) throw new Error("blog/index.html: category filter not found");
    html = replaceSlice(html, match.index, match.index + match[0].length, `${generatedRegion(markers.filters, filters, eol)}${eol}${eol}`);
  }

  const featuredPosts = posts.filter((post) => post.featured);
  if (featuredPosts.length !== 1) throw new Error(`Expected one featured post, found ${featuredPosts.length}`);
  const featured = renderFeatured(featuredPosts[0], posts.filter((post) => post.listingSection === "demolition").length, eol);
  const markedFeatured = replaceMarkedRegion(html, markers.featured, featured, eol);
  if (markedFeatured !== null) {
    html = markedFeatured;
  } else {
    const match = html.match(/^[\t ]*<section\b(?=[^>]*class=["'][^"']*\bblog-featured-guide\b[^"']*["'])[^>]*>[\s\S]*?<\/section>[\t ]*(?:\r?\n)?/im);
    if (!match) throw new Error("blog/index.html: featured guide not found");
    html = replaceSlice(html, match.index, match.index + match[0].length, `${generatedRegion(markers.featured, featured, eol)}${eol}${eol}`);
  }

  const listing = renderListing(posts, eol);
  const markedList = replaceMarkedRegion(html, markers.list, listing, eol);
  if (markedList !== null) {
    html = markedList;
  } else {
    const start = html.indexOf('<section class="blog-articles-section blog-demolition-guides"');
    const end = html.indexOf('<section class="blog-tools-section">', start);
    html = replaceSlice(html, start, end, `${generatedRegion(markers.list, listing, eol)}${eol}${eol}  `);
  }

  if (html !== original) fs.writeFileSync(blogIndexPath, html, "utf8");
  return html !== original;
}

function sitemapEntry(post, eol) {
  const lines = ["  <url>", `    <loc>${post.url}</loc>`];
  if (post.modifiedDate) lines.push(`    <lastmod>${post.modifiedDate}</lastmod>`);
  lines.push(`    <changefreq>${post.sitemapChangefreq}</changefreq>`);
  lines.push(`    <priority>${Number(post.sitemapPriority).toFixed(2)}</priority>`);
  lines.push("  </url>");
  return lines.join(eol);
}

function updateSitemap(posts) {
  const original = fs.readFileSync(sitemapPath, "utf8");
  const eol = original.includes("\r\n") ? "\r\n" : "\n";
  const content = posts.map((post) => sitemapEntry(post, eol)).join(eol);
  const marked = replaceMarkedRegion(original, markers.sitemap, content, eol);
  let xml;
  if (marked !== null) {
    xml = marked;
  } else {
    const blocks = [...original.matchAll(/^[\t ]*<url>\s*[\s\S]*?<\/url>[\t ]*(?:\r?\n)?/gim)];
    const articleBlocks = blocks.filter((match) => /<loc>https:\/\/www\.kratorattachments\.com\/blog\/[^/<]+\/<\/loc>/i.test(match[0]));
    if (articleBlocks.length === 0) throw new Error("sitemap.xml: no English blog article entries found");
    const first = articleBlocks[0];
    const last = articleBlocks.at(-1);
    const between = original.slice(first.index, last.index + last[0].length);
    const allBetween = [...between.matchAll(/<url>\s*[\s\S]*?<\/url>/gi)];
    if (allBetween.length !== articleBlocks.length) throw new Error("sitemap.xml: blog entries are not contiguous");
    xml = replaceSlice(original, first.index, last.index + last[0].length, `${generatedRegion(markers.sitemap, content, eol)}${eol}`);
  }
  if (xml !== original) fs.writeFileSync(sitemapPath, xml, "utf8");
  return xml !== original;
}

const manifest = loadManifest();
const listedPosts = manifest.posts.filter((post) => post.listed).sort((a, b) => a.listingOrder - b.listingOrder);
const sitemapPosts = manifest.posts.filter((post) => post.sitemap);
const blogChanged = updateBlogIndex(listedPosts);
const sitemapChanged = updateSitemap(sitemapPosts);

console.log(JSON.stringify({
  manifestArticles: manifest.posts.length,
  listedArticles: listedPosts.length,
  sitemapArticles: sitemapPosts.length,
  blogIndexChanged: blogChanged,
  sitemapChanged,
}, null, 2));
