import { EmployerCandidates } from "@/components/dashboard/EmployerViews";
import { getCandidates } from "@/services/candidateService";

export const metadata = { title: "Manage Candidates" };

export default async function Page() {
  const [candidates] = await Promise.all([getCandidates()]);
  return <EmployerCandidates candidates={candidates} />;
}
