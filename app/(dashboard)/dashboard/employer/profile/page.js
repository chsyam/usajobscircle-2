import { EmployerProfileView } from "@/components/dashboard/EmployerViews";
import { getEmployers } from "@/services/employerService";

export const metadata = { title: "Company Profile" };

export default async function Page() {
  const [employers] = await Promise.all([getEmployers()]);
  return <EmployerProfileView employers={employers} />;
}
