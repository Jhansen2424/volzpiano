"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const CALENDLY_URL = "https://calendly.com/volz-method-sales/piano_lessons_phone_consultation";

export default function ScheduleCallPage() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden bg-zinc-900 pt-40 pb-32">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[500px] rounded-full opacity-15 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #6343d4 0%, transparent 70%)",
          }}
        />
        <div className="relative z-[2] text-center px-6">
          <h1
            className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s ease-out 0.2s",
              textShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            Schedule a Call to <span className="text-brand">Enroll</span>
          </h1>
          <p
            className="mt-6 mx-auto max-w-2xl text-lg text-white/60 sm:text-xl"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease-out 0.5s",
            }}
          >
            To sign up for piano lessons, please schedule a call for enrollment
            and a quote.
          </p>
          <p
            className="mt-4 mx-auto max-w-xl text-sm text-white/40 italic"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.7s",
            }}
          >
            No hablamos espa&ntilde;ol. Si necesita un traductor, debe
            proporcionar uno en el momento de la cita.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Calendly Embed */}
      <section className="bg-white py-12 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 sm:px-12">
          {/* Negative margin lets the 320px-min-width widget bleed all the
              way to the viewport edge on mobile so it never overflows. */}
          <div className="-mx-6 overflow-hidden rounded-2xl border border-zinc-200 shadow-lg sm:mx-0">
            <div
              className="calendly-inline-widget"
              data-url={CALENDLY_URL}
              style={{ minWidth: "320px", height: "800px" }}
            />
            <Script
              src="https://assets.calendly.com/assets/external/widget.js"
              strategy="afterInteractive"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
