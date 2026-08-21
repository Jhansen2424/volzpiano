"use client";

import { useState } from "react";
import { track, trackOnce } from "./track";
import { PRICE } from "./lpData";

/**
 * "Do we come to your area?" — an interactive local-service qualifier.
 *
 * The two biggest unknowns for a parent clicking a piano-lessons ad are
 * "do they even serve my town?" and "what will it cost?". This answers both in
 * two taps, honestly: we confirm the service area, show the real published
 * price range (never a fabricated exact number), and hand off to the free call
 * where the exact quote is given. It's a micro-commitment that warms the lead
 * before the booking ask.
 */
const REGIONS: { id: string; label: string; served: boolean }[] = [
  { id: "salt-lake", label: "Salt Lake County", served: true },
  { id: "utah-county", label: "Utah County", served: true },
  { id: "davis", label: "Davis County", served: true },
  { id: "weber", label: "Weber County", served: true },
  { id: "idaho", label: "Idaho", served: true },
  { id: "other", label: "Somewhere else", served: false },
];

const STUDENTS = ["1", "2", "3+"];

export default function AreaCheck() {
  const [region, setRegion] = useState<(typeof REGIONS)[number] | null>(null);
  const [students, setStudents] = useState<string | null>(null);

  const done = region && students;

  function pickRegion(r: (typeof REGIONS)[number]) {
    setRegion(r);
    trackOnce("areacheck_start", "lp_areacheck_start");
    track("lp_areacheck_region", { region: r.id, served: r.served });
  }
  function pickStudents(s: string) {
    setStudents(s);
    if (region) track("lp_areacheck_result", { region: region.id, students: s });
  }

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-cream shadow-lg">
          <div className="border-b border-zinc-200 px-7 py-6 sm:px-9">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
              30-second check
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
              Do we come to your area?
            </h2>
          </div>

          <div className="px-7 py-7 sm:px-9">
            {/* Step 1 — region */}
            <fieldset>
              <legend className="mb-3 text-sm font-bold text-zinc-700">
                1. Where are you?
              </legend>
              <div className="flex flex-wrap gap-2.5">
                {REGIONS.map((r) => {
                  const active = region?.id === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => pickRegion(r)}
                      aria-pressed={active}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                        active
                          ? "border-accent bg-accent text-white shadow-md"
                          : "border-zinc-300 bg-white text-zinc-700 hover:border-accent hover:text-accent"
                      }`}
                    >
                      {r.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Step 2 — students (revealed after region) */}
            {region && (
              <fieldset
                className="mt-7"
                style={{ animation: "fadeSlideIn 0.4s ease-out both" }}
              >
                <legend className="mb-3 text-sm font-bold text-zinc-700">
                  2. How many kids would take lessons?
                </legend>
                <div className="flex flex-wrap gap-2.5">
                  {STUDENTS.map((s) => {
                    const active = students === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => pickStudents(s)}
                        aria-pressed={active}
                        className={`min-w-[3.5rem] rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                          active
                            ? "border-accent bg-accent text-white shadow-md"
                            : "border-zinc-300 bg-white text-zinc-700 hover:border-accent hover:text-accent"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}

            {/* Result */}
            {done && (
              <div
                className="mt-8 rounded-2xl border border-accent/25 bg-white p-6 shadow-sm"
                role="status"
                style={{ animation: "fadeScaleIn 0.4s ease-out both" }}
              >
                {region.served ? (
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-bold text-zinc-900">
                        Yes — we have Volz Method teachers across {region.label}.
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                        Your teacher drives to your home each week. Lessons run{" "}
                        <strong className="text-zinc-900">{PRICE} per half hour</strong>
                        {students !== "1" && (
                          <> — with a discount on additional students</>
                        )}
                        . Your exact price depends on your city and is set on your free call.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-bold text-zinc-900">
                        We&rsquo;re growing fast across Utah &amp; Idaho.
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                        Book a quick call and we&rsquo;ll confirm we can reach your street —
                        and if we can&rsquo;t yet, there&rsquo;s no cost and no pressure.
                        Lessons run <strong className="text-zinc-900">{PRICE} per half hour</strong>.
                      </p>
                    </div>
                  </div>
                )}

                <a
                  href="#book"
                  data-cta="area_check"
                  data-cta-detail={region.id}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-cta-hover hover:-translate-y-0.5"
                >
                  {region.served ? "Get my exact price" : "Check my street"}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
