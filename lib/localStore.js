"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny localStorage-backed store usable with useSyncExternalStore.
 * Stands in for backend persistence until the API is connected.
 */
const stores = new Map();

function createStore(key, initialValue) {
  let cache = initialValue;
  let loaded = false;
  const listeners = new Set();

  const read = () => {
    if (loaded || typeof window === "undefined") return cache;
    loaded = true;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) cache = JSON.parse(raw);
    } catch {
      cache = initialValue;
    }
    return cache;
  };

  const write = (next) => {
    const value = typeof next === "function" ? next(read()) : next;
    cache = value;
    loaded = true;
    try {
      if (value === null || value === undefined) window.localStorage.removeItem(key);
      else window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage may be unavailable (private mode); keep in-memory value */
    }
    listeners.forEach((l) => l());
  };

  const subscribe = (listener) => {
    listeners.add(listener);
    const onStorage = (e) => {
      if (e.key === key) {
        loaded = false;
        listener();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  };

  return { read, write, subscribe, initialValue };
}

export function getStore(key, initialValue) {
  if (!stores.has(key)) stores.set(key, createStore(key, initialValue));
  return stores.get(key);
}

/** React hook: [value, setValue] persisted in localStorage. */
export function useLocalStore(key, initialValue) {
  const store = getStore(key, initialValue);
  const value = useSyncExternalStore(store.subscribe, store.read, () => store.initialValue);
  return [value, store.write];
}
