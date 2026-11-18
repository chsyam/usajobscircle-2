import Link from "next/link";
import { MapPin, Users } from "lucide-react";
import CompanyLogo from "@/components/common/CompanyLogo";
import FollowButton from "./FollowButton";
import { truncate } from "@/lib/formatters";

export default function EmployerCard({ employer }) {
  return (
    <article className="employer-card">
      <Link href={`/employer/${employer.slug}`} tabIndex={-1} aria-label={employer.name}>
        <CompanyLogo name={employer.name} size={96} />
      </Link>
      <div className="employer-card__body">
        <p className="employer-card__sectors">{employer.sectors.join(" , ")}</p>
        <h3 className="employer-card__name">
          <Link href={`/employer/${employer.slug}`}>{employer.name}</Link>
        </h3>
        <p className="employer-card__desc">{truncate(employer.tagline, 90)}</p>
        <div className="employer-card__meta">
          <span>
            <MapPin size={13} aria-hidden="true" /> {truncate(employer.location, 48)}
          </span>
          <span>
            <Users size={13} aria-hidden="true" /> {employer.teamSize}
          </span>
        </div>
      </div>
      <div className="employer-card__actions">
        <Link href={`/employer/${employer.slug}#open-positions`} className="btn btn--outline btn--sm">
          {employer.vacancies} {employer.vacancies === 1 ? "Vacancy" : "Vacancies"}
        </Link>
        <FollowButton slug={employer.slug} />
      </div>
    </article>
  );
}
