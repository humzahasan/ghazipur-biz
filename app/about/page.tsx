import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { site, timeline } from "@/content/site";
import { personId } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}: frontend engineer from India, 7+ years from TCS to a Sequoia-backed startup to Publicis Sapient.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url: `${site.url}/about`,
          mainEntity: { "@id": personId },
        }}
      />
      <section className="container page-head">
        <p className="eyebrow">About</p>
        <h1>I&apos;m {site.name}.</h1>
        <p>I build the parts of the web people actually touch. Mostly in React, always in TypeScript.</p>
      </section>

      <section className="container about-grid">
        <div className="prose">
          <p>
            I started out at TCS in 2018, working on banking platforms for Citibank APAC and Luminor Bank. Big
            codebases, strict reviews, real money moving through every click. It taught me to care about the boring
            stuff: tests, types, and code someone else can read at 2am.
          </p>
          <p>
            In 2022 I joined the founding team at Seekho.ai, a Sequoia-backed startup. No design system, no legacy,
            no safety net. I built the web app from scratch and learned to ship fast without making a mess.
          </p>
          <p>
            Now I&apos;m a {site.jobTitle} at {site.employer.name}, working with Verizon. My days are micro-frontends,
            Module Federation, and helping lots of teams ship into one product without stepping on each other.
          </p>
          <p>
            Outside work I build side projects like <a href="https://querystack.in/">QueryStack</a>,{" "}
            <a href="https://github.com/humzahasan/readme-genie-magic">ReadmeGenie</a> and Sonar Studio, write on <a href={site.socials.devto}>Dev.to</a> and <a href={site.socials.medium}>Medium</a>,
            and explain how apps like Swiggy and Blinkit work under the hood. I live in {site.location}.
          </p>
          <p>
            Want to work together? <Link href="/work-with-me">Here&apos;s how</Link>.
          </p>
        </div>

        <div>
          <div className="portrait" style={{ marginBottom: "var(--space-12)" }}>
            <Image src={site.image.src} alt={site.name} width={site.image.width} height={site.image.height} sizes="320px" />
          </div>
          <h2 className="eyebrow">Timeline</h2>
          <ol className="timeline">
            {timeline.map((item) => (
              <li key={item.org}>
                <p className="period">{item.period}</p>
                <h3>
                  {item.role}, {item.org}
                </h3>
                <p>{item.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
