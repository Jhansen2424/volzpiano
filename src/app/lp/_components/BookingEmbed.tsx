"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "./track";
import { CALENDLY_URL } from "./lpData";

/**
 * Calendly, loaded the moment the booking section approaches the viewport —
 * never on initial paint. The heavy scheduler JS is the biggest threat to LCP
 * and INP on these pages, so we show a lightweight branded placeholder (with
 * reserved height, so no layout shift) and swap in the real iframe via an
 * IntersectionObserver. No extra click for the visitor, no perf hit up front.
 *
 * A manual "Load the calendar" button is the fallback for anyone who reaches it
 * before the observer fires (or in browsers without IO).
 */
export default function BookingEmbed({ height = 820 }: { height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show]);

  useEffect(() => {
    if (show) track("lp_booking_view", {});
  }, [show]);

  return (
    <div
      ref={ref}
      className="relative -mx-6 overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl sm:mx-0"
      style={{ height }}
    >
      {show ? (
        <iframe
          src={CALENDLY_URL}
          title="Schedule your free consultation"
          className="h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setShow(true)}
          className="flex h-full w-full flex-col items-center justify-center gap-3 bg-white text-zinc-500"
          aria-label="Load the scheduling calendar"
        >
          <span className="h-9 w-9 animate-spin rounded-full border-2 border-zinc-200 border-t-accent" />
          <span className="text-sm font-semibold">Loading your calendar…</span>
          <span className="text-xs text-zinc-400 underline underline-offset-2">
            Tap if it doesn&rsquo;t appear
          </span>
        </button>
      )}
    </div>
  );
}
