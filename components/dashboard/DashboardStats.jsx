import Link from "next/link";
import { formatNumber } from "@/lib/formatters";

/** stats: [{ label, value, icon: LucideComponent, href?, tone? }] */
export default function DashboardStats({ stats }) {
  return (
    <ul className="dash-stats">
      {stats.map(({ label, value, icon: Ico, href, tone = "blue" }) => {
        const body = (
          <>
            <span className={`dash-stats__icon tone-${tone}`} aria-hidden="true">
              <Ico size={24} />
            </span>
            <span>
              <strong>{formatNumber(value)}</strong>
              <small>{label}</small>
            </span>
          </>
        );
        return <li key={label}>{href ? <Link href={href}>{body}</Link> : <div>{body}</div>}</li>;
      })}
    </ul>
  );
}
