import { promises as fs } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);

let sharp;

try {
  sharp = require("sharp");
} catch (error) {
  console.error(
    [
      "The image processor requires the \"sharp\" package.",
      "Run \"npm install\" in the project root, then try again.",
      `Original error: ${error.message}`,
    ].join("\n"),
  );
  process.exit(1);
}

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const configPath = path.join(projectRoot, "image-process.config.json");
const imageJobs = [
  {
    label: "default",
    rawRoot: path.join(projectRoot, "public", "images", "_raw"),
    processedRoot: path.join(projectRoot, "public", "images", "_processed"),
    configPrefix: "",
  },
  {
    label: "matching-service",
    rawRoot: path.join(projectRoot, "public", "images", "matching-service", "raw"),
    processedRoot: path.join(projectRoot, "public", "images", "matching-service", "processed"),
    configPrefix: "matching-service/",
  },
];

const MODES = Object.freeze({
  icon: { width: 800, height: 800, paddingRatio: 0.08 },
  arrow: { width: 400, height: 400, paddingRatio: 0.08 },
  wide: { width: 1200, height: 700, paddingRatio: 0.04 },
  card: { width: 1000, height: 650, paddingRatio: 0.04 },
  product: { width: 1200, height: 1200, paddingRatio: 0.06 },
});

const DEFAULT_MODE = "product";
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

function toPosixPath(filePath) {
  return filePath.split(path.sep).join("/");
}

async function readConfig() {
  try {
    const configText = await fs.readFile(configPath, "utf8");
    const config = JSON.parse(configText);

    if (!config || typeof config !== "object" || Array.isArray(config)) {
      throw new TypeError("The configuration root must be a JSON object.");
    }

    return config;
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }

    throw new Error(`Unable to read image-process.config.json: ${error.message}`);
  }
}

async function listPngFiles(directory) {
  const files = [];
  const entries = await fs.readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listPngFiles(entryPath)));
    } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === ".png") {
      files.push(entryPath);
    }
  }

  return files;
}

function colorDistance(first, second) {
  return Math.hypot(
    first.r - second.r,
    first.g - second.g,
    first.b - second.b,
  );
}

function colorFromBuffer(buffer, offset) {
  return {
    r: buffer[offset],
    g: buffer[offset + 1],
    b: buffer[offset + 2],
    alpha: buffer[offset + 3],
  };
}

function isLightNeutral({ r, g, b }) {
  return Math.max(r, g, b) - Math.min(r, g, b) <= 14 && (r + g + b) / 3 >= 178;
}

function quantize(value, step = 8) {
  return Math.min(255, Math.round(value / step) * step);
}

function detectCheckerboardColors(buffer, info) {
  const { width, height, channels } = info;

  if (channels !== 4 || width < 16 || height < 16) {
    return null;
  }

  const pixelCount = width * height;
  let translucentPixels = 0;

  for (let offset = 3; offset < buffer.length; offset += channels) {
    if (buffer[offset] < 250) {
      translucentPixels += 1;
    }
  }

  // Real transparency already exists. Preserve it instead of trying to rebuild alpha.
  if (translucentPixels / pixelCount > 0.001) {
    return null;
  }

  const borderSize = Math.max(2, Math.floor(Math.min(width, height) * 0.045));
  const buckets = new Map();
  let sampledPixels = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const isBorder =
        x < borderSize ||
        x >= width - borderSize ||
        y < borderSize ||
        y >= height - borderSize;

      if (!isBorder) {
        continue;
      }

      const offset = (y * width + x) * channels;
      const color = colorFromBuffer(buffer, offset);

      if (!isLightNeutral(color)) {
        continue;
      }

      const r = quantize(color.r);
      const g = quantize(color.g);
      const b = quantize(color.b);
      const key = `${r},${g},${b}`;
      const bucket = buckets.get(key) ?? { r, g, b, count: 0 };
      bucket.count += 1;
      buckets.set(key, bucket);
      sampledPixels += 1;
    }
  }

  if (sampledPixels === 0) {
    return null;
  }

  const dominantColors = [...buckets.values()]
    .sort((first, second) => second.count - first.count)
    .slice(0, 4);

  let pair = null;

  for (let firstIndex = 0; firstIndex < dominantColors.length; firstIndex += 1) {
    for (
      let secondIndex = firstIndex + 1;
      secondIndex < dominantColors.length;
      secondIndex += 1
    ) {
      const first = dominantColors[firstIndex];
      const second = dominantColors[secondIndex];
      const firstShare = first.count / sampledPixels;
      const secondShare = second.count / sampledPixels;
      const distance = colorDistance(first, second);

      if (
        firstShare >= 0.12 &&
        secondShare >= 0.12 &&
        firstShare + secondShare >= 0.58 &&
        distance >= 5 &&
        distance <= 58
      ) {
        pair = [first, second];
        break;
      }
    }

    if (pair) {
      break;
    }
  }

  if (!pair) {
    return null;
  }

  let likelyBackgroundPixels = 0;
  let likelyForegroundPixels = 0;
  let lightNeutralForegroundPixels = 0;

  for (let offset = 0; offset < buffer.length; offset += channels) {
    const color = colorFromBuffer(buffer, offset);
    const distance = Math.min(
      colorDistance(color, pair[0]),
      colorDistance(color, pair[1]),
    );

    if (distance <= 30) {
      likelyBackgroundPixels += 1;
    } else {
      likelyForegroundPixels += 1;

      if (isLightNeutral(color)) {
        lightNeutralForegroundPixels += 1;
      }
    }
  }

  const backgroundShare = likelyBackgroundPixels / pixelCount;
  const neutralForegroundShare =
    likelyForegroundPixels === 0
      ? 0
      : lightNeutralForegroundPixels / likelyForegroundPixels;

  // White line art on a checkerboard cannot be separated reliably by colour alone.
  // Skip that case rather than damaging the subject.
  if (backgroundShare < 0.45 || neutralForegroundShare > 0.58) {
    return null;
  }

  return pair;
}

