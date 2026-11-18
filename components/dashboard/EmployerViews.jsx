"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, Briefcase, CheckCircle2, Eye, FileSearch, Inbox, Package, Pause, Pencil, Play, PlusCircle, Search, Trash2, Users } from "lucide-react";
import DashboardHeader, { DashCard } from "./DashboardHeader";
import DashboardStats from "./DashboardStats";
import CompanyLogo from "@/components/common/CompanyLogo";
import EmptyState from "@/components/common/EmptyState";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Button from "@/components/common/Button";
import Input, { Checkbox, Textarea } from "@/components/common/Input";
import Select from "@/components/common/Select";
import Pagination from "@/components/common/Pagination";
import CandidateCard from "@/components/candidates/CandidateCard";
import PricingCard from "@/components/pricing/PricingCard";
import { useAuth } from "@/hooks/useAuth";
import { usePostedJobs } from "@/hooks/useUserData";
import { useForm } from "@/hooks/useForm";
import { useDebounce } from "@/hooks/useDebounce";
import { useLocalStore } from "@/lib/localStore";
import { JOB_TYPES, SECTORS, STORAGE_KEYS, TEAM_SIZES } from "@/lib/constants";
import { postJobSchema, rules } from "@/lib/validations";
import { formatSalary, formatShortDate } from "@/lib/formatters";
import { includesText, paginate, slugify } from "@/lib/utils";
import { toast } from "@/components/common/Toast";

/* ---------- Company data helpers ---------- */

function useCompany(employers) {
  const { user } = useAuth();
  const seed = employers.find((e) => e.slug === user.employerSlug);
  const defaults = {
    name: seed?.name || user.organization || "",
    tagline: seed?.tagline || "",
    sector: seed?.sectors?.[0] || user.sector || "",
    teamSize: seed?.teamSize || "",
    founded: seed?.founded || "",
    city: seed?.city || "",
    state: seed?.state || "",
    address: seed?.location || "",
    website: seed?.website || "",
    email: seed?.email || user.email,
    phone: seed?.phone || user.phone || "",
    about: seed?.about?.join("\n\n") || "",
    facebook: seed?.social?.facebook || "",
    linkedin: seed?.social?.linkedin || "",
  };
  const [stored, setStored] = useLocalStore(`${STORAGE_KEYS.profile}.company.${user.id}`, null);
  return [{ ...defaults, ...stored }, setStored, seed];
}

/** Company jobs = mock jobs for the seeded employer + jobs posted locally by this user. */
function useCompanyJobs(jobs) {
  const { user } = useAuth();
  const { postedJobs, update, remove, add } = usePostedJobs();
  const [statusMap, setStatusMap] = useLocalStore(`${STORAGE_KEYS.postedJobs}.status.${user.id}`, {});
  const mine = postedJobs.filter((j) => j.ownerId === user.id);
  const seeded = jobs.filter((j) => j.employerSlug === user.employerSlug).map((j) => ({ ...j, id: j.slug, source: "listing" }));
  const all = [...mine, ...seeded].map((j) => ({ ...j, status: statusMap[j.id] || j.status || "Active" }));
  const setStatus = (id, status) => setStatusMap({ ...statusMap, [id]: status });
  return { all, add, update, remove, setStatus };
}

/** Deterministic demo applications for the employer's jobs. */
function useReceivedApplications(jobs, candidates) {
  const { all } = useCompanyJobs(jobs);
  const { user } = useAuth();
  const [statuses, setStatuses] = useLocalStore(`${STORAGE_KEYS.applications}.received.${user.id}`, {});
  const list = useMemo(
    () =>
      all.flatMap((job, ji) =>
        candidates
          .filter((_, ci) => (ci + ji) % 3 === 0)
          .slice(0, 3)
          .map((c, k) => ({
            id: `${job.id}-${c.slug}`,
            job,
            candidate: c,
            appliedAt: new Date(new Date(job.postedAt).getTime() + (k + 1) * 86400000).toISOString(),
          }))
      ),
    [all, candidates]
  );
  const withStatus = list.map((a) => ({ ...a, status: statuses[a.id] || "New" }));
  const setStatus = (id, status) => setStatuses({ ...statuses, [id]: status });
  return { applications: withStatus, setStatus };
}

