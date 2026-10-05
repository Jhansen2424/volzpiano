import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

/**
 * Site 404. Replaces Next's default (which had no main landmark or site
 * styling) with an accessible page that helps the visitor get back on track.
 */
export default function NotFound() {
  return (
    <main className="bg-zinc-900 pt-40 pb-24 text-center">
      <div className="mx-auto max-w-2xl px-6">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">Error 404</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          We couldn&rsquo;t find that page
        </h1>
        <p className="mt-6 text-lg text-white/75">
          The page may have moved, or the address may have a typo. Here are a few
          good places to pick up from:
        </p>
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <li>
            <Link
              href="/"
              className="inline-block rounded-full bg-cta px-7 py-3 font-bold text-white transition-colors hover:bg-cta-hover"
            >
              Go to the homepage
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="inline-block rounded-full border-2 border-white/30 px-7 py-3 font-bold text-white transition-colors hover:border-white"
            >
              Read the blog
            </Link>
          </li>
          <li>
            <Link
              href="/schedule-call"
              className="inline-block rounded-full border-2 border-white/30 px-7 py-3 font-bold text-white transition-colors hover:border-white"
            >
              Schedule a free call
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
