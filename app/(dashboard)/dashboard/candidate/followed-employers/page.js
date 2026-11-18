import { CandidateFollowedEmployers } from "@/components/dashboard/CandidateViews";
import { getEmployers } from "@/services/employerService";

export const metadata = { title: "Followed Employers" };

export default async function Page() {
  const [employers] = await Promise.all([getEmployers()]);
  return <CandidateFollowedEmployers employers={employers} />;
}
