import { employers } from "@/data/employers";
import { jobs } from "@/data/jobs";
import { fromSource } from "./apiClient";

function withVacancies(employer) {
  return { ...employer, vacancies: jobs.filter((j) => j.employerSlug === employer.slug).length };
}

export async function getEmployers() {
  return fromSource("/employers", () =>
    employers.map(withVacancies).sort((a, b) => new Date(b.joinedAt) - new Date(a.joinedAt))
  );
}

export async function getEmployerBySlug(slug) {
  return fromSource(`/employers/${slug}`, () => {
    const employer = employers.find((e) => e.slug === slug);
    return employer ? withVacancies(employer) : null;
  });
}

export async function getEmployerSlugs() {
  return employers.map((e) => e.slug);
}

export async function getTopEmployers(limit = 12) {
  const all = await getEmployers();
  return [...all].sort((a, b) => b.vacancies - a.vacancies).slice(0, limit);
}
