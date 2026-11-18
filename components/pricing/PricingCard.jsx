import { CheckSquare, XSquare, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatters";
import ChoosePlanButton from "./ChoosePlanButton";

function Price({ pkg }) {
  return (
    <div className="pricing-card__price">
      {pkg.price === 0 ? "Free" : formatCurrency(pkg.price)}
      {pkg.period && pkg.price !== 0 && <small>{pkg.period}</small>}
    </div>
  );
}

function Features({ features }) {
  return (
    <ul className="pricing-card__features">
      {features.map((f) => (
        <li key={f.label} className={f.included ? "is-included" : "is-excluded"}>
          {f.included ? <CheckSquare size={16} aria-hidden="true" /> : <XSquare size={16} aria-hidden="true" />}
          <span>
            {f.label}
            {!f.included && <span className="sr-only"> (not included)</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** variant: "detailed" (CV packages) | "simple" (job packages) */
export default function PricingCard({ pkg, variant = "detailed", ctaLabel = "Get Started", type = "cv" }) {
  if (variant === "simple") {
    return (
      <article className={cn("pricing-card pricing-card--simple", pkg.highlighted && "is-highlighted")}>
        <div className="pricing-card__head">
          <h3 className="pricing-card__name">{pkg.name}</h3>
          <Price pkg={pkg} />
        </div>
        <Features features={pkg.features} />
        <div className="pricing-card__cta">
          <ChoosePlanButton pkg={pkg} type={type} label={ctaLabel} variant={pkg.highlighted ? "white" : "primary"} />
        </div>
      </article>
    );
  }

  return (
    <article className={cn("pricing-card", pkg.highlighted && "is-highlighted")}>
      <h3 className="pricing-card__name">{pkg.name}</h3>
      {pkg.blurb && <p className="pricing-card__blurb">{pkg.blurb}</p>}
      <div className="pricing-card__price-row">
        <Price pkg={pkg} />
        {pkg.description && <p className="pricing-card__desc">{pkg.description}</p>}
      </div>
      <Features features={pkg.features} />
      <ChoosePlanButton pkg={pkg} type={type} label={ctaLabel} variant={pkg.highlighted ? "white" : "primary"} />
    </article>
  );
}

/** Horizontal row used in the "Buy additional packages" sections. */
export function PackageRow({ pkg, type = "cv", ctaLabel = "Choose Plan", label }) {
  return (
    <article className={cn("package-row", pkg.highlighted && "is-highlighted")}>
      <div>
        {label && pkg.highlighted && <span className="package-row__label">{label}</span>}
        <h3 className="package-row__name">{pkg.name}</h3>
        <div className="package-row__price">
          {pkg.price === 0 ? "Free" : formatCurrency(pkg.price)}
          {pkg.period && pkg.price !== 0 && <small>{pkg.period}</small>}
        </div>
      </div>
      <ul className="package-row__features">
        {pkg.features.map((f) => (
          <li key={f.label}>
            <Check size={14} aria-hidden="true" /> {f.label}
          </li>
        ))}
      </ul>
      <ChoosePlanButton pkg={pkg} type={type} label={ctaLabel} />
    </article>
  );
}
