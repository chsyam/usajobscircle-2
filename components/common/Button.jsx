import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Button that renders a Next.js Link when `href` is provided.
 * variant: primary | outline | dark | danger | ghost | white
 */
export default function Button({
  href,
  variant = "primary",
  size,
  block = false,
  loading = false,
  className,
  children,
  type = "button",
  ...props
}) {
  const classes = cn(
    "btn",
    `btn--${variant}`,
    size && `btn--${size}`,
    block && "btn--block",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={loading || props.disabled} aria-busy={loading || undefined} {...props}>
      {loading && <span className="spinner spinner--sm" aria-hidden="true" />}
      {children}
    </button>
  );
}