function cleanFakeCheckerboard(buffer, info) {
  const checkerboardColors = detectCheckerboardColors(buffer, info);

  if (!checkerboardColors) {
    return { buffer, cleaned: false };
  }

  const cleanedBuffer = Buffer.from(buffer);
  const { channels } = info;
  const transparentDistance = 14;
  const featherDistance = 34;

  for (let offset = 0; offset < cleanedBuffer.length; offset += channels) {
    const color = colorFromBuffer(cleanedBuffer, offset);
    const distance = Math.min(
      colorDistance(color, checkerboardColors[0]),
      colorDistance(color, checkerboardColors[1]),
    );

    if (distance <= transparentDistance) {
      cleanedBuffer[offset + 3] = 0;
    } else if (distance < featherDistance && isLightNeutral(color)) {
      const alpha =
        ((distance - transparentDistance) /
          (featherDistance - transparentDistance)) *
        255;
      cleanedBuffer[offset + 3] = Math.round(alpha);
    }
  }

  return { buffer: cleanedBuffer, cleaned: true };
}

function getCornerBackground(buffer, info) {
  const { width, height, channels } = info;
  const cornerCoordinates = [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1],
  ];
  const colors = cornerCoordinates.map(([x, y]) =>
    colorFromBuffer(buffer, (y * width + x) * channels),
  );

  const maximumDistance = Math.max(
    ...colors.flatMap((first, firstIndex) =>
      colors
        .slice(firstIndex + 1)
        .map((second) => colorDistance(first, second)),
    ),
  );

  if (maximumDistance > 32) {
    return null;
  }

  return colors.reduce(
    (average, color) => ({
      r: average.r + color.r / colors.length,
      g: average.g + color.g / colors.length,
      b: average.b + color.b / colors.length,
      alpha: average.alpha + color.alpha / colors.length,
    }),
    { r: 0, g: 0, b: 0, alpha: 0 },
  );
}

function findSubjectBounds(buffer, info) {
  const { width, height, channels } = info;
  let hasTransparency = false;

  for (let offset = 3; offset < buffer.length; offset += channels) {
    if (buffer[offset] < 250) {
      hasTransparency = true;
      break;
    }
  }

  const background = hasTransparency ? null : getCornerBackground(buffer, info);
  let left = width;
  let right = -1;
  let top = height;
  let bottom = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * channels;
      const color = colorFromBuffer(buffer, offset);
      const isSubject = hasTransparency
        ? color.alpha > 2
        : background
          ? colorDistance(color, background) > 12
          : true;

      if (!isSubject) {
        continue;
      }

      left = Math.min(left, x);
      right = Math.max(right, x);
      top = Math.min(top, y);
      bottom = Math.max(bottom, y);
    }
  }

  if (right < left || bottom < top) {
    return { left: 0, top: 0, width, height };
  }

  return {
    left,
    top,
    width: right - left + 1,
    height: bottom - top + 1,
  };
}

