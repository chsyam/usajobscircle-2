import PageTitle from "@/components/layout/PageTitle";
import { CircleFeatures } from "@/components/sections/ServicesSection";
import FaqBrowser from "@/components/sections/FaqBrowser";
import { faqCategories, recentQuestions } from "@/data/faqs";
import { cvServices } from "@/data/packages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "FAQ's",
  description: "Answers to frequently asked questions about searching jobs, applying, accounts and posting jobs on usajobscircle.",
  path: "/faqs",
});

function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategories.flatMap((c) =>
      c.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } }))
    ),
  };
}

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()).replace(/</g, "\\u003c") }} />
      <PageTitle title="FAQ's" />
      <CircleFeatures items={cvServices} />
      <section className="section section--light" aria-label="Frequently asked questions">
        <div className="container">
          <FaqBrowser categories={faqCategories} recentQuestions={recentQuestions} />
        </div>
      </section>
    </>
  );
}
