export const cvPackages = [
  {
    id: "basic-cv",
    name: "Basic C.V Pack",
    price: 0,
    period: null,
    blurb: "First step to becoming everything you want to be.",
    description: "Ideal for employers who want to try our resume database before committing.",
    features: [
      { label: "2 Views Only", included: true },
      { label: "Access to 10 Resumes", included: true },
      { label: "C.V displayed for 10 days", included: true },
      { label: "No Candidate Featured On Demand", included: false },
      { label: "No Premium Support", included: false },
    ],
  },
  {
    id: "power-cv",
    name: "Power CV Pack",
    price: 30,
    period: "only",
    highlighted: true,
    blurb: "First step to becoming everything you want to be.",
    description: "Great for growing teams with regular hiring needs.",
    features: [
      { label: "5 Views", included: true },
      { label: "Access to 15 Resumes", included: true },
      { label: "Candidate Featured On Demand", included: true },
      { label: "C.V displayed for 15 days", included: true },
      { label: "Premium Support 24/7", included: true },
    ],
  },
  {
    id: "super-cv",
    name: "Super CV Pack",
    price: 50,
    period: "only",
    blurb: "First step to becoming everything you want to be.",
    description: "For recruiters searching the talent pool every week.",
    features: [
      { label: "10 Views", included: true },
      { label: "Access to 30 Resumes", included: true },
      { label: "Candidate Featured On Demand", included: true },
      { label: "C.V displayed for 30 days", included: true },
      { label: "Premium Support 24/7", included: true },
    ],
  },
];

export const additionalCvPackages = [
  ...cvPackages,
  {
    id: "unlimited-cv",
    name: "Unlimited CV Pack",
    price: 99,
    period: "only",
    features: [
      { label: "Unlimited Views", included: true },
      { label: "Access to 60 Resumes", included: true },
      { label: "Candidate Featured On Demand", included: true },
      { label: "C.V displayed for 60 days", included: true },
      { label: "Premium Support 24/7", included: true },
    ],
  },
];

export const jobPackages = [
  {
    id: "standard",
    name: "Standard",
    price: 0,
    period: null,
    features: [
      { label: "1 job posting", included: true },
      { label: "Job displayed for 15 days", included: true },
      { label: "No Featured On Demand", included: false },
      { label: "No Premium Support", included: false },
    ],
  },
  {
    id: "silver",
    name: "Silver",
    price: 50,
    period: "per month",
    features: [
      { label: "10 job posting", included: true },
      { label: "Featured On Demand", included: true },
      { label: "Job displayed for 20 days", included: true },
      { label: "Premium Support 24/7", included: true },
    ],
  },
  {
    id: "golden",
    name: "Golden",
    price: 90,
    period: "per month",
    highlighted: true,
    features: [
      { label: "15 job posting", included: true },
      { label: "Featured On Demand", included: true },
      { label: "Job displayed for 30 days", included: true },
      { label: "Premium Support 24/7", included: true },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 159,
    period: "per month",
    features: [
      { label: "25 job posting", included: true },
      { label: "Featured On Demand", included: true },
      { label: "Job displayed for 60 days", included: true },
      { label: "Premium Support 24/7", included: true },
    ],
  },
];

export const additionalJobPackages = jobPackages.filter((p) => ["standard", "golden", "premium"].includes(p.id));

export const featuredServices = [
  { icon: "MonitorSmartphone", title: "Cross Browsers", text: "Your listings look sharp in every modern browser and on every device." },
  { icon: "SlidersHorizontal", title: "Easy Customization", text: "Tailor job posts, company pages and alerts in a few clicks." },
  { icon: "PenTool", title: "Modern Design", text: "Clean, professional layouts that put your opportunities first." },
  { icon: "Clock", title: "Quick Support", text: "Our support team responds fast whenever you need a hand." },
  { icon: "Users", title: "Permanent Staffing", text: "Find long-term talent that fits your culture and goals." },
  { icon: "Wallet", title: "Payroll Management", text: "Simplify onboarding and payroll for every new hire." },
];

export const cvServices = [
  { icon: "FileSearch", title: "CV Search", text: "Search thousands of resumes by skill, sector and location to find qualified candidates quickly." },
  { icon: "Building2", title: "Recruiter Profiles", text: "Showcase your company with a branded profile that candidates can follow." },
  { icon: "Briefcase", title: "Advertise a Job", text: "Post openings in minutes and reach active job seekers across the USA." },
];
