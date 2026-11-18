import { CandidateProfileView } from "@/components/dashboard/CandidateViews";
import { getCandidates } from "@/services/candidateService";

export const metadata = { title: "My Profile" };

export default async function Page() {
  const [candidates] = await Promise.all([getCandidates()]);
  return <CandidateProfileView candidates={candidates} />;
}
