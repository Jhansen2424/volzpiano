"use client";

import Link from "next/link";

/**
 * SMS opt-in consent checkbox shown next to the Calendly widget. The state
 * is owned by the parent page so it can also gate the booking iframe — see
 * usage on /schedule-call and /pricing.
 */
export default function SmsConsent({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <div
      className={`mt-6 rounded-2xl border bg-white p-5 shadow-sm transition-all sm:p-6 ${
        checked
          ? "border-zinc-200"
          : "border-accent/40 ring-2 ring-accent/20"
      }`}
    >
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-zinc-600">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
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