async function buildCanvas(rawBuffer, rawInfo, bounds, mode) {
  const horizontalPadding = Math.round(mode.width * mode.paddingRatio);
  const verticalPadding = Math.round(mode.height * mode.paddingRatio);
  const innerWidth = Math.max(1, mode.width - horizontalPadding * 2);
  const innerHeight = Math.max(1, mode.height - verticalPadding * 2);

  const subject = await sharp(rawBuffer, { raw: rawInfo })
    .extract(bounds)
    .resize({
      width: innerWidth,
      height: innerHeight,
      fit: "contain",
      position: "centre",
      background: TRANSPARENT,
      kernel: sharp.kernel.lanczos3,
    })
    .png()
    .toBuffer();

  return sharp(subject).extend({
    top: verticalPadding,
    bottom: mode.height - innerHeight - verticalPadding,
    left: horizontalPadding,
    right: mode.width - innerWidth - horizontalPadding,
    background: TRANSPARENT,
  });
}

function formatBytes(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function processImage(inputPath, config, job) {
  const relativePath = toPosixPath(path.relative(job.rawRoot, inputPath));
  const configKey = `${job.configPrefix}${relativePath}`;
  const configuredMode = config[configKey] ?? config[relativePath] ?? DEFAULT_MODE;
  const mode = MODES[configuredMode];

  if (!mode) {
    throw new Error(
      `Unknown mode "${configuredMode}" for "${relativePath}". ` +
        `Use one of: ${Object.keys(MODES).join(", ")}.`,
    );
  }

  const outputPngPath = path.join(job.processedRoot, relativePath);
  const outputWebpPath = outputPngPath.replace(/\.png$/i, ".webp");
  await fs.mkdir(path.dirname(outputPngPath), { recursive: true });

  const source = sharp(inputPath, {
    failOn: "warning",
    limitInputPixels: false,
  })
    .rotate()
    .ensureAlpha();
  const { data: sourceBuffer, info: sourceInfo } = await source
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { buffer: cleanedBuffer, cleaned } = cleanFakeCheckerboard(
    sourceBuffer,
    sourceInfo,
  );
  const bounds = findSubjectBounds(cleanedBuffer, sourceInfo);
  const canvas = await buildCanvas(cleanedBuffer, sourceInfo, bounds, mode);

  const pngBuffer = await canvas
    .clone()
    .png({
      compressionLevel: 9,
      adaptiveFiltering: true,
      effort: 10,
    })
    .toBuffer();
  const webpBuffer = await canvas
    .clone()
    .webp({
      quality: 88,
      alphaQuality: 100,
      effort: 6,
      smartSubsample: true,
    })
    .toBuffer();

  await Promise.all([
    fs.writeFile(outputPngPath, pngBuffer),
    fs.writeFile(outputWebpPath, webpBuffer),
  ]);

  return {
    label: job.label,
    relativePath,
    mode: configuredMode,
    width: mode.width,
    height: mode.height,
    cleaned,
    pngBytes: pngBuffer.length,
    webpBytes: webpBuffer.length,
  };
}

async function main() {
  const config = await readConfig();
  const results = [];

  for (const job of imageJobs) {
    await Promise.all([
      fs.mkdir(job.rawRoot, { recursive: true }),
      fs.mkdir(job.processedRoot, { recursive: true }),
    ]);

    const pngFiles = (await listPngFiles(job.rawRoot)).sort((first, second) =>
      first.localeCompare(second),
    );

    if (pngFiles.length === 0) {
      console.log(`No PNG files found in ${job.rawRoot}`);
      continue;
    }

    console.log(`Processing ${pngFiles.length} PNG file(s) for ${job.label}...`);

    for (const pngFile of pngFiles) {
      const result = await processImage(pngFile, config, job);
      results.push(result);
      console.log(
        [
          `- ${result.label}/${result.relativePath}`,
          `[${result.mode} ${result.width}x${result.height}]`,
          `PNG ${formatBytes(result.pngBytes)}`,
          `WebP ${formatBytes(result.webpBytes)}`,
          result.cleaned ? "checkerboard cleaned" : "alpha preserved",
        ].join(" | "),
      );
    }

    console.log(`Output: ${job.processedRoot}`);
  }

  if (results.length === 0) {
    console.log("No PNG files found. Add PNG files to a raw image directory and run the command again.");
    return;
  }

  const totalPngBytes = results.reduce(
    (total, result) => total + result.pngBytes,
    0,
  );
  const totalWebpBytes = results.reduce(
    (total, result) => total + result.webpBytes,
    0,
  );

  console.log(
    `Done. PNG: ${formatBytes(totalPngBytes)} | WebP: ${formatBytes(totalWebpBytes)}`,
  );
}

main().catch((error) => {
  console.error(`Image processing failed: ${error.stack ?? error.message}`);
  process.exitCode = 1;
});
