import Link from "next/link";
import SectionHeading from "@/components/common/SectionHeading";
import BlogCard from "@/components/blog/BlogCard";

export default function RecentNews({ posts, title = "Recent News Articles" }) {
  return (
    <section className="section" aria-label={title}>
      <div className="container">
        <SectionHeading title={title} />
        <div className="grid grid-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        <div className="text-center" style={{ marginTop: 34 }}>
          <Link href="/news" className="link-btn">
            View all news →
          </Link>
        </div>
      </div>
    </section>
  );
}
