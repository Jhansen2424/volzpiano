"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

/* ═══════════════════════════════════════════
   Animated Section Wrapper
   ═══════════════════════════════════════════ */
function AnimatedSection({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   Animated H2 with orange left-bar
   ═══════════════════════════════════════════ */
function SectionHeading({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex items-start gap-4 mt-12 mb-4">
      {/* Orange left bar draws in vertically */}
      <div
        className="mt-1.5 w-1 rounded-full bg-brand flex-shrink-0"
        style={{
          height: visible ? "2.5rem" : "0",
          transition: "height 0.5s ease-out 0.1s",
        }}
      />
      <h2
        className="text-2xl font-extrabold text-zinc-900 sm:text-3xl"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-12px)",
          transition: "opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s",
        }}
      >
        {children}
      </h2>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Age Group Block with watermark number
   ═══════════════════════════════════════════ */
function AgeBlock({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative mt-8 mb-2 pl-5 border-l-2 border-brand/20 overflow-hidden">
      {/* Watermark number */}
      <span
        className="absolute right-0 top-1/2 -translate-y-1/2 text-[5rem] font-extrabold leading-none select-none pointer-events-none"
        style={{
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(99,67,212,0.12)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(30px)",
          transition: "opacity 0.6s ease-out 0.25s, transform 0.6s ease-out 0.25s",
        }}
      >
        {num}
      </span>
      <h3
        className="text-xl font-bold text-zinc-900 mb-3"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-16px)",
          transition: "opacity 0.5s ease-out 0.1s, transform 0.5s ease-out 0.1s",
        }}
      >
        {title}
      </h3>
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s",
        }}
      >
        {children}
      </div>
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const Tag = ordered ? "ol" : "ul";
  return (
    <div ref={ref}>
      <Tag className={`${ordered ? "list-decimal" : "list-disc"} pl-6 mb-6 space-y-2 text-zinc-600`}>
        {items.map((item, i) => (
          <li
            key={i}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-14px)",
              transition: `opacity 0.45s ease-out ${i * 0.08}s, transform 0.45s ease-out ${i * 0.08}s`,
            }}
          >
            {item}
          </li>
        ))}
      </Tag>
    </div>
  );
}

/* ═══════════════════════════════════════════
   FAQ Item
   ═══════════════════════════════════════════ */
function FaqItem({ q, a }: { q: string; a: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="mt-8 rounded-xl border border-zinc-100 bg-zinc-50 p-6"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
      }}
    >
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
   Floating Ages Hero Animation (DOM-based)
   ═══════════════════════════════════════════ */
const ageItems = [
  { label: "Age 3–4", type: "bubble" },
  { label: "♪", type: "note" },
  { label: "Age 5–6", type: "bubble" },
  { label: "♫", type: "note" },
  { label: "Age 7–9", type: "bubble" },
  { label: "♩", type: "note" },
  { label: "Age 10+", type: "bubble" },
  { label: "♬", type: "note" },
  { label: "Age 5–6", type: "bubble" },
  { label: "♪", type: "note" },
  { label: "Age 3–4", type: "bubble" },
  { label: "♫", type: "note" },
  { label: "Age 7–9", type: "bubble" },
  { label: "♩", type: "note" },
  { label: "Age 10+", type: "bubble" },
  { label: "♬", type: "note" },
];

