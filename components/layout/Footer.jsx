import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Logo from "./Logo";
import SocialLinks from "@/components/common/SocialIcons";
import { FOOTER_LINKS, SITE } from "@/lib/constants";

function FooterLinks({ title, links }) {
  return (
    <div>
      <h2>{title}</h2>
      <ul className="footer-links">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <Link href={link.href}>
              <ArrowRight size={13} aria-hidden="true" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="container site-footer__grid">
          <div className="site-footer__about">
            <Logo variant="white" />
            <p>{SITE.footerAbout}</p>
            <Link href="/about-us" className="btn btn--primary">
              Learn More
            </Link>
          </div>
          <FooterLinks title="Quick Links" links={FOOTER_LINKS.quick} />
          <FooterLinks title="For Candidates" links={FOOTER_LINKS.candidates} />
          <FooterLinks title="For Employers" links={FOOTER_LINKS.employers} />
        </div>
      </div>
      <div className="site-footer__bottom">
        <div className="container">
          <p className="mb-0">
            All Rights Reserved © {SITE.copyrightYear} {SITE.domain}
          </p>
          <SocialLinks links={SITE.social} />
        </div>
      </div>
    </footer>
  );
}
