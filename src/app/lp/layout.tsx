import type { Metadata } from "next";
import { PHONE_DISPLAY, PHONE_HREF } from "./_components/lpData";
import { ChipIcon, FooterLinks } from "./_components/ui";

/**
 * Layout for all PPC landing pages.
 *
 * - noindex/nofollow: paid landing pages should never compete with organic
 *   results or dilute ranking signals. They're reached via ad clicks only.
 * - Minimal chrome: a slim top bar (wordmark + tap-to-call) and a small
 *   footer. The site Navbar/Footer are suppressed on /lp (see Navbar/Footer).
 * - A sticky bottom CTA bar on mobile keeps "Book Free Call" + "Call" one tap
 *   away at all times — most paid traffic is mobile and the conversion is a
 *   phone consult.
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
    <div className="min-h-screen bg-white pb-20 lg:pb-0">
      {/* Slim top bar */}
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
          <span className="text-lg font-extrabold tracking-tight text-zinc-900">
            Volz<span className="text-accent">Piano</span>
          </span>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 text-sm font-bold text-zinc-800 hover:text-accent"
          >
            <ChipIcon name="phone" className="h-4 w-4 text-accent" />
            <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </header>

      {children}

      {/* Minimal footer */}
      <footer className="border-t border-zinc-200 bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-center">
          <span className="text-sm font-bold text-zinc-700">
            Volz Method Piano Lessons · In-home lessons across Utah &amp; Idaho
          </span>
          <FooterLinks />
          <span className="text-xs text-zinc-400">
            &copy; {new Date().getFullYear()} Volz Method Piano Lessons
          </span>
        </div>
      </footer>

      {/* Sticky mobile CTA bar — zero JS, anchor + tel links only */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-white/95 backdrop-blur-sm shadow-[0_-4px_20px_rgba(0,0,0,0.08)] lg:hidden">
        <div className="mx-auto flex max-w-md items-center gap-3 px-4 py-3">
          <a
            href="#book"
            data-cta="sticky_bar"
            className="flex-1 rounded-full bg-cta px-5 py-3 text-center text-sm font-bold text-white shadow-md"
          >
            Book Free Call
          </a>
          <a
            href={PHONE_HREF}
            data-cta="sticky_bar"
            aria-label={`Call ${PHONE_DISPLAY}`}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-accent text-accent"
          >
            <ChipIcon name="phone" className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
