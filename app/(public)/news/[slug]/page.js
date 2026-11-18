import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageTitle from "@/components/layout/PageTitle";
import ArticleContent from "@/components/blog/ArticleContent";
import BlogCard from "@/components/blog/BlogCard";
import SectionHeading from "@/components/common/SectionHeading";
import { getBlogPostBySlug, getBlogPosts, getBlogSlugs, getRelatedPosts } from "@/services/blogService";
import { formatDate } from "@/lib/formatters";
import { buildMetadata } from "@/lib/metadata";

// Read params up front so unknown slugs return a real 404 status.
// Known slugs are prerendered via generateStaticParams, so navigation stays fast.
export const instant = false;

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Article not found" };
  const meta = buildMetadata({ title: post.title, description: post.excerpt, path: `/news/${post.slug}`, image: post.image });
  return { ...meta, openGraph: { ...meta.openGraph, type: "article", publishedTime: post.publishedAt } };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();
  const [related, all] = await Promise.all([getRelatedPosts(post, 3), getBlogPosts()]);
  const recent = all.filter((p) => p.slug !== post.slug).slice(0, 4);
  const categories = [...new Set(all.map((p) => p.category))];

  return (
    <>
      <PageTitle title={post.title} breadcrumb={[{ label: "News", href: "/news" }, { label: post.title }]} />
      <div className="container section">
        <div className="layout-sidebar layout-sidebar--right">
          <ArticleContent post={post} />
          <aside className="detail-aside">
            <section className="author-box">
              <h2>About the Author</h2>
              <Image src={post.author.avatar} alt={post.author.name} width={96} height={96} className="avatar" />
              <p className="mb-0">
                By <strong className="text-primary">{post.author.name}</strong>
              </p>
              <small className="muted">{formatDate(post.publishedAt)}</small>
            </section>
            <section className="card">
              <div className="card__body">
                <h2 className="card__title">Recent Posts</h2>
                <ul className="sidebar-list">
                  {recent.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/news/${p.slug}`}>
                        <span className="sidebar-list__thumb">
                          <Image src={p.image} alt="" fill sizes="70px" />
                        </span>
                        <span>
                          {p.title}
                          <small>{formatDate(p.publishedAt)}</small>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
            <section className="card">
              <div className="card__body">
                <h2 className="card__title">Categories</h2>
                <ul className="tag-list">
                  {categories.map((c) => (
                    <li key={c}>
                      <Link href={`/news?category=${encodeURIComponent(c)}`} className="tag">
                        {c}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </aside>
        </div>
      </div>
      <section className="section section--light" aria-label="Related articles">
        <div className="container">
          <SectionHeading title="Related Articles" subtitle="Keep reading with these hand-picked posts." />
          <div className="grid grid-3">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} showShare={false} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
