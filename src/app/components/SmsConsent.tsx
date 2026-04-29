"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * SMS opt-in consent checkbox shown next to the Calendly widget on every
 * page where a visitor might submit their phone number. The checkbox state
 * is local — it doesn't gate the Calendly form (Calendly's iframe handles
 * its own form), but the visible disclosure is required for SMS compliance.
 */
export default function SmsConsent() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-zinc-600">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-zinc-300 text-accent focus:ring-accent"
          aria-label="Agree to receive SMS messages"
        />
        <span>
          By checking this box, you agree to receive SMS messages from{" "}
          <strong className="text-zinc-800">Volz Method Piano Lessons</strong>{" "}
          related to scheduling, lesson reminders, and other lesson-related
          communication. You may reply STOP to opt out at any time. Reply
          HELP to{" "}
          <a
            href="tel:+13854820122"
            className="font-semibold text-zinc-800 hover:underline"
          >
            385-482-0122
          </a>{" "}
          for assistance. Messages and data rates may apply. Message
          frequency will vary. Learn more on our{" "}
          <Link
            href="/privacy-policy-2"
            className="font-semibold text-accent hover:underline"
          >
            privacy policy
          </Link>{" "}
          page and{" "}
          <Link
            href="/privacy-policy-2"
            className="font-semibold text-accent hover:underline"
          >
            Terms &amp; Conditions
          </Link>
          .
        </span>
      </label>
    </div>
  );
}
