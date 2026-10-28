"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { nav, site } from "@/content/site";
import { toggleTheme } from "@/lib/theme";

const OPEN_EVENT = "open-command-palette";

type Command = { id: string; label: string; hint: string; run: () => void };

export function PaletteButton() {
  return (
    <button
      type="button"
      className="icon-btn"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      aria-label="Open command menu"
      aria-keyshortcuts="Meta+K Control+K"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <span className="kbd-hint">⌘K</span>
    </button>
  );
}

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const commands = useMemo<Command[]>(() => {
    const go = (href: string) => () => router.push(href);
    const visit = (href: string) => () => window.open(href, "_blank", "noopener");
    return [
      { id: "home", label: "Home", hint: "page", run: go("/") },
      ...nav.map((item) => ({ id: item.href, label: item.label, hint: "page", run: go(item.href) })),
      { id: "hire", label: "Work with me", hint: "page", run: go("/work-with-me") },
      { id: "theme", label: "Toggle theme", hint: "action", run: toggleTheme },
      {
        id: "email",
        label: "Copy email address",
        hint: "action",
        run: () => navigator.clipboard?.writeText(site.email),
      },
      { id: "resume", label: "Resume", hint: "link", run: visit(site.resumeUrl) },
      { id: "linkedin", label: "LinkedIn", hint: "link", run: visit(site.socials.linkedin) },
      { id: "github", label: "GitHub", hint: "link", run: visit(site.socials.github) },
      { id: "devto", label: "Dev.to", hint: "link", run: visit(site.socials.devto) },
    ];
  }, [router]);

  const results = commands.filter((c) => c.label.toLowerCase().includes(query.trim().toLowerCase()));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setQuery("");
      setActive(0);
      inputRef.current?.focus();
    } else {
      returnFocus.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  const run = (command: Command | undefined) => {
    if (!command) return;
    setOpen(false);
    command.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[active]);
    } else if (e.key === "Tab") {
      // Only the input is focusable, so keep focus inside the dialog.
      e.preventDefault();
    }
  };

  return (
    <div className="palette-backdrop" onMouseDown={() => setOpen(false)}>
      <div
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Jump to a page or run an action"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-results"
          aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
          aria-label="Search commands"
        />
        {results.length ? (
          <ul id="palette-results" role="listbox">
            {results.map((command, i) => (
              <li
                key={command.id}
                id={`cmd-${command.id}`}
                role="option"
                aria-selected={i === active}
                onMouseMove={() => setActive(i)}
                onClick={() => run(command)}
              >
                <span>{command.label}</span>
                <span>{command.hint}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty">Nothing matches that.</p>
        )}
      </div>
    </div>
  );
}
