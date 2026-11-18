import { SITE } from "@/lib/constants";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/dashboard/", "/account-activation"] }],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
