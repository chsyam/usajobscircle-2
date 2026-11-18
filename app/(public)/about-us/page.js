import Image from "next/image";
import Link from "next/link";
import PageTitle from "@/components/layout/PageTitle";
import SectionHeading from "@/components/common/SectionHeading";
import StatisticsSection from "@/components/home/StatisticsSection";
import Testimonials from "@/components/home/Testimonials";
import PromoSection from "@/components/home/PromoSection";
import ServicesSection from "@/components/sections/ServicesSection";
import { getFeaturedServices } from "@/services/packageService";
import { team, testimonials } from "@/data/testimonials";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About us",
  description: "Learn about usajobscircle – connecting job seekers with the right path and employers with the right talent across the USA.",
  path: "/about-us",
});

const aboutImages = [6, 20, 26, 48];

export default async function AboutPage() {
  const services = await getFeaturedServices();
  return (
    <>
      <PageTitle title="About us" />

      <section className="section" aria-labelledby="about-title">
        <div className="container about-intro">
          <div>
            <h2 id="about-title" className="about-intro__title">
              About Our Company
            </h2>
            <p className="about-intro__lead">
              We connect ambitious people with employers who value them — and make every step of the hiring journey simpler.
            </p>
            <p>
              usajobscircle was founded to make job searching more human. We bring together thousands of open positions from
              trusted employers across the United States, with tools that help candidates find the right fit faster.
            </p>
            <p>
              For employers, we offer a modern way to advertise roles, search resumes and manage applicants — all from one
              dashboard. Whether you&apos;re hiring one person or a hundred, we&apos;re here to help you build great teams.
            </p>
            <Link href="/jobs-listing" className="btn btn--primary btn--lg">
              Search Jobs
            </Link>
          </div>
          <div className="about-intro__images" aria-hidden="true">
            {aboutImages.map((id) => (
              <div key={id} className="about-intro__diamond">
                <Image src={`https://picsum.photos/id/${id}/400/400`} alt="" fill sizes="200px" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section--light" style={{ borderTop: "1px solid var(--border)" }}>
        <StatisticsSection
          bordered={false}
          stats={[
            { label: "Jobs Added", value: 123012 },
            { label: "Active Resumes", value: 123022 },
            { label: "Positions Matched", value: 123042 },
          ]}
        />
      </div>

      <Testimonials items={testimonials} />
      <ServicesSection services={services} numbered light />

      <section className="section" aria-label="Our creative team">
        <div className="container">
          <SectionHeading title="Our Creative Team" />
          <ul className="grid grid-3 team-grid">
            {team.map((m) => (
              <li key={m.name} className="team-card">
                <div className="team-card__image">
                  <Image src={m.image} alt={m.name} fill sizes="(max-width: 640px) 100vw, 360px" />
                </div>
                <h3>{m.name}</h3>
                <p>{m.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PromoSection />
    </>
  );
}
