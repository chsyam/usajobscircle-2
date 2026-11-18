import { EmployerProfileEdit } from "@/components/dashboard/EmployerViews";
import { getEmployers } from "@/services/employerService";

export const metadata = { title: "Edit Company Profile" };

export default async function Page() {
  const [employers] = await Promise.all([getEmployers()]);
  return <EmployerProfileEdit employers={employers} />;
}
