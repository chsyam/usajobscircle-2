"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { notifications } from "@/data/testimonials";
import { STORAGE_KEYS } from "@/lib/constants";
import { useLocalStore } from "@/lib/localStore";

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [readIds, setReadIds] = useLocalStore(STORAGE_KEYS.notificationsRead, []);
  const ref = useRef(null);
  const unread = notifications.filter((n) => !readIds.includes(n.id));

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const markRead = (id) => !readIds.includes(id) && setReadIds([...readIds, id]);

  return (
    <div className="notif" ref={ref}>
      <button
        type="button"
        className="notif__btn"
        aria-label={`Notifications (${unread.length} unread)`}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <Bell size={18} />
        <span className="notif__count">{unread.length}</span>
      </button>
      {open && (
        <div className="notif__panel">
          <div className="notif__head">
            Notifications
            {unread.length > 0 && (
              <button type="button" onClick={() => setReadIds(notifications.map((n) => n.id))}>
                Mark all as read
              </button>
            )}
          </div>
          {notifications.length === 0 ? (
            <p className="notif__empty">You&apos;re all caught up.</p>
          ) : (
            <ul className="notif__list">
              {notifications.map((n) => (
                <li key={n.id} className={readIds.includes(n.id) ? "" : "is-unread"}>
                  <Link
                    href={n.href}
                    onClick={() => {
                      markRead(n.id);
                      setOpen(false);
                    }}
                  >
                    <strong>{n.title}</strong>
                    {n.text}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
