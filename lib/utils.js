/** Join class names, skipping falsy values. */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/** Convert a string to a URL-safe slug. */
export function slugify(value = "") {
  return String(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Return a page slice and pagination metadata. */
export function paginate(items, page = 1, perPage = 10) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    page: current,
    perPage,
    total,
    totalPages,
    from: total === 0 ? 0 : start + 1,
    to: Math.min(start + perPage, total),
  };
}

/** Build the list of page numbers (with ellipses) for a pager. */
export function pageRange(current, totalPages, siblings = 1) {
  const pages = [];
  const left = Math.max(2, current - siblings);
  const right = Math.min(totalPages - 1, current + siblings);
  pages.push(1);
  if (left > 2) pages.push("…");
  for (let p = left; p <= right; p++) pages.push(p);
  if (right < totalPages - 1) pages.push("…");
  if (totalPages > 1) pages.push(totalPages);
  return pages;
}

/** Initials for avatar fallbacks. */
export function initials(name = "") {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

/** Deterministic colour from a string, used for generated logos. */
export function colorFromString(value = "") {
  const palette = ["#13b5ea", "#e2513f", "#2a9d8f", "#6c5ce7", "#f39c12", "#1d3f72", "#d63384", "#20a464"];
  let hash = 0;
  for (let i = 0; i < value.length; i++) hash = value.charCodeAt(i) + ((hash << 5) - hash);
  return palette[Math.abs(hash) % palette.length];
}

/** Count how many items match each option for a given key (supports array fields). */
export function countBy(items, key, options) {
  return Object.fromEntries(
    options.map((opt) => [
      opt,
      items.filter((item) => {
        const v = item[key];
        return Array.isArray(v) ? v.includes(opt) : v === opt;
      }).length,
    ])
  );
}

export function includesText(haystack, needle) {
  if (!needle) return true;
  return String(haystack || "").toLowerCase().includes(String(needle).toLowerCase().trim());
}
