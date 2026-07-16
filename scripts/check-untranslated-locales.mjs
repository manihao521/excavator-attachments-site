import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const localeDirs = ["es", "pt", "fr", "ru", "ar"];

const blockedPhrases = [
  "Request a Quote",
  "Get Quote",
  "Get Quote in 24 Hours",
  "Send Machine Info",
  "Send Quote Request",
  "Product Features",
  "Technical Specifications",
  "Related Products",
  "View Product",
  "View Details",
  "Read More",
  "Read Guide",
  "Product Center",
  "Resource Center",
  "Featured Guide",
  "Buying Guide",
  "Buyer Tools & Checklists",
  "Quick Answer",
  "Key Selection Factors",
  "Key Measurement Factors",
  "Common Mistakes",
  "What Information to Send for Quote",
  "Related Products for This Guide",
  "FAQ About This Topic",
  "Quote Checklist",
  "Related Categories",
  "Previous Guide",
  "Next Guide",
  "On This Page",
  "Matching Support",
  "Fast Matching Request",
  "Factory Strength",
  "Factory Strength Behind Every Attachment",
  "Core Manufacturing Capability",
  "Production Flow",
  "Quality Control",
  "Factory & Quality Gallery",
  "Contact KRATOR",
  "Why Buyers Contact KRATOR",
  "Need Help",
  "Need Help Choosing the Right Attachment",
  "Get a Fast Excavator Attachment Quote",
  "Name",
  "Country",
  "Company Name",
  "WhatsApp / Phone",
  "Excavator Brand & Model",
  "Excavator Tonnage",
  "Target Attachment",
  "Working Condition",
  "Quantity",
  "Upload Drawing / Photos",
  "What to Send for Faster Quotation",
  "Complete Excavator Attachment Range",
  "Product Subtypes",
  "Featured Product Types",
  "Core Product Categories",
  "Excavator Attachments Product Center",
  "WhatsApp Us",
  "Send on WhatsApp",
  "Get Matching Attachment Quote",
  "Factory Direct Supply",
  "Global Support",
  "Fits 1-90 Ton Excavators",
  "Fits 1&ndash;90 Ton Excavators",
  "Contact support highlights",
  "OEM Bracket & Pin Size Available",
  "Fits 1-90 Ton Excavators",
];

const allowedWholeText = new Set([
  "KRATOR",
  "KRATOR ATTACHMENTS",
  "WhatsApp",
  "Email",
  "OEM",
  "ODM",
  "FAQ",
  "FOB",
  "CIF",
  "ISO",
  "CE",
]);

const allowedPattern =
  /^(?:KRATOR|WhatsApp|Email|OEM|ODM|FAQ|FOB|CIF|ISO|CE|[A-Z]{1,5}\d{2,}[A-Z0-9-]*|\+?\d[\d\s().-]+|[\d\s+–-.,/()%degree]+|.*\b(?:kg|mm|bar|L\/min|ton|Ton|MPa|kN|rpm)\b.*)$/;

function walkHtmlFiles(directory) {
  const files = [];
  if (!fs.existsSync(directory)) return files;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkHtmlFiles(fullPath));
    if (entry.isFile() && entry.name.endsWith(".html")) files.push(fullPath);
  }
  return files;
}

function decodeEntities(value) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&ndash;/g, "–")
    .replace(/&rarr;/g, "→")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function collectVisibleText(html) {
  const chunks = [];
  const title = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (title) chunks.push(title[1]);
  for (const match of html.matchAll(/<meta\s+(?:name|property)="(?:description|og:title|og:description)"\s+content="([^"]*)"/gi)) {
    chunks.push(match[1]);
  }
  for (const match of html.matchAll(/\s(?:placeholder|aria-label|alt|title)="([^"]*)"/gi)) {
    chunks.push(match[1]);
  }
  for (const match of html.matchAll(/<script\b([^>]*type=["']application\/ld\+json["'][^>]*)>([\s\S]*?)<\/script>/gi)) {
    try {
      const json = JSON.parse(match[2].trim());
      collectJsonStrings(json, chunks);
    } catch {
      // Ignore malformed JSON-LD. The build step validates page output separately.
    }
  }

  const body = (html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i) || ["", html])[1];
  const bodyText = body
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .split(/<[^>]+>/g)
    .join(" ");
  chunks.push(bodyText);
  return decodeEntities(chunks.join(" ")).replace(/\s+/g, " ");
}

function collectJsonStrings(value, chunks, key = "") {
  if (Array.isArray(value)) {
    for (const item of value) collectJsonStrings(item, chunks, key);
    return;
  }
  if (value && typeof value === "object") {
    for (const [childKey, childValue] of Object.entries(value)) collectJsonStrings(childValue, chunks, childKey);
    return;
  }
  if (typeof value !== "string") return;
  if (key.startsWith("@") || ["url", "image", "logo", "sameAs", "email", "telephone", "sku", "mpn", "model", "identifier"].includes(key)) return;
  chunks.push(value);
}

function isAllowedPhrase(phrase) {
  return allowedWholeText.has(phrase) || allowedPattern.test(phrase);
}

function containsBlockedPhrase(text, phrase) {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const prefix = /^[A-Za-z]/.test(phrase) ? "(^|[^A-Za-z])" : "";
  const suffix = /[A-Za-z]$/.test(phrase) ? "($|[^A-Za-z])" : "";
  return new RegExp(`${prefix}${escaped}${suffix}`).test(text);
}

function scanFile(filePath) {
  const html = fs.readFileSync(filePath, "utf8");
  const text = collectVisibleText(html);
  const hits = [];
  for (const phrase of blockedPhrases) {
    if (isAllowedPhrase(phrase)) continue;
    if (containsBlockedPhrase(text, phrase)) hits.push(phrase);
  }
  return hits;
}

const report = {};
for (const locale of localeDirs) {
  const localeRoot = path.join(projectRoot, locale);
  const localeHits = [];
  for (const file of walkHtmlFiles(localeRoot)) {
    const hits = scanFile(file);
    if (!hits.length) continue;
    localeHits.push({
      file: path.relative(projectRoot, file).split(path.sep).join("/"),
      phrases: hits,
    });
  }
  report[locale] = localeHits;
}

const totalHits = Object.values(report).reduce((sum, rows) => sum + rows.reduce((rowSum, row) => rowSum + row.phrases.length, 0), 0);
console.log(JSON.stringify({ totalHits, report }, null, 2));

if (totalHits > 0) {
  process.exitCode = 1;
}

