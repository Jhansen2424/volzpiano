"""
Submit all site URLs to IndexNow (consumed by Bing, Yandex, Seznam, Naver).

Usage:
    py scripts/submit-indexnow.py            # submit every URL in the sitemap
    py scripts/submit-indexnow.py URL [URL2] # submit specific URLs only

The IndexNow key file must be publicly served at:
    https://volzpiano.com/<KEY>.txt
(That file lives in public/ and is deployed with the site.)

Run this after deploying new content (new blog posts, new pages) to get
them indexed by Bing quickly. Google does not use IndexNow — Google
discovers changes through the sitemap + normal crawling.
"""

import json
import os
import sys
import urllib.request
from datetime import datetime, timezone

SITE_URL = "https://volzpiano.com"
INDEXNOW_KEY = "7cd660935209bac4d119e59a2680b8c6"
INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"

_PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def collect_all_urls() -> list[str]:
    """Mirror the sitemap.ts logic: static routes + published blog posts."""
    static_routes = [
        "/",
        "/volz-method-best-piano-teaching-medthod",
        "/pricing",
        "/core-values",
        "/schedule-call",
        "/testimonials",
        "/digital-piano",
        "/blog",
        "/about-us",
        "/contact-us",
        "/teaching-positions",
        "/jobs",
        "/privacy-policy-2",
    ]

    with open(
        os.path.join(_PROJECT_ROOT, "src", "blog-slugs.json"), encoding="utf-8"
    ) as f:
        blog_entries = json.load(f)
    with open(
        os.path.join(_PROJECT_ROOT, "src", "content", "blog-posts.json"),
        encoding="utf-8",
    ) as f:
        csv_posts = json.load(f)
    with open(
        os.path.join(_PROJECT_ROOT, "src", "content", "blog-posts-extra.json"),
        encoding="utf-8",
    ) as f:
        extra_posts = json.load(f)

    now = datetime.now(timezone.utc)

    def is_published(post: dict) -> bool:
        pd = post.get("publishDate")
        if not pd:
            return True
        try:
            d = datetime.fromisoformat(pd.replace("Z", "+00:00"))
            return d <= now
        except ValueError:
            return True

    slugs: set[str] = set()
    for entry in blog_entries:
        slugs.add(entry["slug"])
    for post in csv_posts + extra_posts:
        if is_published(post):
            slugs.add(post["slug"])
        else:
            slugs.discard(post["slug"])  # never submit future-dated posts

    urls = [f"{SITE_URL}{route}" for route in static_routes]
    urls += [f"{SITE_URL}/{slug}" for slug in sorted(slugs)]
    return urls


def submit(urls: list[str]) -> None:
    # IndexNow accepts up to 10,000 URLs per request
    payload = {
        "host": "volzpiano.com",
        "key": INDEXNOW_KEY,
        "keyLocation": f"{SITE_URL}/{INDEXNOW_KEY}.txt",
        "urlList": urls,
    }
    body = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        INDEXNOW_ENDPOINT,
        data=body,
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            print(f"IndexNow response: HTTP {resp.status}")
            if resp.status in (200, 202):
                print(f"Submitted {len(urls)} URLs successfully.")
            else:
                print(resp.read().decode("utf-8", errors="replace"))
    except urllib.error.HTTPError as e:
        print(f"IndexNow error: HTTP {e.code}")
        print(e.read().decode("utf-8", errors="replace"))
        sys.exit(1)


if __name__ == "__main__":
    if len(sys.argv) > 1:
        urls = sys.argv[1:]
        print(f"Submitting {len(urls)} specific URL(s)...")
    else:
        urls = collect_all_urls()
        print(f"Submitting all {len(urls)} site URLs...")
    submit(urls)
