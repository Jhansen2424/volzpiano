"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/use-in-view";

const NOTES = [
  { note: "C", type: "white", freq: 261.63 },
  { note: "C#", type: "black", freq: 277.18 },
  { note: "D", type: "white", freq: 293.66 },
  { note: "D#", type: "black", freq: 311.13 },
  { note: "E", type: "white", freq: 329.63 },
  { note: "F", type: "white", freq: 349.23 },
  { note: "F#", type: "black", freq: 369.99 },
  { note: "G", type: "white", freq: 392.0 },
  { note: "G#", type: "black", freq: 415.3 },
  { note: "A", type: "white", freq: 440.0 },
  { note: "A#", type: "black", freq: 466.16 },
  { note: "B", type: "white", freq: 493.88 },
  { note: "C2", type: "white", freq: 523.25 },
];

const KEY_MAP: Record<string, number> = {
  a: 0, w: 1, s: 2, e: 3, d: 4, f: 5, t: 6, g: 7, y: 8, h: 9, u: 10, j: 11, k: 12,
};

const WaveTop = () => (
  <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] -translate-y-[1px]">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] sm:h-[80px]">
      <path
        d="M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,0 L0,0 Z"
        fill="#faf7f2"
      />
    </svg>
  </div>
);

export default function InteractiveKeyboard() {
  const [activeNotes, setActiveNotes] = useState<Set<number>>(new Set());
  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeOscillators = useRef<Map<number, { osc: OscillatorNode; gain: GainNode }>>(new Map());
  const [sectionRef, visible] = useInView<HTMLElement>();

  const getAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    // Modern browsers (especially iOS Safari) start AudioContext in a
    // "suspended" state. Resume on first user gesture so notes actually play.
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playNote = useCallback(
    (index: number) => {
      if (activeOscillators.current.has(index)) return;
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = NOTES[index].freq;
      gain.gain.value = 0;
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      activeOscillators.current.set(index, { osc, gain });
      setActiveNotes((prev) => new Set(prev).add(index));
    },
    [getAudioCtx]
  );

  const stopNote = useCallback((index: number) => {
    const entry = activeOscillators.current.get(index);
    if (!entry) return;
    const ctx = audioCtxRef.current;
    if (ctx) {
      entry.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
      setTimeout(() => {
        entry.osc.stop();
        entry.osc.disconnect();
      }, 150);
    }
    activeOscillators.current.delete(index);
    setActiveNotes((prev) => {
      const next = new Set(prev);
      next.delete(index);
      return next;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const index = KEY_MAP[e.key.toLowerCase()];
      if (index !== undefined) playNote(index);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      const index = KEY_MAP[e.key.toLowerCase()];
      if (index !== undefined) stopNote(index);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [playNote, stopNote]);

  useEffect(() => {
    // Capture refs into locals so the cleanup uses the values from mount-time,
    // not whatever ref.current happens to be at unmount-time (lint guidance).
    const oscillators = activeOscillators.current;
    return () => {
      oscillators.forEach(({ osc }) => {
        osc.stop();
        osc.disconnect();
      });
      audioCtxRef.current?.close();
    };
  }, []);

  const whiteKeys = NOTES.map((n, i) => ({ ...n, index: i })).filter(
    (n) => n.type === "white"
  );
  const blackKeys = NOTES.map((n, i) => ({ ...n, index: i })).filter(
    (n) => n.type === "black"
  );

  const blackKeyPositions: Record<string, number> = {
    "C#": 0, "D#": 1, "F#": 3, "G#": 4, "A#": 5,
  };

  const whiteKeyCount = whiteKeys.length;

  return (
    <section ref={sectionRef} className="relative bg-blush pt-20 pb-20 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32">
      {/* Wavy top divider */}
      <WaveTop />

      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-20">
        <div
          className="text-center mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s ease-out",
          }}
        >
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-zinc-800 sm:text-5xl">
            Give It a Try
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-500">
            Tap the keys or use your keyboard (A&ndash;K row) to play a few notes.
            Imagine what a real lesson could sound like!
          </p>
          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-accent" />
        </div>

        <div
          className="mx-auto max-w-2xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease-out 0.2s",
          }}
        >
          {/* Piano container with soft card */}
          <div className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-white/60 p-6 sm:p-8">
            {/* Piano keyboard */}
            <div
              className="relative mx-auto select-none"
              style={{ height: 180, maxWidth: 560 }}
            >
              {/* White keys */}
              <div className="flex h-full gap-[3px]">
                {whiteKeys.map((key) => (
                  <button
                    key={key.note}
                    onPointerDown={() => playNote(key.index)}
                    onPointerUp={() => stopNote(key.index)}
                    onPointerLeave={() => stopNote(key.index)}
                    className={`relative flex-1 rounded-b-xl transition-all duration-100 ${
                      activeNotes.has(key.index)
                        ? "bg-accent/15 border-2 border-accent/40 shadow-[inset_0_-4px_12px_rgba(99,67,212,0.15)]"
                        : "bg-white border-2 border-zinc-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:bg-cream-dark"
                    }`}
                  >
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] font-semibold text-zinc-300">
                      {key.note.replace("2", "")}
                    </span>
                  </button>
                ))}
              </div>

              {/* Black keys */}
              {blackKeys.map((key) => {
                const pos = blackKeyPositions[key.note];
                const leftPercent =
                  ((pos + 1) / whiteKeyCount) * 100 - 100 / whiteKeyCount / 3;
                return (
                  <button
                    key={key.note}
                    onPointerDown={() => playNote(key.index)}
                    onPointerUp={() => stopNote(key.index)}
                    onPointerLeave={() => stopNote(key.index)}
                    className={`absolute top-0 z-10 rounded-b-lg transition-all duration-100 ${
                      activeNotes.has(key.index)
                        ? "bg-accent shadow-[inset_0_-2px_8px_rgba(0,0,0,0.2)]"
                        : "bg-zinc-700 hover:bg-zinc-600 shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
                    }`}
                    style={{
                      left: `${leftPercent}%`,
                      width: `${(100 / whiteKeyCount) * 0.58}%`,
                      height: "56%",
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Keyboard hints */}
          <p className="mt-6 text-center text-sm text-zinc-400">
            Keyboard: A W S E D F T G Y H U J K
          </p>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Link
              href="/schedule-call"
              className="inline-block rounded-full bg-cta px-8 py-3.5 font-bold text-white shadow-lg transition-all duration-200 hover:bg-cta-hover hover:shadow-xl hover:-translate-y-0.5"
            >
              Ready for Real Lessons? Schedule a Call
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
