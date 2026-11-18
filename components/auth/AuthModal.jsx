"use client";

import Modal from "@/components/common/Modal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { closeAuthModal, openAuthModal, useAuthModal } from "./authModalStore";

export default function AuthModal() {
  const mode = useAuthModal();
  const isSignup = mode === "signup";
  return (
    <Modal
      open={Boolean(mode)}
      onClose={closeAuthModal}
      size={isSignup ? "lg" : undefined}
      title={isSignup ? "Signup to your Account" : "Login to your Account"}
    >
      {isSignup ? (
        <RegisterForm onSuccess={closeAuthModal} onSwitch={() => openAuthModal("signin")} />
      ) : (
        <LoginForm stayOnPage onSuccess={closeAuthModal} onSwitch={() => openAuthModal("signup")} />
      )}
    </Modal>
  );
}
