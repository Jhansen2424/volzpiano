"""
Generate blog post pages from WordPress CSV export.
Creates page.tsx files for each blog post under src/app/blog/[slug]/page.tsx
and updates the blog index page.
"""

import csv
import os
import re
import html

_PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.environ.get(
    "VOLZ_BLOG_CSV",
    os.path.join(os.path.dirname(_PROJECT_ROOT), "volzpiano-blog-posts.csv"),
)
BLOG_DIR = os.path.join(_PROJECT_ROOT, "src", "app", "blog")
INDEX_PATH = os.path.join(BLOG_DIR, "page.tsx")
SLUGS_JSON_PATH = os.path.join(_PROJECT_ROOT, "src", "blog-slugs.json")
POSTS_JSON_PATH = os.path.join(_PROJECT_ROOT, "src", "content", "blog-posts.json")

# Posts that already have custom hand-built pages — skip them
SKIP_SLUGS = {
    "best-age-to-start-piano-lessons",
    "how-to-motivate-your-child-to-practice-piano",
    "piano-lessons-vs-apps",
}


def clean_wp_content(raw_html: str) -> str:
    """Convert WordPress HTML to clean HTML suitable for dangerouslySetInnerHTML."""
    text = raw_html

    # Remove ALL HTML comments (WordPress block comments, editorial comments, etc.)
    text = re.sub(r"<!--[\s\S]*?-->", "", text)

    # Remove Visual Composer / WPBakery shortcodes like [vc_row ...], [/vc_row], [vc_column_text], etc.
    text = re.sub(r"\[/?vc_\w+[^\]]*\]", "", text)

    # Remove other WordPress shortcodes like [oaicite ...], [Your ...], etc.
    text = re.sub(r"\[oaicite[^\]]*\]", "", text)
    text = re.sub(r"\[Your[^\]]*\]", "", text)

    # Generic: remove any remaining square-bracket shortcodes (but not markdown links)
    # This catches [shortcode attr="val"] and [/shortcode] patterns
    text = re.sub(r"\[/?[a-z_]+(?:\s[^\]]+)?\]", "", text, flags=re.IGNORECASE)

    # Remove empty lines left behind
    text = re.sub(r"\n{3,}", "\n\n", text)

    return text.strip()


def escape_for_jsx_string(s: str) -> str:
    """Escape a string for use inside a JSX template literal or attribute."""
    s = s.replace("\\", "\\\\")
    s = s.replace("`", "\\`")
    s = s.replace("${", "\\${")
    return s


def escape_for_jsx_text(s: str) -> str:
    """Escape a plain-text string for JSX text content."""
    s = html.unescape(s)
    s = s.replace("&", "&amp;")
    s = s.replace("<", "&lt;")
    s = s.replace(">", "&gt;")
    s = s.replace("{", "&#123;")
    s = s.replace("}", "&#125;")
    s = s.replace('"', "&quot;")
    s = s.replace("'", "&apos;")
    return s


PROJECT_ROOT = _PROJECT_ROOT

SITE_URL = "https://volzpiano.com"
MAX_DESCRIPTION_LENGTH = 160  # SEO meta description sweet spot


def escape_for_ts_double_quoted(s: str) -> str:
    """Escape a string for use inside a TypeScript double-quoted string literal.

    Order matters: backslash first, then quotes and control characters.
    """
    s = s.replace("\\", "\\\\")
    s = s.replace('"', '\\"')
    s = s.replace("\n", " ")
    s = s.replace("\r", " ")
    s = s.replace("\t", " ")
    return s


def build_meta_description(raw_excerpt: str, raw_content: str) -> str:
    """Produce a clean SEO meta description capped near MAX_DESCRIPTION_LENGTH.

    Strips HTML tags, shortcodes, and extra whitespace; falls back to the
    first chunk of body content if no excerpt is provided.
    """
    source = raw_excerpt or raw_content or ""
    # Strip shortcodes and HTML tags
    source = re.sub(r"\[/?[a-z_]+(?:\s[^\]]+)?\]", "", source, flags=re.IGNORECASE)
    source = re.sub(r"<!--[\s\S]*?-->", "", source)
    source = re.sub(r"<[^>]+>", "", source)
    source = html.unescape(source)
    source = re.sub(r"\s+", " ", source).strip()

    if len(source) <= MAX_DESCRIPTION_LENGTH:
        return source
    # Truncate at the last word boundary before the limit and add an ellipsis
    cutoff = source.rfind(" ", 0, MAX_DESCRIPTION_LENGTH - 1)
    if cutoff < 80:
        cutoff = MAX_DESCRIPTION_LENGTH - 1
    return source[:cutoff].rstrip(",.;: ") + "…"


