import { EmployerOverview } from "@/components/dashboard/EmployerViews";
import { getJobs } from "@/services/jobService";
import { getCandidates } from "@/services/candidateService";
import { getEmployers } from "@/services/employerService";

export const metadata = { title: "Employer Dashboard" };

export default async function Page() {
  const [jobs, candidates, employers] = await Promise.all([getJobs(), getCandidates(), getEmployers()]);
  return <EmployerOverview jobs={jobs} candidates={candidates} employers={employers} />;
}
