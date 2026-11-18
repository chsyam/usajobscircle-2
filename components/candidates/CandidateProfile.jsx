import Image from "next/image";
import Link from "next/link";
import { Award, Briefcase, DollarSign, FileText, GraduationCap, Layers, Mail, MapPin, Phone } from "lucide-react";
import SocialLinks from "@/components/common/SocialIcons";
import ShareButtons from "@/components/common/ShareButtons";
import ContactCandidate from "./ContactCandidate";
import { slugify } from "@/lib/utils";

function Section({ title, children }) {
  return (
    <section className="detail-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function CandidateProfile({ candidate }) {
  const socialLinks = [
    { name: "LinkedIn", href: candidate.social.linkedin },
    { name: "GitHub", href: candidate.social.github },
  ];
  const resumeName = `${slugify(candidate.name)}-resume.pdf`;

  return (
    <>
      <section className="detail-hero">
        <div className="container detail-hero__inner">
          <Image src={candidate.avatar} alt={candidate.name} width={130} height={130} className="avatar candidate-hero__avatar" priority />
          <div className="detail-hero__body">
            <h1>{candidate.name}</h1>
            <p className="candidate-hero__title">{candidate.title}</p>
            <ul className="detail-hero__meta">
              <li>
                <MapPin size={15} aria-hidden="true" /> {candidate.location}
              </li>
              <li>
                <Briefcase size={15} aria-hidden="true" /> {candidate.experienceYears} years experience
              </li>
              <li>
                <DollarSign size={15} aria-hidden="true" /> {candidate.salary}
              </li>
            </ul>
          </div>
          <div className="detail-hero__actions">
            <ContactCandidate name={candidate.name} />
            <a href="#resume" className="btn btn--outline">
              <FileText size={16} aria-hidden="true" /> View CV
            </a>
          </div>
        </div>
      </section>

      <div className="container section">
        <div className="layout-sidebar layout-sidebar--right">
          <article className="detail-main">
            <Section title="Professional Summary">
              <p>{candidate.summary}</p>
            </Section>
            <Section title="Skills">
              <ul className="tag-list">
                {candidate.skills.map((s) => (
                  <li key={s} className="tag">
                    {s}
                  </li>
                ))}
              </ul>
            </Section>
            <Section title="Work Experience">
              <ol className="timeline">
                {candidate.experience.map((exp) => (
                  <li key={`${exp.company}-${exp.period}`}>
                    <h3>{exp.role}</h3>
                    <div className="timeline__meta">
                      <span className="company">{exp.company}</span>
                      <span>{exp.period}</span>
                    </div>
                    <p>{exp.description}</p>
                  </li>
                ))}
              </ol>
            </Section>
            <Section title="Education">
              <ol className="timeline">
                {candidate.educationHistory.map((ed) => (
                  <li key={ed.degree}>
                    <h3>{ed.degree}</h3>
                    <div className="timeline__meta">
                      <span className="company">{ed.school}</span>
                      <span>{ed.period}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </Section>
            {candidate.certifications.length > 0 && (
              <Section title="Certifications">
                <ul className="check-list">
                  {candidate.certifications.map((c) => (
                    <li key={c}>
                      <Award size={16} aria-hidden="true" /> {c}
                    </li>
                  ))}
                </ul>
              </Section>
            )}
            <section className="detail-section" id="resume">
              <h2>Resume / CV</h2>
              <div className="resume-file">
                <FileText size={34} aria-hidden="true" />
                <div>
                  <strong>{resumeName}</strong>
                  <span>Shared with signed-in employers. Contact the candidate to request the full CV.</span>
                </div>
                <ContactCandidate name={candidate.name} />
              </div>
            </section>
            <div className="detail-share">
              <span>Share profile:</span>
              <ShareButtons path={`/candidate/${candidate.slug}`} title={`${candidate.name} – ${candidate.title}`} />
            </div>
          </article>

          <aside className="detail-aside">
            <section className="card">
              <div className="card__body">
                <h2 className="card__title">Contact Information</h2>
                <ul className="contact-list">
                  <li>
                    <Mail size={16} aria-hidden="true" /> <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
                  </li>
                  <li>
                    <Phone size={16} aria-hidden="true" /> <a href={`tel:${candidate.phone.replace(/[^\d+]/g, "")}`}>{candidate.phone}</a>
                  </li>
                  <li>
                    <MapPin size={16} aria-hidden="true" /> {candidate.location}
                  </li>
                  <li>
                    <Layers size={16} aria-hidden="true" /> {candidate.sector}
                  </li>
                  <li>
                    <GraduationCap size={16} aria-hidden="true" /> {candidate.education}
                  </li>
                </ul>
                <h3 className="field__label" style={{ margin: "16px 0 10px" }}>
                  Social Profiles
                </h3>
                <SocialLinks links={socialLinks} variant="light" />
              </div>
            </section>
            <Link href="/candidate-with-search" className="link-btn">
              ← Back to all candidates
            </Link>
          </aside>
        </div>
      </div>
    </>
  );
}
