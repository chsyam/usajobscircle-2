import Link from "next/link";
import SectionHeading from "@/components/common/SectionHeading";
import JobCard from "@/components/jobs/JobCard";
import EmptyState from "@/components/common/EmptyState";

export default function FeaturedJobs({ jobs }) {
  return (
    <section className="section" aria-labelledby="featured-jobs-title">
      <div className="container">
        <SectionHeading title={<span id="featured-jobs-title">Featured Jobs Listings</span>} />
        {jobs.length === 0 ? (
          <EmptyState title="No featured jobs right now" message="Check back soon or browse all open positions." action={<Link href="/jobs-listing" className="btn btn--primary">Browse Jobs</Link>} />
        ) : (
          <div className="stack">
            {jobs.map((job) => (
              <JobCard key={job.slug} job={job} />
            ))}
          </div>
        )}
        <div className="text-center" style={{ marginTop: 34 }}>
          <Link href="/jobs-listing" className="btn btn--primary">
            View All Jobs
          </Link>
        </div>
      </div>
    </section>
  );
}
