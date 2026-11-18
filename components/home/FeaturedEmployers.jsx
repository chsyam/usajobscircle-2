import Link from "next/link";
import CompanyLogo from "@/components/common/CompanyLogo";

export default function FeaturedEmployers({ employers }) {
  return (
    <section className="section top-employers" aria-labelledby="top-employers-title">
      <div className="container top-employers__inner">
        <div>
          <h2 id="top-employers-title" className="top-employers__title">
            Top Listed Employers Offering Jobs
            <br />
            Find the one that&apos;s right for you.
          </h2>
          <p>
            Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 600,000
            companies worldwide. The right job is out there. Use usajobscircle to find it.
          </p>
          <Link href="/employer-listing" className="btn btn--primary btn--lg">
            Search Employers
          </Link>
        </div>
        <ul className="top-employers__logos">
          {employers.map((e) => (
            <li key={e.slug}>
              <Link href={`/employer/${e.slug}`} className="top-employers__logo" title={e.name}>
                <CompanyLogo name={e.name} size={44} />
                <span>{e.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
