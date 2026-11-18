import { CandidateProfileEdit } from "@/components/dashboard/CandidateViews";
import { getCandidates } from "@/services/candidateService";

export const metadata = { title: "Edit Profile" };

export default async function Page() {
  const [candidates] = await Promise.all([getCandidates()]);
  return <CandidateProfileEdit candidates={candidates} />;
}
