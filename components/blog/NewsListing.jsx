"use client";

import { useUrlFilters } from "@/hooks/useUrlFilters";
import { paginate, cn } from "@/lib/utils";
import Pagination from "@/components/common/Pagination";
import EmptyState from "@/components/common/EmptyState";
import BlogCard from "./BlogCard";

const SCHEMA = { category: "", page: 1 };
const PER_PAGE = 6;

export default function NewsListing({ posts }) {
  const { filters, update } = useUrlFilters(SCHEMA);
  const categories = [...new Set(posts.map((p) => p.category))];
  const list = filters.category ? posts.filter((p) => p.category === filters.category) : posts;
  const result = paginate(list, filters.page, PER_PAGE);

  return (
    <>
      <div className="category-tabs" role="group" aria-label="Filter by category">
        {["", ...categories].map((c) => (
          <button
            key={c || "all"}
            type="button"
            className={cn("btn btn--sm", filters.category === c ? "btn--primary" : "btn--ghost")}
            aria-pressed={filters.category === c}
            onClick={() => update({ category: c })}
          >
            {c || "All"}
          </button>
        ))}
      </div>
      {result.total === 0 ? (
        <EmptyState title="No articles yet" message="There are no articles in this category." />
      ) : (
        <div className="grid grid-3">
          {result.items.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
      <Pagination page={result.page} totalPages={result.totalPages} onChange={(page) => update({ page })} label="News pagination" />
    </>
  );
}
