export const SITE = {
  name: "usajobscircle",
  domain: "usajobscircle.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  tagline: "Aim Higher. Reach Farther. Dream Bigger.",
  description:
    "A better career is out there. We'll help you find it. We're your first step to becoming everything you want to be.",
  footerAbout:
    "We help job seekers find the right path and employers discover the right talent — faster and smarter.",
  copyrightYear: 2026,
  contact: {
    address: "International Noel Nawab Street Los Alamitos CA 90720, USA",
    email: "info@usajobscircle.com",
    phone: "123.456.78910",
    fax: "(800) 123 4567 89",
  },
  social: [
    { name: "Facebook", href: "https://www.facebook.com/" },
    { name: "X", href: "https://x.com/" },
    { name: "LinkedIn", href: "https://www.linkedin.com/" },
    { name: "Instagram", href: "https://www.instagram.com/" },
  ],
};

export const SECTION_SUBTITLE =
  "A better career is out there. We'll help you find it. We're your first step to becoming everything you want to be.";

export const MAIN_NAV = [
  { label: "Home", href: "/" },
  { label: "Jobs", href: "/jobs-listing" },
  { label: "Employers", href: "/employer-listing" },
  { label: "Candidates", href: "/candidate-with-search" },
  {
    label: "Packages",
    children: [
      { label: "CV Packages", href: "/cv-packages" },
      { label: "Job Packages", href: "/job-packages" },
    ],
  },
  {
    label: "Pages",
    children: [
      { label: "About us", href: "/about-us" },
      { label: "FAQ's", href: "/faqs" },
      { label: "SignIn / SignUp", href: "/sign-in" },
      { label: "Contact", href: "/contact-us" },
      { label: "News", href: "/news" },
    ],
  },
];

export const FOOTER_LINKS = {
  quick: [
    { label: "Job Packages", href: "/job-packages" },
    { label: "Post New Job", href: "/dashboard/employer/jobs/new" },
    { label: "Jobs Listing", href: "/jobs-listing" },
    { label: "Jobs Style Grid", href: "/jobs-listing?view=grid" },
    { label: "Employer Listing", href: "/employer-listing" },
    { label: "Employers Grid", href: "/employer-listing?view=grid" },
  ],
  candidates: [
    { label: "User Dashboard", href: "/dashboard/candidate" },
    { label: "CV Packages", href: "/cv-packages" },
    { label: "Candidate Listing", href: "/candidate-with-search" },
    { label: "Candidates Grid", href: "/candidate-with-search?view=grid" },
    { label: "About us", href: "/about-us" },
    { label: "Contact us", href: "/contact-us" },
  ],
  employers: [
    { label: "Post New Job", href: "/dashboard/employer/jobs/new" },
    { label: "Employer Listing", href: "/employer-listing" },
    { label: "Employers Grid", href: "/employer-listing?view=grid" },
    { label: "Job Packages", href: "/job-packages" },
    { label: "Jobs Listing", href: "/jobs-listing" },
    { label: "Jobs Style Grid", href: "/jobs-listing?view=grid" },
  ],
};

export const SECTORS = [
  "Accounting / Finance",
  "Agriculture",
  "Automotive Jobs",
  "Construction",
  "Consulting",
  "Customer Support",
  "Data Science / AI",
  "Education / Training",
  "Energy / Utilities",
  "Engineering",
  "Government / Public Sector",
  "Health Care",
  "Hospitality / Tourism",
  "Human Resources",
  "Information Technology",
  "Legal",
  "Logistics / Supply Chain",
  "Manufacturing",
  "Media / Creative",
  "Project Management",
  "Real Estate",
  "Research & Development",
  "Retail",
  "Sales & Marketing",
  "Telecommunications",
];

export const JOB_TYPES = [
  "Contract",
  "Contract To Hire",
  "Freelance",
  "Full time",
  "Part time",
  "Temporary",
  "Internship",
];

export const DATE_POSTED = [
  { value: "1h", label: "Last Hour", hours: 1 },
  { value: "24h", label: "Last 24 hours", hours: 24 },
  { value: "7d", label: "Last week", hours: 24 * 7 },
  { value: "14d", label: "Last 2 weeks", hours: 24 * 14 },
  { value: "30d", label: "Last month", hours: 24 * 30 },
  { value: "all", label: "All", hours: null },
];

export const TEAM_SIZES = [
  "1-100 Members",
  "101-200 Members",
  "201-300 Members",
  "301-400 Members",
  "401-500 Members",
  "500+ Members",
];

export const US_STATES = [
  "Arizona",
  "California",
  "Colorado",
  "Florida",
  "Georgia",
  "Illinois",
  "Massachusetts",
  "Nevada",
  "New Jersey",
  "New York",
  "North Carolina",
  "Ohio",
  "Pennsylvania",
  "Texas",
  "Virginia",
  "Washington",
];

export const ALERT_FREQUENCIES = [
  "Daily",
  "Weekly",
  "Fortnightly",
  "Monthly",
  "Biannually",
  "Annually",
  "Never",
];

export const SORT_OPTIONS = [
  { value: "recent", label: "Most Recent" },
  { value: "oldest", label: "Oldest" },
  { value: "az", label: "Title A–Z" },
  { value: "salary", label: "Highest Salary" },
];

export const PER_PAGE_OPTIONS = [5, 10, 20];

export const STATS = [
  { label: "Jobs Added", value: 21732 },
  { label: "Active Resumes", value: 33113 },
  { label: "Positions Matched", value: 24788 },
];

export const ROLES = { CANDIDATE: "candidate", EMPLOYER: "employer" };

export const STORAGE_KEYS = {
  session: "ujc.session",
  users: "ujc.users",
  savedJobs: "ujc.savedJobs",
  followedEmployers: "ujc.followedEmployers",
  jobAlerts: "ujc.jobAlerts",
  applications: "ujc.applications",
  postedJobs: "ujc.postedJobs",
  profile: "ujc.profile",
  notificationsRead: "ujc.notificationsRead",
};
