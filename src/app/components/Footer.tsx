"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useInView } from "@/lib/use-in-view";

export default function Footer() {
  const pathname = usePathname();
  const hideCtaBanner = pathname === "/schedule-call";
  const [sectionRef, visible] = useInView<HTMLElement>();

  return (
    <footer ref={sectionRef} className="relative overflow-hidden bg-zinc-950">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-[600px] rounded-full opacity-15 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #6343d4 0%, transparent 70%)",
        }}
      />

      {/* CTA Banner */}
      {!hideCtaBanner && (
      <div className="relative border-b border-white/5 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-12">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between sm:items-center">
            <h2
              className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl max-w-lg"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.7s ease-out",
              }}
            >
              Schedule a Call to{" "}
              <span className="text-brand">Enroll Today!</span>
            </h2>

            <Link
              href="/schedule-call"
              className="group relative inline-flex items-center gap-3 rounded-full bg-brand px-10 py-5 text-lg font-bold text-white shadow-lg shadow-brand/25 transition-all duration-300 hover:bg-brand-hover hover:shadow-xl hover:shadow-brand/30 hover:-translate-y-0.5"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.7s ease-out 0.15s",
              }}
            >
              Schedule a Call
              <svg
                className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      )}

      {/* Bottom bar */}
      <div className="relative py-8">
        <div className="mx-auto max-w-7xl px-6 sm:px-12">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeiYwH4ZX0-0hpnOf1nlrVFqLOXYim6GuzQu1Iq_05524850w/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-cta px-7 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-cta-hover hover:-translate-y-0.5"
            >
              Teach with us! Click here
            </a>

            <div className="flex items-center gap-6">
              <Link
                href="/privacy-policy-2"
                className="text-sm text-white/40 transition-colors duration-200 hover:text-white/70"
              >
                Privacy Policy
              </Link>
              <span className="text-white/10">|</span>
              <span className="text-sm text-white/30">
                &copy; {new Date().getFullYear()} Volz Method Piano Lessons. Designed &amp; Developed by{" "}
                <a
                  href="https://webaholics.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white/70 transition-colors"
                >
                  Webaholics.co
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
