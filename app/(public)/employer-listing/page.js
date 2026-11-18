import { Suspense } from "react";
import PageTitle from "@/components/layout/PageTitle";
import EmployersListing from "@/components/employers/EmployersListing";
import { SkeletonList } from "@/components/common/Loader";
import { getEmployers } from "@/services/employerService";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Employer Listing",
  description: "Discover companies hiring across the USA. Filter employers by location, sector and team size.",
  path: "/employer-listing",
});

export default async function EmployerListingPage() {
  const employers = await getEmployers();
  return (
    <>
      <PageTitle title="Employer Listing" />
      <Suspense
        fallback={
          <div className="container section">
            <SkeletonList rows={4} />
          </div>
        }
      >
        <EmployersListing employers={employers} />
      </Suspense>
    </>
  );
}
