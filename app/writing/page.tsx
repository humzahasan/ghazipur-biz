import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { formatDate, getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description: `Posts by ${site.name} on micro-frontends, React, state management and how popular apps work under the hood.`,
  alternates: { canonical: "/writing" },
};

export default async function WritingPage() {
  const posts = await getAllPosts();

  return (
    <>
      <section className="container page-head">
        <p className="eyebrow">Writing</p>
        <h1>Notes from the frontend</h1>
        <p>
          Everything is published here first. Some posts also live on{" "}
          <a href={site.socials.devto} target="_blank" rel="noopener">
            Dev.to
          </a>{" "}
          and{" "}
          <a href={site.socials.medium} target="_blank" rel="noopener">
            Medium
          </a>
          .
        </p>
      </section>
      <section className="container">
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/writing/${post.slug}`}>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <div>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
