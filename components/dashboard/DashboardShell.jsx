"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import Loader from "@/components/common/Loader";
import EmptyState from "@/components/common/EmptyState";
import { useAuth } from "@/hooks/useAuth";
import { openAuthModal } from "@/components/auth/authModalStore";
import { toast } from "@/components/common/Toast";

/** Guards dashboard routes by role and renders the sidebar layout. */
export default function DashboardShell({ role, children }) {
  const { user, hydrated, signOut } = useAuth();
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);

  if (!hydrated) return <Loader label="Loading your dashboard…" />;

  if (!user) {
    return (
      <div className="container section">
        <EmptyState
          icon={<Lock size={26} />}
          title="Please sign in"
          message={`You need a ${role} account to access this dashboard.`}
          action={
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <button type="button" className="btn btn--primary" onClick={() => openAuthModal("signin")}>
                Sign In
              </button>
              <Link href="/sign-up" className="btn btn--outline">
                Create Account
              </Link>
            </div>
          }
        />
      </div>
    );
  }

  if (user.role !== role) {
    const own = user.role === "employer" ? "/dashboard/employer" : "/dashboard/candidate";
    return (
      <div className="container section">
        <EmptyState
          icon={<Lock size={26} />}
          title="This area is for another account type"
          message={`You're signed in as a${user.role === "employer" ? "n employer" : " candidate"}. This page is only available to ${role}s.`}
          action={
            <Link href={own} className="btn btn--primary">
              Go to my dashboard
            </Link>
          }
        />
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    toast("You have been signed out.");
    router.push("/");
  };

  return (
    <div className="dash">
      <div className="container dash__inner">
        <button type="button" className="btn btn--ghost dash__menu-btn" onClick={() => setNavOpen((o) => !o)} aria-expanded={navOpen}>
          <Menu size={16} aria-hidden="true" /> Dashboard Menu
        </button>
        <Sidebar role={role} user={user} open={navOpen} onNavigate={() => setNavOpen(false)} onSignOut={handleSignOut} />
        <div className="dash__content">{children}</div>
      </div>
    </div>
  );
}
