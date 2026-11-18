import { EmployerCvSearch } from "@/components/dashboard/EmployerViews";
import { getCandidates } from "@/services/candidateService";

export const metadata = { title: "CV Search" };

export default async function Page() {
  const [candidates] = await Promise.all([getCandidates()]);
  return <EmployerCvSearch candidates={candidates} />;
}
