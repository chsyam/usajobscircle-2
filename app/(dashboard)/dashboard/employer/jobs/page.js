import { EmployerManageJobs } from "@/components/dashboard/EmployerViews";
import { getJobs } from "@/services/jobService";

export const metadata = { title: "Manage Jobs" };

export default async function Page() {
  const [jobs] = await Promise.all([getJobs()]);
  return <EmployerManageJobs jobs={jobs} />;
}
