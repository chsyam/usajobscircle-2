"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, Mail } from "lucide-react";
import Input, { Checkbox, PasswordInput } from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useForm } from "@/hooks/useForm";
import { signInSchema } from "@/lib/validations";
import { signIn } from "@/services/authService";
import { toast } from "@/components/common/Toast";

export default function LoginForm({ onSuccess, onSwitch, redirectTo, stayOnPage = false }) {
  const router = useRouter();
  const { register, values, handleChange, handleSubmit, submitting, formError } = useForm(
    { identifier: "", password: "", remember: true },
    signInSchema
  );

  const onSubmit = handleSubmit(async (vals) => {
    try {
      const user = await signIn(vals);
      toast(`Welcome back, ${user.firstName}!`);
      onSuccess?.(user);
      if (stayOnPage) return;
      router.push(redirectTo || (user.role === "employer" ? "/dashboard/employer" : "/dashboard/candidate"));
    } catch (err) {
      if (err.code === "NOT_ACTIVATED") {
        onSuccess?.();
        router.push(`/account-activation?email=${encodeURIComponent(err.email)}`);
        return;
      }
      throw err;
    }
  });

  return (
    <form className="auth-form" onSubmit={onSubmit} noValidate>
      {formError && (
        <div className="alert alert--error">
          <AlertCircle size={18} aria-hidden="true" /> {formError}
        </div>
      )}
      <Input
        label="Username or Email Address"
        placeholder="Enter your username or email"
        autoComplete="username"
        icon={<Mail size={16} />}
        required
        {...register("identifier")}
      />
      <PasswordInput placeholder="Enter your password" autoComplete="current-password" required {...register("password")} />
      <div className="auth-form__row">
        <Checkbox label="Remember me" name="remember" checked={values.remember} onChange={handleChange} />
        <Link href="/forgot-password" className="link-btn" onClick={() => onSuccess?.()}>
          Forgot Password?
        </Link>
      </div>
      <Button type="submit" block loading={submitting}>
        Sign In
      </Button>
      <p className="auth-form__switch">
        Don&apos;t have an account?{" "}
        {onSwitch ? (
          <button type="button" className="link-btn" onClick={onSwitch}>
            Sign Up
          </button>
        ) : (
          <Link href="/sign-up" className="link-btn">
            Sign Up
          </Link>
        )}
      </p>
      <div className="auth-form__demo">
        <strong>Demo accounts</strong> (mock data): candidate@demo.test or employer@demo.test — password <code>Demo@1234</code>
      </div>
    </form>
  );
}
