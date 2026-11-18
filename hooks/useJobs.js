"use client";

import { useMemo } from "react";
import { filterJobs, sortJobs } from "@/services/jobService";
import { paginate } from "@/lib/utils";

/**
 * Client-side filtering, sorting and pagination of a job list.
 * Date filtering uses the timestamp captured when the filter was chosen.
 */
export function useJobs(jobs, { filters, sort, page, perPage, now }) {
  return useMemo(() => {
    const filtered = sortJobs(filterJobs(jobs, filters, now), sort);
    return paginate(filtered, page, perPage);
  }, [jobs, filters, sort, page, perPage, now]);
}
