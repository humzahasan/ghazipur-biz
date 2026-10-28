import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Work with me",
  description: `Hire ${site.name} for freelance frontend work and consulting: React, TypeScript, micro-frontends and Module Federation.`,
  alternates: { canonical: "/work-with-me" },
};

const offers = [
  {
    title: "Micro-frontend setup",
    body: "Splitting a big React app into pieces teams can ship on their own. Module Federation, shared deps, CI/CD.",
  },
  {
    title: "Frontend audits",
    body: "A clear look at your codebase, bundle and performance, with a short list of fixes in priority order.",
  },
  {
    title: "Build it with you",
    body: "Hands-on React and TypeScript work for startups that need to ship a product, not a prototype.",
  },
  {
    title: "Team mentoring",
    body: "Code reviews, architecture calls and pairing sessions for teams leveling up on React and state management.",
  },
];

export default function WorkWithMePage() {
  return (
    <>
      <section className="container page-head">
        <p className="eyebrow">Work with me</p>
        <h1>Let&apos;s build something good.</h1>
        <p>
          I take on a small number of freelance and consulting projects alongside my day job. If one of these
          fits, send me a note.
        </p>
      </section>

      <section className="container">
        <div className="grid-2">
          {offers.map((offer) => (
            <article className="card" key={offer.title}>
              <h3>{offer.title}</h3>
              <p>{offer.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="cta">
          <h2>Say hi</h2>
          <p>Tell me what you&apos;re building, your timeline, and where you&apos;re stuck. I reply within a couple of days.</p>
          <div className="hero-actions">
            <a href={`mailto:${site.email}?subject=Project%20inquiry`} className="btn btn-primary">
              {site.email}
            </a>
            <a href={site.socials.linkedin} className="btn" target="_blank" rel="noopener">
              Message on LinkedIn
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
