"use client";

import { CheckboxFilter, LocationFilter, RadioFilter } from "@/components/common/FilterAccordion";
import { DATE_POSTED, JOB_TYPES, SECTORS, US_STATES } from "@/lib/constants";
import { countBy } from "@/lib/utils";
import JobAlertForm from "./JobAlertForm";

export default function JobFilters({ jobs, filters, update, toggleInArray, collapsed }) {
  const typeCounts = countBy(jobs, "type", JOB_TYPES);
  const sectorCounts = countBy(jobs, "sector", SECTORS);

  return (
    <aside className={`filters${collapsed ? " is-collapsed" : ""}`} aria-label="Job filters">
      <JobAlertForm criteria={{ keyword: filters.keyword, location: filters.location, sector: filters.sector, types: filters.types }} />
      <LocationFilter key={filters.state} states={US_STATES} value={filters.state} onSubmit={(state) => update({ state })} />
      <RadioFilter
        title="Date Posted"
        name="date"
        value={filters.date}
        onChange={(date) => update({ date })}
        options={DATE_POSTED.map((d) => ({ value: d.value, label: d.label }))}
      />
      <CheckboxFilter
        title="Job Type"
        values={filters.types}
        onToggle={(v) => toggleInArray("types", v)}
        options={JOB_TYPES.map((t) => ({ value: t, label: t, count: typeCounts[t] }))}
      />
      <RadioFilter
        title="Sector"
        name="sector"
        scroll
        value={filters.sector}
        onChange={(sector) => update({ sector })}
        options={[{ value: "", label: "All", count: jobs.length }, ...SECTORS.map((s) => ({ value: s, label: s, count: sectorCounts[s] }))]}
      />
    </aside>
  );
}
