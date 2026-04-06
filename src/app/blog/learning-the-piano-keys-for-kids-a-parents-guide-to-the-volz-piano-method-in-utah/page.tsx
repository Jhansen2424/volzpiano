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

  const content = `Helping a child start <strong>learning the piano keys</strong> is one of the fastest ways to build confidence at the keyboard, unlock the music alphabet, and make early lessons feel fun. This guide explains how children learn key names, black-and-white key groups, and Middle C in ways that stick, and how the <a href="https://volzpiano.com/">Volz Piano</a> approach and our <a href="https://volzpiano.com/piano-tutor-that-comes-to-your-home-in-home-kids-piano-lessons-across-utah/">Piano Teachers that Drive to You</a> model help families across Utah with structured, play-based practice at home.
<h2 id="toc">Table of Contents</h2>
<ul>
 	<li><a href="#why-keys">Why Learning the Piano Keys First Helps Kids Thrive</a></li>
 	<li><a href="#keyboard-map">Keyboard Geography: White Keys, Black Keys, and Middle C</a>
<ul>
 	<li><a href="#white-keys">White Key Letter Names for Children</a></li>
 	<li><a href="#black-keys">Two-Black and Three-Black Key Patterns for Kids</a></li>
 	<li><a href="#middle-c">Finding Middle C for Kids</a></li>
 	<li><a href="#octaves">Octave Patterns for Kids</a></li>
</ul>
</li>
 	<li><a href="#volz-method">How the Volz Piano Method Teaches Keyboard Basics</a>
<ul>
 	<li><a href="#strengths">Teaching to a Child’s Strengths</a></li>
 	<li><a href="#reading-ear">Reading, Ear Training, and Creative Play</a></li>
 	<li><a href="#parent-partner">Parent Partner Tips at Home</a></li>
</ul>
</li>
 	<li><a href="#step-plan">A Step-by-Step Plan for Learning the Piano Keys</a>
<ul>
 	<li><a href="#week1">Week 1: Landmarks and the Music Alphabet</a></li>
 	<li><a href="#week2">Week 2: White Key Names and Simple Patterns</a></li>
 	<li><a href="#week3">Week 3: Black Key Groups, Sharps and Flats</a></li>
 	<li><a href="#week4">Week 4: Middle C, Hand Position, and First Songs</a></li>
</ul>
</li>
 	<li><a href="#games">Kid-Friendly Games and Activities for Piano Key Memorization</a></li>
 	<li><a href="#practice">Practice Routine Ideas That Stick</a></li>
 	<li><a href="#utah">Utah Families: In-Home Teachers Who Drive to You</a>
<ul>
 	<li><a href="#service-areas">Service Areas and Example Cities</a></li>
 	<li><a href="#setup-home">Setting Up Your Home Piano Corner</a></li>
 	<li><a href="#pricing">Pricing, Siblings, and Month-to-Month Options</a></li>
</ul>
</li>
 	<li><a href="#resources">Helpful Child-Safe Resources About Piano Keys</a></li>
 	<li><a href="#faq">FAQs</a></li>
</ul>
<h2 id="why-keys">Why Learning the Piano Keys First Helps Kids Thrive</h2>
Children learn best when early lessons are concrete, visual, and active. When a child starts by <strong>learning the piano keys</strong>, they can immediately connect sound to a physical key, which makes everything else easier. Kids quickly grasp <strong>piano key names for kids</strong>, understand <strong>piano keyboard layout for kids</strong>, and develop confidence using simple songs built from white keys around <strong>Middle C for kids</strong>. With a strong foundation in <strong>piano key identification for kids</strong>, reading music and rhythm becomes far less intimidating, and young beginners move from curiosity to real music faster.

Families choose Volz Piano because our teachers meet kids where they are and make core ideas like <strong>keyboard keys for kids</strong>, <strong>piano key patterns for children</strong>, and <strong>piano keys basics for kids</strong> feel like play. Our teachers use games, movement, and storytelling so <strong>piano keys practice for kids</strong> never feels like a chore. If you want a teacher who can come to you and blend fun with real progress, explore the <a href="https://volzpiano.com/">Volz Piano homepage</a> and the <a href="https://volzpiano.com/volz-method-best-piano-teaching-medthod/">Complete Volz Piano Method overview</a> to see how lessons fit your child.

<a href="#toc">Return to Table of Contents</a>
<h2 id="keyboard-map">Keyboard Geography: White Keys, Black Keys, and Middle C</h2>
Keyboard geography is the map every child follows. We start with the visible landmarks: white keys labeled with letter names, repeating <strong>C D E F G A B</strong>, and black keys organized in easy-to-spot groups of two and three. Children love discovering patterns such as the two-black and three-black groups, which become the “streets and avenues” of their map. This section gives your child a friendly tour so they can say the <strong>music alphabet for kids on piano keys</strong>, find <strong>Middle C for kids</strong>, and feel at home moving in either direction across the keyboard.

<a href="#toc">Return to Table of Contents</a>
<h3 id="white-keys">White Key Letter Names for Children</h3>
Kids learn the music alphabet using white keys. Teachers introduce the letters as a cycle: <strong>C, D, E, F, G, A, B</strong>, then back to C. Simple games turn this into a treasure hunt. Children point to C, then say the alphabet forward or backward, and play each key as they speak. This playful drill builds fast recognition for <strong>piano keyboard notes for kids</strong> and helps with <strong>piano key memorization for kids</strong>. We often add <strong>piano key flashcards for kids</strong> and a <strong>piano key chart for children</strong> on the wall so the pattern becomes second nature.

Families can reinforce this at home with a short daily activity. Ask your child to find three Cs, then three Ds, then play the sequence C D E F G A B and circle back to C aloud. This reinforces the <strong>CDEFGAB sequence for children</strong> and supports smooth reading later.

<a href="#toc">Return to Table of Contents</a>
<h3 id="black-keys">Two-Black and Three-Black Key Patterns for Kids</h3>
Children spot black key groups right away. We name the pairs of two-black keys as “gates” and the three-black keys as “bridges,” then play simple locating games. These patterns anchor activities like “find all the two-black groups with your right hand” or “tap the three-black groups with your left hand.” Once the patterns are solid, we add the idea of sharps and flats so kids understand <strong>black key sharps and flats for kids</strong> without stress. Teachers may say “this black key is a step up from F, so we call it F sharp,” keeping the language friendly while building real theory.

As kids play, they learn <strong>groups of two and three black keys for kids</strong> and discover how black keys relate to the white keys. This sets the stage for scales, chords, and creative improvisation later.

<a href="#toc">Return to Table of Contents</a>
<h3 id="middle-c">Finding Middle C for Kids</h3>
<strong>Middle C and neighbors for kids</strong> is a favorite activity because it feels like unlocking a secret. Many teachers invite kids to place both thumbs on Middle C to feel the center of the keyboard, then step outward to nearby notes. We teach <strong>start on Middle C for kids</strong>, then practice finding it from the two-black and three-black groups so it becomes a reliable landmark during songs and sightreading. We also show how Middle C appears on the staff as a small ledger-line note, helping children connect fingers, keys, and notes.

<a href="#toc">Return to Table of Contents</a>
<h3 id="octaves">Octave Patterns for Kids</h3>
Finding the same letter name higher or lower on the keyboard introduces <strong>octave patterns for kids on piano</strong>. Children love the “echo game,” playing C in a low voice and then answering with C in a higher voice. Teachers then ask students to hunt for “all the Gs” or “all the As,” which turns the keyboard into a friendly puzzle. This builds confidence with <strong>piano key patterns and octaves for children</strong> and supports later skills like transposition and chord-building.

<a href="#toc">Return to Table of Contents</a>
<h2 id="volz-method">How the Volz Piano Method Teaches Keyboard Basics</h2>
Volz Piano is designed for kids and taught by teachers who come to your home across Utah. Our program focuses on the child first, then the curriculum, which is why families tell us their kids feel motivated and supported. You can explore the whole approach on the <a href="https://volzpiano.com/volz-method-best-piano-teaching-medthod/">Volz Method overview</a> and the <a href="https://volzpiano.com/">Volz Piano homepage</a>, where we explain how lessons adapt to each learner.

<a href="#toc">Return to Table of Contents</a>
<h3 id="strengths">Teaching to a Child’s Strengths</h3>
Every child has different strengths. Some love puzzles and patterns, others love stories and songs. Our teachers tailor <strong>piano keys lessons for kids</strong> using a strength-based approach so children internalize <strong>keyboard layout for kids</strong> quickly. We start with success, then build layers: letter names, finger moves, rhythmic play, and early improvisation. Because our model is <a href="https://volzpiano.com/piano-tutor-that-comes-to-your-home-in-home-kids-piano-lessons-across-utah/">piano teachers that drive to you for kids in Utah</a>, practice tips are customized to the child’s actual home setup.

<a href="#toc">Return to Table of Contents</a>
<h3 id="reading-ear">Reading, Ear Training, and Creative Play</h3>
We braid three strands in every lesson. First, reading: kids learn the staff, lines and spaces, and simple rhythms with songs centered on familiar keys. Second, ear training: games that ask children to copy short patterns or identify whether a sound goes up or down. Third, creative play: composing short patterns on the two-black and three-black groups so children understand <strong>keyboard navigation for kids</strong> and experience ownership of sound. This balance keeps <strong>piano key recognition games for kids</strong> fresh and supports smooth progress.

<a href="#toc">Return to Table of Contents</a>
<h3 id="parent-partner">Parent Partner Tips at Home</h3>
Parents are powerful practice partners. Keep sessions short, daily, and playful. Use a visible <strong>visual piano key guide for kids</strong> or a homemade <strong>piano key chart for children</strong> on the fridge. Celebrate small wins like finding all Cs or naming five white keys without help. If your child thrives with checklists, try a <strong>piano keys practice routine for children</strong> and mark it off together. You can also read our practical articles on the <a href="https://volzpiano.com/blog/">Volz Piano blog</a> and visit the <a href="https://volzpiano.com/student-portal/">Student Portal</a> to reinforce at-home success.

<a href="#toc">Return to Table of Contents</a>
<h2 id="step-plan">A Step-by-Step Plan for Learning the Piano Keys</h2>
This four-week outline shows how teachers and parents can guide a young beginner from zero to confident keyboard navigation. Use it as a flexible template.

<a href="#toc">Return to Table of Contents</a>
<h3 id="week1">Week 1: Landmarks and the Music Alphabet</h3>
<ul>
 	<li>Introduce the two-black and three-black key groups as visual anchors.</li>
 	<li>Teach the <strong>music alphabet for kids on piano keys</strong>: C, D, E, F, G, A, B, then back to C.</li>
 	<li>Play “find three Cs” and “find three Ds” to build quick recognition.</li>
 	<li>Use <strong>piano key games for children</strong> and a short daily scavenger hunt.</li>
 	<li>Explain that we can move the alphabet forward and backward, which helps with reading and simple improvisation.</li>
</ul>
Secondary phrases you might say aloud include “<strong>keyboard keys for kids</strong> go in a repeating pattern” and “we are <strong>learning the piano keys</strong> by using the map of two-black and three-black groups.”

<a href="#toc">Return to Table of Contents</a>
<h3 id="week2">Week 2: White Key Names and Simple Patterns</h3>
<ul>
 	<li>Label or point to white keys while chanting C D E F G A B.</li>
 	<li>Play simple stepping patterns, then skip patterns using every other key.</li>
 	<li>Use short call-and-response games to build flow and confidence.</li>
 	<li>Introduce a beginner song that uses 5 keys around Middle C so your child hears success right away.</li>
</ul>
Activities like <strong>kid friendly piano key drills</strong> and <strong>piano keys basics for kids</strong> make this fun. If you want inspiration, browse child-focused posts on our <a href="https://volzpiano.com/blog/">blog</a> for ideas that meet each child at their level.

<a href="#toc">Return to Table of Contents</a>
<h3 id="week3">Week 3: Black Key Groups, Sharps and Flats</h3>
<ul>
 	<li>Connect black keys to white keys using “a step up is a sharp, a step down is a flat.”</li>
 	<li>Practice short patterns on the two-black and three-black groups with alternating hands.</li>
 	<li>Play memory games that ask “what is the black key above F called” so <strong>black key sharps and flats for kids</strong> feel natural.</li>
</ul>
Kids this week often enjoy composing a tiny pattern using just the two-black groups, then answering it on the three-black groups. This supports <strong>interactive piano keys practice for kids</strong> and sparks creativity.

<a href="#toc">Return to Table of Contents</a>
<h3 id="week4">Week 4: Middle C, Hand Position, and First Songs</h3>
<ul>
 	<li>Find Middle C using the nearest two-black and three-black landmarks.</li>
 	<li>Explore “thumbs share Middle C” to feel healthy starting position, then step outward.</li>
 	<li>Connect Middle C on the keyboard to Middle C on the staff with a small ledger line.</li>
 	<li>Choose two short songs that live around Middle C and celebrate every win.</li>
</ul>
By the end of week four, most children can handle a <strong>beginner keyboard keys lesson for kids</strong> that includes letter naming, simple rhythms, and a short tune. Parents can reinforce with a <strong>piano keys scavenger hunt game for kids</strong> and reward stickers.

<a href="#toc">Return to Table of Contents</a>
<h2 id="games">Kid-Friendly Games and Activities for Piano Key Memorization</h2>
Games are the secret to fast progress. Here are favorites that build <strong>piano key identification for kids</strong> and make practice sessions something your child asks for.
<ul>
 	<li><strong>Flashcard Flips:</strong> Hold up a letter flashcard and let the child race to the key. Add a timer for giggles, then switch roles so the child flashes a letter and you find it.</li>
 	<li><strong>Two-Black Detective:</strong> Ask the child to tap every two-black group with one finger while saying D E out loud, then find F and G around the three-black groups.</li>
 	<li><strong>Middle C High-Low:</strong> Play Middle C, then jump to the same letter name one octave up and one octave down to feel <strong>octave patterns for kids on piano</strong>.</li>
 	<li><strong>Notebook Composer:</strong> Invite your child to write a 4-note pattern on two-black keys, then move it to three-black keys. This encourages <strong>piano key patterns and octaves for children</strong> and creativity.</li>
 	<li><strong>Scavenger Hunt:</strong> Hide sticky notes labeled A through G on the keys and let your child find them in order. This playful <strong>piano keys scavenger hunt game for kids</strong> cements the cycle C D E F G A B.</li>
</ul>
For more teacher-tested ideas, read how the <a href="https://volzpiano.com/piano-teaching-methods-in-utah-an-in-depth-guide-for-kids-with-volz-pianos-in-home-lessons/">Complete Volz Piano Method</a> layers reading, ear training, and creativity for kids.

<a href="#toc">Return to Table of Contents</a>
<h2 id="practice">Practice Routine Ideas That Stick</h2>
Consistency matters more than length. Aim for five to ten minutes a day with upbeat energy. Rotate a simple <strong>piano keys practice routine for children</strong>: one locating game, one alphabet chant across keys, one short song, and one creative pattern. End with a musical high-five. Keeping the routine simple helps children enjoy <strong>piano keys practice for kids</strong> and promotes retention.

Many families keep a tiny practice log near the piano so kids can check off goals like “find three As” or “play Middle C and its neighbors” or “name five white keys without help.” These small wins create momentum.

<a href="#toc">Return to Table of Contents</a>
<h2 id="utah">Utah Families: In-Home Teachers Who Drive to You</h2>
Volz Piano provides <strong>piano teachers that drive to you for kids</strong>, which means lessons happen in the comfort of your own home. Children focus better and parents save travel time. Our friendly teachers bring the <strong>Volz Piano method for kids</strong> to your living room and customize sessions to your child’s pace and interests. You can get details on our <a href="https://volzpiano.com/">homepage</a>, learn more about the <a href="https://volzpiano.com/volz-method-best-piano-teaching-medthod/">Volz Method</a>, see current <a href="https://volzpiano.com/pricing/">pricing</a>, and scan recent articles on the <a href="https://volzpiano.com/blog/">blog</a>.

<a href="#toc">Return to Table of Contents</a>
<h3 id="service-areas">Service Areas and Example Cities</h3>
We serve families across Salt Lake County, Utah County, Davis County, and Weber County. Popular requests include <strong>Salt Lake City piano keys lessons for kids</strong>, <strong>Provo piano keys tutor for children</strong>, <strong>Orem piano keys lessons at home for kids</strong>, <strong>Sandy Utah piano keys for beginners kids</strong>, <strong>Lehi piano keys lessons for children</strong>, <strong>Ogden piano keys teacher who drives to you for kids</strong>, and <strong>Park City piano keys lessons for kids</strong>. If you want a <strong>piano tutor that comes to your home</strong> and teaches <strong>step by step piano keys for kids</strong>, reach out through the <a href="https://volzpiano.com/piano-tutor-that-comes-to-your-home-in-home-kids-piano-lessons-across-utah/">in-home lessons page</a> or see local pages like <a href="https://volzpiano.com/piano-lessons-west-jordan-ut/">West Jordan</a>, <a href="https://volzpiano.com/orem-ut-piano-lessons/">Orem</a>, and <a href="https://volzpiano.com/vineyard-ut-piano-lessons/">Vineyard</a>.

<a href="#toc">Return to Table of Contents</a>
<h3 id="setup-home">Setting Up Your Home Piano Corner</h3>
Set the bench so elbows are slightly above the keys. Keep a pencil cup, a small notebook, and flashcards within reach. Post a <strong>piano key chart for children</strong> and a simple checklist. If you are choosing an instrument, our <a href="https://volzpiano.com/digital-piano-deal/">Digital Piano Deal</a> page shares options families like for quiet practice and headphone use. For toddlers and early beginners, see our guide to <a href="https://volzpiano.com/piano-lessons-at-home-for-toddlers-in-utah-volz-piano-teachers-that-drive-to-you/">piano lessons at home for toddlers in Utah</a>.

<a href="#toc">Return to Table of Contents</a>
<h3 id="pricing">Pricing, Siblings, and Month-to-Month Options</h3>
Families can review typical lesson ranges on our <a href="https://volzpiano.com/pricing/">pricing page</a>. Because we drive to your home, we provide exact quotes based on your city and the number of students, and we offer multi-student options for siblings. Lessons are month to month with a simple notice policy.

<a href="#toc">Return to Table of Contents</a>
<h2 id="resources">Helpful Child-Safe Resources About Piano Keys</h2>
While your Volz teacher gives hands-on guidance, many families like having a few simple, trustworthy resources for quick lookups and kid-friendly visuals. Here are examples we often recommend as in-lesson references or quick reads:
<ul>
 	<li>Explore a friendly overview of piano parts and keyboard basics in Yamaha’s <a href="https://usa.yamaha.com/products/contents/musical_instrument_guide/piano/play/index.html" target="_blank" rel="noopener">Let’s Play Some Notes</a>.</li>
 	<li>Review the modern piano’s 88-key layout and quick history with <a href="https://www.britannica.com/art/piano" target="_blank" rel="noopener">Encyclopaedia Britannica’s piano entry</a>.</li>
 	<li>For older kids who want drills, try <a href="https://www.musictheory.net/exercises/keyboard" target="_blank" rel="noopener">MusicTheory.net’s keyboard identification exercise</a> and <a href="https://www.musictheory.net/lessons/10" target="_blank" rel="noopener">clefs and ledger lines lesson</a>.</li>
 	<li>Parents curious about graded goals can scan <a href="https://www.abrsm.org/en-gb/about-our-exams/exam-preparation" target="_blank" rel="noopener">ABRSM’s exam preparation tips</a> for a sense of progressive skills.</li>
</ul>
Use these links for quick checks, and lean on your teacher to tailor the right activity for your child’s age and attention span.

<a href="#toc">Return to Table of Contents</a>
<h2 id="faq">FAQs</h2>
<details><summary>What is the fastest way to help my child start learning the piano keys?</summary>Start with the two-black and three-black landmarks, then introduce white key letters C D E F G A B. Add a short daily scavenger hunt and one song around Middle C. Keep sessions light and positive so your child experiences quick wins.

</details><details><summary>How do I explain sharps and flats to a child?</summary>Say “a step up is a sharp” and “a step down is a flat,” then show one example on a two-black group and one on a three-black group. Keep names simple at first. Over time, children will connect these sounds to notation.

</details><details><summary>Where should my child place their hands first?</summary>Begin with thumbs sharing Middle C for a few songs to build orientation, then explore keys on either side. This helps kids feel centered while they build reading and finger control.

</details><details><summary>Can Volz Piano send a teacher to our home in Utah?</summary>Yes. Our <a href="https://volzpiano.com/piano-tutor-that-comes-to-your-home-in-home-kids-piano-lessons-across-utah/">Piano Teachers that Drive to You</a> model serves families across Salt Lake County, Utah County, and nearby areas. You can also explore local pages like <a href="https://volzpiano.com/piano-lessons-west-jordan-ut/">West Jordan</a>, <a href="https://volzpiano.com/orem-ut-piano-lessons/">Orem</a>, and <a href="https://volzpiano.com/vineyard-ut-piano-lessons/">Vineyard</a>.

</details><details><summary>How much should we practice at the beginning?</summary>Five to ten minutes a day is enough for most beginners. Rotate one locating game, one alphabet pass across the keys, a short song, and one creative pattern. Consistency beats long sessions.

</details><a href="#toc">Return to Table of Contents</a>`;

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
            Learning the Piano Keys for Kids: A Parent’s Guide to the Volz Piano Method in Utah
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            November 07, 2025
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/learning-the-piano-keys-for-kids-a-parents-guide-to-the-volz-piano-method-in-utah.jpg"
              alt="Featured image for Learning the Piano Keys for Kids: A Parent’s Guide to the Volz Piano Method in Utah"
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
