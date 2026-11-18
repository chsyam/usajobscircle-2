import Image from "next/image";
import Link from "next/link";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";

export default function CandidateCard({ candidate }) {
  return (
    <article className="candidate-card">
      <Image src={candidate.avatar} alt={candidate.name} width={90} height={90} className="avatar" />
      <div className="candidate-card__body">
        <h3 className="candidate-card__name">
          <Link href={`/candidate/${candidate.slug}`}>{candidate.name}</Link>
        </h3>
        <p className="candidate-card__title">{candidate.title}</p>
        <div className="candidate-card__meta">
          <span>
            <MapPin size={13} aria-hidden="true" /> {candidate.location}
          </span>
          <span>
            <Briefcase size={13} aria-hidden="true" /> {candidate.experienceYears} yrs experience
          </span>
          <span>
            <GraduationCap size={13} aria-hidden="true" /> {candidate.education}
          </span>
        </div>
        <ul className="tag-list" aria-label="Skills">
          {candidate.skills.slice(0, 5).map((s) => (
            <li key={s} className="tag">
              {s}
            </li>
          ))}
        </ul>
      </div>
      <div className="candidate-card__actions">
        <Link href={`/candidate/${candidate.slug}`} className="btn btn--outline btn--sm">
          View Profile
        </Link>
      </div>
    </article>
  );
}