const APP_STATUSES = ["New", "Reviewed", "Shortlisted", "Interview", "Rejected", "Hired"];
const APP_TONE = { New: "badge--type", Reviewed: "badge--warning", Shortlisted: "badge--success", Interview: "badge--success", Rejected: "badge--danger", Hired: "badge--success" };

/* ---------- Overview ---------- */

export function EmployerOverview({ jobs, candidates, employers }) {
  const { user } = useAuth();
  const [company, , seed] = useCompany(employers);
  const { all } = useCompanyJobs(jobs);
  const { applications } = useReceivedApplications(jobs, candidates);
  const [shortlist] = useLocalStore(`${STORAGE_KEYS.profile}.shortlist.${user.id}`, []);
  return (
    <>
      <DashboardHeader
        title={`Welcome, ${company.name || user.firstName}`}
        subtitle="Manage your jobs, applicants and company profile."
        actions={
          <Link href="/dashboard/employer/jobs/new" className="btn btn--primary">
            <PlusCircle size={16} aria-hidden="true" /> Post New Job
          </Link>
        }
      />
      <DashboardStats
        stats={[
          { label: "Posted Jobs", value: all.length, icon: Briefcase, href: "/dashboard/employer/jobs" },
          { label: "Applications", value: applications.length, icon: Inbox, href: "/dashboard/employer/applications", tone: "green" },
          { label: "Shortlisted", value: shortlist.length, icon: Users, href: "/dashboard/employer/candidates", tone: "orange" },
          { label: "Profile Views", value: seed?.views || 0, icon: Eye, tone: "red" },
        ]}
      />
      <div className="dash-grid-2">
        <DashCard title="Recent Jobs" actions={<Link href="/dashboard/employer/jobs" className="link-btn">Manage</Link>}>
          {all.length === 0 ? (
            <p className="mb-0">
              No jobs yet. <Link href="/dashboard/employer/jobs/new" className="link-btn">Post your first job</Link>
            </p>
          ) : (
            <ul className="mini-list">
              {all.slice(0, 5).map((j) => (
                <li key={j.id}>
                  <span>
                    {j.source === "listing" ? <Link href={`/job/${j.slug}`}>{j.title}</Link> : <strong style={{ fontWeight: 500, color: "var(--heading)" }}>{j.title}</strong>}
                    <small>{j.type} · {formatShortDate(j.postedAt)}</small>
                  </span>
                  <span className={`badge ${j.status === "Active" ? "badge--success" : "badge--muted"}`}>{j.status}</span>
                </li>
              ))}
            </ul>
          )}
        </DashCard>
        <DashCard title="Latest Applicants" actions={<Link href="/dashboard/employer/applications" className="link-btn">View all</Link>}>
          {applications.length === 0 ? (
            <p className="mb-0">No applications yet.</p>
          ) : (
            <ul className="mini-list">
              {applications.slice(0, 5).map((a) => (
                <li key={a.id}>
                  <Link href={`/candidate/${a.candidate.slug}`}>
                    {a.candidate.name}
                    <small>{a.job.title}</small>
                  </Link>
                  <span className={`badge ${APP_TONE[a.status]}`}>{a.status}</span>
                </li>
              ))}
            </ul>
          )}
        </DashCard>
      </div>
    </>
  );
}

/* ---------- Company profile ---------- */

