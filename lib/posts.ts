import fs from "node:fs";
import path from "node:path";
import type { MDXContent } from "mdx/types";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  // Set once the post is cross-posted, with canonical_url pointing back here.
  devto?: string;
};

const postsDir = path.join(process.cwd(), "content/posts");

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getPost(slug: string): Promise<{ meta: PostMeta; Content: MDXContent }> {
  const mod = await import(`@/content/posts/${slug}.mdx`);
  return { meta: { slug, ...(mod.metadata as Omit<PostMeta, "slug">) }, Content: mod.default };
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const posts = await Promise.all(getPostSlugs().map(async (slug) => (await getPost(slug)).meta));
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
