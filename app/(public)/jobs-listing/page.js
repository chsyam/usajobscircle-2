import { Suspense } from "react";
import PageTitle from "@/components/layout/PageTitle";
import JobsListing from "@/components/jobs/JobsListing";
import { SkeletonList } from "@/components/common/Loader";
import { getJobs } from "@/services/jobService";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Jobs Listing",
  description: "Browse and filter open jobs across the USA by keyword, location, sector, job type and date posted.",
  path: "/jobs-listing",
});

export default async function JobsListingPage() {
  const jobs = await getJobs();
  return (
    <>
      <PageTitle title="Jobs Listing" />
      <Suspense
        fallback={
          <div className="container section">
            <SkeletonList rows={5} />
          </div>
        }
      >
        <JobsListing jobs={jobs} />
      </Suspense>
    </>
  );
}
