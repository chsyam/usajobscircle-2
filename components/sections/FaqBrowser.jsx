"use client";

import { useState } from "react";
import Link from "next/link";
import { HelpCircle, Search } from "lucide-react";
import Accordion from "@/components/common/Accordion";
import EmptyState from "@/components/common/EmptyState";
import ShareButtons from "@/components/common/ShareButtons";
import { useDebounce } from "@/hooks/useDebounce";
import { includesText } from "@/lib/utils";

export default function FaqBrowser({ categories, recentQuestions }) {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 200);

  const filtered = categories
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((item) => includesText(item.q, debounced) || includesText(item.a, debounced)),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div className="layout-sidebar">
      <aside className="filters" aria-label="FAQ search">
        <form className="faq-search" role="search" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="faq-q" className="field__label">
            Find Your Question:
          </label>
          <div className="field__control">
            <input id="faq-q" type="search" className="input input--with-icon" placeholder="Search questions…" value={query} onChange={(e) => setQuery(e.target.value)} />
            <span className="field__icon" aria-hidden="true">
              <Search size={16} />
            </span>
          </div>
        </form>

        <section className="faq-help">
          <h2>Don&apos;t find your Question?</h2>
          <p>You are not able to find the answer to your question? No Problem!</p>
          <Link href="/contact-us" className="btn btn--primary btn--block">
            Contact Us
          </Link>
        </section>

        <section className="filter-box">
          <h2 className="filter-box__head" style={{ cursor: "default" }}>
            Recent Questions
          </h2>
          <ul className="filter-box__body recent-questions">
            {recentQuestions.map((q) => (
              <li key={q}>
                <button type="button" onClick={() => setQuery(q.replace(/\?$/, ""))}>
                  <HelpCircle size={14} aria-hidden="true" /> {q}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </aside>

      <div>
        {filtered.length === 0 ? (
          <EmptyState
            title="No matching questions"
            message={`We couldn't find answers for “${debounced}”. Try different keywords or contact us.`}
            action={
              <button type="button" className="btn btn--primary" onClick={() => setQuery("")}>
                Clear search
              </button>
            }
          />
        ) : (
          filtered.map((cat, i) => (
            <section key={cat.id} className="faq-group" aria-labelledby={`faq-${cat.id}`}>
              <h2 id={`faq-${cat.id}`} className="faq-group__title">
                {cat.title}
              </h2>
              <Accordion
                key={`${cat.id}-${debounced}`}
                defaultOpen={i === 0 || debounced ? 0 : null}
                items={cat.items.map((item) => ({
                  title: `Q. ${item.q}`,
                  content: (
                    <>
                      <p>{item.a}</p>
                      <ShareButtons path="/faqs" title={item.q} />
                    </>
                  ),
                }))}
              />
            </section>
          ))
        )}
      </div>
    </div>
  );
}
