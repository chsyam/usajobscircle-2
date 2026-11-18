"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import DashboardHeader, { DashCard } from "./DashboardHeader";
import Input, { Checkbox, PasswordInput } from "@/components/common/Input";
import Button from "@/components/common/Button";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import { changePasswordSchema, rules } from "@/lib/validations";
import { STORAGE_KEYS } from "@/lib/constants";
import { useLocalStore } from "@/lib/localStore";
import { toast } from "@/components/common/Toast";

const accountSchema = {
  firstName: [rules.required("First name is required.")],
  lastName: [rules.required("Last name is required.")],
  email: [rules.required("Email is required."), rules.email()],
  phone: [rules.phone()],
};

export default function AccountSettings() {
  const router = useRouter();
  const { user, updateAccount, changePassword, signOut } = useAuth();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [prefs, setPrefs] = useLocalStore(`${STORAGE_KEYS.profile}.prefs.${user.id}`, { newsletter: true, alerts: true, publicProfile: true });

  const account = useForm({ firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone || "" }, accountSchema);
  const password = useForm({ current: "", password: "", confirmPassword: "" }, changePasswordSchema);

  return (
    <>
      <DashboardHeader title="Account Settings" subtitle="Manage your login details, password and notifications." />

      <DashCard title="Account Details">
        <form
          className="stack"
          noValidate
          onSubmit={account.handleSubmit(async (vals) => {
            await updateAccount(vals);
            toast("Account details updated.");
          })}
        >
          {account.formError && (
            <div className="alert alert--error">
              <AlertCircle size={18} aria-hidden="true" /> {account.formError}
            </div>
          )}
          <div className="form-grid">
            <Input label="First Name" required {...account.register("firstName")} />
            <Input label="Last Name" required {...account.register("lastName")} />
            <Input label="Email" type="email" required {...account.register("email")} />
            <Input label="Phone" type="tel" {...account.register("phone")} />
            <Input label="Username" value={user.username} disabled hint="Usernames cannot be changed." readOnly />
          </div>
          <div className="form-actions">
            <Button type="submit" loading={account.submitting}>
              Save Changes
            </Button>
          </div>
        </form>
      </DashCard>

      <DashCard title="Change Password">
        <form
          className="stack"
          noValidate
          onSubmit={password.handleSubmit(async (vals) => {
            await changePassword(vals);
            password.reset();
            toast("Password updated.");
          })}
        >
          {password.formError && (
            <div className="alert alert--error">
              <AlertCircle size={18} aria-hidden="true" /> {password.formError}
            </div>
          )}
          {password.submitted && !password.formError && (
            <div className="alert alert--success">
              <CheckCircle2 size={18} aria-hidden="true" /> Your password has been changed.
            </div>
          )}
          <div className="form-grid">
            <PasswordInput label="Current Password" autoComplete="current-password" className="span-2" {...password.register("current")} />
            <PasswordInput label="New Password" autoComplete="new-password" {...password.register("password")} />
            <PasswordInput label="Confirm New Password" autoComplete="new-password" {...password.register("confirmPassword")} />
          </div>
          <div className="form-actions">
            <Button type="submit" loading={password.submitting}>
              Update Password
            </Button>
          </div>
        </form>
      </DashCard>

      <DashCard title="Notifications & Privacy">
        <div className="stack">
          <Checkbox label="Email me job alerts and recommendations" checked={prefs.alerts} onChange={(e) => setPrefs({ ...prefs, alerts: e.target.checked })} />
          <Checkbox label="Subscribe to the usajobscircle newsletter" checked={prefs.newsletter} onChange={(e) => setPrefs({ ...prefs, newsletter: e.target.checked })} />
          <Checkbox
            label={user.role === "employer" ? "Show my company in the employer directory" : "Make my profile visible to employers"}
            checked={prefs.publicProfile}
            onChange={(e) => setPrefs({ ...prefs, publicProfile: e.target.checked })}
          />
        </div>
      </DashCard>

      <DashCard title="Danger Zone" className="danger-zone">
        <p>Deleting your account removes your profile and all saved data. This cannot be undone.</p>
        <Button variant="danger" onClick={() => setConfirmDelete(true)}>
          Delete Account
        </Button>
      </DashCard>

      <ConfirmDialog
        open={confirmDelete}
        title="Delete your account?"
        message="Your account will be closed and you'll be signed out. In this demo, local data on this device is cleared."
        confirmLabel="Delete Account"
        onCancel={() => setConfirmDelete(false)}
        onConfirm={async () => {
          setConfirmDelete(false);
          Object.values(STORAGE_KEYS).forEach((k) => k !== STORAGE_KEYS.users && window.localStorage.removeItem(k));
          await signOut();
          toast("Your account has been deleted.");
          router.push("/");
        }}
      />
    </>
  );
}
