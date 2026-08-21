"use client";

import { useEffect, useState } from "react";

/**
 * Dynamic text replacement (message match).
 *
 * Research is unambiguous that matching the landing page to the exact ad —
 * especially the locale — is the single biggest PPC lever. Point a city-keyword
 * ad group at `…?city=Sandy` and the page greets that parent with their own
 * town instead of a generic region.
 *
 * Renders the `fallback` on the server and for the first client paint, then
 * swaps in the sanitized `?city=` value in an effect — so there's no hydration
 * mismatch and no layout shift beyond a short inline word.
 */
function sanitizeCity(raw: string | null): string | null {
  if (!raw) return null;
  // letters, spaces, hyphens, apostrophes, periods only; keep it short
  const cleaned = raw.replace(/[^\p{L}\s'.-]/gu, "").trim().slice(0, 32);
  if (cleaned.length < 2) return null;
  // Title-case each word so "west jordan" → "West Jordan"
  return cleaned
    .toLowerCase()
    .replace(/\b\p{L}/gu, (c) => c.toUpperCase());
}

export default function CityText({ fallback }: { fallback: string }) {
  const [text, setText] = useState(fallback);
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const city = sanitizeCity(params.get("city"));
      if (city) setText(city);
    } catch {
      /* keep fallback */
    }
  }, []);
  return <>{text}</>;
}
