"use client";

import { useEffect, useState } from "react";

// Site-wide motion preference (WCAG 2.2.2 Pause, Stop, Hide).
//
// Motion is "paused" when either the visitor pressed the Pause animations
// control (persisted in localStorage) or their OS asks for reduced motion.
// CSS animations freeze via html[data-motion="paused"] in globals.css; JS-driven
// animations (rotating banner, canvas, self-playing keys) read the same state
// through useMotionPaused().

import { MOTION_STORAGE_KEY as STORAGE_KEY } from "./motion-init";
const EVENT = "volz-motion-change";


export function isMotionPaused(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.getAttribute("data-motion") === "paused";
}

export function setMotionPaused(paused: boolean) {
  const root = document.documentElement;
  if (paused) root.setAttribute("data-motion", "paused");
  else root.removeAttribute("data-motion");
  try {
    localStorage.setItem(STORAGE_KEY, paused ? "paused" : "playing");
  } catch {
    /* storage unavailable: preference lasts for this page view */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function useMotionPaused(): boolean {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const sync = () => setPaused(isMotionPaused());
    sync();
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);
  return paused;
}
