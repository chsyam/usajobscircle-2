"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Briefcase,
  Building2,
  FileSearch,
  FileText,
  Heart,
  Inbox,
  LayoutDashboard,
  LogOut,
  Package,
  PlusCircle,
  Send,
  Settings,
  User,
  UserPen,
  Users,
} from "lucide-react";
import { DASHBOARD_NAV } from "./navigation";
import { cn, initials } from "@/lib/utils";

const ICONS = { Bell, Briefcase, Building2, FileSearch, FileText, Heart, Inbox, LayoutDashboard, Package, PlusCircle, Send, Settings, User, UserPen, Users };

export default function Sidebar({ role, user, open, onNavigate, onSignOut }) {
  const pathname = usePathname();
  const items = DASHBOARD_NAV[role];
  // Most specific match wins so "/jobs/new" doesn't also highlight "/jobs".
  const active = items
    .filter((i) => pathname === i.href || pathname.startsWith(`${i.href}/`))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;
  const name = `${user.firstName} ${user.lastName}`;

  return (
    <aside className={cn("dash-sidebar", open && "is-open")} aria-label="Dashboard navigation">
      <div className="dash-sidebar__user">
        <span className="dash-sidebar__avatar" aria-hidden="true">
          {initials(role === "employer" && user.organization ? user.organization : name)}
        </span>
        <div>
          <strong>{role === "employer" ? user.organization || name : name}</strong>
          <span>{role === "employer" ? "Employer" : "Candidate"}</span>
        </div>
      </div>
      <nav>
        <ul>
          {items.map((item) => {
            const Ico = ICONS[item.icon];
            return (
              <li key={item.href}>
                <Link href={item.href} className={cn(active === item.href && "is-active")} aria-current={active === item.href ? "page" : undefined} onClick={onNavigate}>
                  <Ico size={17} aria-hidden="true" /> {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <button type="button" onClick={onSignOut}>
              <LogOut size={17} aria-hidden="true" /> Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
