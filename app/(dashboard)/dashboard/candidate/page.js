import { CandidateOverview } from "@/components/dashboard/CandidateViews";
import { getJobs } from "@/services/jobService";

export const metadata = { title: "Candidate Dashboard" };

export default async function Page() {
  const [jobs] = await Promise.all([getJobs()]);
  return <CandidateOverview jobs={jobs} />;
}
