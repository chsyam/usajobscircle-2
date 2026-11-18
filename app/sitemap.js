import { SITE } from "@/lib/constants";
import { getJobs } from "@/services/jobService";
import { getEmployers } from "@/services/employerService";
import { getCandidates } from "@/services/candidateService";
import { getBlogPosts } from "@/services/blogService";

const STATIC_ROUTES = [
  "",
  "/jobs-listing",
  "/employer-listing",
  "/candidate-with-search",
  "/cv-packages",
  "/job-packages",
  "/about-us",
  "/faqs",
  "/contact-us",
  "/news",
  "/sign-in",
  "/sign-up",
  "/terms-and-conditions",
];

export default async function sitemap() {
  const [jobs, employers, candidates, posts] = await Promise.all([getJobs(), getEmployers(), getCandidates(), getBlogPosts()]);
  const url = (p) => `${SITE.url}${p}`;
  return [
    ...STATIC_ROUTES.map((p) => ({ url: url(p), changeFrequency: "daily", priority: p === "" ? 1 : 0.7 })),
    ...jobs.map((j) => ({ url: url(`/job/${j.slug}`), lastModified: j.postedAt, changeFrequency: "weekly", priority: 0.8 })),
    ...employers.map((e) => ({ url: url(`/employer/${e.slug}`), changeFrequency: "weekly", priority: 0.6 })),
    ...candidates.map((c) => ({ url: url(`/candidate/${c.slug}`), lastModified: c.postedAt, changeFrequency: "monthly", priority: 0.5 })),
    ...posts.map((p) => ({ url: url(`/news/${p.slug}`), lastModified: p.publishedAt, changeFrequency: "monthly", priority: 0.5 })),
  ];
}
