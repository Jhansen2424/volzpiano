"use client";

import { useEffect, useRef, useState } from "react";

/* SEO metadata — to be moved to layout.tsx or generateMetadata when switching to server component
   title: "Piano Lessons vs. Piano Apps: What Actually Works for Kids? | Volz Method"
   description: "An honest comparison of Simply Piano, Yousician, and private piano lessons. What apps do well, where they fall short, and how to choose the right option for your family."
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
            Choosing Lessons
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
            Piano Lessons vs. Piano Apps: What Actually Works for Kids?
          </h1>
          <p
            className="mt-6 mx-auto max-w-2xl text-lg text-white/60 sm:text-xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease-out 0.5s",
            }}
          >
            An honest comparison from teachers who work with kids every day.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* ── Article ── */}
      <article className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 sm:px-12">

          {/* Introduction */}
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            Parents today have more piano learning options than ever. Apps like Simply Piano, Yousician, Flowkey, and Skoove promise to teach your child piano for a fraction of the cost of private lessons — available 24/7, no scheduling required, with gamified features that make learning feel like playing a video game.
          </p>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            So do kids actually need a real teacher anymore? <strong className="text-zinc-900">The short answer is yes — but apps have a role too.</strong> This isn&apos;t a hit piece on piano apps. It&apos;s an honest look at what each option does well, where each falls short, and how to make the right choice for your family.
          </p>

          {/* Section 1 */}
          <h2 className="text-2xl font-extrabold text-zinc-900 sm:text-3xl mt-12 mb-4">
            What Piano Apps Do Well
          </h2>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-4">
            Let&apos;s give credit where it&apos;s due. Piano apps have real strengths:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-3 text-zinc-600">
            <li><strong className="text-zinc-900">Low cost.</strong> Most apps run $10–$15 per month, compared to $120–$200 per month for private lessons. That&apos;s a significant difference, especially for families testing the waters.</li>
            <li><strong className="text-zinc-900">Available anytime.</strong> No scheduling, no commuting, no cancellation hassles. Your child can practice at 7 AM or 9 PM — whenever the mood strikes.</li>
            <li><strong className="text-zinc-900">Gamification keeps initial engagement high.</strong> Points, streaks, progress bars, and level-ups tap into the same psychology that makes video games addictive. Kids love the instant feedback.</li>
            <li><strong className="text-zinc-900">Great for testing interest.</strong> Not sure if your child will stick with piano? A free app trial is a low-risk way to find out before committing to lessons.</li>
            <li><strong className="text-zinc-900">Large song libraries.</strong> Simply Piano alone offers thousands of songs across genres. Kids can explore pop, classical, movie themes, and more.</li>
          </ul>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            If you&apos;re a parent considering piano for your child and you&apos;re not sure if they&apos;ll like it, downloading a free app trial is a perfectly reasonable first step. No argument there.
          </p>

          {/* Section 2 */}
          <h2 className="text-2xl font-extrabold text-zinc-900 sm:text-3xl mt-12 mb-4">
            Where Piano Apps Fall Short
          </h2>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-4">
            Here&apos;s where things get more complicated. Apps have fundamental limitations that become apparent over time:
          </p>

          <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Apps can&apos;t see your child&apos;s hands</h3>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            This is the single biggest issue, and it&apos;s the one piano teachers see most often in students who started on apps. Apps listen to which notes are played, but they can&apos;t see <em>how</em> they&apos;re being played. Collapsed wrists, flat fingers, tense shoulders, incorrect fingering — these bad habits form silently and become extremely difficult to correct later. It&apos;s like learning to type with two fingers: it works at first, but eventually it limits how far you can go.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Zero personalization</h3>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            Every child gets the exact same curriculum in the exact same order, regardless of how they learn, what they&apos;re interested in, or where they&apos;re struggling. A child who learns best by ear gets the same visual-heavy approach as everyone else. A child who&apos;s breezing through gets held to the same pace as one who&apos;s struggling. There&apos;s no adaptation.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Gamification fades</h3>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            The points and streaks that make apps engaging in week one lose their magic by month two or three. Once the novelty wears off, most kids stop opening the app — because the motivation was tied to the game, not the music. Studies on app retention consistently show steep drop-offs after the first few months.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">No accountability or relationship</h3>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            There&apos;s no one to notice when your child is stuck, no one to adjust the difficulty, no one to say &ldquo;Great job — I can tell you practiced that section.&rdquo; The human element of teaching isn&apos;t just nice to have; it&apos;s what keeps students going when things get hard.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Playing along isn&apos;t the same as understanding music</h3>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            Apps teach you to follow along in the moment — hit the right key when the screen tells you to. But turn off the app, and many kids can&apos;t reproduce what they &ldquo;learned.&rdquo; They haven&apos;t internalized the music. True musical understanding — reading notation, hearing chord progressions, improvising, playing from memory — requires the kind of teaching that only a human can provide.
          </p>

          {/* Section 3 */}
          <h2 className="text-2xl font-extrabold text-zinc-900 sm:text-3xl mt-12 mb-4">
            What a Great Piano Teacher Provides That No App Can
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-3 text-zinc-600">
            <li><strong className="text-zinc-900">Real-time technique correction.</strong> A teacher watches your child&apos;s hands, posture, and movement and corrects issues before they become habits. This alone is worth the investment — fixing bad technique later takes months of re-learning.</li>
            <li><strong className="text-zinc-900">Curriculum adapted to your child.</strong> Their learning style, interests, pace, and strengths shape every lesson. The Volz Method&apos;s four pillars — Reading, Composing, Hearing, and Arranging — give teachers multiple approaches for every student. If one pathway isn&apos;t working, they have others to try.</li>
            <li><strong className="text-zinc-900">A human relationship.</strong> Accountability, emotional support, and genuine celebration of milestones. Kids work harder for people they care about.</li>
            <li><strong className="text-zinc-900">Teaching music the child actually wants to play.</strong> Not a preset algorithm-driven curriculum, but actual songs your child requests — and using those songs to teach theory, technique, and musicianship.</li>
            <li><strong className="text-zinc-900">Environment awareness.</strong> In-home teachers see your child&apos;s instrument, bench height, practice space, and distractions. They can optimize the setup in ways no app can.</li>
          </ul>

          {/* Section 4 */}
          <h2 className="text-2xl font-extrabold text-zinc-900 sm:text-3xl mt-12 mb-4">
            The Smart Approach: Use Both
          </h2>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            Here&apos;s what we actually recommend to parents: <strong className="text-zinc-900">don&apos;t think of it as apps vs. lessons. Think of apps as a supplement to lessons.</strong>
          </p>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            A child taking weekly in-home lessons with a great teacher can use apps between sessions for:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-zinc-600">
            <li>Sight-reading practice and reinforcement</li>
            <li>Ear training games</li>
            <li>Music theory quizzes</li>
            <li>Exploring new songs they might want to learn with their teacher</li>
          </ul>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            The teacher provides the foundation, technique correction, and personalization. The app provides extra practice and gamified reinforcement between lessons. Together, they&apos;re more effective than either one alone.
          </p>

          {/* Section 5 */}
          <h2 className="text-2xl font-extrabold text-zinc-900 sm:text-3xl mt-12 mb-4">
            The Real Cost Comparison
          </h2>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-4">
            Let&apos;s look at the numbers honestly:
          </p>

          {/* Comparison table */}
          <div className="mb-8 overflow-x-auto rounded-xl border border-zinc-200">
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="bg-zinc-50 text-left">
                  <th className="px-5 py-3 font-bold text-zinc-900">Option</th>
                  <th className="px-5 py-3 font-bold text-zinc-900">Monthly Cost</th>
                  <th className="px-5 py-3 font-bold text-zinc-900">Annual Cost</th>
                </tr>
              </thead>
              <tbody className="text-zinc-600">
                <tr className="border-t border-zinc-100">
                  <td className="px-5 py-3">Piano app subscription</td>
                  <td className="px-5 py-3">$10–$15</td>
                  <td className="px-5 py-3">$120–$170</td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-5 py-3">National avg. private lessons</td>
                  <td className="px-5 py-3">$150–$250</td>
                  <td className="px-5 py-3">$1,800–$3,000</td>
                </tr>
                <tr className="border-t border-zinc-100 bg-orange-brand/[0.03]">
                  <td className="px-5 py-3 font-semibold text-zinc-900">Volz Method (in-home)</td>
                  <td className="px-5 py-3">$116–$180*</td>
                  <td className="px-5 py-3">$1,392–$2,160</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-zinc-400 mb-6">
            *Based on weekly 30-minute lessons at $29–$45 per session.
          </p>

          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            Yes, apps are cheaper upfront. But consider what you&apos;re getting per dollar. Factor in the cost of correcting bad technique later (often months of re-learning), the likelihood of your child abandoning the app within a few months vs. continuing with a teacher they have a relationship with, and the actual skill development happening per session.
          </p>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            For Utah families, there&apos;s another factor: <strong className="text-zinc-900">Volz Method accepts the Utah Fits All Scholarship</strong>, which can help offset the cost of private lessons. This makes quality in-home instruction more accessible than many parents realize.
          </p>

          {/* Section 6 */}
          <h2 className="text-2xl font-extrabold text-zinc-900 sm:text-3xl mt-12 mb-4">
            How to Know Which Is Right for Your Family
          </h2>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-4">
            Here&apos;s a simple decision framework:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-3 text-zinc-600">
            <li><strong className="text-zinc-900">Your child is just exploring interest →</strong> Try a free app trial first. See if they gravitate toward the keyboard. If they do, that&apos;s your signal to invest in lessons.</li>
            <li><strong className="text-zinc-900">Your child is serious, or you want real, lasting progress →</strong> Private lessons with a qualified teacher. There&apos;s no substitute for personalized instruction and real-time feedback.</li>
            <li><strong className="text-zinc-900">You want the best of both worlds →</strong> In-home lessons once a week, supplemented by app practice between sessions. This is what we see the best results with.</li>
            <li><strong className="text-zinc-900">Budget is tight →</strong> Look into scholarship programs like Utah Fits All and ask about pricing options. Quality lessons may be more affordable than you think.</li>
          </ul>

          {/* FAQ */}
          <h2 className="text-2xl font-extrabold text-zinc-900 sm:text-3xl mt-12 mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Can my child learn piano from an app alone?</h3>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            They can learn the basics — simple songs, note recognition, basic rhythms. But they&apos;ll likely develop technique issues that become harder to fix over time. Think of it like YouTube workout videos: better than nothing, but a personal trainer will get you much further, much faster, and without injury.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">What is the best piano app for kids?</h3>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            Simply Piano and Yousician are the most popular options for kids, with colorful interfaces and gamified progression. Flowkey tends to work better for teens and adults. All are solid as supplemental tools used alongside real lessons. None are a complete replacement for a teacher.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Are piano lessons worth the money?</h3>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            If your goal is for your child to truly play piano — not just follow along with a screen — then yes. The investment in a good teacher pays dividends in proper technique, real musical understanding, and the confidence that comes from genuine mastery. Most adults who play piano well will tell you it started with a teacher who made a difference.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-3">How much should piano lessons cost?</h3>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg mb-6">
            Nationally, private lessons typically range from $30–$75 per half hour, depending on location, teacher experience, and whether lessons are in-studio or in-home. In-home lessons often sit at the higher end of that range because of the added convenience. Volz Method offers in-home lessons starting at $29 per half hour — competitive with studio rates, with the convenience of a teacher who comes to you.
          </p>

        </div>
      </article>

      <FooterBanner />
    </main>
  );
}
