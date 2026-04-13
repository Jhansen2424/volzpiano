"use client";

import Link from "next/link";
import { useInView } from "@/lib/use-in-view";

/* ── Floating icon SVGs ── */
const PianoKeys = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="currentColor">
    <rect x="2" y="8" width="44" height="32" rx="3" fill="currentColor" />
    <rect x="6" y="8" width="8" height="20" rx="1" fill="white" />
    <rect x="16" y="8" width="8" height="20" rx="1" fill="white" />
    <rect x="26" y="8" width="8" height="20" rx="1" fill="white" />
    <rect x="36" y="8" width="8" height="20" rx="1" fill="white" />
    <rect x="11" y="8" width="5" height="13" rx="1" fill="currentColor" />
    <rect x="22" y="8" width="5" height="13" rx="1" fill="currentColor" />
    <rect x="33" y="8" width="5" height="13" rx="1" fill="currentColor" />
  </svg>
);

const MusicNote = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor">
    <path d="M12 4v20a6 6 0 1 1-4-5.66V4h4z" />
    <path d="M12 4l14-2v6l-14 2V4z" />
  </svg>
);

const House = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor">
    <path d="M16 3L2 15h4v14h8v-8h4v8h8V15h4L16 3z" />
  </svg>
);

const TrebleClef = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 48" className={className} fill="currentColor">
    <path d="M16 2c-4 6-10 12-10 22a10 10 0 0 0 18 6c2-3 2-7 0-10s-6-4-8-2c-1 1-1 3 0 4s3 1 4 0c-1 3-5 4-7 2s-2-6 0-9c2-4 7-6 9-4 3 3 2 9-1 13a12 12 0 0 1-8 4c-5 0-9-4-9-9 0-8 5-14 9-20z" />
  </svg>
);

const Star = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const Heart = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

/* ── Floating icon config ── */
interface FloatingIcon {
  Icon: React.FC<{ className?: string }>;
  size: string;
  top: string;
  delay: string;
  duration: string;
  animation: string;
}

const leftIcons: FloatingIcon[] = [
  { Icon: PianoKeys, size: "w-14 h-14", top: "5%", delay: "0s", duration: "8s", animation: "floatUp" },
  { Icon: MusicNote, size: "w-10 h-10", top: "20%", delay: "2s", duration: "10s", animation: "floatUpAlt" },
  { Icon: House, size: "w-12 h-12", top: "40%", delay: "4s", duration: "9s", animation: "floatUp" },
  { Icon: Star, size: "w-9 h-9", top: "60%", delay: "1s", duration: "11s", animation: "floatUpAlt" },
  { Icon: TrebleClef, size: "w-10 h-14", top: "75%", delay: "3s", duration: "8.5s", animation: "floatUp" },
  { Icon: Heart, size: "w-9 h-9", top: "15%", delay: "5s", duration: "10.5s", animation: "floatUpAlt" },
  { Icon: MusicNote, size: "w-12 h-12", top: "50%", delay: "6.5s", duration: "9.5s", animation: "floatUp" },
  { Icon: PianoKeys, size: "w-11 h-11", top: "85%", delay: "7s", duration: "8s", animation: "floatUpAlt" },
];

const rightIcons: FloatingIcon[] = [
  { Icon: MusicNote, size: "w-12 h-12", top: "10%", delay: "1s", duration: "9s", animation: "floatUpAlt" },
  { Icon: House, size: "w-11 h-11", top: "30%", delay: "3.5s", duration: "10s", animation: "floatUp" },
  { Icon: PianoKeys, size: "w-14 h-14", top: "50%", delay: "0.5s", duration: "8.5s", animation: "floatUpAlt" },
  { Icon: TrebleClef, size: "w-10 h-14", top: "65%", delay: "5s", duration: "11s", animation: "floatUp" },
  { Icon: Star, size: "w-9 h-9", top: "80%", delay: "2.5s", duration: "9.5s", animation: "floatUpAlt" },
  { Icon: Heart, size: "w-10 h-10", top: "25%", delay: "4s", duration: "8s", animation: "floatUp" },
  { Icon: MusicNote, size: "w-9 h-9", top: "45%", delay: "6s", duration: "10.5s", animation: "floatUpAlt" },
  { Icon: PianoKeys, size: "w-11 h-11", top: "90%", delay: "7.5s", duration: "9s", animation: "floatUp" },
];

