import { getJobs } from "@/services/jobService";
import { SITE } from "@/lib/constants";

const escape = (s = "") =>
  String(s).replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]);

/** RSS 2.0 feed of the latest jobs. */
export async function GET() {
  const jobs = await getJobs();
  const items = jobs
    .slice(0, 50)
    .map(
      (job) => `<item>
  <title>${escape(job.title)} – ${escape(job.employer?.name)}</title>
  <link>${SITE.url}/job/${job.slug}</link>
  <guid>${SITE.url}/job/${job.slug}</guid>
  <pubDate>${new Date(job.postedAt).toUTCString()}</pubDate>
  <category>${escape(job.sector)}</category>
  <description>${escape(job.summary)}</description>
</item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${SITE.domain} – Latest Jobs</title>
  <link>${SITE.url}/jobs-listing</link>
  <description>${escape(SITE.description)}</description>
${items}
</channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
