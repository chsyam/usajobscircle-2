import Image from "next/image";
import Link from "next/link";
import { Briefcase, Building, Calendar, Eye, Globe, Layers, Mail, MapPin, Phone, Users } from "lucide-react";
import CompanyLogo from "@/components/common/CompanyLogo";
import SocialLinks from "@/components/common/SocialIcons";
import ShareButtons from "@/components/common/ShareButtons";
import ContactForm from "@/components/common/ContactForm";
import EmptyState from "@/components/common/EmptyState";
import JobCard from "@/components/jobs/JobCard";
import FollowButton from "./FollowButton";
import { formatDate } from "@/lib/formatters";

export default function EmployerProfile({ employer, jobs }) {
  const overview = [
    { icon: Calendar, label: "Member Since", value: formatDate(employer.joinedAt) },
    { icon: Layers, label: "Industry", value: employer.sectors.join(", ") },
    { icon: Briefcase, label: "Posted Jobs", value: jobs.length },
    { icon: Users, label: "Company Size", value: employer.teamSize },
    { icon: Building, label: "Founded Since", value: employer.founded },
    { icon: Eye, label: "Viewed", value: employer.views },
  ];
  const socialLinks = [
    { name: "Facebook", href: employer.social.facebook },
    { name: "X", href: employer.social.x },
    { name: "LinkedIn", href: employer.social.linkedin },
  ];

  return (
    <>
      <div className="profile-banner">
        <Image src={employer.banner} alt="" fill priority sizes="100vw" />
      </div>
      <div className="container profile-head">
        <div className="card profile-head__card">
          <CompanyLogo name={employer.name} size={140} />
          <div className="profile-head__body">
            <h1>{employer.name}</h1>
            <ul className="profile-head__meta">
              <li>
                <MapPin size={15} aria-hidden="true" /> {employer.location}
              </li>
              <li>
                <a href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(employer.location)}`} target="_blank" rel="noopener noreferrer">
                  View on Map
                </a>
              </li>
            </ul>
            <div className="profile-head__actions">
              <FollowButton slug={employer.slug} size={null} label="Follow Company" />
              <a href="#open-positions" className="btn btn--primary">
                {jobs.length} Open {jobs.length === 1 ? "Position" : "Positions"}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container section">
        <div className="layout-sidebar layout-sidebar--right">
          <div className="detail-main">
            <section className="detail-section card">
              <div className="card__body">
                <h2 className="card__title">Overview</h2>
                <ul className="overview-grid">
                  {overview.map(({ icon: Ico, label, value }) => (
                    <li key={label}>
                      <Ico size={26} strokeWidth={1.4} aria-hidden="true" />
                      <div>
                        <span>{label}</span>
                        <strong>{value}</strong>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="detail-section">
              <h2>About Company</h2>
              {employer.about.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              <div className="detail-share">
                <span>Share:</span>
                <ShareButtons path={`/employer/${employer.slug}`} title={employer.name} />
              </div>
            </section>

            <section className="detail-section" id="open-positions">
              <h2>Open Positions ({jobs.length})</h2>
              {jobs.length === 0 ? (
                <EmptyState title="No open positions" message={`${employer.name} has no open jobs right now. Follow them to hear about new roles.`} />
              ) : (
                <div className="stack">
                  {jobs.map((job) => (
                    <JobCard key={job.slug} job={job} />
                  ))}
                </div>
              )}
            </section>
          </div>

          <aside className="detail-aside">
            <section className="card">
              <div className="card__body">
                <h2 className="card__title">Company Information</h2>
                <ul className="contact-list">
                  <li>
                    <Layers size={16} aria-hidden="true" /> {employer.sectors.join(", ")}
                  </li>
                  <li>
                    <Users size={16} aria-hidden="true" /> {employer.teamSize}
                  </li>
                  <li>
                    <MapPin size={16} aria-hidden="true" /> {employer.city}, {employer.state} (Headquarters)
                  </li>
                  <li>
                    <Globe size={16} aria-hidden="true" />
                    <a href={employer.website} target="_blank" rel="noopener noreferrer">
                      {employer.website.replace(/^https?:\/\//, "")}
                    </a>
                  </li>
                  <li>
                    <Mail size={16} aria-hidden="true" /> <a href={`mailto:${employer.email}`}>{employer.email}</a>
                  </li>
                  <li>
                    <Phone size={16} aria-hidden="true" /> <a href={`tel:${employer.phone.replace(/[^\d+]/g, "")}`}>{employer.phone}</a>
                  </li>
                </ul>
                <div style={{ marginTop: 14 }}>
                  <SocialLinks links={socialLinks} variant="light" />
                </div>
              </div>
            </section>
            <section className="card">
              <div className="card__body">
                <h2 className="card__title">Contact Form</h2>
                <ContactForm variant="compact" recipient={employer.name} submitLabel="Send Message" />
              </div>
            </section>
            <Link href="/employer-listing" className="link-btn">
              ← Back to all employers
            </Link>
          </aside>
        </div>
      </div>
    </>
  );
}
