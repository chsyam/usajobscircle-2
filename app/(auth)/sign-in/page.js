import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Sign In",
  description: "Sign in to your usajobscircle candidate or employer account.",
  path: "/sign-in",
});

export default function SignInPage() {
  return (
    <AuthCard pageTitle="Sign In" title="Login to your Account" subtitle="Welcome back! Sign in with your username or email.">
      <LoginForm />
    </AuthCard>
  );
}
