import Image from "next/image";
import Link from "next/link";
import { Briefcase, Upload } from "lucide-react";
import JobSearch from "@/components/jobs/JobSearch";
import { SITE } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Image
        src="https://picsum.photos/id/1/1920/900"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero__bg"
      />
      <div className="hero__overlay" aria-hidden="true" />
      <div className="container hero__inner">
        <h1 id="hero-title">{SITE.tagline}</h1>
        <p className="hero__subtitle">{SITE.description}</p>
        <div className="hero__search">
          <JobSearch label="Hero job search" />
        </div>
        <div className="hero__actions">
          <Link href="/dashboard/candidate/resume" className="btn btn--dark">
            <Upload size={18} aria-hidden="true" /> Upload Your Resume
          </Link>
          <Link href="/dashboard/employer/jobs/new" className="btn btn--dark">
            <Briefcase size={18} aria-hidden="true" /> Hiring? Post a job for free
          </Link>
        </div>
      </div>
    </section>
  );
}