def normalize_iso_date(date_str: str) -> str:
    """Best-effort conversion to ISO 8601 (YYYY-MM-DD). Empty string on failure."""
    if not date_str:
        return ""
    try:
        from datetime import datetime
        dt = datetime.strptime(date_str.strip(), "%Y-%m-%d %H:%M:%S")
        return dt.date().isoformat()
    except Exception:
        # Try just a date
        try:
            from datetime import datetime
            dt = datetime.strptime(date_str.strip()[:10], "%Y-%m-%d")
            return dt.date().isoformat()
        except Exception:
            return ""


def make_layout_tsx(
    slug: str,
    title: str,
    excerpt: str,
    content_html: str,
    date_str: str,
    image_path: str | None,
) -> str:
    """Generate a server-side layout.tsx with metadata + Article JSON-LD."""
    description = build_meta_description(excerpt, content_html)
    iso_date = normalize_iso_date(date_str)

    title_ts = escape_for_ts_double_quoted(title)
    desc_ts = escape_for_ts_double_quoted(description)
    slug_ts = escape_for_ts_double_quoted(slug)

    # Image: relative path is fine for OG (metadataBase resolves it),
    # but the JSON-LD object needs an absolute URL
    image_relative = image_path or ""
    image_absolute = f"{SITE_URL}{image_path}" if image_path else ""
    image_ts = escape_for_ts_double_quoted(image_relative)
    image_abs_ts = escape_for_ts_double_quoted(image_absolute)

    image_meta_block = (
        f'    images: ["{image_ts}"],\n' if image_relative else ""
    )
    image_field_for_jsonld = (
        f'  image: "{image_abs_ts}",\n' if image_absolute else ""
    )
    published_field = (
        f'  datePublished: "{iso_date}",\n  dateModified: "{iso_date}",\n'
        if iso_date
        else ""
    )
    og_published_field = (
        f'    publishedTime: "{iso_date}",\n' if iso_date else ""
    )

    return f'''import type {{ Metadata }} from "next";
import {{ serializeJsonLd }} from "@/lib/json-ld";

const TITLE = "{title_ts}";
const DESCRIPTION = "{desc_ts}";
const SLUG = "{slug_ts}";
const CANONICAL = `/${{SLUG}}`;

export const metadata: Metadata = {{
  title: TITLE,
  description: DESCRIPTION,
  alternates: {{ canonical: CANONICAL }},
  openGraph: {{
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    type: "article",
{og_published_field}{image_meta_block}  }},
  twitter: {{
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
{image_meta_block}  }},
}};

const articleJsonLd = {{
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
{image_field_for_jsonld}{published_field}  author: {{
    "@type": "Organization",
    name: "Volz Method Piano Lessons",
    url: "{SITE_URL}",
  }},
  publisher: {{
    "@type": "Organization",
    name: "Volz Method Piano Lessons",
    url: "{SITE_URL}",
    logo: {{
      "@type": "ImageObject",
      url: "{SITE_URL}/icon.svg",
    }},
  }},
  mainEntityOfPage: `{SITE_URL}${{CANONICAL}}`,
}};

export default function Layout({{ children }}: {{ children: React.ReactNode }}) {{
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{{{ __html: serializeJsonLd(articleJsonLd) }}}}
      />
      {{children}}
    </>
  );
}}
'''


def find_local_image(slug: str) -> str | None:
    """Find the downloaded image for a given slug."""
    img_dir = os.path.join(PROJECT_ROOT, "public", "blog-images")
    for ext in (".jpg", ".jpeg", ".png", ".webp", ".gif"):
        path = os.path.join(img_dir, f"{slug}{ext}")
        if os.path.exists(path):
            return f"/blog-images/{slug}{ext}"
    return None


