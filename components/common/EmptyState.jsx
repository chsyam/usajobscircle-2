import { Inbox, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EmptyState({ icon, title = "Nothing here yet", message, action, className }) {
  return (
    <div className={cn("state", className)}>
      <div className="state__icon" aria-hidden="true">
        {icon || <Inbox size={26} />}
      </div>
      <h3>{title}</h3>
      {message && <p>{message}</p>}
      {action}
    </div>
  );
}

export function ErrorState({ title = "Something went wrong", message = "Please try again in a moment.", action }) {
  return (
    <div className="state state--error" role="alert">
      <div className="state__icon" aria-hidden="true">
        <AlertTriangle size={26} />
      </div>
      <h3>{title}</h3>
      <p>{message}</p>
      {action}
    </div>
  );
}

/** The reference site's "No Record" message used on listing pages. */
export function NoRecord({ onReset }) {
  return (
    <div className="no-record">
      <p className="mb-0">
        <strong>No Record</strong>Sorry! Does not match record with your keyword
      </p>
      <p className="mb-0">Change your filter keywords to re-submit</p>
      <span className="or">OR</span>
      <button type="button" className="btn btn--danger btn--sm" onClick={onReset}>
        Reset Filters
      </button>
    </div>
  );
}
