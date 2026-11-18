"use client";

import { Heart } from "lucide-react";
import { useSavedJobs } from "@/hooks/useUserData";
import { useHydrated } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export default function SaveJobButton({ slug, withLabel = false }) {
  const { has, toggle } = useSavedJobs();
  const hydrated = useHydrated();
  const saved = hydrated && has(slug);

  if (withLabel) {
    return (
      <button type="button" className={cn("btn btn--outline", saved && "is-active")} onClick={() => toggle(slug)} aria-pressed={saved}>
        <Heart size={16} fill={saved ? "currentColor" : "none"} aria-hidden="true" />
        {saved ? "Saved" : "Save Job"}
      </button>
    );
  }

  return (
    <button
      type="button"
      className={cn("save-btn", saved && "is-active")}
      onClick={() => toggle(slug)}
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved jobs" : "Save job"}
      title={saved ? "Saved" : "Save job"}
    >
      <Heart size={16} aria-hidden="true" />
    </button>
  );
}
