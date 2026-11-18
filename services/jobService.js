import { jobs } from "@/data/jobs";
import { employers } from "@/data/employers";
import { includesText } from "@/lib/utils";
import { fromSource } from "./apiClient";

/** Attach a lightweight employer summary to a job. */
export function enrichJob(job) {
  const employer = employers.find((e) => e.slug === job.employerSlug);
  return {
    ...job,
    location: `${job.city}, ${job.state}`,
    employer: employer ? { slug: employer.slug, name: employer.name, sectors: employer.sectors } : null,
  };
}

export async function getJobs() {
  return fromSource("/jobs", () =>
    jobs.map(enrichJob).sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt))
  );
}

export async function getJobBySlug(slug) {
  return fromSource(`/jobs/${slug}`, () => {
    const job = jobs.find((j) => j.slug === slug);
    return job ? enrichJob(job) : null;
  });
}

export async function getJobSlugs() {
  return jobs.map((j) => j.slug);
}

export async function getFeaturedJobs(limit = 6) {
  const all = await getJobs();
  return all.filter((j) => j.featured).slice(0, limit);
}

export async function getJobsByEmployer(employerSlug) {
  const all = await getJobs();
  return all.filter((j) => j.employerSlug === employerSlug);
}

export async function getSimilarJobs(job, limit = 3) {
  const all = (await getJobs()).filter((j) => j.slug !== job.slug);
  const related = all.filter((j) => j.sector === job.sector || j.employerSlug === job.employerSlug);
  const rest = all.filter((j) => !related.includes(j));
  return [...related, ...rest].slice(0, limit);
}

/**
 * Pure filter shared by server and client listing UI.
 * `now` is passed in so date filtering stays deterministic.
 */
export function filterJobs(list, filters = {}, now) {
  const { keyword, location, sector, types = [], dateHours, state } = filters;
  return list.filter((job) => {
    if (
      keyword &&
      !(
        includesText(job.title, keyword) ||
        includesText(job.employer?.name, keyword) ||
        job.skills.some((s) => includesText(s, keyword))
      )
    )
      return false;
    if (location && !(includesText(job.city, location) || includesText(job.state, location))) return false;
    if (state && job.state !== state) return false;
    if (sector && job.sector !== sector) return false;
    if (types.length && !types.includes(job.type)) return false;
    if (dateHours && now && now - new Date(job.postedAt).getTime() > dateHours * 3600 * 1000) return false;
    return true;
  });
}

function annualize(salary) {
  if (!salary) return 0;
  const top = salary.max || salary.min || 0;
  return salary.period === "hour" ? top * 2080 : top;
}

export function sortJobs(list, sort = "recent") {
  const copy = [...list];
  switch (sort) {
    case "oldest":
      return copy.sort((a, b) => new Date(a.postedAt) - new Date(b.postedAt));
    case "az":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    case "salary":
      return copy.sort((a, b) => annualize(b.salary) - annualize(a.salary));
    default:
      return copy.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
  }
}

export async function searchJobs(filters) {
  const all = await getJobs();
  return filterJobs(all, filters);
}
