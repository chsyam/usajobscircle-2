import DashboardShell from "@/components/dashboard/DashboardShell";

// Auth is resolved on the client, so navigations into the dashboard may block on the session check.
export const instant = false;

export const metadata = {
  title: { template: "%s – Employer Dashboard – usajobscircle.com", default: "Employer Dashboard" },
  robots: { index: false, follow: false },
};

export default function EmployerDashboardLayout({ children }) {
  return <DashboardShell role="employer">{children}</DashboardShell>;
}
