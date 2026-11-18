import PageTitle from "@/components/layout/PageTitle";
import SectionHeading from "@/components/common/SectionHeading";
import PricingCard, { PackageRow } from "@/components/pricing/PricingCard";
import { CircleFeatures } from "@/components/sections/ServicesSection";
import PromoSection from "@/components/home/PromoSection";
import Testimonials from "@/components/home/Testimonials";
import { getAdditionalPackages, getCvServices, getPackages } from "@/services/packageService";
import { testimonials } from "@/data/testimonials";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "CV Packages",
  description: "Plans that grow with your business. Access resumes, feature candidates and get premium support with our CV packages.",
  path: "/cv-packages",
});

export default async function CvPackagesPage() {
  const [packages, additional, services] = await Promise.all([getPackages("cv"), getAdditionalPackages("cv"), getCvServices()]);
  return (
    <>
      <PageTitle title="CV Packages" />

      <section className="section" aria-label="CV pricing plans">
        <div className="container">
          <SectionHeading title="Plans that grow with your business" />
          <div className="pricing-grid">
            {packages.map((pkg) => (
              <PricingCard key={pkg.id} pkg={pkg} type="cv" ctaLabel="Get Started" />
            ))}
          </div>
        </div>
      </section>

      <CircleFeatures title="What we have" items={services} light />

      <section className="section" aria-label="Buy additional CV packages">
        <div className="container">
          <SectionHeading title="Buy additional C.V packages" />
          {additional.map((pkg) => (
            <PackageRow key={pkg.id} pkg={pkg} type="cv" ctaLabel="Choose Plan" label="Special C.V Offer" />
          ))}
        </div>
      </section>

      <PromoSection />
      <Testimonials items={testimonials} />
    </>
  );
}