export function EmployerProfileView({ employers }) {
  const [company, , seed] = useCompany(employers);
  const rows = [
    ["Industry", company.sector || "—"],
    ["Company Size", company.teamSize || "—"],
    ["Founded", company.founded || "—"],
    ["Headquarters", [company.city, company.state].filter(Boolean).join(", ") || "—"],
    ["Address", company.address || "—"],
    ["Website", company.website || "—"],
    ["Email", company.email || "—"],
    ["Phone", company.phone || "—"],
  ];
  return (
    <>
      <DashboardHeader
        title="Company Profile"
        actions={
          <>
            {seed && (
              <Link href={`/employer/${seed.slug}`} className="btn btn--ghost">
                View Public Page
              </Link>
            )}
            <Link href="/dashboard/employer/profile/edit" className="btn btn--primary">
              <Pencil size={15} aria-hidden="true" /> Edit Company Profile
            </Link>
          </>
        }
      />
      <DashCard>
        <div className="profile-view">
          <CompanyLogo name={company.name} size={100} />
          <div>
            <h2>{company.name || "Your company"}</h2>
            <p className="mb-0">{company.tagline}</p>
          </div>
        </div>
        <dl className="info-grid">
          {rows.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </DashCard>
      <DashCard title="About Company">
        {company.about ? company.about.split(/\n{2,}/).map((p) => <p key={p.slice(0, 20)}>{p}</p>) : <p className="mb-0">Add a description in Edit Company Profile.</p>}
      </DashCard>
    </>
  );
}

const companySchema = {
  name: [rules.required("Company name is required.")],
  sector: [rules.required("Select a sector.")],
  email: [rules.required("Email is required."), rules.email()],
  phone: [rules.phone()],
  website: [rules.url()],
  facebook: [rules.url()],
  linkedin: [rules.url()],
};

export function EmployerProfileEdit({ employers }) {
  const router = useRouter();
  const [company, setCompany] = useCompany(employers);
  const { register, handleSubmit, submitting } = useForm(company, companySchema);
  return (
    <>
      <DashboardHeader title="Edit Company Profile" subtitle="This information appears on your public employer page." />
      <form
        noValidate
        className="stack"
        onSubmit={handleSubmit(async (vals) => {
          setCompany(vals);
          toast("Company profile saved.");
          router.push("/dashboard/employer/profile");
        })}
      >
        <DashCard title="Company Details">
          <div className="form-grid">
            <Input label="Company Name" required {...register("name")} />
            <Input label="Tagline" {...register("tagline")} />
            <Select label="Industry / Sector" placeholder="Select sector" options={SECTORS} required {...register("sector")} />
            <Select label="Company Size" placeholder="Select size" options={TEAM_SIZES} {...register("teamSize")} />
            <Input label="Founded" type="number" min="1800" max="2100" {...register("founded")} />
            <Input label="Website" type="url" {...register("website")} />
            <Textarea label="About Company" className="span-2" rows={6} {...register("about")} />
          </div>
        </DashCard>
        <DashCard title="Location & Contact">
          <div className="form-grid">
            <Input label="City" {...register("city")} />
            <Input label="State" {...register("state")} />
            <Input label="Address" className="span-2" {...register("address")} />
            <Input label="Email" type="email" required {...register("email")} />
            <Input label="Phone" type="tel" {...register("phone")} />
          </div>
        </DashCard>
        <DashCard title="Social Media">
          <div className="form-grid">
            <Input label="Facebook URL" type="url" {...register("facebook")} />
            <Input label="LinkedIn URL" type="url" {...register("linkedin")} />
          </div>
        </DashCard>
        <div className="form-actions">
          <Link href="/dashboard/employer/profile" className="btn btn--ghost">
            Cancel
          </Link>
          <Button type="submit" loading={submitting}>
            Save Company Profile
          </Button>
        </div>
      </form>
    </>
  );
}

/* ---------- Post new job ---------- */

const emptyJob = {
  title: "",
  type: "",
  sector: "",
  location: "",
  salaryMin: "",
  salaryMax: "",
  period: "year",
  experience: "",
  careerLevel: "",
  skills: "",
  description: "",
  featured: false,
};

export function EmployerPostJob() {
  const router = useRouter();
  const { user } = useAuth();
  const { add } = usePostedJobs();
  const { register, values, handleChange, handleSubmit, submitting, formError } = useForm(emptyJob, postJobSchema);

  return (
    <>
      <DashboardHeader title="Post New Job" subtitle="Fill in the details below to publish your job." />
      <form
        noValidate
        className="stack"
        onSubmit={handleSubmit(async (vals) => {
          const [city, state = ""] = vals.location.split(",").map((s) => s.trim());
          add({
            ownerId: user.id,
            slug: slugify(vals.title),
            title: vals.title,
            type: vals.type,
            sector: vals.sector,
            city,
            state,
            location: vals.location,
            salary: vals.salaryMin || vals.salaryMax ? { min: Number(vals.salaryMin) || null, max: Number(vals.salaryMax) || null, period: vals.period } : null,
            experience: vals.experience,
            careerLevel: vals.careerLevel,
            skills: vals.skills.split(",").map((s) => s.trim()).filter(Boolean),
            description: vals.description,
            featured: vals.featured,
            status: "Active",
            source: "local",
          });
          toast("Job posted successfully.");
          router.push("/dashboard/employer/jobs");
        })}
      >
        {formError && (
          <div className="alert alert--error">
            <AlertCircle size={18} aria-hidden="true" /> {formError}
          </div>
        )}
        <DashCard title="Job Details">
          <div className="form-grid">
            <Input label="Job Title" required className="span-2" {...register("title")} />
            <Select label="Job Type" placeholder="Select type" options={JOB_TYPES} required {...register("type")} />
            <Select label="Sector" placeholder="Select sector" options={SECTORS} required {...register("sector")} />
            <Input label="Location" placeholder="City, State" required className="span-2" {...register("location")} />
            <Textarea label="Job Description" required className="span-2" rows={7} {...register("description")} />
            <Input label="Required Skills" hint="Separate skills with commas." className="span-2" {...register("skills")} />
          </div>
        </DashCard>
        <DashCard title="Salary & Requirements">
          <div className="form-grid">
            <Input label="Minimum Salary ($)" type="number" min="0" {...register("salaryMin")} />
            <Input label="Maximum Salary ($)" type="number" min="0" {...register("salaryMax")} />
            <Select label="Salary Period" options={[{ value: "year", label: "Per year" }, { value: "month", label: "Per month" }, { value: "hour", label: "Per hour" }]} {...register("period")} />
            <Select label="Experience" placeholder="Select experience" options={["No Experience", "Less than 1 Year", "1+ Years", "2+ Years", "3+ Years", "5+ Years", "10+ Years"]} {...register("experience")} />
            <Select label="Career Level" placeholder="Select level" options={["Student", "Entry-Level", "Mid-Level", "Senior", "Manager", "Executive"]} {...register("careerLevel")} />
          </div>
          <div style={{ marginTop: 18 }}>
            <Checkbox name="featured" checked={values.featured} onChange={handleChange} label="Feature this job (uses one featured credit from your package)" />
          </div>
        </DashCard>
        <div className="form-actions">
          <Link href="/dashboard/employer/jobs" className="btn btn--ghost">
            Cancel
          </Link>
          <Button type="submit" loading={submitting}>
            Publish Job
          </Button>
        </div>
      </form>
    </>
  );
}

/* ---------- Manage jobs ---------- */

export function EmployerManageJobs({ jobs }) {
  const { all, remove, setStatus } = useCompanyJobs(jobs);
  const [pending, setPending] = useState(null);
  return (
    <>
      <DashboardHeader
        title="Manage Jobs"
        subtitle={`${all.length} job${all.length === 1 ? "" : "s"}`}
        actions={
          <Link href="/dashboard/employer/jobs/new" className="btn btn--primary">
            <PlusCircle size={16} aria-hidden="true" /> Post New Job
          </Link>
        }
      />
      {all.length === 0 ? (
        <EmptyState icon={<Briefcase size={24} />} title="No jobs posted" message="Post a job to start receiving applications." action={<Link href="/dashboard/employer/jobs/new" className="btn btn--primary">Post New Job</Link>} />
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Type</th>
                <th scope="col">Posted</th>
                <th scope="col">Salary</th>
                <th scope="col">Status</th>
                <th scope="col">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {all.map((j) => (
                <tr key={j.id}>
                  <td>{j.source === "listing" ? <Link href={`/job/${j.slug}`}>{j.title}</Link> : <strong style={{ fontWeight: 500, color: "var(--heading)" }}>{j.title}</strong>}</td>
                  <td>{j.type}</td>
                  <td>{formatShortDate(j.postedAt)}</td>
                  <td>{formatSalary(j.salary) || "—"}</td>
                  <td>
                    <span className={`badge ${j.status === "Active" ? "badge--success" : "badge--muted"}`}>{j.status}</span>
                  </td>
                  <td>
                    <div className="table__actions">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const next = j.status === "Active" ? "Paused" : "Active";
                          setStatus(j.id, next);
                          toast(`Job ${next === "Active" ? "resumed" : "paused"}.`);
                        }}
                        aria-label={j.status === "Active" ? `Pause ${j.title}` : `Resume ${j.title}`}
                      >
                        {j.status === "Active" ? <Pause size={14} /> : <Play size={14} />}
                      </Button>
                      {j.source === "local" && (
                        <Button variant="ghost" size="sm" onClick={() => setPending(j)} aria-label={`Delete ${j.title}`}>
                          <Trash2 size={14} />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="muted" style={{ fontSize: 13 }}>
        Jobs you post here are stored locally until the backend API is connected; listings from the public site can be paused but not deleted.
      </p>
      <ConfirmDialog
        open={Boolean(pending)}
        title="Delete job?"
        message={pending ? `“${pending.title}” will be permanently removed.` : ""}
        confirmLabel="Delete"
        onCancel={() => setPending(null)}
        onConfirm={() => {
          if (pending) remove(pending?.id);
          setPending(null);
          toast("Job deleted.");
        }}
      />
    </>
  );
}

/* ---------- Applications received ---------- */

export function EmployerApplications({ jobs, candidates }) {
  const { applications, setStatus } = useReceivedApplications(jobs, candidates);
  const [filter, setFilter] = useState("");
  const list = filter ? applications.filter((a) => a.status === filter) : applications;
  return (
    <>
      <DashboardHeader
        title="Applications Received"
        subtitle={`${applications.length} total`}
        actions={
          <label className="toolbar-select">
            <span className="sr-only">Filter by status</span>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="">All statuses</option>
              {APP_STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
        }
      />
      {list.length === 0 ? (
        <EmptyState icon={<Inbox size={24} />} title="No applications" message={filter ? "No applications with this status." : "Applications for your jobs will appear here."} />
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Candidate</th>
                <th scope="col">Job</th>
                <th scope="col">Applied</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {list.map((a) => (
                <tr key={a.id}>
                  <td>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <Image src={a.candidate.avatar} alt="" width={36} height={36} className="avatar" />
                      <span>
                        <Link href={`/candidate/${a.candidate.slug}`}>{a.candidate.name}</Link>
                        <small className="muted" style={{ display: "block" }}>{a.candidate.title}</small>
                      </span>
                    </div>
                  </td>
                  <td>{a.job.title}</td>
                  <td>{formatShortDate(a.appliedAt)}</td>
                  <td>
                    <label className="sr-only" htmlFor={`st-${a.id}`}>
                      Status for {a.candidate.name}
                    </label>
                    <select
                      id={`st-${a.id}`}
                      className="status-select"
                      value={a.status}
                      onChange={(e) => {
                        setStatus(a.id, e.target.value);
                        toast(`${a.candidate.name} marked as ${e.target.value}.`);
                      }}
                    >
                      {APP_STATUSES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

/* ---------- Manage candidates (shortlist) ---------- */

function useShortlist() {
  const { user } = useAuth();
  const [ids, setIds] = useLocalStore(`${STORAGE_KEYS.profile}.shortlist.${user.id}`, []);
  const toggle = (slug) => {
    const exists = ids.includes(slug);
    setIds(exists ? ids.filter((x) => x !== slug) : [...ids, slug]);
    toast(exists ? "Removed from shortlist." : "Added to shortlist.");
  };
  return { ids, toggle };
}

function ShortlistButton({ slug, shortlist }) {
  const active = shortlist.ids.includes(slug);
  return (
    <Button variant={active ? "primary" : "outline"} size="sm" onClick={() => shortlist.toggle(slug)} aria-pressed={active}>
      {active ? <CheckCircle2 size={14} aria-hidden="true" /> : <PlusCircle size={14} aria-hidden="true" />}
      {active ? "Shortlisted" : "Shortlist"}
    </Button>
  );
}

export function EmployerCandidates({ candidates }) {
  const shortlist = useShortlist();
  const list = candidates.filter((c) => shortlist.ids.includes(c.slug));
  return (
    <>
      <DashboardHeader
        title="Manage Candidates"
        subtitle="Candidates you have shortlisted."
        actions={
          <Link href="/dashboard/employer/cv-search" className="btn btn--primary">
            <FileSearch size={16} aria-hidden="true" /> Search CVs
          </Link>
        }
      />
      {list.length === 0 ? (
        <EmptyState icon={<Users size={24} />} title="No shortlisted candidates" message="Use CV Search to find candidates and add them to your shortlist." action={<Link href="/dashboard/employer/cv-search" className="btn btn--primary">Open CV Search</Link>} />
      ) : (
        <div className="stack">
          {list.map((c) => (
            <div key={c.slug} style={{ position: "relative" }}>
              <CandidateCard candidate={c} />
              <div style={{ position: "absolute", top: 18, right: 20 }}>
                <ShortlistButton slug={c.slug} shortlist={shortlist} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* ---------- CV search ---------- */

export function EmployerCvSearch({ candidates }) {
  const shortlist = useShortlist();
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("");
  const [minExp, setMinExp] = useState("");
  const [page, setPage] = useState(1);
  const debounced = useDebounce(query, 250);

  const filtered = candidates.filter(
    (c) =>
      (!debounced || includesText(c.name, debounced) || includesText(c.title, debounced) || c.skills.some((s) => includesText(s, debounced))) &&
      (!sector || c.sector === sector) &&
      (!minExp || c.experienceYears >= Number(minExp))
  );
  const result = paginate(filtered, page, 5);

  return (
    <>
      <DashboardHeader title="CV Search" subtitle="Search resumes by skills, title, sector and experience." />
      <DashCard>
        <form className="form-grid" role="search" onSubmit={(e) => e.preventDefault()}>
          <Input
            label="Keywords"
            placeholder="e.g. React, Nurse, Accountant"
            icon={<Search size={16} />}
            className="span-2"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
          <Select label="Sector" placeholder="All sectors" options={SECTORS} value={sector} onChange={(e) => { setSector(e.target.value); setPage(1); }} />
          <Select label="Minimum Experience" placeholder="Any" options={[1, 3, 5, 8].map((n) => ({ value: String(n), label: `${n}+ years` }))} value={minExp} onChange={(e) => { setMinExp(e.target.value); setPage(1); }} />
        </form>
      </DashCard>
      <p className="mb-0">
        <strong style={{ color: "var(--heading)" }}>{filtered.length}</strong> candidates found
      </p>
      {filtered.length === 0 ? (
        <EmptyState title="No matching CVs" message="Try different keywords or remove a filter." />
      ) : (
        <div className="stack">
          {result.items.map((c) => (
            <div key={c.slug} style={{ position: "relative" }}>
              <CandidateCard candidate={c} />
              <div style={{ position: "absolute", top: 18, right: 20 }}>
                <ShortlistButton slug={c.slug} shortlist={shortlist} />
              </div>
            </div>
          ))}
        </div>
      )}
      <Pagination page={result.page} totalPages={result.totalPages} onChange={setPage} label="CV search pagination" />
    </>
  );
}

/* ---------- Packages ---------- */

export function EmployerPackages({ packages }) {
  const [current] = useState(packages[0]);
  return (
    <>
      <DashboardHeader title="Job Packages" subtitle="Your current plan and available upgrades." />
      <DashCard title="Current Package">
        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <span className="dash-stats__icon tone-blue" aria-hidden="true">
            <Package size={24} />
          </span>
          <div style={{ flex: 1 }}>
            <strong style={{ color: "var(--heading)", fontSize: 18 }}>{current.name}</strong>
            <div className="muted">{current.features.filter((f) => f.included).map((f) => f.label).join(" · ")}</div>
          </div>
          <span className="badge badge--success">Active</span>
        </div>
      </DashCard>
      <div className="pricing-grid pricing-grid--4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", maxWidth: "none" }}>
        {packages.map((pkg) => (
          <PricingCard key={pkg.id} pkg={pkg} variant="simple" type="job" ctaLabel={pkg.id === current.id ? "Current Plan" : "Upgrade"} />
        ))}
      </div>
    </>
  );
}
