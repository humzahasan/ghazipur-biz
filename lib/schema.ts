import { sameAs, sideProjects, site } from "@/content/site";

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
  knowsAbout: ["React", "TypeScript", "Micro-frontends", "Webpack Module Federation", "Redux", "CI/CD", "WebGPU", "On-device LLMs"],
  sameAs,
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  author: { "@id": personId },
};

// Software Humza built. Each one names him as creator, and each of those sites links back here.
export const projectsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `Projects by ${site.name}`,
  itemListElement: sideProjects
    .filter((project) => project.category)
    .map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: project.name,
        description: project.description,
        applicationCategory: project.category,
        operatingSystem: "Web",
        ...(project.url && { url: project.url }),
        sameAs: [project.source].filter(Boolean),
        creator: { "@id": personId },
      },
    })),
};
