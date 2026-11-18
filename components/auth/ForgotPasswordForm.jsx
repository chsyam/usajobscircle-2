"use client";

import Link from "next/link";
import { AlertCircle, CheckCircle2, Mail } from "lucide-react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useForm } from "@/hooks/useForm";
import { forgotPasswordSchema } from "@/lib/validations";
import { requestPasswordReset } from "@/services/authService";

export default function ForgotPasswordForm() {
  const { register, values, handleSubmit, submitting, submitted, formError, reset } = useForm(
    { email: "" },
    forgotPasswordSchema
  );

  if (submitted) {
    return (
      <div className="auth-form">
        <div className="alert alert--success">
          <CheckCircle2 size={18} aria-hidden="true" />
          <span>
            If an account exists for <strong>{values.email}</strong>, you&apos;ll receive an email with instructions to reset your password.
          </span>
        </div>
        <Button variant="outline" block onClick={() => reset()}>
          Send to another email
        </Button>
        <p className="auth-form__switch">
          <Link href="/sign-in" className="link-btn">
            Back to Sign In
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit(requestPasswordReset)} noValidate>
      <p className="mb-0">Enter the email address associated with your account and we&apos;ll send you a link to reset your password.</p>
      {formError && (
        <div className="alert alert--error">
          <AlertCircle size={18} aria-hidden="true" /> {formError}
        </div>
      )}
      <Input label="Email Address" type="email" autoComplete="email" icon={<Mail size={16} />} required {...register("email")} />
      <Button type="submit" block loading={submitting}>
        Send Reset Link
      </Button>
      <p className="auth-form__switch">
        Remembered it?{" "}
        <Link href="/sign-in" className="link-btn">
          Sign In
        </Link>
      </p>
    </form>
  );
}
