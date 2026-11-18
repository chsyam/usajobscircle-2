"use client";

import { STORAGE_KEYS } from "@/lib/constants";
import { useLocalStore } from "@/lib/localStore";
import { toast } from "@/components/common/Toast";

/** Generic toggle-able id list persisted locally (saved jobs, followed employers). */
function useIdList(key, { addedMessage, removedMessage }) {
  const [ids, setIds] = useLocalStore(key, []);
  const has = (id) => ids.includes(id);
  const toggle = (id) => {
    const exists = ids.includes(id);
    setIds((list) => (exists ? list.filter((x) => x !== id) : [...list, id]));
    toast(exists ? removedMessage : addedMessage);
  };
  const remove = (id) => setIds((list) => list.filter((x) => x !== id));
  return { ids, has, toggle, remove };
}

export function useSavedJobs() {
  return useIdList(STORAGE_KEYS.savedJobs, {
    addedMessage: "Job saved to your shortlist.",
    removedMessage: "Job removed from your shortlist.",
  });
}

export function useFollowedEmployers() {
  return useIdList(STORAGE_KEYS.followedEmployers, {
    addedMessage: "You are now following this employer.",
    removedMessage: "You unfollowed this employer.",
  });
}

export function useApplications() {
  const [applications, setApplications] = useLocalStore(STORAGE_KEYS.applications, []);
  const hasApplied = (slug) => applications.some((a) => a.jobSlug === slug);
  const apply = (jobSlug, data = {}) => {
    if (hasApplied(jobSlug)) return;
    setApplications((list) => [
      { id: `a_${Date.now()}`, jobSlug, appliedAt: new Date().toISOString(), status: "Submitted", ...data },
      ...list,
    ]);
  };
  const withdraw = (id) => setApplications((list) => list.filter((a) => a.id !== id));
  return { applications, hasApplied, apply, withdraw };
}

export function useJobAlerts() {
  const [alerts, setAlerts] = useLocalStore(STORAGE_KEYS.jobAlerts, []);
  const add = (alert) => setAlerts((list) => [{ id: `al_${Date.now()}`, createdAt: new Date().toISOString(), ...alert }, ...list]);
  const remove = (id) => setAlerts((list) => list.filter((a) => a.id !== id));
  return { alerts, add, remove };
}

export function usePostedJobs() {
  const [postedJobs, setPostedJobs] = useLocalStore(STORAGE_KEYS.postedJobs, []);
  const add = (job) =>
    setPostedJobs((list) => [{ id: `pj_${Date.now()}`, postedAt: new Date().toISOString(), ...job }, ...list]);
  const update = (id, patch) => setPostedJobs((list) => list.map((j) => (j.id === id ? { ...j, ...patch } : j)));
  const remove = (id) => setPostedJobs((list) => list.filter((j) => j.id !== id));
  return { postedJobs, add, update, remove };
}

export function useProfile(defaults) {
  const [profile, setProfile] = useLocalStore(STORAGE_KEYS.profile, null);
  return [profile || defaults, setProfile];
}
