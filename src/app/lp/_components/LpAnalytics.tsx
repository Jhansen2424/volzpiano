"use client";

import { useEffect } from "react";
import { track } from "./track";

/**
 * Page-level analytics for a landing-page variant. Mounts once per page and:
 *  - records the variant view (replaces the old inline dataLayer script),
 *  - reports scroll-depth milestones (25/50/75/100%),
 *  - reports engaged time when the visitor leaves.
 *
 * This is what turns the pages into a measurable experiment rather than a
 * black box — you can see how far each angle pulls people down the page.
 */
export default function LpAnalytics({
  variant,
  name,
}: {
  variant: string;
  name: string;
}) {
  useEffect(() => {
    track("lp_view", { lp_variant: variant, lp_name: name });

    const start = Date.now();
    const milestones = [25, 50, 75, 100];
    let hit = 0;

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      if (scrollable <= 0) return;
      const pct = Math.min(100, Math.round((doc.scrollTop / scrollable) * 100));
      while (hit < milestones.length && pct >= milestones[hit]) {
        track("lp_scroll", { lp_variant: variant, depth: milestones[hit] });
        hit++;
      }
    };

    const onLeave = () => {
      const seconds = Math.round((Date.now() - start) / 1000);
      track("lp_engaged_time", { lp_variant: variant, seconds });
    };

    // One delegated listener captures every booking/call CTA on the page —
    // hero, sticky bar, offer card, and each interactive module — reading its
    // `data-cta` source so we can see which element drives the conversion.
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const a = target?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const isBook = href === "#book";
      const isCall = href.startsWith("tel:");
      if (!isBook && !isCall) return;
      track("lp_cta_click", {
        lp_variant: variant,
        kind: isCall ? "call" : "book",
        source: a.getAttribute("data-cta") || "generic",
        detail: a.getAttribute("data-cta-detail") || undefined,
      });
    };

    const onVis = () => {
      if (document.visibilityState === "hidden") onLeave();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      document.removeEventListener("click", onClick);
    };
  }, [variant, name]);

  return null;
}
