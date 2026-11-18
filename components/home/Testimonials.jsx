"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export function TestimonialCard({ item }) {
  return (
    <figure className="mb-0">
      <Quote size={40} className="testimonial__quote-icon" aria-hidden="true" />
      <blockquote className="testimonial__quote mb-0">{item.quote}</blockquote>
      <figcaption>
        <p className="testimonial__name">{item.name}</p>
        <span className="muted">{item.location}</span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials({ items }) {
  const [index, setIndex] = useState(0);
  if (!items?.length) return null;
  const current = items[index];
  const go = (dir) => setIndex((i) => (i + dir + items.length) % items.length);

  return (
    <section className="testimonials" aria-roledescription="carousel" aria-label="Testimonials">
      <div className="testimonial">
        <div className="testimonial__image">
          <Image key={current.id} src={current.image} alt={current.name} fill sizes="(max-width: 767px) 100vw, 50vw" />
        </div>
        <div className="testimonial__content" aria-live="polite">
          <TestimonialCard item={current} />
          <div className="testimonial__controls">
            <div className="testimonial__dots">
              {items.map((t, i) => (
                <button key={t.id} type="button" aria-label={`Show testimonial ${i + 1}`} aria-current={i === index} onClick={() => setIndex(i)} />
              ))}
            </div>
            <button type="button" className="arrow" onClick={() => go(-1)} aria-label="Previous testimonial">
              <ChevronLeft size={16} />
            </button>
            <button type="button" className="arrow" onClick={() => go(1)} aria-label="Next testimonial">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
