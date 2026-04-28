"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/use-in-view";
import { useCanvasAnimation } from "@/lib/use-canvas-animation";
import SmsConsent from "@/app/components/SmsConsent";

/* ═══════════════════════════════════════════
   Rippling Piano Strings Animation (Hero)
   ═══════════════════════════════════════════ */
const STRING_COUNT = 14;
type PianoString = {
  y: number;
  pluckTime: number;
  amplitude: number;
  frequency: number;
  thickness: number;
};

function PianoStringsAnimation({ visible }: { visible: boolean }) {
  // Strings are lazily initialized once we know the canvas height
  const stringsRef = useRef<PianoString[] | null>(null);

  // Pluck a string every 350ms
  useEffect(() => {
    if (!visible) return;
    let pluckIndex = 0;
    const interval = setInterval(() => {
      const strings = stringsRef.current;
      if (!strings || strings.length === 0) return;
      strings[pluckIndex].pluckTime = performance.now();
      strings[pluckIndex].amplitude = 12 + Math.random() * 10;
      pluckIndex = (pluckIndex + 1) % strings.length;
    }, 350);
    return () => clearInterval(interval);
  }, [visible]);

  const canvasRef = useCanvasAnimation((ctx, w, h, now) => {
    // Lazy init / re-init on first frame and on size changes
    if (!stringsRef.current || stringsRef.current.length !== STRING_COUNT) {
      stringsRef.current = Array.from({ length: STRING_COUNT }, (_, i) => ({
        y: (i / STRING_COUNT) * h * 0.8 + h * 0.1,
        pluckTime: -1,
        amplitude: 0,
        frequency: 2 + Math.random() * 2,
        thickness: 1.5 + (STRING_COUNT - i) * 0.3,
      }));
    } else {
      // Update y for current canvas height (cheap; strings stay coherent)
      for (let i = 0; i < STRING_COUNT; i++) {
        stringsRef.current[i].y = (i / STRING_COUNT) * h * 0.8 + h * 0.1;
      }
    }

    ctx.clearRect(0, 0, w, h);
    const strings = stringsRef.current;
    for (const s of strings) {
      const elapsed = s.pluckTime > 0 ? (now - s.pluckTime) / 1000 : -1;
      const decay = elapsed > 0 ? Math.exp(-elapsed * 2.5) : 0;
      const amp = s.amplitude * decay;

      ctx.beginPath();
      ctx.lineWidth = s.thickness;

      // Color: faint white when still, accent glow when vibrating
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
        const envelope = Math.sin((j / segments) * Math.PI); // 0 at ends, 1 at center
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
  }, visible);

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
    // Phone icon — for "make an appointment / chat over the phone"
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: "Make an Appointment",
    description:
      "Make an appointment to chat with us over the phone.",
  },
  {
    // Handshake-style icon — for "discuss, sign up, get set up with a teacher"
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Discuss & Sign Up",
    description:
      "Discuss details at your appointment. If you're ready, we take payment and set you up with a teacher right over the phone.",
  },
  {
    // Home icon — for "teacher drives to your house"
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: "Lessons at Your House",
    description:
      "Your teacher drives to your house for piano lessons!",
  },
];

function HowItWorksTimeline() {
  const [sectionRef, visible] = useInView<HTMLElement>();
  const [lineWidth, setLineWidth] = useState(0);

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
const CALENDLY_URL = "https://calendly.com/volz-method-sales/piano_lessons_phone_consultation";

function ScheduleSection() {
  const [sectionRef, visible] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="schedule"
      className="bg-zinc-900 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        {/* Section header (centered, full width) */}
        <div
          className="mx-auto mb-12 max-w-2xl text-center"
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
            className="mx-auto mb-6 h-1 w-16 rounded-full bg-brand"
            style={{
              transform: visible ? "scaleX(1)" : "scaleX(0)",
              transition: "transform 0.5s ease-out 0.3s",
            }}
          />
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
            <span className="text-sm font-semibold text-white/70">15 min</span>
          </div>
          <p className="text-base leading-relaxed text-white/60 sm:text-lg">
            We will answer your questions and if you&apos;re ready, we&apos;ll
            sign you up! Bonus points if you include your spouse on the call.
          </p>
        </div>

        {/* Calendly + SMS consent side-by-side on desktop, stacked on mobile.
            Negative margin on mobile lets the 320px-min-width widget bleed
            all the way to the viewport edge so it never overflows. */}
        <div
          className="grid items-start gap-6 lg:grid-cols-[2fr_1fr] lg:gap-8"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s ease-out 0.2s",
          }}
        >
          <div className="relative -mx-6 overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl sm:mx-0">
            <iframe
              src={CALENDLY_URL}
              title="Schedule a consultation"
              className="w-full border-0"
              style={{ height: "820px" }}
            />
          </div>
          {/* SmsConsent has its own mt-6 spacing for the stacked mobile case;
              neutralize it on lg+ so it aligns with the iframe top edge. */}
          <div className="lg:[&>div]:mt-0">
            <SmsConsent />
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
            className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl"
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
              $29–$52
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
