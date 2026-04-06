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

  const content = `<p>Choosing the right piano lessons for your child in Salt Lake County can feel overwhelming, especially with so many options available. This guide simplifies the process by providing everything you need to know about piano lessons for kids, from finding the best teachers to understanding different teaching methods. Whether you're looking for in-home lessons, group classes, or a specific approach like the Volz piano method, this blog post covers it all. We’ll also explore how to choose the right lessons for your child’s age and skill level, and why Salt Lake County is an ideal place for young musicians to thrive. By the end, you’ll have a clear roadmap to help your child start their musical journey with confidence.</p>

<h2 class="wp-block-heading"><a id="table-of-contents">Table of Contents</a></h2>

<ul class="wp-block-list"></p>
<li><a href="#why-piano-lessons-are-essential-for-kids-in-salt-lake-county">Why Piano Lessons Are Essential for Kids in Salt Lake County</a></li>

<li><a href="#choosing-the-best-piano-lessons-for-kids-in-salt-lake-county">Choosing the Best Piano Lessons for Kids in Salt Lake County</a><br />
<ul class="wp-block-list"></p>
<li><a href="#what-to-look-for-in-a-piano-teacher">What to Look for in a Piano Teacher</a></li>

<li><a href="#in-home-vs-studio-lessons-which-is-better">In-Home vs. Studio Lessons: Which Is Better?</a></li>
<p></ul>
<p></li>

<li><a href="#the-volz-piano-method-a-unique-approach-for-children">The Volz Piano Method: A Unique Approach for Children</a></li>

<li><a href="#piano-lessons-for-different-age-groups">Piano Lessons for Different Age Groups</a><br />
<ul class="wp-block-list"></p>
<li><a href="#piano-lessons-for-toddlers-and-preschoolers">Piano Lessons for Toddlers and Preschoolers</a></li>

<li><a href="#piano-lessons-for-school-aged-children">Piano Lessons for School-Aged Children</a></li>
<p></ul>
<p></li>

<li><a href="#group-vs-private-piano-lessons-whats-best-for-your-child">Group vs. Private Piano Lessons: What’s Best for Your Child?</a></li>

<li><a href="#how-to-prepare-your-child-for-piano-lessons">How to Prepare Your Child for Piano Lessons</a></li>

<li><a href="#the-benefits-of-learning-piano-at-a-young-age">The Benefits of Learning Piano at a Young Age</a></li>

<li><a href="#faqs-about-piano-lessons-for-kids-in-salt-lake-county">FAQs About Piano Lessons for Kids in Salt Lake County</a></li>
<p></ul>

<h2 class="wp-block-heading"><a id="why-piano-lessons-are-essential-for-kids-in-salt-lake-county">Why Piano Lessons Are Essential for Kids in Salt Lake County</a></h2>

<p>Piano lessons for kids in Salt Lake County are more than just a fun extracurricular activity. They provide a foundation for cognitive development, emotional growth, and lifelong skills that benefit children in countless ways. The act of learning to play the piano engages multiple areas of the brain, improving memory, concentration, and problem-solving abilities. For parents in Salt Lake County, where the arts and education are highly valued, enrolling your child in piano lessons is an investment in their future.</p>

<p>Salt Lake County boasts a thriving music community, making it an ideal place for young musicians to grow. From local recitals to school programs, kids have plenty of opportunities to showcase their talents. Piano lessons teach discipline as children practice regularly to master new pieces. They also foster creativity, allowing kids to express themselves through music. Whether your child dreams of becoming a concert pianist or simply wants to enjoy playing for fun, starting piano lessons early sets them up for success.</p>

<p>One standout option in Salt Lake County is <a href="https://volzpiano.com/">Volz Piano</a>, which offers a unique "Piano Teachers that Drive to You" setup. This service brings professional instructors directly to your home, eliminating the stress of commuting to a studio. Volz Piano also uses the Volz piano method, a creative and engaging approach tailored to kids. With options like this, Salt Lake County parents have access to some of the best music education resources available.</p>

<p>The benefits extend beyond music. Studies show that children who learn an instrument like the piano perform better in school, particularly in math and language skills. The structured nature of piano lessons helps kids develop time management and perseverance, qualities that serve them well in all areas of life. In a place like Salt Lake County, with its supportive community and abundant resources, piano lessons can truly help your child thrive.</p>

<p><a href="#table-of-contents">Return to Table of Contents</a></p>

<h2 class="wp-block-heading"><a id="choosing-the-best-piano-lessons-for-kids-in-salt-lake-county">Choosing the Best Piano Lessons for Kids in Salt Lake County</a></h2>

<p>With so many piano lesson options in Salt Lake County, finding the best fit for your child can feel like a challenge. The key is to consider your child’s personality, your family’s schedule, and the type of instruction that will keep them motivated. From private lessons to group classes, Salt Lake County offers a variety of formats and teaching styles. Let’s break down the most important factors to help you make an informed decision.</p>

<h3 class="wp-block-heading"><a id="what-to-look-for-in-a-piano-teacher">What to Look for in a Piano Teacher</a></h3>

<p>The right piano teacher can make all the difference in your child’s musical journey. When searching for a piano teacher in Salt Lake County, prioritize experience with children. A teacher who understands how kids learn will know how to keep lessons engaging and productive. Patience is essential, especially for beginners who may struggle with new concepts. Look for someone who encourages your child and celebrates their progress, no matter how small.</p>

<p>Qualifications matter too. A teacher with a background in music education or performance can provide a strong technical foundation. However, teaching style is just as important as credentials. Some kids respond well to a structured, traditional approach, while others thrive with a more creative method. <a href="https://volzpiano.com/">Volz Piano</a> stands out here, offering teachers trained in the Volz piano method. This approach adapts to each child’s strengths, incorporating composition and ear training for a well-rounded experience.</p>

<p>In Salt Lake County, many piano teachers offer trial lessons. Take advantage of these to see how your child interacts with the instructor. Ask about their lesson plans and how they handle challenges like a lack of practice or frustration. A good teacher will communicate openly with both you and your child, ensuring everyone is on the same page. By finding the right match, you set your child up for a positive and rewarding piano learning experience.</p>

<h3 class="wp-block-heading"><a id="in-home-vs-studio-lessons-which-is-better">In-Home vs. Studio Lessons: Which Is Better?</a></h3>

<p>One of the biggest decisions you’ll face is choosing between in-home and studio piano lessons. Each option has its advantages, and the best choice depends on your family’s needs. In-home lessons, like those offered by <a href="https://volzpiano.com/">Volz Piano</a>, bring the teacher to your doorstep. This "Piano Teachers that Drive to You" setup is a game-changer for busy Salt Lake County families. It saves time, reduces stress, and lets your child learn in a familiar environment where they feel comfortable.</p>

<p>Comfort is a big factor. Kids often focus better at home, free from the distractions of a new setting. In-home lessons also eliminate the need for you to pack up and drive after a long day. Volz Piano’s instructors bring everything they need, including teaching materials tailored to the Volz piano method. This method emphasizes creativity and flexibility, making it a great fit for kids who might feel intimidated by a formal studio atmosphere.</p>

<p>Studio lessons, on the other hand, offer a different set of benefits. Many studios in Salt Lake County, like The Piano Place, have high-quality pianos and soundproof rooms that enhance the learning experience. The structured setting can help kids develop a sense of routine and seriousness about their practice. Studios may also offer group classes or recitals, giving your child a chance to connect with other young musicians. If your child thrives in social settings or needs access to advanced equipment, a studio might be the way to go.</p>

<p>Consider your child’s personality and your logistics. A shy child might prefer the privacy of in-home lessons, while an outgoing one could enjoy the energy of a studio. Think about your schedule too—can you commit to driving weekly, or would in-home lessons simplify your life? In Salt Lake County, you’re fortunate to have both options readily available, so weigh the pros and cons carefully.</p>

<p><a href="#table-of-contents">Return to Table of Contents</a></p>

<h2 class="wp-block-heading"><a id="the-volz-piano-method-a-unique-approach-for-children">The Volz Piano Method: A Unique Approach for Children</a></h2>

<p>When it comes to innovative piano instruction, the Volz piano method is a standout choice for kids in Salt Lake County. Offered exclusively by <a href="https://volzpiano.com/">Volz Piano</a>, this method takes a fresh approach to music education. Unlike traditional lessons that focus heavily on reading sheet music, the Volz piano method emphasizes creativity, composition, and ear training. It’s designed to tap into each child’s natural abilities, making piano lessons fun and rewarding.</p>

<p>The Volz piano method starts with the idea that every child learns differently. Some kids excel at memorizing notes, while others shine when they’re allowed to improvise. By tailoring lessons to these strengths, Volz Piano keeps children engaged. For example, a child who loves jazz might learn to play by ear, while another who enjoys storytelling could compose their own pieces. This flexibility helps kids build confidence and a deeper connection to music.</p>

<p>Parents in Salt Lake County rave about how the Volz piano method transforms their child’s experience. Traditional lessons can feel rigid, with hours spent drilling scales and memorizing theory. The Volz approach breaks that mold, blending technical skills with creative exploration. Kids learn to play songs they love while also developing a strong musical foundation. It’s particularly effective for children who might otherwise lose interest in piano lessons.</p>

<p>Another perk is the convenience of Volz Piano’s in-home setup. With "Piano Teachers that Drive to You," your child gets personalized instruction without leaving home. This combination of a unique method and practical delivery makes Volz Piano a top choice for Salt Lake County families. If you’re looking for a way to spark your child’s passion for music, the Volz piano method could be the perfect solution.</p>

<p><a href="#table-of-contents">Return to Table of Contents</a></p>

<h2 class="wp-block-heading"><a id="piano-lessons-for-different-age-groups">Piano Lessons for Different Age Groups</a></h2>

<p>Not all piano lessons are created equal, especially when it comes to age. Children’s needs and abilities change as they grow, so finding age-appropriate instruction is key. In Salt Lake County, you’ll find programs tailored to every stage, from toddlers to teens. Here’s a detailed look at what to expect for different age groups and how to choose the best piano lessons for your child.</p>

<h3 class="wp-block-heading"><a id="piano-lessons-for-toddlers-and-preschoolers">Piano Lessons for Toddlers and Preschoolers</a></h3>

<p>Starting piano lessons for toddlers and preschoolers is all about building a love for music. At ages 3 to 5, kids aren’t ready for complex theory or long practice sessions. Instead, lessons should be short—15 to 30 minutes—and packed with fun activities. Look for teachers in Salt Lake County who use games, songs, and movement to teach basic concepts like rhythm, pitch, and melody. The goal is to make music a joyful part of their lives.</p>

<p>Programs like those at The Piano Place cater specifically to this age group. They might use colorful props or simple hand exercises to introduce the piano. A good teacher will keep things light and playful, ensuring your child stays excited about coming back. At this stage, don’t worry about progress in the traditional sense. If your toddler can clap a beat or press a key with a smile, they’re on the right track.</p>

<p>For parents considering in-home options, <a href="https://volzpiano.com/">Volz Piano</a> can adapt the Volz piano method for young learners. Their teachers bring a gentle, creative approach to your home, focusing on exploration rather than structure. This can be ideal for preschoolers who feel more at ease in a familiar setting. Whatever you choose, keep expectations low and enthusiasm high—early exposure lays the groundwork for future success.</p>

<h3 class="wp-block-heading"><a id="piano-lessons-for-school-aged-children">Piano Lessons for School-Aged Children</a></h3>

<p>Once kids reach school age—typically 6 to 12—they’re ready for more structured piano lessons. This is the sweet spot for building skills like note-reading, finger technique, and music theory. School-aged children have better attention spans and motor skills, allowing them to tackle longer lessons (30 to 45 minutes) and more challenging pieces. In Salt Lake County, you’ll find plenty of options to match their growing abilities.</p>

<p>Private lessons are often the best choice at this stage. They provide one-on-one attention, letting the teacher focus on your child’s specific needs and goals. <a href="https://volzpiano.com/">Volz Piano</a> excels here, offering in-home lessons with the Volz piano method. Their instructors tailor each session, blending traditional skills with creative exercises like improvisation. This keeps school-aged kids motivated, especially if they’re juggling homework and other activities.</p>

<p>Group classes, like those at School of Rock Salt Lake City, can also work well. They add a social element, which some kids find inspiring. However, progress might be slower in a group, as the teacher splits their focus. For faster results, stick with private lessons. Encourage your child to practice 20 to 30 minutes daily, and look for teachers who assign pieces they enjoy—whether it’s pop songs or classical works. This age is a critical time to solidify their love for piano.</p>

<p><a href="#table-of-contents">Return to Table of Contents</a></p>

<h2 class="wp-block-heading"><a id="group-vs-private-piano-lessons-whats-best-for-your-child">Group vs. Private Piano Lessons: What’s Best for Your Child?</a></h2>

<p>Deciding between group and private piano lessons is a big step for Salt Lake County parents. Both formats have unique strengths, and the right choice depends on your child’s personality, learning style, and goals. Let’s dive into the details to help you figure out what’s best.</p>

<p>Group piano lessons bring kids together in a shared learning environment. Places like School of Rock Salt Lake City offer these classes, often combining piano with other instruments for a band-like experience. The social aspect is a major draw—kids make friends, learn teamwork, and gain confidence performing for peers. Group lessons are also typically more affordable, with costs ranging from $20 to $40 per session in Salt Lake County.</p>

<p>However, group lessons have downsides. With multiple students, your child gets less individual attention. The teacher must cater to the group’s average skill level, which might leave beginners struggling or advanced players bored. If your child needs extra help or wants to progress quickly, this format might not suffice. It’s best for outgoing kids who thrive in collaborative settings and don’t mind a slower pace.</p>

<p>Private piano lessons, by contrast, offer personalized instruction. In Salt Lake County, teachers like those from <a href="https://volzpiano.com/">Volz Piano</a> provide one-on-one lessons tailored to your child’s needs. With the Volz piano method, they get a mix of technical training and creative freedom, ensuring steady progress. Private lessons cost more—$30 to $60 per half-hour—but the investment pays off with faster skill development and a stronger teacher-student bond.</p>

<p>The choice comes down to priorities. If your child is shy or has specific goals (like preparing for a recital), private lessons are ideal. If they love socializing and you’re focused on fun over speed, group lessons could be perfect. Many Salt Lake County families even try both over time, starting with group classes and switching to private as their child’s interest deepens.</p>

<p><a href="#table-of-contents">Return to Table of Contents</a></p>

<h2 class="wp-block-heading"><a id="how-to-prepare-your-child-for-piano-lessons">How to Prepare Your Child for Piano Lessons</a></h2>

<p>Starting piano lessons is an exciting milestone, but preparation can make it even smoother. In Salt Lake County, where options like <a href="https://volzpiano.com/">Volz Piano</a> make lessons accessible, setting your child up for success is straightforward. Here’s how to get them ready for their musical journey.</p>

<p>First, create a dedicated practice space at home. Choose a quiet corner free from distractions like TV or foot traffic. If you have a piano or keyboard, place it there with a comfortable bench or chair. Good lighting and a music stand are bonuses. For in-home lessons with Volz Piano’s "Piano Teachers that Drive to You" setup, this space becomes the classroom, so keep it organized and welcoming.</p>

<p>Next, set realistic goals. Talk to your child about why they want to learn piano—maybe they love a song or want to impress their friends. Break it down into small steps, like learning one new key per week. Encourage daily practice, even if it’s just 10 to 15 minutes for beginners. Consistency beats intensity at first. With the Volz piano method, kids often stay motivated because lessons are tailored to their interests.</p>

<p>Support is crucial. Attend the first few lessons if possible, especially with younger kids, to show your involvement. Ask the teacher for tips on helping at home, like clapping rhythms together. Celebrate every milestone—a mastered scale or a finished song—to build their confidence. Avoid pushing too hard; let them enjoy the process. In Salt Lake County’s nurturing music scene, a positive start can spark a lifelong passion.</p>

<p><a href="#table-of-contents">Return to Table of Contents</a></p>

<h2 class="wp-block-heading"><a id="the-benefits-of-learning-piano-at-a-young-age">The Benefits of Learning Piano at a Young Age</a></h2>

<p>Learning piano at a young age offers a wealth of benefits that go far beyond music. In Salt Lake County, where kids have access to top-tier programs like <a href="https://volzpiano.com/">Volz Piano</a>, these advantages are within reach. From brain development to emotional well-being, here’s why piano lessons are a game-changer for children.</p>

<p>Cognitively, piano playing is a workout for the mind. It engages both hemispheres of the brain, boosting memory and spatial reasoning. Kids who study piano often excel in math, as they learn to recognize patterns and count beats. Reading music sharpens language skills, similar to decoding a new alphabet. Research shows that young musicians score higher on standardized tests, giving them an academic edge.</p>

<p>Physically, piano lessons enhance coordination. Pressing keys with one hand while the other plays a different rhythm builds dexterity and fine motor skills. This can translate to better handwriting or sports performance. For Salt Lake County kids, who often balance school with outdoor activities, this physical boost is a bonus.</p>

<p>Emotionally, piano offers an outlet for expression. Kids learn to channel feelings into music, whether they’re playing a cheerful tune or a moody piece. It teaches resilience too—mastering a tough passage takes patience and grit. The Volz piano method, with its focus on creativity, amplifies this by letting kids compose their own songs, fostering a sense of ownership.</p>

<p>Socially, piano connects kids to their community. Salt Lake County hosts recitals, festivals, and school events where young pianists shine. Performing builds confidence and public speaking skills. Even if your child never plays professionally, these benefits last a lifetime, shaping them into well-rounded individuals.</p>

<p><a href="#table-of-contents">Return to Table of Contents</a></p>

<h2 class="wp-block-heading"><a id="faqs-about-piano-lessons-for-kids-in-salt-lake-county">FAQs About Piano Lessons for Kids in Salt Lake County</a></h2>

<details>
<summary>1. What is the best age to start piano lessons for kids?</summary>
<p>Most experts suggest starting piano lessons between ages 5 and 7, when kids have the attention span and motor skills to learn effectively. However, Salt Lake County offers programs for toddlers as young as 3, focusing on play-based music exploration. It depends on your child’s readiness and interest.</p>
</details>

<details>
<summary>2. How much do piano lessons cost in Salt Lake County?</summary>
<p>Piano lessons in Salt Lake County range from $30 to $60 per half-hour for private sessions, depending on the teacher’s experience and location. Group lessons, like those at School of Rock Salt Lake City, can be cheaper, starting at $20 per class. In-home options from <a href="https://volzpiano.com/">Volz Piano</a> fall within this range too.</p>
</details>

<details>
<summary>3. Are in-home piano lessons better than studio lessons?</summary>
<p>In-home lessons, such as Volz Piano’s "Piano Teachers that Drive to You" service, offer convenience and comfort, ideal for busy families or shy kids. Studio lessons provide better equipment and a structured vibe, suiting kids who thrive in formal settings. It’s about what fits your child best.</p>
</details>

<details>
<summary>4. What is the Volz piano method?</summary>
<p>The Volz piano method, offered by <a href="https://volzpiano.com/">Volz Piano</a>, is a strengths-based approach for kids. It blends creativity—like composition and jazz—with traditional skills, adapting to each child’s learning style for an engaging, personalized experience.</p>
</details>

<details>
<summary>5. How can I find the best piano teacher for my child in Salt Lake County?</summary>
<p>Look for teachers with kid-friendly experience, a positive attitude, and a method that excites your child. Check reviews, ask for trial lessons, and consider options like Volz Piano for in-home convenience. Match the teacher to your child’s personality and goals.</p>
</details>

<div style="height:30px" aria-hidden="true" class="wp-block-spacer"></div>

<p><a href="#table-of-contents">Return to Table of Contents</a></p>
<p></p>`;

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
            Piano Lessons in Salt Lake County: The Ultimate Guide for Kids and Parents
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            April 13, 2025
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/piano-lessons-in-salt-lake-county-the-ultimate-guide-for-kids-and-parents.png"
              alt="Featured image for Piano Lessons in Salt Lake County: The Ultimate Guide for Kids and Parents"
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