const ageConfigs = [
  { left: "4%",  opacity: 0.35, duration: 22, delay: 0,   drift: "18px",  size: "text-xs" },
  { left: "12%", opacity: 0.5,  duration: 18, delay: -5,  drift: "-14px", size: "text-lg" },
  { left: "22%", opacity: 0.3,  duration: 25, delay: -10, drift: "20px",  size: "text-xs" },
  { left: "33%", opacity: 0.4,  duration: 20, delay: -3,  drift: "-18px", size: "text-xs" },
  { left: "44%", opacity: 0.35, duration: 24, delay: -14, drift: "16px",  size: "text-xs" },
  { left: "55%", opacity: 0.55, duration: 17, delay: -7,  drift: "-20px", size: "text-xl" },
  { left: "65%", opacity: 0.3,  duration: 26, delay: -18, drift: "22px",  size: "text-xs" },
  { left: "75%", opacity: 0.45, duration: 21, delay: -2,  drift: "-15px", size: "text-xs" },
  { left: "83%", opacity: 0.35, duration: 23, delay: -9,  drift: "18px",  size: "text-xs" },
  { left: "92%", opacity: 0.4,  duration: 19, delay: -12, drift: "-22px", size: "text-lg" },
  { left: "8%",  opacity: 0.3,  duration: 27, delay: -20, drift: "14px",  size: "text-xs" },
  { left: "28%", opacity: 0.45, duration: 22, delay: -16, drift: "-18px", size: "text-xs" },
  { left: "48%", opacity: 0.35, duration: 20, delay: -6,  drift: "20px",  size: "text-xs" },
  { left: "60%", opacity: 0.5,  duration: 16, delay: -11, drift: "-16px", size: "text-2xl" },
  { left: "72%", opacity: 0.3,  duration: 24, delay: -4,  drift: "14px",  size: "text-xs" },
  { left: "88%", opacity: 0.4,  duration: 21, delay: -8,  drift: "-20px", size: "text-xs" },
];

