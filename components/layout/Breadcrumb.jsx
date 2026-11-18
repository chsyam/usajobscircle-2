import Link from "next/link";
import { ChevronRight } from "lucide-react";

/** items: [{ label, href? }] — the last item is the current page. */
export default function Breadcrumb({ items }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <div className="container">
        <ol>
          {all.map((item, i) => {
            const last = i === all.length - 1;
            return (
              <li key={`${item.label}-${i}`}>
                {last || !item.href ? (
                  <span aria-current={last ? "page" : undefined}>{item.label}</span>
                ) : (
                  <Link href={item.href}>{item.label}</Link>
                )}
                {!last && <ChevronRight size={13} aria-hidden="true" />}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
