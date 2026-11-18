import { demoUsers } from "@/data/users";
import { STORAGE_KEYS } from "@/lib/constants";
import { getStore } from "@/lib/localStore";
import { apiRequest, isApiEnabled } from "./apiClient";

/**
 * Mock auth service. Each method mirrors the shape of the future API so the UI
 * does not change when a real backend is connected.
 * NOTE: the mock keeps registered users in localStorage for demo purposes only.
 */
const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));
const usersStore = () => getStore(STORAGE_KEYS.users, []);
const sessionStore = () => getStore(STORAGE_KEYS.session, null);

const publicUser = ({ password, activationCode, ...user }) => user;

const allUsers = () => [...demoUsers, ...usersStore().read()];

export async function signIn({ identifier, password }) {
  if (isApiEnabled()) return apiRequest("/auth/sign-in", { method: "POST", body: { identifier, password } });
  await delay();
  const id = identifier.trim().toLowerCase();
  const user = allUsers().find((u) => u.email.toLowerCase() === id || u.username.toLowerCase() === id);
  if (!user || user.password !== password) throw new Error("Invalid username/email or password.");
  if (user.activated === false) {
    const err = new Error("Please activate your account first.");
    err.code = "NOT_ACTIVATED";
    err.email = user.email;
    throw err;
  }
  const session = publicUser(user);
  sessionStore().write(session);
  return session;
}

export async function signUp(values) {
  if (isApiEnabled()) return apiRequest("/auth/sign-up", { method: "POST", body: values });
  await delay();
  const exists = allUsers().some(
    (u) =>
      u.email.toLowerCase() === values.email.toLowerCase() ||
      u.username.toLowerCase() === values.username.toLowerCase()
  );
  if (exists) throw new Error("An account with this email or username already exists.");
  const { confirmPassword, terms, ...rest } = values;
  // Mock activation code; a real backend would email a random code.
  const user = { ...rest, id: `u_${Date.now()}`, activated: false, activationCode: "123456" };
  usersStore().write((list) => [...list, user]);
  return { email: user.email };
}

export async function activateAccount({ email, code }) {
  if (isApiEnabled()) return apiRequest("/auth/activate", { method: "POST", body: { email, code } });
  await delay();
  const list = usersStore().read();
  const user = list.find((u) => u.email.toLowerCase() === String(email).trim().toLowerCase());
  if (!user) throw new Error("We couldn't find an account with that email.");
  if (user.activationCode !== code.trim()) throw new Error("That activation code is not valid.");
  usersStore().write(list.map((u) => (u.id === user.id ? { ...u, activated: true } : u)));
  return { ok: true };
}

export async function requestPasswordReset({ email }) {
  if (isApiEnabled()) return apiRequest("/auth/forgot-password", { method: "POST", body: { email } });
  await delay();
  // Always succeed so we don't reveal which emails are registered.
  return { ok: true };
}

export async function updateAccount(patch) {
  if (isApiEnabled()) return apiRequest("/auth/me", { method: "PATCH", body: patch });
  await delay(300);
  const session = sessionStore().read();
  if (!session) throw new Error("Not signed in.");
  const next = { ...session, ...patch };
  sessionStore().write(next);
  usersStore().write((list) => list.map((u) => (u.id === session.id ? { ...u, ...patch } : u)));
  return next;
}

export async function changePassword({ current, password }) {
  if (isApiEnabled()) return apiRequest("/auth/password", { method: "POST", body: { current, password } });
  await delay(300);
  const session = sessionStore().read();
  const user = allUsers().find((u) => u.id === session?.id);
  if (!user || user.password !== current) throw new Error("Current password is incorrect.");
  if (demoUsers.some((u) => u.id === user.id)) throw new Error("Demo account passwords cannot be changed.");
  usersStore().write((list) => list.map((u) => (u.id === user.id ? { ...u, password } : u)));
  return { ok: true };
}

export async function signOut() {
  if (isApiEnabled()) await apiRequest("/auth/sign-out", { method: "POST" }).catch(() => {});
  sessionStore().write(null);
}
