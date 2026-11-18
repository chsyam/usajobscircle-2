"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Building2, FileText, Heart, Pencil, Plus, Send, Trash2, UploadCloud } from "lucide-react";
import DashboardHeader, { DashCard } from "./DashboardHeader";
import DashboardStats from "./DashboardStats";
import JobCard from "@/components/jobs/JobCard";
import EmployerCard from "@/components/employers/EmployerCard";
import JobAlertForm from "@/components/jobs/JobAlertForm";
import EmptyState from "@/components/common/EmptyState";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Button from "@/components/common/Button";
import Input, { Textarea } from "@/components/common/Input";
import Select from "@/components/common/Select";
import { useAuth } from "@/hooks/useAuth";
import { useApplications, useFollowedEmployers, useJobAlerts, useSavedJobs } from "@/hooks/useUserData";
import { useForm } from "@/hooks/useForm";
import { useLocalStore } from "@/lib/localStore";
import { SECTORS, STORAGE_KEYS } from "@/lib/constants";
import { rules } from "@/lib/validations";
import { formatDate, formatShortDate } from "@/lib/formatters";
import { initials } from "@/lib/utils";
import { toast } from "@/components/common/Toast";

/* ---------- Profile storage (per user) ---------- */

function useCandidateProfile(candidates) {
  const { user } = useAuth();
  const seed = candidates.find((c) => c.slug === user.candidateSlug);
  const defaults = {
    title: seed?.title || "",
    sector: seed?.sector || "",
    city: seed?.city || "",
    state: seed?.state || "",
    experienceYears: seed?.experienceYears ?? "",
    salary: seed?.salary || "",
    education: seed?.education || "",
    summary: seed?.summary || "",
    skills: seed?.skills?.join(", ") || "",
    linkedin: seed?.social?.linkedin || "",
    avatar: seed?.avatar || null,
  };
  const [stored, setStored] = useLocalStore(`${STORAGE_KEYS.profile}.${user.id}`, null);
  return [{ ...defaults, ...stored }, setStored, seed];
}

const STATUS_TONE = { Submitted: "badge--type", Reviewed: "badge--warning", Shortlisted: "badge--success", Rejected: "badge--danger" };

/* ---------- Overview ---------- */

export function CandidateOverview({ jobs }) {
  const { user } = useAuth();
  const { applications } = useApplications();
  const saved = useSavedJobs();
  const followed = useFollowedEmployers();
  const { alerts } = useJobAlerts();
  const recommended = jobs.filter((j) => !saved.has(j.slug)).slice(0, 3);

  return (
    <>
      <DashboardHeader
        title={`Welcome back, ${user.firstName}!`}
        subtitle="Here's what's happening with your job search."
        actions={
          <Link href="/jobs-listing" className="btn btn--primary">
            Find Jobs
          </Link>
        }
      />
      <DashboardStats
        stats={[
          { label: "Applications", value: applications.length, icon: Send, href: "/dashboard/candidate/applications" },
          { label: "Saved Jobs", value: saved.ids.length, icon: Heart, href: "/dashboard/candidate/saved-jobs", tone: "red" },
          { label: "Followed Employers", value: followed.ids.length, icon: Building2, href: "/dashboard/candidate/followed-employers", tone: "green" },
          { label: "Job Alerts", value: alerts.length, icon: Bell, href: "/dashboard/candidate/job-alerts", tone: "orange" },
        ]}
      />
      <div className="dash-grid-2">
        <DashCard title="Recent Applications" actions={<Link href="/dashboard/candidate/applications" className="link-btn">View all</Link>}>
          {applications.length === 0 ? (
            <p className="mb-0">
              You haven&apos;t applied to any jobs yet. <Link href="/jobs-listing" className="link-btn">Browse jobs</Link>
            </p>
          ) : (
            <ul className="mini-list">
              {applications.slice(0, 4).map((a) => (
                <li key={a.id}>
                  <Link href={`/job/${a.jobSlug}`}>
                    {a.jobTitle}
                    <small>{a.employerName} · {formatShortDate(a.appliedAt)}</small>
                  </Link>
                  <span className={`badge ${STATUS_TONE[a.status] || "badge--muted"}`}>{a.status}</span>
                </li>
              ))}
            </ul>
          )}
        </DashCard>
        <DashCard title="Profile Strength">
          <ProfileStrength />
        </DashCard>
      </div>
      <DashCard title="Recommended Jobs">
        <div className="stack">
          {recommended.map((job) => (
            <JobCard key={job.slug} job={job} />
          ))}
        </div>
      </DashCard>
    </>
  );
}