def make_page_tsx(title: str, content_html: str, category: str, date_str: str, image_path: str | None = None) -> str:
    """Generate a page.tsx file for a blog post."""
    cleaned = clean_wp_content(content_html)
    escaped_content = escape_for_jsx_string(cleaned)
    escaped_title = escape_for_jsx_text(title)

    # Format date nicely
    try:
        from datetime import datetime
        dt = datetime.strptime(date_str.strip(), "%Y-%m-%d %H:%M:%S")
        formatted_date = dt.strftime("%B %d, %Y")
    except Exception:
        formatted_date = date_str.strip() if date_str.strip() else ""

    escaped_date = escape_for_jsx_text(formatted_date)
    # Clean up WordPress category hierarchy: "Music Education>Piano Learning" -> "Piano Learning"
    raw_cat = category.split(",")[0].strip() if category else "Blog"
    raw_cat = raw_cat.split("|")[0].strip()  # handle pipe-separated
    if ">" in raw_cat:
        raw_cat = raw_cat.split(">")[-1].strip()
    if raw_cat == "Uncategorized":
        raw_cat = "Blog"
    escaped_category = escape_for_jsx_text(raw_cat)

    escaped_alt = escape_for_jsx_text(f"Featured image for {title}")

    image_jsx = ""
    if image_path:
        image_jsx = f"""
      {{/* Featured Image */}}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-2xl shadow-2xl h-64 sm:h-80 lg:h-96">
            <Image
              src="{image_path}"
              alt="{escaped_alt}"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1024px"
              className="object-cover"
            />
          </div>
        </AnimatedSection>
      </div>"""

    image_import = 'import Image from "next/image";\n' if image_path else ""
    return f'''"use client";

import {{ useEffect, useRef, useState }} from "react";
{image_import}import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";

/* Animated wrapper */
function AnimatedSection({{
  children,
  delay = 0,
  className = "",
}}: {{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}}) {{
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {{
    const observer = new IntersectionObserver(
      ([entry]) => {{
        if (entry.isIntersecting) {{ setVisible(true); observer.disconnect(); }}
      }},
      {{ threshold: 0.1 }}
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }}, []);

  return (
    <div
      ref={{ref}}
      className={{className}}
      style={{{{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease-out ${{delay}}s, transform 0.6s ease-out ${{delay}}s`,
      }}}}
    >
      {{children}}
    </div>
  );
}}

export default function BlogPostPage() {{
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {{
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }}, []);

  const content = `{escaped_content}`;

  return (
    <main>
      {{/* Hero */}}
      <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden bg-zinc-900 pt-24">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[500px] rounded-full opacity-15 blur-[120px]"
          style={{{{ background: "radial-gradient(circle, #6343d4 0%, transparent 70%)" }}}}
        />
        <div className="relative z-[2] text-center px-6">
          <span
            className="inline-block rounded-full bg-brand/20 px-4 py-1 text-xs font-bold uppercase tracking-wider text-brand mb-6"
            style={{{{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(10px)",
              transition: "all 0.5s ease-out 0.1s",
            }}}}
          >
            {escaped_category}
          </span>
          <h1
            className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl max-w-4xl mx-auto"
            style={{{{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s ease-out 0.2s",
              textShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}}}
          >
            {escaped_title}
          </h1>
          {f"""<p
            className="mt-4 text-white/50 text-sm"
            style={{{{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}}}
          >
            {escaped_date}
          </p>""" if formatted_date else ""}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>
{image_jsx}
      {{/* Content */}}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 sm:px-12">
          <AnimatedSection>
            <article
              className="prose prose-zinc prose-lg max-w-none
                prose-headings:font-extrabold prose-headings:text-zinc-900
                prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-l-4 prose-h2:border-brand prose-h2:pl-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-zinc-600 prose-p:leading-relaxed
                prose-a:text-brand prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-zinc-800
                prose-ul:text-zinc-600 prose-ol:text-zinc-600
                prose-li:marker:text-brand
                prose-img:rounded-xl prose-img:shadow-md"
              dangerouslySetInnerHTML={{{{ __html: DOMPurify.sanitize(content) }}}}
            />
          </AnimatedSection>

          {{/* Back link */}}
          <AnimatedSection delay={{0.2}} className="mt-16 pt-8 border-t border-zinc-200">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline"
            >
              <svg className="h-4 w-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={{2.5}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Back to all articles
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}}
'''


