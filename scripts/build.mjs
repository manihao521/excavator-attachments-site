import { access, cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const outputDirectory = path.join(projectRoot, "dist");
const cssAssetVersion = "20260714-breaker-tool-images-1";
const jsAssetVersion = "20260703-product-specs-cache-bust";

for (const scriptName of ["generate-blog-listing.mjs", "audit-blog-parity.mjs"]) {
  const result = spawnSync(process.execPath, [path.join(scriptDirectory, scriptName)], {
    cwd: projectRoot,
    encoding: "utf8",
    stdio: "inherit",
  });
  if (result.status !== 0) {
    throw new Error(`Blog Phase 1 workflow failed: ${scriptName}`);
  }
}

const requiredFiles = [
  "index.html",
  "assets/styles.css",
  "assets/main.js",
  "assets/brand/krator-logo.png",
  "assets/images/hero-krator-hydraulic-breaker-factory.webp",
  "images/home-icons/raw/whatsapp-icon.webp",
  "images/home-icons/raw/factory-icon.webp",
  "images/home-icons/raw/globe-icon.webp",
  "images/home-icons/raw/excavator-icon.webp",
  "images/home-icons/raw/linkage-icon.webp",
  "images/matching-service/processed/excavator-line.webp",
  "images/matching-service/processed/expert-message.webp",
  "images/matching-service/processed/quick-coupler-main.webp",
  "images/matching-service/processed/step-1-whatsapp-icon.webp",
  "images/matching-service/processed/step-2-tonnage-icon.webp",
  "images/matching-service/processed/step-3-coupler-icon.webp",
  "images/matching-service/processed/step-4-quote-shipping-icon.webp",
  "images/matching-service/processed/arrow-right.png",
  "robots.txt",
  "sitemap.xml",
  "_redirects",
];

const deployEntries = [
  "index.html",
  "robots.txt",
  "sitemap.xml",
  "llms.txt",
  "_redirects",
  "assets",
  "images",
  "products",
  "applications",
  "quality-control",
  "blog",
  "contact",
  "about-us",
  "custom-service",
  "es",
  "pt",
  "fr",
  "ru",
  "ar",
];

const optionalDeployEntries = [
  "_headers",
  "favicon.ico",
  "favicon-32x32.png",
  "favicon-48x48.png",
  "apple-touch-icon.png",
  "site.webmanifest",
];

const excludedOutputEntries = [
  "products/quick-hitch",
  "products/hydraulic-pile-hammer",
  "products/vibro-hammers",
];

const missingFiles = [];

for (const relativePath of requiredFiles) {
  try {
    await access(path.join(projectRoot, relativePath));
  } catch {
    missingFiles.push(relativePath);
  }
}

if (missingFiles.length > 0) {
  throw new Error("Missing required static files:\n- " + missingFiles.join("\n- "));
}

const homepage = await readFile(path.join(projectRoot, "index.html"), "utf8");
const requiredHomepageMarkers = [
  'class="site-header homepage-header"',
  "<span>Excavator Attachments</span><span>Manufacturer in China</span>",
  'class="v1-hero__title-line"',
  'class="v1-hero__proof"',
  'class="v1-hero__actions"',
  'class="header-whatsapp-link"',
  'class="language-links__icon"',
  "/images/matching-service/processed/quick-coupler-main.webp",
  "/images/matching-service/processed/step-1-whatsapp-icon.webp",
  'class="v1-match-icon-wrap"',
  'class="v1-service-benefits"',
];

const missingMarkers = requiredHomepageMarkers.filter(
  (marker) => !homepage.includes(marker),
);

if (missingMarkers.length > 0) {
  throw new Error("Homepage structure check failed:\n- " + missingMarkers.join("\n- "));
}

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

for (const entry of [...deployEntries, ...optionalDeployEntries]) {
  const source = path.join(projectRoot, entry);
  if (!fs.existsSync(source)) continue;
  const destination = path.join(outputDirectory, entry);
  await cp(source, destination, { recursive: true });
}

for (const entry of excludedOutputEntries) {
  await rm(path.join(outputDirectory, entry), { recursive: true, force: true });
}


const htmlFiles = [];
const collectHtmlFiles = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      collectHtmlFiles(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      htmlFiles.push(fullPath);
    }
  }
};

collectHtmlFiles(outputDirectory);
for (const htmlFile of htmlFiles) {
  const html = await readFile(htmlFile, "utf8");
  const normalizedRouteHtml = html.replace(
    /(https:\/\/www\.kratorattachments\.com)?\/(ar|es|fr|pt|ru)\/products\/quick-coupler\//g,
    "$1/$2/products/quick-hitch/",
  );
  const versionedHtml = normalizedRouteHtml.replace(
    /href="\/assets\/styles\.css(?:\?v=[^"]*)?"/g,
    `href="/assets/styles.css?v=${cssAssetVersion}"`,
  ).replace(
    /src="\/assets\/main\.js(?:\?v=[^"]*)?"/g,
    `src="/assets/main.js?v=${jsAssetVersion}"`,
  );
  if (versionedHtml !== html) {
    await writeFile(htmlFile, versionedHtml, "utf8");
  }
}
const cssOutput = path.join(outputDirectory, "assets/styles.css");
if (fs.existsSync(cssOutput)) {
  const css = await readFile(cssOutput, "utf8");
  const minifiedCss = css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
  await writeFile(cssOutput, minifiedCss, "utf8");
}

const deployedTextFiles = [];
const collectTextFiles = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) collectTextFiles(fullPath);
    else if (/\.(?:css|html|js|json|txt|xml)$/i.test(entry.name)) deployedTextFiles.push(fullPath);
  }
};
collectTextFiles(outputDirectory);
const deployedText = (await Promise.all(deployedTextFiles.map((file) => readFile(file, "utf8")))).join("\n");
const unusedImages = [];
const collectUnusedImages = (directory) => {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      collectUnusedImages(fullPath);
      continue;
    }
    if (!/\.(?:avif|gif|jpe?g|png|webp)$/i.test(entry.name)) continue;
    const rawName = path.basename(fullPath);
    if (!deployedText.includes(rawName) && !deployedText.includes(encodeURIComponent(rawName))) {
      unusedImages.push(fullPath);
    }
  }
};
collectUnusedImages(path.join(outputDirectory, "assets"));
collectUnusedImages(path.join(outputDirectory, "images"));
const prunedBytes = unusedImages.reduce((total, file) => total + fs.statSync(file).size, 0);
await Promise.all(unusedImages.map((file) => rm(file, { force: true })));

console.log(`Static build check passed (${requiredFiles.length} files verified).`);
console.log(`Deployment output prepared: dist/ (${deployEntries.length} required entries copied).`);
console.log(`Removed ${unusedImages.length} unreferenced raster assets from dist/ (${(prunedBytes / 1024 / 1024).toFixed(1)} MB).`);




