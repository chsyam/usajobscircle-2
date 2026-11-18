"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Send } from "lucide-react";
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";
import { Textarea } from "@/components/common/Input";
import { useAuth } from "@/hooks/useAuth";
import { useApplications } from "@/hooks/useUserData";
import { openAuthModal } from "@/components/auth/authModalStore";
import { toast } from "@/components/common/Toast";

export default function ApplyButton({ job, block = false }) {
  const { user, hydrated } = useAuth();
  const { hasApplied, apply } = useApplications();
  const [open, setOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const applied = hydrated && hasApplied(job.slug);

  const onClick = () => {
    if (!user) {
      toast("Please sign in with a candidate account to apply.");
      openAuthModal("signin");
      return;
    }
    if (user?.role !== "candidate") {
      toast("Only candidate accounts can apply for jobs.");
      return;
    }
    setOpen(true);
  };

  if (applied) {
    return (
      <Link href="/dashboard/candidate/applications" className={`btn btn--ghost${block ? " btn--block" : ""}`}>
        <CheckCircle2 size={16} aria-hidden="true" /> Applied
      </Link>
    );
  }

  return (
    <>
      <Button onClick={onClick} block={block}>
        <Send size={16} aria-hidden="true" /> Apply Now
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={`Apply for ${job.title}`}
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={() => {
                apply(job.slug, { coverLetter, jobTitle: job.title, employerName: job.employer?.name });
                setOpen(false);
                toast("Application submitted. Good luck!");
              }}
            >
              Submit Application
            </Button>
          </>
        }
      >
        <p>
          Your profile and resume will be shared with <strong>{job.employer?.name}</strong>.
        </p>
        <Textarea
          label="Cover letter (optional)"
          placeholder="Tell the employer why you're a great fit…"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          maxLength={2000}
        />
      </Modal>
    </>
  );
}
