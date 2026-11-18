"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";
import Input, { Checkbox, Textarea } from "./Input";
import Button from "./Button";
import { useForm } from "@/hooks/useForm";
import { contactSchema, messageSchema, rules } from "@/lib/validations";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Reusable contact / message form.
 * variant "full" = contact page (name, subject, email, phone, message)
 * variant "compact" = profile sidebar message to an employer/candidate.
 */
export default function ContactForm({ variant = "full", recipient, submitLabel = "Submit", onSend }) {
  const compact = variant === "compact";
  const schema = compact ? { ...messageSchema, consent: [rules.checked("Please accept the terms.")] } : contactSchema;
  const { register, values, errors, handleChange, handleSubmit, submitting, submitted, formError, reset } = useForm(
    { name: "", subject: "", email: "", phone: "", message: "", consent: false },
    schema
  );

  if (submitted) {
    return (
      <div className="stack">
        <div className="alert alert--success" role="status">
          <CheckCircle2 size={18} aria-hidden="true" />
          <span>Thanks {values.name.split(" ")[0]}! Your message {recipient ? `was sent to ${recipient}` : "has been sent"}. We&apos;ll get back to you shortly.</span>
        </div>
        <Button variant="outline" size="sm" onClick={() => reset()}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(async (vals) => {
        // Replace with a POST to the contact API when the backend is ready.
        await (onSend ? onSend(vals) : wait(600));
      })}
      noValidate
      className="stack"
    >
      {formError && (
        <div className="alert alert--error">
          <AlertCircle size={18} aria-hidden="true" /> {formError}
        </div>
      )}
      {compact ? (
        <>
          <Input label="User Name" autoComplete="name" required {...register("name")} />
          <Input label="Email Address" type="email" autoComplete="email" required {...register("email")} />
          <Input label="Phone Number" type="tel" autoComplete="tel" {...register("phone")} />
          <Textarea label="Message" required rows={4} {...register("message")} />
          <div>
            <Checkbox name="consent" checked={values.consent} onChange={handleChange} label="I agree to the Terms and Conditions and Privacy Policy" />
            {errors.consent && <span className="field__error">{errors.consent}</span>}
          </div>
        </>
      ) : (
        <div className="form-grid">
          <Input label="Name" placeholder="Enter Your Name" autoComplete="name" required {...register("name")} />
          <Input label="Subject" placeholder="Subject" required {...register("subject")} />
          <Input label="Email" type="email" placeholder="Enter Your Email Address" autoComplete="email" required {...register("email")} />
          <Input label="Phone" type="tel" placeholder="Enter Your Phone Number" autoComplete="tel" {...register("phone")} />
          <Textarea label="Message" placeholder="Enter Your Message" required className="span-2" {...register("message")} />
        </div>
      )}
      <div>
        <Button type="submit" loading={submitting} block={compact}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
