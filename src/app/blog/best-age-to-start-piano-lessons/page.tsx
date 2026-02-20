"use client";

import { useEffect, useRef, useState } from "react";

/* SEO metadata — to be moved to layout.tsx or generateMetadata when switching to server component
   title: "What Is the Best Age to Start Piano Lessons? | Volz Method"
   description: "Ages 5–9 is the sweet spot, but readiness matters more than a number. Learn the signs your child is ready, plus age-by-age guidance from in-home piano teachers."
*/

/* ═══════════════════════════════════════════
   Footer CTA Banner
   ═══════════════════════════════════════════ */
function FooterBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={sectionRef} className="relative overflow-hidden bg-zinc-950">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-[600px] rounded-full opacity-15 blur-[120px]"
        style={{ background: "radial-gradient(circle, #f27a1a 0%, transparent 70%)" }}
      />
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
              <span className="text-orange-brand">Enroll Today!</span>
            </h2>
            <a
              href="#schedule"
              className="group relative inline-flex items-center gap-3 rounded-full bg-orange-brand px-10 py-5 text-lg font-bold text-white shadow-lg shadow-orange-brand/25 transition-all duration-300 hover:bg-orange-brand-hover hover:shadow-xl hover:shadow-orange-brand/30 hover:-translate-y-0.5"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.7s ease-out 0.15s",
              }}
            >
              Schedule a Call
              <svg className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="relative py-8">
        <div className="mx-auto max-w-7xl px-6 sm:px-12">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
            <a href="#teach" className="inline-flex items-center gap-2 rounded-full bg-cta px-7 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-cta-hover hover:-translate-y-0.5">
              Teach with us! Click here
            </a>
            <div className="flex items-center gap-6">
              <a href="#privacy" className="text-sm text-white/40 transition-colors duration-200 hover:text-white/70">Privacy Policy</a>
              <span className="text-white/10">|</span>
              <span className="text-sm text-white/30">&copy; {new Date().getFullYear()} Volz Method Piano Lessons</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
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
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[500px] rounded-full opacity-15 blur-[120px]"
          style={{ background: "radial-gradient(circle, #f27a1a 0%, transparent 70%)" }}
        />
        <div className="relative z-[2] text-center px-6">
          <span
            className="inline-block rounded-full bg-orange-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-orange-brand mb-6"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.6s ease-out 0.1s",
            }}
          >
            Getting Started
          </span>
          <h1
            className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl max-w-4xl mx-auto"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s ease-out 0.2s",
              textShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            What Is the Best Age to Start Piano Lessons?
          </h1>
          <p
            className="mt-6 mx-auto max-w-2xl text-lg text-white/60 sm:text-xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease-out 0.5s",
            }}
          >
            A parent&apos;s complete guide to readiness, timing, and what actually matters.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* ── Article ── */}
      <article className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 sm:px-12">

          {/* Introduction */}
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            If you&apos;re wondering when your child should start piano lessons, you&apos;re asking the right question at the right time. The short answer: <strong className="text-zinc-900">most children are ready between ages 5 and 9</strong> — but readiness matters far more than hitting a specific number.
          </p>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            As in-home piano teachers who work with families across Utah and Idaho every day, we see firsthand what makes a child thrive at the keyboard. Some 5-year-olds take to it immediately. Some 7-year-olds need a different approach before things click. The age on the birthday cake is only part of the story.
          </p>

          {/* Section 1 */}
          <h2 className="text-2xl font-extrabold text-zinc-900 sm:text-3xl mt-12 mb-4">
            The Readiness Signs That Matter More Than Age
          </h2>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            Rather than asking &ldquo;Is my child old enough?&rdquo; ask &ldquo;Is my child showing these signs?&rdquo; Readiness falls into three categories:
          </p>

          <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Physical Readiness</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-zinc-600">
            <li>Can place all five fingers independently on adjacent keys</li>
            <li>Hands are large enough to span five white keys comfortably</li>
            <li>Has enough finger strength to press keys with individual fingers (not the whole hand)</li>
          </ul>

          <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Cognitive Readiness</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-zinc-600">
            <li>Can follow two- or three-step instructions (&ldquo;Put your right hand here, play these three notes, then stop&rdquo;)</li>
            <li>Has an attention span of at least 15 minutes for a focused activity</li>
            <li>Can recognize letters and numbers (helpful for reading music notation)</li>
          </ul>

          <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Emotional Readiness</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-zinc-600">
            <li>Shows genuine interest in music — asks to play, sings along to songs, gravitates toward instruments</li>
            <li>Can handle gentle correction without shutting down</li>
            <li>Expresses a desire to learn (not just a parent&apos;s desire for them to learn)</li>
          </ul>

          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            Here&apos;s the key insight: a child doesn&apos;t need to check every box. When lessons are tailored to each child&apos;s strengths — the way the Volz Method approaches teaching — a child who&apos;s strong in one area can thrive even if another area is still developing. A child with an incredible ear but limited attention span, for example, can start with short, engaging ear-training activities that build toward longer focused practice over time.
          </p>

          {/* Section 2 */}
          <h2 className="text-2xl font-extrabold text-zinc-900 sm:text-3xl mt-12 mb-4">
            Age-by-Age Breakdown
          </h2>

          <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Ages 3–4: Build the Foundation</h3>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            Most 3- and 4-year-olds aren&apos;t quite ready for structured piano lessons. Their fingers are still developing, attention spans are short, and the fine motor control needed for individual keystrokes usually isn&apos;t there yet. But this is a golden window for building a musical foundation that will pay off enormously when formal lessons begin.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Ages 5–6: Ready for Structured Beginners</h3>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            This is when most children are physically and cognitively ready for real lessons. The keys are shorter lesson durations (30 minutes is ideal) and a patient, adaptive teacher who can read the child&apos;s energy level and adjust in real time. A rigid &ldquo;sit still and play these scales&rdquo; approach will backfire at this age. A teacher who lets the child explore, makes learning feel like play, and introduces structure gradually will see much better results.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Ages 7–9: The Sweet Spot</h3>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            Fine motor skills are developing rapidly, attention spans are longer, and most children can begin reading music more fluently. Many families find this is the age where progress takes off. Kids in this range often surprise their parents with how quickly they advance — especially when the method teaches to their individual strengths rather than forcing a one-size-fits-all curriculum.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Ages 10 and Up: It&apos;s Never Too Late</h3>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            If your child is 10, 12, or 15 and has never touched a piano, they are absolutely not &ldquo;too late.&rdquo; Older beginners often progress faster than younger ones because they have stronger cognitive abilities, better fine motor control, and more self-motivation. And adults can start too — there&apos;s no expiration date on learning an instrument.
          </p>

          {/* Section 3 */}
          <h2 className="text-2xl font-extrabold text-zinc-900 sm:text-3xl mt-12 mb-4">
            What Parents of 3–4 Year Olds Can Do Right Now
          </h2>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-4">
            If your child isn&apos;t quite ready for formal lessons, these five activities build the musical groundwork that will make lessons far more effective when the time comes:
          </p>
          <ol className="list-decimal pl-6 mb-6 space-y-3 text-zinc-600">
            <li><strong className="text-zinc-900">Rhythm clapping games</strong> — Clap along to songs together. Start with simple beats and gradually try more complex patterns. This develops rhythmic sense, which is foundational to all music.</li>
            <li><strong className="text-zinc-900">Sing together daily</strong> — Singing builds pitch awareness, melody recognition, and musical memory. It doesn&apos;t matter if you&apos;re not a great singer — your child doesn&apos;t know the difference.</li>
            <li><strong className="text-zinc-900">Let them explore the keyboard freely</strong> — If you have a piano or keyboard at home, let them press keys, make sounds, and discover on their own. Don&apos;t correct them. This builds curiosity and comfort with the instrument.</li>
            <li><strong className="text-zinc-900">Play diverse genres at home</strong> — Classical, jazz, pop, movie soundtracks, video game music. Exposing kids to a wide range of music builds their ear and helps them discover what they&apos;re drawn to.</li>
            <li><strong className="text-zinc-900">Dance to music</strong> — Moving to a beat develops the same rhythmic sense that piano requires. Plus it&apos;s fun, and fun creates positive associations with music.</li>
          </ol>

          {/* Section 4 */}
          <h2 className="text-2xl font-extrabold text-zinc-900 sm:text-3xl mt-12 mb-4">
            How the Right Teaching Approach Makes Age Less Important
          </h2>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            One of the biggest factors in whether a young child succeeds at piano isn&apos;t their age — it&apos;s the teaching method. A rigid approach that requires every student to progress through the same book in the same order will work for some kids and completely lose others.
          </p>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            The Volz Method is built on four pillars — Reading, Composing, Hearing, and Arranging — which gives the teacher multiple entry points for every student. A 5-year-old who can&apos;t read music yet might have an incredible ear, so the teacher starts with playing by ear and introduces notation gradually. Another child might love creating their own melodies, so composition becomes the hook that pulls them deeper into music. A student who loves their favorite pop songs learns arranging as the gateway to understanding chord structure and theory.
          </p>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            This adaptability is what sets a personalized approach apart from a one-size-fits-all method book. When the method meets the child where they are, age becomes much less of a barrier.
          </p>

          {/* Section 5 */}
          <h2 className="text-2xl font-extrabold text-zinc-900 sm:text-3xl mt-12 mb-4">
            Why In-Home Lessons Give Young Beginners an Advantage
          </h2>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            For children ages 5–7 especially, the learning environment matters more than most parents realize. In-home lessons offer several advantages over studio settings:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-zinc-600">
            <li><strong className="text-zinc-900">Familiar environment reduces anxiety.</strong> Young kids are more comfortable and focused in their own home. No new building, no waiting room with strangers, no sensory overload.</li>
            <li><strong className="text-zinc-900">No car ride eating into focus.</strong> A 20-minute drive to a studio means your child arrives with a depleted attention span. At home, they go from playing to playing piano in seconds.</li>
            <li><strong className="text-zinc-900">The teacher sees your actual setup.</strong> They can help position the bench, adjust the keyboard height, and ensure the practice environment is set up for success.</li>
            <li><strong className="text-zinc-900">Siblings can watch and get excited.</strong> A younger sibling observing lessons often develops interest naturally — you may end up with two pianists.</li>
            <li><strong className="text-zinc-900">Parents can observe without awkwardness.</strong> You can listen from the next room, see what your child is learning, and reinforce it between lessons.</li>
          </ul>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            For families in Utah and Idaho, Volz Method teachers drive to your home — so you get all these benefits without any of the logistics.
          </p>

          {/* FAQ */}
          <h2 className="text-2xl font-extrabold text-zinc-900 sm:text-3xl mt-12 mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Can a 4-year-old take piano lessons?</h3>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            It&apos;s possible, but it depends entirely on the child. Most 4-year-olds benefit more from the pre-piano activities listed above. However, if your child shows strong interest, can sit and focus for 15 minutes, and has sufficient finger independence, a trial lesson with an adaptive teacher can help you decide. The key is finding a teacher who won&apos;t force a curriculum designed for older kids onto a preschooler.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">How long should a first piano lesson be?</h3>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            Thirty minutes is ideal for beginners under age 8. Young children&apos;s attention spans are limited, and a focused, engaging 30-minute lesson will always beat a 60-minute session that loses the child halfway through. As students progress and their stamina builds, lesson length can increase.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Do we need a piano before starting lessons?</h3>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            Not necessarily. A keyboard with at least 61 weighted or semi-weighted keys works well for beginners. You don&apos;t need to invest in a full acoustic piano right away. Your teacher can recommend the right instrument for your budget and space during your first lesson — one of the perks of in-home instruction is that the teacher sees your actual setup.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">How do I know if my child is truly ready?</h3>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            The best way to find out is to talk to a teacher. A good piano teacher can assess readiness in a single conversation or trial lesson. At Volz Method, the first step is a free phone consultation where we discuss your child&apos;s interest, temperament, and readiness — no commitment required. Sometimes the answer is &ldquo;yes, let&apos;s start,&rdquo; and sometimes it&apos;s &ldquo;give it six months and try these activities in the meantime.&rdquo; Either way, you&apos;ll have a clear path forward.
          </p>

        </div>
      </article>

      <FooterBanner />
    </main>
  );
}
