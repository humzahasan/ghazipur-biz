import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getAllPosts } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const pages = ["", "/about", "/writing", "/work-with-me"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
    images: path === "" ? [`${site.url}${site.image.src}`] : undefined,
  }));
  return [
    ...pages,
    // Imported posts name Dev.to or Medium as canonical, so they stay out of the sitemap.
    ...posts
      .filter((post) => !post.canonical)
      .map((post) => ({
        url: `${site.url}/writing/${post.slug}`,
        lastModified: post.date,
        changeFrequency: "yearly" as const,
        priority: 0.6,
      })),
  ];
}
