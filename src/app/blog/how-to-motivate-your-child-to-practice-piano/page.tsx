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
   Motivation Framework Card (Autonomy / Competence / Connection)
   ═══════════════════════════════════════════ */
function FrameworkCard({ num, icon, title, children }: { num: string; icon: string; title: string; children: ReactNode }) {
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
    <div ref={ref} className="mt-6 rounded-2xl border-l-4 border-brand bg-gradient-to-r from-brand/5 to-transparent p-6"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.55s ease-out, transform 0.55s ease-out" }}>
      <div className="flex items-center gap-3 mb-3">
        <span className="flex-shrink-0 h-9 w-9 rounded-full bg-brand flex items-center justify-center text-white text-lg">{icon}</span>
        <h3 className="text-xl font-bold text-zinc-900">{num}. {title}</h3>
      </div>
      <div className="text-base leading-relaxed text-zinc-600">{children}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Staggered List (slide from left)
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
   FAQ Item (card style)
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
   Floating Musical Notes — Canvas Hero Animation
   ═══════════════════════════════════════════ */
interface NoteParticle {
  x: number; y: number; size: number; speed: number;
  opacity: number; drift: number; phase: number;
  glyph: string; pulse: number; pulseSpeed: number;
}

function FloatingNotesAnimation({ visible }: { visible: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<NoteParticle[]>([]);
  const glyphs = ["♩", "♪", "♫", "♬", "𝄞", "♩", "♪"];

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

    function spawn(): NoteParticle {
      return {
        x: Math.random() * w,
        y: h + 40,
        size: 16 + Math.random() * 28,
        speed: 0.5 + Math.random() * 1.0,
        opacity: 0.35 + Math.random() * 0.5,
        drift: (Math.random() - 0.5) * 0.7,
        phase: Math.random() * Math.PI * 2,
        glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
        pulse: 0,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      };
    }

    for (let i = 0; i < 30; i++) {
      const p = spawn();
      p.y = Math.random() * h;
      particlesRef.current.push(p);
    }

    function draw(now: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      for (const p of particlesRef.current) {
        p.y -= p.speed;
        p.x += p.drift + Math.sin(now / 2200 + p.phase) * 0.3;
        p.pulse += p.pulseSpeed;
        if (p.y < -60) { Object.assign(p, spawn()); }

        // Pulse opacity slightly
        const pulseOpacity = p.opacity + Math.sin(p.pulse) * 0.12;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, pulseOpacity));
        ctx.shadowColor = "rgba(99, 67, 212, 0.5)";
        ctx.shadowBlur = 10;
        ctx.fillStyle = `rgba(99, 67, 212, ${pulseOpacity * 0.85})`;
        ctx.font = `bold ${p.size * 2}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.glyph, p.x, p.y);
        ctx.restore();
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
      style={{ opacity: visible ? 0.7 : 0, transition: "opacity 1.2s ease-out" }} />
  );
}

/* ═══════════════════════════════════════════
   Page
   ═══════════════════════════════════════════ */
export default function MotivationBlogPost() {
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
        <FloatingNotesAnimation visible={visible} />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/30 via-transparent to-zinc-900 z-[1]" />

        <div className="relative z-[2] text-center px-6">
          <span className="inline-block rounded-full bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand mb-6"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "all 0.6s ease-out 0.1s" }}>
            Practice Tips
          </span>
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl max-w-4xl mx-auto"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease-out 0.2s", textShadow: "0 4px 24px rgba(0,0,0,0.5)" }}>
            How to Motivate Your Child to Practice Piano
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-white/60 sm:text-xl"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease-out 0.5s" }}>
            Without the daily battle.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[2]" />
      </section>

      {/* ── Article ── */}
      <article className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 sm:px-12">

          <AnimatedSection>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              If piano practice has become a nightly argument in your house, you&apos;re not alone — and <strong className="text-zinc-900">the problem probably isn&apos;t your child</strong>.
            </p>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              This is the single most common concern parents bring to our teachers at Volz Method. &ldquo;My kid loved piano at first, but now getting them to practice is a battle.&rdquo; We hear it every week. And after working with hundreds of families across Utah and Idaho, we&apos;ve learned that the real issue is almost always a mismatch between the teaching approach and the child — not a lack of discipline or interest.
            </p>
          </AnimatedSection>

          <SectionHeading>Why Most Practice Battles Happen (It&apos;s Not Laziness)</SectionHeading>
          <AnimatedSection delay={0.1}>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              Before jumping to solutions, it helps to understand why practice resistance happens in the first place. In our experience, it almost always comes down to one of three root causes:
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">The music doesn&apos;t connect</h3>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              Practicing scales and songs they didn&apos;t choose and don&apos;t care about feels pointless to a child. Imagine being told to read a book you have zero interest in, every single day, for months. That&apos;s what practice feels like when the material doesn&apos;t resonate.
            </p>
            <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Practice feels like a chore with zero autonomy</h3>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              When a child has no say in what they play, when they practice, or how they practice, piano becomes just another item on the list of things adults make them do. Kids — especially ages 7 and up — need some sense of ownership over the process.
            </p>
            <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">The method doesn&apos;t match how they learn</h3>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              A visual learner forced to learn exclusively by ear. An ear-player forced to stare at sheet music for months before touching a song they recognize. When the teaching approach clashes with how a child&apos;s brain works, frustration is inevitable. Research on intrinsic vs. extrinsic motivation consistently shows that students who practice because they <em>want</em> to persist longer, learn at higher quality, and push through difficulty far more effectively.
            </p>
          </AnimatedSection>

          <SectionHeading>The Intrinsic Motivation Framework: 3 Keys That Actually Work</SectionHeading>
          <AnimatedSection delay={0.1}>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-4">
              Decades of research in educational psychology point to three conditions that foster intrinsic motivation. When all three are present, practice battles tend to disappear.
            </p>
          </AnimatedSection>

          <FrameworkCard num="1" icon="🎯" title="Autonomy — Let them have a voice">
            Let kids have a say in what they play. If your child wants to learn the theme from their favorite show, a pop song they heard on the radio, or music from a video game, <strong className="text-zinc-900">that is valid music education</strong>. Theory, technique, and reading skills can all be taught through the music a child actually cares about. The Volz Method is built on this idea — students pick the music, and teachers build the curriculum around it.
          </FrameworkCard>

          <FrameworkCard num="2" icon="⭐" title="Competence — Create frequent wins">
            Nothing kills motivation like spending three months stuck on one piece that feels impossible. Break songs into small, achievable chunks so kids experience the thrill of &ldquo;I can play that!&rdquo; regularly. A good teacher adjusts difficulty in real time — challenging enough to grow, manageable enough to succeed.
          </FrameworkCard>

          <FrameworkCard num="3" icon="🤝" title="Connection — The relationship matters">
            The teacher-student relationship is one of the most underrated factors in piano motivation. A teacher who comes to your home, knows your child by name, remembers their favorite song from last week, and genuinely celebrates their progress creates a bond that no sticker chart can match. Kids practice for people they respect and don&apos;t want to let down.
          </FrameworkCard>

          <SectionHeading>7 Practical Strategies Parents Can Use This Week</SectionHeading>
          <AnimatedSection delay={0.1}>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-4">
              You don&apos;t need to overhaul everything. Start with one or two of these and build from there:
            </p>
          </AnimatedSection>
          <StaggerList ordered items={[
            <><strong className="text-zinc-900">Let your child choose at least one song they&apos;re working on.</strong> Even if the rest of the repertoire is teacher-assigned, having one &ldquo;their&rdquo; song makes practice feel less like homework.</>,
            <><strong className="text-zinc-900">Set a consistent practice time — but let them help pick when.</strong> &ldquo;Do you want to practice right after school or right after dinner?&rdquo; gives them ownership without giving up structure.</>,
            <><strong className="text-zinc-900">Use a timer instead of &ldquo;play it 10 times.&rdquo;</strong> Saying &ldquo;practice for 15 minutes&rdquo; feels finite and manageable. &ldquo;Play it until it&apos;s perfect&rdquo; feels endless and demoralizing.</>,
            <><strong className="text-zinc-900">Sit nearby and listen sometimes.</strong> You don&apos;t need to be a music expert. Just being present shows you value what they&apos;re doing. Kids naturally perform for an audience.</>,
            <><strong className="text-zinc-900">Host low-pressure &ldquo;living room concerts&rdquo; for family.</strong> Let them play whatever they want for grandparents, siblings, or even the dog. Performance builds confidence and makes practice feel purposeful.</>,
            <><strong className="text-zinc-900">Celebrate effort and progress, not perfection.</strong> &ldquo;That section sounds so much smoother than last week!&rdquo; beats &ldquo;You missed that note again&rdquo; every time.</>,
            <><strong className="text-zinc-900">Communicate with the teacher about what&apos;s working and what isn&apos;t.</strong> The best piano teachers want this feedback. If practice is a struggle, the teacher can adjust the assignments, the difficulty, or the approach.</>,
          ]} />

          <SectionHeading>When the Method Is the Problem, Not the Child</SectionHeading>
          <AnimatedSection delay={0.1}>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              Traditional piano methods follow a linear path: start with this book, play these exercises, progress to the next book. For some kids, this works beautifully. But for many others, it&apos;s the single biggest motivation killer. The child doesn&apos;t connect with the music, doesn&apos;t understand why they&apos;re playing it, and eventually decides they &ldquo;don&apos;t like piano&rdquo; — when really they just didn&apos;t like that particular approach.
            </p>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              The Volz Method was built around a different philosophy, stated by founder Michael Volz: the goal is &ldquo;finding what will motivate a student to practice, with the ultimate goal of getting the student to develop an intrinsic love for the piano.&rdquo; The method&apos;s four pillars — Reading, Composing, Hearing, and Arranging — give teachers multiple entry points for every student. If reading music isn&apos;t clicking, the teacher pivots to ear training. If the student loves creating, composition becomes the hook. If they want to play their favorite pop song, arranging becomes the gateway to understanding chords and theory.
            </p>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              The method should adapt to the student, not the other way around. If your child is resisting practice, consider whether the teaching approach might need to change before assuming the child does.
            </p>
          </AnimatedSection>

          <SectionHeading>The In-Home Advantage for Building Motivation</SectionHeading>
          <StaggerList items={[
            <><strong className="text-zinc-900">There&apos;s no &ldquo;getting ready and driving&rdquo; friction.</strong> Eliminating the commute removes a common source of pre-lesson stress for both parent and child.</>,
            <><strong className="text-zinc-900">The child is in their comfort zone.</strong> They&apos;re relaxed, focused, and more willing to take risks — which is how real learning happens.</>,
            <><strong className="text-zinc-900">The teacher sees the practice environment.</strong> If the piano is in a noisy room or the bench is the wrong height, the teacher can troubleshoot it on the spot.</>,
            <><strong className="text-zinc-900">The relationship deepens naturally.</strong> The teacher becomes part of the family&apos;s routine. This builds the trust and connection that fuels motivation week after week.</>,
          ]} />
          <AnimatedSection delay={0.05}>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              For families across Utah and Idaho, Volz Method teachers drive to you — so these benefits come built in.
            </p>
          </AnimatedSection>

          <SectionHeading>Frequently Asked Questions</SectionHeading>

          <FaqItem q="How long should a child practice piano each day?"
            a="For beginners ages 5–7, 10–15 minutes daily is plenty. Ages 8–10 can aim for 15–20 minutes. Older students and more advanced players: 20–30 minutes. The key is consistency over length. Five 10-minute sessions throughout the week will always beat one painful 50-minute marathon on Sunday night." />
          <FaqItem q="What if my child wants to quit piano?"
            a="First, ask why. Usually the answer reveals frustration with the material or the teaching approach, not the instrument itself. Try switching what they're playing before switching activities. A direct conversation with the teacher can often reset things. Many students who 'quit' and come back with a different approach end up loving piano." />
          <FaqItem q="Should I use rewards to get my child to practice?"
            a="Rewards can jumpstart a routine in the short term, but research consistently shows that external rewards — stickers, screen time, treats — can actually decrease intrinsic motivation over time. The child starts practicing for the reward, not the music. The goal is for your child to practice because they want to, not because they get something for it." />
          <FaqItem q="Is it normal for kids to resist piano practice?"
            a="Completely normal. Even kids who genuinely love piano will have stretches where practice feels like a chore. Consistency through those periods is what builds the habit. The key is making sure there's enough music they actually enjoy in the mix alongside the skill-building work. When that ratio is right, the tough days become the exception, not the rule." />

        </div>
      </article>

    </main>
  );
}
