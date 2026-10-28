// Everything personal lives here. Swap the placeholders (marked TODO) before launch.

export const site = {
  name: "Humza Hasan",
  // TODO: replace with the real domain once bought.
  url: "https://humzahasan.dev",
  jobTitle: "Senior Experience Engineer",
  employer: { name: "Publicis Sapient", url: "https://www.publicissapient.com" },
  location: "Noida, India",
  positioning: "Frontend engineer building micro-frontends at scale.",
  description:
    "Humza Hasan is a frontend engineer in Noida, India with 7+ years of React and TypeScript experience, building micro-frontends at scale at Publicis Sapient.",
  // TODO: replace with a real inbox on your domain.
  email: "hello@humzahasan.dev",
  // TODO: point this at /humza-hasan-resume.pdf once the PDF is in /public.
  resumeUrl: "https://www.linkedin.com/in/humza-hasan/",
  // TODO: replace public/humza-hasan.jpg with a real photo (square, at least 800px).
  image: { src: "/humza-hasan.jpg", width: 800, height: 800 },
  socials: {
    linkedin: "https://www.linkedin.com/in/humza-hasan/",
    github: "https://github.com/humzahasan",
    devto: "https://dev.to/thehumzahasan",
    // TODO: add your Instagram URL. Empty values are left out of the page and the schema.
    instagram: "",
  },
};

export const sameAs = Object.values(site.socials).filter(Boolean);

export const stats = [
  { value: "7+", label: "years shipping frontend" },
  { value: "3", label: "companies, from startup to enterprise" },
  { value: "React + TS", label: "daily stack" },
  { value: "MFE", label: "micro-frontends with Module Federation" },
];

// TODO: add real numbers to each result (load time, release frequency, users, team count).
export const caseStudies = [
  {
    org: "Verizon, via Publicis Sapient",
    title: "Micro-frontends at enterprise scale",
    problem:
      "Lots of teams shipping into one big web app. Every release was tied to everyone else's.",
    did: "Built and maintain micro-frontends on Webpack Module Federation, with shared dependencies and per-app CI/CD pipelines.",
    result: "Teams deploy on their own schedule without breaking each other.",
    tags: ["React", "TypeScript", "Module Federation", "CI/CD"],
  },
  {
    org: "Seekho.ai",
    title: "Founding frontend at a Sequoia-backed startup",
    problem: "A brand new product with no frontend, no design system and a tight runway.",
    did: "Joined the founding team and built the web app from scratch: architecture, state management and the release process.",
    result: "Took the product from zero to a live app real learners used every day.",
    tags: ["React", "Redux Toolkit", "Startup"],
  },
  {
    org: "Citibank APAC, via TCS",
    title: "Enterprise banking platform",
    problem: "Banking flows that had to be fast, accessible and correct across several markets.",
    did: "Built customer-facing features in React with Redux Saga for the complex async flows.",
    result: "Shipped features to customers across the APAC region.",
    tags: ["React", "Redux Saga", "Banking"],
  },
  {
    org: "Luminor Bank, via TCS",
    title: "Retail banking for the Baltics",
    problem: "A large banking frontend that needed new features without slowing down releases.",
    did: "Delivered features and helped keep a large Redux codebase maintainable.",
    result: "Steady feature releases on a codebase many teams depended on.",
    tags: ["React", "Redux", "Banking"],
  },
];

export const sideProjects = [
  {
    name: "Sonar Studio",
    description:
      "Turns jewellery CAD files into clean product renders, so small jewellers can skip the photo shoot.",
    // TODO: add the live URL.
    url: "",
  },
  {
    name: "Under the hood",
    description:
      "An Instagram series that explains how apps like Swiggy and Blinkit actually work, one diagram at a time.",
    url: site.socials.instagram,
  },
];

// TODO: confirm the start year at Publicis Sapient.
export const timeline = [
  {
    period: "2023 to now",
    role: "Senior Experience Engineer",
    org: "Publicis Sapient",
    note: "Micro-frontends at scale for Verizon.",
  },
  {
    period: "2022 to 2023",
    role: "Founding team, frontend",
    org: "Seekho.ai",
    note: "Sequoia-backed. Built the web app from day one.",
  },
  {
    period: "2018 to 2022",
    role: "Frontend engineer",
    org: "Tata Consultancy Services",
    note: "Enterprise banking platforms for Citibank APAC and Luminor Bank.",
  },
  {
    period: "Before that",
    role: "B.Tech, Computer Science",
    org: "MAKAUT, Kolkata",
    note: "Where I wrote my first line of JavaScript and never stopped.",
  },
];

export const nav = [
  { href: "/#work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
];
