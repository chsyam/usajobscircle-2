import Image from "next/image";
import Link from "next/link";
import { Calendar, Folder, User } from "lucide-react";
import ShareButtons from "@/components/common/ShareButtons";
import { formatDate } from "@/lib/formatters";

/** Renders article paragraphs; lines starting with "## " become subheadings. */
function Body({ blocks }) {
  return (
    <div className="article__content">
      {blocks.map((block, i) =>
        block.startsWith("## ") ? <h2 key={i}>{block.slice(3)}</h2> : <p key={i}>{block}</p>
      )}
    </div>
  );
}

export default function ArticleContent({ post }) {
  return (
    <article className="article">
      <ul className="article__meta">
        <li>
          <Folder size={15} aria-hidden="true" />
          <Link href={`/news?category=${encodeURIComponent(post.category)}`}>{post.category}</Link>
        </li>
        <li>
          <User size={15} aria-hidden="true" /> By {post.author.name}
        </li>
        <li>
          <Calendar size={15} aria-hidden="true" /> <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </li>
      </ul>
      <div className="article__image">
        <Image src={post.image} alt={post.title} fill priority sizes="(max-width: 991px) 100vw, 800px" />
      </div>
      <Body blocks={post.content} />
      <div className="article__footer">
        <ul className="tag-list" aria-label="Tags">
          {post.tags.map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}
        </ul>
        <ShareButtons path={`/news/${post.slug}`} title={post.title} />
      </div>
    </article>
  );
}
