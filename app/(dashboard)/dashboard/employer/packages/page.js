import { EmployerPackages } from "@/components/dashboard/EmployerViews";
import { getPackages } from "@/services/packageService";

export const metadata = { title: "Job Packages" };

export default async function Page() {
  const [packages] = await Promise.all([getPackages("job")]);
  return <EmployerPackages packages={packages} />;
}
