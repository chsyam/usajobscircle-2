import Link from "next/link";
import { Briefcase, UserRound } from "lucide-react";

/** Two-up promo for job seekers and employers. */
export default function CallToAction() {
  return (
    <section className="cta-split" aria-label="Get started">
      <div className="cta-split__item cta-split__item--seeker">
        <UserRound size={42} strokeWidth={1.3} aria-hidden="true" />
        <div>
          <h2>Looking for a job?</h2>
          <p>Create your free profile, upload your resume and get matched with employers hiring now.</p>
          <Link href="/sign-up" className="btn btn--white">
            Create Profile
          </Link>
        </div>
      </div>
      <div className="cta-split__item cta-split__item--employer">
        <Briefcase size={42} strokeWidth={1.3} aria-hidden="true" />
        <div>
          <h2>Are you recruiting?</h2>
          <p>Post a job in minutes, search thousands of CVs and manage applicants from one dashboard.</p>
          <Link href="/job-packages" className="btn btn--white">
            Post a Job
          </Link>
        </div>
      </div>
    </section>
  );
}
