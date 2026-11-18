export const faqCategories = [
  {
    id: "faq",
    title: "Frequently Asked Questions",
    items: [
      {
        q: "How can I find out who is the hiring manager or lead recruiter on this posting?",
        a: "Most job pages list the employer's company profile. Open the profile to see contact details, or use the Send Message form on the employer page to reach their recruiting team directly.",
      },
      {
        q: "I can't remember my user id and/or password, can you reset it?",
        a: "Yes. Use the Forgot Password link on the sign-in page and enter the email address on your account. We'll send a link to reset your password.",
      },
      {
        q: "I am having trouble with the online process, is there an alternative method to apply?",
        a: "If you run into problems applying online, contact us through the Contact Us page with the job title and we'll help you submit your application.",
      },
      {
        q: "What are the definitions of the different types of jobs?",
        a: "Full time roles are 35+ hours per week, part time roles are fewer hours, contract roles have a fixed term, contract-to-hire may convert to permanent, and freelance roles are project based.",
      },
      {
        q: "What benefits does usajobscircle offer?",
        a: "Candidates can search and save jobs, follow employers, create job alerts and publish a resume for free. Employers can post jobs, search CVs and manage applicants from one dashboard.",
      },
      {
        q: "I keep getting an error message when I try logging in to apply?",
        a: "Check that your account is activated and that caps lock is off. If the problem persists, reset your password or contact support.",
      },
      {
        q: "I have several accounts, can they be purged or deleted?",
        a: "Yes. Send us a request from the email address on each account and we'll remove the duplicates within two business days.",
      },
      {
        q: "How long is the review process, after the first review posting is listed?",
        a: "Employers set their own timelines, but most review applications within one to two weeks of a posting going live.",
      },
      {
        q: "When can I expect to hear back from the hiring department?",
        a: "You'll see status updates under My Applications in your dashboard. Employers typically respond within 14 days.",
      },
      {
        q: "How do I apply for a job opening?",
        a: "Open the job details page and click Apply Now. You'll need to be signed in with a candidate account so your resume can be attached.",
      },
    ],
  },
  {
    id: "general",
    title: "General Inquiries",
    items: [
      {
        q: "Is it free to create a candidate account?",
        a: "Yes, candidate accounts are always free. You can upgrade with a CV package to feature your resume.",
      },
      {
        q: "How do I post a job as an employer?",
        a: "Register an employer account, choose a job package and use Post New Job in your employer dashboard.",
      },
      {
        q: "Can I edit a job after publishing it?",
        a: "Yes. Go to Manage Jobs in your employer dashboard to edit, pause or close any listing.",
      },
      {
        q: "How do job alerts work?",
        a: "Create an alert with keywords and a frequency, and we'll email you new matching jobs on your schedule.",
      },
    ],
  },
];

faqCategories.push({
  id: "recent",
  title: "Career Questions",
  items: [
    {
      q: "Is the career in car sales right for me?",
      a: "If you enjoy meeting people, are motivated by commission and can handle a fast pace, automotive sales can be very rewarding. Browse Automotive Jobs to see current openings.",
    },
    {
      q: "Can I work part time/as a summer job or weekends?",
      a: "Yes. Filter the Jobs Listing by Part time, Temporary or Internship to find flexible roles.",
    },
    {
      q: "How to get a job in car sales?",
      a: "Highlight customer-facing experience on your resume, prepare examples of hitting targets and apply to dealerships listed under Automotive Jobs.",
    },
    {
      q: "How do I make my resume stand out?",
      a: "Lead with a short summary, quantify your achievements and tailor your skills to each job posting. See our news section for more resume tips.",
    },
  ],
});

export const recentQuestions = faqCategories.find((c) => c.id === "recent").items.map((i) => i.q);
