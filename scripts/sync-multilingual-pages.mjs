import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { multilingualTranslations } from "../src/i18n/multilingual-dictionary.mjs";
import { multilingualSupplementTranslations } from "../src/i18n/multilingual-supplement.mjs";
import { blogTitleTranslations } from "../src/i18n/blog-title-translations.mjs";
import { multilingualFinalFixes } from "../src/i18n/multilingual-final-fixes.mjs";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const siteBase = "https://www.kratorattachments.com";
const existingOnly = process.argv.includes("--existing-only");

const languages = [
  { dir: "es", hreflang: "es", label: "ES", lang: "es" },
  { dir: "pt", hreflang: "pt-BR", label: "PT", lang: "pt-BR" },
  { dir: "fr", hreflang: "fr", label: "FR", lang: "fr" },
  { dir: "ru", hreflang: "ru", label: "RU", lang: "ru" },
  { dir: "ar", hreflang: "ar", label: "AR", lang: "ar" },
];

const protectedLanguageDirs = new Set(languages.map((language) => language.dir));

const languageLabels = [
  { dir: "", hreflang: "en", label: "EN", lang: "en" },
  ...languages,
];

const sourceRoots = [
  "index.html",
  "products",
  "applications",
  "quality-control",
  "blog",
  "contact",
  "about-us",
  "custom-service",
];

