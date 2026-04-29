"use client";

/**
 * Calendly iframe wrapper with optional consent gating.
 *
 * When `gated` is true, an overlay covers the iframe and intercepts all
 * pointer events, blocking interaction with the booking widget. The overlay
 * tells the visitor what they need to do (typically: check the SMS consent
 * box). When `gated` is false, the iframe is fully interactive.
 */
export default function CalendlyEmbed({
  url,
  height = 800,
  gated,
}: {
  url: string;
  height?: number;
  gated: boolean;
}) {
  return (
    <div className="relative -mx-6 overflow-hidden rounded-2xl border border-zinc-200 shadow-lg sm:mx-0">
      <iframe
        src={url}
        title="Schedule a consultation"
        className="w-full border-0"
        style={{ height: `${height}px` }}
        // Disable pointer interactions on the iframe itself when gated.
        // The overlay below also intercepts clicks as a defense in depth.
        tabIndex={gated ? -1 : 0}
        aria-hidden={gated}
      />
      {gated && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center bg-white/85 px-6 backdrop-blur-sm"
          role="status"
          aria-live="polite"
        >
          <div className="max-w-sm rounded-2xl border border-accent/30 bg-white px-8 py-7 text-center shadow-xl">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <svg
                className="h-6 w-6 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-7a2 2 0 00-2-2H6a2 2 0 00-2 2v7a2 2 0 002 2zm10-12V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-extrabold text-zinc-900">
              Almost There!
            </h3>
            <p className="text-sm leading-relaxed text-zinc-600">
              Please check the SMS consent box{" "}
              <span className="hidden lg:inline">to the right</span>
              <span className="lg:hidden">below</span> to enable scheduling.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
