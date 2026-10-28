# humzahasan.dev

Personal site for Humza Hasan. Next.js App Router, fully static, built for Vercel.

## Run it

```bash
npm install
npm run dev
```

`npm run build` prerenders every page. `npm run typecheck` runs TypeScript.

## Structure

```
app/                 routes: /, /about, /writing, /writing/[slug], /work-with-me
  sitemap.ts         sitemap.xml (includes the profile image for Google Images)
  robots.ts          robots.txt
  opengraph-image.tsx  branded 1200x630 preview, also used for Twitter
components/          Header, Footer, ThemeToggle, CommandPalette (Cmd/Ctrl+K), JsonLd
content/site.ts      every personal detail: links, stats, case studies, projects, timeline
content/posts/*.mdx  blog posts
lib/schema.ts        JSON-LD Person and WebSite schema
```

## Design system

- Colors: near-black canvas with one lime accent (`#c6f432`). Light theme uses the same hue darkened to `#3f6212` for AA contrast. All tokens live at the top of `app/globals.css`.
- Type: Geist Sans for body, Geist Mono for labels, stats and eyebrows. Self-hosted, no font requests to Google.
- Spacing: 4px scale (`--space-1` to `--space-24`), 1080px max width.
- Dark by default. The toggle saves to localStorage and a tiny inline script applies it before paint.

## Before launch: swap the placeholders

Every placeholder is marked `TODO` in `content/site.ts`.

1. **Domain**: set `site.url`. It drives canonical URLs, the sitemap, Open Graph and schema.
2. **Photo**: replace `public/humza-hasan.jpg` with a real square photo (800px or more). Keep the filename.
3. **Email**: set `site.email`.
4. **Resume**: drop a PDF in `public/` and point `site.resumeUrl` at it. It links to LinkedIn for now.
5. **Instagram**: add the URL. It then shows in the footer, the side project card and `sameAs`.
6. **Case study numbers**: add real results to `caseStudies` (load time, release frequency, users).
7. **Sonar Studio link** and the Publicis Sapient start year.
8. The starter post in `content/posts/` is a draft. Rewrite it or replace it.

## Writing a post

Add `content/posts/my-slug.mdx`:

```mdx
export const metadata = {
  title: "Post title",
  description: "One sentence for Google and social cards.",
  date: "2026-11-01",
  devto: "", // fill in after cross-posting
};

Post body in Markdown.
```

It gets a page, Article schema, a sitemap entry and a spot on the home page automatically.

**Cross-posting to Dev.to**: publish here first, then post on Dev.to with `canonical_url: https://humzahasan.dev/writing/my-slug` in the front matter. Google credits this site, Dev.to still gets the readers.

## After launch

- Add the site to Google Search Console and submit `/sitemap.xml`.
- Put the link in your LinkedIn, GitHub, Dev.to and Instagram bios. Those plus `sameAs` tell Google they're all you.
- Publish every few weeks to keep it fresh.
