import { Suspense } from "react";
import PageTitle from "@/components/layout/PageTitle";
import NewsListing from "@/components/blog/NewsListing";
import { SkeletonList } from "@/components/common/Loader";
import { getBlogPosts } from "@/services/blogService";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "News",
  description: "Career advice, hiring tips and the latest updates from usajobscircle.",
  path: "/news",
});

export default async function NewsPage() {
  const posts = await getBlogPosts();
  return (
    <>
      <PageTitle title="News" />
      <section className="section">
        <div className="container">
          <Suspense fallback={<SkeletonList rows={2} height={300} />}>
            <NewsListing posts={posts} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
