/**
 * Minimal, dependency-free event tracking for the landing pages.
 *
 * Everything pushes to `window.dataLayer` (the GTM/GA4 convention). If no tag
 * manager is installed yet it's a harmless no-op array — but the moment a GTM
 * container or GA4 is added, every micro-conversion below starts reporting with
 * zero extra work. That's the point: these pages are instrumented so the team
 * can see WHERE visitors engage (quiz, keyboard, area check) and where they
 * drop, not just whether a booking happened at the very end.
 *
 * Safe to import from client components; every call guards `window`.
 */
type Props = Record<string, unknown>;

export function track(event: string, props: Props = {}): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...props });
}

/** Fire an event only the first time for a given key (per page load). */
const fired = new Set<string>();
export function trackOnce(key: string, event: string, props: Props = {}): void {
  if (fired.has(key)) return;
  fired.add(key);
  track(event, props);
}
