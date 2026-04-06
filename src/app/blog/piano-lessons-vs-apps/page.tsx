"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

/* ═══════════════════════════════════════════
   Animated Section Wrapper
   ═══════════════════════════════════════════ */
function AnimatedSection({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s` }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   Section Heading with orange bar
   ═══════════════════════════════════════════ */
function SectionHeading({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="flex items-start gap-4 mt-12 mb-4">
      <div className="mt-1.5 w-1 rounded-full bg-brand flex-shrink-0"
        style={{ height: visible ? "2.5rem" : "0", transition: "height 0.5s ease-out 0.1s" }} />
      <h2 className="text-2xl font-extrabold text-zinc-900 sm:text-3xl"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-12px)", transition: "opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s" }}>
        {children}
      </h2>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Staggered List
   ═══════════════════════════════════════════ */
function StaggerList({ items, ordered = false }: { items: ReactNode[]; ordered?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const Tag = ordered ? "ol" : "ul";
  return (
    <div ref={ref}>
      <Tag className={`${ordered ? "list-decimal" : "list-disc"} pl-6 mb-6 space-y-3 text-zinc-600`}>
        {items.map((item, i) => (
          <li key={i} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-16px)", transition: `opacity 0.45s ease-out ${i * 0.07}s, transform 0.45s ease-out ${i * 0.07}s` }}>
            {item}
          </li>
        ))}
      </Tag>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Animated Comparison Table
   ═══════════════════════════════════════════ */
const tableRows = [
  { label: "Piano app subscription", monthly: "$10–$15", annual: "$120–$170", highlight: false },
  { label: "National avg. private lessons", monthly: "$150–$250", annual: "$1,800–$3,000", highlight: false },
  { label: "Volz Method (in-home)", monthly: "$116–$180*", annual: "$1,392–$2,160", highlight: true },
];

function AnimatedTable() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="mb-2 overflow-x-auto rounded-xl border border-zinc-200">
      <table className="w-full text-sm sm:text-base">
        <thead>
          <tr className="bg-zinc-50 text-left">
            {["Option", "Monthly Cost", "Annual Cost"].map((h, i) => (
              <th key={h} className="px-5 py-3 font-bold text-zinc-900"
                style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(-8px)", transition: `opacity 0.4s ease-out ${i * 0.06}s, transform 0.4s ease-out ${i * 0.06}s` }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-zinc-600">
          {tableRows.map((row, i) => (
            <tr key={row.label} className={`border-t ${row.highlight ? "bg-brand/[0.04]" : "border-zinc-100"}`}
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-20px)", transition: `opacity 0.5s ease-out ${0.15 + i * 0.1}s, transform 0.5s ease-out ${0.15 + i * 0.1}s` }}>
              <td className={`px-5 py-3 ${row.highlight ? "font-semibold text-zinc-900" : ""}`}>
                {row.highlight && <span className="inline-block mr-2 h-2 w-2 rounded-full bg-brand" />}
                {row.label}
              </td>
              <td className="px-5 py-3">{row.monthly}</td>
              <td className="px-5 py-3">{row.annual}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Decision Framework (slide-in bullets)
   ═══════════════════════════════════════════ */
const decisions = [
  { condition: "Your child is just exploring interest", action: "Try a free app trial first. See if they gravitate toward the keyboard. If they do, that's your signal to invest in lessons." },
  { condition: "Your child is serious, or you want real, lasting progress", action: "Private lessons with a qualified teacher. There's no substitute for personalized instruction and real-time feedback." },
  { condition: "You want the best of both worlds", action: "In-home lessons once a week, supplemented by app practice between sessions. This is what we see the best results with." },
  { condition: "Budget is tight", action: "Look into scholarship programs like Utah Fits All and ask about pricing options. Quality lessons may be more affordable than you think." },
];

function DecisionFramework() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="mb-6 space-y-4">
      {decisions.map((d, i) => (
        <div key={i} className="flex items-start gap-4 rounded-xl border border-zinc-100 p-4"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-20px)", transition: `opacity 0.5s ease-out ${i * 0.1}s, transform 0.5s ease-out ${i * 0.1}s` }}>
          <div className="flex-shrink-0 mt-0.5">
            <div className="h-6 w-6 rounded-full bg-brand flex items-center justify-center">
              <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div>
            <span className="font-bold text-zinc-900">{d.condition} → </span>
            <span className="text-zinc-600">{d.action}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   FAQ Item
   ═══════════════════════════════════════════ */
function FaqItem({ q, a }: { q: string; a: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="mt-6 rounded-xl border border-zinc-100 bg-zinc-50 p-6"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.5s ease-out, transform 0.5s ease-out" }}>
      <div className="flex items-start gap-3 mb-3">
        <span className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full bg-brand flex items-center justify-center">
          <span className="text-[10px] font-bold text-white">Q</span>
        </span>
        <h3 className="text-lg font-bold text-zinc-900">{q}</h3>
      </div>
      <p className="text-base leading-relaxed text-zinc-600 pl-8">{a}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Split Floating Animation — Canvas Hero
   Left side: smartphone outlines | Right side: musical symbols
   ═══════════════════════════════════════════ */
interface SplitParticle {
  x: number; y: number; size: number; speed: number;
  opacity: number; drift: number; phase: number;
  side: "app" | "music";
}

function SplitFloatingAnimation({ visible }: { visible: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<SplitParticle[]>([]);
  const musicGlyphs = ["♪", "♫", "♩", "♬"];

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;
    function resize() {
      if (!canvas) return;
      w = canvas.offsetWidth * 2;
      h = canvas.offsetHeight * 2;
      canvas.width = w;
      canvas.height = h;
    }
    resize();
    window.addEventListener("resize", resize);

    function spawn(forceSide?: "app" | "music"): SplitParticle {
      const side = forceSide ?? (Math.random() > 0.5 ? "app" : "music");
      const halfW = w / 2;
      // Apps spawn left third, music spawns right third
      const x = side === "app"
        ? Math.random() * halfW * 0.8
        : halfW + Math.random() * halfW * 0.8 + halfW * 0.1;
      return {
        x, y: h + 50,
        size: 14 + Math.random() * 22,
        speed: 0.4 + Math.random() * 0.9,
        opacity: 0.25 + Math.random() * 0.45,
        drift: (Math.random() - 0.5) * 0.5,
        phase: Math.random() * Math.PI * 2,
        side,
      };
    }

    for (let i = 0; i < 32; i++) {
      const side = i < 16 ? "app" : "music";
      const p = spawn(side);
      p.y = Math.random() * h;
      particlesRef.current.push(p);
    }

    function drawPhone(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, opacity: number) {
      const w2 = size * 0.65, h2 = size * 1.1, r = size * 0.15;
      const x = cx - w2 / 2, y = cy - h2 / 2;
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = "rgba(130, 160, 255, 0.8)";
      ctx.lineWidth = 2;
      ctx.shadowColor = "rgba(100, 140, 255, 0.3)";
      ctx.shadowBlur = 8;
      // Rounded rect body
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w2 - r, y);
      ctx.quadraticCurveTo(x + w2, y, x + w2, y + r);
      ctx.lineTo(x + w2, y + h2 - r);
      ctx.quadraticCurveTo(x + w2, y + h2, x + w2 - r, y + h2);
      ctx.lineTo(x + r, y + h2);
      ctx.quadraticCurveTo(x, y + h2, x, y + h2 - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.stroke();
      // Camera dot
      ctx.beginPath();
      ctx.arc(cx, y + size * 0.18, size * 0.08, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(130, 160, 255, 0.6)";
      ctx.fill();
      // Home bar
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.2, y + h2 - size * 0.15);
      ctx.lineTo(cx + size * 0.2, y + h2 - size * 0.15);
      ctx.strokeStyle = "rgba(130, 160, 255, 0.5)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    }

    function drawMusicSymbol(ctx: CanvasRenderingContext2D, p: SplitParticle, now: number) {
      const glyph = musicGlyphs[Math.floor(p.phase * musicGlyphs.length) % musicGlyphs.length];
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.shadowColor = "rgba(99, 67, 212, 0.4)";
      ctx.shadowBlur = 10;
      ctx.fillStyle = `rgba(99, 67, 212, ${p.opacity * 0.9})`;
      ctx.font = `bold ${p.size * 2.2}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(glyph, p.x, p.y);
      ctx.restore();
    }

    function draw(now: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      // Subtle center divider line
      ctx.save();
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 10]);
      ctx.beginPath();
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w / 2, h);
      ctx.stroke();
      ctx.restore();

      for (const p of particlesRef.current) {
        p.y -= p.speed;
        p.x += p.drift + Math.sin(now / 2400 + p.phase) * 0.2;
        if (p.y < -80) { Object.assign(p, spawn(p.side)); }

        if (p.side === "app") {
          drawPhone(ctx, p.x, p.y, p.size, p.opacity);
        } else {
          drawMusicSymbol(ctx, p, now);
        }
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
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"
      style={{ opacity: visible ? 0.75 : 0, transition: "opacity 1.2s ease-out" }} />
  );
}

