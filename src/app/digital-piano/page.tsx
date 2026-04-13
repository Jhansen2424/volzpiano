"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useCanvasAnimation } from "@/lib/use-canvas-animation";

/* ═══════════════════════════════════════════
   Animated Piano Keys — Canvas Background
   Full-width photorealistic-style keys that
   press in sequence with purple glow.
   ═══════════════════════════════════════════ */
function PianoKeysHero({ visible }: { visible: boolean }) {
  // Key state held in refs so the draw closure stays stable while values mutate
  const KEY_COUNT = 36;
  const pressedRef = useRef<number[]>(Array(KEY_COUNT).fill(0));
  const glowRef = useRef<number[]>(Array(KEY_COUNT).fill(0));
  const lastPluckRef = useRef(0);
  const pluckIndexRef = useRef(0);
  // Chromatic-ish walk across the keyboard
  const sequence = [0,2,4,5,7,9,11,12,14,16,17,19,21,23,24,26,28,29,31,33,35];

  const canvasRef = useCanvasAnimation((ctx, w, h, now) => {
    ctx.clearRect(0, 0, w, h);

    const keyW = w / KEY_COUNT;
    const keyH = h * 0.92;

    // Trigger next key press every 300ms
    if (now - lastPluckRef.current > 300) {
      lastPluckRef.current = now;
      const idx = sequence[pluckIndexRef.current % sequence.length];
      pressedRef.current[idx] = 1;
      glowRef.current[idx] = 1;
      pluckIndexRef.current++;
    }

    // Decay all keys
    for (let i = 0; i < KEY_COUNT; i++) {
      pressedRef.current[i] = Math.max(0, pressedRef.current[i] - 0.04);
      glowRef.current[i] = Math.max(0, glowRef.current[i] - 0.025);
    }

    // Draw white keys
    for (let i = 0; i < KEY_COUNT; i++) {
      const x = i * keyW;
      const press = pressedRef.current[i];
      const glow = glowRef.current[i];
      const pressY = press * 10;

      // Key body gradient — ivory look
      const grad = ctx.createLinearGradient(x, 0, x, keyH);
      if (glow > 0) {
        grad.addColorStop(0, `rgba(255, 200, 100, ${0.3 + glow * 0.5})`);
        grad.addColorStop(0.3, `rgba(255, 230, 180, ${0.15 + glow * 0.3})`);
        grad.addColorStop(1, `rgba(200, 120, 30, ${0.1 + glow * 0.25})`);
      } else {
        grad.addColorStop(0, "rgba(255,255,255,0.18)");
        grad.addColorStop(0.5, "rgba(255,255,255,0.08)");
        grad.addColorStop(1, "rgba(0,0,0,0.35)");
      }

      const r = keyW * 0.08;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x + r, pressY);
      ctx.lineTo(x + keyW - r, pressY);
      ctx.quadraticCurveTo(x + keyW, pressY, x + keyW, pressY + r);
      ctx.lineTo(x + keyW, keyH + pressY - r);
      ctx.quadraticCurveTo(x + keyW, keyH + pressY, x + keyW - r, keyH + pressY);
      ctx.lineTo(x + r, keyH + pressY);
      ctx.quadraticCurveTo(x, keyH + pressY, x, keyH + pressY - r);
      ctx.lineTo(x, pressY + r);
      ctx.quadraticCurveTo(x, pressY, x + r, pressY);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Glow effect
      if (glow > 0.05) {
        ctx.shadowColor = `rgba(99, 67, 212, ${glow * 0.8})`;
        ctx.shadowBlur = 30 * glow;
        ctx.strokeStyle = `rgba(99, 67, 212, ${glow * 0.6})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Key divider line
      ctx.beginPath();
      ctx.moveTo(x + keyW, pressY + 4);
      ctx.lineTo(x + keyW, keyH + pressY);
      ctx.strokeStyle = "rgba(0,0,0,0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    }

    // Draw black keys overlay
    const blackPattern = [1, 2, 4, 5, 6];
    const octaveWhiteKeys = 7;
    const blackW = keyW * 0.6;
    const blackH = keyH * 0.62;

    for (let oct = 0; oct < Math.ceil(KEY_COUNT / octaveWhiteKeys); oct++) {
      for (const pos of blackPattern) {
        const whiteIdx = oct * octaveWhiteKeys + pos;
        if (whiteIdx >= KEY_COUNT) continue;
        const bx = whiteIdx * keyW - blackW / 2;

        const leftGlow = glowRef.current[whiteIdx - 1] || 0;
        const rightGlow = glowRef.current[whiteIdx] || 0;
        const bGlow = Math.max(leftGlow, rightGlow) * 0.7;

        const bGrad = ctx.createLinearGradient(bx, 0, bx, blackH);
        if (bGlow > 0) {
          bGrad.addColorStop(0, `rgba(80, 40, 0, 1)`);
          bGrad.addColorStop(0.5, `rgba(30, 15, 0, 0.95)`);
          bGrad.addColorStop(1, `rgba(100, 60, 10, 0.9)`);
        } else {
          bGrad.addColorStop(0, "rgba(40,40,40,0.95)");
          bGrad.addColorStop(0.6, "rgba(15,15,15,0.98)");
          bGrad.addColorStop(1, "rgba(60,60,60,0.9)");
        }

        const br = blackW * 0.1;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(bx + br, 0);
        ctx.lineTo(bx + blackW - br, 0);
        ctx.quadraticCurveTo(bx + blackW, 0, bx + blackW, br);
        ctx.lineTo(bx + blackW, blackH - br);
        ctx.quadraticCurveTo(bx + blackW, blackH, bx + blackW - br, blackH);
        ctx.lineTo(bx + br, blackH);
        ctx.quadraticCurveTo(bx, blackH, bx, blackH - br);
        ctx.lineTo(bx, br);
        ctx.quadraticCurveTo(bx, 0, bx + br, 0);
        ctx.closePath();
        ctx.fillStyle = bGrad;
        ctx.fill();

        if (bGlow > 0.05) {
          ctx.shadowColor = `rgba(99, 67, 212, ${bGlow * 0.6})`;
          ctx.shadowBlur = 20 * bGlow;
          ctx.strokeStyle = `rgba(99, 67, 212, ${bGlow * 0.4})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        ctx.restore();
      }
    }
  });

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 1.4s ease-out" }}
    />
  );
}

