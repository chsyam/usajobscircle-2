"use client";

import { Mail } from "lucide-react";
import { useForm } from "@/hooks/useForm";
import { useJobAlerts } from "@/hooks/useUserData";
import { jobAlertSchema } from "@/lib/validations";
import { ALERT_FREQUENCIES } from "@/lib/constants";
import { Radio } from "@/components/common/Input";
import { toast } from "@/components/common/Toast";

/** "Email Me New Jobs" box. `criteria` captures the current search filters. */
export default function JobAlertForm({ criteria = {} }) {
  const { add } = useJobAlerts();
  const { values, errors, handleChange, setValue, handleSubmit, submitting, reset } = useForm(
    { name: "", email: "", frequency: "Weekly" },
    jobAlertSchema
  );

  const onSubmit = handleSubmit(async (vals) => {
    add({ ...vals, criteria });
    toast(`Job alert "${vals.name}" created.`);
    reset();
  });

  return (
    <section className="alert-box" aria-labelledby="job-alert-title">
      <h2 className="alert-box__head" id="job-alert-title">
        <Mail size={18} aria-hidden="true" /> Email Me New Jobs
      </h2>
      <form className="alert-box__body" onSubmit={onSubmit} noValidate>
        <div className={`field${errors.name ? " field--error" : ""}`}>
          <label className="sr-only" htmlFor="alert-name">
            Job alert name
          </label>
          <input id="alert-name" className="input" name="name" placeholder="Job alert name..." value={values.name} onChange={handleChange} />
          {errors.name && <span className="field__error">{errors.name}</span>}
        </div>
        <div className={`field${errors.email ? " field--error" : ""}`}>
          <label className="sr-only" htmlFor="alert-email">
            Email
          </label>
          <input id="alert-email" className="input" type="email" name="email" placeholder="example@email.com" value={values.email} onChange={handleChange} />
          {errors.email && <span className="field__error">{errors.email}</span>}
        </div>
        <fieldset className="alert-box__freq" style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="sr-only">Frequency</legend>
          {ALERT_FREQUENCIES.map((f) => (
            <Radio key={f} name="frequency" label={f} checked={values.frequency === f} onChange={() => setValue("frequency", f)} />
          ))}
        </fieldset>
        <button type="submit" className="btn btn--primary btn--block" disabled={submitting}>
          Create Alert
        </button>
      </form>
    </section>
  );
}
