"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Keep listing filters in the URL query string so results are shareable,
 * survive reloads and work with the back button.
 * `schema` maps keys to defaults; array defaults are encoded comma-separated,
 * number defaults are parsed as numbers.
 */
export function useUrlFilters(schema) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(() => {
    const out = {};
    for (const [key, def] of Object.entries(schema)) {
      const raw = searchParams.get(key);
      if (raw === null || raw === "") out[key] = def;
      else if (Array.isArray(def)) out[key] = raw.split(",").filter(Boolean);
      else if (typeof def === "number") out[key] = Number(raw) || def;
      else out[key] = raw;
    }
    return out;
    // schema is a static object literal per page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const write = useCallback(
    (next) => {
      const params = new URLSearchParams();
      for (const [key, def] of Object.entries(schema)) {
        const value = next[key];
        const isDefault = Array.isArray(def) ? !value?.length : value === def || value === "" || value === undefined;
        if (!isDefault) params.set(key, Array.isArray(value) ? value.join(",") : String(value));
      }
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname, router]
  );

  /** Update one or more keys. Resets to page 1 unless page is being set. */
  const update = useCallback(
    (patch) => {
      const next = { ...filters, ...patch };
      if (!("page" in patch) && "page" in schema) next.page = 1;
      write(next);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters, write]
  );

  const toggleInArray = (key, value) => {
    const list = filters[key] || [];
    update({ [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value] });
  };

  const reset = (keep = {}) => write({ ...schema, ...keep });

  return { filters, update, toggleInArray, reset };
}
