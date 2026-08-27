/**
 * Soft decorative elements — server components, no client JS.
 *
 * WaveDivider: a gentle curved edge that melts one section's color into the
 * next, softening the otherwise-hard section boundaries.
 * FloatingNotes: a few music notes that drift up and fade behind a hero — a
 * light, on-brand touch. Both are purely decorative (aria-hidden) and the notes
 * disappear for reduced-motion visitors (see .lp-note in globals.css).
 */

/** Curved bottom edge. Render as the last child of a `relative overflow-hidden`
 *  section; `fill` should be the NEXT section's background color. */
export function WaveDivider({ fill, className = "" }: { fill: string; className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 bottom-0 z-[2] leading-[0] ${className}`}>
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className="block h-[32px] w-full sm:h-[52px]"
      >
        <path
          d="M0,40 C220,70 430,10 720,30 C1010,50 1230,70 1440,34 L1440,64 L0,64 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

const NOTES: { glyph: string; left: string; size: number; delay: number; dur: number; op: number }[] = [
  { glyph: "♪", left: "10%", size: 30, delay: 0, dur: 9, op: 0.22 },
  { glyph: "♫", left: "24%", size: 20, delay: 3.2, dur: 11, op: 0.16 },
  { glyph: "♩", left: "44%", size: 24, delay: 1.4, dur: 10, op: 0.14 },
  { glyph: "♬", left: "63%", size: 22, delay: 5, dur: 12, op: 0.18 },
  { glyph: "♪", left: "80%", size: 28, delay: 2.2, dur: 10.5, op: 0.2 },
];

/** A few drifting notes. Place inside a `relative overflow-hidden` hero, behind
 *  the content. `className` sets the note color (e.g. "text-white"). */
export function FloatingNotes({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {NOTES.map((n, i) => (
        <span
          key={i}
          className="lp-note"
          style={
            {
              left: n.left,
              bottom: "-16px",
              fontSize: `${n.size}px`,
              animationDelay: `${n.delay}s`,
              animationDuration: `${n.dur}s`,
              // custom prop consumed by the keyframe
              "--note-op": String(n.op),
            } as React.CSSProperties
          }
        >
          {n.glyph}
        </span>
      ))}
    </div>
  );
}
