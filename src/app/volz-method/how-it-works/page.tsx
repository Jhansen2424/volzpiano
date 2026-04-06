"use client";

import { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════
   Rippling Piano Strings Animation (Hero)
   ═══════════════════════════════════════════ */
const STRING_COUNT = 14;

function PianoStringsAnimation({ visible }: { visible: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    function resize() {
      if (!canvas) return;
      w = canvas.offsetWidth * 2;
      h = canvas.offsetHeight * 2;
      canvas.width = w;
      canvas.height = h;
    }
    resize();
    window.addEventListener("resize", resize);

    // Each string has: pluck time, amplitude, frequency, decay
    const strings: {
      y: number;
      pluckTime: number;
      amplitude: number;
      frequency: number;
      thickness: number;
    }[] = [];

    for (let i = 0; i < STRING_COUNT; i++) {
      const t = (i / STRING_COUNT) * h * 0.8 + h * 0.1;
      strings.push({
        y: t,
        pluckTime: -1,
        amplitude: 0,
        frequency: 2 + Math.random() * 2,
        thickness: 1.5 + (STRING_COUNT - i) * 0.3,
      });
    }

    // Pluck strings in sequence, then repeat
    let pluckIndex = 0;
    const pluckInterval = setInterval(() => {
      strings[pluckIndex].pluckTime = performance.now();
      strings[pluckIndex].amplitude = 12 + Math.random() * 10;
      pluckIndex = (pluckIndex + 1) % STRING_COUNT;
    }, 350);

    function draw(now: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      for (const s of strings) {
        const elapsed = s.pluckTime > 0 ? (now - s.pluckTime) / 1000 : -1;
        const decay = elapsed > 0 ? Math.exp(-elapsed * 2.5) : 0;
        const amp = s.amplitude * decay;

        ctx.beginPath();
        ctx.lineWidth = s.thickness;

        // Color: faint white when still, orange glow when vibrating
        if (amp > 0.5) {
          const alpha = Math.min(0.8, 0.2 + decay * 0.6);
          ctx.strokeStyle = `rgba(99, 67, 212, ${alpha})`;
          ctx.shadowColor = "rgba(99, 67, 212, 0.5)";
          ctx.shadowBlur = 12 * decay;
        } else {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
        }

        // Draw the string as a sine wave
        const segments = 120;
        for (let j = 0; j <= segments; j++) {
          const x = (j / segments) * w;
          const envelope =
            Math.sin((j / segments) * Math.PI); // envelope: 0 at ends, 1 at center
          const vibration =
            amp *
            envelope *
            Math.sin(
              s.frequency * Math.PI * 2 * (j / segments) -
                (elapsed > 0 ? elapsed * 12 : 0)
            );
          const y = s.y + vibration;

          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      clearInterval(pluckInterval);
      window.removeEventListener("resize", resize);
    };
  }, [visible]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: visible ? 0.6 : 0, transition: "opacity 1s ease-out" }}
    />
  );
}

/* ═══════════════════════════════════════════
   How It Works — Vertical Timeline
   ═══════════════════════════════════════════ */
const steps = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Hassle-Free, Month to Month",
    description:
      "Piano lessons are month to month. We only require a 30 day notice if you ever were to quit.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Convenient On-Site Lessons",
    description:
      "We have a teacher in each area so we can drive to you. Dedicated instructors, right at your door.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "Expert Volz Method Instructors",
    description:
      "All our teachers are trained for 3 months in the Volz Method before they ever teach a lesson.",
  },
];

function HowItWorksTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [lineWidth, setLineWidth] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Animate the horizontal line drawing across
  useEffect(() => {
    if (!visible) return;
    let start: number | null = null;
    const duration = 1000;

    function animate(ts: number) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setLineWidth(eased * 100);
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [visible]);

  return (
    <section ref={sectionRef} className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        {/* Section heading */}
        <div className="text-center mb-14 sm:mb-16">
          <h2
            className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.7s ease-out",
            }}
          >
            How It Works
          </h2>
          <div
            className="mx-auto mt-4 h-1 w-16 rounded-full bg-brand"
            style={{
              transform: visible ? "scaleX(1)" : "scaleX(0)",
              transition: "transform 0.5s ease-out 0.3s",
            }}
          />
          <p
            className="mt-6 mx-auto max-w-xl text-lg text-zinc-500"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.6s ease-out 0.2s",
            }}
          >
            Make an appointment with us to get an exact quote and be set up with
            a teacher!
          </p>
        </div>

        {/* Horizontal timeline */}
        <div className="relative mx-auto max-w-4xl">
          {/* Horizontal connecting line (behind dots) */}
          <div className="absolute top-6 left-[calc(16.67%)] right-[calc(16.67%)] hidden sm:block">
            <div className="h-px w-full bg-zinc-200">
              <div
                className="h-full bg-brand origin-left"
                style={{ width: `${lineWidth}%` }}
              />
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
            {steps.map((step, i) => {
              const delay = 0.3 + i * 0.2;
              return (
                <div key={i} className="flex flex-col items-center text-center">
                  {/* Dot with icon */}
                  <div
                    className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-brand text-white shadow-lg"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "scale(1)" : "scale(0.4)",
                      transition: `all 0.5s ease-out ${delay}s`,
                    }}
                  >
                    {step.icon}
                  </div>

                  {/* Card */}
                  <div
                    className="group relative w-full rounded-2xl border border-zinc-100 bg-white p-7 shadow-md transition-all duration-300 hover:shadow-xl hover:border-brand/20 hover:-translate-y-1"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(24px)",
                      transition: `all 0.6s ease-out ${delay + 0.15}s`,
                    }}
                  >
                    {/* Orange top accent on hover */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-brand to-brand-hover scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />

                    <span className="mb-1 block text-xs font-bold uppercase tracking-[0.15em] text-brand">
                      Step {i + 1}
                    </span>
                    <h3 className="mb-2 text-lg font-bold text-zinc-900">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div
          className="mt-14 text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.6s ease-out 1s",
          }}
        >
          <a
            href="#schedule"
            className="inline-block rounded-full bg-cta px-10 py-4 text-lg font-bold text-white shadow-lg transition-all duration-200 hover:bg-cta-hover hover:shadow-xl hover:-translate-y-0.5"
          >
            Schedule a Call
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Schedule a Consultation — Calendly Embed
   ═══════════════════════════════════════════ */
