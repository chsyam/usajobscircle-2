import Link from "next/link";
import { SearchX } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 680 }}>
        <EmptyState
          icon={<SearchX size={26} />}
          title="404 – Page not found"
          message="The page you're looking for doesn't exist or may have moved."
          action={
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/" className="btn btn--primary">
                Back to Home
              </Link>
              <Link href="/jobs-listing" className="btn btn--outline">
                Browse Jobs
              </Link>
            </div>
          }
        />
      </div>
    </section>
  );
}
