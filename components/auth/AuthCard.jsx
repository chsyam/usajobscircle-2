import PageTitle from "@/components/layout/PageTitle";

/** Shared shell for the standalone authentication pages. */
export default function AuthCard({ pageTitle, title, subtitle, wide = false, children }) {
  return (
    <>
      <PageTitle title={pageTitle} />
      <section className="auth-page">
        <div className="container">
          <div className={`card auth-card${wide ? " auth-card--wide" : ""}`}>
            <div className="card__body">
              <h2 className="auth-card__title">{title}</h2>
              {subtitle && <p className="auth-card__subtitle">{subtitle}</p>}
              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
