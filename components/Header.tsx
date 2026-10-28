import Link from "next/link";
import { nav } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";
import { PaletteButton } from "./CommandPalette";

export function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="logo" aria-label="Humza Hasan, home">
          humza<span>.</span>hasan
        </Link>
        <nav className="nav" aria-label="Main">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <PaletteButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
