/**
 * Downscale oversized source images in public/ to the largest width Next.js
 * will ever serve (3840px, the default deviceSizes ceiling).
 *
 * JPEGs are re-encoded at quality 95 — deliberately high, because next/image
 * compresses again on delivery and stacking two lossy passes is what produces
 * visible artifacts. PNGs are only resized and re-deflated losslessly.
 *
 * A file is left completely alone unless it is genuinely oversized, and a
 * result is discarded if it somehow came out bigger than the original.
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const MAX_WIDTH = 3840;
const SIZE_TRIGGER = 2 * 1024 * 1024; // 2 MB
const DRY = process.argv.includes("--dry");

(async () => {
  const files = [];
  (function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (/\.(jpe?g|png)$/i.test(entry.name)) files.push(p);
    }
  })("public");

  let before = 0;
  let after = 0;
  let rewritten = 0;
  const report = [];

  for (const file of files) {
    const original = fs.statSync(file).size;
    before += original;

    // Read the bytes up front and work from the buffer. Passing sharp a path
    // keeps the source file open, and Windows then refuses the write-back to
    // that same path with UNKNOWN/EBUSY.
    const input = fs.readFileSync(file);

    const meta = await sharp(input).metadata();
    const oversized = meta.width > MAX_WIDTH || original > SIZE_TRIGGER;
    if (!oversized) {
      after += original;
      continue;
    }

    const isPng = /\.png$/i.test(file);
    let pipeline = sharp(input).resize({
      width: Math.min(meta.width, MAX_WIDTH),
      withoutEnlargement: true,
    });
    pipeline = isPng
      ? pipeline.png({ compressionLevel: 9 }) // lossless
      : pipeline.jpeg({ quality: 95, mozjpeg: true });

    const buf = await pipeline.toBuffer();

    // Never make a file worse.
    if (buf.length >= original) {
      after += original;
      report.push([file, original, original, meta.width, meta.width, "skipped (no gain)"]);
      continue;
    }

    const outMeta = await sharp(buf).metadata();
    if (!DRY) fs.writeFileSync(file, buf);
    after += buf.length;
    rewritten++;
    report.push([file, original, buf.length, meta.width, outMeta.width, ""]);
  }

  console.log(DRY ? "== DRY RUN ==" : "== WRITING ==");
  for (const [f, o, n, w, nw, note] of report) {
    console.log(
      "  " +
        path.basename(f).padEnd(26) +
        `${w}px -> ${nw}px`.padEnd(18) +
        `${(o / 1048576).toFixed(2)} MB -> ${(n / 1048576).toFixed(2)} MB ` +
        note
    );
  }
  console.log("");
  console.log("files scanned :", files.length);
  console.log("files written :", rewritten);
  console.log(
    "public/ total :",
    (before / 1048576).toFixed(1),
    "MB ->",
    (after / 1048576).toFixed(1),
    "MB  (saved " + ((before - after) / 1048576).toFixed(1) + " MB)"
  );
})();
