"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import Logo from "./Logo";
import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";
import NotificationDropdown from "./NotificationDropdown";
import UserMenu from "./UserMenu";
import AuthModal from "@/components/auth/AuthModal";
import { openAuthModal } from "@/components/auth/authModalStore";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/common/Toast";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, hydrated, signOut } = useAuth();
  const dashboardHref = user?.role === "employer" ? "/dashboard/employer" : "/dashboard/candidate";

  const handleSignOut = async () => {
    await signOut();
    toast("You have been signed out.");
    router.push("/");
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div>
          <button
            type="button"
            className="menu-toggle"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          <Navbar pathname={pathname} />
        </div>

        <div className="site-header__logo">
          <Logo />
        </div>

        <div className="site-header__actions">
          <NotificationDropdown />
          {hydrated && user ? (
            <UserMenu user={user} dashboardHref={dashboardHref} onSignOut={handleSignOut} />
          ) : (
            <>
              <button type="button" className="header-link header-link--desktop" onClick={() => openAuthModal("signup")}>
                Register
              </button>
              <button type="button" className="header-link" onClick={() => openAuthModal("signin")}>
                Sign In
              </button>
            </>
          )}
        </div>
      </div>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
        user={hydrated ? user : null}
        dashboardHref={dashboardHref}
        onSignOut={handleSignOut}
      />
      <AuthModal />
    </header>
  );
}
