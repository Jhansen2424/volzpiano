import StubPage from "@/app/components/StubPage";

export default function AboutUsPage() {
  return (
    <StubPage
      badge="About Us"
      title="In-Home Piano Lessons,"
      highlight="Built Around Your Child"
      description="Volz Method Piano Lessons brings expert teachers directly to your home — across Utah and Idaho — and tailors every lesson to how your child naturally learns."
      body={
        <div className="prose prose-zinc max-w-none">
          <p className="text-zinc-600 leading-relaxed">
            We started Volz Piano because we believe there&apos;s no single
            &ldquo;right&rdquo; way to learn music. Some kids thrive on reading
            sheet music. Others learn best by ear, by feel, or by inventing
            their own songs. The <strong>Volz Method</strong> is built around
            those four pillars — Reading, Composing, Hearing, and Arranging —
            and every teacher we hire is trained for three months in the method
            before they ever teach a single lesson.
          </p>
          <p className="text-zinc-600 leading-relaxed mt-4">
            Our teachers drive to your house, so lessons happen in the comfort
            of your child&apos;s own piano. No carpool. No waiting room. Just
            your child, their teacher, and the music they actually want to
            play.
          </p>
        </div>
      }
    />
  );
}
