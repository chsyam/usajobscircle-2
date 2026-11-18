"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import JobSearch from "./JobSearch";
import JobFilters from "./JobFilters";
import JobCard from "./JobCard";
import ListingToolbar from "@/components/common/ListingToolbar";
import Pagination from "@/components/common/Pagination";
import { NoRecord } from "@/components/common/EmptyState";
import { useUrlFilters } from "@/hooks/useUrlFilters";
import { useJobs } from "@/hooks/useJobs";
import { useNow } from "@/hooks/useNow";
import { DATE_POSTED, SORT_OPTIONS } from "@/lib/constants";

const SCHEMA = {
  keyword: "",
  location: "",
  sector: "",
  state: "",
  types: [],
  date: "all",
  sort: "recent",
  perPage: 10,
  page: 1,
  view: "list",
};

export default function JobsListing({ jobs }) {
  const { filters, update, toggleInArray, reset } = useUrlFilters(SCHEMA);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const dateHours = DATE_POSTED.find((d) => d.value === filters.date)?.hours || null;
  const now = useNow();

  const criteria = useMemo(
    () => ({
      keyword: filters.keyword,
      location: filters.location,
      sector: filters.sector,
      state: filters.state,
      types: filters.types,
      dateHours,
    }),
    [filters.keyword, filters.location, filters.sector, filters.state, filters.types, dateHours]
  );

  const result = useJobs(jobs, { filters: criteria, sort: filters.sort, page: filters.page, perPage: filters.perPage, now });

  const chips = [
    filters.keyword && { key: "keyword", label: `“${filters.keyword}”` },
    filters.location && { key: "location", label: filters.location },
    filters.state && { key: "state", label: filters.state },
    filters.sector && { key: "sector", label: filters.sector },
    filters.date !== "all" && { key: "date", label: DATE_POSTED.find((d) => d.value === filters.date)?.label },
    ...filters.types.map((t) => ({ key: "types", value: t, label: t })),
  ].filter(Boolean);

  const removeChip = (chip) =>
    chip.key === "types" ? toggleInArray("types", chip.value) : update({ [chip.key]: SCHEMA[chip.key] });

  return (
    <div className="container section">
      <div className="listing-search">
        <JobSearch
          key={`${filters.keyword}|${filters.location}|${filters.sector}`}
          variant="boxed"
          label="Filter jobs"
          initial={filters}
          onSearch={(vals) => update(vals)}
        />
      </div>

      <button type="button" className="btn btn--ghost filters-toggle" onClick={() => setFiltersOpen((o) => !o)} aria-expanded={filtersOpen}>
        <SlidersHorizontal size={16} aria-hidden="true" /> {filtersOpen ? "Hide Filters" : "Show Filters"}
      </button>

      <div className="layout-sidebar">
        <JobFilters jobs={jobs} filters={filters} update={update} toggleInArray={toggleInArray} collapsed={!filtersOpen} />

        <div>
          <ListingToolbar
            total={result.total}
            from={result.from}
            to={result.to}
            noun="Jobs"
            sort={filters.sort}
            sortOptions={SORT_OPTIONS}
            onSort={(sort) => update({ sort })}
            perPage={filters.perPage}
            onPerPage={(perPage) => update({ perPage })}
            view={filters.view}
            onView={(view) => update({ view, page: filters.page })}
            rssHref="/jobs-listing/feed.xml"
          />

          {chips.length > 0 && (
            <div className="active-filters" aria-label="Active filters">
              {chips.map((chip) => (
                <button key={`${chip.key}-${chip.label}`} type="button" className="tag" onClick={() => removeChip(chip)} aria-label={`Remove filter ${chip.label}`}>
                  {chip.label} <X size={12} aria-hidden="true" />
                </button>
              ))}
              <button type="button" className="link-btn" onClick={() => reset({ view: filters.view })}>
                Clear all
              </button>
            </div>
          )}

          {result.total === 0 ? (
            <NoRecord onReset={() => reset({ view: filters.view })} />
          ) : (
            <div className={filters.view === "grid" ? "grid grid-2 job-grid" : "stack"}>
              {result.items.map((job) => (
                <JobCard key={job.slug} job={job} />
              ))}
            </div>
          )}

          <Pagination page={result.page} totalPages={result.totalPages} onChange={(page) => update({ page })} />
        </div>
      </div>
    </div>
  );
}
