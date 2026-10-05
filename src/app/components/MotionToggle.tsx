"use client";

import { setMotionPaused, useMotionPaused } from "@/lib/motion";

/** Site-wide Pause/Play animations control (WCAG 2.2.2). */
export default function MotionToggle({ className = "" }: { className?: string }) {
  const paused = useMotionPaused();
  return (
    <button
      type="button"
      onClick={() => setMotionPaused(!paused)}
      aria-pressed={paused}
      className={`inline-flex items-center gap-2 underline underline-offset-4 ${className}`}
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        {paused ? <path d="M8 5v14l11-7z" /> : <path d="M6 5h4v14H6zM14 5h4v14h-4z" />}
      </svg>
      {paused ? "Play animations" : "Pause animations"}
    </button>
  );
}
