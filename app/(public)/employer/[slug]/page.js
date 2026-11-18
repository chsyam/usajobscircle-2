import { notFound } from "next/navigation";
import Breadcrumb from "@/components/layout/Breadcrumb";
import EmployerProfile from "@/components/employers/EmployerProfile";
import { getEmployerBySlug, getEmployerSlugs } from "@/services/employerService";
import { getJobsByEmployer } from "@/services/jobService";
import { buildMetadata } from "@/lib/metadata";

// Read params up front so unknown slugs return a real 404 status.
// Known slugs are prerendered via generateStaticParams, so navigation stays fast.
export const instant = false;

export async function generateStaticParams() {
  const slugs = await getEmployerSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const employer = await getEmployerBySlug(slug);
  if (!employer) return { title: "Employer not found" };
  return buildMetadata({
    title: employer.name,
    description: `${employer.tagline} View open positions at ${employer.name} in ${employer.city}, ${employer.state}.`,
    path: `/employer/${employer.slug}`,
  });
}

export default async function EmployerPage({ params }) {
  const { slug } = await params;
  const employer = await getEmployerBySlug(slug);
  if (!employer) notFound();
  const jobs = await getJobsByEmployer(slug);
  return (
    <>
      <Breadcrumb items={[{ label: "Employers", href: "/employer-listing" }, { label: employer.name }]} />
      <EmployerProfile employer={employer} jobs={jobs} />
    </>
  );
}
