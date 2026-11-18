"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertCircle, Briefcase, User } from "lucide-react";
import Input, { Checkbox, PasswordInput } from "@/components/common/Input";
import Select from "@/components/common/Select";
import Button from "@/components/common/Button";
import { useForm } from "@/hooks/useForm";
import { candidateRegisterSchema, employerRegisterSchema } from "@/lib/validations";
import { ROLES, SECTORS } from "@/lib/constants";
import { signUp } from "@/services/authService";
import { cn } from "@/lib/utils";
import { toast } from "@/components/common/Toast";

const initial = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  organization: "",
  sector: "",
  terms: false,
};

export default function RegisterForm({ onSuccess, onSwitch, defaultRole = ROLES.CANDIDATE }) {
  const router = useRouter();
  const [role, setRole] = useState(defaultRole);
  const isEmployer = role === ROLES.EMPLOYER;
  const { register, values, errors, handleChange, handleSubmit, submitting, formError } = useForm(
    initial,
    isEmployer ? employerRegisterSchema : candidateRegisterSchema
  );

  const onSubmit = handleSubmit(async (vals) => {
    const payload = { ...vals, role };
    if (!isEmployer) {
      delete payload.organization;
      delete payload.sector;
    }
    const { email } = await signUp(payload);
    toast("Account created! Check your email for the activation code.");
    onSuccess?.();
    router.push(`/account-activation?email=${encodeURIComponent(email)}&new=1`);
  });

  return (
    <form className="auth-form" onSubmit={onSubmit} noValidate>
      <div className="role-switch" role="radiogroup" aria-label="Account type">
        {[
          { value: ROLES.CANDIDATE, label: "Candidate", Icon: User },
          { value: ROLES.EMPLOYER, label: "Employer", Icon: Briefcase },
        ].map(({ value, label, Icon }) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={role === value}
            className={cn("role-switch__btn", role === value && "is-active")}
            onClick={() => setRole(value)}
          >
            <Icon size={20} aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>

      {formError && (
        <div className="alert alert--error">
          <AlertCircle size={18} aria-hidden="true" /> {formError}
        </div>
      )}

      <div className="form-grid">
        <Input label="First Name" autoComplete="given-name" required {...register("firstName")} />
        <Input label="Last Name" autoComplete="family-name" required {...register("lastName")} />
        <Input label="Username" autoComplete="username" required {...register("username")} />
        <Input label="Email" type="email" autoComplete="email" required {...register("email")} />
        <PasswordInput label="Password" autoComplete="new-password" required hint="8+ characters, upper & lower case and a number." {...register("password")} />
        <PasswordInput label="Confirm Password" autoComplete="new-password" required {...register("confirmPassword")} />
        <Input label="Phone Number" type="tel" autoComplete="tel" required className={isEmployer ? "" : "span-2"} {...register("phone")} />
        {isEmployer && (
          <>
            <Input label="Organization Name" autoComplete="organization" required {...register("organization")} />
            <Select
              label="Industry / Sector"
              placeholder="Select sector"
              options={SECTORS}
              required
              className="span-2"
              {...register("sector")}
            />
          </>
        )}
      </div>

      <div>
        <Checkbox
          name="terms"
          checked={values.terms}
          onChange={handleChange}
          label={
            <>
              I agree to the{" "}
              <Link href="/terms-and-conditions" className="link-btn" target="_blank">
                Terms and Conditions
              </Link>{" "}
              and Privacy Policy
            </>
          }
        />
        {errors.terms && (
          <span className="field__error" role="alert">
            {errors.terms}
          </span>
        )}
      </div>

      <Button type="submit" block loading={submitting}>
        Create {isEmployer ? "Employer" : "Candidate"} Account
      </Button>

      <p className="auth-form__switch">
        Already have an account?{" "}
        {onSwitch ? (
          <button type="button" className="link-btn" onClick={onSwitch}>
            Sign In
          </button>
        ) : (
          <Link href="/sign-in" className="link-btn">
            Sign In
          </Link>
        )}
      </p>
    </form>
  );
}
