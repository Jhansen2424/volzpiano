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

  const content = `Parents across Utah know that music can change a child’s life, but it can be hard to decide where to start and how to fit lessons into a busy family schedule. A piano keyboard is often the perfect first instrument for kids, and when lessons happen right at home with piano teachers that drive to you, learning feels easier, safer, and more fun. This guide explains how piano keyboard lessons for kids work, why the complete Volz Piano Method for kids is such a strong fit, and how families in Utah can help their children build real musical skills on the instrument they already have in the living room.
<h2 id="table-of-contents">Table of Contents</h2>
<ul>
 	<li><a href="#why-piano-keyboard-for-kids">1. Why the Piano Keyboard Is a Great First Instrument for Kids</a></li>
 	<li><a href="#volz-piano-method-keyboard">2. How the Volz Piano Method Helps Kids Learn the Piano Keyboard</a></li>
 	<li><a href="#choosing-piano-keyboard">3. Choosing the Right Piano Keyboard for Your Child</a></li>
 	<li><a href="#in-home-lessons-utah">4. In Home Piano Keyboard Lessons in Utah with Teachers That Drive to You</a></li>
 	<li><a href="#skills-by-age">5. Piano Keyboard Skills by Age: What Kids Learn at Different Stages</a></li>
 	<li><a href="#practice-routines">6. Practice Routines That Make Piano Keyboard Fun for Kids</a></li>
 	<li><a href="#supporting-different-learners">7. Supporting Different Learning Needs on the Piano Keyboard</a></li>
 	<li><a href="#getting-started">8. How to Get Started with Volz Piano Keyboard Lessons in Utah</a></li>
 	<li><a href="#faq-piano-keyboard-kids">9. FAQ: Piano Keyboard Lessons for Kids</a></li>
</ul>
<h2 id="why-piano-keyboard-for-kids">1. Why the Piano Keyboard Is a Great First Instrument for Kids</h2>
A piano keyboard gives kids a clear, visual way to see music. The white and black keys form repeating patterns that make it easier for children to understand high and low sounds, steps and skips, and how chords are built. For many kids, piano keyboard lessons are the doorway into all future music learning, whether they later choose band, choir, or another instrument.

Studies on music education show that children who learn an instrument tend to develop stronger focus, problem solving, and teamwork skills. Research highlighted by the NAMM Foundation points out that kids who take part in music programs often perform better in school and build stronger study habits over time, making music a smart long term investment for families.

Other organizations, such as the National Federation of State High School Associations, have shared findings that music practice supports brain growth, improves listening skills, and helps children manage stress in healthy ways. When kids learn to coordinate hands, eyes, and ears on a piano keyboard, they are training many parts of the brain at once, not just learning songs for recitals.

Because the keyboard layout is straightforward, piano keyboard lessons for kids are also friendly for young beginners who cannot yet juggle complex fingerings or posture demands from instruments like violin or flute. Children can sit upright, rest their hands on the keys, and focus on sound, rhythm, and simple patterns without wrestling with heavy instruments or reeds.

Parents often search for phrases like “piano keyboard lessons for kids in Utah at home” or “piano keyboard lessons for kids in Salt Lake City” because they want something practical that fits school, sports, and family time. A piano keyboard takes up relatively little space, can be turned down or used with headphones, and allows kids to practice at almost any time of day without disturbing neighbors.

With the right structure, children’s piano keyboard lessons become a mix of play and progress. Simple songs, chords, and patterns teach musical building blocks, while games and backing tracks keep the experience joyful. This is exactly the kind of approach that Volz Piano builds into its kids piano lessons Utah families book through their main site.

<a href="#table-of-contents">Return to Table of Contents</a>
<h2 id="volz-piano-method-keyboard">2. How the Volz Piano Method Helps Kids Learn the Piano Keyboard</h2>
At <a href="https://volzpiano.com/">Volz Piano</a>, the complete Volz Piano Method for kids is built around the idea that every child learns differently. Instead of forcing a single path, the method blends several skills so teachers can adjust piano keyboard lessons for kids to match each student’s strengths and interests.

The official description of the Volz Piano Method explains that lessons combine reading, composing, hearing, and arranging so kids can grow as full musicians, not just note readers. Teachers use this mix to create piano keyboard lessons for kids that feel creative and personal, especially when those lessons take place in the child’s own home.

On the <a href="https://volzpiano.com/volz-method-best-piano-teaching-medthod/">Volz Method overview page</a>, you can see how the curriculum emphasizes:
<ul>
 	<li>Reading: step by step reading of notes and rhythms on the piano keyboard</li>
 	<li>Composing: encouraging kids to write small patterns and songs</li>
 	<li>Hearing: training students to recognize chords, intervals, and melodies by ear</li>
 	<li>Arranging: letting children reshape familiar tunes into their own versions</li>
</ul>
When kids have piano keyboard lessons for kids using the Volz Piano Method, they do more than play pieces straight from a book. A child who loves patterns might spend extra time exploring chord progressions across the keyboard. Another child who enjoys melodies might work on playing by ear alongside reading, which the Volz approach fully supports.

This method is taught by instructors who go through focused training in the Volz system. As the <a href="https://volzpiano.com/pricing/">Volz Piano pricing page</a> explains, teachers are trained for months in the method so they can spot what motivates each child and build lesson plans around that insight. That is especially important in in home piano keyboard lessons for kids, where teachers see how a student behaves in their own environment.

Parents looking for keyboard music lessons for children will appreciate how this method fits many learning styles. Kids who love structure can track their progress with clear goals. Kids who love creativity can explore composition and improvisation early on. Both kinds of students can grow into confident players when teachers keep returning to the same core skills on the piano keyboard in fresh ways.

To learn more about how this works for total beginners, families can read the Volz blog article on learning piano for beginners that focuses on a clear, child friendly starting point. Many families pair that resource with this deeper look at piano keyboard lessons for kids using the Volz approach.

<a href="#table-of-contents">Return to Table of Contents</a>
<h2 id="choosing-piano-keyboard">3. Choosing the Right Piano Keyboard for Your Child</h2>
One of the biggest early questions parents have is what kind of piano keyboard to buy for lessons. Should you choose a small 61 key keyboard, a full size digital piano, or wait and invest in an acoustic piano later? The good news is that most kids piano keyboard classes can begin on a solid digital instrument, especially for early levels.
<h3>Key count and size</h3>
For very young children, a smaller keyboard can work at first, but most teachers recommend moving toward a 76 or 88 key piano keyboard as soon as possible. This helps children learn the full layout of the instrument and avoids confusion when they visit school pianos or perform elsewhere.
<h3>Weighted keys and touch sensitivity</h3>
Weighted keys and touch sensitivity are important for realistic technique. When kids play on a piano keyboard that responds to how hard or soft they press, they learn control, dynamics, and arm weight. That way, when they later sit at an acoustic piano, their skills transfer smoothly.

The <a href="https://volzpiano.com/digital-piano/">digital piano recommendations from Volz Piano</a> highlight instruments that feel stable, include stands or built in legs, and come with essentials like benches and sturdy X stands. Many families start with options from that list so kids have an instrument that feels like a real piano even though it plugs into the wall.
<h3>Headphones and volume control</h3>
One big advantage of a digital piano keyboard for kids is the ability to practice with headphones. Families in apartments, townhomes, or shared spaces appreciate letting kids play at quiet times without worrying about disturbing neighbors. Volume control also means practice can happen early in the morning or later in the evening when the rest of the house needs quiet.
<h3>Budget and growth over time</h3>
Parents who search for “affordable piano keyboard lessons for kids in Utah” are usually thinking about both lesson costs and instrument costs. In many cases, it makes sense to start with a reasonably priced digital piano and upgrade later if your child commits to long term study. Volz teachers can offer practical advice about whether your current keyboard is enough for your child’s level and goals.

Since Volz Piano offers piano keyboard lessons for kids on digital piano or keyboard, there is no need to buy a grand piano to start. What matters most is that the keys are full size, the action feels consistent, and the instrument can be placed in a part of the house where practice is realistic.

<a href="#table-of-contents">Return to Table of Contents</a>
<h2 id="in-home-lessons-utah">4. In Home Piano Keyboard Lessons in Utah with Teachers That Drive to You</h2>
One of the most distinctive things about Volz Piano is the way they deliver lessons. Instead of asking families to fight traffic after school, Volz Piano provides piano teachers that drive to you in Utah. The homepage proudly states, “We drive to your house,” which means your child can learn on the piano keyboard they use every day, right in the comfort of home.

Kids piano keyboard lessons at home help children feel more relaxed. They can sit in a familiar chair, follow a predictable routine, and avoid the stress of new buildings and waiting rooms. For shy or anxious students, this kind of in home piano keyboard lessons for kids in Utah can make the difference between quitting early and truly enjoying music.

The <a href="https://volzpiano.com/pricing/">pricing page on the Volz site</a> explains that lesson rates vary slightly by city and number of students, but the structure includes multi student discounts for siblings. This fits perfectly with families searching for “family piano keyboard lessons for kids and siblings in Utah” or similar phrases, since one teacher can work with several children in the same visit.

Volz Piano also participates in the Utah Fits All Scholarship program, which lets families use education funds for approved extracurriculars such as piano lessons. Parents can ask how this applies to in home piano keyboard lessons for kids when they schedule a call.

Because Volz Piano teachers serve many areas across the state, including places like Salt Lake City, Utah County, and other nearby communities, parents often find that scheduling is more flexible than they expected. Mobile piano teachers for kids can arrange lesson times around sports, homework, and family events instead of forcing parents to leave work early every week.

In home lessons also encourage parent involvement. When lessons happen in your living room, you can quickly check in with the teacher, ask questions, and get a real feel for your child’s progress. The <a href="https://volzpiano.com/testimonials/">Volz Piano testimonials page</a> is full of comments from Utah parents who appreciate this personal connection and the way mobile lessons fit real life.

If you are curious about how this looks day to day, the Volz blog includes multiple posts about teaching piano lessons at home in Utah, family bundles, and music lessons at home. These articles give a picture of what happens before, during, and after a typical lesson and how the Volz Piano Method for kids plays out on a piano keyboard in the kitchen or family room.

<a href="#table-of-contents">Return to Table of Contents</a>
<h2 id="skills-by-age">5. Piano Keyboard Skills by Age: What Kids Learn at Different Stages</h2>
Every child is unique, but it helps parents to know what piano keyboard skills kids usually build at different ages. The Volz Piano Method is flexible, so these are general patterns rather than rigid rules.
<h3>Ages 4 to 5: Exploring sounds and simple patterns</h3>
At this stage, piano keyboard lessons for young children in Utah focus on play and exploration. Kids learn:
<ul>
 	<li>High and low sounds on the keyboard</li>
 	<li>Simple finger numbers and hand position</li>
 	<li>Short rhythm patterns using clapping and stepping</li>
 	<li>Very short songs that may use only two or three notes</li>
</ul>
Lessons might last only 20 to 30 minutes, with frequent movement breaks and games. Teachers pay close attention to attention span and build piano keyboard lessons for kids that feel like stories rather than lectures.
<h3>Ages 6 to 8: Building basic reading and coordination</h3>
In this age group, piano keyboard lessons for kids start to include more formal reading and two hand playing. Children often learn to:
<ul>
 	<li>Recognize notes on the staff and find them on the keyboard</li>
 	<li>Play simple melodies in right hand with basic left hand chords</li>
 	<li>Count steady beats and basic rhythms</li>
 	<li>Use dynamics such as loud and soft</li>
</ul>
Many families in Utah begin here with beginner piano keyboard lessons for kids in Utah County or Salt Lake City. Kids are ready for slightly longer lessons and more consistent home practice.
<h3>Ages 9 to 12: Growing into full songs and creative projects</h3>
Older children can handle more detailed instruction, so piano keyboard lessons for kids who want to compose music or improvise fit nicely here. Typical skills include:
<ul>
 	<li>Playing with both hands independently</li>
 	<li>Learning scales and broken chords</li>
 	<li>Reading more complex rhythms and key signatures</li>
 	<li>Trying out simple composition projects on the keyboard</li>
</ul>
Kids at this level may search for “piano keyboard lessons for kids who learn by ear in Utah” or ask to play songs from movies and games. The Volz Piano Method welcomes this curiosity and uses that interest to teach theory and technique through music the child already loves.
<h3>Teens and advanced kids: Deeper musicianship</h3>
As students grow, piano keyboard lessons for homeschooled kids in Utah, public school students, and private school students all aim toward the same goal: confident, independent musicianship. Teens can prepare for recitals, accompany choirs, write their own music, or simply enjoy playing for family and friends.

<a href="#table-of-contents">Return to Table of Contents</a>
<h2 id="practice-routines">6. Practice Routines That Make Piano Keyboard Fun for Kids</h2>
Even the best piano keyboard lessons for kids will stall if practice at home feels like a chore. The key is building small, achievable habits that match your child’s age and attention span.
<h3>Start small and build slowly</h3>
For beginners, five to ten minutes of focused practice, most days of the week, can bring real progress. Many parents find success by linking piano keyboard practice to another daily habit, such as right after homework or just before dinner.

Practice sessions might include:
<ul>
 	<li>A quick warm up pattern on the piano keyboard</li>
 	<li>One or two kids piano keyboard songs from the lesson book</li>
 	<li>A short game such as naming random keys or clapping rhythms</li>
</ul>
<h3>Use games and goals</h3>
Fun piano games for kids on piano keyboard can turn repetition into play. For example, children might:
<ul>
 	<li>Roll a die to decide how many times to repeat a pattern</li>
 	<li>Play a “mystery note” game where they find notes with eyes closed</li>
 	<li>Race a timer to see how many correct chords they can play</li>
</ul>
Teachers at Volz Piano often give simple practice charts or sticker systems that keep kids motivated. Parents can support this by praising effort, not perfection.
<h3>Connect practice to brain benefits</h3>
Many parents are encouraged to know that music practice supports cognitive development. Organizations such as Education Through Music note that learning and playing an instrument can boost fine motor skills, executive function, and concentration in children. Other reports show that ongoing music study helps kids manage emotions and build confidence, especially when they perform and succeed in small steps.

Recent coverage from parenting news outlets has even highlighted surveys where most parents say music education improves their children’s confidence and happiness. Piano keyboard lessons for kids become about more than songs, they become a tool for whole child growth.

<a href="#table-of-contents">Return to Table of Contents</a>
<h2 id="supporting-different-learners">7. Supporting Different Learning Needs on the Piano Keyboard</h2>
No two kids learn the same way. Some children want to see everything written on the page. Others copy what they hear. Some need lots of movement breaks, and some can focus quietly for long stretches. The Volz Piano Method for kids is built to handle this variety by offering flexible paths through piano keyboard skills.
<h3>Readers, listeners, and creators</h3>
Kids who like reading often enjoy learning the staff and playing many short pieces. Kids who learn best by ear might shine when teachers play a melody first and let them copy it on the keyboard. Creative students might bring their own chord patterns and ask how to turn them into full songs.

Volz teachers use these strengths to design piano keyboard lessons for kids that are both structured and playful. For example, a student who loves patterns might spend more time exploring how chords move across the keyboard, while a student who loves melodies might work on arranging favorite tunes.
<h3>Neurodivergent learners</h3>
Parents searching for “piano keyboard lessons for neurodivergent kids in Utah” often want teachers who are patient, flexible, and open to sensory needs. In home piano keyboard lessons allow adjustments that would be harder in a studio, such as:
<ul>
 	<li>Dimmer lights and lower sound levels</li>
 	<li>Shorter but more frequent lesson segments</li>
 	<li>Movement breaks between keyboard activities</li>
</ul>
The Volz Piano core values emphasize a growth mindset and a belief that every student can improve. This outlook is especially helpful for children who need more time to settle, repeat skills, or explore alternative paths on the piano keyboard.
<h3>Busy kids and homeschool families</h3>
Many Utah families juggle sports, scouts, church, and school projects. Others homeschool and want piano keyboard lessons for homeschooled kids in Utah that fit daytime schedules. Because piano teachers that drive to you in Utah control their own routes and times, they can offer lessons before school, in the afternoon, or early evening depending on location.

This flexibility is one reason so many families fall in love with in home piano lessons for kids. There is no commute, no waiting room, and no rush. Kids finish a lesson and can go right back to homework or playtime.

<a href="#table-of-contents">Return to Table of Contents</a>
<h2 id="getting-started">8. How to Get Started with Volz Piano Keyboard Lessons in Utah</h2>
If you are ready to start piano keyboard lessons for kids in Utah, the process with Volz Piano is simple and parent friendly.
<h3>Step 1: Learn about the method and values</h3>
Begin by browsing the main <a href="https://volzpiano.com/">Volz Piano homepage</a>, which explains the overall approach and introduces the idea of teachers driving to your home. Then visit the page on <a href="https://volzpiano.com/volz-method-best-piano-teaching-medthod/">The Complete Volz Method</a> to see how reading, composing, hearing, and arranging all work together in kids piano keyboard lessons.

The <a href="https://volzpiano.com/core-values/">core values page</a> also gives a good feel for the company’s mindset about growth, practice, and respect for each student.
<h3>Step 2: Check pricing and family options</h3>
Next, review the <a href="https://volzpiano.com/pricing/">Volz Piano pricing information</a>. Here you will see that lesson prices usually fall within a clear range per half hour, with multi student discounts when more than one child in the family enrolls. This is helpful for parents searching for affordable piano keyboard lessons for kids in Utah or family piano keyboard lessons for kids and siblings in Utah.

You can also ask how the Utah Fits All Scholarship may apply to your situation if you have access to that program.
<h3>Step 3: Confirm your instrument</h3>
Before your first lesson, make sure your child has access to a reliable piano keyboard. The <a href="https://volzpiano.com/digital-piano/">digital piano recommendations from Volz Piano</a> can guide you toward solid choices if you do not yet have an instrument. Teachers can also advise whether your current keyboard is enough or if you should plan an upgrade later.
<h3>Step 4: Schedule a call and match with a teacher</h3>
When you are ready, use the contact options on the <a href="https://volzpiano.com/contact-us/">Volz Piano contact page</a> to schedule a call. During this conversation, you can share your child’s age, experience level, and goals. The team then matches you with a piano keyboard teacher for kids in your area, based on your city and schedule.

Many parents who type “piano keyboard lessons for kids with flexible schedules in Utah” into a search engine are relieved to discover that Volz Piano has a teacher network across several cities, making it easier to find a time that works for school, sports, and family routines.
<h3>Step 5: Start lessons and adjust over time</h3>
Once lessons begin, you and your child will quickly get a feel for how the Volz Piano Method fits your family. Over time you might explore more resources on the <a href="https://volzpiano.com/blog/">Volz Piano blog</a>, including guides to teaching kids piano at home, family bundles, and beginner piano kids posts that dive deeper into specific topics.

As your child progresses, teachers will gradually introduce more advanced piano keyboard skills, from chords and patterns to creative composition projects. You will see how piano keyboard lessons for kids using the Volz Piano Method build both musical ability and personal confidence week after week.

<a href="#table-of-contents">Return to Table of Contents</a>
<h2 id="faq-piano-keyboard-kids">9. FAQ: Piano Keyboard Lessons for Kids</h2>
<details><summary>What age can my child start piano keyboard lessons?</summary>Many children are ready for piano keyboard lessons around ages 5 or 6, when they can follow simple instructions and sit for short periods. Some younger kids can start earlier with very playful lessons that focus on sounds, patterns, and rhythm instead of heavy reading. Volz Piano teachers will help you decide whether your child is ready and how to shape lessons for their age.

</details><details><summary>Do we need a full size piano, or is a keyboard enough?</summary>A good quality digital piano keyboard is usually enough for beginner and intermediate levels. Full size keys, touch sensitivity, and a stable stand are more important than having an acoustic piano at the start. As your child advances, your Volz teacher can advise whether it is time to upgrade to a different piano keyboard or acoustic instrument.

</details><details><summary>How long should my child practice the piano keyboard each day?</summary>For beginners, five to ten minutes a day, most days of the week, is a great goal. As skills grow, practice can increase to 20 or 30 minutes. Short, focused sessions usually work better for kids than one long practice session, especially for younger students.

</details><details><summary>What makes in home piano keyboard lessons better for some kids?</summary>In home piano keyboard lessons for kids remove the stress of travel and new spaces. Children learn on their own instrument, in a familiar room, which often helps them relax and focus. Parents can also observe lessons more easily, ask questions, and stay involved in the learning process.

</details><details><summary>How does the Volz Piano Method support different learning styles?</summary>The Volz Piano Method blends reading, ear training, composing, and arranging so teachers can adjust lessons for each child. Kids who like structure get clear reading and technique goals. Kids who enjoy creativity explore composing and improvising on the piano keyboard. Teachers who drive to you in Utah can observe how your child learns at home and choose activities that fit their strengths.

</details><details><summary>Can siblings share a piano keyboard and still take lessons?</summary>Yes. Many families schedule back to back lessons for siblings on the same keyboard. Volz Piano even offers multi student discounts, making it easier for several children in the same family to take lessons on one shared digital piano or acoustic instrument.

</details><a href="#table-of-contents">Return to Table of Contents</a>`;

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
            Piano Keyboard Lessons for Kids in Utah: In Home Teachers That Drive to You
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            November 10, 2025
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/piano-keyboard-lessons-for-kids-in-utah-in-home-teachers-that-drive-to-you.jpg"
              alt="Featured image for Piano Keyboard Lessons for Kids in Utah: In Home Teachers That Drive to You"
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
