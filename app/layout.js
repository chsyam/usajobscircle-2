import { Roboto } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ToastRegion from "@/components/common/Toast";
import { SITE } from "@/lib/constants";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.domain} – ${SITE.tagline}`,
    template: `%s – ${SITE.domain}`,
  },
  description: SITE.description,
  applicationName: SITE.domain,
  keywords: ["jobs", "USA jobs", "job portal", "careers", "employers", "candidates", "resume"],
  openGraph: {
    type: "website",
    siteName: SITE.domain,
    title: `${SITE.domain} – ${SITE.tagline}`,
    description: SITE.description,
    images: [{ url: "/images/og-default.svg", width: 1200, height: 630, alt: SITE.domain }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.ico" },
};

export const viewport = {
  themeColor: "#13b5ea",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <ToastRegion />
      </body>
    </html>
  );
}
