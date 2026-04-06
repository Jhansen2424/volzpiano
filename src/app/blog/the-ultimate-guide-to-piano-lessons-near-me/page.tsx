"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";

/* Animated wrapper */
function AnimatedSection({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
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

export default function BlogPostPage() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const content = `<p>When you search for piano lessons near me for your child, you are really asking a bigger question: which piano teacher, method, and lesson format will help your child fall in love with music and stick with it. This guide explains how kids piano lessons near you work, how in home piano lessons near me for kids compare to studio lessons, and how Volz Piano’s complete Volz piano method for kids and “Piano Teachers that Drive to You” in Utah can support your family.</p>
<h2 id="table-of-contents">Table of Contents</h2>
<ul>
<li><a href="#why-local-piano-lessons-matter">Why Piano Lessons Near Me Matter for Kids</a></li>
<li><a href="#benefits-in-home-piano-lessons">Benefits of In-Home Piano Lessons Near Me</a></li>
<li><a href="#how-to-choose-piano-lessons-near-me">How to Choose the Right Piano Lessons Near Me for Your Child</a></li>
<li><a href="#what-happens-in-volz-piano-lesson">What Happens in a Volz Piano Lesson at Home</a></li>
<li><a href="#supporting-practice-at-home">Supporting Practice Between Kids’ Piano Lessons</a></li>
<li><a href="#piano-keyboard-and-equipment">Choosing a Piano Keyboard or Instrument for Kids</a></li>
<li><a href="#piano-lessons-near-me-utah-parents">Piano Lessons Near Me in Utah with Volz Piano</a></li>
<li><a href="#faq-piano-lessons-kids">FAQ: Piano Lessons Near Me for Kids</a></li>
</ul>
<h2 id="why-local-piano-lessons-matter">Why Piano Lessons Near Me Matter for Kids</h2>
<h3>From “piano lessons near me” to the right fit for your child</h3>
<p>Parents usually type piano lessons near me into a search bar when they are ready for real change in their child’s routine. Maybe your child bangs out tunes on a toy piano keyboard, sings along to every movie soundtrack, or needs a healthy offline hobby. Local children’s piano lessons near me make that step easier because they connect your family with teachers who understand your community, schedule, and lifestyle in Utah.</p>
<p>Kids piano lessons near me also let you choose times that fit around school, sports, and family events. Instead of driving across town and sitting in traffic, you can focus on finding the best piano lessons near me for kids in Utah that respect your family calendar and your child’s attention span.</p>
<h3>Why start piano early for children</h3>
<p>Structured music lessons help children build focus, memory, and planning skills that support school success. Research highlighted in Frontiers in Neuroscience shows that regular music study enhances language-based reasoning, short-term memory, and academic performance for kids, which is exactly what many parents hope to encourage when they search for music lessons for children in Utah and beyond. <a href="https://www.frontiersin.org/news/2018/04/19/neuroscience-music-lessons-cognitive-skills-academic-performance/" target="_blank" rel="noopener">One longitudinal overview of structured music lessons</a> explains how consistent practice strengthens brain areas used for reading, math, and problem solving.</p>
<p>Other child-focused resources, such as the <a href="https://www.connectionsacademy.com/support/resources/article/the-benefits-of-music-education-for-children/" target="_blank" rel="noopener">Connections Academy overview of music education benefits</a>, point out that children in music programs often show better language development, memory, and attention spans. These are powerful reasons to choose kids piano lessons near me instead of waiting until later.</p>
<h3>Local lessons keep kids connected to their own community</h3>
<p>Children respond best when they feel seen and understood. Working with a local piano teacher near me for kids means your child can relate to examples, holidays, and community events that their teacher mentions. Teachers who already serve families in Salt Lake County, Utah County, Davis County, Weber County, and nearby areas understand how Utah seasons, school breaks, and sports schedules affect practice time, which helps them coach your child realistically.</p>
<p><a href="#table-of-contents">Return to Table of Contents</a></p>
<h2 id="benefits-in-home-piano-lessons">Benefits of In-Home Piano Lessons Near Me</h2>
<h3>Comfort and focus in a familiar space</h3>
<p>In-home children’s piano lessons near me let your child learn on the instrument they will practice on every day. When a piano tutor at home for kids arrives at your door, your child does not have to adapt to a new room, new piano, or noisy waiting area. This is especially helpful for shy or sensitive kids and for beginners who are just learning where each piano key lives.</p>
<p>Volz Piano provides Piano Teachers that Drive to You in Utah, so lessons happen in your living room instead of a studio. Families across Salt Lake County, Utah County, Davis County, Weber County, and nearby areas can pair this mobile model with the complete Volz piano method for kids, giving children both convenience and a clear learning path.</p>
<h3>Less driving for parents, more consistency for kids</h3>
<p>When you choose in home piano lessons near me for kids, you remove one of the biggest obstacles to long term progress: transportation. Instead of bundling siblings into the car, waiting in parking lots, or racing across town after work, you can let piano teachers that drive to you handle the commute.</p>
<p>That time savings makes it easier to stick with weekly private piano lessons near me for kids, which in turn reinforces discipline and progress. Many Utah parents use the lesson slot to cook dinner, help other children with homework, or simply enjoy a moment of quiet while a mobile piano tutor near me for children works with their young pianist.</p>
<h3>Practice habits feel more natural</h3>
<p>Because your child learns and practices on the same piano or piano keyboard at home, transitions between “lesson mode” and “practice mode” are smoother. The teacher can point to a measure and say, “Play this three times every day,” and your child sees the exact same keys, bench height, and music stand later that evening.</p>
<p>Articles on music education benefits, such as those from <a href="https://www.savethemusic.org/blog/benefits-to-the-brain/" target="_blank" rel="noopener">Save The Music</a>, explain that consistent practice builds self-confidence and leadership skills for children. In-home lessons make that consistency much easier for busy families to manage.</p>
<p><a href="#table-of-contents">Return to Table of Contents</a></p>
<h2 id="how-to-choose-piano-lessons-near-me">How to Choose the Right Piano Lessons Near Me for Your Child</h2>
<h3>Clarify your goals before contacting teachers</h3>
<p>Before you fill out forms or schedule calls, ask yourself a few questions:</p>
<ul>
<li>Is my child more excited about classical pieces, movie themes, pop songs, or church music</li>
<li>Are we starting piano lessons near me for a 5 year old beginner, an older elementary child, or a tween</li>
<li>Do we want one on one piano lessons near me for kids, or are small group classes okay at first</li>
<li>How much time can our family realistically commit to practice each day</li>
</ul>
<p>Your answers will shape the type of kids piano program near me that fits best. When you talk with a local piano teacher for children, share this information so they can recommend the right lesson length, frequency, and materials.</p>
<h3>Look for a structured kids’ piano method</h3>
<p>Children do best when their lessons follow a clear sequence. The Volz piano method for kids, offered through <a href="https://volzpiano.com/" target="_blank" rel="noopener">Volz Piano’s Utah program</a>, is designed specifically for young learners. It blends technique, theory, sight reading, ear training, and creative exploration in a child-friendly way so that kids can understand both how and why music works.</p>
<p>When evaluating beginner piano lessons near me for kids, ask potential teachers or schools:</p>
<ul>
<li>Which lesson books or piano keyboard method books they use for children</li>
<li>How they introduce rhythm, reading, and improvisation</li>
<li>How they adjust for different learning styles and attention spans</li>
<li>Whether they offer a written plan so you can see progress over time</li>
</ul>
<p>You can also explore resources like <a href="https://volzpiano.com/recommended-piano-books-for-beginners-kid-friendly-picks-that-work-with-the-volz-piano-method/" target="_blank" rel="noopener">Volz Piano’s guide to recommended piano books for beginners</a> to see which books tend to work well with the Volz piano method for kids.</p>
<h3>Prioritize teachers who specialize in children</h3>
<p>Not every musician who plays well can teach children effectively. When you compare kids piano lessons near me in Utah, ask about the teacher’s experience with toddlers, early elementary students, and older beginners. Look for patient, upbeat teachers who can turn theory into games, simplify explanations, and celebrate small wins.</p>
<p>Many Utah parents prefer a piano teacher near me for kids who will meet children where they are. That might mean offering short, playful sessions for toddlers, more focused work for 8 to 10 year olds, and flexible song choices for tweens who care deeply about musical style.</p>
<h3>Check communication style and parent support</h3>
<p>Parent involvement is crucial for success, especially in the first year of children’s piano lessons near me. Ask potential teachers how they keep you in the loop. Do they send practice notes, offer quick text updates, or share periodic progress reports</p>
<p>Volz Piano, through its many kids-focused resources like the <a href="https://volzpiano.com/learning-the-piano-keys-for-kids-a-parents-guide-to-the-volz-piano-method-in-utah/" target="_blank" rel="noopener">parent guide to learning the piano keys for kids</a>, emphasizes clear parent education so you can support practice even if you never took piano lessons yourself.</p>
<p><a href="#table-of-contents">Return to Table of Contents</a></p>
<h2 id="what-happens-in-volz-piano-lesson">What Happens in a Volz Piano Lesson at Home</h2>
<h3>Warm up: posture, hands, and listening</h3>
<p>In a typical Volz Piano in-home lesson, a piano teacher that drives to you in Utah arrives at your home, greets your child, and quickly checks the setup. They adjust the bench, confirm that feet are supported, and review posture. Simple warm ups follow, such as finger taps on the closed lid, five-note patterns on white keys, or clapped rhythms to a steady beat.</p>
<p>These brief routines help kids settle their bodies and minds before diving into new pieces. They also train foundational skills like steady tempo, relaxed hands, and focused listening that will support everything your child plays later.</p>
<h3>Reading, technique, and fun activities</h3>
<p>After warm ups, your child typically works through a mix of:</p>
<ul>
<li>Short pieces from a level-appropriate lesson book</li>
<li>Targeted exercises for finger strength and coordination</li>
<li>Note-reading drills, such as flash cards or quick sight-reading lines</li>
<li>Games that reinforce rhythm, intervals, or patterns on the piano keyboard</li>
</ul>
<p>The complete Volz piano method for kids weaves these elements together so children see how technique, reading, and musical expression connect. For example, your child might first clap a rhythm, then play it on two piano keys, then add it to a short song. These layers keep kids engaged while building real skill.</p>
<h3>Personalization based on each child’s interests</h3>
<p>One reason parents choose private piano lessons near me for kids instead of large group classes is personalization. Volz Piano instructors listen when children say, “I want to play this movie theme,” or “Can we learn a song from church.” Whenever possible, teachers adapt pieces or add supplemental music that matches the child’s interests while still honoring the structure of the Volz method.</p>
<p>This blend of structure and choice helps keep practice time positive. Children feel ownership of their music, which increases motivation and reduces resistance when it is time to sit at the piano keyboard.</p>
<h3>Clear take-home practice plan</h3>
<p>At the end of each lesson, your child leaves with a simple practice plan. For younger children, this may be a color-coded chart or sticker system. For older kids, it might be a written list of what to repeat, where to slow down, and which new patterns to try.</p>
<p>Because Volz Piano focuses on in-home lessons, the teacher can design practice routines that fit your exact space and schedule. That might mean a mini-practice before dinner, a quick run-through after school, or weekend review sessions for busy sports families.</p>
<p><a href="#table-of-contents">Return to Table of Contents</a></p>
<h2 id="supporting-practice-at-home">Supporting Practice Between Kids’ Piano Lessons</h2>
<h3>How much practice do children need</h3>
<p>For most beginners, 10 to 15 minutes a day is enough. Very young children, especially those in piano lessons near me for toddlers in Utah, may start with just 5 focused minutes. The goal is to build a habit first, then gradually increase the time as attention and stamina grow.</p>
<p>Reviews of music education, such as summaries shared by <a href="https://meritmusic.org/benefits-music-education/" target="_blank" rel="noopener">Merit School of Music</a>, point out that ongoing engagement with music helps children develop stronger academic and social skills over time, so the small daily investment you make in practice can pay off far beyond the keyboard.</p>
<h3>Creating a practice-friendly environment</h3>
<p>You do not need a perfect music room to support piano lessons near me for elementary students. A quiet corner with a well-placed piano keyboard or acoustic piano, a stable bench, and good lighting is enough. Keep books, pencils, and a metronome nearby so your child does not waste practice time searching for tools.</p>
<p>Parents worried about screen time often appreciate that music practice offers a healthy alternative. The American Academy of Pediatrics encourages families to balance media with active, creative activities that support development, and music fits beautifully into that category. You can read more in their <a href="https://www.healthychildren.org/English/family-life/Media/Pages/kids-and-screen-time-how-to-use-the-5-cs-of-media-guidance.aspx" target="_blank" rel="noopener">guidance on media use and offline activities</a>.</p>
<h3>Simple practice routines that work</h3>
<p>To support kids piano lessons near me, you can structure practice sessions like this:</p>
<ul>
<li>1 to 2 minutes of warm ups such as finger taps, five-note scales, or clapped rhythms</li>
<li>3 to 5 minutes reviewing last week’s songs</li>
<li>3 to 5 minutes on new material, broken into small sections</li>
<li>1 to 2 minutes of “free play,” where your child experiments with patterns or makes up a melody</li>
</ul>
<p>For very young children, you might even split these steps into two mini-sessions during the day. The key is consistency, not perfection. Over several months of piano lessons near me for kids in Utah, these short, regular sessions can build serious skill.</p>
<h3>Parent roles during practice</h3>
<p>You do not need to know how to play piano to help. Instead, focus on:</p>
<ul>
<li>Protecting practice time by turning off competing screens and distractions</li>
<li>Offering encouragement instead of criticism when mistakes happen</li>
<li>Asking your child to “teach” you a measure, which reinforces their understanding</li>
<li>Checking that the practice chart from your Volz Piano teacher is completed each week</li>
</ul>
<p>Over time, your support can turn practice from a chore into a shared family rhythm.</p>
<p><a href="#table-of-contents">Return to Table of Contents</a></p>
<h2 id="piano-keyboard-and-equipment">Choosing a Piano Keyboard or Instrument for Kids</h2>
<h3>Acoustic piano vs digital piano keyboard</h3>
<p>Many parents wonder whether they need a full acoustic piano before starting kids piano lessons near me. For most beginners, a high quality digital piano keyboard with weighted keys is perfectly fine. It allows children to learn hand position, finger strength, and basic dynamics without a large upfront investment.</p>
<p>If your child already practices daily and you have room, an acoustic piano offers rich tone and a traditional feel. Families who are unsure can start with a digital piano keyboard and upgrade later if their child thrives in children’s piano lessons near me.</p>
<h3>Key features to look for</h3>
<p>When you shop for a piano keyboard for kids, look for:</p>
<ul>
<li>At least 61 keys, with 76 or 88 preferred for long term growth</li>
<li>Weighted or semi-weighted keys to build proper finger strength</li>
<li>A sturdy, adjustable stand and bench so posture can be correct</li>
<li>Headphone jack for quiet practice when needed</li>
</ul>
<p>Your Volz Piano teacher can help you match an instrument to your budget and goals. You can also browse resources such as Volz Piano’s <a href="https://volzpiano.com/kids-piano-lessons-at-home/" target="_blank" rel="noopener">kids piano lessons at home guide</a> for tips on setting up your home practice space.</p>
<h3>Setting up the home lesson space</h3>
<p>To support in home piano lessons near me for kids, choose a space that is:</p>
<ul>
<li>Quiet enough for your child and teacher to hear each other clearly</li>
<li>Close to the main living area so practice feels connected to family life, not isolated</li>
<li>Free of distractions such as television, loud toys, or clutter</li>
</ul>
<p>Place your child’s practice chart where they can see it daily, such as on the wall near the piano keyboard or on the fridge. That visual reminder helps keep practice in mind even on busy days.</p>
<p><a href="#table-of-contents">Return to Table of Contents</a></p>
<h2 id="piano-lessons-near-me-utah-parents">Piano Lessons Near Me in Utah with Volz Piano</h2>
<h3>How Volz Piano serves local Utah families</h3>
<p>Volz Piano focuses on children’s piano lessons near me for families across Utah. The program offers the complete Volz piano method for kids and pairs it with Piano Teachers that Drive to You in Utah, so your child can enjoy one on one piano lessons near me for kids without leaving home. This combination of a kid-centered method and mobile teachers is highlighted throughout Volz Piano resources, including the <a href="https://volzpiano.com/piano-tutor-that-comes-to-your-home-in-home-kids-piano-lessons-across-utah/" target="_blank" rel="noopener">piano tutor that comes to your home guide</a> and other parent-focused articles.</p>
<p>Families in cities and neighborhoods across Salt Lake County, Utah County, Davis County, Weber County, and nearby areas can request mobile kids piano lessons that match their schedule and goals. Volz Piano connects you with a piano teacher near me for kids who is already accustomed to teaching in living rooms, kitchens, basements, and everything in between.</p>
<h3>Why in-home kids’ piano lessons fit Utah lifestyles</h3>
<p>Utah families juggle school, sports, church, outdoor activities, and family time. In-home piano lessons near me for kids respect that lifestyle by pulling the lesson to your child instead of asking your family to travel. Parents who choose mobile piano lessons near me for children often mention that they save hours each month simply by removing drive time.</p>
<p>This matters when weather, winter roads, or late sunsets make travel less appealing. A piano teacher that drives to you in Utah removes the guesswork so lessons stay consistent year round.</p>
<h3>Using Volz Piano resources between lessons</h3>
<p>Volz Piano publishes a growing library of parent-friendly articles on topics like in-home lessons, practice tips, and teaching methods. For example, you can explore the <a href="https://volzpiano.com/the-ultimate-guide-to-piano-teaching-methods-for-kids-exploring-the-volz-piano-method/" target="_blank" rel="noopener">guide to piano teaching methods for kids</a> to see how different approaches compare, or review posts on cost, practice strategies, and local service areas through the <a href="https://volzpiano.com/blog/" target="_blank" rel="noopener">Volz Piano blog</a>.</p>
<p>These resources support your child’s journey long after you first search for piano lessons near me and schedule that initial call.</p>
<h3>Next steps for Utah parents</h3>
<p>If you are ready to move from research to action, you can visit the <a href="https://volzpiano.com/" target="_blank" rel="noopener">Volz Piano homepage</a> to learn more about the Volz piano method for kids and request a call. During that conversation, you can confirm coverage in your area, discuss your child’s age and experience, and set up either a trial lesson or ongoing weekly spot.</p>
<p>From there, your child can enjoy fun piano lessons near me that come to your home, and you can watch their confidence grow week by week.</p>
<p><a href="#table-of-contents">Return to Table of Contents</a></p>
<h2 id="faq-piano-lessons-kids">FAQ: Piano Lessons Near Me for Kids</h2>
<details>
<summary>What age should my child start piano lessons near me</summary>
<p>Many children are ready for beginner piano lessons near me for kids around age five or six, when they can focus for 15 to 20 minutes and comfortably place all five fingers on adjacent keys. Some preschoolers may start earlier in very short, playful lessons, especially when working with a piano teacher near me for kids who specializes in young beginners. Volz Piano also offers options for piano lessons near me for toddlers in Utah that emphasize musical play and basic patterns more than formal reading at first.</p>
</details><details>
<summary>Do we need a full acoustic piano, or is a piano keyboard enough</summary>
<p>At the beginning, a piano keyboard with weighted keys is usually enough for kids piano lessons near me. An 88-key digital piano keyboard gives the best long term flexibility, but a 61-key or 76-key model can work for early stages if it has touch sensitivity and a stable stand. As your child progresses, your Volz Piano teacher can help you decide whether upgrading to an acoustic piano will support their goals.</p>
</details><details>
<summary>How much do kids’ piano lessons near me usually cost</summary>
<p>Pricing varies by location, lesson length, and teacher experience. In Utah, affordable piano lessons near me for kids might range from shorter 30 minute sessions to longer 45 minute lessons for older children. Volz Piano provides in home piano lessons near me for kids with clear pricing structures and may offer sibling options so families can enroll more than one child efficiently. When you contact Volz Piano, you can ask for current rates for mobile piano lessons near me for children in your area.</p>
</details><details>
<summary>How often should my child have piano lessons</summary>
<p>Most children thrive with one weekly lesson, paired with consistent daily practice. One on one piano lessons near me for kids give enough time for new material, review, and questions without overwhelming young learners. In special situations, such as preparing for a recital or audition, your piano tutor near me for children may recommend temporary extra lessons, but a once-a-week schedule works well for most families.</p>
</details><details>
<summary>Can shy or anxious children do well with in-home piano lessons</summary>
<p>Yes. In fact, many shy children feel more comfortable with in home piano lessons near me for kids than in a busy studio environment. A piano tutor at home for kids meets them on their own turf, which can reduce anxiety. Volz Piano’s complete Volz piano method for kids is designed to build confidence gradually, with small wins in every lesson and friendly teachers who understand how to encourage sensitive students.</p>
</details><details>
<summary>What if my child already tried piano lessons and lost interest</summary>
<p>Sometimes children lose interest because their previous lessons moved too fast, used music they did not enjoy, or lacked structure. When you look again for piano lessons near me, ask potential teachers how they will approach motivation and song choice. Volz Piano instructors can refresh a returning student’s experience with new pieces, game-based learning, and a clearer practice plan that fits your child’s current age and interests.</p>
</details><details>
<summary>How do Volz Piano’s “Piano Teachers that Drive to You” work</summary>
<p>Volz Piano matches your family with a local piano teacher that drives to you in Utah. At the agreed time, your teacher arrives at your home each week, teaches kids piano lessons at your own piano or piano keyboard, and leaves you with a tailored practice plan. This mobile model makes private piano lessons near me for kids easier to sustain over months and years, especially for families with busy schedules.</p>
</details>
<p><a href="#table-of-contents">Return to Table of Contents</a></p>`;

  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden bg-zinc-900 pt-24">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[500px] rounded-full opacity-15 blur-[120px]"
          style={{ background: "radial-gradient(circle, #6343d4 0%, transparent 70%)" }}
        />
        <div className="relative z-[2] text-center px-6">
          <span
            className="inline-block rounded-full bg-brand/20 px-4 py-1 text-xs font-bold uppercase tracking-wider text-brand mb-6"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(10px)",
              transition: "all 0.5s ease-out 0.1s",
            }}
          >
            Piano Learning
          </span>
          <h1
            className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl max-w-4xl mx-auto"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s ease-out 0.2s",
              textShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            The Ultimate Guide to Piano Lessons Near Me
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            November 18, 2025
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/the-ultimate-guide-to-piano-lessons-near-me.jpg"
              alt="Featured image for The Ultimate Guide to Piano Lessons Near Me"
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            />
          </div>
        </AnimatedSection>
      </div>
      {/* Content */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 sm:px-12">
          <AnimatedSection>
            <article
              className="prose prose-zinc prose-lg max-w-none
                prose-headings:font-extrabold prose-headings:text-zinc-900
                prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-l-4 prose-h2:border-brand prose-h2:pl-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-zinc-600 prose-p:leading-relaxed
                prose-a:text-brand prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-zinc-800
                prose-ul:text-zinc-600 prose-ol:text-zinc-600
                prose-li:marker:text-brand
                prose-img:rounded-xl prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
            />
          </AnimatedSection>

          {/* Back link */}
          <AnimatedSection delay={0.2} className="mt-16 pt-8 border-t border-zinc-200">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline"
            >
              <svg className="h-4 w-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Back to all articles
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
