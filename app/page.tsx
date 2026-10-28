import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { caseStudies, sideProjects, site, stats } from "@/content/site";
import { formatDate, getAllPosts } from "@/lib/posts";
import { personSchema, websiteSchema } from "@/lib/schema";

export const metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const posts = (await getAllPosts()).slice(0, 3);

  return (
    <>
      <JsonLd data={personSchema} />
      <JsonLd data={websiteSchema} />

      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-grid">
          <div>
            <p className="status reveal">Open to freelance and consulting work</p>
            <h1 id="hero-title" className="reveal">
              Hi, I&apos;m {site.name}.
            </h1>
            <p className="lede reveal reveal-2">
              <strong>{site.positioning}</strong> {site.jobTitle} at {site.employer.name}, based in {site.location}.
            </p>
            <div className="hero-actions reveal reveal-3">
              <Link href="/work-with-me" className="btn btn-primary">
                Get in touch
              </Link>
              <a href={site.resumeUrl} className="btn" target="_blank" rel="noopener">
                Resume
              </a>
            </div>
          </div>
          <div className="portrait reveal reveal-2">
            <Image
              src={site.image.src}
              alt={site.name}
              width={site.image.width}
              height={site.image.height}
              sizes="(min-width: 800px) 320px, 90vw"
              priority
            />
          </div>
        </div>
      </section>

      <section className="container" aria-label="Quick stats">
        <dl className="stats">
          {stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <dt>{stat.value}</dt>
              <dd>{stat.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="work" className="section container" aria-labelledby="work-title">
        <div className="section-head">
          <p className="eyebrow">Selected work</p>
          <h2 id="work-title">Things I&apos;ve shipped</h2>
          <p>From an early-stage startup to banks and telecoms with millions of users.</p>
        </div>
        <div className="grid-2">
          {caseStudies.map((study) => (
            <article className="card case" key={study.title}>
              <p className="card-org">{study.org}</p>
              <h3>{study.title}</h3>
              <dl>
                <div>
                  <dt>Problem</dt>
                  <dd>{study.problem}</dd>
                </div>
                <div>
                  <dt>What I did</dt>
                  <dd>{study.did}</dd>
                </div>
                <div>
                  <dt>Result</dt>
                  <dd>{study.result}</dd>
                </div>
              </dl>
              <ul className="tags" aria-label="Tech used">
                {study.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="section container" aria-labelledby="projects-title">
        <div className="section-head">
          <p className="eyebrow">Side projects</p>
          <h2 id="projects-title">Built after hours</h2>
          <p>Small bets, built in public.</p>
        </div>
        <div className="grid-2">
          {sideProjects.map((project) => (
            <article className="card" key={project.name}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              {project.url && (
                <a className="card-link" href={project.url} target="_blank" rel="noopener">
                  Visit {project.name} ↗
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="section container" aria-labelledby="writing-title">
        <div className="section-head">
          <p className="eyebrow">Writing</p>
          <h2 id="writing-title">Notes from the frontend</h2>
          <p>
            Micro-frontends, state, and how things work under the hood. <Link href="/writing">All posts</Link>
          </p>
        </div>
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

      <section className="section container" aria-labelledby="cta-title">
        <div className="cta">
          <p className="eyebrow">Work with me</p>
          <h2 id="cta-title">Need a frontend that scales?</h2>
          <p>I help teams untangle big React apps, set up micro-frontends, and ship faster. Freelance or consulting.</p>
          <div className="hero-actions">
            <Link href="/work-with-me" className="btn btn-primary">
              Let&apos;s talk
            </Link>
            <Link href="/about" className="btn">
              More about me
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
