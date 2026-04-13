"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref + boolean tuple. The boolean flips to `true` the first time
 * the referenced element scrolls into view, then stays true.
 *
 * Replaces the IntersectionObserver useEffect boilerplate that was duplicated
 * across ~15 components in this codebase.
 */
export function useInView<T extends Element = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.15 }
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(node);
    return () => observer.disconnect();
    // We intentionally don't depend on `options` — components pass an inline
    // object literal which would re-create the observer on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, visible];
}