const exactTranslations = {
  es: {
    Home: "Inicio",
    Products: "Productos",
    Applications: "Aplicaciones",
    Factory: "Fábrica",
    Blog: "Blog",
    Contact: "Contacto",
    Menu: "Menú",
    "Choose language": "Elegir idioma",
    "WhatsApp Us": "WhatsApp",
    "Get Quote": "Solicitar cotización",
    "Get Quote in 24 Hours": "Cotización en 24 horas",
    "View Details": "Ver detalles",
    "Read More": "Leer más",
    "View Product": "Ver producto",
    "Get Recommendation": "Obtener recomendación",
    "Get Attachment Advice": "Obtener asesoría",
    "Send Machine Info": "Enviar datos de la máquina",
    "Product Center": "Centro de productos",
    "Resource Center": "Centro de recursos",
    "Request a Quote": "Solicitar cotización",
    "Need a Matching Recommendation?": "¿Necesita una recomendación de compatibilidad?",
    "Hydraulic Breaker": "Martillo hidráulico",
    "Hydraulic Breakers": "Martillos hidráulicos",
    "Quick Coupler": "Acople rápido",
    "Quick Couplers": "Acoples rápidos",
    "Vibratory Pile Hammer": "Martillo vibratorio para pilotes",
    "Vibratory Pile Hammers": "Martillos vibratorios para pilotes",
    "Demolition Shears": "Cizallas de demolición",
    "Hydraulic Shear": "Cizalla hidráulica",
    "Hydraulic Pulverizer": "Pulverizador hidráulico",
    "Hydraulic Pulverizers": "Pulverizadores hidráulicos",
    "Hydraulic Grapple": "Garra hidráulica",
    "Hydraulic Grapples": "Garras hidráulicas",
    "Plate Compactor": "Compactador de placa",
    "Plate Compactors": "Compactadores de placa",
    "Earth Augers": "Barrenas de tierra",
    "Excavator Bucket": "Cucharón de excavadora",
    "Excavator Buckets": "Cucharones de excavadora",
    "Excavator Ripper": "Ripper de excavadora",
    "Excavator Rippers": "Rippers de excavadora",
    "Custom Attachments": "Implementos personalizados",
    "Technical Specifications": "Especificaciones técnicas",
    "Related Products": "Productos relacionados",
    "Product Features": "Características del producto",
    "Why Buyers Contact KRATOR": "Por qué los compradores contactan a KRATOR",
    "Buyer Tools & Checklists": "Herramientas y listas de verificación",
  },
  pt: {
    Home: "Início",
    Products: "Produtos",
    Applications: "Aplicações",
    Factory: "Fábrica",
    Blog: "Blog",
    Contact: "Contato",
    Menu: "Menu",
    "Choose language": "Escolher idioma",
    "WhatsApp Us": "WhatsApp",
    "Get Quote": "Solicitar cotação",
    "Get Quote in 24 Hours": "Cotação em 24 horas",
    "View Details": "Ver detalhes",
    "Read More": "Ler mais",
    "View Product": "Ver produto",
    "Get Recommendation": "Receber recomendação",
    "Get Attachment Advice": "Receber orientação",
    "Send Machine Info": "Enviar dados da máquina",
    "Product Center": "Centro de produtos",
    "Resource Center": "Centro de recursos",
    "Request a Quote": "Solicitar cotação",
    "Need a Matching Recommendation?": "Precisa de uma recomendação de compatibilidade?",
    "Hydraulic Breaker": "Rompedor hidráulico",
    "Hydraulic Breakers": "Rompedores hidráulicos",
    "Quick Coupler": "Engate rápido",
    "Quick Couplers": "Engates rápidos",
    "Vibratory Pile Hammer": "Martelo vibratório para estacas",
    "Vibratory Pile Hammers": "Martelos vibratórios para estacas",
    "Demolition Shears": "Tesouras de demolição",
    "Hydraulic Shear": "Tesoura hidráulica",
    "Hydraulic Pulverizer": "Pulverizador hidráulico",
    "Hydraulic Pulverizers": "Pulverizadores hidráulicos",
    "Hydraulic Grapple": "Garra hidráulica",
    "Hydraulic Grapples": "Garras hidráulicas",
    "Plate Compactor": "Compactador de placa",
    "Plate Compactors": "Compactadores de placa",
    "Earth Augers": "Perfuradores de solo",
    "Excavator Bucket": "Caçamba de escavadeira",
    "Excavator Buckets": "Caçambas de escavadeira",
    "Excavator Ripper": "Ripper de escavadeira",
    "Excavator Rippers": "Rippers de escavadeira",
    "Custom Attachments": "Implementos personalizados",
    "Technical Specifications": "Especificações técnicas",
    "Related Products": "Produtos relacionados",
    "Product Features": "Características do produto",
    "Why Buyers Contact KRATOR": "Por que compradores contatam a KRATOR",
    "Buyer Tools & Checklists": "Ferramentas e checklists para compradores",
  },
  fr: {
    Home: "Accueil",
    Products: "Produits",
    Applications: "Applications",
    Factory: "Usine",
    Blog: "Blog",
    Contact: "Contact",
    Menu: "Menu",
    "Choose language": "Choisir la langue",
    "WhatsApp Us": "WhatsApp",
    "Get Quote": "Demander un devis",
    "Get Quote in 24 Hours": "Devis sous 24 heures",
    "View Details": "Voir les détails",
    "Read More": "Lire la suite",
    "View Product": "Voir le produit",
    "Get Recommendation": "Obtenir une recommandation",
    "Get Attachment Advice": "Obtenir un conseil",
    "Send Machine Info": "Envoyer les infos machine",
    "Product Center": "Centre produits",
    "Resource Center": "Centre de ressources",
    "Request a Quote": "Demander un devis",
    "Need a Matching Recommendation?": "Besoin d’une recommandation de compatibilité ?",
    "Hydraulic Breaker": "Brise-roche hydraulique",
    "Hydraulic Breakers": "Brise-roches hydrauliques",
    "Quick Coupler": "Attache rapide",
    "Quick Couplers": "Attaches rapides",
    "Vibratory Pile Hammer": "Vibrofonceur pour pieux",
    "Vibratory Pile Hammers": "Vibrofonceurs pour pieux",
    "Demolition Shears": "Cisailles de démolition",
    "Hydraulic Shear": "Cisaille hydraulique",
    "Hydraulic Pulverizer": "Pulvérisateur hydraulique",
    "Hydraulic Pulverizers": "Pulvérisateurs hydrauliques",
    "Hydraulic Grapple": "Grappin hydraulique",
    "Hydraulic Grapples": "Grappins hydrauliques",
    "Plate Compactor": "Plaque de compactage",
    "Plate Compactors": "Plaques de compactage",
    "Earth Augers": "Tarières",
    "Excavator Bucket": "Godet d’excavatrice",
    "Excavator Buckets": "Godets d’excavatrice",
    "Excavator Ripper": "Ripper d’excavatrice",
    "Excavator Rippers": "Rippers d’excavatrice",
    "Custom Attachments": "Accessoires personnalisés",
    "Technical Specifications": "Spécifications techniques",
    "Related Products": "Produits associés",
    "Product Features": "Caractéristiques du produit",
    "Why Buyers Contact KRATOR": "Pourquoi les acheteurs contactent KRATOR",
    "Buyer Tools & Checklists": "Outils et checklists acheteurs",
  },
  ru: {
    Home: "Главная",
    Products: "Продукция",
    Applications: "Применения",
    Factory: "Завод",
    Blog: "Блог",
    Contact: "Контакты",
    Menu: "Меню",
    "Choose language": "Выбор языка",
    "WhatsApp Us": "WhatsApp",
    "Get Quote": "Запросить цену",
    "Get Quote in 24 Hours": "Цена за 24 часа",
    "View Details": "Подробнее",
    "Read More": "Читать далее",
    "View Product": "Смотреть продукт",
    "Get Recommendation": "Получить рекомендацию",
    "Get Attachment Advice": "Получить консультацию",
    "Send Machine Info": "Отправить данные машины",
    "Product Center": "Центр продукции",
    "Resource Center": "Центр ресурсов",
    "Request a Quote": "Запросить цену",
    "Need a Matching Recommendation?": "Нужна рекомендация по подбору?",
    "Hydraulic Breaker": "Гидромолот",
    "Hydraulic Breakers": "Гидромолоты",
    "Quick Coupler": "Быстросъем",
    "Quick Couplers": "Быстросъемы",
    "Vibratory Pile Hammer": "Вибропогружатель",
    "Vibratory Pile Hammers": "Вибропогружатели",
    "Demolition Shears": "Ножницы для демонтажа",
    "Hydraulic Shear": "Гидравлические ножницы",
    "Hydraulic Pulverizer": "Гидравлический бетонолом",
    "Hydraulic Pulverizers": "Гидравлические бетоноломы",
    "Hydraulic Grapple": "Гидравлический захват",
    "Hydraulic Grapples": "Гидравлические захваты",
    "Plate Compactor": "Гидроплита",
    "Plate Compactors": "Гидроплиты",
    "Earth Augers": "Гидробуры",
    "Excavator Bucket": "Ковш экскаватора",
    "Excavator Buckets": "Ковши экскаватора",
    "Excavator Ripper": "Рыхлитель экскаватора",
    "Excavator Rippers": "Рыхлители экскаватора",
    "Custom Attachments": "Индивидуальное навесное оборудование",
    "Technical Specifications": "Технические характеристики",
    "Related Products": "Связанные продукты",
    "Product Features": "Особенности продукта",
    "Why Buyers Contact KRATOR": "Почему покупатели обращаются в KRATOR",
    "Buyer Tools & Checklists": "Инструменты и чек-листы покупателя",
  },
  ar: {
    Home: "الرئيسية",
    Products: "المنتجات",
    Applications: "التطبيقات",
    Factory: "المصنع",
    Blog: "المدونة",
    Contact: "اتصل بنا",
    Menu: "القائمة",
    "Choose language": "اختيار اللغة",
    "WhatsApp Us": "واتساب",
    "Get Quote": "اطلب عرض سعر",
    "Get Quote in 24 Hours": "عرض سعر خلال 24 ساعة",
    "View Details": "عرض التفاصيل",
    "Read More": "اقرأ المزيد",
    "View Product": "عرض المنتج",
    "Get Recommendation": "احصل على توصية",
    "Get Attachment Advice": "احصل على استشارة",
    "Send Machine Info": "أرسل بيانات الماكينة",
    "Product Center": "مركز المنتجات",
    "Resource Center": "مركز الموارد",
    "Request a Quote": "طلب عرض سعر",
    "Need a Matching Recommendation?": "هل تحتاج إلى توصية مطابقة؟",
    "Hydraulic Breaker": "مطرقة هيدروليكية",
    "Hydraulic Breakers": "مطارق هيدروليكية",
    "Quick Coupler": "قارنة سريعة",
    "Quick Couplers": "قارنات سريعة",
    "Vibratory Pile Hammer": "مطرقة خوازيق اهتزازية",
    "Vibratory Pile Hammers": "مطارق خوازيق اهتزازية",
    "Demolition Shears": "مقصات هدم",
    "Hydraulic Shear": "مقص هيدروليكي",
    "Hydraulic Pulverizer": "كسارة خرسانة هيدروليكية",
    "Hydraulic Pulverizers": "كسارات خرسانة هيدروليكية",
    "Hydraulic Grapple": "كلاب هيدروليكي",
    "Hydraulic Grapples": "كلابات هيدروليكية",
    "Plate Compactor": "مدك صفيحة",
    "Plate Compactors": "مدكات صفيحة",
    "Earth Augers": "مثاقب أرضية",
    "Excavator Bucket": "دلو حفارة",
    "Excavator Buckets": "دلاء حفارات",
    "Excavator Ripper": "كسارة تربة للحفارة",
    "Excavator Rippers": "كسارات تربة للحفارات",
    "Custom Attachments": "ملحقات مخصصة",
    "Technical Specifications": "المواصفات الفنية",
    "Related Products": "منتجات ذات صلة",
    "Product Features": "ميزات المنتج",
    "Why Buyers Contact KRATOR": "لماذا يتواصل المشترون مع KRATOR",
    "Buyer Tools & Checklists": "أدوات وقوائم فحص للمشترين",
  },
};

