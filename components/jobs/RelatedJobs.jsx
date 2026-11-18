import SectionHeading from "@/components/common/SectionHeading";
import JobCard from "./JobCard";

export default function RelatedJobs({ jobs, title = "Similar Jobs" }) {
  if (!jobs.length) return null;
  return (
    <section className="section section--light" aria-label={title}>
      <div className="container">
        <SectionHeading title={title} subtitle="More opportunities you may be interested in." />
        <div className="stack">
          {jobs.map((job) => (
            <JobCard key={job.slug} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}
