import { candidates } from "@/data/candidates";
import { fromSource } from "./apiClient";

const withLocation = (c) => ({ ...c, location: `${c.city}, ${c.state}` });

export async function getCandidates() {
  return fromSource("/candidates", () =>
    candidates.map(withLocation).sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt))
  );
}

export async function getCandidateBySlug(slug) {
  return fromSource(`/candidates/${slug}`, () => {
    const c = candidates.find((x) => x.slug === slug);
    return c ? withLocation(c) : null;
  });
}

export async function getCandidateSlugs() {
  return candidates.map((c) => c.slug);
}