for (const [languageDir, entries] of Object.entries(multilingualTranslations)) {
  exactTranslations[languageDir] = {
    ...(exactTranslations[languageDir] ?? {}),
    ...entries,
  };
}

for (const [languageDir, entries] of Object.entries(multilingualSupplementTranslations)) {
  exactTranslations[languageDir] = {
    ...(exactTranslations[languageDir] ?? {}),
    ...entries,
  };
}

for (const [languageDir, entries] of Object.entries(blogTitleTranslations)) {
  exactTranslations[languageDir] = {
    ...(exactTranslations[languageDir] ?? {}),
    ...entries,
  };
}

for (const [languageDir, entries] of Object.entries(multilingualFinalFixes)) {
  exactTranslations[languageDir] = {
    ...(exactTranslations[languageDir] ?? {}),
    ...entries,
  };
}

const languagePrefixes = new Set(languages.map((item) => item.dir));

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

function routeFromFile(filePath) {
  const relative = toPosix(path.relative(projectRoot, filePath));
  if (relative === "index.html") return "/";
  return `/${relative.replace(/\/index\.html$/, "/")}`;
}

function fileFromRoute(route) {
  if (route === "/") return path.join(projectRoot, "index.html");
  return path.join(projectRoot, route.replace(/^\//, ""), "index.html");
}

function localizedRoute(route, languageDir = "") {
  if (!languageDir) return route;
  if (route === "/") return `/${languageDir}/`;
  return `/${languageDir}${route}`;
}

function absoluteUrl(route) {
  return `${siteBase}${route}`;
}

function collectSourceFiles() {
  const sourceFiles = new Set();
  for (const item of sourceRoots) {
    const fullPath = path.join(projectRoot, item);
    if (!fs.existsSync(fullPath)) continue;
    const stat = fs.statSync(fullPath);
    if (stat.isFile() && item.endsWith(".html")) {
      sourceFiles.add(fullPath);
    } else if (stat.isDirectory()) {
      for (const file of walk(fullPath)) {
        if (path.basename(file) === "index.html") sourceFiles.add(file);
      }
    }
  }
  return [...sourceFiles].sort();
}

function walk(directory, results = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, results);
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

function translateText(text, languageDir) {
  const dictionary = exactTranslations[languageDir];
  if (!dictionary) return text;
  const phrases = Object.keys(dictionary).sort((a, b) => b.length - a.length);
  let next = text;
  for (const phrase of phrases) {
    const replacement = dictionary[phrase];
    const variants = new Set([
      phrase,
      phrase.replaceAll("&", "&amp;"),
      phrase.replaceAll("–", "&ndash;"),
      phrase.replaceAll("→", "-&gt;"),
      phrase.replaceAll("→", "&rarr;"),
    ]);
    for (const variant of variants) {
      if (variant) next = next.split(variant).join(replacement);
    }
    const upper = phrase.toUpperCase();
    if (upper !== phrase) next = next.split(upper).join(replacement.toUpperCase());
  }
  return next;
}

function localizeTextNodes(html, languageDir) {
  if (!languageDir) return html;
  const bodyMatch = html.match(/<body\b[^>]*>[\s\S]*<\/body>/i);
  if (!bodyMatch) return html;

  const bodyStart = bodyMatch.index;
  const bodyEnd = bodyStart + bodyMatch[0].length;
  const protectedBlocks = [];
  const protectToken = (block) => {
    const token = `__KRATOR_PROTECTED_BLOCK_${protectedBlocks.length}__`;
    protectedBlocks.push(block);
    return token;
  };

  let bodyHtml = bodyMatch[0].replace(/<(script|style|noscript)\b[\s\S]*?<\/\1>/gi, protectToken);
  bodyHtml = bodyHtml
    .split(/(<[^>]+>)/g)
    .map((part) => (part.startsWith("<") ? part : translateText(part, languageDir)))
    .join("");
  bodyHtml = bodyHtml.replace(/__KRATOR_PROTECTED_BLOCK_(\d+)__/g, (_match, index) => protectedBlocks[Number(index)] ?? "");

  return `${html.slice(0, bodyStart)}${bodyHtml}${html.slice(bodyEnd)}`;
}

function updateAttribute(tag, attrName, attrValue) {
  const attrRegex = new RegExp(`${attrName}="[^"]*"`);
  if (attrRegex.test(tag)) return tag.replace(attrRegex, `${attrName}="${attrValue}"`);
  return tag.replace(/>$/, ` ${attrName}="${attrValue}">`);
}

function updateHtmlLanguage(html, languageDir) {
  const language = languageDir ? languages.find((item) => item.dir === languageDir).lang : "en";
  if (/<html\b[^>]*>/i.test(html)) {
    return html.replace(/<html\b[^>]*>/i, (tag) => updateAttribute(tag, "lang", language));
  }
  return html;
}

function updateMetaTag(html, propertySelector, content) {
  const escaped = propertySelector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`<meta\\s+${escaped}\\s+content="[^"]*"\\s*>`, "i");
  if (regex.test(html)) return html.replace(regex, `<meta ${propertySelector} content="${escapeAttribute(content)}">`);
  return html.replace("</head>", `  <meta ${propertySelector} content="${escapeAttribute(content)}">\n</head>`);
}

function updateTitleAndDescription(html, languageDir) {
  if (!languageDir) return html;
  html = html.replace(/<title>([\s\S]*?)<\/title>/i, (_match, title) => `<title>${translateText(title, languageDir)}</title>`);
  html = html.replace(/<meta name="description" content="([^"]*)">/i, (_match, desc) => `<meta name="description" content="${escapeAttribute(translateText(desc, languageDir))}">`);
  html = html.replace(/<meta property="og:title" content="([^"]*)">/i, (_match, title) => `<meta property="og:title" content="${escapeAttribute(translateText(title, languageDir))}">`);
  html = html.replace(/<meta property="og:description" content="([^"]*)">/i, (_match, desc) => `<meta property="og:description" content="${escapeAttribute(translateText(desc, languageDir))}">`);
  return html;
}

