import Image from "next/image";
import Link from "next/link";

/** "Millions of jobs" split promo with a device-framed image. */
export default function PromoSection({
  title = (
    <>
      Millions of Jobs.
      <br />
      Find the one that&apos;s right for you.
    </>
  ),
  text = "Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 600,000 companies worldwide. The right job is out there.",
  cta = { label: "Search Jobs", href: "/jobs-listing" },
  image = "https://picsum.photos/id/0/900/640",
  light = true,
}) {
  return (
    <section className={`section promo${light ? " section--light" : ""}`}>
      <div className="container promo__inner">
        <div className="promo__text">
          <h2>{title}</h2>
          <p>{text}</p>
          <Link href={cta.href} className="btn btn--primary btn--lg">
            {cta.label}
          </Link>
        </div>
        <div className="promo__device">
          <div className="promo__screen">
            <Image src={image} alt="Person searching for jobs on a laptop" fill sizes="(max-width: 991px) 90vw, 480px" />
          </div>
        </div>
      </div>
    </section>
  );
}
