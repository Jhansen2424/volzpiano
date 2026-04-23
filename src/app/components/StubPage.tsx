"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * A minimal landing-style page used for routes that need to exist for SEO
 * continuity (legacy WordPress URLs) but don't have unique content yet. The
 * shape mirrors the rest of the site's hero treatment.
 */
export default function StubPage({
  badge,
  title,
  highlight,
  description,
  primaryCta = { href: "/schedule-call", label: "Schedule a Call" },
  body,
  heroBackground,
}: {
  badge?: string;
  title: string;
  highlight?: string;
  description: string;
  primaryCta?: { href: string; label: string };
  body?: React.ReactNode;
  /**
   * Optional background graphic/animation for the hero. Renders inside the
   * hero section, behind the text content but in front of the radial glow.
   * Should be absolutely positioned to fill the parent.
   */
  heroBackground?: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden bg-zinc-900 pt-40 pb-20">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[500px] rounded-full opacity-15 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #6343d4 0%, transparent 70%)",
          }}
        />
        {heroBackground}
        <div className="relative z-[2] text-center px-6 max-w-3xl">
          {badge && (
            <span
              className="mb-6 inline-block rounded-full bg-accent/15 px-4 py-1 text-xs font-bold uppercase tracking-wider text-accent"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(10px)",
                transition: "all 0.5s ease-out 0.1s",
              }}
            >
              {badge}
            </span>
          )}
          <h1
            className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s ease-out 0.2s",
              textShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            {title}
            {highlight && (
              <>
                {" "}
                <span className="text-accent">{highlight}</span>
              </>
            )}
          </h1>
          <p
            className="mt-6 mx-auto max-w-2xl text-lg text-white/70 sm:text-xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease-out 0.5s",
            }}
          >
            {description}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Body */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-6 sm:px-12">
          {body}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cta px-8 py-4 text-base font-bold text-white transition-all duration-200 hover:bg-cta-hover hover:-translate-y-0.5"
            >
              {primaryCta.label}
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-zinc-200 px-8 py-4 text-base font-bold text-zinc-700 transition-all duration-200 hover:border-accent hover:text-accent hover:-translate-y-0.5"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
