"use client";

import { useState } from "react";
import { hasErrors, validate } from "@/lib/validations";

/**
 * Minimal form state hook with schema validation.
 * onSubmit may throw; its message is exposed as `formError`.
 */
export function useForm(initialValues, schema) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const setValue = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setValue(name, type === "checkbox" ? checked : value);
  };

  const handleSubmit = (onSubmit) => async (e) => {
    e?.preventDefault();
    setFormError("");
    const nextErrors = schema ? validate(values, schema) : {};
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) return;
    setSubmitting(true);
    try {
      await onSubmit(values);
      setSubmitted(true);
    } catch (err) {
      setFormError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = (next = initialValues) => {
    setValues(next);
    setErrors({});
    setFormError("");
    setSubmitted(false);
  };

  /** Spread onto Input/Select: {...register("email")} */
  const register = (name) => ({
    name,
    value: values[name] ?? "",
    onChange: handleChange,
    error: errors[name],
  });

  return { values, errors, submitting, submitted, formError, setValue, setValues, setFormError, handleChange, handleSubmit, reset, register };
}
