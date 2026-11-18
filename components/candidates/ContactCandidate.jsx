"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";
import ContactForm from "@/components/common/ContactForm";

export default function ContactCandidate({ name }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <MessageSquare size={16} aria-hidden="true" /> Contact Candidate
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title={`Contact ${name}`}>
        <ContactForm variant="compact" recipient={name} submitLabel="Send Message" />
      </Modal>
    </>
  );
}
