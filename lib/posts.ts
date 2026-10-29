import fs from "node:fs";
import path from "node:path";
import { createElement } from "react";
import type { MDXContent } from "mdx/types";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  // Set once the post is cross-posted, with canonical_url pointing back here.
  devto?: string;
  // Imported posts: where they were first published. The page's canonical points there.
  source?: "Dev.to" | "Medium";
  canonical?: string;
};

type ImportedPost = Omit<PostMeta, "slug" | "devto"> & { slug: string; html: string };

const postsDir = path.join(process.cwd(), "content/posts");
// Filled by `npm run import-posts`.
const importedDir = path.join(process.cwd(), "content/imported");

function readImported(slug: string): ImportedPost | undefined {
  const file = path.join(importedDir, `${slug}.json`);
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : undefined;
}

export function getPostSlugs(): string[] {
  const own = fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
  const imported = fs.existsSync(importedDir)
    ? fs
        .readdirSync(importedDir)
        .filter((file) => file.endsWith(".json"))
        .map((file) => file.replace(/\.json$/, ""))
        .filter((slug) => !own.includes(slug))
    : [];
  return [...own, ...imported];
}

export async function getPost(slug: string): Promise<{ meta: PostMeta; Content: MDXContent }> {
  if (!fs.existsSync(path.join(postsDir, `${slug}.mdx`))) {
    const post = readImported(slug);
    if (post) {
      const { html, ...meta } = post;
      const Content: MDXContent = () => createElement("div", { dangerouslySetInnerHTML: { __html: html } });
      return { meta, Content };
    }
  }
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
