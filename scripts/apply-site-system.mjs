import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "work" || entry.name === "outputs" || entry.name === ".git") return [];
      return walk(full);
    }
    return entry.name === "index.html" ? [full] : [];
  });
}

function normalizeClasses(existing, additions) {
  return [...new Set([...existing.split(/\s+/).filter(Boolean), ...additions])].join(" ");
}

function templateClasses(relativePath, html) {
  const rel = relativePath.replaceAll("\\", "/");
  const classes = ["system-page"];

  if (rel === "products/index.html") {
    classes.push("product-list-template");
  } else if (rel.startsWith("products/")) {
    classes.push("product-detail-template");
    if (!/product-detail-page/.test(html)) classes.push("product-detail-page");
  } else if (rel === "applications/index.html") {
    classes.push("application-template");
  } else if (rel.startsWith("blog/")) {
    classes.push("content-template", "blog-template");
  } else if (rel === "contact/index.html") {
    classes.push("content-template", "contact-template");
  } else {
    classes.push("content-template");
  }

  return classes;
}

function mainClass(relativePath, html) {
  const rel = relativePath.replaceAll("\\", "/");
  if (rel === "products/index.html" || /<main class="products-page"/.test(html)) return null;
  if (/product-detail-page/.test(html) || /<main class="pdp-main"/.test(html)) return null;
  if (rel === "applications/index.html") return "system-main application-page-template";
  if (rel.startsWith("blog/")) return "system-main content-page-template";
  if (rel === "contact/index.html") return "system-main contact-page-template";
  return "system-main content-page-template";
}

let changed = 0;

for (const file of walk(root)) {
  const relative = path.relative(root, file);
  if (relative === "index.html") continue;

  let html = fs.readFileSync(file, "utf8");
  const before = html;
  const classes = templateClasses(relative, html);

  html = html.replace(/<body(?: class="([^"]*)")?>/, (_, existing = "") => {
    return `<body class="${normalizeClasses(existing, classes)}">`;
  });

  const main = mainClass(relative, html);
  if (main && /<main>/.test(html)) {
    html = html.replace("<main>", `<main class="${main}">`);
  }

  if (html !== before) {
    fs.writeFileSync(file, html, "utf8");
    changed += 1;
  }
}

console.log(`Applied system page classes to ${changed} pages.`);
