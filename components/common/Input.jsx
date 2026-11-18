"use client";

import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

/** Wrapper that renders label, control and error text. */
export function Field({ id, label, required, error, hint, className, children }) {
  return (
    <div className={cn("field", error && "field--error", className)}>
      {label && (
        <label className="field__label" htmlFor={id}>
          {label}
          {required && <span className="req" aria-hidden="true">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <span className="field__error" id={`${id}-error`} role="alert">
          {error}
        </span>
      ) : hint ? (
        <span className="field__hint">{hint}</span>
      ) : null}
    </div>
  );
}

export default function Input({ label, error, hint, required, icon, className, id: idProp, ...props }) {
  const autoId = useId();
  const id = idProp || autoId;
  return (
    <Field id={id} label={label} error={error} hint={hint} required={required} className={className}>
      <div className="field__control">
        <input
          id={id}
          className={cn("input", icon && "input--with-icon")}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          required={required}
          {...props}
        />
        {icon && <span className="field__icon" aria-hidden="true">{icon}</span>}
      </div>
    </Field>
  );
}

export function PasswordInput({ label = "Password", error, hint, required, className, id: idProp, ...props }) {
  const autoId = useId();
  const id = idProp || autoId;
  const [visible, setVisible] = useState(false);
  return (
    <Field id={id} label={label} error={error} hint={hint} required={required} className={className}>
      <div className="field__control">
        <input
          id={id}
          type={visible ? "text" : "password"}
          className="input input--with-icon"
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          required={required}
          {...props}
        />
        <button
          type="button"
          className="password-toggle"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </Field>
  );
}

export function Textarea({ label, error, hint, required, className, id: idProp, ...props }) {
  const autoId = useId();
  const id = idProp || autoId;
  return (
    <Field id={id} label={label} error={error} hint={hint} required={required} className={className}>
      <textarea
        id={id}
        className="textarea"
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        required={required}
        {...props}
      />
    </Field>
  );
}

export function Checkbox({ label, count, className, ...props }) {
  return (
    <label className={cn("check", className)}>
      <input type="checkbox" {...props} />
      <span>{label}</span>
      {count !== undefined && <span className="check__count">{count}</span>}
    </label>
  );
}

export function Radio({ label, count, className, ...props }) {
  return (
    <label className={cn("check", className)}>
      <input type="radio" {...props} />
      <span>{label}</span>
      {count !== undefined && <span className="check__count">{count}</span>}
    </label>
  );
}
