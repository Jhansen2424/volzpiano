"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// "Book appointment" conversion action in Google Ads (id 6558605213). The
// base tag itself loads site-wide from the root layout — it must be on the
// landing pages to capture the gclid, not here.
const ADS_BOOKING_SEND_TO = "AW-755139969/ozLyCJ2_sbcYEIGLiugC";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export default function ThankYouPage() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Fire once per thank-you view (one completed booking). Pushing an
  // arguments object onto dataLayer is safe regardless of whether gtag.js
  // has finished loading — the queue is drained when it does.
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag(..._args: unknown[]) {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    }
    gtag("event", "conversion", { send_to: ADS_BOOKING_SEND_TO });
  }, []);

  return (
    <main>

      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-zinc-900 pt-40 pb-20">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[500px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #6343d4 0%, transparent 70%)",
          }}
        />
        <div className="relative z-[2] text-center px-6 max-w-3xl">
          {/* Success check icon */}
          <div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 ring-4 ring-accent/10"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.6)",
              transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s",
            }}
          >
            <svg
              className="h-8 w-8 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
                style={{
                  strokeDasharray: 30,
                  strokeDashoffset: visible ? 0 : 30,
                  transition: "stroke-dashoffset 0.5s ease-out 0.4s",
                }}
              />
            </svg>
          </div>

          <span
            className="mb-4 inline-block rounded-full bg-accent/15 px-4 py-1 text-xs font-bold uppercase tracking-wider text-accent"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transition: "all 0.5s ease-out 0.2s",
            }}
          >
            Confirmed
          </span>

          <h1
            className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s ease-out 0.3s",
              textShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            Thank You for{" "}
            <span className="text-accent">Signing Up!</span>
          </h1>

          <p
            className="mt-6 mx-auto max-w-2xl text-lg text-white/70 sm:text-xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease-out 0.5s",
            }}
          >
            Your free consultation is booked. We&rsquo;re looking forward to
            talking with you and helping your family get started with piano.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Body */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 sm:px-12">
          <h2 className="mb-6 text-2xl font-extrabold text-zinc-900 sm:text-3xl">
            What happens next?
          </h2>
          <ol className="space-y-5">
            {[
              {
                title: "Check your inbox",
                body: "You'll receive a confirmation email from us with all the details of your consultation. It should arrive within a few minutes — check your spam folder if you don't see it.",
              },
              {
                title: "SMS reminder (if you opted in)",
                body: "If you opted in for SMS communications, you'll get a text reminder before the scheduled time.",
              },
              {
                title: "We'll call at your scheduled time",
                body: "At your appointment, one of our team members will call the phone number you provided. Please make sure you're in a quiet spot where you can chat.",
              },
              {
                title: "Get your exact price and get set up",
                body: "We'll answer your questions, give you an exact price for your area, and — if you're ready — sign your family up right on the call.",
              },
            ].map((step, i) => (
              <li key={i} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-extrabold text-accent">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900">{step.title}</h3>
                  <p className="mt-1 leading-relaxed text-zinc-600">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Meanwhile section */}
          <div className="mt-14 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
            <h3 className="mb-3 text-xl font-extrabold text-zinc-900">
              In the meantime&hellip;
            </h3>
            <p className="mb-5 text-zinc-600">
              Get to know the Volz Method a bit better while you wait for your
              call:
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <Link
                href="/volz-method-best-piano-teaching-medthod"
                className="group flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="text-sm font-bold text-zinc-800 group-hover:text-accent">
                  The Volz Method
                </span>
                <svg
                  className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/digital-piano"
                className="group flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="text-sm font-bold text-zinc-800 group-hover:text-accent">
                  Recommended Pianos
                </span>
                <svg
                  className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/blog"
                className="group flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="text-sm font-bold text-zinc-800 group-hover:text-accent">
                  Read the Blog
                </span>
                <svg
                  className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Contact info */}
          <div className="mt-10 rounded-2xl border border-zinc-200 p-6 sm:p-8">
            <h3 className="mb-3 text-lg font-bold text-zinc-900">
              Need to reach us before then?
            </h3>
            <p className="text-zinc-600">
              Call or text us at{" "}
              <a
                href="tel:+13854820122"
                className="font-semibold text-accent hover:underline"
              >
                385-482-0122
              </a>
              , or email{" "}
              <a
                href="mailto:support@volzpiano.com"
                className="font-semibold text-accent hover:underline"
              >
                support@volzpiano.com
              </a>
              .
            </p>
          </div>

          {/* Back to home */}
          <div className="mt-10 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-zinc-200 px-8 py-4 text-base font-bold text-zinc-700 transition-all duration-200 hover:border-accent hover:text-accent hover:-translate-y-0.5"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
