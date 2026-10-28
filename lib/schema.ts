import { sameAs, site } from "@/content/site";

export const personId = `${site.url}/#person`;

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId,
  name: site.name,
  url: site.url,
  image: `${site.url}${site.image.src}`,
  jobTitle: site.jobTitle,
  description: site.description,
  worksFor: { "@type": "Organization", name: site.employer.name, url: site.employer.url },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Maulana Abul Kalam Azad University of Technology" },
  address: { "@type": "PostalAddress", addressLocality: "Noida", addressCountry: "IN" },
  knowsAbout: ["React", "TypeScript", "Micro-frontends", "Webpack Module Federation", "Redux", "CI/CD"],
  sameAs,
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  author: { "@id": personId },
};
