import DashboardShell from "@/components/dashboard/DashboardShell";

// Auth is resolved on the client, so navigations into the dashboard may block on the session check.
export const instant = false;

export const metadata = {
  title: { template: "%s – Candidate Dashboard – usajobscircle.com", default: "Candidate Dashboard" },
  robots: { index: false, follow: false },
};

export default function CandidateDashboardLayout({ children }) {
  return <DashboardShell role="candidate">{children}</DashboardShell>;
}
