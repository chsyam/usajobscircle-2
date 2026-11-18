import AuthCard from "@/components/auth/AuthCard";
import RegisterForm from "@/components/auth/RegisterForm";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Sign Up",
  description: "Create a free candidate or employer account on usajobscircle.",
  path: "/sign-up",
});

export default function SignUpPage() {
  return (
    <AuthCard pageTitle="Sign Up" title="Signup to your Account" subtitle="Choose your account type to get started." wide>
      <RegisterForm />
    </AuthCard>
  );
}
