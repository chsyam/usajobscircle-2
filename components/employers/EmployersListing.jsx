"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import JobSearch from "@/components/jobs/JobSearch";
import EmployerFilters from "./EmployerFilters";
import EmployerCard from "./EmployerCard";
import ListingToolbar from "@/components/common/ListingToolbar";
import Pagination from "@/components/common/Pagination";
import { NoRecord } from "@/components/common/EmptyState";
import { useUrlFilters } from "@/hooks/useUrlFilters";
import { useNow } from "@/hooks/useNow";
import { DATE_POSTED } from "@/lib/constants";
import { includesText, paginate } from "@/lib/utils";

const SCHEMA = { keyword: "", location: "", sector: "", state: "", size: "", date: "all", sort: "recent", perPage: 10, page: 1, view: "list" };

const SORTS = [
  { value: "recent", label: "Most Recent" },
  { value: "az", label: "Name A–Z" },
  { value: "vacancies", label: "Most Vacancies" },
];

const withinHours = (iso, hours, now) => !hours || !now || now - new Date(iso).getTime() <= hours * 3600 * 1000;

export default function EmployersListing({ employers }) {
  const { filters, update, reset } = useUrlFilters(SCHEMA);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const now = useNow();
  const dateHours = DATE_POSTED.find((d) => d.value === filters.date)?.hours || null;

  const dateCounts = useMemo(
    () => Object.fromEntries(DATE_POSTED.map((d) => [d.value, now ? employers.filter((e) => withinHours(e.joinedAt, d.hours, now)).length : undefined])),
    [employers, now]
  );

  const result = useMemo(() => {
    let list = employers.filter((e) => {
      if (filters.keyword && !(includesText(e.name, filters.keyword) || e.sectors.some((s) => includesText(s, filters.keyword)))) return false;
      if (filters.location && !(includesText(e.city, filters.location) || includesText(e.state, filters.location))) return false;
      if (filters.state && e.state !== filters.state) return false;
      if (filters.sector && !e.sectors.includes(filters.sector)) return false;
      if (filters.size && e.teamSize !== filters.size) return false;
      if (!withinHours(e.joinedAt, dateHours, now)) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (filters.sort === "az") return a.name.localeCompare(b.name);
      if (filters.sort === "vacancies") return b.vacancies - a.vacancies;
      return new Date(b.joinedAt) - new Date(a.joinedAt);
    });
    return paginate(list, filters.page, filters.perPage);
  }, [employers, filters, dateHours, now]);

  return (
    <div className="container section">
      <div className="listing-search">
        <JobSearch
          key={`${filters.keyword}|${filters.location}|${filters.sector}`}
          variant="boxed"
          label="Search employers"
          keywordPlaceholder="Company name or sector"
          initial={filters}
          onSearch={(vals) => update(vals)}
        />
      </div>
      <button type="button" className="btn btn--ghost filters-toggle" onClick={() => setFiltersOpen((o) => !o)} aria-expanded={filtersOpen}>
        <SlidersHorizontal size={16} aria-hidden="true" /> {filtersOpen ? "Hide Filters" : "Show Filters"}
      </button>
      <div className="layout-sidebar">
        <EmployerFilters employers={employers} filters={filters} update={update} collapsed={!filtersOpen} dateCounts={dateCounts} />
        <div>
          <ListingToolbar
            total={result.total}
            from={result.from}
            to={result.to}
            noun="Employers"
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
            <div className={filters.view === "grid" ? "grid grid-2 employer-grid" : "stack"}>
              {result.items.map((e) => (
                <EmployerCard key={e.slug} employer={e} />
              ))}
            </div>
          )}
          <Pagination page={result.page} totalPages={result.totalPages} onChange={(page) => update({ page })} />
        </div>
      </div>
    </div>
  );
}
