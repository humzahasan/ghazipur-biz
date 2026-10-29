import { site } from "@/content/site";

export function Footer() {
  const links = [
    { href: `mailto:${site.email}`, label: "Email" },
    { href: site.socials.linkedin, label: "LinkedIn" },
    { href: site.socials.github, label: "GitHub" },
    { href: site.socials.devto, label: "Dev.to" },
    { href: site.socials.instagram, label: "Instagram" },
  ].filter((link) => link.href);

  return (
    <footer className="site-footer">
      <div className="container">
        <p className="muted">
          © {new Date().getFullYear()} {site.name}. Brewed with Next.js and late-night coffee in {site.location}, after 9-to-9 days and on weekends. Also stirring{" "}
          <a href="https://querystack.in/" target="_blank" rel="noopener">
            QueryStack
          </a>
          .
        </p>
        <ul className="footer-links">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} rel="me noopener" target={link.href.startsWith("http") ? "_blank" : undefined}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
