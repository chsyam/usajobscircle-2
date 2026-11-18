"use client";

import { useSyncExternalStore } from "react";
import { CheckCircle2 } from "lucide-react";

/** Minimal global toast queue. Call toast("message") from any client code. */
let toasts = [];
const listeners = new Set();
const emit = () => listeners.forEach((l) => l());

export function toast(message) {
  if (!message) return;
  const id = Math.random().toString(36).slice(2);
  toasts = [...toasts, { id, message }];
  emit();
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    emit();
  }, 3200);
}

const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const empty = [];

export default function ToastRegion() {
  const items = useSyncExternalStore(subscribe, () => toasts, () => empty);
  return (
    <div className="toast-region" role="status" aria-live="polite">
      {items.map((t) => (
        <div key={t.id} className="toast">
          <CheckCircle2 size={18} color="#13b5ea" aria-hidden="true" />
          {t.message}
        </div>
      ))}
    </div>
  );
}
