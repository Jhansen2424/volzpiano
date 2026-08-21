"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { track, trackOnce } from "./track";

/**
 * A real, playable piano on the landing page.
 *
 * The most on-brand interactive element imaginable for a piano-lessons ad: the
 * visitor (or their kid, right there on the phone) plays a recognizable song in
 * ~15 seconds using guided glowing keys — a visceral "my child could do this"
 * moment that a block of copy can never create, ending on a booking CTA.
 *
 * Implementation notes:
 *  - Web Audio only; no samples, no network, CSP-safe. The AudioContext is
 *    created lazily on the first user gesture (also required by browsers).
 *  - Pointer events unify mouse/touch/pen; `touch-action:none` stops the press
 *    from scrolling the page.
 *  - Physical-key play (A S D F …) works when the keyboard has focus, so it's
 *    keyboard-operable without hijacking the whole page.
 *  - The guided glow uses .lp-key-pulse, which is disabled under
 *    prefers-reduced-motion.
 */

type WhiteKey = { id: string; off: number; label: string; hint: string };
type BlackKey = { id: string; off: number; left: number };

// One-plus octave: C4 → E5. Covers Twinkle and Ode to Joy.
const WHITE: WhiteKey[] = [
  { id: "C4", off: 0, label: "C", hint: "A" },
  { id: "D4", off: 2, label: "D", hint: "S" },
  { id: "E4", off: 4, label: "E", hint: "D" },
  { id: "F4", off: 5, label: "F", hint: "F" },
  { id: "G4", off: 7, label: "G", hint: "G" },
  { id: "A4", off: 9, label: "A", hint: "H" },
  { id: "B4", off: 11, label: "B", hint: "J" },
  { id: "C5", off: 12, label: "C", hint: "K" },
  { id: "D5", off: 14, label: "D", hint: "L" },
  { id: "E5", off: 16, label: "E", hint: ";" },
];

const BLACK: BlackKey[] = [
  { id: "Cs4", off: 1, left: 6.75 },
  { id: "Ds4", off: 3, left: 16.75 },
  { id: "Fs4", off: 6, left: 36.75 },
  { id: "Gs4", off: 8, left: 46.75 },
  { id: "As4", off: 10, left: 56.75 },
  { id: "Cs5", off: 13, left: 76.75 },
  { id: "Ds5", off: 15, left: 86.75 },
];

const OFF: Record<string, number> = {};
[...WHITE, ...BLACK].forEach((k) => (OFF[k.id] = k.off));

// physical keyboard → white key
const KEYMAP: Record<string, string> = {
  a: "C4", s: "D4", d: "E4", f: "F4", g: "G4",
  h: "A4", j: "B4", k: "C5", l: "D5", ";": "E5",
};

const SONGS: Record<string, { name: string; notes: string[] }> = {
  twinkle: {
    name: "Twinkle, Twinkle",
    notes: ["C4", "C4", "G4", "G4", "A4", "A4", "G4", "F4", "F4", "E4", "E4", "D4", "D4", "C4"],
  },
  ode: {
    name: "Ode to Joy",
    notes: ["E4", "E4", "F4", "G4", "G4", "F4", "E4", "D4", "C4", "C4", "D4", "E4", "E4", "D4", "D4"],
  },
};

function freq(off: number) {
  return 440 * Math.pow(2, (off - 9) / 12);
}

