/**
 * Tiny presentational helpers shared across landing pages. All server
 * components — no client JS — so landing pages stay fast (better Ads Quality
 * Score and lower bounce).
 */
import Link from "next/link";
import { CALENDLY_URL, PHONE_DISPLAY, PHONE_HREF } from "./lpData";

/** Five amber stars — the brand's review accent color. */
export function Stars({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`${className} text-brand`} fill="currentColor" viewBox="0 0 20 20" aria-hidden>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function ChipIcon({ name, className = "h-4 w-4" }: { name: string; className?: string }) {
  const common = { className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, "aria-hidden": true } as const;
  switch (name) {
    case "star":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    case "home":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common} strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common} strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      );
    default:
      return null;
  }
}

/**
 * Primary CTA — an in-page anchor that scrolls to the booking widget (#book).
 * Using an anchor (not a router link) keeps the visitor on the page and needs
 * zero JS. `size` controls padding.
 */
export function BookButton({
  label = "Book My Free Call",
  size = "lg",
  className = "",
}: {
  label?: string;
  size?: "lg" | "md";
  className?: string;
}) {
  const pad = size === "lg" ? "px-9 py-4 text-lg" : "px-6 py-3 text-base";
  return (
    <a
      href="#book"
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-cta ${pad} font-bold text-white shadow-xl shadow-cta/20 transition-all duration-300 hover:bg-cta-hover hover:-translate-y-0.5 hover:shadow-2xl ${className}`}
    >
      {label}
      <ChipIcon name="arrow" className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
    </a>
  );
}

/** Secondary path: tap-to-call. The conversion here is literally a phone
 *  consult, so a visible phone number is a real second conversion route. */
export function CallLink({ className = "", muted = false }: { className?: string; muted?: boolean }) {
  return (
    <a
      href={PHONE_HREF}
      className={`inline-flex items-center gap-2 font-semibold transition-colors ${
        muted ? "text-zinc-500 hover:text-zinc-800" : "text-white/80 hover:text-white"
      } ${className}`}
    >
      <ChipIcon name="phone" className="h-4 w-4" />
      Call {PHONE_DISPLAY}
    </a>
  );
}

/** Small helper so pages don't import Link/CALENDLY directly for the privacy link. */
export function FooterLinks() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-zinc-400">
      <Link href="/privacy-policy-2" className="hover:text-zinc-600">
        Privacy Policy
      </Link>
      <span aria-hidden>·</span>
      <a href={CALENDLY_URL} className="hover:text-zinc-600" target="_blank" rel="noopener noreferrer">
        Book a call
      </a>
    </div>
  );
}
