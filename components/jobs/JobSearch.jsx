"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search } from "lucide-react";
import { SECTORS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Keyword / location / sector search bar.
 * With `onSearch` it reports values to the parent; otherwise it navigates to `action`.
 */
export default function JobSearch({
  initial = {},
  onSearch,
  action = "/jobs-listing",
  variant,
  keywordPlaceholder = "Job Title, Keywords, or Phrase",
  locationPlaceholder = "City, State or ZIP",
  sectorPlaceholder = "Select Sector",
  label = "Search jobs",
}) {
  const router = useRouter();
  const [values, setValues] = useState({
    keyword: initial.keyword || "",
    location: initial.location || "",
    sector: initial.sector || "",
  });

  const set = (name) => (e) => setValues((v) => ({ ...v, [name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const trimmed = { keyword: values.keyword.trim(), location: values.location.trim(), sector: values.sector };
    if (onSearch) {
      onSearch(trimmed);
      return;
    }
    const params = new URLSearchParams();
    Object.entries(trimmed).forEach(([k, v]) => v && params.set(k, v));
    const qs = params.toString();
    router.push(qs ? `${action}?${qs}` : action);
  };

  return (
    <form className={cn("search-bar", variant === "boxed" && "search-bar--boxed")} onSubmit={submit} role="search" aria-label={label}>
      <div className="search-bar__field">
        <label htmlFor={`${label}-kw`} className="sr-only">
          Keywords
        </label>
        <input id={`${label}-kw`} type="search" placeholder={keywordPlaceholder} value={values.keyword} onChange={set("keyword")} />
      </div>
      <div className="search-bar__field">
        <label htmlFor={`${label}-loc`} className="sr-only">
          Location
        </label>
        <input id={`${label}-loc`} type="text" placeholder={locationPlaceholder} value={values.location} onChange={set("location")} />
        <span className="search-bar__icon" aria-hidden="true">
          <MapPin size={16} />
        </span>
      </div>
      <div className="search-bar__field">
        <label htmlFor={`${label}-sector`} className="sr-only">
          Sector
        </label>
        <select id={`${label}-sector`} value={values.sector} onChange={set("sector")}>
          <option value="">{sectorPlaceholder}</option>
          {SECTORS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="search-bar__submit" aria-label="Search">
        <Search size={24} />
      </button>
    </form>
  );
}