export default function PlayableKeyboard() {
  const ctxRef = useRef<AudioContext | null>(null);
  const timers = useRef<number[]>([]);
  const [song, setSong] = useState<keyof typeof SONGS | null>(null);
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [demoing, setDemoing] = useState(false);
  const [litKey, setLitKey] = useState<string | null>(null); // flashes during demo

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctxRef.current = new AC();
    }
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const playOff = useCallback(
    (off: number) => {
      const ctx = getCtx();
      const t = ctx.currentTime;
      const master = ctx.createGain();
      master.connect(ctx.destination);
      master.gain.setValueAtTime(0.0001, t);
      master.gain.exponentialRampToValueAtTime(0.22, t + 0.008);
      master.gain.exponentialRampToValueAtTime(0.0001, t + 1.5);

      const o1 = ctx.createOscillator();
      o1.type = "triangle";
      o1.frequency.value = freq(off);
      o1.connect(master);

      const o2 = ctx.createOscillator();
      o2.type = "sine";
      o2.frequency.value = freq(off) * 2;
      const g2 = ctx.createGain();
      g2.gain.value = 0.28;
      o2.connect(g2).connect(master);

      o1.start(t);
      o2.start(t);
      o1.stop(t + 1.6);
      o2.stop(t + 1.6);
    },
    [getCtx]
  );

  const nextKey = song && !done ? SONGS[song].notes[idx] : null;

  const press = useCallback(
    (id: string) => {
      if (demoing) return;
      trackOnce("keyboard_play", "lp_keyboard_play");
      playOff(OFF[id]);
      setLitKey(id);
      window.setTimeout(() => setLitKey((k) => (k === id ? null : k)), 160);

      if (song && !done && id === SONGS[song].notes[idx]) {
        const ni = idx + 1;
        if (ni >= SONGS[song].notes.length) {
          setDone(true);
          track("lp_keyboard_song_complete", { song });
        } else {
          setIdx(ni);
        }
      }
    },
    [demoing, playOff, song, done, idx]
  );

  function startSong(key: keyof typeof SONGS) {
    setSong(key);
    setIdx(0);
    setDone(false);
    track("lp_keyboard_song_start", { song: key });
  }

  function freePlay() {
    setSong(null);
    setDone(false);
    setIdx(0);
  }

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };

  function playForMe() {
    if (!song) return;
    clearTimers();
    setDemoing(true);
    setDone(false);
    setIdx(0);
    const notes = SONGS[song].notes;
    notes.forEach((n, i) => {
      const t = window.setTimeout(() => {
        playOff(OFF[n]);
        setLitKey(n);
      }, i * 460);
      timers.current.push(t);
    });
    const end = window.setTimeout(() => {
      setLitKey(null);
      setDemoing(false);
      setIdx(0);
    }, notes.length * 460 + 200);
    timers.current.push(end);
  }

  useEffect(() => () => clearTimers(), []);

  function onKeyDown(e: React.KeyboardEvent) {
    const id = KEYMAP[e.key.toLowerCase()];
    if (id) {
      e.preventDefault();
      press(id);
    }
  }

  const KEY_H = "h-40 sm:h-48";

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
            Try it — right now
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            Play your first song in 15 seconds
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-zinc-600">
            Pick a song and follow the glowing keys. This is exactly how we get
            kids playing real music on day one &mdash; hand your phone to your
            child and watch their face light up.
          </p>
        </div>

        {/* Song controls */}
        <div className="mb-5 flex flex-wrap items-center justify-center gap-2.5">
          {(Object.keys(SONGS) as (keyof typeof SONGS)[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => startSong(k)}
              aria-pressed={song === k}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                song === k
                  ? "border-accent bg-accent text-white shadow-md"
                  : "border-zinc-300 bg-white text-zinc-700 hover:border-accent hover:text-accent"
              }`}
            >
              {SONGS[k].name}
            </button>
          ))}
          <button
            type="button"
            onClick={freePlay}
            aria-pressed={song === null}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
              song === null
                ? "border-accent bg-accent text-white shadow-md"
                : "border-zinc-300 bg-white text-zinc-700 hover:border-accent hover:text-accent"
            }`}
          >
            Free play
          </button>
          {song && (
            <button
              type="button"
              onClick={playForMe}
              disabled={demoing}
              className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition-all hover:border-accent hover:text-accent disabled:opacity-50"
            >
              {demoing ? "Playing…" : "▶ Play it for me"}
            </button>
          )}
        </div>

        {/* Guidance line */}
        {song && !done && (
          <p className="mb-3 text-center text-sm font-semibold text-zinc-500">
            {demoing
              ? `Listen to ${SONGS[song].name}…`
              : `Follow the glowing key — note ${idx + 1} of ${SONGS[song].notes.length}`}
          </p>
        )}

        {/* Keyboard */}
        <div
          tabIndex={0}
          onKeyDown={onKeyDown}
          role="group"
          aria-label="Playable piano keyboard. Use A S D F G H J K L keys or tap."
          className="relative mx-auto flex w-full max-w-2xl rounded-b-xl rounded-t-md bg-zinc-900 p-2 shadow-xl outline-none ring-accent/50 focus-visible:ring-2"
          style={{ touchAction: "none" }}
        >
          {/* White keys */}
          {WHITE.map((k) => {
            const isNext = nextKey === k.id;
            const isLit = litKey === k.id;
            return (
              <button
                key={k.id}
                type="button"
                aria-label={`Play ${k.label}`}
                onPointerDown={(e) => {
                  e.preventDefault();
                  press(k.id);
                }}
                className={`relative ${KEY_H} flex-1 select-none rounded-b-md border border-zinc-300 transition-[transform,background-color] duration-75 active:translate-y-0.5 ${
                  isLit ? "bg-accent/25" : "bg-white hover:bg-zinc-50"
                } ${isNext ? "lp-key-pulse z-[1]" : ""}`}
              >
                <span className="pointer-events-none absolute inset-x-0 bottom-2 text-center text-[11px] font-bold text-zinc-400">
                  {k.label}
                </span>
              </button>
            );
          })}

          {/* Black keys */}
          {BLACK.map((k) => {
            const isNext = nextKey === k.id;
            const isLit = litKey === k.id;
            return (
              <button
                key={k.id}
                type="button"
                aria-label="Play sharp key"
                onPointerDown={(e) => {
                  e.preventDefault();
                  press(k.id);
                }}
                style={{ left: `${k.left}%`, touchAction: "none" }}
                className={`absolute top-2 z-[2] h-24 w-[6.5%] select-none rounded-b-md transition-[transform,background-color] duration-75 active:translate-y-0.5 sm:h-28 ${
                  isLit ? "bg-accent" : "bg-zinc-800 hover:bg-zinc-700"
                } ${isNext ? "lp-key-pulse" : ""}`}
              />
            );
          })}
        </div>
        <p className="mt-3 text-center text-xs text-zinc-400">
          Tap the keys — or on a computer, use your A–L keyboard row.
        </p>

        {/* Completion celebration */}
        {done && (
          <div className="lp-fade-scale mx-auto mt-8 max-w-xl rounded-2xl border border-accent/25 bg-cream p-6 text-center shadow-sm">
            <p className="text-lg font-extrabold text-zinc-900">
              🎉 You just played {song ? SONGS[song].name : "a song"}!
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-600">
              That&rsquo;s the feeling we give kids in their very first lesson.
              Imagine what your child could play in a month.
            </p>
            <a
              href="#book"
              data-cta="keyboard"
              data-cta-detail={song ?? undefined}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-cta px-8 py-4 text-base font-bold text-white shadow-xl transition-all hover:bg-cta-hover hover:-translate-y-0.5"
            >
              Book my free 15-min call
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
