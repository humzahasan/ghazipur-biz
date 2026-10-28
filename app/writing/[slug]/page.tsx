import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/content/site";
import { formatDate, getPost, getPostSlugs } from "@/lib/posts";
import { personId } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { meta } = await getPost((await params).slug);
  const path = `/writing/${meta.slug}`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: path },
    authors: [{ name: site.name, url: site.url }],
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.description,
      url: path,
      publishedTime: meta.date,
      authors: [site.url],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { meta, Content } = await getPost((await params).slug);
  const url = `${site.url}/writing/${meta.slug}`;

  return (
    <article className="container">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: meta.title,
          description: meta.description,
          datePublished: meta.date,
          url,
          mainEntityOfPage: url,
          image: `${site.url}/opengraph-image`,
          author: { "@type": "Person", "@id": personId, name: site.name, url: site.url },
          publisher: { "@type": "Person", "@id": personId, name: site.name },
        }}
      />
      <header className="page-head">
        <p className="eyebrow">
          <Link href="/writing">Writing</Link>
        </p>
        <h1>{meta.title}</h1>
        <p className="post-meta">
          <time dateTime={meta.date}>{formatDate(meta.date)}</time> · {site.name}
          {meta.devto && (
            <>
              {" "}
              · <a href={meta.devto}>Also on Dev.to</a>
            </>
          )}
        </p>
      </header>
      <div className="prose">
        <Content />
      </div>
    </article>
  );
}
