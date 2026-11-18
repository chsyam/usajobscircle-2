import Link from "next/link";
import { Calendar, MapPin, Star, Wallet } from "lucide-react";
import CompanyLogo from "@/components/common/CompanyLogo";
import SaveJobButton from "./SaveJobButton";
import { formatSalary, formatShortDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export default function JobCard({ job, headingLevel = "h3" }) {
  const Heading = headingLevel;
  const salary = formatSalary(job.salary);
  return (
    <article className={cn("job-card", job.featured && "is-featured")}>
      <Link href={`/employer/${job.employerSlug}`} aria-label={job.employer?.name} tabIndex={-1}>
        <CompanyLogo name={job.employer?.name || job.title} size={72} />
      </Link>
      <div className="job-card__body">
        <div className="job-card__badges">
          {job.featured && (
            <span className="badge badge--featured">
              <Star size={10} fill="currentColor" aria-hidden="true" /> Featured
            </span>
          )}
          <span className="badge badge--type">{job.type}</span>
        </div>
        <Heading className="job-card__title">
          <Link href={`/job/${job.slug}`}>{job.title}</Link>
        </Heading>
        {job.employer && (
          <Link href={`/employer/${job.employer.slug}`} className="job-card__company">
            {job.employer.name}
          </Link>
        )}
        <div className="job-card__meta">
          <span>
            <MapPin size={13} aria-hidden="true" /> {job.location}
          </span>
          <span>
            <Calendar size={13} aria-hidden="true" /> Posted <time dateTime={job.postedAt}>{formatShortDate(job.postedAt)}</time>
          </span>
          {salary && (
            <span>
              <Wallet size={13} aria-hidden="true" /> {salary}
            </span>
          )}
        </div>
      </div>
      <div className="job-card__actions">
        <SaveJobButton slug={job.slug} />
        <Link href={`/job/${job.slug}`} className="btn btn--outline btn--sm">
          View Job
        </Link>
      </div>
    </article>
  );
}