/* ═══════════════════════════════════════════
   Page
   ═══════════════════════════════════════════ */
export default function AppsVsLessonsBlogPost() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden bg-zinc-900 pt-24">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[500px] rounded-full opacity-15 blur-[120px]"
          style={{ background: "radial-gradient(circle, #6343d4 0%, transparent 70%)" }} />
        <SplitFloatingAnimation visible={visible} />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/30 via-transparent to-zinc-900 z-[1]" />

        <div className="relative z-[2] text-center px-6">
          {/* VS badge */}
          <div className="mb-6 inline-flex items-center gap-3"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "all 0.6s ease-out 0.1s" }}>
            <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-300">Apps</span>
            <span className="text-white/40 text-sm font-bold">VS</span>
            <span className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-bold text-brand">Real Lessons</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl max-w-4xl mx-auto"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease-out 0.2s", textShadow: "0 4px 24px rgba(0,0,0,0.5)" }}>
            Piano Lessons vs. Piano Apps: What Actually Works for Kids?
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-white/60 sm:text-xl"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease-out 0.5s" }}>
            An honest comparison from teachers who work with kids every day.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[2]" />
      </section>

      {/* ── Article ── */}
      <article className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 sm:px-12">

          <AnimatedSection>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              Parents today have more piano learning options than ever. Apps like Simply Piano, Yousician, Flowkey, and Skoove promise to teach your child piano for a fraction of the cost of private lessons — available 24/7, no scheduling required, with gamified features that make learning feel like playing a video game.
            </p>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              So do kids actually need a real teacher anymore? <strong className="text-zinc-900">The short answer is yes — but apps have a role too.</strong> This isn&apos;t a hit piece on piano apps. It&apos;s an honest look at what each option does well, where each falls short, and how to make the right choice for your family.
            </p>
          </AnimatedSection>

          <SectionHeading>What Piano Apps Do Well</SectionHeading>
          <AnimatedSection delay={0.1}>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-4">
              Let&apos;s give credit where it&apos;s due. Piano apps have real strengths:
            </p>
          </AnimatedSection>
          <StaggerList items={[
            <><strong className="text-zinc-900">Low cost.</strong> Most apps run $10–$15 per month, compared to $120–$200 per month for private lessons. That&apos;s a significant difference, especially for families testing the waters.</>,
            <><strong className="text-zinc-900">Available anytime.</strong> No scheduling, no commuting, no cancellation hassles. Your child can practice at 7 AM or 9 PM — whenever the mood strikes.</>,
            <><strong className="text-zinc-900">Gamification keeps initial engagement high.</strong> Points, streaks, progress bars, and level-ups tap into the same psychology that makes video games addictive. Kids love the instant feedback.</>,
            <><strong className="text-zinc-900">Great for testing interest.</strong> Not sure if your child will stick with piano? A free app trial is a low-risk way to find out before committing to lessons.</>,
            <><strong className="text-zinc-900">Large song libraries.</strong> Simply Piano alone offers thousands of songs across genres. Kids can explore pop, classical, movie themes, and more.</>,
          ]} />
          <AnimatedSection delay={0.05}>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              If you&apos;re a parent considering piano for your child and you&apos;re not sure if they&apos;ll like it, downloading a free app trial is a perfectly reasonable first step. No argument there.
            </p>
          </AnimatedSection>

          <SectionHeading>Where Piano Apps Fall Short</SectionHeading>
          <AnimatedSection delay={0.1}>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-4">
              Here&apos;s where things get more complicated. Apps have fundamental limitations that become apparent over time:
            </p>
            <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Apps can&apos;t see your child&apos;s hands</h3>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              This is the single biggest issue, and it&apos;s the one piano teachers see most often in students who started on apps. Apps listen to which notes are played, but they can&apos;t see <em>how</em> they&apos;re being played. Collapsed wrists, flat fingers, tense shoulders, incorrect fingering — these bad habits form silently and become extremely difficult to correct later. It&apos;s like learning to type with two fingers: it works at first, but eventually it limits how far you can go.
            </p>
            <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Zero personalization</h3>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              Every child gets the exact same curriculum in the exact same order, regardless of how they learn, what they&apos;re interested in, or where they&apos;re struggling. There&apos;s no adaptation.
            </p>
            <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Gamification fades</h3>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              The points and streaks that make apps engaging in week one lose their magic by month two or three. Once the novelty wears off, most kids stop opening the app — because the motivation was tied to the game, not the music.
            </p>
            <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">No accountability or relationship</h3>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              There&apos;s no one to notice when your child is stuck, no one to adjust the difficulty, no one to say &ldquo;Great job — I can tell you practiced that section.&rdquo; The human element of teaching isn&apos;t just nice to have; it&apos;s what keeps students going when things get hard.
            </p>
            <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Playing along isn&apos;t the same as understanding music</h3>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              Apps teach you to follow along in the moment — hit the right key when the screen tells you to. But turn off the app, and many kids can&apos;t reproduce what they &ldquo;learned.&rdquo; True musical understanding — reading notation, hearing chord progressions, improvising, playing from memory — requires the kind of teaching that only a human can provide.
            </p>
          </AnimatedSection>

          <SectionHeading>What a Great Piano Teacher Provides That No App Can</SectionHeading>
          <StaggerList items={[
            <><strong className="text-zinc-900">Real-time technique correction.</strong> A teacher watches your child&apos;s hands, posture, and movement and corrects issues before they become habits. Fixing bad technique later takes months of re-learning.</>,
            <><strong className="text-zinc-900">Curriculum adapted to your child.</strong> The Volz Method&apos;s four pillars — Reading, Composing, Hearing, and Arranging — give teachers multiple approaches for every student. If one pathway isn&apos;t working, they have others to try.</>,
            <><strong className="text-zinc-900">A human relationship.</strong> Accountability, emotional support, and genuine celebration of milestones. Kids work harder for people they care about.</>,
            <><strong className="text-zinc-900">Teaching music the child actually wants to play.</strong> Not a preset algorithm-driven curriculum, but actual songs your child requests — and using those songs to teach theory, technique, and musicianship.</>,
            <><strong className="text-zinc-900">Environment awareness.</strong> In-home teachers see your child&apos;s instrument, bench height, practice space, and distractions. They can optimize the setup in ways no app can.</>,
          ]} />

          <SectionHeading>The Smart Approach: Use Both</SectionHeading>
          <AnimatedSection delay={0.1}>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              Here&apos;s what we actually recommend to parents: <strong className="text-zinc-900">don&apos;t think of it as apps vs. lessons. Think of apps as a supplement to lessons.</strong>
            </p>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-4">
              A child taking weekly in-home lessons with a great teacher can use apps between sessions for:
            </p>
          </AnimatedSection>
          <StaggerList items={[
            "Sight-reading practice and reinforcement",
            "Ear training games",
            "Music theory quizzes",
            "Exploring new songs they might want to learn with their teacher",
          ]} />
          <AnimatedSection delay={0.05}>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              The teacher provides the foundation, technique correction, and personalization. The app provides extra practice and gamified reinforcement between lessons. Together, they&apos;re more effective than either one alone.
            </p>
          </AnimatedSection>

          <SectionHeading>The Real Cost Comparison</SectionHeading>
          <AnimatedSection delay={0.1}>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-4">Let&apos;s look at the numbers honestly:</p>
          </AnimatedSection>
          <AnimatedTable />
          <AnimatedSection delay={0.1}>
            <p className="text-xs text-zinc-400 mb-6">*Based on weekly 30-minute lessons at $29–$45 per session.</p>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              Yes, apps are cheaper upfront. But consider what you&apos;re getting per dollar. Factor in the cost of correcting bad technique later (often months of re-learning), the likelihood of your child abandoning the app within a few months vs. continuing with a teacher they have a relationship with, and the actual skill development happening per session.
            </p>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              For Utah families, there&apos;s another factor: <strong className="text-zinc-900">Volz Method accepts the Utah Fits All Scholarship</strong>, which can help offset the cost of private lessons. This makes quality in-home instruction more accessible than many parents realize.
            </p>
          </AnimatedSection>

          <SectionHeading>How to Know Which Is Right for Your Family</SectionHeading>
          <AnimatedSection delay={0.1}>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-4">Here&apos;s a simple decision framework:</p>
          </AnimatedSection>
          <DecisionFramework />

          <SectionHeading>Frequently Asked Questions</SectionHeading>

          <FaqItem q="Can my child learn piano from an app alone?"
            a="They can learn the basics — simple songs, note recognition, basic rhythms. But they'll likely develop technique issues that become harder to fix over time. Think of it like YouTube workout videos: better than nothing, but a personal trainer will get you much further, much faster, and without injury." />
          <FaqItem q="What is the best piano app for kids?"
            a="Simply Piano and Yousician are the most popular options for kids, with colorful interfaces and gamified progression. Flowkey tends to work better for teens and adults. All are solid as supplemental tools used alongside real lessons. None are a complete replacement for a teacher." />
          <FaqItem q="Are piano lessons worth the money?"
            a="If your goal is for your child to truly play piano — not just follow along with a screen — then yes. The investment in a good teacher pays dividends in proper technique, real musical understanding, and the confidence that comes from genuine mastery. Most adults who play piano well will tell you it started with a teacher who made a difference." />
          <FaqItem q="How much should piano lessons cost?"
            a="Nationally, private lessons typically range from $30–$75 per half hour, depending on location, teacher experience, and whether lessons are in-studio or in-home. Volz Method offers in-home lessons starting at $29 per half hour — competitive with studio rates, with the convenience of a teacher who comes to you." />

        </div>
      </article>

    </main>
  );
}
