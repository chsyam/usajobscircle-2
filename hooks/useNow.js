"use client";

import { useSyncExternalStore } from "react";

/**
 * Current time as an external store: null during SSR/hydration, then a
 * timestamp refreshed every minute. Keeps render functions pure.
 */
let now = null;
const listeners = new Set();
let timer = null;

function subscribe(listener) {
  listeners.add(listener);
  if (!timer) {
    timer = setInterval(() => {
      now = Date.now();
      listeners.forEach((l) => l());
    }, 60_000);
  }
  return () => {
    listeners.delete(listener);
    if (!listeners.size) {
      clearInterval(timer);
      timer = null;
    }
  };
}

function getSnapshot() {
  if (now === null) now = Date.now();
  return now;
}

export function useNow() {
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}
