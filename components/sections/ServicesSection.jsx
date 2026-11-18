import SectionHeading from "@/components/common/SectionHeading";
import Icon from "@/components/common/Icon";

/** "Our Featured Services" grid. numbered=true shows 1..n badges as on About Us. */
export default function ServicesSection({ title = "Our Featured Services", services, numbered = false, light = false }) {
  return (
    <section className={`section${light ? " section--light" : ""}`} aria-label={title}>
      <div className="container">
        <SectionHeading title={title} />
        <ul className="services-grid">
          {services.map((s, i) => (
            <li key={s.title} className="service-card">
              <div className="service-card__icon">
                {numbered && <span className="service-card__num">{i + 1}</span>}
                <Icon name={s.icon} size={44} strokeWidth={1.2} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Three circular-icon features (CV Search / Recruiter Profiles / Advertise a Job). */
export function CircleFeatures({ items, title, light = false }) {
  return (
    <section className={`section${light ? " section--light" : ""}`} aria-label={title || "Features"}>
      <div className="container">
        {title && <SectionHeading title={title} />}
        <ul className="grid grid-3">
          {items.map((s) => (
            <li key={s.title} className="circle-card">
              <div className="circle-card__icon">
                <Icon name={s.icon} size={40} strokeWidth={1.2} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
