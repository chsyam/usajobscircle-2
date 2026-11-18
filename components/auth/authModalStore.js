"use client";

import { useSyncExternalStore } from "react";

/** Global open/close state for the authentication modal. mode: "signin" | "signup" | null */
let mode = null;
const listeners = new Set();

export function openAuthModal(next = "signin") {
  mode = next;
  listeners.forEach((l) => l());
}

export function closeAuthModal() {
  mode = null;
  listeners.forEach((l) => l());
}

const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useAuthModal() {
  return useSyncExternalStore(subscribe, () => mode, () => null);
}
