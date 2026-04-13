"use client";

import { useInView } from "@/lib/use-in-view";

/**
 * Wraps children in a div that fades + slides up the first time it scrolls
 * into view. Used by long-form pages (privacy, blog posts, how-it-works,
 * core-values) to animate sections as the visitor reads down the page.
 *
 * Replaces an inline copy-paste of the same component that lived in 8+ files.
 */
export default function AnimatedSection({
  children,
  delay = 0,
  className = "",
  threshold = 0.1,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
}) {
  const [ref, visible] = useInView<HTMLDivElement>({ threshold });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
