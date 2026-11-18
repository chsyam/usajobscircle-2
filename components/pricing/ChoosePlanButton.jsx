"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useAuth } from "@/hooks/useAuth";
import { openAuthModal } from "@/components/auth/authModalStore";
import { formatCurrency } from "@/lib/formatters";
import { toast } from "@/components/common/Toast";

/**
 * Package selection. Not signed in -> opens sign up.
 * Signed in -> confirmation, then routes to the employer packages page (checkout placeholder for the future API).
 */
export default function ChoosePlanButton({ pkg, type, label, variant = "primary" }) {
  const router = useRouter();
  const { user } = useAuth();
  const [confirming, setConfirming] = useState(false);

  const onClick = () => {
    if (!user) {
      toast("Create an account or sign in to choose a package.");
      openAuthModal("signup");
      return;
    }
    setConfirming(true);
  };

  const price = pkg.price === 0 ? "Free" : `${formatCurrency(pkg.price)}${pkg.period ? ` ${pkg.period}` : ""}`;

  return (
    <>
      <Button variant={variant} block onClick={onClick}>
        {label}
      </Button>
      <ConfirmDialog
        open={confirming}
        title={`Choose ${pkg.name}`}
        message={`You selected the ${pkg.name} (${price}). Payment processing will be connected with the backend; for now the package is reserved on your account.`}
        confirmLabel="Reserve package"
        variant="primary"
        onCancel={() => setConfirming(false)}
        onConfirm={() => {
          setConfirming(false);
          toast(`${pkg.name} reserved.`);
          router.push(user?.role === "employer" ? "/dashboard/employer/packages" : "/dashboard/candidate");
        }}
      />
    </>
  );
}