def make_index_tsx(all_posts: list[dict]) -> str:
    """Generate the blog index page.tsx with all posts."""
    posts_js_entries = []
    for p in all_posts:
        title_escaped = p["title"].replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ")
        excerpt_escaped = p["excerpt"].replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ")
        tag = p["category"].split(",")[0].strip() if p["category"] else "Blog"
        tag = tag.split("|")[0].strip()
        if ">" in tag:
            tag = tag.split(">")[-1].strip()
        if tag == "Uncategorized":
            tag = "Blog"
        tag_escaped = tag.replace("\\", "\\\\").replace('"', '\\"')
        image_escaped = p.get("image", "").replace("\\", "\\\\").replace('"', '\\"')
        posts_js_entries.append(
            f'  {{\n'
            f'    slug: "{p["slug"]}",\n'
            f'    title: "{title_escaped}",\n'
            f'    excerpt:\n'
            f'      "{excerpt_escaped}",\n'
            f'    tag: "{tag_escaped}",\n'
            f'    image: "{image_escaped}",\n'
            f'  }}'
        )

    posts_js = ",\n".join(posts_js_entries)

    return f'''"use client";

import Image from "next/image";
import Link from "next/link";
import {{ useEffect, useRef, useState }} from "react";

/* ═══════════════════════════════════════════
   Blog Posts Data
   ═══════════════════════════════════════════ */
const posts = [
{posts_js}
];

/* ═══════════════════════════════════════════
   Post Card
   ═══════════════════════════════════════════ */
function PostCard({{
  post,
  index,
}}: {{
  post: (typeof posts)[number];
  index: number;
}}) {{
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {{
    const observer = new IntersectionObserver(
      ([entry]) => {{
        if (entry.isIntersecting) {{
          setVisible(true);
          observer.disconnect();
        }}
      }},
      {{ threshold: 0.15 }}
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }}, []);

  return (
    <div
      ref={{ref}}
      style={{{{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `all 0.6s ease-out ${{index * 0.12}}s`,
      }}}}
    >
      <Link
        href={{`/${{post.slug}}`}}
        className="group block rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        {{post.image && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={{post.image}}
              alt={{post.title}}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}}
        <div className="p-8">
        <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
          {{post.tag}}
        </span>
        <h2 className="mt-4 text-xl font-extrabold text-zinc-900 sm:text-2xl group-hover:text-brand transition-colors duration-200">
          {{post.title}}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-500 sm:text-base line-clamp-3">
          {{post.excerpt}}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand">
          Read article
          <svg
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={{2.5}}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </span>
        </div>
      </Link>
    </div>
  );
}}

/* ═══════════════════════════════════════════
   Page
   ═══════════════════════════════════════════ */
const POSTS_PER_PAGE = 12;

export default function BlogIndexPage() {{
  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {{
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }}, []);

  const allTags = Array.from(new Set(posts.map((p) => p.tag))).sort();

  const filtered = posts.filter((post) => {{
    const matchesSearch =
      !searchTerm ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || post.tag === selectedTag;
    return matchesSearch && matchesTag;
  }});

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paged = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  // Reset to page 1 whenever the filter inputs change. Derived during render
  // (React 19 guidance) instead of an effect — avoids cascading rerenders.
  const [prevFilters, setPrevFilters] = useState({{ searchTerm, selectedTag }});
  if (
    prevFilters.searchTerm !== searchTerm ||
    prevFilters.selectedTag !== selectedTag
  ) {{
    setPage(1);
    setPrevFilters({{ searchTerm, selectedTag }});
  }}

  const goToPage = (p: number) => {{
    setPage(p);
    gridRef.current?.scrollIntoView({{ behavior: "smooth", block: "start" }});
  }};

  return (
    <main>
      {{/* ── Hero ── */}}
      <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden bg-zinc-900 pt-24">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[500px] rounded-full opacity-15 blur-[120px]"
          style={{{{
            background: "radial-gradient(circle, #6343d4 0%, transparent 70%)",
          }}}}
        />

        <div className="relative z-[2] text-center px-6">
          <h1
            className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl"
            style={{{{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s ease-out 0.2s",
              textShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}}}
          >
            The Volz <span className="text-brand">Blog</span>
          </h1>
          <p
            className="mt-6 mx-auto max-w-2xl text-lg text-white/60 sm:text-xl"
            style={{{{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease-out 0.5s",
            }}}}
          >
            Tips, insights, and guides for parents navigating their child&apos;s
            piano journey.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {{/* ── Filter bar ── */}}
      <section className="bg-white pt-12 pb-4">
        <div className="mx-auto max-w-5xl px-6 sm:px-12">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <input
              type="text"
              placeholder="Search articles..."
              value={{searchTerm}}
              onChange={{(e) => setSearchTerm(e.target.value)}}
              className="w-full sm:w-72 rounded-lg border border-zinc-200 px-4 py-2 text-sm text-zinc-700 placeholder:text-zinc-400 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
            <div className="flex flex-wrap gap-2">
              <button
                onClick={{() => setSelectedTag(null)}}
                className={{`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors ${{
                  !selectedTag
                    ? "bg-brand text-white"
                    : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
                }}`}}
              >
                All
              </button>
              {{allTags.map((tag) => (
                <button
                  key={{tag}}
                  onClick={{() => setSelectedTag(tag === selectedTag ? null : tag)}}
                  className={{`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors ${{
                    tag === selectedTag
                      ? "bg-brand text-white"
                      : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
                  }}`}}
                >
                  {{tag}}
                </button>
              ))}}
            </div>
          </div>
        </div>
      </section>

      {{/* ── Posts Grid ── */}}
      <section ref={{gridRef}} className="bg-white py-8 sm:py-16 scroll-mt-8">
        <div className="mx-auto max-w-5xl px-6 sm:px-12">
          {{filtered.length === 0 && (
            <p className="text-center text-zinc-400 py-12">No articles found.</p>
          )}}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {{paged.map((post, i) => (
              <PostCard key={{post.slug}} post={{post}} index={{i}} />
            ))}}
          </div>

          {{totalPages > 1 && (
            <nav className="mt-12 flex items-center justify-center gap-2">
              <button
                onClick={{() => goToPage(page - 1)}}
                disabled={{page === 1}}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-zinc-500 transition-colors hover:bg-zinc-100 disabled:opacity-30 disabled:pointer-events-none"
              >
                ← Prev
              </button>
              {{Array.from({{ length: totalPages }}, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
                .reduce<(number | "dots")[]>((acc, p, idx, arr) => {{
                  if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("dots");
                  acc.push(p);
                  return acc;
                }}, [])
                .map((item, idx) =>
                  item === "dots" ? (
                    <span key={{`dots-${{idx}}`}} className="px-1 text-zinc-300">…</span>
                  ) : (
                    <button
                      key={{item}}
                      onClick={{() => goToPage(item as number)}}
                      className={{`min-w-[2.25rem] rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${{
                        item === page
                          ? "bg-brand text-white shadow-sm"
                          : "text-zinc-500 hover:bg-zinc-100"
                      }}`}}
                    >
                      {{item}}
                    </button>
                  )
                )}}
              <button
                onClick={{() => goToPage(page + 1)}}
                disabled={{page === totalPages}}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-zinc-500 transition-colors hover:bg-zinc-100 disabled:opacity-30 disabled:pointer-events-none"
              >
                Next →
              </button>
            </nav>
          )}}
        </div>
      </section>
    </main>
  );
}}
'''


