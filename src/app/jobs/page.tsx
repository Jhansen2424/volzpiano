import Link from "next/link";
import StubPage from "@/app/components/StubPage";
import { APPLY_URL, JOB_OPENINGS } from "@/lib/jobs";

export default function JobsPage() {
  return (
    <StubPage
      badge="Careers"
      title="Teach With"
      highlight="Volz Piano"
      description="We hire dedicated piano teachers in each geographic area we serve. Every Volz Method teacher is trained for three months in the method as they begin teaching."
      primaryCta={{
        href: APPLY_URL,
        label: "Apply to Teach",
      }}
      body={
        <div className="text-center">
          <p className="text-zinc-600 leading-relaxed">
            Click the button below to fill out our teaching application. We
            review every submission and reach out when an opening matches your
            location and experience.
          </p>
          {JOB_OPENINGS.length > 0 && (
            <>
              <h2 className="mt-10 mb-4 text-xl font-bold text-zinc-900">
                Open positions
              </h2>
              <ul className="space-y-2">
                {JOB_OPENINGS.map((job) => (
                  <li key={job.slug}>
                    <Link
                      href={`/jobs/${job.slug}`}
                      className="font-bold text-accent underline-offset-4 hover:underline"
                    >
                      Piano Teacher in {job.city}, UT
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      }
    />
  );
}
