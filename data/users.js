/**
 * Demo accounts for the mock authentication layer ONLY.
 * These are not real credentials; replace with the real auth API.
 */
export const demoUsers = [
  {
    id: "demo-candidate",
    role: "candidate",
    firstName: "James",
    lastName: "Carter",
    username: "democandidate",
    email: "candidate@demo.test",
    phone: "+1 (512) 555-0110",
    password: "Demo@1234",
    candidateSlug: "james-carter",
  },
  {
    id: "demo-employer",
    role: "employer",
    firstName: "Alex",
    lastName: "Morgan",
    username: "demoemployer",
    email: "employer@demo.test",
    phone: "+1 (972) 555-0141",
    password: "Demo@1234",
    organization: "Lavance LLC",
    sector: "Information Technology",
    employerSlug: "lavance-llc",
  },
];
