"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useForm } from "@/hooks/useForm";
import { activationSchema, rules } from "@/lib/validations";
import { activateAccount } from "@/services/authService";
import { toast } from "@/components/common/Toast";

const schema = { email: [rules.required("Email is required."), rules.email()], ...activationSchema };

export default function ActivationForm() {
  const params = useSearchParams();
  const isNew = params.get("new") === "1";
  const { register, handleSubmit, submitting, submitted, formError } = useForm(
    { email: params.get("email") || "", code: "" },
    schema
  );

  if (submitted) {
    return (
      <div className="auth-form">
        <div className="alert alert--success">
          <CheckCircle2 size={18} aria-hidden="true" /> Your account is now active. You can sign in.
        </div>
        <Button href="/sign-in" block>
          Continue to Sign In
        </Button>
      </div>
    );
  }

  return (
    <form
      className="auth-form"
      onSubmit={handleSubmit(async (vals) => {
        await activateAccount(vals);
        toast("Account activated.");
      })}
      noValidate
    >
      {isNew && (
        <div className="alert alert--success">
          <CheckCircle2 size={18} aria-hidden="true" /> Registration successful! We sent a 6-digit code to your email.
        </div>
      )}
      <div className="alert alert--info">
        <Info size={18} aria-hidden="true" />
        <span>
          Mock mode: the activation code for new accounts is <strong>123456</strong>.
        </span>
      </div>
      {formError && (
        <div className="alert alert--error">
          <AlertCircle size={18} aria-hidden="true" /> {formError}
        </div>
      )}
      <Input label="Email Address" type="email" autoComplete="email" required {...register("email")} />
      <Input label="Activation Code" inputMode="numeric" maxLength={6} placeholder="••••••" required {...register("code")} />
      <Button type="submit" block loading={submitting}>
        Activate Account
      </Button>
      <p className="auth-form__switch">
        Already active?{" "}
        <Link href="/sign-in" className="link-btn">
          Sign In
        </Link>
      </p>
    </form>
  );
}
