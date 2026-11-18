import { SITE } from "./constants";

/** Build consistent page metadata (title, description, Open Graph, canonical). */
export function buildMetadata({ title, description = SITE.description, path = "/", image } = {}) {
  const ogImage = image || "/images/og-default.svg";
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: title ? `${title} – ${SITE.domain}` : SITE.domain,
      description,
      url: path,
      siteName: SITE.domain,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title || SITE.domain }],
    },
    twitter: {
      card: "summary_large_image",
      title: title || SITE.domain,
      description,
      images: [ogImage],
    },
  };
}
