"use client";

import { useId } from "react";
import { Field } from "./Input";

/** options: array of strings or { value, label } */
export default function Select({ label, error, hint, required, options = [], placeholder, className, id: idProp, ...props }) {
  const autoId = useId();
  const id = idProp || autoId;
  return (
    <Field id={id} label={label} error={error} hint={hint} required={required} className={className}>
      <select
        id={id}
        className="select"
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        required={required}
        {...props}
      >
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((opt) => {
          const value = typeof opt === "string" ? opt : opt.value;
          const text = typeof opt === "string" ? opt : opt.label;
          return (
            <option key={value} value={value}>
              {text}
            </option>
          );
        })}
      </select>
    </Field>
  );
}
