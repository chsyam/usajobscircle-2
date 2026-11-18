/** Role-based dashboard navigation. Icons are lucide component names resolved in Sidebar. */
export const DASHBOARD_NAV = {
  candidate: [
    { label: "Dashboard", href: "/dashboard/candidate", icon: "LayoutDashboard" },
    { label: "My Profile", href: "/dashboard/candidate/profile", icon: "User" },
    { label: "Edit Profile", href: "/dashboard/candidate/profile/edit", icon: "UserPen" },
    { label: "My Resume", href: "/dashboard/candidate/resume", icon: "FileText" },
    { label: "My Applications", href: "/dashboard/candidate/applications", icon: "Send" },
    { label: "Saved Jobs", href: "/dashboard/candidate/saved-jobs", icon: "Heart" },
    { label: "Followed Employers", href: "/dashboard/candidate/followed-employers", icon: "Building2" },
    { label: "Job Alerts", href: "/dashboard/candidate/job-alerts", icon: "Bell" },
    { label: "Account Settings", href: "/dashboard/candidate/settings", icon: "Settings" },
  ],
  employer: [
    { label: "Dashboard", href: "/dashboard/employer", icon: "LayoutDashboard" },
    { label: "Company Profile", href: "/dashboard/employer/profile", icon: "Building2" },
    { label: "Edit Company Profile", href: "/dashboard/employer/profile/edit", icon: "UserPen" },
    { label: "Post New Job", href: "/dashboard/employer/jobs/new", icon: "PlusCircle" },
    { label: "Manage Jobs", href: "/dashboard/employer/jobs", icon: "Briefcase" },
    { label: "Applications Received", href: "/dashboard/employer/applications", icon: "Inbox" },
    { label: "Manage Candidates", href: "/dashboard/employer/candidates", icon: "Users" },
    { label: "CV Search", href: "/dashboard/employer/cv-search", icon: "FileSearch" },
    { label: "Job Packages", href: "/dashboard/employer/packages", icon: "Package" },
    { label: "Account Settings", href: "/dashboard/employer/settings", icon: "Settings" },
  ],
};
