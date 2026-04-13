"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/use-in-view";

/* ═══════════════════════════════════════════
   Floating Musical Hearts Animation (Hero)
   ═══════════════════════════════════════════ */
interface Heart {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  drift: number;
  phase: number;
  hasNote: boolean;
}

function FloatingHeartsAnimation({ visible }: { visible: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const heartsRef = useRef<Heart[]>([]);

  useEffect(() => {
    if (!visible) return;
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

    // Spawn hearts
    function spawnHeart(): Heart {
      return {
        x: Math.random() * w,
        y: h + 40,
        size: 28 + Math.random() * 36,
        speed: 0.5 + Math.random() * 0.9,
        opacity: 0.5 + Math.random() * 0.45,
        drift: (Math.random() - 0.5) * 0.8,
        phase: Math.random() * Math.PI * 2,
        hasNote: Math.random() > 0.4,
      };
    }

    // Initialize pool
    for (let i = 0; i < 40; i++) {
      const heart = spawnHeart();
      heart.y = Math.random() * h;
      heartsRef.current.push(heart);
    }

    function drawHeart(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      opacity: number,
      hasNote: boolean
    ) {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = opacity;

      // Heart shape
      ctx.beginPath();
      const s = size;
      ctx.moveTo(0, s * 0.35);
      ctx.bezierCurveTo(-s * 0.5, -s * 0.1, -s, s * 0.1, -s * 0.5, s * 0.6);
      ctx.lineTo(0, s);
      ctx.lineTo(s * 0.5, s * 0.6);
      ctx.bezierCurveTo(s, s * 0.1, s * 0.5, -s * 0.1, 0, s * 0.35);
      ctx.closePath();

      ctx.shadowColor = "rgba(99, 67, 212, 0.6)";
      ctx.shadowBlur = 16;
      ctx.fillStyle = `rgba(99, 67, 212, ${opacity * 0.7})`;
      ctx.strokeStyle = `rgba(99, 67, 212, ${opacity})`;
      ctx.lineWidth = 2.5;
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Music note inside
      if (hasNote) {
        ctx.globalAlpha = opacity * 0.9;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
        ctx.font = `bold ${s * 0.55}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("♪", 0, s * 0.5);
      }

      ctx.restore();
    }

    function draw(now: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      for (const heart of heartsRef.current) {
        // Move upward
        heart.y -= heart.speed;
        // Gentle side-to-side sway
        heart.x += heart.drift + Math.sin(now / 1500 + heart.phase) * 0.3;

        // Recycle when off top
        if (heart.y < -60) {
          heart.y = h + 40;
          heart.x = Math.random() * w;
        }

        drawHeart(ctx, heart.x, heart.y, heart.size, heart.opacity, heart.hasNote);
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [visible]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: visible ? 0.8 : 0, transition: "opacity 1.2s ease-out" }}
    />
  );
}

/* ═══════════════════════════════════════════
   Core Values Data
   ═══════════════════════════════════════════ */
const coreValues = [
  {
    number: "01",
    title: "Volz Method Piano Lessons sees the pianist in ",
    highlight: "everyone",
    description:
      "We are obsessed with finding what will motivate a student to practice, whatever that may be, with the ultimate goal of getting the student to develop an intrinsic love for the piano.",
    dark: false,
  },
  {
    number: "02",
    title: "Volz Method Piano Lessons is a ",
    highlight: "growth mindset",
    description:
      'No one has ever "arrived", nor is anyone a "failure". Seeing our weakness is a good thing because it empowers us with the knowledge we need about ourselves to improve. We are committed to finding or pioneering the best pedagogy that would most effectively teach the student according to their needs, always improving how we teach; always improving the company and its employees. Volz Method Piano Lessons is not just a business, it\'s an academy.',
    titleSuffix: " company",
    dark: true,
  },
  {
    number: "03",
    title: "The business is only as good as its ",
    highlight: "teachers",
    description:
      "We empower the teachers to contribute to the Volz method to find what will motivate the student and most effectively teach them according to their needs. Our teachers are our most valuable asset for learning and growing, improving, and serving the students and parents. The teachers are the critical link between the student and the Volz Method.",
    dark: false,
  },
  {
    number: "04",
    title: "Volz Method Piano Lessons is laser ",
    highlight: "focused",
    description:
      "We strive to be the best piano teaching company, and all of our efforts will be toward that end, never to distract. We do not get active into politics of any sort as an organization. We do not hire or select customers based on immutable characteristics or their personal beliefs, ever.",
    titleSuffix: " on its mission.",
    dark: true,
  },
];

/* ═══════════════════════════════════════════
   Value Row Component
   ═══════════════════════════════════════════ */
function ValueRow({
  value,
}: {
  value: (typeof coreValues)[number];
}) {
  const [rowRef, visible] = useInView<HTMLDivElement>({ threshold: 0.2 });

  const delay = 0.15;

  return (
    <div
      ref={rowRef}
      className={`${value.dark ? "bg-zinc-900" : "bg-white"}`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-12 py-16 sm:py-20">
        {/* Orange divider line at top */}
        <div
          className="mb-10 h-px bg-gradient-to-r from-brand via-brand/40 to-transparent"
          style={{
            transform: visible ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: "transform 0.8s ease-out",
          }}
        />

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_auto] lg:gap-16">
          {/* Left — Content */}
          <div>
            <h3
              className={`text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl ${
                value.dark ? "text-white" : "text-zinc-900"
              }`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-30px)",
                transition: `all 0.7s ease-out ${delay}s`,
              }}
            >
              {value.title}
              <span
                className="relative inline-block"
              >
                <span className="relative z-10">{value.highlight}</span>
                <span
                  className="absolute bottom-0.5 left-0 h-3 w-full rounded-sm bg-brand/25 -z-0"
                  style={{
                    transform: visible ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: `transform 0.5s ease-out ${delay + 0.4}s`,
                  }}
                />
              </span>
              {value.titleSuffix || ""}
            </h3>

            <p
              className={`mt-5 max-w-3xl text-base leading-relaxed sm:text-lg ${
                value.dark ? "text-white/60" : "text-zinc-500"
              }`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `all 0.6s ease-out ${delay + 0.25}s`,
              }}
            >
              {value.description}
            </p>
          </div>

          {/* Right — Big number */}
          <div
            className="hidden lg:block select-none"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(30px)",
              transition: `all 0.8s ease-out ${delay + 0.1}s`,
            }}
          >
            <span
              className={`text-[10rem] font-black leading-none tracking-tighter ${
                value.dark ? "text-white/[0.04]" : "text-zinc-900/[0.04]"
              }`}
              style={{
                WebkitTextStroke: `2px ${
                  value.dark
                    ? "rgba(99, 67, 212, 0.15)"
                    : "rgba(99, 67, 212, 0.12)"
                }`,
              }}
            >
              {value.number}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Page
   ═══════════════════════════════════════════ */
export default function CoreValuesPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-zinc-900 pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/40 via-zinc-900/20 to-zinc-900 z-[1]" />
        <FloatingHeartsAnimation visible={visible} />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[500px] rounded-full opacity-15 blur-[120px] z-[1]"
          style={{
            background:
              "radial-gradient(circle, #6343d4 0%, transparent 70%)",
          }}
        />

        <div className="relative z-[2] text-center px-6">
          <h1
            className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s ease-out 0.2s",
              textShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            Core Values
          </h1>
          <p
            className="mt-6 mx-auto max-w-2xl text-lg text-white/60 sm:text-xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease-out 0.5s",
            }}
          >
            The principles that guide every lesson, every teacher, and every
            family we serve.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-zinc-900 to-transparent z-[1]" />
      </section>

      {/* ── Core Values ── */}
      {coreValues.map((value, i) => (
        <ValueRow key={i} value={value} />
      ))}

    </main>
  );
}
