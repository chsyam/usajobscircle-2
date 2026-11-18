/** Title row at the top of each dashboard page. */
export default function DashboardHeader({ title, subtitle, actions }) {
  return (
    <div className="dash-header">
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {actions && <div className="dash-header__actions">{actions}</div>}
    </div>
  );
}

export function DashCard({ title, actions, children, className = "" }) {
  return (
    <section className={`card dash-card ${className}`}>
      {(title || actions) && (
        <div className="dash-card__head">
          {title && <h2>{title}</h2>}
          {actions}
        </div>
      )}
      <div className="card__body">{children}</div>
    </section>
  );
}
