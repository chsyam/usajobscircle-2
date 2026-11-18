import { notFound } from "next/navigation";
import Breadcrumb from "@/components/layout/Breadcrumb";
import JobDetails, { JobHeader } from "@/components/jobs/JobDetails";
import RelatedJobs from "@/components/jobs/RelatedJobs";
import { getJobBySlug, getJobSlugs, getSimilarJobs } from "@/services/jobService";
import { getEmployerBySlug } from "@/services/employerService";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/constants";

// Read params up front so unknown slugs return a real 404 status.
// Known slugs are prerendered via generateStaticParams, so navigation stays fast.
export const instant = false;

export async function generateStaticParams() {
  const slugs = await getJobSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return { title: "Job not found" };
  return buildMetadata({
    title: `${job.title} at ${job.employer?.name}`,
    description: job.summary,
    path: `/job/${job.slug}`,
  });
}

function jobPostingJsonLd(job, employer) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.postedAt,
    employmentType: job.type.toUpperCase().replace(/\s+/g, "_"),
    hiringOrganization: { "@type": "Organization", name: employer?.name, sameAs: employer?.website },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: job.city, addressRegion: job.state, addressCountry: "US" },
    },
    ...(job.salary && {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: { "@type": "QuantitativeValue", minValue: job.salary.min, maxValue: job.salary.max, unitText: job.salary.period.toUpperCase() },
      },
    }),
    url: `${SITE.url}/job/${job.slug}`,
  };
}

export default async function JobPage({ params }) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) notFound();

  const [employer, similar] = await Promise.all([getEmployerBySlug(job.employerSlug), getSimilarJobs(job, 3)]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd(job, employer)).replace(/</g, "\\u003c") }}
      />
      <Breadcrumb items={[{ label: "Jobs", href: "/jobs-listing" }, { label: job.title }]} />
      <JobHeader job={job} />
      <JobDetails job={job} employer={employer} />
      <RelatedJobs jobs={similar} />
    </>
  );
}