def main():
    # Read CSV
    rows = []
    with open(CSV_PATH, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            slug = row.get("Slug", "").strip()
            status = row.get("Status", "").strip().lower()
            if not slug or status != "publish":
                continue
            rows.append(row)

    print(f"Found {len(rows)} published posts in CSV")

    # Generate individual post pages
    created = 0
    skipped = 0
    all_posts_for_index = []
    all_posts_for_dynamic = []

    for row in rows:
        slug = row["Slug"].strip()
        title = html.unescape(row.get("Title", "").strip())
        content = row.get("Content", "")
        excerpt_raw = html.unescape(row.get("Excerpt", "").strip())
        category = row.get("Categories", "Blog").strip()
        date_str = row.get("Date", "").strip()

        # Build excerpt: use CSV excerpt, or generate from content
        # Always strip shortcodes from excerpt
        excerpt_raw = re.sub(r"\[/?[a-z_]+(?:\s[^\]]+)?\]", "", excerpt_raw, flags=re.IGNORECASE)
        excerpt_raw = excerpt_raw.strip()

        if not excerpt_raw:
            # Strip HTML tags and shortcodes to get plain text excerpt
            plain = re.sub(r"\[/?[a-z_]+(?:\s[^\]]+)?\]", "", content, flags=re.IGNORECASE)
            plain = re.sub(r"<[^>]+>", "", plain)
            plain = re.sub(r"<!--[^>]*-->", "", plain)
            plain = html.unescape(plain).strip()
            plain = re.sub(r"\s+", " ", plain)
            excerpt_raw = plain[:200].rsplit(" ", 1)[0] + "..." if len(plain) > 200 else plain

        local_image = find_local_image(slug)

        # Format display date once
        try:
            from datetime import datetime
            dt = datetime.strptime(date_str.strip(), "%Y-%m-%d %H:%M:%S")
            formatted_date = dt.strftime("%B %d, %Y")
        except Exception:
            formatted_date = date_str.strip() if date_str.strip() else ""

        # Resolve category for tag display
        raw_cat = category.split(",")[0].strip() if category else "Blog"
        raw_cat = raw_cat.split("|")[0].strip()
        if ">" in raw_cat:
            raw_cat = raw_cat.split(">")[-1].strip()
        if raw_cat == "Uncategorized":
            raw_cat = "Blog"

        all_posts_for_index.append({
            "slug": slug,
            "title": title,
            "excerpt": excerpt_raw,
            "category": category,
            "date": date_str,
            "image": local_image or "",
        })

        # Hand-built posts have their own page.tsx + layout.tsx checked into
        # the repo. Don't shadow them via the dynamic route or the JSON.
        if slug in SKIP_SLUGS:
            skipped += 1
            continue

        all_posts_for_dynamic.append({
            "slug": slug,
            "title": title,
            "description": build_meta_description(excerpt_raw, content),
            "category": raw_cat,
            "date": date_str,
            "dateIso": normalize_iso_date(date_str),
            "formattedDate": formatted_date,
            "image": local_image or "",
            "content": clean_wp_content(content),
        })

        created += 1

    # Sort posts by date descending (newest first)
    all_posts_for_index.sort(key=lambda p: p.get("date", ""), reverse=True)
    all_posts_for_dynamic.sort(key=lambda p: p.get("date", ""), reverse=True)

    # Generate index page
    index_content = make_index_tsx(all_posts_for_index)
    with open(INDEX_PATH, "w", encoding="utf-8") as f:
        f.write(index_content)

    # Write the consolidated content JSON consumed by the dynamic [slug] route
    import json
    os.makedirs(os.path.dirname(POSTS_JSON_PATH), exist_ok=True)
    with open(POSTS_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(all_posts_for_dynamic, f, ensure_ascii=False)

    # Regenerate blog-slugs.json so the sitemap stays in sync. Each entry is
    # { slug, date } so the sitemap can emit a real lastModified date.
    entries = [
        {"slug": p["slug"], "date": normalize_iso_date(p.get("date", ""))}
        for p in all_posts_for_index
    ]
    seen = {e["slug"] for e in entries}
    for hand_slug in SKIP_SLUGS:
        if hand_slug in seen:
            continue
        if os.path.isdir(os.path.join(BLOG_DIR, hand_slug)):
            entries.append({"slug": hand_slug, "date": ""})
            seen.add(hand_slug)
    with open(SLUGS_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(entries, f)

    print(f"Wrote {created} posts to blog-posts.json (dynamic route)")
    print(f"Skipped {skipped} hand-built posts")
    print(f"Updated blog index with {len(all_posts_for_index)} posts")
    print(f"Updated blog-slugs.json with {len(entries)} slugs")


if __name__ == "__main__":
    main()
