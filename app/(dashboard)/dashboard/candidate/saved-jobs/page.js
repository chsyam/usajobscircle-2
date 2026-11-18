import { CandidateSavedJobs } from "@/components/dashboard/CandidateViews";
import { getJobs } from "@/services/jobService";

export const metadata = { title: "Saved Jobs" };

export default async function Page() {
  const [jobs] = await Promise.all([getJobs()]);
  return <CandidateSavedJobs jobs={jobs} />;
}
