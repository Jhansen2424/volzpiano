"use client";

/**
 * Hero background for the Teaching Positions page. Floating music notes drift
 * upward across the hero, with a subtle horizontal sway, on a slow loop. Pure
 * CSS animations — no JS RAF loop needed.
 */

const TrebleClef = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 48" className={className} fill="currentColor">
    <path d="M16 2c-4 4-7 8-7 14 0 4 3 7 7 7s7-3 7-7c0-3-2-5-4-5s-4 2-4 4 1 3 2 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M16 2v40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="14" cy="38" r="4" />
  </svg>
);

const EighthNote = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 32" className={className} fill="currentColor">
    <path d="M9 26V5l11-3v6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <ellipse cx="6" cy="26" rx="4" ry="3.5" transform="rotate(-15 6 26)" />
  </svg>
);

const BeamedNotes = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor">
    <path d="M7 25V8h18v3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M5 8h22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <ellipse cx="6" cy="25" rx="3.5" ry="3" transform="rotate(-15 6 25)" />
    <ellipse cx="24" cy="25" rx="3.5" ry="3" transform="rotate(-15 24 25)" />
  </svg>
);

const QuarterNote = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 32" className={className} fill="currentColor">
    <path d="M14 28V4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <ellipse cx="10" cy="27" rx="5" ry="4" transform="rotate(-20 10 27)" />
  </svg>
);

const Sharp = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 32" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M8 4v24M16 4v24M4 11l16-3M4 21l16-3" />
  </svg>
);

type Note = {
  Icon: typeof TrebleClef;
  size: string;
  left: string;
  delay: string;
  duration: string;
  startOpacity: number;
};

// Pre-computed positions so the animation is deterministic across renders.
// Each note drifts from below the hero up to above it on a slow loop, with
// staggered delays so the screen always has a few notes visible.
const notes: Note[] = [
  { Icon: TrebleClef, size: "h-20 w-14", left: "6%", delay: "0s", duration: "16s", startOpacity: 0.55 },
  { Icon: EighthNote, size: "h-16 w-11", left: "16%", delay: "-3s", duration: "14s", startOpacity: 0.6 },
  { Icon: QuarterNote, size: "h-20 w-12", left: "27%", delay: "-7s", duration: "18s", startOpacity: 0.5 },
  { Icon: BeamedNotes, size: "h-20 w-20", left: "38%", delay: "-2s", duration: "15s", startOpacity: 0.55 },
  { Icon: Sharp, size: "h-14 w-10", left: "48%", delay: "-9s", duration: "17s", startOpacity: 0.45 },
  { Icon: TrebleClef, size: "h-24 w-16", left: "58%", delay: "-5s", duration: "19s", startOpacity: 0.55 },
  { Icon: EighthNote, size: "h-20 w-12", left: "68%", delay: "-11s", duration: "16s", startOpacity: 0.6 },
  { Icon: BeamedNotes, size: "h-16 w-16", left: "78%", delay: "-1s", duration: "14s", startOpacity: 0.55 },
  { Icon: QuarterNote, size: "h-20 w-14", left: "87%", delay: "-6s", duration: "17s", startOpacity: 0.55 },
  { Icon: Sharp, size: "h-16 w-10", left: "94%", delay: "-13s", duration: "20s", startOpacity: 0.5 },
];

export default function MusicNotesHero() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {notes.map(({ Icon, size, left, delay, duration, startOpacity }, i) => (
        <span
          key={i}
          className="absolute bottom-0 text-accent"
          style={{
            left,
            ["--note-opacity" as string]: startOpacity,
            opacity: startOpacity,
            animation: `floatNoteUp ${duration} linear ${delay} infinite, noteSway ${parseFloat(duration) / 2}s ease-in-out ${delay} infinite alternate`,
            filter:
              "drop-shadow(0 0 24px rgba(99, 67, 212, 0.85)) drop-shadow(0 0 8px rgba(99, 67, 212, 0.6))",
          }}
        >
          <Icon className={size} />
        </span>
      ))}
    </div>
  );
}
