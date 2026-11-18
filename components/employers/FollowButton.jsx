"use client";

import { UserCheck, UserPlus } from "lucide-react";
import { useFollowedEmployers } from "@/hooks/useUserData";
import { useHydrated } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export default function FollowButton({ slug, size = "sm", label = "Follow" }) {
  const { has, toggle } = useFollowedEmployers();
  const hydrated = useHydrated();
  const following = hydrated && has(slug);
  return (
    <button
      type="button"
      className={cn("btn btn--outline", size && `btn--${size}`, following && "is-active")}
      onClick={() => toggle(slug)}
      aria-pressed={following}
    >
      {following ? <UserCheck size={15} aria-hidden="true" /> : <UserPlus size={15} aria-hidden="true" />}
      {following ? "Following" : label}
    </button>
  );
}
