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

  const content = `<div>

Parents across Utah ask about the average cost of piano lessons for kids, and the most helpful answer begins with what your child actually needs. Factors like lesson length, experience of the teacher, materials, location, and whether you prefer in-home or online lessons all influence kids piano lesson cost. This guide explains typical price ranges in Utah, what drives children piano lesson prices up or down, how mobile piano lessons for kids cost compares with studio and online, and how to budget for books, recitals, and sibling discounts without guesswork.
<h2 id="toc">Table of Contents</h2>
<ul>
 	<li><a href="#utah-costs">Average Cost of Piano Lessons for Kids in Utah</a></li>
 	<li><a href="#drivers">What Actually Drives Child Piano Tuition Rates</a></li>
 	<li><a href="#lengths">Lesson Lengths for Children and How They Affect Price</a></li>
 	<li><a href="#formats">Private, Group, In-Home, and Online for Kids</a></li>
 	<li><a href="#packages">Packages, Sibling Discounts, and Monthly Tuition</a></li>
 	<li><a href="#materials">Books, Materials, Recitals, and Certification Fees</a></li>
 	<li><a href="#locations">City-by-City Kids Pricing Notes Across Utah</a></li>
 	<li><a href="#volz">How the Volz Piano Method Adds Value for Children</a></li>
 	<li><a href="#estimate">Build a Personalized Kids Lesson Estimate</a></li>
 	<li><a href="#choose">How to Choose the Right Plan for Your Child</a></li>
 	<li><a href="#faqs">FAQs</a></li>
</ul>
<h2 id="utah-costs">Average Cost of Piano Lessons for Kids in Utah</h2>
Parents usually start with the primary question: average cost of piano lessons. In Utah, youth piano lesson fees reflect the teacher’s training, lesson length, and whether lessons happen at home or online. Based on typical local pricing, piano lesson rates for children often fall into these broad brackets:
<ul>
 	<li>30 minutes: an entry point many families choose for beginner piano lessons for kids price budgeting, often the most affordable piano lesson fees for kids.</li>
 	<li>45 minutes: common once attention and repertoire grow, typically mid-tier in children piano lesson prices.</li>
 	<li>60 minutes: best for older or fast-advancing children, higher piano tuition for kids due to extended teacher time.</li>
</ul>
When parents compare in-home piano lessons for kids cost with studio or online, they should also consider travel and convenience. For example, <a title="Volz Piano" href="https://volzpiano.com/">Volz Piano</a> offers piano teachers for kids who drive to you across Utah, which helps families protect after-school schedules while keeping practice on the child’s own instrument.

Helpful context for pricing comes from broader wage data and travel standards. Federal mileage guidance informs fair travel surcharges that some home-visit teachers add. You can review the current business mileage rate on the <a href="https://www.irs.gov/tax-professionals/standard-mileage-rates" target="_blank" rel="noopener">IRS standard mileage rates page</a>, and the IRS’s formal notice for 2025 confirms the updated cents-per-mile figure in an <a href="https://www.irs.gov/pub/irs-drop/n-25-05.pdf" target="_blank" rel="noopener">official PDF notice</a>. For musician-related wages that influence pricing, the U.S. Department of Labor’s <a href="https://www.bls.gov/ooh/entertainment-and-sports/musicians-and-singers.htm" target="_blank" rel="noopener">Occupational Outlook Handbook entry for musicians and singers</a> and the Utah <a href="https://www.bls.gov/oes/2023/may/oes_ut.htm" target="_blank" rel="noopener">state wage tables</a> provide authoritative benchmarks families can consult.

Return to <a href="#toc">Table of Contents</a>
<h2 id="drivers">What Actually Drives Child Piano Tuition Rates</h2>
<h3>Teacher training and specialization</h3>
Kids piano lesson cost rises with advanced pedagogy, child-focused certifications, and long teaching experience. Piano instruction for children cost is often higher for teachers with proven outcomes in technique, reading, and performance readiness, as well as success guiding kids through recitals and optional exams.
<h3>Lesson length and pacing</h3>
Piano lesson pricing for kids scales with minutes per week. Shorter sessions manage attention for young beginners, while longer lessons add time for repertoire, technique, ear training, and creative activities. We detail the tradeoffs in the next section on lengths.
<h3>Format and convenience</h3>
Private piano lessons for kids cost more than group piano lessons for kids cost, but private time accelerates feedback. At home piano instruction for kids cost can include a travel surcharge, balanced by zero commuting for the family and higher practice comfort. Online piano lessons for kids cost may be lower, though parents should weigh engagement and home tech readiness.
<h3>Location</h3>
In Utah, prices vary by city and county. Utah County piano lessons for kids cost may differ from Davis County piano lessons for kids cost due to local demand and travel time. We list city notes later for Salt Lake City, Provo, Orem, Ogden, Sandy, Lehi, and Park City.
<h3>Curriculum and outcomes</h3>
Kids piano curriculum cost can include books, method sheets, or apps. Pricing may be higher when programs provide structured technique classes, theory, sight-reading, and frequent evaluations that raise long-term outcomes for young learners.

Return to <a href="#toc">Table of Contents</a>
<h2 id="lengths">Lesson Lengths for Children and How They Affect Price</h2>
<h3>What research and standards suggest</h3>
For children, lesson duration connects to developmental readiness. The <a href="https://nafme.org/resource/early-childhood-music-education/" target="_blank" rel="noopener">National Association for Music Education</a> discusses early childhood music engagement, which supports short, frequent, child-appropriate learning. Formal teaching programs also recognize common lesson windows. The <a href="https://www.abrsm.org/sites/default/files/2023-09/Teaching%20Diploma%20Syllabus%202022.pdf" target="_blank" rel="noopener">ABRSM Teaching Diploma syllabus</a> describes typical lessons in the 30 to 40-minute range, aligning with many kids’ attention spans.
<h3>30 minutes</h3>
For beginners ages 5 to 9, 30 minutes is a popular starting point. It keeps weekly cost manageable and supports progress with consistent practice. Average cost of 30 minute piano lessons for kids is usually the lowest per session and lets families add time later.
<h3>45 minutes</h3>
Many children thrive with 45 minutes once they are reading notes, juggling multiple pieces, and working on technique. Price per minute often improves at this tier, even though the session fee is higher than 30 minutes.
<h3>60 minutes</h3>
For motivated preteens or those preparing for recitals or assessments, an hour supports deeper technique and musicianship. Cost of 60 minute piano lessons for kids is higher, but some families choose fewer weekly activities to protect this focused block.
<h3>Practice time and value</h3>
Families can support progress by setting daily practice targets. Guidance from the Royal Conservatory emphasizes consistent practice habits in its <a href="https://rcmusic-kentico-cdn.s3.amazonaws.com/rcm/media/main/documents/examinations/tipsforparents.pdf" target="_blank" rel="noopener">Tips for Parents</a>, which reinforces that steady routines improve outcomes and help you get more value from the tuition you pay.

Return to <a href="#toc">Table of Contents</a>
<h2 id="formats">Private, Group, In-Home, and Online for Kids</h2>
<h3>Private lessons</h3>
Private piano tutor time increases feedback density and personalization. Kids private piano tutor cost in Utah reflects this one-to-one attention. Private formats tend to raise youth piano course fees but also shorten the path to confident reading and better tone.
<h3>Group lessons</h3>
Group piano lessons for kids cost less per child and can build social motivation. They work best when supported by short at-home practice routines. If your child needs more individualized pacing, you can combine group with periodic private check-ins.
<h3>In-home lessons with teachers who drive to you</h3>
Home visit piano teachers for children rates sometimes include a travel component. You can ask how the teacher calculates a piano lesson travel surcharge for kids Utah routes. Standards like the <a href="https://www.irs.gov/tax-professionals/standard-mileage-rates" target="_blank" rel="noopener">IRS business mileage rate</a> help set a fair approach. Families often choose mobile piano lessons for kids cost because convenience and comfort reduce friction and skipped practices. Parents who prefer this model can explore <a title="Piano teachers that drive to you in Utah" href="https://volzpiano.com/piano-tutor-that-comes-to-your-home-in-home-kids-piano-lessons-across-utah/">piano teachers that drive to you for kids</a> with Volz Piano.
<h3>Online lessons</h3>
Cost of online piano lessons for kids with live teacher can be lower, and scheduling is flexible. Check audio setup, camera angle, and a quiet space so attention stays high. Some families alternate online with in-home sessions for the best of both worlds.

Return to <a href="#toc">Table of Contents</a>
<h2 id="packages">Packages, Sibling Discounts, and Monthly Tuition</h2>
<h3>Monthly plans and per-lesson pricing</h3>
What is the average cost of piano lessons for kids per month depends on how many weeks you plan for and whether your studio bills monthly or by term. Many parents favor monthly piano lesson packages for kids pricing because it simplifies budgeting.
<h3>Trials, siblings, and flexible options</h3>
<ul>
 	<li>Cost of a trial piano lesson for kids helps you evaluate fit before committing.</li>
 	<li>Piano lesson cost for siblings kids discount is common when two children enroll.</li>
 	<li>Flexible piano lesson pricing for kids can include skip weeks, reschedules, or makeup credits. Ask about a kids piano lesson cancellation fee policy so there are no surprises.</li>
</ul>
<h3>Private vs group comparison for value</h3>
Cost comparison private vs group piano lessons for kids hinges on goals. If your child needs focused help with technique, private might pay off faster. If motivation and peer music time matter more, small group can be perfect.

Return to <a href="#toc">Table of Contents</a>
<h2 id="materials">Books, Materials, Recitals, and Certification Fees</h2>
<h3>Books and starter kits</h3>
Piano lesson books and materials fees for children vary by method. Kids beginner piano kit cost may include a lesson book, a theory book, and a notebook. Some programs also use a piano practice app for children for structured home work.
<h3>Recitals and assessments</h3>
Cost of kids piano recital participation can include venue, accompanist, or video. Families pursuing graded assessments should also plan for kids piano certification exam fees through external organizations.
<h3>Standards and academic alignment</h3>
Parents in Utah appreciate alignment with state arts expectations. You can review the Utah Fine Arts Core for music via the <a href="https://schools.utah.gov/curr/finearts.php" target="_blank" rel="noopener">Utah State Board of Education</a> and this <a href="https://www.schools.utah.gov/curr/finearts/_finearts_/_utahcorestandardstab_/Fine%20Arts%20-%202016CoreStandards.pdf" target="_blank" rel="noopener">PDF of Utah’s 2016 Fine Arts Core Standards</a>. Broader research on music’s developmental value is also available in peer-reviewed literature, such as the Taylor and Francis article on early childhood music learning and cognitive development found <a href="https://www.tandfonline.com/doi/full/10.1080/14613808.2021.1965564" target="_blank" rel="noopener">here</a>.

Return to <a href="#toc">Table of Contents</a>
<h2 id="locations">City-by-City Kids Pricing Notes Across Utah</h2>
Actual children piano lesson prices vary by local demand and drive time. Here are examples of how parents search and compare in key areas. Use these phrases when you evaluate options or ask a studio for quotes so you get city-specific clarity.
<ul>
 	<li><strong>Salt Lake City piano lessons for kids cost</strong>: ask about city center parking, teacher travel windows, and whether kids piano lesson cost near Salt Lake City differs for in-home compared with studio options.</li>
 	<li><strong>Provo piano lessons for kids cost</strong>: families often ask for cost to start kids piano lessons in Provo with trials and starter materials included.</li>
 	<li><strong>Orem piano lessons for kids cost</strong>: check youth piano course fees in Orem for 30 versus 45 minutes to see where your child’s attention sits best.</li>
 	<li><strong>Ogden piano lessons for kids cost</strong>: children’s piano class rates in Ogden may reflect drive times among neighborhoods and teacher availability after school.</li>
 	<li><strong>Sandy piano lessons for kids cost</strong>: some studios publish whether piano lessons for kids with sibling discount pricing in Sandy apply at in-home addresses.</li>
 	<li><strong>Lehi piano lessons for kids cost</strong>: child-friendly piano teacher rates Lehi families pay can reflect rapid growth and commuting time along major corridors. If you prefer at-home lessons in Lehi, explore <a title="At-Home Piano Lessons in Lehi" href="https://volzpiano.com/lehi-ut-piano-lessons/">this Lehi page</a>.</li>
 	<li><strong>Park City piano lessons for kids cost</strong>: rates may trend higher due to distance and scheduling windows during winter.</li>
 	<li><strong>Davis County piano lessons for kids cost</strong> and <strong>Utah County piano lessons for kids cost</strong>: ask studios how far teachers travel and whether travel is baked into tuition or listed separately as a piano lesson travel surcharge for kids Utah families can review.</li>
</ul>
Parents near West Jordan can see a local example of offerings on <a title="At-Home Piano Lessons in West Jordan" href="https://volzpiano.com/piano-lessons-west-jordan-ut/">the West Jordan page</a> and then request a price quote.

Return to <a href="#toc">Table of Contents</a>
<h2 id="volz">How the Volz Piano Method Adds Value for Children</h2>
<h3>In-home convenience that protects practice time</h3>
Volz Piano offers Piano Teachers that Drive to You so kids learn at home, which reduces stress and helps practice stick. You can read how this model works for families on the <a title="Piano teachers that drive to your home across Utah" href="https://volzpiano.com/piano-tutor-that-comes-to-your-home-in-home-kids-piano-lessons-across-utah/">in-home teachers page</a>.
<h3>Method depth and brain-aligned teaching</h3>
The complete Volz Piano method for kids adapts to how each child learns. That means personalized sequencing, strategic song choices, and technique habits that keep small hands safe and relaxed. A method that helps children learn faster can offset higher per-lesson tuition by accelerating results.
<h3>Child readiness and the broader benefits of music</h3>
Families often choose a program because of music’s proven cognitive and social benefits for kids. For context beyond any studio, see NAfME’s resources on early music learning via <a href="https://nafme.org/resource/early-childhood-music-education/" target="_blank" rel="noopener">this article</a>. Utah parents can also look at statewide arts expectations to see how lessons support school goals via the <a href="https://schools.utah.gov/curr/finearts.php" target="_blank" rel="noopener">USBE Fine Arts page</a>.

To learn more about how Volz structures kid-friendly lessons, review their method overview on the <a title="Volz Method Kids Piano Lessons" href="https://volzpiano.com/">homepage</a> and this blog about approaches for young learners <a title="Exploring the Volz Piano Method for Kids" href="https://volzpiano.com/the-ultimate-guide-to-piano-teaching-methods-for-kids-exploring-the-volz-piano-method/">here</a>.

Return to <a href="#toc">Table of Contents</a>
<h2 id="estimate">Build a Personalized Kids Lesson Estimate</h2>
<h3>Step 1. Pick lesson length</h3>
<ul>
 	<li>Beginner under age 9: start with 30 minutes and reassess after eight weeks.</li>
 	<li>Elementary reader or motivated child: consider 45 minutes for balanced technique and repertoire time.</li>
 	<li>Exam or recital preparation: 60 minutes to cover technique, pieces, and musicianship without rushing.</li>
</ul>
<h3>Step 2. Choose delivery format</h3>
<ul>
 	<li>Private at home for focused feedback and comfort.</li>
 	<li>Online for flexibility and value, especially during busy seasons.</li>
 	<li>Group or hybrid to add peer motivation at a lower per-child rate.</li>
</ul>
<h3>Step 3. Add extras</h3>
<ul>
 	<li>Books and materials once per term.</li>
 	<li>Recital fees if you plan to participate.</li>
 	<li>Travel component for mobile lessons. Use the <a href="https://www.irs.gov/tax-professionals/standard-mileage-rates" target="_blank" rel="noopener">IRS mileage standard</a> as a reference for fair surcharges.</li>
</ul>
<h3>Step 4. Ask about savings</h3>
<ul>
 	<li>Siblings on the same day for reduced rates.</li>
 	<li>Multi-month prepayment discounts when offered.</li>
 	<li>Pay per lesson price options if your schedule shifts seasonally.</li>
</ul>
When you contact a studio, try a clear, cost-focused phrasing to get the details you need: piano lesson cost for kids with travel fee included, monthly piano lesson packages for kids pricing, or piano lesson rates for children with certified teacher.

Return to <a href="#toc">Table of Contents</a>
<h2 id="choose">How to Choose the Right Plan for Your Child</h2>
<h3>Match format to personality</h3>
Shy children often open up faster at home. Energetic kids may enjoy short online bursts or small groups. If you want a mobile option, read how Volz handles scheduling and home setup on the <a title="Mobile piano lessons across Utah for kids" href="https://volzpiano.com/piano-tutor-that-comes-to-your-home-in-home-kids-piano-lessons-across-utah/">mobile lessons page</a>.
<h3>Confirm teacher expertise for young learners</h3>
Piano pedagogy for children pricing may be higher for specialists who understand small-hand technique, game-based rhythm, and early literacy. Ask how your studio approaches evaluation so you understand the piano evaluation for children cost and schedule.
<h3>Check policy and value fit</h3>
Request documents that explain kids piano program fees in Utah including materials, cancellations, and makeups. Families who need flexibility should verify a kids piano lesson cancellation fee policy and whether missed lessons can be rescheduled.
<h3>Try, then commit</h3>
Use a trial lesson to decide between private, group, and online. If your family thrives with at-home stability, consider Volz’s kids-first, in-home model. You can start a conversation from the <a title="Volz Piano Home" href="https://volzpiano.com/">Volz Piano homepage</a> or by exploring city pages such as <a title="Lehi At-Home Piano Lessons" href="https://volzpiano.com/lehi-ut-piano-lessons/">Lehi</a> or <a title="West Jordan At-Home Piano Lessons" href="https://volzpiano.com/piano-lessons-west-jordan-ut/">West Jordan</a>.

Return to <a href="#toc">Table of Contents</a>
<h2 id="faqs">FAQs</h2>
<details><summary>What is the average cost of piano lessons for kids per month in Utah?</summary>Monthly totals depend on session length and how many weeks are billed. Families often start with 30 minutes weekly because kids music lesson pricing for piano stays friendly while progress remains strong. If you prefer in-home sessions, ask for a line that shows mobile piano lessons for kids cost with any travel included so your quote is clear.

</details><details><summary>Are in-home lessons more expensive for children?</summary>At home piano instruction for kids cost may include a reasonable travel component, but parents often save time and protect energy for practice. If a teacher uses a mileage approach, the <a href="https://www.irs.gov/tax-professionals/standard-mileage-rates" target="_blank" rel="noopener">IRS business mileage rate</a> helps you understand the number behind the travel line.

</details><details><summary>Should my child take 30, 45, or 60 minutes?</summary>Begin with 30 minutes for new readers, then move to 45 minutes when pieces multiply. Formal guidance recognizing common 30 to 40-minute lessons appears in the <a href="https://www.abrsm.org/sites/default/files/2023-09/Teaching%20Diploma%20Syllabus%202022.pdf" target="_blank" rel="noopener">ABRSM Teaching Diploma syllabus</a>. Teachers adjust by age, attention, and goals.

</details><details><summary>What extra costs should we expect beyond tuition?</summary>Expect piano lesson books and materials fees for children each term, possible recital participation, and optional exams. Some families add a piano practice app for children or backing tracks, which are usually modest add-ons.

</details><details><summary>How do Volz Piano teachers support beginners?</summary>Volz Piano specializes in the complete Volz Piano method for kids, taught by teachers who drive to you. You can explore the approach on the <a title="Volz Piano" href="https://volzpiano.com/">homepage</a> and learn about at-home scheduling on the <a title="Piano teachers that drive to your home" href="https://volzpiano.com/piano-tutor-that-comes-to-your-home-in-home-kids-piano-lessons-across-utah/">mobile teachers page</a>. Parents often report fewer canceled lessons because travel is removed from the weekly routine.

</details>Return to <a href="#toc">Table of Contents</a>

</div>
<strong>Internal links you might find useful:</strong> Continue exploring <a title="Volz Piano" href="https://volzpiano.com/">Volz Piano</a>, learn more about <a title="Volz Method for Kids" href="https://volzpiano.com/the-ultimate-guide-to-piano-teaching-methods-for-kids-exploring-the-volz-piano-method/">the Volz Piano method for kids</a>, or check local options in <a title="Piano Lessons in Lehi" href="https://volzpiano.com/lehi-ut-piano-lessons/">Lehi</a> and <a title="Piano Lessons in West Jordan" href="https://volzpiano.com/piano-lessons-west-jordan-ut/">West Jordan</a>.

<strong>External resources for parents:</strong> Read about early music learning at <a href="https://nafme.org/resource/early-childhood-music-education/" target="_blank" rel="noopener">NAfME</a>, review Utah’s arts expectations on the <a href="https://schools.utah.gov/curr/finearts.php" target="_blank" rel="noopener">Utah State Board of Education site</a>, consult wage context via <a href="https://www.bls.gov/ooh/entertainment-and-sports/musicians-and-singers.htm" target="_blank" rel="noopener">the Bureau of Labor Statistics</a>, and confirm travel cost benchmarks with the <a href="https://www.irs.gov/tax-professionals/standard-mileage-rates" target="_blank" rel="noopener">IRS mileage standard</a>.`;

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
            Average Cost of Piano Lessons for Kids in Utah: A Parent’s Guide to Smart Pricing, Lesson Lengths, and In-Home Options
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            November 03, 2025
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/average-cost-of-piano-lessons-for-kids-in-utah-a-parents-guide-to-smart-pricing-lesson-lengths-and-in-home-options.jpg"
              alt="Featured image for Average Cost of Piano Lessons for Kids in Utah: A Parent’s Guide to Smart Pricing, Lesson Lengths, and In-Home Options"
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