/* ═══════════════════════════════════════════
   Page
   ═══════════════════════════════════════════ */
export default function DigitalPianoDealPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[65vh] items-center justify-center overflow-hidden bg-zinc-950 pt-24">
        {/* Animated piano keys fill the background */}
        <PianoKeysHero visible={visible} />

        {/* Dark gradient overlay — heavier at top/center for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60 z-[1]" />

        {/* Subtle orange center glow */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-[700px] rounded-full blur-[140px] z-[1]"
          style={{ background: "radial-gradient(circle, rgba(99,67,212,0.18) 0%, transparent 70%)" }}
        />

        {/* Content */}
        <div className="relative z-[2] text-center px-6 max-w-4xl mx-auto">
          {/* Badge */}
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-5 py-2"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "all 0.6s ease-out 0.1s" }}
          >
            <svg className="h-4 w-4 text-brand" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 1l2.928 5.934 6.546.952-4.737 4.617 1.118 6.515L10 15.897l-5.855 3.121 1.118-6.515L.526 7.886l6.546-.952L10 1z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-bold text-brand">Recommended by Volz Method Teachers</span>
          </div>

          <h1
            className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl xl:text-7xl leading-tight"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.9s ease-out 0.2s", textShadow: "0 4px 40px rgba(0,0,0,0.7)" }}
          >
            Here is the list of items that we would{" "}
            <span
              className="text-accent"
              style={{ textShadow: "0 0 40px rgba(99,67,212,0.5)" }}
            >
              recommend you buy!
            </span>
          </h1>

          <p
            className="mt-6 mx-auto max-w-2xl text-lg text-white/70 sm:text-xl leading-relaxed"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease-out 0.5s" }}
          >
            This is the best deal we know of currently for a digital piano that has everything you need to learn piano properly on.
          </p>

          {/* Scroll cue */}
          <div
            className="mt-10 flex justify-center"
            style={{ opacity: visible ? 1 : 0, transition: "opacity 0.7s ease-out 0.9s" }}
          >
            <div className="flex flex-col items-center gap-2 text-white/30">
              <span className="text-xs font-semibold uppercase tracking-widest">See Recommendations</span>
              <svg className="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* White wave fade at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-white to-transparent z-[2]" />
      </section>

      {/* ── Product Recommendations ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-12">

          {/* Cheapest Option */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Option 1
              </span>
              <h2 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl">
                The <span className="text-accent">Cheapest</span> Option
              </h2>
              <p className="mt-4 text-lg text-zinc-500 max-w-xl mx-auto">
                Everything you need to get started — fully weighted keys, a sturdy stand, and a padded bench.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <ProductCard
                title="Digital Piano"
                description="Fully weighted keys with a sustain pedal — the must-have feature for proper piano technique."
                href="https://amzn.to/3R0egZT"
                imageSrc="/digital-piano/piano-cheapest.png"
              />
              <ProductCard
                title="X Stand"
                description="Affordable, adjustable stand that holds the piano at the perfect height."
                href="https://amzn.to/4aGILva"
                imageSrc="/digital-piano/x-stand.png"
              />
              <ProductCard
                title="Padded Bench"
                description="Very inexpensive but still has plenty of padding for comfortable practice sessions."
                href="https://amzn.to/4axe63d"
                imageSrc="/digital-piano/bench-cheapest.png"
              />
            </div>
          </div>

          {/* Upgraded Option */}
          <div>
            <div className="text-center mb-12">
              <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Option 2
              </span>
              <h2 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl">
                The <span className="text-accent">Upgraded</span> Option
              </h2>
              <p className="mt-4 text-lg text-zinc-500 max-w-xl mx-auto">
                Same great piano — with built-in legs that look nicer and don&apos;t wobble like a stand.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 max-w-3xl mx-auto">
              <ProductCard
                title="Digital Piano (with Built-in Legs)"
                description="The exact same piano as Option 1, just with built-in legs. Looks nicer and is much more stable."
                href="https://amzn.to/3yu89Xj"
                imageSrc="/digital-piano/piano-upgraded.png"
              />
              <ProductCard
                title="Padded Bench"
                description="A comfortable bench to pair with the upgraded piano."
                href="https://amzn.to/4bSt3y2"
                imageSrc="/digital-piano/bench-cheapest.png"
              />
            </div>
          </div>

          <p className="mt-16 text-center text-xs text-zinc-400 max-w-2xl mx-auto">
            As an Amazon Associate, Volz Piano may earn from qualifying purchases. These are the same products our teachers recommend to students.
          </p>
        </div>
      </section>

    </main>
  );
}

function ProductCard({
  title,
  description,
  href,
  imageSrc,
}: {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm transition-all duration-200 hover:border-accent hover:shadow-xl hover:-translate-y-1"
    >
      <div className="mb-5 relative h-48 w-full overflow-hidden rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="mb-2 text-xl font-bold text-zinc-900 group-hover:text-accent transition-colors">
        {title}
      </h3>
      <p className="mb-5 flex-1 text-sm leading-relaxed text-zinc-600">
        {description}
      </p>
      <span className="inline-flex items-center gap-2 text-sm font-bold text-accent">
        View on Amazon
        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </a>
  );
}
