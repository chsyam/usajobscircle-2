import Link from "next/link";
import SectionHeading from "@/components/common/SectionHeading";
import Icon from "@/components/common/Icon";

/** categories: [{ title, icon, count }] */
export default function PopularCategories({ categories }) {
  return (
    <section className="section" aria-labelledby="categories-title">
      <div className="container">
        <SectionHeading title={<span id="categories-title">Popular Job Categories</span>} />
        <ul className="categories">
          {categories.map((cat) => (
            <li key={cat.title}>
              <Link href={`/jobs-listing?sector=${encodeURIComponent(cat.title)}`} className="categories__item">
                <span className="categories__icon">
                  <Icon name={cat.icon} size={44} strokeWidth={1.2} />
                </span>
                <span className="categories__title">{cat.title}</span>
                <span className="categories__count">
                  {cat.count} {cat.count === 1 ? "Opening" : "Openings"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="text-center">
          <Link href="/jobs-listing" className="btn btn--primary">
            Browse All Sectors
          </Link>
        </div>
      </div>
    </section>
  );
}
