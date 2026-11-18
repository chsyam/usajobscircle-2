import Link from "next/link";

export default function Logo({ variant, onClick }) {
  return (
    <Link href="/" className={`logo${variant === "white" ? " logo--white" : ""}`} aria-label="usajobscircle home" onClick={onClick}>
      <span className="logo__mark" aria-hidden="true">
        <span className="u">U</span>
        <span className="c">C</span>
      </span>
      <span className="logo__text" aria-hidden="true">
        usa<span className="jobs">jobs</span>circle.
      </span>
    </Link>
  );
}
