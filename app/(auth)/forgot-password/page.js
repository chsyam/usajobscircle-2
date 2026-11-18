import AuthCard from "@/components/auth/AuthCard";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Forgot Password",
  description: "Reset the password for your usajobscircle account.",
  path: "/forgot-password",
});

export default function ForgotPasswordPage() {
  return (
    <AuthCard pageTitle="Forgot Password" title="Reset your password">
      <ForgotPasswordForm />
    </AuthCard>
  );
}
