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

  const content = `Helping a child learn to play the piano is one of the most rewarding gifts a parent can give. Kids who play the piano build focus, confidence, and creativity, and they gain a skill that can follow them for life. When families in Utah pair in home kids piano lessons with the complete Volz Piano Method for kids, young students can learn in a calm, familiar space while being guided step by step by expert teachers who drive to you.
<h2 id="table-of-contents">Table of Contents</h2>
<ul>
 	<li><a href="#why-learning-to-play-the-piano-matters">Why Learning to Play the Piano Matters for Kids</a></li>
 	<li><a href="#when-should-a-child-start-to-play-the-piano">When Should a Child Start to Play the Piano</a></li>
 	<li><a href="#how-kids-learn-to-play-the-piano-step-by-step">How Kids Learn to Play the Piano Step by Step</a></li>
 	<li><a href="#the-volz-piano-method-for-kids">The Volz Piano Method for Kids</a></li>
 	<li><a href="#in-home-piano-teachers-that-drive-to-you-in-utah">In Home Piano Teachers That Drive to You in Utah</a></li>
 	<li><a href="#building-a-fun-piano-practice-routine-for-children">Building a Fun Piano Practice Routine for Children</a></li>
 	<li><a href="#supporting-different-types-of-learners-who-play-the-piano">Supporting Different Types of Learners Who Play the Piano</a></li>
 	<li><a href="#how-parents-can-support-kids-who-play-the-piano">How Parents Can Support Kids Who Play the Piano</a></li>
 	<li><a href="#choosing-the-right-piano-or-keyboard-for-your-child">Choosing the Right Piano or Keyboard for Your Child</a></li>
 	<li><a href="#faq-kids-play-the-piano">Frequently Asked Questions about Kids Who Play the Piano</a></li>
</ul>
<h2 id="why-learning-to-play-the-piano-matters">Why Learning to Play the Piano Matters for Kids</h2>
Many parents want their children to play the piano, but they are not always sure why it matters so much. Learning to play the piano is about far more than music. Research reviews in child development have found that regular music training can improve memory, attention, and spatial skills in children compared with peers who do not learn an instrument. Studies that look specifically at piano lessons show gains in visual spatial skills, fine motor control, and even emotional regulation when kids practice consistently.

Piano lessons also give children a safe place to express feelings. Unlike many activities that focus mostly on competition, music encourages creativity. When a child works on a simple piece and finally plays the whole song fluently, they experience a strong sense of achievement. That feeling tends to spill over into school and other hobbies, which is one reason many teachers notice that kids who play the piano often become more confident in class.

Another important benefit involves focus. Modern kids often spend many hours with screens. The <a href="https://www.healthychildren.org/English/family-life/Media/Pages/Where-We-Stand-TV-Viewing-Time.aspx" target="_blank" rel="noopener">American Academy of Pediatrics</a> encourages parents to set clear limits around media use so children still have time for sleep, physical activity, and off screen play. Piano practice is a perfect screen free alternative. When a child sits at the piano keyboard for ten or fifteen minutes and concentrates on a pattern of notes, they practice sustained attention in a very natural way.

For some children, especially those with coordination challenges or attention difficulties, the piano can even be part of a supportive therapy plan. A recent article in a pediatric journal reported that piano lessons can help children develop hand motor skills and musical hearing through repeated, structured movements at the keys. Parents who want their child to play the piano are not just adding one more activity to the calendar. They are investing in a hobby that can support the brain, the body, and the heart at the same time.

For Utah families who want all these benefits but need a format that fits busy schedules, Volz Piano makes it easier. By combining a kid focused curriculum with in home piano lessons and <a href="https://volzpiano.com/piano-tutor-that-comes-to-your-home-in-home-kids-piano-lessons-across-utah/">piano teachers that drive to you</a>, Volz helps children enjoy the process of learning to play the piano instead of feeling rushed or stressed by travel.

<a href="#table-of-contents">Return to Table of Contents</a>
<h2 id="when-should-a-child-start-to-play-the-piano">When Should a Child Start to Play the Piano</h2>
Parents often ask about the best age for a child to start to play the piano. There is no strict rule, but most children do well when they begin formal kids piano lessons somewhere between ages five and eight. At this stage, they can follow simple instructions, recognize letters and numbers, and sit at the piano keyboard for a short lesson without becoming too tired.

That said, you can introduce piano in gentle ways much earlier. Toddlers can explore high and low sounds on a keyboard with a parent by their side. Preschoolers can clap rhythms, sing along with simple melodies, and learn to find groups of two and three black keys. When you finally schedule beginner piano lessons for kids, these early experiences help them feel comfortable rather than overwhelmed.

Each child is different. Some five year olds are ready to learn to play the piano step by step, while others need an extra year or two. Signs that a child may be ready include:
<ul>
 	<li>They show interest in music, songs, or instruments at home.</li>
 	<li>They can focus on a quiet activity, such as drawing, for at least ten minutes.</li>
 	<li>They recognize basic numbers and letters.</li>
 	<li>Their hands are large enough to press individual keys without strain.</li>
</ul>
In Utah, many parents find it helpful to talk with a children piano teacher in Utah before committing. During an introductory chat or trial lesson, a teacher can quickly see whether the child is ready for structured kids piano lessons in Utah or whether it would be better to wait a little longer and keep music playful at home.

If you would like more guidance on timing and readiness, the article on <a href="https://volzpiano.com/learn-piano-for-beginners-a-comprehensive-guide-for-kids-and-parents/">learning piano for beginners with kids and parents</a> on the Volz Piano site walks through signs that a young child is ready to begin and how parents can prepare the home environment.

<a href="#table-of-contents">Return to Table of Contents</a>
<h2 id="how-kids-learn-to-play-the-piano-step-by-step">How Kids Learn to Play the Piano Step by Step</h2>
When a child starts beginner piano lessons for kids, it helps parents to understand what actually happens in each stage. Learning to play the piano is not a mystery. It is a sequence of small skills that build on one another. A strong kids piano method will rotate through several strands in every lesson so children keep moving forward without feeling stuck.

First, children discover the layout of the piano keyboard. They learn the names of the white keys, see how black keys come in groups of two and three, and find the important landmark Middle C. The Volz team explains this clearly in their <a href="https://volzpiano.com/learning-the-piano-keys-for-kids-a-parents-guide-to-the-volz-piano-method-in-utah/">piano keys for kids guide</a>, where they show how simple games help the key names stick. Once a child can find keys quickly, they are ready to learn easy patterns and five finger positions.

Next comes rhythm. A good children piano teacher in Utah will clap patterns, chant note values, and have the student tap on their knees or the closed piano lid. Only then will they add the same pattern to the keys. This step keeps lessons fun and physical while building accurate timing.

Reading music and playing by ear should grow together. In many traditional methods, kids either focus only on reading or only on copying songs by ear. The Volz Piano Method for kids approaches both at once, which helps children understand music more deeply. Short exercises, along with call and response games, allow students to learn to play the piano while training both the eyes and the ears.

Over time, kids move from one hand melodies to hands together, then to more complex hand shapes, chords, and broken patterns. For example, a student might start with a simple right hand tune and left hand single notes, then progress to broken chord patterns that feel like real songs. With a private piano tutor for kids at home, these skills can be broken down into easy steps that match the child’s pace instead of a rigid schedule.

Parents do not need to be musicians to support this process. They only need to understand that each time their child sits down to play the piano, they are reinforcing finger patterns, visual recognition, and rhythmic control that will help future pieces feel easier and more natural.

<a href="#table-of-contents">Return to Table of Contents</a>
<h2 id="the-volz-piano-method-for-kids">The Volz Piano Method for Kids</h2>
Volz Piano was built around one clear idea: kids learn fastest when piano lessons are designed specifically for them. The complete Volz Piano Method for kids combines technique, theory, creativity, and real songs so that students always know why they are practicing a particular pattern or scale. This method is taught in every lesson that Volz offers to families across Utah.

According to the overview on the <a href="https://volzpiano.com/">Volz Piano homepage</a>, the method blends interval based reading, ear training, and improvisation. That means children are not memorizing every note one by one. Instead, they learn to recognize patterns and distances between notes. This approach helps them read new pieces more quickly and also makes transposing, or moving a song into a new key, feel natural later.

The method also weaves music theory for kids into regular lessons. Instead of stopping to teach theory on paper only, teachers show how chords, scales, and intervals appear inside the songs students are learning. Parents who want a deeper look at these teaching strands can explore the article on <a href="https://volzpiano.com/piano-learning-methods-a-comprehensive-guide-for-kids/">piano learning methods for kids</a> on the Volz Piano site, which compares different approaches and highlights what makes the Volz Piano Method unique.

Another strength is creativity. Children are invited to write simple motifs, create variations, and experiment with accompaniment patterns. When kids feel ownership over the music they play, they are more likely to stick with lessons and practice. This is especially helpful for kids with short attention spans, who may need variety in their practice routine to stay engaged.

Finally, the Volz Piano Method is designed to work perfectly with in home lessons. Because teachers can see the actual piano or keyboard, the lighting, and the seating in your living room, they can tailor exercises and posture tips to real life conditions. This home based focus separates Volz from many studio based programs and allows kids to play the piano with confidence in the same space where they practice each day.

If you wish to explore how this method works at home in more detail, the article on <a href="https://volzpiano.com/teaching-kids-piano-at-home-a-comprehensive-guide-with-volz-piano/">teaching kids piano at home with Volz Piano</a> gives many practical examples of lessons, games, and practice routines that families can adapt.

<a href="#table-of-contents">Return to Table of Contents</a>
<h2 id="in-home-piano-teachers-that-drive-to-you-in-utah">In Home Piano Teachers That Drive to You in Utah</h2>
Even parents who know the value of helping their child play the piano often struggle with logistics. After school activities, sports, homework, and commutes can make it difficult to drive to a music studio every week. This is why Volz Piano offers <strong>Piano Teachers that Drive to You</strong> in Utah, a model that brings kids piano lessons directly into your home.

On the Volz site, the dedicated page about <a href="https://volzpiano.com/piano-tutor-that-comes-to-your-home-in-home-kids-piano-lessons-across-utah/">piano tutors that come to your home</a> explains how this works in practice. Volz serves children in Salt Lake County, Utah County, Davis County, Weber County, and surrounding areas. Instead of bundling siblings into the car, parents simply prepare the living room or music space, and a trained teacher arrives ready to teach the complete Volz Piano Method for kids.

This in home model has several advantages:
<ul>
 	<li><strong>Comfort and security:</strong> Children feel safe learning to play the piano in a familiar place.</li>
 	<li><strong>Better focus:</strong> There is less noise and fewer distractions than in many busy studios.</li>
 	<li><strong>Flexible scheduling:</strong> It is easier to coordinate lesson times when you are not also planning travel.</li>
 	<li><strong>Realistic practice setup:</strong> Teachers help your child adjust the bench, angle of the keyboard, and lighting on the exact instrument they use each day.</li>
</ul>
This format works well for both private piano tutor sessions and for households with more than one child. A teacher might work with one child while another finishes homework, then switch. For Utah families looking for kids piano lessons in Utah County, in Davis County, or piano lessons for children in Salt Lake City, an in home piano tutor who drives to you can make the difference between lessons that feel stressful and a weekly visit that everyone looks forward to.

<a href="#table-of-contents">Return to Table of Contents</a>
<h2 id="building-a-fun-piano-practice-routine-for-children">Building a Fun Piano Practice Routine for Children</h2>
The biggest question after signing up for kids piano lessons is simple: how often should kids practice to play the piano, and how do you keep it fun? A realistic goal for most beginners is ten to twenty minutes of focused practice at least five days per week. Short, regular sessions build skills far more effectively than rare, long marathons.

To create a piano practice routine for children that actually happens, try these steps:
<ul>
 	<li>Link practice to an existing habit, such as right after a snack or just before dinner.</li>
 	<li>Use a simple paper chart or sticker system to track practice days.</li>
 	<li>Keep the keyboard or piano open and ready to play so setup is easy.</li>
 	<li>Ask your child to play one quick song for you at the end of practice.</li>
</ul>
Inside each session, variety is important. Kids might warm up with a five finger pattern, then review an old song, then work on a new section. Many parents like to add a “fun piece” so children can enjoy playing familiar tunes or movie themes alongside lesson material. Teachers from Volz often help families choose fun songs for kids learning to play the piano that match the child’s level without causing frustration.

For children who love games, you can turn practice into short challenges. For example, a child can earn a point each time they play a piece three times in a row without stopping, or when they keep a steady beat with the metronome. Over a week, they can trade points for a small reward or an extra family activity rather than more screen time, which aligns with <a href="https://publications.aap.org/pediatrics/article/138/5/e20162591/60503/Media-and-Young-Minds" target="_blank" rel="noopener">pediatric guidance on limiting media use</a>.

If you want more structured ideas, Volz shares several at home practice strategies in their article on <a href="https://volzpiano.com/kids-piano-lessons-at-home/">kids piano lessons at home</a>. That resource explains how to set up the piano space, choose a practice time, and balance gentle accountability with encouragement.

<a href="#table-of-contents">Return to Table of Contents</a>
<h2 id="supporting-different-types-of-learners-who-play-the-piano">Supporting Different Types of Learners Who Play the Piano</h2>
No two children learn in exactly the same way. Some kids want to read every note on the page before they touch the keys. Others prefer to copy by ear or need to move their bodies while they learn. A strong kids piano method must adapt to these differences so that every child has a way to connect with the music.

Visual learners may benefit from color coded exercises, note name flashcards, or digital notation games. Auditory learners enjoy singing the melody, echo clapping rhythms, and playing call and response games at the keyboard. Kinesthetic learners need to move, so teachers might ask them to march to the beat, tap rhythms on different parts of the body, or play patterns that move across wide regions of the piano keyboard.

Some parents worry that a child with a short attention span or mild learning difference will not be able to play the piano successfully. Fortunately, research suggests that structured music lessons can support attention skills over time. One comparison study of children who received piano lessons versus those who did not found greater improvements in cognitive and psychological skills for the piano group. This is encouraging for families whose children struggle to focus in other settings.

The Volz Piano Method for kids is built with these varied learning styles in mind. Teachers are trained to shift activities frequently, include musical games, and adjust the pacing of each lesson. The article on <a href="https://volzpiano.com/methods-of-teaching-piano-a-comprehensive-guide-for-kids-and-parents/">methods of teaching piano for kids and parents</a> shows how different learning preferences are supported with specific techniques and activities. When lessons happen in the child’s own home, it is even easier for teachers to spot what motivates each student and tailor activities on the spot.

<a href="#table-of-contents">Return to Table of Contents</a>
<h2 id="how-parents-can-support-kids-who-play-the-piano">How Parents Can Support Kids Who Play the Piano</h2>
Parents have enormous influence over whether a child continues to play the piano beyond the first few months. You do not need to read music or play an instrument yourself in order to help. What matters most is your attitude, your routines, and the messages you send about practice and effort.

Here are some simple ways to help your child learn to play the piano with confidence:
<ul>
 	<li><strong>Celebrate effort, not perfection.</strong> Praise your child for showing up to practice and trying new pieces, even when they make mistakes.</li>
 	<li><strong>Stay nearby during early practice sessions.</strong> Young children may practice more calmly when a parent sits quietly in the same room.</li>
 	<li><strong>Request mini concerts.</strong> Ask your child to play one short song at family gatherings so they can enjoy the positive attention.</li>
 	<li><strong>Communicate with the teacher.</strong> Share observations about your child’s mood, interests, or schedule so the teacher can adjust accordingly.</li>
</ul>
Parents can also keep expectations realistic. Beginner piano lessons for kids in Salt Lake City, Utah County, or other Utah communities will not instantly turn a child into a concert pianist, and that should not be the goal. Instead, focus on steady progress: smoother hand movements, better rhythm, and the ability to play a few favorite songs without stopping.

The Volz blog includes many resources to guide parents. For instance, the post on <a href="https://volzpiano.com/teaching-kids-piano-at-home-a-comprehensive-guide-with-volz-piano/">teaching kids piano at home</a> includes suggestions for practice charts and ideas for keeping kids motivated during busy seasons of school or sports. The <a href="https://volzpiano.com/tag/music-theory-for-kids/">music theory for kids articles</a> help parents understand the concepts behind what their children are learning, which makes it easier to encourage them.

Most important, remember that your child is watching your attitude. When you speak positively about lessons and show that you value music, your child is more likely to enjoy playing and to stick with piano long enough to see real growth.

<a href="#table-of-contents">Return to Table of Contents</a>
<h2 id="choosing-the-right-piano-or-keyboard-for-your-child">Choosing the Right Piano or Keyboard for Your Child</h2>
Families often ask whether they need a full acoustic piano before their child starts to play the piano. While a high quality acoustic instrument is ideal in the long term, many kids do very well starting on a digital piano or a full sized weighted keyboard. The key is to choose an instrument that supports good technique and sound, not just the least expensive option with small keys.

For a young beginner, look for a keyboard or digital piano with these features:
<ul>
 	<li>Full size keys that feel similar to an acoustic piano.</li>
 	<li>Weighted or semi weighted keys so children learn proper finger strength.</li>
 	<li>At least 61 keys, with 88 keys preferred if the budget allows.</li>
 	<li>A stable stand and an adjustable bench so posture is comfortable.</li>
</ul>
If you choose a digital instrument, make sure the volume can be controlled and that headphones are comfortable. This allows kids to practice without disturbing other family members while still getting the feel of a real piano keyboard. Many Utah parents start with a solid digital option and upgrade to an acoustic piano later if their child continues and loves to play the piano.

Volz Piano often helps parents decide which instrument is best for their child’s level and family situation. Teachers who drive to your home can see the actual setup and suggest small adjustments that make a big difference, such as moving the keyboard away from a drafty window or adjusting the bench height. The Volz site sometimes shares deals and guidance through their digital piano resources, which can be helpful if you do not know where to start shopping.

Remember that the instrument is a tool, not the final goal. A thoughtfully chosen keyboard combined with a patient teacher and a supportive home can help your child learn to play the piano step by step and enjoy the process.

<a href="#table-of-contents">Return to Table of Contents</a>
<h2 id="faq-kids-play-the-piano">Frequently Asked Questions about Kids Who Play the Piano</h2>
Parents across Utah often ask similar questions when their children start to play the piano. Here are practical answers to common concerns about piano lessons for kids and choosing a piano keyboard for your home.

<details><summary>What is the best age for a child to start to play the piano?</summary>Many children are ready to start beginner piano lessons for kids around ages five to eight. At that point, they can follow instructions, recognize simple symbols, and sit at the piano for a short lesson. Younger children can still explore music through singing, rhythm games, and playful time at the piano keyboard with a parent nearby. If you are unsure, a Volz teacher can meet your child and recommend whether to begin now or wait a little longer.

</details><details><summary>How long should kids practice each day?</summary>For most beginners, ten to twenty minutes of focused practice per day is enough to see progress. Short, regular sessions are better than one long practice once a week. Children who want to play the piano more can always extend their practice, but it is important to keep it enjoyable. Your Volz teacher can help you set a routine that fits your family’s schedule and your child’s attention span.

</details><details><summary>Do we need a full piano, or is a keyboard fine for kids?</summary>A full acoustic piano is wonderful, but not required when a child first learns to play the piano. Many families start with a digital piano or a full sized weighted keyboard. The most important features are full size keys, a realistic touch, and a stable stand and bench. As your child grows, you can upgrade the instrument if they continue to enjoy kids piano lessons in Utah and want to play more advanced music.

</details><details><summary>How do in home piano lessons with teachers who drive to you work?</summary>With Volz Piano, a trained teacher travels to your home at a scheduled time each week. They bring the complete Volz Piano Method for kids and adapt it to your child’s needs. Lessons happen on your own piano or keyboard, so students learn to play the piano in the same space where they practice. This “Piano Teachers that Drive to You” model is ideal for busy Utah families and for children who feel more relaxed at home.

</details><details><summary>What if my child has a short attention span?</summary>Many children who have trouble focusing at school do very well in kids piano lessons, especially when lessons are interactive. Volz teachers use games, short activities, and creative improvisation to keep students engaged. At home, you can support your child by keeping practice sessions short, breaking tasks into small steps, and praising effort. Over time, the habit of learning to play the piano can actually strengthen your child’s ability to concentrate.

</details><details><summary>Should kids learn music theory, or just play by ear?</summary>Both skills are valuable. The Volz Piano Method for kids includes music theory for kids in every lesson, but always in a hands on way that connects to real pieces. Children might learn how chords are built, then use them to accompany a melody. They also practice playing by ear through call and response games and simple improvisation. This balanced approach helps kids understand what they are playing instead of just memorizing patterns.

</details><details><summary>How can I tell if my child is really enjoying piano lessons?</summary>Signs that your child enjoys learning to play the piano include humming pieces away from the piano, asking to show you new songs, or walking over to the keyboard without being reminded. They may also talk about their kids piano lessons in Utah with friends or siblings. If you are not sure, talk openly with your child and with the teacher. Sometimes a small change in music style, practice routine, or lesson time is all that is needed for enthusiasm to return.

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
            How Kids Learn to Play the Piano: A Parent Guide to In Home Lessons in Utah
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            November 13, 2025
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/how-kids-learn-to-play-the-piano-a-parent-guide-to-in-home-lessons-in-utah.jpg"
              alt="Featured image for How Kids Learn to Play the Piano: A Parent Guide to In Home Lessons in Utah"
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
