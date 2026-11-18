"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { MAIN_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { isActivePath } from "./Navbar";
import { openAuthModal } from "@/components/auth/authModalStore";

export default function MobileMenu({ open, onClose, pathname, user, dashboardHref, onSignOut }) {
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="mobile-menu__backdrop" onClick={onClose} />
      <div className="mobile-menu__panel">
        <div className="mobile-menu__head">
          <Logo onClick={onClose} />
          <button type="button" className="modal__close" onClick={onClose} aria-label="Close menu">
            <X size={22} />
          </button>
        </div>
        <nav aria-label="Mobile">
          {MAIN_NAV.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  type="button"
                  className="mobile-menu__group-btn"
                  aria-expanded={expanded === item.label}
                  onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                >
                  {item.label}
                  <ChevronDown size={16} aria-hidden="true" />
                </button>
                {expanded === item.label && (
                  <div className="mobile-menu__sub">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onClose}
                        className={cn(isActivePath(pathname, child.href) && "is-active")}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(isActivePath(pathname, item.href) && "is-active")}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
        <div className="mobile-menu__auth">
          {user ? (
            <>
              <Link href={dashboardHref} className="btn btn--primary" onClick={onClose}>
                My Dashboard
              </Link>
              <button
                type="button"
                className="btn btn--outline"
                onClick={() => {
                  onSignOut();
                  onClose();
                }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => {
                  onClose();
                  openAuthModal("signup");
                }}
              >
                Register
              </button>
              <button
                type="button"
                className="btn btn--outline"
                onClick={() => {
                  onClose();
                  openAuthModal("signin");
                }}
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
