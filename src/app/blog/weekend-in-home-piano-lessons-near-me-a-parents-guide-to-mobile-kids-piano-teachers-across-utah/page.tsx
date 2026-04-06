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

  const content = `Families in Utah want music lessons that fit real schedules and work for real kids. This guide explains how <a title="Volz Piano Home" href="https://volzpiano.com/">Volz Piano</a> delivers weekend in-home piano lessons for children through a complete method designed just for kids, with piano teachers that drive to you across Salt Lake City, Utah County, Davis County, Weber County, and nearby areas. You will learn how the Volz Piano Method works, how weekend scheduling is set up for Saturdays and Sundays, what children learn week to week, how to support home practice, and how to enroll. We also include service-area details for Lehi, Orem, Provo, Sandy, South Jordan, Park City, Ogden, Bountiful, and more, plus FAQs.
<div id="toc">
<h2>Table of Contents</h2>
<ul>
 	<li><a href="#why-weekend-in-home-piano-lessons-work">Why Weekend In-Home Piano Lessons Work For Kids</a></li>
 	<li><a href="#how-volz-mobile-teachers-work">How Volz Piano’s “Piano Teachers That Drive to You” Works</a></li>
 	<li><a href="#volz-method-kids">Inside the Complete Volz Piano Method for Kids</a></li>
 	<li><a href="#weekend-scheduling">Weekend Scheduling: Saturdays, Sundays, Trial Lessons, and Siblings</a></li>
 	<li><a href="#service-areas">Service Areas Across Utah</a>
<ul>
 	<li><a href="#salt-lake-city">Salt Lake City</a></li>
 	<li><a href="#utah-county">Utah County: Provo, Orem, Lehi, American Fork</a></li>
 	<li><a href="#south-jordan-sandy">South Jordan and Sandy</a></li>
 	<li><a href="#park-city-ogden-bountiful">Park City, Ogden, and Bountiful</a></li>
 	<li><a href="#davis-county">Davis County</a></li>
</ul>
</li>
 	<li><a href="#what-kids-learn">What Kids Learn Week To Week</a></li>
 	<li><a href="#support-practice">How Parents Can Support Practice At Home</a></li>
 	<li><a href="#choosing-teacher">Choosing a Kid-Friendly Teacher and Keeping Ears Safe</a></li>
 	<li><a href="#pricing-enroll">Pricing, Next Steps, and How To Enroll</a></li>
 	<li><a href="#faqs">FAQs</a></li>
</ul>
</div>

<hr />

<h2 id="why-weekend-in-home-piano-lessons-work">Why Weekend In-Home Piano Lessons Work For Kids</h2>
For many families, the search starts with the exact phrase parents type into Google: <strong>weekend in-home piano lessons near me</strong>. Weekend piano lessons for kids reduce stress on school nights and make it easier for children to focus when they are not rushing between homework and activities. At home, shy students often play more confidently, and parents can observe progress without driving to a studio. These benefits line up with what research says about children’s learning in music. For instance, studies note that music training can strengthen attention, working memory, and cognitive flexibility. You can read more from peer-reviewed overviews of childhood music study from respected sources like the National Institutes of Health’s open library and similar reviews, which discuss how structured lessons help kids practice focus, memory, and step-by-step mastery (<a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3957486/" target="_blank" rel="noopener">NIH/PMC</a>, <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7683441/" target="_blank" rel="noopener">NIH/PMC review</a>, <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11775157/" target="_blank" rel="noopener">NIH/PMC on executive functions</a>).

Because the teacher comes to you, children benefit from a familiar piano or keyboard and a calm environment. This is why parents often choose <strong>in-home piano lessons for kids</strong>, <strong>piano tutor who comes to your home for kids</strong>, and <strong>mobile piano lessons for children</strong> instead of driving to a weekly studio slot.

Return to <a href="#toc">Table of Contents</a>
<h2 id="how-volz-mobile-teachers-work">How Volz Piano’s “Piano Teachers That Drive to You” Works</h2>
Volz Piano specializes in <a title="Volz Piano Pricing" href="https://volzpiano.com/pricing/">convenient on-site lessons with dedicated instructors</a> trained in the Volz Piano Method. Put simply, these are <strong>piano teachers that drive to you for kids</strong>. After a quick call, the team pairs your child with a <strong>kids piano teacher who travels</strong> in your area and sets up an at-home time on a weekend that works for the family. Parents can learn more about the approach on the official <a title="The Complete Volz Piano Method for Kids" href="https://volzpiano.com/volz-method-best-piano-teaching-medthod/">Volz Piano Method page</a> and can request start dates via the <a title="Contact Volz Piano" href="https://volzpiano.com/contact-us/">Contact Us page</a>.

Because Volz serves many neighborhoods, you can request <strong>in home piano lessons for kids near me</strong>, <strong>kids piano lessons near me at home</strong>, or a <strong>children’s piano teacher near me at home</strong> and expect a response that fits your address. This flexible model is why parents search for <strong>weekend piano classes for kids in Utah</strong>.

Return to <a href="#toc">Table of Contents</a>
<h2 id="volz-method-kids">Inside the Complete Volz Piano Method for Kids</h2>
The Volz Piano Method is built specifically for children. Lessons braid rhythm, technique, reading, ear training, improvisation, and creative composition in the right order for young learners. You can preview the philosophy and structure on the official <a title="Volz Method Overview" href="https://volzpiano.com/volz-method-best-piano-teaching-medthod/">Volz Method overview</a>. For parents who value evidence, you can also read how structured music learning supports child development from organizations like the <a href="https://www.aap.org/en/patient-care/media-and-children/center-of-excellence-on-social-media-and-youth-mental-health/qa-portal/qa-portal-library/qa-portal-library-questions/infants-and-music-media/" target="_blank" rel="noopener">American Academy of Pediatrics</a>.

Because the method adapts to how kids learn, families often ask for <strong>private in-home piano lessons for kids</strong> and <strong>home piano instruction for children</strong>. The curriculum includes <strong>children’s piano method lessons</strong> and a <strong>kids beginner piano curriculum at home</strong> so beginners thrive without pressure.

Return to <a href="#toc">Table of Contents</a>
<h2 id="weekend-scheduling">Weekend Scheduling: Saturdays, Sundays, Trial Lessons, and Siblings</h2>
Volz Piano offers weekend options that meet real family needs:
<ul>
 	<li><strong>Saturday piano lessons for kids</strong> and <strong>beginner-friendly in-home piano lessons for kids on Saturdays</strong> so school weeks stay open.</li>
 	<li><strong>Sunday piano lessons for kids</strong> and <strong>Sunday in-home piano lessons for children near me</strong> for parents who work Saturdays.</li>
 	<li>Short formats like a <strong>30-minute Saturday in-home piano lesson for children</strong> or a <strong>45-minute Sunday at-home piano lesson for kids</strong> to fit attention spans.</li>
 	<li>New to the program? Ask for a <strong>trial weekend in-home piano lesson for kids near me</strong> to see the fit before you commit.</li>
 	<li>Have two or more young pianists at home? Volz can discuss a <strong>sibling discount weekend in-home piano lessons for kids</strong> when calendars line up.</li>
</ul>
These schedules work well for <strong>weekend piano lessons for elementary school kids at home</strong> and for families looking for <strong>parent-friendly weekend scheduling for kids’ in-home piano lessons</strong>. If your child needs extra reassurance, <strong>piano lessons for shy kids at home on weekends</strong> keep the setting calm and familiar. If you are planning recitals, ask about <strong>recital prep weekend in-home piano lessons for kids in Utah</strong>.

Return to <a href="#toc">Table of Contents</a>
<h2 id="service-areas">Service Areas Across Utah</h2>
Volz Piano provides <strong>weekend in-home piano lessons for kids with traveling teacher near me</strong> across many Utah communities. Below are common weekend requests for children, with links to local pages where available.
<h3 id="salt-lake-city">Salt Lake City</h3>
Families search for <strong>weekend piano lessons for kids Salt Lake City</strong>, <strong>Utah kids piano lessons at home</strong>, and a <strong>Salt Lake City children’s piano teacher at home</strong>. Learn how the method blends reading, ear training, and fun games on the SLC-focused overview for youth lessons (<a title="Salt Lake City Piano Lessons for Kids" href="https://volzpiano.com/salt-lake-piano-lessons-expert-private-group-lessons-for-all-ages/">Salt Lake City page</a>).

Return to <a href="#toc">Table of Contents</a>
<h3 id="utah-county">Utah County: Provo, Orem, Lehi, American Fork</h3>
In Utah County, parents ask for <strong>home piano lessons for children Utah County</strong>, <strong>flexible weekend piano lessons at home for kids in Utah County</strong>, and <strong>piano teachers that drive to you for kids in Salt Lake City</strong> when they live near the county line. For Provo, we often schedule <strong>at-home piano classes for children on weekends in Provo</strong>. Orem families request <strong>one-on-one weekend piano lessons for kids in Orem homes</strong> and <strong>Orem children’s piano classes in-home</strong>. Lehi families look for a <strong>Lehi kids piano instructor who drives</strong>. American Fork parents want convenient scheduling, too.
<ul>
 	<li><a title="Orem At-Home Piano Lessons" href="https://volzpiano.com/orem-ut-piano-lessons/">Orem</a></li>
 	<li><a title="Lehi At-Home Piano Lessons" href="https://volzpiano.com/lehi-ut-piano-lessons/">Lehi</a></li>
 	<li><a title="American Fork At-Home Piano Lessons" href="https://volzpiano.com/american-fork-ut-piano-lessons/">American Fork</a></li>
</ul>
Return to <a href="#toc">Table of Contents</a>
<h3 id="south-jordan-sandy">South Jordan and Sandy</h3>
Weekend families in these cities search for <strong>South Jordan kids piano lessons at home</strong>, <strong>South Jordan Sunday at-home piano lessons for kids</strong>, and <strong>weekend piano lessons for kids Sandy</strong>. See more about the city program here: <a title="Sandy UT Piano Lessons" href="https://volzpiano.com/discover-the-best-sandy-ut-piano-lessons-with-volz-piano/">Sandy lessons</a>.

Return to <a href="#toc">Table of Contents</a>
<h3 id="park-city-ogden-bountiful">Park City, Ogden, and Bountiful</h3>
Families near the Wasatch Back ask for <strong>Park City weekend piano lessons for kids</strong>, <strong>Park City Saturday in-home piano lessons for children</strong>, and <strong>Park City kids piano home lessons</strong>. In Weber County, parents often want <strong>Ogden in-home piano lessons for children</strong> and <strong>Ogden children’s in-home piano lessons</strong>. In Davis County’s southern edge, many choose <strong>Bountiful kids in-home piano lessons</strong>.

Return to <a href="#toc">Table of Contents</a>
<h3 id="davis-county">Davis County</h3>
North of Salt Lake, families ask for a <strong>Davis County weekend piano teacher who drives to your home for children</strong> and <strong>children’s piano lessons at home Davis County</strong>. These requests fit the broader category of <strong>one-on-one piano lessons for children at home</strong> with a <strong>private kid-friendly piano teacher at home</strong>. If you live near county borders, simply ask for a <strong>door-to-door piano teacher for kids</strong> or a <strong>home visit piano tutor for children</strong> and Volz will match the closest instructor.

Return to <a href="#toc">Table of Contents</a>
<h2 id="what-kids-learn">What Kids Learn Week To Week</h2>
Whether your child is a beginner or continuing student, the first lessons build listening, rhythm, healthy technique, and simple songs that feel like wins. As confidence grows, teachers add reading, patterns, chords, and improvisation to keep curiosity high. This is why many families choose <strong>beginner piano for kids at home</strong> and <strong>kids music education at home piano</strong> over group lessons that move too fast or too slow.

For students who need extra supports, Volz can deliver <strong>special needs friendly weekend in-home piano lessons for children</strong>. Metronome-based rhythm drills, movement games, and call-and-response songs are common tools. If you are curious about why timing practice helps kids attend and coordinate, you can read accessible research summaries showing how rhythm work can support attention and motor planning (<a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5890222/" target="_blank" rel="noopener">NIH/PMC study overview</a>).

Return to <a href="#toc">Table of Contents</a>
<h2 id="support-practice">How Parents Can Support Practice At Home</h2>
Consistency matters more than marathon sessions. Five short sessions each week can spark faster growth than one long cram. To make weekend practice fun, parents can rotate games, ask kids to “teach back” a tiny skill, or play a backing track softly while a child keeps steady quarter notes. For general guidance on when children are ready to begin, family-friendly outlets offer practical tips for starting instruments, routines, and age-appropriate expectations (<a href="https://www.parents.com/kids/development/when-can-a-child-start-playing-a-musical-instrument/" target="_blank" rel="noopener">Parents.com overview</a>).

If your home gets loud, protect young ears. Public health resources recommend turning down volume, taking listening breaks, and using hearing protection in noisy environments like games, concerts, or fireworks. See child-specific advice from the <a href="https://www.cdc.gov/hearing-loss-children/about/preventing-noise-induced-hearing-loss.html" target="_blank" rel="noopener">CDC</a> and hearing safety tips from pediatric organizations like the <a href="https://www.aap.org/en/patient-care/environmental-health/promoting-healthy-environments-for-children/noise/" target="_blank" rel="noopener">American Academy of Pediatrics</a>.

Return to <a href="#toc">Table of Contents</a>
<h2 id="choosing-teacher">Choosing a Kid-Friendly Teacher and Keeping Ears Safe</h2>
Parents want a <strong>licensed children’s piano teacher who travels to you on weekends</strong> and knows how to adapt instruction. Volz teachers train in a child-specific method and coordinate with families to set realistic goals. If your child is anxious, simply request a <strong>private weekend piano tutor who comes to our home for kids</strong> so the first session feels relaxed. If you want the framework Utah schools use to describe arts learning outcomes, you can review how the state structures music standards into Create, Perform, Respond, and Connect strands (<a href="https://schools.utah.gov/curr/finearts.php" target="_blank" rel="noopener">Utah State Board of Education</a> overview). The big idea is simple: children learn best when creativity and skills grow together.

Return to <a href="#toc">Table of Contents</a>
<h2 id="pricing-enroll">Pricing, Next Steps, and How To Enroll</h2>
Curious about tuition or discounts for multiple children? Visit the <a title="Volz Piano Pricing" href="https://volzpiano.com/pricing/">pricing page</a>. Ready to schedule? Use the <a title="Contact Volz Piano" href="https://volzpiano.com/contact-us/">Contact Us form</a> to request <strong>weekend in-home piano lessons near me</strong> for your address. You can also browse the <a title="Volz Piano Blog" href="https://volzpiano.com/blog/">Volz Piano Blog</a> for parent guides such as finding <a title="Find the Best Piano Teachers in Utah" href="https://volzpiano.com/find-the-best-piano-teachers-in-utah-at-volz-piano/">the best piano teachers in Utah</a> and local pages for <a title="Draper At-Home Piano Lessons" href="https://volzpiano.com/draper-ut-piano-lessons/">Draper</a>, <a title="Millcreek At-Home Piano Lessons" href="https://volzpiano.com/piano-lessons-millcreek-ut/">Millcreek</a>, and more. If your child wants a specific song style, tell your teacher so the curriculum includes pieces they love.

Return to <a href="#toc">Table of Contents</a>
<h2 id="faqs">FAQs</h2>
<details><summary>Do you offer weekend piano lessons for kids at home?</summary>Yes. We schedule <strong>weekend piano lessons for kids</strong> across Utah with <strong>piano teachers that drive to you for kids</strong>. Ask for Saturday or Sunday times, including <strong>affordable weekend piano lessons at home for children near me</strong> if you need a budget-friendly start. Learn more on our <a title="Volz Piano Pricing" href="https://volzpiano.com/pricing/">pricing page</a>.

</details><details><summary>Can my child start with a short lesson on weekends?</summary>Absolutely. Many beginners start with a <strong>30-minute Saturday in-home piano lesson for children</strong>. If Sunday works better, we also offer a <strong>45-minute Sunday at-home piano lesson for kids</strong>. You can also ask for a <strong>trial weekend in-home piano lesson for kids near me</strong> before committing.

</details><details><summary>What if my child is very shy or needs extra support?</summary>We routinely adapt for comfort and focus at home. Ask about <strong>piano lessons for shy kids at home on weekends</strong> or <strong>special needs friendly weekend in-home piano lessons for children</strong>. The at-home setting helps many kids participate more easily, and the Volz method gives teachers flexible ways to teach the same concept.

</details><details><summary>Do you cover my city or county?</summary>Volz serves Salt Lake City, Utah County, Davis County, Weber County, and nearby areas. Common requests include <strong>weekend in-home piano lessons for kids Provo</strong>, <strong>weekend in-home piano lessons for kids Orem</strong>, <strong>weekend piano lessons for kids Lehi</strong>, <strong>South Jordan kids piano lessons at home</strong>, <strong>Park City weekend piano lessons for kids</strong>, <strong>Ogden in-home piano lessons for children</strong>, and <strong>Bountiful kids in-home piano lessons</strong>. If you do not see your neighborhood listed, send your address and we will check availability.

</details><details><summary>How is the Volz Piano Method different for kids?</summary>The method is designed for children from the start. We combine reading, ear training, movement, and creative play so each child practices musical thinking, not just note names. See the <a title="Volz Method for Kids" href="https://volzpiano.com/volz-method-best-piano-teaching-medthod/">Volz Method overview</a> for details. This is why families ask for <strong>children’s mobile music lessons at home</strong>, <strong>at-home music classes for kids (piano)</strong>, and a <strong>traveling piano instructor for kids</strong> who brings the method to your living room.

</details>Return to <a href="#toc">Table of Contents</a>

Many parents also ask for a <strong>mobile piano teacher for children offering Saturday lessons</strong> or a <strong>licensed children’s piano teacher who travels to you on weekends</strong>. If you want a more private pace, choose <strong>private in-home piano lessons for kids</strong> with <strong>one-on-one weekend piano lessons for kids in Orem homes</strong> or in your neighborhood. Families who prefer at-home lessons often search for <strong>onsite piano lessons for children</strong>, a <strong>piano tutor house calls for kids</strong>, or a <strong>home visit piano tutor for children</strong>. If this sounds like what you want, reach out through the <a title="Contact Volz Piano" href="https://volzpiano.com/contact-us/">Contact Us page</a>.

Return to <a href="#toc">Table of Contents</a>

Helpful links for parents:
<ul>
 	<li><a title="Volz Piano Home" href="https://volzpiano.com/">Volz Piano Home</a></li>
 	<li><a title="The Volz Piano Method" href="https://volzpiano.com/volz-method-best-piano-teaching-medthod/">The Volz Piano Method</a></li>
 	<li><a title="Pricing" href="https://volzpiano.com/pricing/">Pricing</a></li>
 	<li><a title="Contact Volz Piano" href="https://volzpiano.com/contact-us/">Contact Us</a></li>
 	<li><a title="Volz Blog" href="https://volzpiano.com/blog/">Blog</a></li>
 	<li><a title="Lehi At-Home Piano Lessons" href="https://volzpiano.com/lehi-ut-piano-lessons/">Lehi</a>, <a title="Orem At-Home Piano Lessons" href="https://volzpiano.com/orem-ut-piano-lessons/">Orem</a>, <a title="American Fork At-Home Piano Lessons" href="https://volzpiano.com/american-fork-ut-piano-lessons/">American Fork</a>, <a title="Sandy UT Piano Lessons" href="https://volzpiano.com/discover-the-best-sandy-ut-piano-lessons-with-volz-piano/">Sandy</a>, <a title="Salt Lake City Kids Piano" href="https://volzpiano.com/salt-lake-piano-lessons-expert-private-group-lessons-for-all-ages/">Salt Lake City</a></li>
</ul>
Return to <a href="#toc">Table of Contents</a>`;

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
            Piano Lesson At Home
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
            Weekend In-Home Piano Lessons Near Me: A Parent’s Guide to Mobile Kids’ Piano Teachers Across Utah
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            October 14, 2025
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/weekend-in-home-piano-lessons-near-me-a-parents-guide-to-mobile-kids-piano-teachers-across-utah.jpg"
              alt="Featured image for Weekend In-Home Piano Lessons Near Me: A Parent’s Guide to Mobile Kids’ Piano Teachers Across Utah"
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
