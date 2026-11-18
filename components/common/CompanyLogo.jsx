import { colorFromString, initials } from "@/lib/utils";

/** Generated company logo mark (keeps the project free of third-party logo assets). */
export default function CompanyLogo({ name = "", size = 70, className = "" }) {
  const color = colorFromString(name);
  return (
    <span className={`company-logo ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      <span className="company-logo__mark" style={{ background: color, fontSize: Math.round(size * 0.34) }}>
        {initials(name)}
      </span>
    </span>
  );
}
