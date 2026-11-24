"""
Submit site URLs to IndexNow (consumed by Bing, Yandex, Seznam, Naver).

Usage:
    py scripts/submit-indexnow.py            # submit every URL in the live sitemap
    py scripts/submit-indexnow.py URL [URL2] # submit specific URLs only

The IndexNow key file must be publicly served at:
    https://www.volzpiano.com/<KEY>.txt
(That file lives in public/ and is deployed with the site.)

Run this after deploying new content (new blog posts, new pages) to get
them indexed by Bing quickly. ChatGPT's search leans on Bing's index, so
this matters for AI answers as well as Bing itself. Google does not use
IndexNow; it discovers changes through the sitemap and normal crawling.
"""

import json
import re
import sys
import urllib.request
from urllib.parse import urlparse

SITE_URL = "https://www.volzpiano.com"
# IndexNow drops URLs whose host differs from this, so it must be the exact
# host the URLs use (www included), not the bare domain.
HOST = urlparse(SITE_URL).netloc
INDEXNOW_KEY = "7cd660935209bac4d119e59a2680b8c6"
INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"


def collect_all_urls() -> list[str]:
    """Every URL in the deployed sitemap, so this never drifts from the site.

    Run it after the deploy finishes: it reads what is live, not the repo.
    """
    with urllib.request.urlopen(f"{SITE_URL}/sitemap.xml", timeout=30) as resp:
        xml = resp.read().decode("utf-8")
    urls = re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", xml)
    return [u for u in urls if urlparse(u).netloc == HOST]


def submit(urls: list[str]) -> None:
    # IndexNow accepts up to 10,000 URLs per request
    payload = {
        "host": HOST,
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
        print(f"Submitting all {len(urls)} URLs from the live sitemap...")
    if not urls:
        sys.exit("No URLs to submit.")
    submit(urls)
