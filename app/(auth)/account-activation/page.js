import { Suspense } from "react";
import AuthCard from "@/components/auth/AuthCard";
import ActivationForm from "@/components/auth/ActivationForm";
import Loader from "@/components/common/Loader";
import { buildMetadata } from "@/lib/metadata";

export const metadata = {
  ...buildMetadata({
    title: "Account Activation",
    description: "Activate your usajobscircle account.",
    path: "/account-activation",
  }),
  robots: { index: false },
};

export default function AccountActivationPage() {
  return (
    <AuthCard pageTitle="Account Activation" title="Activate your account" subtitle="Enter the 6-digit code we emailed you.">
      <Suspense fallback={<Loader />}>
        <ActivationForm />
      </Suspense>
    </AuthCard>
  );
}
