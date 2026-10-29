# humzahasan.in

Personal site for Humza Hasan. Next.js App Router, fully static, deployed on Netlify.

## Run it

```bash
npm install
npm run dev
```

`npm run build` prerenders every page. `npm run typecheck` runs TypeScript.

## Deploy on Netlify

1. In Netlify, **Add new project > Import an existing project**, pick GitHub and this repo.
2. Leave the build settings alone. `netlify.toml` sets the build command, publish directory and Node 22, and Netlify adds its Next.js runtime on its own.
3. Deploy. Every push to `main` redeploys; pull requests get preview URLs.
4. Under **Domain management**, add your domain and set it as primary, then make sure `site.url` in `content/site.ts` matches it. Netlify redirects the `*.netlify.app` address to the primary domain, and canonical URLs already point at `site.url`, so Google only indexes the real domain.

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
3. **Resume**: drop a PDF in `public/` and point `site.resumeUrl` at it. It links to LinkedIn for now.
4. **Instagram**: add the URL. It then shows in the footer, the side project card and `sameAs`.
5. **Case study numbers**: add real results to `caseStudies` (load time, release frequency, users).
6. The Publicis Sapient start year.
7. The starter post in `content/posts/` is a draft. Rewrite it or replace it.

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

**Importing from Dev.to and Medium**: `npm run import-posts` pulls every article into `content/imported/*.json`. Commit the result. Imported posts get their own page here, with a canonical link to the original so Google doesn't treat them as duplicates. Medium's feed only returns the latest 10 posts, so older ones need a Medium export. If you move a post's home here, set Dev.to's `canonical_url` to the humzahasan.in page and delete `canonical` from its JSON.

**Cross-posting to Dev.to**: publish here first, then post on Dev.to with `canonical_url: https://humzahasan.in/writing/my-slug` in the front matter. Google credits this site, Dev.to still gets the readers. Medium works the same way: use **Import a story** with the post URL and it sets the canonical link for you.

## After launch

- Add the site to Google Search Console and submit `/sitemap.xml`.
- Put the link in your LinkedIn, GitHub, Dev.to, Medium and Instagram bios. Those plus `sameAs` tell Google they're all you.
- Publish every few weeks to keep it fresh.
