"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { MAIN_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function isActivePath(pathname, href) {
  if (!href) return false;
  const base = href.split("?")[0];
  if (base === "/") return pathname === "/";
  return pathname === base || pathname.startsWith(`${base}/`);
}

/** Desktop navigation with hover / keyboard / click-accessible dropdowns. */
export default function Navbar({ pathname }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <nav className="main-nav" aria-label="Main">
      <ul>
        {MAIN_NAV.map((item, index) => {
          if (!item.children) {
            return (
              <li key={item.label} className="main-nav__item">
                <Link
                  href={item.href}
                  className={cn("main-nav__link", isActivePath(pathname, item.href) && "is-active")}
                  aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          }
          const groupActive = item.children.some((c) => isActivePath(pathname, c.href));
          const isOpen = openIndex === index;
          return (
            <li
              key={item.label}
              className={cn("main-nav__item", isOpen && "is-open")}
              onMouseLeave={() => setOpenIndex(null)}
              onKeyDown={(e) => e.key === "Escape" && setOpenIndex(null)}
            >
              <button
                type="button"
                className={cn("main-nav__link", groupActive && "is-active")}
                aria-expanded={isOpen}
                aria-haspopup="true"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                {item.label}
                <ChevronDown size={14} aria-hidden="true" />
              </button>
              <ul className="main-nav__dropdown">
                {item.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      className={cn(isActivePath(pathname, child.href) && "is-active")}
                      onClick={() => setOpenIndex(null)}
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
