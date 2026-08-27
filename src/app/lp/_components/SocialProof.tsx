"use client";

import { useState } from "react";
import { track } from "./track";
import { RATING, REVIEW_COUNT, TESTIMONIALS } from "./lpData";
import { Stars } from "./ui";

/**
 * Consolidated social proof: a real parent-testimonial VIDEO (the strongest
 * trust asset for an in-home decision) paired with one anchored, named review
 * and the star rating. Research is consistent that (a) video far out-converts
 * text for high-trust offers and (b) a single specific testimonial beats a wall
 * of anonymous ones — so we lead with one, not six.
 *
 * The video is a "facade": we show a lightweight thumbnail + play button and
 * only load the YouTube player on click, so it never costs initial load.
 */
const VIDEO_ID = "m9dCWFG6xFQ"; // real "Parent Testimonials" video from the site

function VideoFacade() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl border border-[#efe1d2] bg-zinc-900 shadow-warm-lg">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
          title="What parents say about Volz Method piano lessons"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            setPlaying(true);
            track("lp_video_play", { video: VIDEO_ID });
          }}
          className="group absolute inset-0 h-full w-full"
          aria-label="Play video: what parents say about Volz Method piano lessons"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg`}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform duration-200 group-hover:scale-110">
            <svg className="ml-1 h-7 w-7 text-accent" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="absolute bottom-3 left-4 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white">
            Hear from our parents
          </span>
        </button>
      )}
    </div>
  );
}

export default function SocialProof({
  heading = "Why parents trust us with their kids",
}: {
  heading?: string;
}) {
  const [featured, ...rest] = TESTIMONIALS;
  return (
    <section className="bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="mb-10 flex flex-col items-center text-center">
          <Stars />
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-2 text-zinc-500">
            Rated {RATING} stars across {REVIEW_COUNT} Google reviews
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <VideoFacade />

          <div className="flex flex-col gap-5">
            {/* Anchored, named review */}
            <figure className="rounded-3xl border border-[#efe6d8] bg-white p-7 shadow-warm">
              <Stars className="h-4 w-4" />
              <blockquote className="mt-4 text-lg leading-relaxed text-zinc-800 italic">
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-bold text-zinc-900">{featured.name}</span>
                <span className="text-zinc-500"> · {featured.role}</span>
              </figcaption>
            </figure>

            {/* Two supporting voices */}
            <div className="grid gap-4 sm:grid-cols-2">
              {rest.map((t) => (
                <figure key={t.name} className="rounded-2xl border border-[#efe6d8] bg-white p-5 shadow-warm">
                  <blockquote className="text-sm leading-relaxed text-zinc-600 italic">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-3 text-xs font-semibold text-zinc-800">
                    {t.name} <span className="font-normal text-zinc-500">· {t.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-zinc-500">
          Every Volz teacher trains three months in the Method before their first
          lesson &mdash; and your child keeps the same teacher every week.
        </p>
      </div>
    </section>
  );
}