function ProfileStrength() {
  const { user } = useAuth();
  const [resume] = useLocalStore(`${STORAGE_KEYS.profile}.resume.${user.id}`, null);
  const [profile] = useLocalStore(`${STORAGE_KEYS.profile}.${user.id}`, null);
  const checks = [
    { label: "Account created", done: true },
    { label: "Profile details saved", done: Boolean(profile) || Boolean(user.candidateSlug) },
    { label: "Resume uploaded", done: Boolean(resume?.file) },
    { label: "Phone number added", done: Boolean(user.phone) },
  ];
  const pct = Math.round((checks.filter((c) => c.done).length / checks.length) * 100);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <strong style={{ color: "var(--heading)" }}>{pct}% complete</strong>
      </div>
      <div style={{ height: 8, background: "var(--bg-light)", borderRadius: 4, overflow: "hidden", marginBottom: 16 }} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Profile completeness">
        <div style={{ width: `${pct}%`, height: "100%", background: "var(--primary)" }} />
      </div>
      <ul className="mini-list">
        {checks.map((c) => (
          <li key={c.label}>
            {c.label}
            <span className={`badge ${c.done ? "badge--success" : "badge--muted"}`}>{c.done ? "Done" : "To do"}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

/* ---------- Profile view & edit ---------- */

export function CandidateProfileView({ candidates }) {
  const { user } = useAuth();
  const [profile, , seed] = useCandidateProfile(candidates);
  const name = `${user.firstName} ${user.lastName}`;
  const rows = [
    ["Professional Title", profile.title || "—"],
    ["Sector", profile.sector || "—"],
    ["Location", [profile.city, profile.state].filter(Boolean).join(", ") || "—"],
    ["Experience", profile.experienceYears !== "" ? `${profile.experienceYears} years` : "—"],
    ["Expected Salary", profile.salary || "—"],
    ["Education", profile.education || "—"],
    ["Email", user.email],
    ["Phone", user.phone || "—"],
  ];
  return (
    <>
      <DashboardHeader
        title="My Profile"
        actions={
          <>
            {seed && (
              <Link href={`/candidate/${seed.slug}`} className="btn btn--ghost">
                View Public Profile
              </Link>
            )}
            <Link href="/dashboard/candidate/profile/edit" className="btn btn--primary">
              <Pencil size={15} aria-hidden="true" /> Edit Profile
            </Link>
          </>
        }
      />
      <DashCard>
        <div className="profile-view">
          {profile.avatar ? (
            <Image src={profile.avatar} alt={name} width={100} height={100} className="avatar" unoptimized={profile.avatar.startsWith("data:")} />
          ) : (
            <span className="dash-sidebar__avatar" style={{ width: 100, height: 100, fontSize: 30 }}>{initials(name)}</span>
          )}
          <div>
            <h2>{name}</h2>
            <p className="text-primary mb-0">{profile.title || "Add your professional title"}</p>
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
      <DashCard title="Professional Summary">
        <p className="mb-0">{profile.summary || "Tell employers about yourself in the Edit Profile page."}</p>
      </DashCard>
      <DashCard title="Skills">
        {profile.skills ? (
          <ul className="tag-list">
            {profile.skills.split(",").map((s) => s.trim()).filter(Boolean).map((s) => (
              <li key={s} className="tag">{s}</li>
            ))}
          </ul>
        ) : (
          <p className="mb-0">No skills added yet.</p>
        )}
      </DashCard>
    </>
  );
}

const profileSchema = {
  title: [rules.required("Add a professional title.")],
  city: [rules.required("City is required.")],
  experienceYears: [(v) => (v !== "" && (Number(v) < 0 || Number(v) > 60) ? "Enter years between 0 and 60." : null)],
  summary: [rules.maxLength(1200)],
  linkedin: [rules.url()],
};

export function CandidateProfileEdit({ candidates }) {
  const router = useRouter();
  const [profile, setProfile] = useCandidateProfile(candidates);
  const { register, setValue, values, handleSubmit, submitting } = useForm(profile, profileSchema);
  const fileRef = useRef(null);

  const onAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 1024 * 1024) {
      toast("Please choose an image under 1 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setValue("avatar", reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <>
      <DashboardHeader title="Edit Profile" subtitle="Keep your profile up to date so employers can find you." />
      <form
        noValidate
        className="stack"
        onSubmit={handleSubmit(async (vals) => {
          setProfile(vals);
          toast("Profile saved.");
          router.push("/dashboard/candidate/profile");
        })}
      >
        <DashCard title="Profile Photo">
          <div className="profile-view mb-0">
            {values.avatar ? (
              <Image src={values.avatar} alt="Profile photo preview" width={90} height={90} className="avatar" unoptimized={values.avatar.startsWith("data:")} />
            ) : (
              <span className="dash-sidebar__avatar" style={{ width: 90, height: 90 }}>?</span>
            )}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={onAvatar} />
              <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
                <UploadCloud size={15} aria-hidden="true" /> Upload Photo
              </Button>
              {values.avatar && (
                <Button variant="ghost" size="sm" onClick={() => setValue("avatar", null)}>
                  Remove
                </Button>
              )}
            </div>
          </div>
        </DashCard>
        <DashCard title="Basic Information">
          <div className="form-grid">
            <Input label="Professional Title" required {...register("title")} />
            <Select label="Sector" placeholder="Select sector" options={SECTORS} {...register("sector")} />
            <Input label="City" required {...register("city")} />
            <Input label="State" {...register("state")} />
            <Input label="Years of Experience" type="number" min="0" max="60" {...register("experienceYears")} />
            <Input label="Expected Salary" placeholder="$80,000 / year" {...register("salary")} />
            <Input label="Highest Education" className="span-2" {...register("education")} />
            <Textarea label="Professional Summary" className="span-2" rows={5} {...register("summary")} />
            <Input label="Skills" hint="Separate skills with commas." className="span-2" {...register("skills")} />
            <Input label="LinkedIn URL" type="url" className="span-2" {...register("linkedin")} />
          </div>
        </DashCard>
        <div className="form-actions">
          <Link href="/dashboard/candidate/profile" className="btn btn--ghost">
            Cancel
          </Link>
          <Button type="submit" loading={submitting}>
            Save Profile
          </Button>
        </div>
      </form>
    </>
  );
}

/* ---------- Resume ---------- */

const emptyExperience = { role: "", company: "", period: "", description: "" };

export function CandidateResume() {
  const { user } = useAuth();
  const [resume, setResume] = useLocalStore(`${STORAGE_KEYS.profile}.resume.${user.id}`, { file: null, experience: [], education: [] });
  const [dragging, setDragging] = useState(false);
  const [draft, setDraft] = useState(emptyExperience);
  const fileRef = useRef(null);

  const acceptFile = (file) => {
    if (!file) return;
    const ok = /\.(pdf|docx?|rtf)$/i.test(file.name) && file.size <= 5 * 1024 * 1024;
    if (!ok) {
      toast("Upload a PDF, DOC or DOCX file up to 5 MB.");
      return;
    }
    // File metadata only; the binary will be uploaded to storage via the API later.
    setResume({ ...resume, file: { name: file.name, size: file.size, uploadedAt: new Date().toISOString() } });
    toast("Resume uploaded.");
  };

  const addExperience = (e) => {
    e.preventDefault();
    if (!draft.role.trim() || !draft.company.trim()) {
      toast("Role and company are required.");
      return;
    }
    setResume({ ...resume, experience: [...resume.experience, { ...draft, id: Date.now() }] });
    setDraft(emptyExperience);
  };

  return (
    <>
      <DashboardHeader title="My Resume" subtitle="Upload your CV and add your work history." />
      <DashCard title="Resume / CV File">
        {resume.file ? (
          <div className="resume-file">
            <FileText size={34} aria-hidden="true" />
            <div>
              <strong>{resume.file.name}</strong>
              <span>
                {(resume.file.size / 1024).toFixed(0)} KB · uploaded {formatDate(resume.file.uploadedAt)}
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => fileRef.current?.click()}>
              Replace
            </Button>
            <Button variant="danger" size="sm" onClick={() => setResume({ ...resume, file: null })}>
              Remove
            </Button>
          </div>
        ) : (
          <label
            className={`dropzone${dragging ? " is-dragging" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              acceptFile(e.dataTransfer.files?.[0]);
            }}
          >
            <UploadCloud size={38} aria-hidden="true" />
            <strong>Drag & drop your resume here or click to browse</strong>
            <span className="muted">PDF, DOC or DOCX · max 5 MB</span>
            <input type="file" accept=".pdf,.doc,.docx,.rtf" className="sr-only" onChange={(e) => acceptFile(e.target.files?.[0])} />
          </label>
        )}
        <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.rtf" hidden onChange={(e) => acceptFile(e.target.files?.[0])} />
      </DashCard>

      <DashCard title="Work Experience">
        {resume.experience.length === 0 && <p>No experience added yet.</p>}
        {resume.experience.map((exp) => (
          <div key={exp.id} className="repeat-item">
            <button
              type="button"
              className="modal__close repeat-item__remove"
              aria-label={`Remove ${exp.role}`}
              onClick={() => setResume({ ...resume, experience: resume.experience.filter((x) => x.id !== exp.id) })}
            >
              <Trash2 size={16} />
            </button>
            <strong style={{ color: "var(--heading)" }}>{exp.role}</strong>
            <div className="muted">
              {exp.company} {exp.period && `· ${exp.period}`}
            </div>
            {exp.description && <p className="mb-0">{exp.description}</p>}
          </div>
        ))}
        <form className="stack" style={{ marginTop: 20 }} onSubmit={addExperience}>
          <div className="form-grid">
            <Input label="Role" value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} />
            <Input label="Company" value={draft.company} onChange={(e) => setDraft({ ...draft, company: e.target.value })} />
            <Input label="Period" placeholder="2021 – Present" className="span-2" value={draft.period} onChange={(e) => setDraft({ ...draft, period: e.target.value })} />
            <Textarea label="Description" className="span-2" rows={3} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
          </div>
          <div>
            <Button type="submit" variant="outline">
              <Plus size={15} aria-hidden="true" /> Add Experience
            </Button>
          </div>
        </form>
      </DashCard>
    </>
  );
}

/* ---------- Applications ---------- */

export function CandidateApplications() {
  const { applications, withdraw } = useApplications();
  const [pending, setPending] = useState(null);
  return (
    <>
      <DashboardHeader title="My Applications" subtitle={`${applications.length} application${applications.length === 1 ? "" : "s"}`} />
      {applications.length === 0 ? (
        <EmptyState icon={<Send size={24} />} title="No applications yet" message="When you apply for jobs they'll show up here." action={<Link href="/jobs-listing" className="btn btn--primary">Browse Jobs</Link>} />
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Job</th>
                <th scope="col">Company</th>
                <th scope="col">Applied</th>
                <th scope="col">Status</th>
                <th scope="col">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {applications.map((a) => (
                <tr key={a.id}>
                  <td>
                    <Link href={`/job/${a.jobSlug}`}>{a.jobTitle}</Link>
                  </td>
                  <td>{a.employerName}</td>
                  <td>{formatShortDate(a.appliedAt)}</td>
                  <td>
                    <span className={`badge ${STATUS_TONE[a.status] || "badge--muted"}`}>{a.status}</span>
                  </td>
                  <td>
                    <div className="table__actions">
                      <Button variant="ghost" size="sm" onClick={() => setPending(a)}>
                        Withdraw
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ConfirmDialog
        open={Boolean(pending)}
        title="Withdraw application?"
        message={pending ? `Your application for ${pending.jobTitle} will be withdrawn.` : ""}
        confirmLabel="Withdraw"
        onCancel={() => setPending(null)}
        onConfirm={() => {
          if (pending) withdraw(pending?.id);
          setPending(null);
          toast("Application withdrawn.");
        }}
      />
    </>
  );
}

/* ---------- Saved jobs ---------- */

export function CandidateSavedJobs({ jobs }) {
  const { ids } = useSavedJobs();
  const saved = jobs.filter((j) => ids.includes(j.slug));
  return (
    <>
      <DashboardHeader title="Saved Jobs" subtitle={`${saved.length} saved`} />
      {saved.length === 0 ? (
        <EmptyState icon={<Heart size={24} />} title="No saved jobs" message="Tap the heart on any job to save it for later." action={<Link href="/jobs-listing" className="btn btn--primary">Browse Jobs</Link>} />
      ) : (
        <div className="stack">
          {saved.map((job) => (
            <JobCard key={job.slug} job={job} />
          ))}
        </div>
      )}
    </>
  );
}

/* ---------- Followed employers ---------- */

export function CandidateFollowedEmployers({ employers }) {
  const { ids } = useFollowedEmployers();
  const list = employers.filter((e) => ids.includes(e.slug));
  return (
    <>
      <DashboardHeader title="Followed Employers" subtitle={`${list.length} following`} />
      {list.length === 0 ? (
        <EmptyState icon={<Building2 size={24} />} title="You're not following any employers" message="Follow companies to keep track of their new openings." action={<Link href="/employer-listing" className="btn btn--primary">Browse Employers</Link>} />
      ) : (
        <div className="stack">
          {list.map((e) => (
            <EmployerCard key={e.slug} employer={e} />
          ))}
        </div>
      )}
    </>
  );
}

/* ---------- Job alerts ---------- */

export function CandidateJobAlerts() {
  const { alerts, remove } = useJobAlerts();
  return (
    <>
      <DashboardHeader title="Job Alerts" subtitle="Get new jobs matching your search delivered to your inbox." />
      <div className="dash-grid-2" style={{ alignItems: "start" }}>
        <DashCard title={`Your Alerts (${alerts.length})`}>
          {alerts.length === 0 ? (
            <p className="mb-0">No alerts yet. Create one using the form.</p>
          ) : (
            <ul className="mini-list">
              {alerts.map((a) => (
                <li key={a.id}>
                  <span>
                    <strong style={{ color: "var(--heading)", fontWeight: 500 }}>{a.name}</strong>
                    <small className="muted" style={{ display: "block" }}>
                      {a.frequency} · {a.email}
                      {a.criteria?.keyword ? ` · “${a.criteria.keyword}”` : ""}
                      {a.criteria?.sector ? ` · ${a.criteria.sector}` : ""}
                    </small>
                  </span>
                  <button type="button" className="modal__close" aria-label={`Delete alert ${a.name}`} onClick={() => { remove(a.id); toast("Alert deleted."); }}>
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </DashCard>
        <JobAlertForm />
      </div>
    </>
  );
}
