"use client";

import { LocationFilter, RadioFilter } from "@/components/common/FilterAccordion";
import { DATE_POSTED, SECTORS, TEAM_SIZES, US_STATES } from "@/lib/constants";
import { countBy } from "@/lib/utils";

export default function EmployerFilters({ employers, filters, update, collapsed, dateCounts }) {
  const sectorCounts = countBy(employers, "sectors", SECTORS);
  const sizeCounts = countBy(employers, "teamSize", TEAM_SIZES);
  return (
    <aside className={`filters${collapsed ? " is-collapsed" : ""}`} aria-label="Employer filters">
      <LocationFilter key={filters.state} states={US_STATES} value={filters.state} onSubmit={(state) => update({ state })} />
      <RadioFilter
        title="Date Posted"
        name="emp-date"
        value={filters.date}
        onChange={(date) => update({ date })}
        options={DATE_POSTED.map((d) => ({ value: d.value, label: d.label, count: dateCounts?.[d.value] }))}
      />
      <RadioFilter
        title="Sector"
        name="emp-sector"
        scroll
        value={filters.sector}
        onChange={(sector) => update({ sector })}
        options={[{ value: "", label: "All", count: employers.length }, ...SECTORS.map((s) => ({ value: s, label: s, count: sectorCounts[s] }))]}
      />
      <RadioFilter
        title="Team Size"
        name="emp-size"
        value={filters.size}
        onChange={(size) => update({ size })}
        options={[{ value: "", label: "Any size", count: employers.length }, ...TEAM_SIZES.map((s) => ({ value: s, label: s, count: sizeCounts[s] }))]}
      />
    </aside>
  );
}