function escapeAttribute(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function localizeAttributes(html, languageDir) {
  if (!languageDir) return html;
  return html.replace(/\s(placeholder|aria-label|alt|title)="([^"]*)"/gi, (match, attrName, value) => {
    if (!value.trim()) return match;
    return ` ${attrName}="${escapeAttribute(translateText(value, languageDir))}"`;
  });
}

const jsonLdStringSkipKeys = new Set([
  "@context",
  "@id",
  "@type",
  "url",
  "image",
  "logo",
  "sameAs",
  "email",
  "telephone",
  "sku",
  "mpn",
  "model",
  "item",
  "identifier",
]);

function shouldTranslateJsonLdString(key, value) {
  const text = value.trim();
  if (!text || jsonLdStringSkipKeys.has(key)) return false;
  if (/^(https?:|mailto:|tel:|\/images\/|\/assets\/|#)/i.test(text)) return false;
  if (/^[A-Z]{1,5}\d{2,}[A-Z0-9-]*$/.test(text)) return false;
  if (/^\+?\d[\d\s().-]+$/.test(text)) return false;
  return true;
}

function localizeJsonLdValue(value, languageDir, key = "") {
  if (Array.isArray(value)) return value.map((item) => localizeJsonLdValue(item, languageDir, key));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([childKey, childValue]) => [childKey, localizeJsonLdValue(childValue, languageDir, childKey)]));
  }
  if (typeof value !== "string" || !shouldTranslateJsonLdString(key, value)) return value;
  return translateText(value, languageDir);
}

