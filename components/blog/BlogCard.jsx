import Image from "next/image";
import Link from "next/link";
import ShareButtons from "@/components/common/ShareButtons";
import { formatDate } from "@/lib/formatters";

export default function BlogCard({ post, showShare = true }) {
  const href = `/news/${post.slug}`;
  return (
    <article className="blog-card">
      <Link href={href} className="blog-card__image" tabIndex={-1} aria-hidden="true">
        <Image src={post.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 991px) 50vw, 380px" />
      </Link>
      <div className="blog-card__body">
        <span className="blog-card__category">{post.category}</span>
        <h3 className="blog-card__title">
          <Link href={href}>{post.title}</Link>
        </h3>
        <div className="blog-card__meta">
          <span>
            By <Link href="/news">{post.author.name}</Link>
          </span>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </div>
        <p className="blog-card__excerpt">{post.excerpt}</p>
        <div className="blog-card__footer">
          {showShare && <ShareButtons path={href} title={post.title} />}
          <Link href={href} className="btn btn--primary btn--block">
            Read Article
          </Link>
        </div>
      </div>
    </article>
  );
}
