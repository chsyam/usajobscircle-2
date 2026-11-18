const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const numberFormatter = new Intl.NumberFormat("en-US");

export function formatDate(value) {
  if (!value) return "";
  return dateFormatter.format(new Date(value));
}

export function formatShortDate(value) {
  if (!value) return "";
  return shortDateFormatter.format(new Date(value));
}

export function formatNumber(value) {
  return numberFormatter.format(value || 0);
}

export function formatCurrency(value) {
  if (value === 0) return "Free";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

/** "$80,000 - $95,000 / year" */
export function formatSalary(salary) {
  if (!salary) return null;
  const { min, max, period = "year" } = salary;
  const fmt = (n) => `$${numberFormatter.format(n)}`;
  if (min && max) return `${fmt(min)} - ${fmt(max)} / ${period}`;
  return `${fmt(min || max)} / ${period}`;
}

export function truncate(text = "", length = 120) {
  if (text.length <= length) return text;
  return `${text.slice(0, length).trimEnd()}…`;
}
