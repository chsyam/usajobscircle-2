"use client";

import { CheckboxFilter, LocationFilter, RadioFilter } from "@/components/common/FilterAccordion";
import { DATE_POSTED, SECTORS, US_STATES } from "@/lib/constants";
import { countBy } from "@/lib/utils";

export default function CandidateFilters({ candidates, filters, update, toggleInArray, collapsed, dateCounts }) {
  const sectorCounts = countBy(candidates, "sector", SECTORS);
  const allSkills = [...new Set(candidates.flatMap((c) => c.skills))].sort();
  const skillCounts = countBy(candidates, "skills", allSkills);
  return (
    <aside className={`filters${collapsed ? " is-collapsed" : ""}`} aria-label="Candidate filters">
      <RadioFilter
        title="Date Posted"
        name="cand-date"
        value={filters.date}
        onChange={(date) => update({ date })}
        options={DATE_POSTED.map((d) => ({ value: d.value, label: d.label, count: dateCounts?.[d.value] }))}
      />
      <RadioFilter
        title="Sector"
        name="cand-sector"
        scroll
        value={filters.sector}
        onChange={(sector) => update({ sector })}
        options={[{ value: "", label: "All", count: candidates.length }, ...SECTORS.map((s) => ({ value: s, label: s, count: sectorCounts[s] }))]}
      />
      <CheckboxFilter
        title="Skills"
        values={filters.skills}
        onToggle={(v) => toggleInArray("skills", v)}
        limit={8}
        options={allSkills.map((s) => ({ value: s, label: s, count: skillCounts[s] }))}
      />
      <LocationFilter key={filters.state} states={US_STATES} value={filters.state} onSubmit={(state) => update({ state })} />
    </aside>
  );
}
