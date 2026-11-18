import { Suspense } from "react";
import PageTitle from "@/components/layout/PageTitle";
import CandidatesListing from "@/components/candidates/CandidatesListing";
import { SkeletonList } from "@/components/common/Loader";
import { getCandidates } from "@/services/candidateService";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Candidate With Search",
  description: "Search candidate profiles by skills, sector, location and experience.",
  path: "/candidate-with-search",
});

export default async function CandidatesPage() {
  const candidates = await getCandidates();
  return (
    <>
      <PageTitle title="Candidate With Search" />
      <Suspense
        fallback={
          <div className="container section">
            <SkeletonList rows={4} />
          </div>
        }
      >
        <CandidatesListing candidates={candidates} />
      </Suspense>
    </>
  );
}
