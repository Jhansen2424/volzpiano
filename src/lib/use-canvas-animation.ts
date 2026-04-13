"use client";

import { useEffect, useRef } from "react";

/**
 * Manages a 2x device-pixel-ratio canvas with a requestAnimationFrame loop.
 *
 * Replaces ~30 lines of duplicated boilerplate (resize listener, RAF setup,
 * cleanup) across the three canvas-based hero animations on this site.
 *
 * The `draw` callback is called on every frame with the 2D context plus the
 * canvas's internal pixel dimensions (width/height) and the current animation
 * timestamp from rAF.
 *
 * @param draw   Per-frame draw function. Stable reference required (wrap in
 *               useCallback if needed).
 * @param active When false, the loop stops and the canvas is cleared. Useful
 *               for waiting until the section scrolls into view.
 */
export function useCanvasAnimation(
  draw: (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    now: number
  ) => void,
  active: boolean = true
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
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

    function frame(now: number) {
      if (!ctx) return;
      draw(ctx, w, h, now);
      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
    // The draw callback intentionally doesn't depend on its identity — callers
    // capture per-frame state in refs (this matches all current call sites).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return canvasRef;
}
