"use client";

import { ArrowUpDown, LayoutGrid, List, Rss } from "lucide-react";
import { PER_PAGE_OPTIONS } from "@/lib/constants";

export default function ListingToolbar({
  total,
  from,
  to,
  noun = "Jobs",
  sort,
  sortOptions,
  onSort,
  perPage,
  onPerPage,
  view,
  onView,
  rssHref,
}) {
  return (
    <div className="listing-toolbar">
      <div className="listing-toolbar__count">
        <h2>
          {total} {noun} Found
        </h2>
        <p>
          Displayed Here: {total === 0 ? 0 : `${from} - ${to}`} {noun}
        </p>
      </div>
      <div className="listing-toolbar__controls">
        {sortOptions && (
          <label className="toolbar-select">
            <ArrowUpDown size={14} aria-hidden="true" />
            <span className="sr-only">Sort by</span>
            <select value={sort} onChange={(e) => onSort(e.target.value)}>
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        )}
        <label className="toolbar-select">
          <span className="sr-only">Records per page</span>
          <select value={perPage} onChange={(e) => onPerPage(Number(e.target.value))}>
            {PER_PAGE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n} Per Page
              </option>
            ))}
          </select>
        </label>
        {onView && (
          <div className="view-toggle" role="group" aria-label="View">
            <button type="button" aria-pressed={view === "list"} onClick={() => onView("list")} aria-label="List view">
              <List size={16} />
            </button>
            <button type="button" aria-pressed={view === "grid"} onClick={() => onView("grid")} aria-label="Grid view">
              <LayoutGrid size={16} />
            </button>
          </div>
        )}
        {rssHref && (
          <a href={rssHref} className="btn btn--sm" style={{ background: "var(--warning)", color: "#fff" }}>
            <Rss size={14} aria-hidden="true" /> RSS Feed
          </a>
        )}
      </div>
    </div>
  );
}