function stringifyJsonLd(value) {
  return JSON.stringify(value, null, 2).replace(/</g, "\\u003c");
}

function localizeJsonLd(html, languageDir) {
  if (!languageDir) return html;
  return html.replace(/<script\b([^>]*type=["']application\/ld\+json["'][^>]*)>([\s\S]*?)<\/script>/gi, (match, attrs, json) => {
    try {
      const parsed = JSON.parse(json.trim());
      const localized = localizeJsonLdValue(parsed, languageDir);
      return `<script${attrs}>\n${stringifyJsonLd(localized)}\n</script>`;
    } catch {
      return match;
    }
  });
}

function removeExistingAlternates(html) {
  return html.replace(/\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+">\n?/gi, "\n");
}

function buildAlternateLinks(route) {
  const links = [
    `  <link rel="alternate" hreflang="en" href="${absoluteUrl(route)}">`,
    `  <link rel="alternate" hreflang="x-default" href="${absoluteUrl(route)}">`,
  ];
  return links.join("\n");
}

function updateRobotsMeta(html, languageDir = "") {
  const robotsTag = '<meta name="robots" content="noindex, follow">';
  const robotsRegex = /\s*<meta name="robots" content="[^"]*">\n?/i;

  if (protectedLanguageDirs.has(languageDir)) {
    if (robotsRegex.test(html)) {
      return html.replace(robotsRegex, `\n  ${robotsTag}\n`);
    }
    return html.replace("</head>", `  ${robotsTag}\n</head>`);
  }

  return html.replace(robotsRegex, "\n");
}

function updateCanonicalAndHreflang(html, route, languageDir = "") {
  const currentRoute = localizedRoute(route, languageDir);
  const currentUrl = absoluteUrl(currentRoute);
  html = removeExistingAlternates(html);
  if (/<link rel="canonical" href="[^"]+">/i.test(html)) {
    html = html.replace(/<link rel="canonical" href="[^"]+">/i, `<link rel="canonical" href="${currentUrl}">`);
  } else {
    html = html.replace("</title>", `</title>\n  <link rel="canonical" href="${currentUrl}">`);
  }
  html = html.replace(/<link rel="canonical" href="[^"]+">/i, (canonical) => `${canonical}\n${buildAlternateLinks(route)}`);
  html = updateMetaTag(html, 'property="og:url"', currentUrl);
  return html;
}

