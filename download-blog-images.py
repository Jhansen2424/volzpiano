"""
Download all blog post featured images from WordPress to public/blog-images/.
Filenames are based on the post slug for easy mapping.
"""

import csv
import os
import urllib.request
import urllib.error
from pathlib import Path

CSV_PATH = "c:/Users/Hanse/Desktop/volzpiano-blog-posts.csv"
OUTPUT_DIR = "c:/Users/Hanse/Desktop/volzpiano/public/blog-images"

os.makedirs(OUTPUT_DIR, exist_ok=True)

downloaded = 0
failed = 0
skipped = 0

with open(CSV_PATH, encoding="utf-8-sig") as f:
    reader = csv.DictReader(f)
    rows = [r for r in reader if r.get("Status", "").strip().lower() == "publish"]

print(f"Processing {len(rows)} published posts...")

for row in rows:
    slug = row["Slug"].strip()
    image_url = row.get("Image URL", "").strip()

    if not image_url:
        print(f"  SKIP (no URL): {slug}")
        skipped += 1
        continue

    # Determine file extension from URL
    ext = Path(image_url).suffix.lower()
    if ext not in (".jpg", ".jpeg", ".png", ".webp", ".gif"):
        ext = ".jpg"  # default

    out_path = os.path.join(OUTPUT_DIR, f"{slug}{ext}")

    if os.path.exists(out_path):
        skipped += 1
        continue

    try:
        req = urllib.request.Request(image_url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
        with open(out_path, "wb") as img_file:
            img_file.write(data)
        downloaded += 1
        print(f"  OK: {slug}{ext}")
    except Exception as e:
        print(f"  FAIL: {slug} - {e}")
        failed += 1

print(f"\nDone: {downloaded} downloaded, {skipped} skipped, {failed} failed")
