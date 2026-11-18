"use client";

import { useSyncExternalStore } from "react";
import { STORAGE_KEYS } from "@/lib/constants";
import { useLocalStore } from "@/lib/localStore";
import * as authService from "@/services/authService";

const noopSubscribe = () => () => {};

/** True after hydration; avoids rendering browser-only state on the server. */
export function useHydrated() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

export function useAuth() {
  const [user] = useLocalStore(STORAGE_KEYS.session, null);
  const hydrated = useHydrated();
  return {
    user,
    hydrated,
    isAuthenticated: Boolean(user),
    role: user?.role || null,
    signIn: authService.signIn,
    signUp: authService.signUp,
    signOut: authService.signOut,
    updateAccount: authService.updateAccount,
    changePassword: authService.changePassword,
  };
}
