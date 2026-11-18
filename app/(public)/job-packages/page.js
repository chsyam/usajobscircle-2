import Link from "next/link";
import PageTitle from "@/components/layout/PageTitle";
import SectionHeading from "@/components/common/SectionHeading";
import PricingCard, { PackageRow } from "@/components/pricing/PricingCard";
import ServicesSection from "@/components/sections/ServicesSection";
import { getAdditionalPackages, getFeaturedServices, getPackages } from "@/services/packageService";
import { SECTION_SUBTITLE } from "@/lib/constants";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Job Packages",
  description: "Post jobs, get featured on demand and reach more candidates with Standard, Silver, Golden and Premium job packages.",
  path: "/job-packages",
});

export default async function JobPackagesPage() {
  const [packages, additional, services] = await Promise.all([getPackages("job"), getAdditionalPackages("job"), getFeaturedServices()]);
  return (
    <>
      <PageTitle title="Job Packages" />
      <ServicesSection services={services} />

      <section className="section section--light" aria-label="Job pricing plans">
        <div className="container">
          <SectionHeading title="Our Job Packages" />
          <div className="pricing-grid pricing-grid--4">
            {packages.map((pkg) => (
              <PricingCard key={pkg.id} pkg={pkg} variant="simple" type="job" ctaLabel="Sign up" />
            ))}
          </div>
        </div>
      </section>

      <section className="banner-strip" aria-label="Find the right fit">
        <div className="container">
          <h2>Find the one that&apos;s right for you.</h2>
          <p>{SECTION_SUBTITLE}</p>
          <Link href="/dashboard/employer/jobs/new" className="btn btn--white">
            Post a Job
          </Link>
        </div>
      </section>

      <section className="section" aria-label="Buy additional job packages">
        <div className="container">
          <SectionHeading title="Buy additional job packages" />
          {additional.map((pkg) => (
            <PackageRow key={pkg.id} pkg={pkg} type="job" ctaLabel="Proceed" label="Best Value" />
          ))}
        </div>
      </section>
    </>
  );
}
