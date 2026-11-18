import { EmployerApplications } from "@/components/dashboard/EmployerViews";
import { getJobs } from "@/services/jobService";
import { getCandidates } from "@/services/candidateService";

export const metadata = { title: "Applications Received" };

export default async function Page() {
  const [jobs, candidates] = await Promise.all([getJobs(), getCandidates()]);
  return <EmployerApplications jobs={jobs} candidates={candidates} />;
}
