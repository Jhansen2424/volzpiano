import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import blogSlugs from "./blog-slugs.json";

const blogSlugSet = new Set<string>(blogSlugs);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Strip trailing slash for comparison
  const clean = pathname.endsWith("/") && pathname !== "/"
    ? pathname.slice(0, -1)
    : pathname;

  // Check if this root-level path matches a blog post slug
  // e.g. /at-home-piano-lessons-for-kids-the-ultimate-guide → /blog/at-home-piano-lessons-for-kids-the-ultimate-guide
  const slug = clean.startsWith("/") ? clean.slice(1) : clean;

  if (slug && !slug.includes("/") && blogSlugSet.has(slug)) {
    const url = request.nextUrl.clone();
    url.pathname = `/blog/${slug}`;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  // Only run on paths that could be blog slugs (skip static files, api, _next, etc.)
  matcher: [
    "/((?!_next|api|blog|favicon|blog-images|.*\\.[a-zA-Z]+$).*)",
  ],
};
