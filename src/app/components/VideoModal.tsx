"use client";

import { useEffect, useRef } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  /** Accessible name for the dialog and the video frame. */
  title?: string;
}

/**
 * Accessible video dialog (WCAG 2.1.2, 2.4.3, 4.1.2):
 * - role="dialog" + aria-modal + a name, so assistive tech announces it
 * - focus moves into the dialog on open and is kept inside while open
 * - Escape or the close button closes it, and focus returns to the trigger
 */
export default function VideoModal({
  isOpen,
  onClose,
  videoUrl,
  title = "Learn more about the Volz Method",
}: VideoModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  // Scroll lock + focus management
  useEffect(() => {
    if (!isOpen) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      returnFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  // Escape to close; Tab / Shift+Tab stay inside the dialog
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, iframe, a[href]'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full max-w-4xl animate-[fadeScaleIn_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Focus sentinels: once focus is inside the YouTube iframe, Tab key
            presses go to YouTube's document and never reach our handler, so
            when focus tabs back OUT of the iframe it lands here and is sent
            back inside the dialog instead of escaping to the page behind. */}
        <div tabIndex={0} onFocus={() => dialogRef.current?.querySelector("iframe")?.focus()} />
        {/* Close button */}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute -top-11 right-0 flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white"
          aria-label="Close video"
        >
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video — cc_load_policy=1 shows captions by default when the video has them */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`${videoUrl}?autoplay=1&rel=0&cc_load_policy=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div tabIndex={0} onFocus={() => closeRef.current?.focus()} />
      </div>
    </div>
  );
}