function findOgImage(html) {
  const existing = html.match(/<meta property="og:image" content="([^"]+)">/i);
  if (existing) return existing[1];
  const image = html.match(/<img[^>]+src="(\/images\/[^"]+)"/i);
  return image ? absoluteUrl(image[1]) : `${siteBase}/images/products/hero/excavator-product-center-bg.png`;
}

function ensureOgImage(html) {
  const image = findOgImage(html);
  return updateMetaTag(html, 'property="og:image"', image.startsWith("http") ? image : absoluteUrl(image));
}

function rewriteLanguageSwitcher(html, route, currentLanguageDir = "") {
  for (const item of languageLabels) {
    const href = localizedRoute(route, item.dir);
    const active = item.dir === currentLanguageDir;
    const regex = new RegExp(`<a\\b([^>]*?)hreflang="${item.hreflang}"([^>]*)>${item.label}<\\/a>`, "g");
    html = html.replace(regex, (match) => {
      let tag = match.replace(/ href="[^"]*"/, "");
      tag = tag.replace(/\sclass="([^"]*)"/, (_m, className) => {
        const classes = className.split(/\s+/).filter((name) => name && name !== "active");
        if (active) classes.push("active");
        return classes.length ? ` class="${classes.join(" ")}"` : "";
      });
      if (active && !/\sclass="/.test(tag)) tag = tag.replace("<a ", '<a class="active" ');
      return tag.replace("<a ", `<a href="${href}" `);
    });
  }
  return html;
}

