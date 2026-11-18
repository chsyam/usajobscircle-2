import PageTitle from "@/components/layout/PageTitle";
import { SITE } from "@/lib/constants";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Terms and Conditions",
  description: "Terms and conditions for using usajobscircle.",
  path: "/terms-and-conditions",
});

const sections = [
  ["Using the site", "You may use usajobscircle to search for jobs, publish a candidate profile, or advertise open positions. You agree to provide accurate information and to keep your login details confidential."],
  ["Candidate accounts", "Candidates control what appears on their profile and resume. Profiles may be visible to registered employers. You can update or delete your profile at any time from your dashboard."],
  ["Employer accounts", "Employers must post genuine vacancies and comply with applicable employment and anti-discrimination laws. Paid packages are billed as described on the Job Packages and CV Packages pages."],
  ["Privacy", "We only use personal data to operate the service, match candidates with jobs and communicate with you. We never sell personal data."],
  ["Changes", "We may update these terms from time to time. Continued use of the site after changes means you accept the updated terms."],
];

export default function TermsPage() {
  return (
    <>
      <PageTitle title="Terms and Conditions" />
      <section className="section">
        <div className="container prose">
          {sections.map(([title, text]) => (
            <section key={title} className="detail-section">
              <h2>{title}</h2>
              <p>{text}</p>
            </section>
          ))}
          <p className="muted">
            Questions? Contact us at <a href={`mailto:${SITE.contact.email}`}>{SITE.contact.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