const CALENDLY_URL = "https://calendly.com/d/cppx-785-njf/meeting-with-mike";

function ScheduleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="schedule"
      className="bg-zinc-900 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* ── Left — Info ── */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.7s ease-out",
            }}
          >
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-brand">
              Sales
            </span>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Piano Lessons Phone Consultation
            </h2>

            <div
              className="mb-6 h-1 w-16 rounded-full bg-brand"
              style={{
                transform: visible ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 0.5s ease-out 0.3s",
              }}
            />

            {/* Duration badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <svg
                className="h-5 w-5 text-white/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm font-semibold text-white/70">
                15 min
              </span>
            </div>

            <p
              className="mb-4 text-base leading-relaxed text-white/60 sm:text-lg"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: "all 0.6s ease-out 0.3s",
              }}
            >
              We will answer your questions and if you&apos;re ready,
              we&apos;ll sign you up!
            </p>

            <p
              className="text-base leading-relaxed text-white/60 sm:text-lg"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: "all 0.6s ease-out 0.45s",
              }}
            >
              Bonus points if you include your spouse on the call!
            </p>
          </div>

          {/* ── Right — Calendly embed ── */}
          <div
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.7s ease-out 0.2s",
            }}
          >
            {CALENDLY_URL ? (
              <iframe
                src={CALENDLY_URL}
                title="Schedule a consultation"
                className="h-[820px] w-full border-0"
                style={{ overflow: "hidden" }}
              />
            ) : (
              /* Placeholder until Calendly link is added */
              <div className="flex h-[620px] w-full flex-col items-center justify-center bg-zinc-50 px-8 text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand/10">
                  <svg
                    className="h-8 w-8 text-brand"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-lg font-bold text-zinc-900">
                  Calendar Coming Soon
                </p>
                <p className="mt-2 text-sm text-zinc-500">
                  Calendly embed will appear here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Page
   ═══════════════════════════════════════════ */
export default function HowItWorksPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-zinc-900 pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/40 via-zinc-900/20 to-zinc-900 z-[1]" />
        <PianoStringsAnimation visible={visible} />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[500px] rounded-full opacity-20 blur-[120px] z-[1]"
          style={{
            background:
              "radial-gradient(circle, #6343d4 0%, transparent 70%)",
          }}
        />

        <div className="relative z-[2] text-center px-6">
          <h1
            className="text-5xl font-extrabold text-white sm:text-6xl lg:text-7xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s ease-out 0.2s",
              textShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            Volz Piano{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Pricing</span>
              <span
                className="absolute bottom-1 left-0 h-3 w-full bg-brand/30 -z-0 rounded-sm"
                style={{
                  transform: visible ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.6s ease-out 0.8s",
                }}
              />
            </span>
          </h1>
          <p
            className="mt-6 mx-auto max-w-2xl text-lg text-white/60 sm:text-xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease-out 0.5s",
            }}
          >
            We drive to you! To give an accurate price we need your city and the
            number of students in your home. Multi-student discounts available.
          </p>

          {/* Price range badge */}
          <div
            className="mt-10 inline-flex items-baseline gap-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-8 py-5"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease-out 0.7s",
            }}
          >
            <span className="text-5xl font-extrabold text-brand sm:text-6xl">
              $29–$45
            </span>
            <span className="text-lg text-white/50 font-medium">
              / half hour
            </span>
          </div>

          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.6s ease-out 0.9s",
            }}
          >
            <a
              href="#schedule"
              className="mt-8 inline-block rounded-full bg-cta px-10 py-4 text-lg font-bold text-white shadow-lg transition-all duration-200 hover:bg-cta-hover hover:shadow-xl hover:-translate-y-0.5"
            >
              Get Your Price
            </a>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-zinc-900 to-transparent z-[1]" />
      </section>

      {/* ── How It Works Timeline ── */}
      <HowItWorksTimeline />

      {/* ── Schedule a Consultation ── */}
      <ScheduleSection />
    </main>
  );
}
