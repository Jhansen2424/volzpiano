"use client";

import { useEffect, useRef, useState } from "react";

/* SEO metadata — to be moved to layout.tsx or generateMetadata when switching to server component
   title: "How to Motivate Your Child to Practice Piano | Volz Method"
   description: "If piano practice has become a nightly battle, the problem probably isn't your child. Learn the intrinsic motivation framework and 7 practical strategies that actually work."
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
            Practice Tips
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
            How to Motivate Your Child to Practice Piano
          </h1>
          <p
            className="mt-6 mx-auto max-w-2xl text-lg text-white/60 sm:text-xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease-out 0.5s",
            }}
          >
            Without the daily battle.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* ── Article ── */}
      <article className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 sm:px-12">

          {/* Introduction */}
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            If piano practice has become a nightly argument in your house, you&apos;re not alone — and <strong className="text-zinc-900">the problem probably isn&apos;t your child</strong>.
          </p>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            This is the single most common concern parents bring to our teachers at Volz Method. &ldquo;My kid loved piano at first, but now getting them to practice is a battle.&rdquo; We hear it every week. And after working with hundreds of families across Utah and Idaho, we&apos;ve learned that the real issue is almost always a mismatch between the teaching approach and the child — not a lack of discipline or interest.
          </p>

          {/* Section 1 */}
          <h2 className="text-2xl font-extrabold text-zinc-900 sm:text-3xl mt-12 mb-4">
            Why Most Practice Battles Happen (It&apos;s Not Laziness)
          </h2>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            Before jumping to solutions, it helps to understand why practice resistance happens in the first place. In our experience, it almost always comes down to one of three root causes:
          </p>

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
            A visual learner forced to learn exclusively by ear. An ear-player forced to stare at sheet music for months before touching a song they recognize. When the teaching approach clashes with how a child&apos;s brain works, frustration is inevitable. Research on intrinsic vs. extrinsic motivation consistently shows that students who are intrinsically motivated — who practice because they <em>want</em> to — persist longer, learn at higher quality, and push through difficulty far more effectively than students driven by external rewards.
          </p>

          {/* Section 2 */}
          <h2 className="text-2xl font-extrabold text-zinc-900 sm:text-3xl mt-12 mb-4">
            The Intrinsic Motivation Framework: 3 Keys That Actually Work
          </h2>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            Decades of research in educational psychology point to three conditions that foster intrinsic motivation. When all three are present, practice battles tend to disappear.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">1. Autonomy — Let them have a voice</h3>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            Let kids have a say in what they play. If your child wants to learn the theme from their favorite show, a pop song they heard on the radio, or music from a video game, <strong className="text-zinc-900">that is valid music education</strong>. Theory, technique, and reading skills can all be taught through the music a child actually cares about. The Volz Method is built on this idea — students pick the music, and teachers build the curriculum around it.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">2. Competence — Create frequent wins</h3>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            Nothing kills motivation like spending three months stuck on one piece that feels impossible. Break songs into small, achievable chunks so kids experience the thrill of &ldquo;I can play that!&rdquo; regularly. A good teacher adjusts difficulty in real time — challenging enough to grow, manageable enough to succeed.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">3. Connection — The relationship matters</h3>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            The teacher-student relationship is one of the most underrated factors in piano motivation. A teacher who comes to your home, knows your child by name, remembers their favorite song from last week, and genuinely celebrates their progress creates a bond that no sticker chart can match. Kids practice for people they respect and don&apos;t want to let down — that&apos;s human nature, not manipulation.
          </p>

          {/* Section 3 */}
          <h2 className="text-2xl font-extrabold text-zinc-900 sm:text-3xl mt-12 mb-4">
            7 Practical Strategies Parents Can Use This Week
          </h2>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-4">
            You don&apos;t need to overhaul everything. Start with one or two of these and build from there:
          </p>
          <ol className="list-decimal pl-6 mb-6 space-y-4 text-zinc-600">
            <li><strong className="text-zinc-900">Let your child choose at least one song they&apos;re working on.</strong> Even if the rest of the repertoire is teacher-assigned, having one &ldquo;their&rdquo; song makes practice feel less like homework.</li>
            <li><strong className="text-zinc-900">Set a consistent practice time — but let them help pick when.</strong> &ldquo;Do you want to practice right after school or right after dinner?&rdquo; gives them ownership without giving up structure.</li>
            <li><strong className="text-zinc-900">Use a timer instead of &ldquo;play it 10 times.&rdquo;</strong> Saying &ldquo;practice for 15 minutes&rdquo; feels finite and manageable. &ldquo;Play it until it&apos;s perfect&rdquo; feels endless and demoralizing.</li>
            <li><strong className="text-zinc-900">Sit nearby and listen sometimes.</strong> You don&apos;t need to be a music expert. Just being present shows you value what they&apos;re doing. Kids naturally perform for an audience.</li>
            <li><strong className="text-zinc-900">Host low-pressure &ldquo;living room concerts&rdquo; for family.</strong> Let them play whatever they want for grandparents, siblings, or even the dog. Performance builds confidence and makes practice feel purposeful.</li>
            <li><strong className="text-zinc-900">Celebrate effort and progress, not perfection.</strong> &ldquo;That section sounds so much smoother than last week!&rdquo; beats &ldquo;You missed that note again&rdquo; every time.</li>
            <li><strong className="text-zinc-900">Communicate with the teacher about what&apos;s working and what isn&apos;t.</strong> The best piano teachers want this feedback. If practice is a struggle, the teacher can adjust the assignments, the difficulty, or the approach.</li>
          </ol>

          {/* Section 4 */}
          <h2 className="text-2xl font-extrabold text-zinc-900 sm:text-3xl mt-12 mb-4">
            When the Method Is the Problem, Not the Child
          </h2>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            Traditional piano methods follow a linear path: start with this book, play these exercises, progress to the next book. For some kids, this works beautifully. But for many others, it&apos;s the single biggest motivation killer. The child doesn&apos;t connect with the music, doesn&apos;t understand why they&apos;re playing it, and eventually decides they &ldquo;don&apos;t like piano&rdquo; — when really they just didn&apos;t like that particular approach.
          </p>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            The Volz Method was built around a different philosophy, stated by founder Michael Volz: the goal is &ldquo;finding what will motivate a student to practice, with the ultimate goal of getting the student to develop an intrinsic love for the piano.&rdquo; The method&apos;s four pillars — Reading, Composing, Hearing, and Arranging — give teachers multiple entry points for every student. If reading music isn&apos;t clicking, the teacher pivots to ear training. If the student loves creating, composition becomes the hook that pulls them deeper. If they want to play their favorite pop song, arranging becomes the gateway to understanding chords and theory.
          </p>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            The point isn&apos;t that one approach is universally right. It&apos;s that the method should adapt to the student, not the other way around. If your child is resisting practice, consider whether the teaching approach might need to change before assuming the child does.
          </p>

          {/* Section 5 */}
          <h2 className="text-2xl font-extrabold text-zinc-900 sm:text-3xl mt-12 mb-4">
            The In-Home Advantage for Building Motivation
          </h2>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            Where lessons happen affects motivation more than you might think. When the teacher comes to your home:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-zinc-600">
            <li><strong className="text-zinc-900">There&apos;s no &ldquo;getting ready and driving&rdquo; friction.</strong> Eliminating the commute removes a common source of pre-lesson stress for both parent and child.</li>
            <li><strong className="text-zinc-900">The child is in their comfort zone.</strong> They&apos;re relaxed, focused, and more willing to take risks — which is how real learning happens.</li>
            <li><strong className="text-zinc-900">The teacher sees the practice environment.</strong> If the piano is in a noisy room or the bench is the wrong height, the teacher can troubleshoot it on the spot.</li>
            <li><strong className="text-zinc-900">The relationship deepens naturally.</strong> The teacher becomes part of the family&apos;s routine. This builds the trust and connection that fuels motivation week after week.</li>
          </ul>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            For families across Utah and Idaho, Volz Method teachers drive to you — so these benefits come built in.
          </p>

          {/* FAQ */}
          <h2 className="text-2xl font-extrabold text-zinc-900 sm:text-3xl mt-12 mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">How long should a child practice piano each day?</h3>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            For beginners ages 5–7, 10–15 minutes daily is plenty. Ages 8–10 can aim for 15–20 minutes. Older students and more advanced players: 20–30 minutes. The key is <strong className="text-zinc-900">consistency over length</strong>. Five 10-minute sessions throughout the week will always beat one painful 50-minute marathon on Sunday night.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">What if my child wants to quit piano?</h3>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            First, ask why. Usually the answer reveals frustration with the material or the teaching approach, not the instrument itself. Try switching what they&apos;re playing before switching activities. A direct conversation with the teacher can often reset things. If the frustration runs deep, sometimes a short break of two to three weeks brings fresh perspective. Many students who &ldquo;quit&rdquo; and come back with a different approach end up loving piano.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Should I use rewards to get my child to practice?</h3>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            Rewards can jumpstart a routine in the short term, but they shouldn&apos;t be the long-term strategy. Research consistently shows that external rewards — stickers, screen time, treats — can actually <em>decrease</em> intrinsic motivation over time. The child starts practicing for the reward, not the music. The goal is for your child to practice because they want to, not because they get something for it. Focus on building the conditions for intrinsic motivation (autonomy, competence, connection) instead.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Is it normal for kids to resist piano practice?</h3>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            Completely normal. Even kids who genuinely love piano will have stretches where practice feels like a chore — just like adults have days when they don&apos;t feel like going to the gym. Consistency through those periods, not punishment, is what builds the habit. The key is making sure there&apos;s enough music they actually enjoy in the mix alongside the skill-building work. When the ratio of &ldquo;fun songs&rdquo; to &ldquo;technique exercises&rdquo; is right, the tough days become the exception, not the rule.
          </p>

        </div>
      </article>

      <FooterBanner />
    </main>
  );
}
