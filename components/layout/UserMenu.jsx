"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LayoutDashboard, LogOut, Settings, User } from "lucide-react";
import { initials } from "@/lib/utils";

export default function UserMenu({ user, dashboardHref, onSignOut }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => !ref.current?.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const name = `${user.firstName} ${user.lastName}`;
  const close = () => setOpen(false);

  return (
    <div className="user-menu" ref={ref}>
      <button type="button" className="user-menu__btn" aria-label={`Account menu for ${name}`} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span className="user-menu__avatar" aria-hidden="true">
          {initials(name)}
        </span>
        <span className="user-menu__name">{user.firstName}</span>
        <ChevronDown size={14} aria-hidden="true" />
      </button>
      {open && (
        <div className="user-menu__panel">
          <Link href={dashboardHref} onClick={close}>
            <LayoutDashboard size={16} /> Dashboard
          </Link>
          <Link href={`${dashboardHref}/profile`} onClick={close}>
            <User size={16} /> {user.role === "employer" ? "Company Profile" : "My Profile"}
          </Link>
          <Link href={`${dashboardHref}/settings`} onClick={close}>
            <Settings size={16} /> Account Settings
          </Link>
          <button
            type="button"
            onClick={() => {
              close();
              onSignOut();
            }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
