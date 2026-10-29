// Pulls articles from Dev.to and Medium into content/imported/*.json.
// Run with `npm run import-posts`, then commit the JSON. Builds never hit the network.
// Each post keeps a canonical link to where it was first published.
import fs from "node:fs/promises";
import path from "node:path";

const DEVTO_USER = "thehumzahasan";
const MEDIUM_USER = "humzahasan";
const outDir = path.join(process.cwd(), "content/imported");

// Dev.to and Medium slugs end in a random id: "code-splitting-in-react-3ink".
const cleanSlug = (slug) => slug.replace(/-[0-9a-z]{3,12}$/, "");

// Drop scripts and inline handlers from embeds; everything else is the author's own markup.
const tidyHtml = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/<a[^>]*class="anchor"[^>]*>\s*<\/a>/gi, "")
    // Dev.to's fullscreen toggle under each code block needs its own JS.
    .replace(/<div class="highlight__panel[\s\S]*?<\/svg>\s*<\/div>\s*<\/div>/gi, "")
    .trim();

// Built from paragraphs only, so captions and headings stay out of the meta description.
const summarise = (html) =>
  [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map(([, text]) => text)
    .join(" ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 155)
    .replace(/\s\S*$/, "…");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Dev.to rate-limits bursts, so space requests out and back off on 429.
async function getJson(url, attempt = 1) {
  await sleep(700);
  const res = await fetch(url);
  if (res.status === 429 && attempt < 5) {
    await sleep(2000 * attempt);
    return getJson(url, attempt + 1);
  }
  if (!res.ok) throw new Error(`${url}: ${res.status}`);
  return res.json();
}

async function devtoPosts() {
  const list = await getJson(`https://dev.to/api/articles?username=${DEVTO_USER}&per_page=100`);
  const posts = [];
  for (const item of list) {
    const article = await getJson(`https://dev.to/api/articles/${item.id}`);
    const fromMedium = article.canonical_url?.includes("medium.com");
    posts.push({
      slug: cleanSlug(article.slug),
      title: article.title,
      description: article.description || summarise(article.body_html),
      date: article.published_at.slice(0, 10),
      source: fromMedium ? "Medium" : "Dev.to",
      canonical: article.canonical_url || article.url,
      html: tidyHtml(article.body_html),
    });
  }
  return posts;
}

// Medium mixes hair spaces and non-breaking spaces into headings.
const sameText = (a, b) => {
  const norm = (text) => text.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().toLowerCase();
  return norm(a) === norm(b);
};

async function mediumPosts() {
  const res = await fetch(`https://medium.com/feed/@${MEDIUM_USER}`);
  if (!res.ok) throw new Error(`Medium feed: ${res.status}`);
  const xml = await res.text();
  const cdata = (item, tag) =>
    item.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`))?.[1]?.trim() ?? "";
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
    const link = cdata(item, "link").split("?")[0];
    const title = cdata(item, "title");
    const html = tidyHtml(cdata(item, "content:encoded"))
      // Medium appends a tracking pixel to every post.
      .replace(/<img[^>]*medium\.com\/_\/stat[^>]*>/gi, "")
      // Some posts repeat the title as their first heading; the page already shows it.
      .replace(/^(<figure>[\s\S]*?<\/figure>)?\s*<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/i, (match, figure = "", text) =>
        sameText(text, title) ? figure : match,
      )
      .trim();
    return {
      slug: cleanSlug(link.split("/").pop()),
      title,
      description: summarise(html),
      date: new Date(cdata(item, "pubDate")).toISOString().slice(0, 10),
      source: "Medium",
      canonical: link,
      html,
    };
  });
}

const devto = await devtoPosts();
const medium = await mediumPosts();
// A Medium post cross-posted to Dev.to already came through with its Medium canonical.
const known = new Set(devto.map((post) => post.canonical));
const posts = [...devto, ...medium.filter((post) => !known.has(post.canonical))];

await fs.mkdir(outDir, { recursive: true });
for (const post of posts) {
  await fs.writeFile(path.join(outDir, `${post.slug}.json`), `${JSON.stringify(post, null, 2)}\n`);
}
console.log(`Imported ${posts.length} posts (${devto.length} Dev.to, ${posts.length - devto.length} Medium).`);
