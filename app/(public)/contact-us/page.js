import Link from "next/link";
import { Briefcase, HelpCircle, Mail, MapPin, Newspaper, Phone, Printer } from "lucide-react";
import PageTitle from "@/components/layout/PageTitle";
import SectionHeading from "@/components/common/SectionHeading";
import ContactForm from "@/components/common/ContactForm";
import CompanyLogo from "@/components/common/CompanyLogo";
import { getTopEmployers } from "@/services/employerService";
import { SITE } from "@/lib/constants";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contact us",
  description: "Get in touch with the usajobscircle team. We want to hear from you!",
  path: "/contact-us",
});

const promos = [
  { icon: Briefcase, kicker: "Want to join us?", label: "Careers", href: "/jobs-listing" },
  { icon: Newspaper, kicker: "Read our latest news", label: "Our Blog", href: "/news" },
  { icon: HelpCircle, kicker: "Have questions?", label: "Our FAQ", href: "/faqs" },
];

export default async function ContactPage() {
  const employers = await getTopEmployers(6);
  const { contact } = SITE;
  return (
    <>
      <PageTitle title="Contact us" />

      <section className="contact-map" aria-label="Map">
        <iframe
          title="Office location map"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-118.0922%2C33.7826%2C-118.0522%2C33.8126&layer=mapnik&marker=33.7976%2C-118.0722"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </section>

      <section className="container contact-box-wrap">
        <div className="contact-box card">
          <div className="contact-box__info">
            <h2>Contact Information</h2>
            <p>Our team is available Monday to Friday, 9am–6pm PT. We usually reply within one business day.</p>
            <ul>
              <li>
                <MapPin size={18} aria-hidden="true" /> <address>{contact.address}</address>
              </li>
              <li>
                <Mail size={18} aria-hidden="true" /> Email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>
                <Phone size={18} aria-hidden="true" /> Call: <a href={`tel:${contact.phone.replace(/\D/g, "")}`}>{contact.phone}</a>
              </li>
              <li>
                <Printer size={18} aria-hidden="true" /> Fax: {contact.fax}
              </li>
            </ul>
          </div>
          <div className="contact-box__form">
            <h2>We want to hear from you!</h2>
            <ContactForm submitLabel="Submit" />
          </div>
        </div>
      </section>

      <section className="section" aria-label="Employers">
        <div className="container">
          <SectionHeading title="Find the one that's right for you." />
          <ul className="partner-logos">
            {employers.map((e) => (
              <li key={e.slug}>
                <Link href={`/employer/${e.slug}`} title={e.name} aria-label={e.name}>
                  <CompanyLogo name={e.name} size={64} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="contact-promos" aria-label="More links">
        <div className="container grid grid-3">
          {promos.map(({ icon: Ico, kicker, label, href }) => (
            <Link key={label} href={href} className="contact-promo">
              <Ico size={34} strokeWidth={1.3} aria-hidden="true" />
              <span>
                <small>{kicker}</small>
                <strong>{label}</strong>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
