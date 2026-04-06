"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════
   Animated Piano Keys Background (Hero)
   ═══════════════════════════════════════════ */
const TOTAL_KEYS = 28;

function isBlackKey(index: number): boolean {
  const p = index % 7;
  return p === 1 || p === 2 || p === 4 || p === 5 || p === 6;
}

function PianoKeysAnimation({ visible }: { visible: boolean }) {
  const [pressedKeys, setPressedKeys] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!visible) return;
    const sequence = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24, 26];
    let step = 0;
    const interval = setInterval(() => {
      const keyIndex = sequence[step % sequence.length];
      setPressedKeys(new Set([keyIndex]));
      setTimeout(() => {
        setPressedKeys((prev) => {
          const next = new Set(prev);
          next.delete(keyIndex);
          return next;
        });
      }, 400);
      step++;
    }, 300);
    return () => clearInterval(interval);
  }, [visible]);

  const whiteKeys: number[] = [];
  const blackKeys: { index: number; leftOffset: number }[] = [];
  let whiteIndex = 0;
  for (let i = 0; i < TOTAL_KEYS; i++) {
    if (!isBlackKey(i)) { whiteKeys.push(i); whiteIndex++; }
    else { blackKeys.push({ index: i, leftOffset: whiteIndex }); }
  }
  const w = 100 / whiteKeys.length;

  return (
    <div className="absolute inset-0 flex items-end justify-center overflow-hidden opacity-40">
      {whiteKeys.map((keyIdx, i) => (
        <div
          key={`w-${keyIdx}`}
          className="relative border-x border-white/10"
          style={{
            width: `${w}%`,
            height: pressedKeys.has(keyIdx) ? "88%" : "90%",
            background: pressedKeys.has(keyIdx)
              ? "linear-gradient(to bottom, #6343d4, #5235b8)"
              : "linear-gradient(to bottom, #fafafa, #e5e5e5)",
            borderRadius: "0 0 6px 6px",
            boxShadow: pressedKeys.has(keyIdx)
              ? "0 0 20px rgba(99,67,212,0.6), 0 0 40px rgba(99,67,212,0.3), inset 0 -2px 4px rgba(0,0,0,0.15)"
              : "inset 0 -4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.2)",
            transform: pressedKeys.has(keyIdx) ? "translateY(3px)" : "translateY(0)",
            opacity: visible ? 1 : 0,
            transition: `opacity 0.8s ease-out ${i * 0.03}s, transform 0.15s ease-out, height 0.15s ease-out, background 0.2s ease-out, box-shadow 0.2s ease-out`,
          }}
        />
      ))}
      {blackKeys.map(({ index: keyIdx, leftOffset }) => (
        <div
          key={`b-${keyIdx}`}
          className="absolute"
          style={{
            width: `${w * 0.6}%`,
            height: pressedKeys.has(keyIdx) ? "55%" : "58%",
            left: `${(leftOffset - 0.3) * w}%`,
            top: 0,
            background: pressedKeys.has(keyIdx)
              ? "linear-gradient(to bottom, #6343d4, #4a2fa6)"
              : "linear-gradient(to bottom, #222, #111)",
            borderRadius: "0 0 4px 4px",
            boxShadow: pressedKeys.has(keyIdx)
              ? "0 0 16px rgba(99,67,212,0.7), 0 0 32px rgba(99,67,212,0.3)"
              : "0 3px 6px rgba(0,0,0,0.4), inset 0 -2px 3px rgba(0,0,0,0.3)",
            transform: pressedKeys.has(keyIdx) ? "translateY(2px)" : "translateY(0)",
            zIndex: 2,
            opacity: visible ? 1 : 0,
            transition: `opacity 0.6s ease-out ${leftOffset * 0.03}s, transform 0.15s ease-out, height 0.15s ease-out, background 0.2s ease-out, box-shadow 0.2s ease-out`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   Full-width split Method Section
   ═══════════════════════════════════════════ */
function MethodBlock({
  number,
  title,
  description,
  imageSrc,
  imageAlt,
  reverse,
  dark,
}: {
  number: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reverse: boolean;
  dark: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

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
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden ${dark ? "bg-zinc-900" : "bg-white"}`}
    >
      <div
        className={`grid lg:grid-cols-2 min-h-[500px] lg:min-h-[600px] ${
          reverse ? "lg:[direction:rtl]" : ""
        }`}
      >
        {/* ── Photo half — edge-to-edge ── */}
        <div
          className={`relative overflow-hidden ${reverse ? "lg:[direction:ltr]" : ""}`}
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease-out",
          }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className={`object-cover transition-transform duration-[3000ms] ease-out ${
              visible ? "scale-100" : "scale-110"
            }`}
          />
          {/* Gradient fade into content side */}
          <div
            className={`absolute inset-0 ${
              reverse
                ? "bg-gradient-to-l"
                : "bg-gradient-to-r"
            } ${
              dark
                ? "from-transparent via-transparent to-zinc-900"
                : "from-transparent via-transparent to-white"
            }`}
          />
          {/* Bottom gradient for mobile */}
          <div
            className={`absolute inset-0 lg:hidden ${
              dark
                ? "bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent"
                : "bg-gradient-to-t from-white via-white/50 to-transparent"
            }`}
          />
        </div>

        {/* ── Content half ── */}
        <div
          className={`relative flex items-center ${reverse ? "lg:[direction:ltr]" : ""}`}
        >
          {/* Giant background number */}
          <div
            className={`absolute right-8 lg:right-12 top-1/2 -translate-y-1/2 text-[10rem] sm:text-[14rem] lg:text-[18rem] font-black leading-none select-none pointer-events-none ${
              dark ? "text-white/[0.04]" : "text-zinc-900/[0.04]"
            }`}
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 1.2s ease-out 0.2s",
            }}
          >
            {number}
          </div>

          <div className="relative z-10 px-8 py-16 sm:px-12 lg:px-16 xl:px-24 max-w-xl">
            <span
              className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-orange-brand"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: "all 0.6s ease-out 0.2s",
              }}
            >
              Method No. {number}
            </span>

            <h2
              className={`mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl ${
                dark ? "text-white" : "text-zinc-900"
              }`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.7s ease-out 0.3s",
              }}
            >
              {title}
            </h2>

            <div
              className="mb-8 h-1 w-16 rounded-full bg-orange-brand"
              style={{
                transform: visible ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 0.5s ease-out 0.5s",
              }}
            />

            <p
              className={`mb-10 text-base leading-relaxed sm:text-lg ${
                dark ? "text-white/70" : "text-zinc-600"
              }`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: "all 0.6s ease-out 0.55s",
              }}
            >
              {description}
            </p>

            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: "all 0.6s ease-out 0.65s",
              }}
            >
              <a
                href="/schedule-call"
                className="inline-block rounded-full bg-cta px-10 py-4 text-lg font-bold text-white shadow-lg transition-all duration-200 hover:bg-cta-hover hover:shadow-xl hover:-translate-y-0.5"
              >
                Schedule a Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Page
   ═══════════════════════════════════════════ */
export default function VolzMethodPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/60 via-zinc-900/40 to-zinc-900 z-[1]" />
        <PianoKeysAnimation visible={visible} />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[500px] rounded-full opacity-25 blur-[120px] z-[1]"
          style={{ background: "radial-gradient(circle, #6343d4 0%, transparent 70%)" }}
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
            The Complete{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Volz Method</span>
              <span
                className="absolute bottom-1 left-0 h-3 w-full bg-orange-brand/30 -z-0 rounded-sm"
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
            A comprehensive approach to piano that meets every student where they are.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-zinc-900 to-transparent z-[1]" />
      </section>

      {/* ── 01 Reading ── */}
      <MethodBlock
        number="01"
        title="Reading"
        description="Reading sheet music isn't going away anytime soon. We still teach each of our students to read music but we emphasize its use in students who excel and are naturally suited to its development."
        imageSrc="/method-reading.jpg"
        imageAlt="Student reading sheet music at a piano"
        reverse={false}
        dark={false}
      />

      {/* ── 02 Composing ── */}
      <MethodBlock
        number="02"
        title="Composing"
        description="A number of our students advance rapidly as we teach them not only to compose their own music but teach them to understand the patterns and laws that govern it. Their compositions have brought me to tears."
        imageSrc="/method-composing.jpg"
        imageAlt="Student composing music at a piano"
        reverse={true}
        dark={true}
      />

      {/* ── 03 Hearing ── */}
      <MethodBlock
        number="03"
        title="Hearing"
        description="There are many students who elevate their playing by entire levels when they are taught by ear. We train their talent instead of discouraging it and help them utilize their strengths and leverage them to help them reach new heights."
        imageSrc="/method-hearing.jpg"
        imageAlt="Student playing piano by ear"
        reverse={false}
        dark={false}
      />

      {/* ── 04 Arranging ── */}
      <MethodBlock
        number="04"
        title="Arranging"
        description="Some students work well taking existing pieces and twisting tweaking and adjusting them to make entirely new pieces of music or similar ones. Their path may be different from conventional piano teaching but the results speak for themselves."
        imageSrc="/method-arranging.jpg"
        imageAlt="Student arranging music at a piano"
        reverse={true}
        dark={true}
      />
    </main>
  );
}
