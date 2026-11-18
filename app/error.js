"use client";

import { ErrorState } from "@/components/common/EmptyState";

export default function Error({ error, reset }) {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 680 }}>
        <ErrorState
          message={process.env.NODE_ENV === "development" ? error?.message : "An unexpected error occurred. Please try again."}
          action={
            <button type="button" className="btn btn--primary" onClick={() => reset()}>
              Try again
            </button>
          }
        />
      </div>
    </section>
  );
}