function FloatingAgesAnimation({ visible }: { visible: boolean }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 1.2s ease-out" }}
    >
      {ageConfigs.map((cfg, i) => {
        const item = ageItems[i];
        const isBubble = item.type === "bubble";
        return (
          <div
            key={i}
            className={`absolute ${isBubble
              ? "rounded-full border border-brand/30 bg-brand/5 px-3 py-1.5 text-xs font-bold text-brand/60 backdrop-blur-sm whitespace-nowrap"
              : `text-brand/50 font-bold ${cfg.size}`
            }`}
            style={{
              left: cfg.left,
              bottom: "-10%",
              ["--snippet-opacity" as string]: cfg.opacity,
              ["--snippet-drift" as string]: cfg.drift,
              animation: `floatSnippet ${cfg.duration}s linear ${cfg.delay}s infinite`,
            }}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════
   Page
   ═══════════════════════════════════════════ */
export default function BestAgeBlogPost() {
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
        <FloatingAgesAnimation visible={visible} />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/30 via-transparent to-zinc-900 z-[1]" />

        <div className="relative z-[2] text-center px-6">
          <span className="inline-block rounded-full bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand mb-6"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "all 0.6s ease-out 0.1s" }}>
            Getting Started
          </span>
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl max-w-4xl mx-auto"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease-out 0.2s", textShadow: "0 4px 24px rgba(0,0,0,0.5)" }}>
            What Is the Best Age to Start Piano Lessons?
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-white/60 sm:text-xl"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease-out 0.5s" }}>
            A parent&apos;s complete guide to readiness, timing, and what actually matters.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[2]" />
      </section>

      {/* ── Article ── */}
      <article className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 sm:px-12">

          <AnimatedSection>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              If you&apos;re wondering when your child should start piano lessons, you&apos;re asking the right question at the right time. The short answer: <strong className="text-zinc-900">most children are ready between ages 5 and 9</strong> — but readiness matters far more than hitting a specific number.
            </p>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              As in-home piano teachers who work with families across Utah and Idaho every day, we see firsthand what makes a child thrive at the keyboard. Some 5-year-olds take to it immediately. Some 7-year-olds need a different approach before things click. The age on the birthday cake is only part of the story.
            </p>
          </AnimatedSection>

          <SectionHeading>The Readiness Signs That Matter More Than Age</SectionHeading>
          <AnimatedSection delay={0.1}>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              Rather than asking &ldquo;Is my child old enough?&rdquo; ask &ldquo;Is my child showing these signs?&rdquo; Readiness falls into three categories:
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Physical Readiness</h3>
          </AnimatedSection>
          <StaggerList items={[
            "Can place all five fingers independently on adjacent keys",
            "Hands are large enough to span five white keys comfortably",
            "Has enough finger strength to press keys with individual fingers (not the whole hand)",
          ]} />

          <AnimatedSection delay={0.1}>
            <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Cognitive Readiness</h3>
          </AnimatedSection>
          <StaggerList items={[
            <>Can follow two- or three-step instructions (&ldquo;Put your right hand here, play these three notes, then stop&rdquo;)</>,
            "Has an attention span of at least 15 minutes for a focused activity",
            "Can recognize letters and numbers (helpful for reading music notation)",
          ]} />

          <AnimatedSection delay={0.1}>
            <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Emotional Readiness</h3>
          </AnimatedSection>
          <StaggerList items={[
            "Shows genuine interest in music — asks to play, sings along to songs, gravitates toward instruments",
            "Can handle gentle correction without shutting down",
            "Expresses a desire to learn (not just a parent's desire for them to learn)",
          ]} />

          <AnimatedSection delay={0.05}>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              Here&apos;s the key insight: a child doesn&apos;t need to check every box. When lessons are tailored to each child&apos;s strengths — the way the Volz Method approaches teaching — a child who&apos;s strong in one area can thrive even if another area is still developing.
            </p>
          </AnimatedSection>

          <SectionHeading>Age-by-Age Breakdown</SectionHeading>

          <AgeBlock num="01" title="Ages 3–4: Build the Foundation">
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              Most 3- and 4-year-olds aren&apos;t quite ready for structured piano lessons. Their fingers are still developing, attention spans are short, and the fine motor control needed for individual keystrokes usually isn&apos;t there yet. But this is a golden window for building a musical foundation that will pay off enormously when formal lessons begin.
            </p>
          </AgeBlock>

          <AgeBlock num="02" title="Ages 5–6: Ready for Structured Beginners">
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              This is when most children are physically and cognitively ready for real lessons. The keys are shorter lesson durations (30 minutes is ideal) and a patient, adaptive teacher who can read the child&apos;s energy level and adjust in real time. A rigid &ldquo;sit still and play these scales&rdquo; approach will backfire at this age.
            </p>
          </AgeBlock>

          <AgeBlock num="03" title="Ages 7–9: The Sweet Spot">
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              Fine motor skills are developing rapidly, attention spans are longer, and most children can begin reading music more fluently. Many families find this is the age where progress takes off. Kids in this range often surprise their parents with how quickly they advance — especially when the method teaches to their individual strengths.
            </p>
          </AgeBlock>

          <AgeBlock num="04" title="Ages 10 and Up: It's Never Too Late">
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              If your child is 10, 12, or 15 and has never touched a piano, they are absolutely not &ldquo;too late.&rdquo; Older beginners often progress faster than younger ones because they have stronger cognitive abilities, better fine motor control, and more self-motivation. Adults can start too — there&apos;s no expiration date on learning an instrument.
            </p>
          </AgeBlock>

          <SectionHeading>What Parents of 3–4 Year Olds Can Do Right Now</SectionHeading>
          <AnimatedSection delay={0.1}>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-4">
              If your child isn&apos;t quite ready for formal lessons, these five activities build the musical groundwork that will make lessons far more effective when the time comes:
            </p>
          </AnimatedSection>
          <StaggerList ordered items={[
            <><strong className="text-zinc-900">Rhythm clapping games</strong> — Clap along to songs together. Start with simple beats and gradually try more complex patterns. This develops rhythmic sense, which is foundational to all music.</>,
            <><strong className="text-zinc-900">Sing together daily</strong> — Singing builds pitch awareness, melody recognition, and musical memory. It doesn&apos;t matter if you&apos;re not a great singer — your child doesn&apos;t know the difference.</>,
            <><strong className="text-zinc-900">Let them explore the keyboard freely</strong> — If you have a piano or keyboard at home, let them press keys, make sounds, and discover on their own. Don&apos;t correct them. This builds curiosity and comfort with the instrument.</>,
            <><strong className="text-zinc-900">Play diverse genres at home</strong> — Classical, jazz, pop, movie soundtracks, video game music. Exposing kids to a wide range of music builds their ear and helps them discover what they&apos;re drawn to.</>,
            <><strong className="text-zinc-900">Dance to music</strong> — Moving to a beat develops the same rhythmic sense that piano requires. Plus it&apos;s fun, and fun creates positive associations with music.</>,
          ]} />

          <SectionHeading>How the Right Teaching Approach Makes Age Less Important</SectionHeading>
          <AnimatedSection delay={0.1}>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              One of the biggest factors in whether a young child succeeds at piano isn&apos;t their age — it&apos;s the teaching method. A rigid approach that requires every student to progress through the same book in the same order will work for some kids and completely lose others.
            </p>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              The Volz Method is built on four pillars — Reading, Composing, Hearing, and Arranging — which gives the teacher multiple entry points for every student. A 5-year-old who can&apos;t read music yet might have an incredible ear, so the teacher starts with playing by ear and introduces notation gradually. Another child might love creating their own melodies, so composition becomes the hook that pulls them deeper into music.
            </p>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              This adaptability is what sets a personalized approach apart from a one-size-fits-all method book. When the method meets the child where they are, age becomes much less of a barrier.
            </p>
          </AnimatedSection>

          <SectionHeading>Why In-Home Lessons Give Young Beginners an Advantage</SectionHeading>
          <AnimatedSection delay={0.1}>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              For children ages 5–7 especially, the learning environment matters more than most parents realize. In-home lessons offer several advantages over studio settings:
            </p>
          </AnimatedSection>
          <StaggerList items={[
            <><strong className="text-zinc-900">Familiar environment reduces anxiety.</strong> Young kids are more comfortable and focused in their own home. No new building, no waiting room with strangers, no sensory overload.</>,
            <><strong className="text-zinc-900">No car ride eating into focus.</strong> A 20-minute drive to a studio means your child arrives with a depleted attention span. At home, they go from playing to playing piano in seconds.</>,
            <><strong className="text-zinc-900">The teacher sees your actual setup.</strong> They can help position the bench, adjust the keyboard height, and ensure the practice environment is set up for success.</>,
            <><strong className="text-zinc-900">Siblings can watch and get excited.</strong> A younger sibling observing lessons often develops interest naturally — you may end up with two pianists.</>,
            <><strong className="text-zinc-900">Parents can observe without awkwardness.</strong> You can listen from the next room, see what your child is learning, and reinforce it between lessons.</>,
          ]} />
          <AnimatedSection delay={0.05}>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
              For families in Utah and Idaho, Volz Method teachers drive to your home — so you get all these benefits without any of the logistics.
            </p>
          </AnimatedSection>

          <SectionHeading>Frequently Asked Questions</SectionHeading>

          <FaqItem
            q="Can a 4-year-old take piano lessons?"
            a="It's possible, but it depends entirely on the child. Most 4-year-olds benefit more from the pre-piano activities listed above. However, if your child shows strong interest, can sit and focus for 15 minutes, and has sufficient finger independence, a trial lesson with an adaptive teacher can help you decide."
          />
          <FaqItem
            q="How long should a first piano lesson be?"
            a="Thirty minutes is ideal for beginners under age 8. Young children's attention spans are limited, and a focused, engaging 30-minute lesson will always beat a 60-minute session that loses the child halfway through. As students progress and their stamina builds, lesson length can increase."
          />
          <FaqItem
            q="Do we need a piano before starting lessons?"
            a="Not necessarily. A keyboard with at least 61 weighted or semi-weighted keys works well for beginners. You don't need to invest in a full acoustic piano right away. Your teacher can recommend the right instrument for your budget and space during your first lesson."
          />
          <FaqItem
            q="How do I know if my child is truly ready?"
            a="The best way to find out is to talk to a teacher. At Volz Method, the first step is a free phone consultation where we discuss your child's interest, temperament, and readiness — no commitment required. Sometimes the answer is 'yes, let's start,' and sometimes it's 'give it six months and try these activities in the meantime.' Either way, you'll have a clear path forward."
          />

        </div>
      </article>

    </main>
  );
}