export default function ScholarshipBanner() {
  const [ref, visible] = useInView<HTMLElement>({ threshold: 0.2 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-zinc-900 py-20 sm:py-28">
      {/* Accent lines */}
      {/* Wavy top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] -translate-y-[1px]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[50px] sm:h-[70px]">
          <path d="M0,60 C300,120 600,0 900,60 C1050,90 1150,40 1200,60 L1200,0 L0,0 Z" fill="#faf7f2" />
        </svg>
      </div>
      {/* Wavy bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] translate-y-[1px] rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[50px] sm:h-[70px]">
          <path d="M0,60 C300,120 600,0 900,60 C1050,90 1150,40 1200,60 L1200,0 L0,0 Z" fill="#faf7f2" />
        </svg>
      </div>

      {/* Background glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-[700px] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, #6343d4 0%, transparent 70%)",
          animation: "pulse-glow 4s ease-in-out infinite",
        }}
      />

      {/* ── Left floating icons ── */}
      <div className="absolute left-0 top-0 h-full w-[35%]">
        {leftIcons.map(({ Icon, size, top, delay, duration, animation }, i) => (
          <div
            key={`left-${i}`}
            className="absolute"
            style={{
              top,
              left: `${10 + (i % 4) * 22}%`,
              animation: visible
                ? `${animation} ${duration} ${delay} ease-in-out infinite, drift ${parseFloat(duration) + 2}s ${delay} ease-in-out infinite`
                : "none",
            }}
          >
            <Icon className={`${size} text-accent drop-shadow-[0_0_8px_rgba(99,67,212,0.6)]`} />
          </div>
        ))}
      </div>

      {/* ── Right floating icons ── */}
      <div className="absolute right-0 top-0 h-full w-[35%]">
        {rightIcons.map(({ Icon, size, top, delay, duration, animation }, i) => (
          <div
            key={`right-${i}`}
            className="absolute"
            style={{
              top,
              right: `${10 + (i % 4) * 22}%`,
              animation: visible
                ? `${animation} ${duration} ${delay} ease-in-out infinite, drift ${parseFloat(duration) + 2}s ${delay} ease-in-out infinite`
                : "none",
            }}
          >
            <Icon className={`${size} text-accent drop-shadow-[0_0_8px_rgba(99,67,212,0.6)]`} />
          </div>
        ))}
      </div>

      {/* ── Content ── */}
      <div
        className="relative mx-auto max-w-4xl px-6 text-center sm:px-12"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.7s ease-out",
        }}
      >
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-5 py-2">
          <svg viewBox="0 0 20 20" className="h-5 w-5 text-accent" fill="currentColor">
            <path d="M10 1l2.39 4.84L18 6.71l-4 3.9.94 5.5L10 13.77l-4.94 2.34.94-5.5-4-3.9 5.61-.87L10 1z" />
          </svg>
          <span className="text-sm font-bold uppercase tracking-wider text-accent">
            Now Accepted
          </span>
        </div>

        <h2 className="mb-5 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
          We Accept the Utah Fits All Scholarship
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
          The Utah Fits All Scholarship is a program where parents can use a certain amount of money
          on extracurriculars. Private businesses can sign up for it so that parents can spend their
          scholarship money on piano lessons. We have signed up to use it.
        </p>

        <Link
          href="/schedule-call"
          className="inline-block rounded-full bg-cta px-10 py-4 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:bg-cta-hover hover:shadow-2xl hover:-translate-y-1"
        >
          Learn More
        </Link>
      </div>
    </section>
  );
}
