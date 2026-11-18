"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import JobSearch from "@/components/jobs/JobSearch";
import CandidateFilters from "./CandidateFilters";
import CandidateCard from "./CandidateCard";
import ListingToolbar from "@/components/common/ListingToolbar";
import Pagination from "@/components/common/Pagination";
import { NoRecord } from "@/components/common/EmptyState";
import { useUrlFilters } from "@/hooks/useUrlFilters";
import { useNow } from "@/hooks/useNow";
import { DATE_POSTED } from "@/lib/constants";
import { includesText, paginate } from "@/lib/utils";

const SCHEMA = { keyword: "", location: "", sector: "", state: "", skills: [], date: "all", sort: "recent", perPage: 10, page: 1, view: "list" };

const SORTS = [
  { value: "recent", label: "Most Recent" },
  { value: "az", label: "Name A–Z" },
  { value: "experience", label: "Most Experienced" },
];

const withinHours = (iso, hours, now) => !hours || !now || now - new Date(iso).getTime() <= hours * 3600 * 1000;

export default function CandidatesListing({ candidates }) {
  const { filters, update, toggleInArray, reset } = useUrlFilters(SCHEMA);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const now = useNow();
  const dateHours = DATE_POSTED.find((d) => d.value === filters.date)?.hours || null;

  const dateCounts = useMemo(
    () => Object.fromEntries(DATE_POSTED.map((d) => [d.value, now ? candidates.filter((c) => withinHours(c.postedAt, d.hours, now)).length : undefined])),
    [candidates, now]
  );

  const result = useMemo(() => {
    let list = candidates.filter((c) => {
      if (filters.keyword && !(includesText(c.name, filters.keyword) || includesText(c.title, filters.keyword) || c.skills.some((s) => includesText(s, filters.keyword)))) return false;
      if (filters.location && !(includesText(c.city, filters.location) || includesText(c.state, filters.location))) return false;
      if (filters.state && c.state !== filters.state) return false;
      if (filters.sector && c.sector !== filters.sector) return false;
      if (filters.skills.length && !filters.skills.every((s) => c.skills.includes(s))) return false;
      if (!withinHours(c.postedAt, dateHours, now)) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (filters.sort === "az") return a.name.localeCompare(b.name);
      if (filters.sort === "experience") return b.experienceYears - a.experienceYears;
      return new Date(b.postedAt) - new Date(a.postedAt);
    });
    return paginate(list, filters.page, filters.perPage);
  }, [candidates, filters, dateHours, now]);

  return (
    <div className="container section">
      <div className="listing-search">
        <JobSearch
          key={`${filters.keyword}|${filters.location}|${filters.sector}`}
          variant="boxed"
          label="Search candidates"
          keywordPlaceholder="Title, Keywords, or Phrase"
          initial={filters}
          onSearch={(vals) => update(vals)}
        />
      </div>
      <button type="button" className="btn btn--ghost filters-toggle" onClick={() => setFiltersOpen((o) => !o)} aria-expanded={filtersOpen}>
        <SlidersHorizontal size={16} aria-hidden="true" /> {filtersOpen ? "Hide Filters" : "Show Filters"}
      </button>
      <div className="layout-sidebar">
        <CandidateFilters candidates={candidates} filters={filters} update={update} toggleInArray={toggleInArray} collapsed={!filtersOpen} dateCounts={dateCounts} />
        <div>
          <ListingToolbar
            total={result.total}
            from={result.from}
            to={result.to}
            noun="Candidates"
            sort={filters.sort}
            sortOptions={SORTS}
            onSort={(sort) => update({ sort })}
            perPage={filters.perPage}
            onPerPage={(perPage) => update({ perPage })}
            view={filters.view}
            onView={(view) => update({ view, page: filters.page })}
          />
          {result.total === 0 ? (
            <NoRecord onReset={() => reset({ view: filters.view })} />
          ) : (
            <div className={filters.view === "grid" ? "grid grid-2 candidate-grid" : "stack"}>
              {result.items.map((c) => (
                <CandidateCard key={c.slug} candidate={c} />
              ))}
            </div>
          )}
          <Pagination page={result.page} totalPages={result.totalPages} onChange={(page) => update({ page })} />
        </div>
      </div>
    </div>
  );
}
