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

  const content = `&nbsp;

<a href="https://volzpiano.com/" target="_self">Volz Piano</a> specializes in piano training for kids using a child-friendly approach that blends skill building, creativity, and confidence. This guide explains how children’s piano lessons work when a piano teacher comes to your home, what the Volz piano method for kids emphasizes, how to set up beginner keyboard options for kids, and how to cultivate steady kids piano practice habits that fit real family schedules in Utah. You will also find city-specific insights for Salt Lake City, Provo, Orem, Park City, Ogden, Lehi, Draper, St. George, and American Fork, plus clear advice on choosing a kid-friendly piano teacher, preparing for recitals, and aligning with youth music programs in Utah.
<h2 id="toc">Table of Contents</h2>
<ul>
 	<li><a href="#what-is-piano-training">What Is Piano Training for Kids?</a></li>
 	<li><a href="#benefits">Why Start Early: Benefits for Children</a></li>
 	<li><a href="#volz-method">The Volz Piano Method for Kids</a></li>
 	<li><a href="#in-home">Piano Teachers That Drive to You in Utah</a>
<ul>
 	<li><a href="#slc">Salt Lake City Piano Lessons for Kids</a></li>
 	<li><a href="#provo">Provo and Orem: Private and Group Options</a></li>
 	<li><a href="#park-city">Park City and Ogden: Lessons Taught at Home</a></li>
 	<li><a href="#lehi-draper">Lehi and Draper: After-School Scheduling</a></li>
 	<li><a href="#st-george">St. George and American Fork: Getting Started</a></li>
</ul>
</li>
 	<li><a href="#formats">Lesson Formats and Age Pathways</a></li>
 	<li><a href="#curriculum">Child-Friendly Curriculum and Skills</a></li>
 	<li><a href="#practice">Kids Piano Practice That Actually Works</a></li>
 	<li><a href="#scheduling-pricing">Scheduling, Placement, and Budget Planning</a></li>
 	<li><a href="#equipment">Choosing a Beginner Keyboard for Kids and Home Setup</a></li>
 	<li><a href="#repertoire-recitals">Repertoire, Recitals, and Motivation</a></li>
 	<li><a href="#special-topics">Special Topics: Shy Learners, Short Attention Spans, and True Beginners</a></li>
 	<li><a href="#choose-teacher">How to Choose a Kid-Friendly Piano Teacher</a></li>
 	<li><a href="#faqs">FAQs</a></li>
</ul>
<h2 id="what-is-piano-training">What Is Piano Training for Kids?</h2>
Piano training is a structured sequence of children’s piano lessons that blend technique, music theory for children, ear training for kids, and creative play. The goal is steady progress with a child-friendly piano curriculum rather than a one-size-fits-all plan. With <a href="https://volzpiano.com/" target="_self">piano lessons for kids</a> through <a href="https://volzpiano.com/" target="_self">Volz Piano</a>, families choose between private and small group formats, and many prefer in-home piano lessons for kids where a piano teacher comes to your house, so practice habits develop right where the instrument lives.

In most cases, piano instruction for children starts with beginner piano for kids, easy posture habits, and fun rhythm games for kids piano. Children discover note reading for kids, simple piano chords for kids, and scales for young beginners, then move toward kids piano repertoire and easy piano songs for children for confidence and motivation.

Families in Utah often search for youth piano lessons and a piano program for kids that fits real schedules. The <a href="https://volzpiano.com/" target="_self">piano teachers that drive to you</a> model at Volz Piano was built for that reality, making it simpler to add weekly lessons without traffic stress.

<a href="#toc">Return to Table of Contents</a>
<h2 id="benefits">Why Start Early: Benefits for Children</h2>
Early, well-scaffolded piano training for children supports listening, coordination, and attention. Many music educators highlight that children’s music education can reinforce patience and focus while giving kids a healthy way to set goals. Professional organizations such as the <a href="https://nafme.org/" target="_blank" rel="noopener">National Association for Music Education</a> share resources on age-appropriate practice and classroom strategies that can inspire at-home learning. Research bodies like the <a href="https://www.nih.gov/" target="_blank" rel="noopener">National Institutes of Health</a> publish studies on learning, memory, and skill acquisition that parents often explore when deciding on lessons. For Utah families, this aligns well with <a href="https://www.schools.utah.gov/" target="_blank" rel="noopener">state education</a> goals around arts experiences for children.

When lessons are child-centered, kids engage more deeply. The right sequence of sight reading for children, ear training for kids, and rhythm games for kids piano turns practice into a reachable routine. Over time, students build a piano learning path for kids that supports school music participation and complements youth music programs in Utah.

<a href="#toc">Return to Table of Contents</a>
<h2 id="volz-method">The Volz Piano Method for Kids</h2>
The Volz piano method for kids is a child-friendly approach that focuses on clarity, steady wins, and fun artistry. Lessons grow confidence first, then speed. Teachers use piano technique for small hands, accessible piano finger exercises for kids, and stepwise music theory for children. The method keeps pieces within reach while offering optional challenges for eager learners.
<h3>Core Elements Parents Notice</h3>
<ul>
 	<li>Short, specific goals that help piano training for children with no experience feel doable.</li>
 	<li>Balanced emphasis on note reading for kids, ear training for kids, and simple improvisation games.</li>
 	<li>Planned exposure to piano chords for kids and scales for young beginners so patterns become familiar.</li>
 	<li>Clear recital checkpoints and supportive kids piano recital preparation to reduce stage nerves.</li>
</ul>
Because Volz Piano provides <a href="https://volzpiano.com/" target="_self">piano teachers that drive to you</a>, the method transfers smoothly into daily life. Parents can observe, ask questions, and support kids piano practice right after the lesson ends, which often improves follow-through.

<a href="#toc">Return to Table of Contents</a>
<h2 id="in-home">Piano Teachers That Drive to You in Utah</h2>
In-home piano lessons for kids are practical for busy families. A mobile piano teacher for kids removes the weekly commute and allows children to learn on their own instrument. This familiar context helps shy students and young beginners find comfort quickly. Volz Piano’s model supports piano lessons at home for kids across the Wasatch Front and beyond, including Salt Lake City, Provo, Orem, Park City, Ogden, Lehi, Draper, St. George, and American Fork.

Parents frequently search for terms like piano teacher for kids, kids piano tutor, and piano tutor for kids near me, then realize that a teacher who comes to their home is the simplest path to consistent youth piano lessons. The combination of convenience and continuity is why many families pick <a href="https://volzpiano.com/" target="_self">Volz Piano</a> for a piano course for children or a full piano program for kids.

<a href="#toc">Return to Table of Contents</a>
<h3 id="slc">Salt Lake City Piano Lessons for Kids</h3>
Families often want affordable piano lessons for children in Salt Lake City without sacrificing quality. With child piano education at home, the environment is set up for real-world practice. If you are searching for Utah piano lessons for kids in this area, look for options that include flexible scheduling, patient pacing, and clear goals.

When comparing choices for children’s piano lessons, consider whether the teacher introduces easy piano songs for children early, uses rhythm games for kids piano, and offers a roadmap for kids piano repertoire. Many parents also ask for kids piano lessons with flexible scheduling because of sports and school. If you are ready to explore, <a href="https://volzpiano.com/" target="_self">connect with Volz Piano</a> to learn how a piano teacher who comes to your house for kids can get your child started.

<a href="#toc">Return to Table of Contents</a>
<h3 id="provo">Provo and Orem: Private and Group Options</h3>
Provo and Orem have a strong culture of youth music programs in Utah, and many families are deciding between private piano lessons for children at home and small group piano classes. Both can work. Private lessons are ideal for piano training for children with no experience and for kids who benefit from one-on-one guidance. Group settings can add social motivation and games.

Some parents search for beginner piano lessons for kids in Provo or mobile piano teachers for kids in Orem to reduce drive time. A home visit piano teacher for children streamlines routines and helps with consistent kids piano practice. With <a href="https://volzpiano.com/" target="_self">Volz Piano</a>, in-home lessons keep momentum high and give parents visibility into progress.

<a href="#toc">Return to Table of Contents</a>
<h3 id="park-city">Park City and Ogden: Lessons Taught at Home</h3>
Park City families often prefer piano lessons for kids taught at home in Park City because of weather and schedules. Ogden is similar, with families juggling multiple activities. In both cities, a mobile piano teacher for kids creates stability. Children can start with preschool piano lessons in Utah or elementary piano lessons for kids, then grow into longer sessions.

If your child is shy or has a short attention span, in-home formats make it easier to adjust tasks, include rhythm games, and switch to quick piano finger exercises for kids. You can ask about after-school piano classes for kids or hybrid options that combine private and small group sessions.

<a href="#toc">Return to Table of Contents</a>
<h3 id="lehi-draper">Lehi and Draper: After-School Scheduling</h3>
Parents in Lehi and Draper often need after-school piano classes for kids, including early evening time slots. Ask teachers how they handle transitions after school. The best fit includes short warmups, a review of sight reading for children, and a bite-sized new skill such as simple piano chords for kids or a fun ear training game.

Families that enter lessons through an in-home model frequently stay longer, since the routine is practical. If you are comparing options, consider a trial with <a href="https://volzpiano.com/" target="_self">Volz Piano’s piano teachers that drive to you</a> to see how your child responds in a familiar environment.

<a href="#toc">Return to Table of Contents</a>
<h3 id="st-george">St. George and American Fork: Getting Started</h3>
Starting early is helpful in St. George and American Fork where communities are active and schedules can be tight. Search terms like piano lessons for kids in American Fork or best kids piano tutor near me Utah usually lead to options that vary in approach. Ask about a child-friendly piano curriculum, kids piano recital preparation, and how teachers motivate kids piano practice week to week.

In St. George, families may combine keyboard lessons for kids at home with periodic acoustic piano access. This is a common pathway in many youth music programs in Utah and it works well when guided by a thoughtful teacher.

<a href="#toc">Return to Table of Contents</a>
<h2 id="formats">Lesson Formats and Age Pathways</h2>
Children progress best when lessons match their stage. Below are common pathways parents consider when building a piano learning path for kids.
<h3>Preschool Piano Lessons in Utah</h3>
<ul>
 	<li>Short sessions with movement breaks and rhythm games for kids piano.</li>
 	<li>Focus on ear training for kids, pattern recognition, and playful keyboard geography.</li>
 	<li>Introduce beginner keyboard for kids with simple black-key songs and easy finger numbers.</li>
</ul>
<h3>Elementary Piano Lessons for Kids</h3>
<ul>
 	<li>Mix of note reading for kids and sight reading for children with simple two-hand pieces.</li>
 	<li>Piano technique for small hands using gentle posture and relaxed wrists.</li>
 	<li>Kids piano repertoire that includes easy piano songs for children and teacher duets.</li>
</ul>
<h3>Private vs Group Piano Classes</h3>
<ul>
 	<li><strong>Private</strong>: Great for piano training for children with no experience, shy learners, and targeted goals.</li>
 	<li><strong>Small Group</strong>: Useful for social motivation and games, often popular for after-school piano classes for kids.</li>
 	<li>Hybrid schedules can keep energy high while building steady skills.</li>
</ul>
Whichever format you choose, align on clear goals for your child and confirm how progress is measured. Volz Piano can help you compare options and place your child in the right setting through <a href="https://volzpiano.com/" target="_self">an in-home trial</a>.

<a href="#toc">Return to Table of Contents</a>
<h2 id="curriculum">Child-Friendly Curriculum and Skills</h2>
Effective curriculum keeps steps small and confidence high. Below are core pieces that make piano training stick for kids.
<h3>Music Theory for Children, Without the Jargon</h3>
<ul>
 	<li>Patterns first, terms second. Children spot shapes on the keyboard before they label them.</li>
 	<li>Introduce piano chords for kids through simple blocked shapes, then break them into patterns.</li>
 	<li>Use scales for young beginners to build even fingers and a sense of key.</li>
</ul>
<h3>Technique That Fits Small Hands</h3>
<ul>
 	<li>Comfortable posture and bench height so hands relax naturally.</li>
 	<li>Short piano finger exercises for kids that build even tone without tension.</li>
 	<li>Frequent micro-breaks and movement to refocus attention.</li>
</ul>
<h3>Reading, Listening, and Rhythm</h3>
<ul>
 	<li>Note reading for kids moves from landmark notes to patterns, then phrases.</li>
 	<li>Sight reading for children begins with tiny, readable pieces and grows steadily.</li>
 	<li>Ear training for kids builds interval awareness with call-and-response games.</li>
 	<li>Rhythm games for kids piano connect clapping, speaking, and playing.</li>
</ul>
<h3>Repertoire That Motivates</h3>
<ul>
 	<li>Kids piano repertoire blends familiar tunes, simple original pieces, and seasonal music.</li>
 	<li>Easy piano songs for children keep wins coming while building skills.</li>
 	<li>Arrangements tie into school events and youth music programs in Utah for community connection.</li>
</ul>
Volz Piano’s teachers adapt the pace so children master key skills and stay excited. Learn more about the approach by visiting <a href="https://volzpiano.com/" target="_self">Volz Piano</a>.

<a href="#toc">Return to Table of Contents</a>
<h2 id="practice">Kids Piano Practice That Actually Works</h2>
Practice should feel short, clear, and winnable. Here is a simple framework that helps kids piano practice become a habit at home.
<h3>The Three-Block Routine</h3>
<ol>
 	<li><strong>Warmup</strong>: One minute of piano finger exercises for kids or a quick scale for young beginners.</li>
 	<li><strong>Focus Piece</strong>: Two or three passes on the week’s main song, hands separate then together.</li>
 	<li><strong>Fun Finish</strong>: One rhythm game, a short ear training call-and-response, or a favorite review piece.</li>
</ol>
<h3>Parent Tips</h3>
<ul>
 	<li>Keep the keyboard visible. If you use a beginner keyboard for kids, leave it on a stand and plugged in.</li>
 	<li>Use a checklist with stickers. Children love visible progress.</li>
 	<li>Rotate activities for piano lessons for kids with short attention spans. Switch tasks every few minutes.</li>
</ul>
If your schedule is tight, aim for five to ten minutes daily rather than one long session. Regular mini-wins keep motivation high. If you want help tailoring a plan, ask your teacher during your next <a href="https://volzpiano.com/" target="_self">in-home lesson</a>.

<a href="#toc">Return to Table of Contents</a>
<h2 id="scheduling-pricing">Scheduling, Placement, and Budget Planning</h2>
Every family’s situation is different, so plan around consistency. Many parents look for kids piano lessons with flexible scheduling, especially in sports seasons. In neighborhoods across the Wasatch Front, in-home formats make it simpler to protect lesson time and cut travel.
<h3>Placement Questions to Ask</h3>
<ul>
 	<li>Is my child ready for preschool piano lessons in Utah or better suited to elementary piano lessons for kids?</li>
 	<li>Would private piano lessons for children at home fit my child’s temperament better than group piano lessons for children near me?</li>
 	<li>What is a realistic weekly commitment for our family?</li>
</ul>
<h3>Budget Notes</h3>
<ul>
 	<li>Parents often compare options for affordable piano lessons for children in Salt Lake City and surrounding cities. Quality, retention, and convenience matter.</li>
 	<li>In-home lessons save time and reduce driving costs, which can offset tuition differences.</li>
</ul>
To explore best piano training for kids in Utah, or to find a piano teacher who comes to your house for kids, you can start with <a href="https://volzpiano.com/" target="_self">Volz Piano</a>. If you need a specific time block, ask early to secure it.

<a href="#toc">Return to Table of Contents</a>
<h2 id="equipment">Choosing a Beginner Keyboard for Kids and Home Setup</h2>
Many families begin with a beginner keyboard for kids before moving to an acoustic piano. Look for full-size keys, simple controls, and a stand that places the forearm parallel to the floor. Headphones are useful for quiet practice, but be sure to include short unplugged moments so children hear the natural instrument volume.
<h3>Home Setup Checklist</h3>
<ul>
 	<li>Keyboard or piano in a visible, low-distraction space.</li>
 	<li>Bench height that supports piano technique for small hands.</li>
 	<li>Music light and a pencil for quick markings during kids piano practice.</li>
</ul>
If you are planning keyboard lessons for kids at home while exploring an acoustic purchase later, tell your teacher. The curriculum can be optimized for your setup. For guidance on getting started, reach out to <a href="https://volzpiano.com/" target="_self">Volz Piano</a> to discuss equipment options.

<a href="#toc">Return to Table of Contents</a>
<h2 id="repertoire-recitals">Repertoire, Recitals, and Motivation</h2>
Children love goals they can see. Recitals provide a friendly milestone and a reason to polish. Gentle kids piano recital preparation includes mock run-throughs, simple bowing practice, and a backup plan if nerves spike. Choose pieces one notch below the child’s peak difficulty so the experience is positive.
<h3>Building a Motivating Playlist</h3>
<ul>
 	<li>Kids piano repertoire with quick wins, including easy piano songs for children.</li>
 	<li>One “challenge” piece to stretch confidence with teacher support.</li>
 	<li>Seasonal tunes tied to school or youth music programs in Utah.</li>
</ul>
Ask teachers how they manage milestones within the Volz piano method for kids. Templates for goal sheets and simple progress charts can keep everything on track. You can request examples during your next visit from <a href="https://volzpiano.com/" target="_self">a mobile piano teacher for kids</a>.

<a href="#toc">Return to Table of Contents</a>
<h2 id="special-topics">Special Topics: Shy Learners, Short Attention Spans, and True Beginners</h2>
Two common questions from parents are how to support piano lessons for shy kids and how to maintain focus during piano lessons for kids with short attention spans. The answer is structure and choice. Give children two or three options that all move progress forward. Alternate between movement, reading, listening, and playing. Use rhythm games for kids piano as a reset. The same approach suits piano training for children with no experience, where confidence is the main goal in the first weeks.

For some families, after-school piano classes for kids provide social energy. Others prefer private piano lessons for children at home to reduce pressure. Both can be effective when the teacher adapts content in real time. If you want an educator who can do that on your schedule, ask about <a href="https://volzpiano.com/" target="_self">piano teachers that drive to you in Utah</a>.

<a href="#toc">Return to Table of Contents</a>
<h2 id="choose-teacher">How to Choose a Kid-Friendly Piano Teacher</h2>
Finding the best kids piano tutor near me Utah usually comes down to fit. Look for a kid-friendly piano teacher who explains the plan in simple steps and offers a clear piano learning path for kids from first lesson to first recital.
<h3>Checklist for Families</h3>
<ul>
 	<li>Experience with children’s piano lessons at your child’s age.</li>
 	<li>Demonstrated use of music theory for children, note reading for kids, and ear training for kids with games.</li>
 	<li>Flexible pacing and concrete goals.</li>
 	<li>Options for in-home piano lessons for kids and small group formats if desired.</li>
</ul>
If convenience matters, prioritize a <a href="https://volzpiano.com/" target="_self">piano teacher for kids</a> who travels to you. That single change can solve the weekly logistics that derail momentum. When you are ready, explore <a href="https://volzpiano.com/" target="_self">Volz Piano’s piano course for children</a> and ask about a first visit.

<a href="#toc">Return to Table of Contents</a>
<h2 id="faqs">FAQs</h2>
<details><summary>What age is best to start piano training for kids?</summary>Many families begin with preschool piano lessons in Utah when children show interest in patterns and rhythm. Others wait until early elementary. The key is a patient pace and a child-friendly piano curriculum.

</details><details><summary>How long should kids practice each day?</summary>Start with five to ten focused minutes. Use warmup, focus piece, and fun finish. Over time, extend practice based on attention and goals.

</details><details><summary>Is a beginner keyboard for kids enough to start?</summary>Yes. A quality keyboard with full-size keys works well at first. Keep it accessible and on a stand. You can plan for an acoustic piano later.

</details><details><summary>Should we choose private lessons or group piano classes?</summary>Private lessons are ideal for true beginners, shy learners, or specific goals. Group settings add social motivation. Many families try a hybrid approach.

</details><details><summary>How do in-home piano lessons for kids work with schedules?</summary>A mobile piano teacher for kids arrives at your home at a set time each week. This helps protect the lesson from traffic or weather. Families often find this format easier to maintain long term.

</details><a href="#toc">Return to Table of Contents</a>

For details on getting started with youth piano lessons and a child-friendly plan that fits your calendar, visit <a href="https://volzpiano.com/" target="_self">Volz Piano</a> and ask about piano teachers that drive to you. Whether you live in Salt Lake City, Provo, Orem, Park City, Ogden, Lehi, Draper, St. George, or American Fork, an in-home start can make all the difference.`;

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
            Piano Training for Kids in Utah: In-Home Lessons, Fun Practice, and the Volz Piano Method
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            November 04, 2025
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/piano-training-for-kids-in-utah-in-home-lessons-fun-practice-and-the-volz-piano-method.jpg"
              alt="Featured image for Piano Training for Kids in Utah: In-Home Lessons, Fun Practice, and the Volz Piano Method"
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
