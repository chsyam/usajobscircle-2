import { notFound } from "next/navigation";
import Breadcrumb from "@/components/layout/Breadcrumb";
import CandidateProfile from "@/components/candidates/CandidateProfile";
import { getCandidateBySlug, getCandidateSlugs } from "@/services/candidateService";
import { buildMetadata } from "@/lib/metadata";

// Read params up front so unknown slugs return a real 404 status.
// Known slugs are prerendered via generateStaticParams, so navigation stays fast.
export const instant = false;

export async function generateStaticParams() {
  const slugs = await getCandidateSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const candidate = await getCandidateBySlug(slug);
  if (!candidate) return { title: "Candidate not found" };
  return buildMetadata({
    title: `${candidate.name} – ${candidate.title}`,
    description: candidate.summary,
    path: `/candidate/${candidate.slug}`,
    image: candidate.avatar,
  });
}

export default async function CandidatePage({ params }) {
  const { slug } = await params;
  const candidate = await getCandidateBySlug(slug);
  if (!candidate) notFound();
  return (
    <>
      <Breadcrumb items={[{ label: "Candidates", href: "/candidate-with-search" }, { label: candidate.name }]} />
      <CandidateProfile candidate={candidate} />
    </>
  );
}
