"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { pageRange } from "@/lib/utils";

export default function Pagination({ page, totalPages, onChange, label = "Pagination" }) {
  if (totalPages <= 1) return null;
  const go = (p) => {
    onChange(p);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <nav className="pagination" aria-label={label}>
      <button type="button" onClick={() => go(page - 1)} disabled={page <= 1} aria-label="Previous page">
        <ChevronLeft size={16} />
      </button>
      {pageRange(page, totalPages).map((p, i) =>
        p === "…" ? (
          <span key={`gap-${i}`} aria-hidden="true">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => go(p)}
            aria-current={p === page ? "page" : undefined}
            aria-label={`Page ${p}`}
          >
            {p}
          </button>
        )
      )}
      <button type="button" onClick={() => go(page + 1)} disabled={page >= totalPages} aria-label="Next page">
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