function rewriteInternalLinks(html, languageDir) {
  if (!languageDir) return html;
  return html.replace(/\shref="(\/[^"#?]*\/?)(#[^"]*)?"/g, (match, href, hash = "") => {
    if (
      href.startsWith("/assets/") ||
      href.startsWith("/images/") ||
      href.startsWith("/robots.txt") ||
      href.startsWith("/sitemap.xml") ||
      href.startsWith("/llms.txt")
    ) {
      return match;
    }
    const first = href.split("/").filter(Boolean)[0];
    if (languagePrefixes.has(first)) return match;
    const localizable =
      href === "/" ||
      href.startsWith("/products/") ||
      href.startsWith("/applications/") ||
      href.startsWith("/quality-control/") ||
      href.startsWith("/blog/") ||
      href.startsWith("/contact/") ||
      href.startsWith("/about-us/") ||
      href.startsWith("/custom-service/");
    if (!localizable) return match;
    const targetRoute = localizedRoute(href, languageDir);
    if (existingOnly && !fs.existsSync(fileFromRoute(targetRoute))) return match;
    return ` href="${targetRoute}${hash}"`;
  });
}

function normalizeImagePaths(html) {
  return html
    .replaceAll("/public/images/", "/images/")
    .replace(/(?<=["'(])public\/images\//g, "/images/")
    .replace(/(?<=["'(])\.\/images\//g, "/images/")
    .replace(/(?<=["'(])\.\.\/images\//g, "/images/");
}

function alignCurrentPageSchemaUrl(html, sourceCanonical, targetCanonical) {
  if (!sourceCanonical || !targetCanonical || sourceCanonical === targetCanonical) return html;
  return html.replace(
    /<script\b([^>]*type=["']application\/ld\+json["'][^>]*)>([\s\S]*?)<\/script>/gi,
    (block) => block.split(sourceCanonical).join(targetCanonical),
  );
}

function transformHtml(sourceHtml, route, languageDir = "") {
  const sourceCanonical = sourceHtml.match(/<link rel="canonical" href="([^"]+)">/i)?.[1] ?? absoluteUrl(route);
  let html = normalizeImagePaths(sourceHtml);
  html = updateHtmlLanguage(html, languageDir);
  html = rewriteInternalLinks(html, languageDir);
  html = rewriteLanguageSwitcher(html, route, languageDir);
  html = updateCanonicalAndHreflang(html, route, languageDir);
  html = updateRobotsMeta(html, languageDir);
  html = ensureOgImage(html);
  html = updateTitleAndDescription(html, languageDir);
  html = localizeJsonLd(html, languageDir);
  html = alignCurrentPageSchemaUrl(html, sourceCanonical, absoluteUrl(localizedRoute(route, languageDir)));
  html = localizeAttributes(html, languageDir);
  html = localizeTextNodes(html, languageDir);
  return html;
}

const balancedTags = [
  "html",
  "head",
  "body",
  "title",
  "main",
  "section",
  "article",
  "aside",
  "nav",
  "div",
  "span",
  "button",
  "a",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "ul",
  "ol",
  "li",
  "details",
  "summary",
  "form",
  "label",
  "select",
  "option",
  "textarea",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "figure",
  "figcaption",
  "strong",
  "em",
  "small",
];

function countTags(html, tagName, closing = false) {
  const slash = closing ? "\\/" : "";
  return (html.match(new RegExp(`<${slash}${tagName}\\b`, "gi")) ?? []).length;
}

function validateGeneratedHtml(html, route) {
  const corruptedClosingTags = html.match(/\?\/[a-z][a-z0-9-]*>/gi) ?? [];
  if (corruptedClosingTags.length > 0) {
    throw new Error(`${route}: corrupted closing tags: ${corruptedClosingTags.slice(0, 5).join(", ")}`);
  }

  const structuralHtml = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|noscript)\b[\s\S]*?<\/\1>/gi, "");
  const imbalances = balancedTags
    .map((tagName) => ({
      tagName,
      opening: countTags(structuralHtml, tagName),
      closing: countTags(structuralHtml, tagName, true),
    }))
    .filter(({ opening, closing }) => opening !== closing);

  if (imbalances.length > 0) {
    const summary = imbalances
      .slice(0, 8)
      .map(({ tagName, opening, closing }) => `${tagName}:${opening}/${closing}`)
      .join(", ");
    throw new Error(`${route}: unbalanced HTML tags: ${summary}`);
  }
}

function writeFileIfChanged(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  if (fs.existsSync(filePath) && fs.readFileSync(filePath, "utf8") === content) return false;
  fs.writeFileSync(filePath, content, "utf8");
  return true;
}

function main() {
  const sourceFiles = collectSourceFiles();
  const generated = [];
  const updatedEnglish = [];

  for (const sourceFile of sourceFiles) {
    const route = routeFromFile(sourceFile);
    const sourceHtml = fs.readFileSync(sourceFile, "utf8");
    if (!existingOnly) {
      const englishHtml = transformHtml(sourceHtml, route, "");
      validateGeneratedHtml(englishHtml, route);
      if (writeFileIfChanged(sourceFile, englishHtml)) updatedEnglish.push(route);
    }

    for (const language of languages) {
      const targetRoute = localizedRoute(route, language.dir);
      const targetFile = fileFromRoute(targetRoute);
      if (existingOnly && !fs.existsSync(targetFile)) continue;
      const localizedHtml = transformHtml(sourceHtml, route, language.dir);
      validateGeneratedHtml(localizedHtml, targetRoute);
      writeFileIfChanged(targetFile, localizedHtml);
      generated.push(targetRoute);
    }
  }

  console.log(
    JSON.stringify(
      {
        sourcePages: sourceFiles.length,
        mode: existingOnly ? "existing-only" : "full-sync",
        updatedEnglishPages: updatedEnglish.length,
        generatedPages: generated.length,
        languages: languages.map((item) => item.dir),
      },
      null,
      2,
    ),
  );
}

main();
