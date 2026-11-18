"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/hooks/useAuth";

/** Accessible modal dialog rendered in a portal. Closes on Escape and backdrop click. */
export default function Modal({ open, onClose, title, size, children, footer, labelledBy }) {
  const hydrated = useHydrated();
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const focusable = dialogRef.current?.querySelector("input, select, textarea, button:not(.modal__close), a[href]");
    (focusable || dialogRef.current)?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, [open, onClose]);

  if (!open || !hydrated) return null;

  return createPortal(
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}>
      <div
        ref={dialogRef}
        className={cn("modal", size && `modal--${size}`)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy || (title ? titleId : undefined)}
        tabIndex={-1}
      >
        {title ? (
          <div className="modal__header">
            <h2 id={titleId}>{title}</h2>
            <button type="button" className="modal__close" onClick={onClose} aria-label="Close dialog">
              <X size={20} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="modal__close"
            onClick={onClose}
            aria-label="Close dialog"
            style={{ position: "absolute", top: 10, right: 10, zIndex: 1 }}
          >
            <X size={20} />
          </button>
        )}
        <div className="modal__body">{children}</div>
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}
