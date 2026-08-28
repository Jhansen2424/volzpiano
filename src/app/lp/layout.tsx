import type { Metadata } from "next";
import { ChipIcon, FooterLinks } from "./_components/ui";

/**
 * Layout for all PPC landing pages.
 *
 * - noindex/nofollow: paid landing pages should never compete with organic
 *   results or dilute ranking signals. They're reached via ad clicks only.
 * - Minimal chrome: a prominent Utah Fits All banner, a slim top bar
 *   (wordmark + book CTA) and a small footer. The site Navbar/Footer are
 *   suppressed on /lp (see Navbar/Footer).
 * - A sticky bottom "Book Free Call" bar on mobile keeps the one conversion
 *   action one tap away — most paid traffic is mobile.
 */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream pb-20 lg:pb-0">
      {/* ── Prominent Utah Fits All Scholarship banner ──
          TODO: when the client provides the official Utah Fits All logo
          (PNG/SVG), drop it in beside the text here (e.g. an <img> before the
          label) to feature the actual logo. */}
      <div className="w-full bg-accent text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2.5 px-4 py-2.5 text-center">
          <ChipIcon name="shield" className="h-5 w-5 shrink-0" />
          <span className="text-sm font-extrabold uppercase tracking-wide sm:text-base">
            We proudly accept the Utah Fits All Scholarship
          </span>
        </div>
      </div>

      {/* Slim top bar */}
      <header className="border-b border-[#ecdfce] bg-cream/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
          <span className="text-lg font-extrabold tracking-tight text-zinc-900">
            Volz<span className="text-accent">Piano</span>
          </span>
          <a
            href="#book"
            data-cta="header"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:text-accent-hover"
          >
            Book a free call
            <ChipIcon name="arrow" className="h-4 w-4" />
          </a>
        </div>
      </header>

      {children}

      {/* Minimal footer */}
      <footer className="border-t border-[#ecdfce] bg-cream py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-center">
          <span className="text-sm font-bold text-zinc-700">
            Volz Method Piano Lessons · In-home lessons across Utah
          </span>
          <FooterLinks />
          <span className="text-xs text-zinc-400">
            &copy; {new Date().getFullYear()} Volz Method Piano Lessons
          </span>
        </div>
      </footer>

      {/* Sticky mobile CTA bar — zero JS, anchor link only */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#ecdfce] bg-cream/95 backdrop-blur-sm shadow-[0_-4px_20px_rgba(120,80,45,0.10)] lg:hidden">
        <div className="mx-auto max-w-md px-4 py-3">
          <a
            href="#book"
            data-cta="sticky_bar"
            className="block rounded-full bg-cta px-5 py-3 text-center text-sm font-bold text-white shadow-md"
          >
            Book Free Call
          </a>
        </div>
      </div>
    </div>
  );
}
