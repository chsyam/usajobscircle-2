import { STATS } from "@/lib/constants";
import { formatNumber } from "@/lib/formatters";

export function StatisticsCounter({ value, label }) {
  return (
    <div className="stats__item">
      <div className="stats__value">{formatNumber(value)}</div>
      <div className="stats__label">{label}</div>
    </div>
  );
}

export default function StatisticsSection({ stats = STATS, bordered = true }) {
  return (
    <section className={bordered ? "stats" : ""} aria-label="Job statistics">
      <div className="container stats__list">
        {stats.map((s) => (
          <StatisticsCounter key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
