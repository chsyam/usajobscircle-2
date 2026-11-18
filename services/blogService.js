import { blogPosts } from "@/data/blogPosts";
import { fromSource } from "./apiClient";

export async function getBlogPosts() {
  return fromSource("/posts", () =>
    [...blogPosts].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
  );
}

export async function getBlogPostBySlug(slug) {
  return fromSource(`/posts/${slug}`, () => blogPosts.find((p) => p.slug === slug) || null);
}

export async function getBlogSlugs() {
  return blogPosts.map((p) => p.slug);
}

export async function getRelatedPosts(post, limit = 3) {
  const all = (await getBlogPosts()).filter((p) => p.slug !== post.slug);
  const sameCategory = all.filter((p) => p.category === post.category);
  const rest = all.filter((p) => p.category !== post.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
