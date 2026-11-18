import Link from "next/link";
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  DollarSign,
  GraduationCap,
  Layers,
  MapPin,
  Star,
  TrendingUp,
} from "lucide-react";
import CompanyLogo from "@/components/common/CompanyLogo";
import ShareButtons from "@/components/common/ShareButtons";
import FollowButton from "@/components/employers/FollowButton";
import ApplyButton from "./ApplyButton";
import SaveJobButton from "./SaveJobButton";
import { formatDate, formatSalary, truncate } from "@/lib/formatters";

function Section({ title, children }) {
  return (
    <section className="detail-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function CheckList({ items }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <CheckCircle2 size={16} aria-hidden="true" /> {item}
        </li>
      ))}
    </ul>
  );
}

export function JobHeader({ job }) {
  const salary = formatSalary(job.salary);
  return (
    <section className="detail-hero">
      <div className="container detail-hero__inner">
        <CompanyLogo name={job.employer?.name} size={110} />
        <div className="detail-hero__body">
          <div className="job-card__badges">
            {job.featured && (
              <span className="badge badge--featured">
                <Star size={10} fill="currentColor" aria-hidden="true" /> Featured
              </span>
            )}
            <span className="badge badge--type">{job.type}</span>
          </div>
          <h1>{job.title}</h1>
          <p className="detail-hero__company">
            at <Link href={`/employer/${job.employerSlug}`}>{job.employer?.name}</Link>
          </p>
          <ul className="detail-hero__meta">
            <li>
              <MapPin size={15} aria-hidden="true" /> {job.location}
            </li>
            <li>
              <Calendar size={15} aria-hidden="true" /> Posted {formatDate(job.postedAt)}
            </li>
            {salary && (
              <li>
                <DollarSign size={15} aria-hidden="true" /> {salary}
              </li>
            )}
          </ul>
        </div>
        <div className="detail-hero__actions">
          <ApplyButton job={job} />
          <SaveJobButton slug={job.slug} withLabel />
        </div>
      </div>
    </section>
  );
}

export default function JobDetails({ job, employer }) {
  const salary = formatSalary(job.salary);
  const overview = [
    { icon: DollarSign, label: "Offered Salary", value: salary || "Not disclosed" },
    { icon: Briefcase, label: "Job Type", value: job.type },
    { icon: TrendingUp, label: "Career Level", value: job.careerLevel },
    { icon: GraduationCap, label: "Experience", value: job.experience },
    { icon: Layers, label: "Industry", value: job.sector },
    { icon: MapPin, label: "Location", value: job.location },
    { icon: Calendar, label: "Date Posted", value: formatDate(job.postedAt) },
  ];

  return (
    <div className="container section">
      <div className="layout-sidebar layout-sidebar--right">
        <article className="detail-main">
          <Section title="Job Description">
            <p>{job.description}</p>
          </Section>
          <Section title="Key Responsibilities">
            <CheckList items={job.responsibilities} />
          </Section>
          <Section title="Required Skills">
            <ul className="tag-list">
              {job.skills.map((s) => (
                <li key={s} className="tag">
                  {s}
                </li>
              ))}
            </ul>
          </Section>
          <Section title="Qualifications">
            <CheckList items={job.qualifications} />
          </Section>
          <Section title="Additional Information">
            <CheckList items={job.additional} />
          </Section>
          <div className="detail-share">
            <span>Share this job:</span>
            <ShareButtons path={`/job/${job.slug}`} title={job.title} />
          </div>
          <div className="detail-cta">
            <ApplyButton job={job} />
            <SaveJobButton slug={job.slug} withLabel />
          </div>
        </article>

        <aside className="detail-aside">
          <section className="card">
            <div className="card__body">
              <h2 className="card__title">Job Overview</h2>
              <ul className="overview-list">
                {overview.map(({ icon: Ico, label, value }) => (
                  <li key={label}>
                    <Ico size={20} aria-hidden="true" />
                    <div>
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </div>
                  </li>
                ))}
              </ul>
              <ApplyButton job={job} block />
            </div>
          </section>

          {employer && (
            <section className="card employer-mini">
              <div className="card__body">
                <h2 className="card__title">About the Employer</h2>
                <div className="employer-mini__head">
                  <CompanyLogo name={employer.name} size={60} />
                  <div>
                    <h3>
                      <Link href={`/employer/${employer.slug}`}>{employer.name}</Link>
                    </h3>
                    <span className="muted">{employer.city}, {employer.state}</span>
                  </div>
                </div>
                <p>{truncate(employer.about[0], 180)}</p>
                <div className="employer-mini__actions">
                  <Link href={`/employer/${employer.slug}`} className="btn btn--primary btn--sm">
                    View Profile
                  </Link>
                  <FollowButton slug={employer.slug} />
                </div>
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
