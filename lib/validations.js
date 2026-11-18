/**
 * Small, dependency-free validation helpers.
 * A schema is an object of field -> array of rule functions.
 * Each rule returns an error string or null.
 */

export const rules = {
  required:
    (message = "This field is required.") =>
    (value) =>
      value === undefined || value === null || String(value).trim() === "" || value === false ? message : null,

  email:
    (message = "Enter a valid email address.") =>
    (value) =>
      !value || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value).trim()) ? null : message,

  phone:
    (message = "Enter a valid phone number.") =>
    (value) =>
      !value || /^[+()\-\s\d.]{7,20}$/.test(String(value).trim()) ? null : message,

  minLength: (len, message) => (value) =>
    !value || String(value).trim().length >= len ? null : message || `Must be at least ${len} characters.`,

  maxLength: (len, message) => (value) =>
    !value || String(value).length <= len ? null : message || `Must be at most ${len} characters.`,

  username:
    (message = "Use 3–20 letters, numbers, dots or underscores.") =>
    (value) =>
      !value || /^[a-zA-Z0-9._]{3,20}$/.test(value) ? null : message,

  strongPassword:
    (message = "Use 8+ characters with upper and lower case letters and a number.") =>
    (value) =>
      !value || (/[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value) && value.length >= 8) ? null : message,

  matches: (field, message = "Values do not match.") => (value, values) =>
    value === values[field] ? null : message,

  url:
    (message = "Enter a valid URL (https://…).") =>
    (value) =>
      !value || /^https?:\/\/[^\s.]+\.[^\s]{2,}$/.test(value) ? null : message,

  checked:
    (message = "You must accept to continue.") =>
    (value) =>
      value ? null : message,
};

/** Validate all values against a schema. Returns { field: message } for failures. */
export function validate(values, schema) {
  const errors = {};
  for (const [field, fieldRules] of Object.entries(schema)) {
    for (const rule of fieldRules) {
      const error = rule(values[field], values);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  }
  return errors;
}

export const hasErrors = (errors) => Object.keys(errors).length > 0;

/* ---------- Reusable schemas ---------- */

export const signInSchema = {
  identifier: [rules.required("Enter your username or email.")],
  password: [rules.required("Enter your password.")],
};

const baseRegister = {
  firstName: [rules.required("First name is required.")],
  lastName: [rules.required("Last name is required.")],
  username: [rules.required("Username is required."), rules.username()],
  email: [rules.required("Email is required."), rules.email()],
  phone: [rules.required("Phone number is required."), rules.phone()],
  password: [rules.required("Password is required."), rules.strongPassword()],
  confirmPassword: [rules.required("Please confirm your password."), rules.matches("password", "Passwords do not match.")],
  terms: [rules.checked("Please accept the terms and conditions.")],
};

export const candidateRegisterSchema = baseRegister;

export const employerRegisterSchema = {
  ...baseRegister,
  organization: [rules.required("Organization name is required.")],
  sector: [rules.required("Select an industry / sector.")],
};

export const forgotPasswordSchema = {
  email: [rules.required("Email is required."), rules.email()],
};

export const activationSchema = {
  code: [rules.required("Enter the activation code."), rules.minLength(6, "The code has 6 digits.")],
};

export const contactSchema = {
  name: [rules.required("Your name is required.")],
  subject: [rules.required("Subject is required.")],
  email: [rules.required("Email is required."), rules.email()],
  phone: [rules.phone()],
  message: [rules.required("Message is required."), rules.minLength(10, "Message should be at least 10 characters.")],
};

export const jobAlertSchema = {
  name: [rules.required("Give your alert a name.")],
  email: [rules.required("Email is required."), rules.email()],
};

export const postJobSchema = {
  title: [rules.required("Job title is required.")],
  type: [rules.required("Select a job type.")],
  sector: [rules.required("Select a sector.")],
  location: [rules.required("Location is required.")],
  description: [rules.required("Description is required."), rules.minLength(30, "Add at least 30 characters.")],
  salaryMin: [(v) => (v && Number(v) < 0 ? "Salary cannot be negative." : null)],
  salaryMax: [(v, all) => (v && all.salaryMin && Number(v) < Number(all.salaryMin) ? "Max must be greater than min." : null)],
};

export const changePasswordSchema = {
  current: [rules.required("Enter your current password.")],
  password: [rules.required("Enter a new password."), rules.strongPassword()],
  confirmPassword: [rules.required("Confirm the new password."), rules.matches("password", "Passwords do not match.")],
};

export const messageSchema = {
  name: [rules.required("Your name is required.")],
  email: [rules.required("Email is required."), rules.email()],
  message: [rules.required("Message is required.")],
};
