#!/usr/bin/env node
import { readdir, rename, stat, unlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import sharp from "sharp";

const publicFotosDir = path.resolve("public/fotos");
const supportedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const maxDimension = 1600;
const jpegQuality = 78;
const webpQuality = 80;
const minSavingsBytes = 2048;

async function pathExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

async function collectImages(directory) {
  if (!(await pathExists(directory))) {
    return [];
  }

  const entries = await readdir(directory, { withFileTypes: true });
  const images = [];

  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        images.push(...(await collectImages(entryPath)));
        return;
      }

      if (entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase())) {
        images.push(entryPath);
      }
    }),
  );

  return images;
}

function optimizerForExtension(image, extension) {
  const resized = image.rotate().resize({
    width: maxDimension,
    height: maxDimension,
    fit: "inside",
    withoutEnlargement: true,
  });

  if (extension === ".jpg" || extension === ".jpeg") {
    return resized.jpeg({ quality: jpegQuality, mozjpeg: true, progressive: true });
  }

  if (extension === ".webp") {
    return resized.webp({ quality: webpQuality });
  }

  if (extension === ".png") {
    return resized.png({ compressionLevel: 9, palette: true });
  }

  return resized;
}

async function optimizeFile(filePath) {
  const before = (await stat(filePath)).size;
  const extension = path.extname(filePath).toLowerCase();
  const temporaryPath = path.join(
    tmpdir(),
    `fures-image-${process.pid}-${Date.now()}-${Math.random().toString(16).slice(2)}${extension}`,
  );

  try {
    await optimizerForExtension(sharp(filePath, { failOn: "none" }), extension).toFile(temporaryPath);
    const after = (await stat(temporaryPath)).size;

    if (after + minSavingsBytes < before) {
      await rename(temporaryPath, filePath);
      return { before, after, changed: true };
    }

    await unlink(temporaryPath);
    return { before, after: before, changed: false };
  } catch (error) {
    await unlink(temporaryPath).catch(() => {});
    console.warn(`[optimize-images] skipped ${filePath}: ${error.message}`);
    return { before, after: before, changed: false };
  }
}

async function main() {
  if (!(await pathExists(publicFotosDir))) {
    console.log(`[optimize-images] ${publicFotosDir} not found; nothing to optimize.`);
    return;
  }

  const images = await collectImages(publicFotosDir);
  let beforeTotal = 0;
  let afterTotal = 0;
  let changed = 0;

  for (const imagePath of images) {
    const result = await optimizeFile(imagePath);
    beforeTotal += result.before;
    afterTotal += result.after;
    if (result.changed) {
      changed += 1;
    }
  }

  const toMb = (bytes) => (bytes / 1048576).toFixed(2);
  console.log(
    `[optimize-images] processed=${images.length} changed=${changed} ` +
      `before=${toMb(beforeTotal)}MB after=${toMb(afterTotal)}MB saved=${toMb(beforeTotal - afterTotal)}MB`,
  );
}

await main();
