"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

const NAV_LINKS = [
  { id: "morning",   path: "/cafe",       label: "Café"       },
  { id: "afternoon", path: "/restaurant", label: "Restaurant" },
  { id: "evening",   path: "/glacier",    label: "Glacier"    },
  { id: "terrace",   path: "/gallery",    label: "Gallery"    },
  { id: "info",      path: "/about",      label: "About"      },
];

function scrollTo(id: string, path: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    history.pushState(null, "", path);
  }
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/" || NAV_LINKS.some((l) => l.path === pathname);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isTransparent = isHome && !scrolled;

  return (
    <nav
      className={[
        "fixed top-0 w-full z-50 transition-all duration-300",
        !isTransparent
          ? isDark
            ? "bg-surface-walnut/95 backdrop-blur-md shadow-md"
            : "bg-surface/95 backdrop-blur-md shadow-sm shadow-primary/5"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="flex justify-between items-center px-6 py-4 max-w-[1280px] mx-auto">
        {/* Logo */}
        <a
          href={isHome ? "/home" : "/"}
          onClick={isHome ? (e) => { e.preventDefault(); scrollTo("home", "/home"); } : undefined}
          className={[
            "font-[family-name:var(--font-playfair)] text-3xl font-bold tracking-tighter transition-colors",
            isTransparent ? "text-white" : isDark ? "text-night-accent" : "text-primary",
          ].join(" ")}
        >
          Bee House
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            isHome ? (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id, l.path)}
                className={[
                  "text-xs font-bold tracking-[0.1em] uppercase transition-colors cursor-pointer bg-transparent border-0 p-0",
                  isTransparent
                    ? "text-white/80 hover:text-white"
                    : isDark
                    ? "text-surface-variant hover:text-night-accent"
                    : "text-on-surface-variant hover:text-primary",
                ].join(" ")}
              >
                {l.label}
              </button>
            ) : (
              <a
                key={l.id}
                href={`/#${l.id}`}
                className={[
                  "text-xs font-bold tracking-[0.1em] uppercase transition-colors",
                  isTransparent
                    ? "text-white/80 hover:text-white"
                    : isDark
                    ? "text-surface-variant hover:text-night-accent"
                    : "text-on-surface-variant hover:text-primary",
                ].join(" ")}
              >
                {l.label}
              </a>
            )
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          {isHome ? (
            <button
              onClick={() => scrollTo("info", "/about")}
              className={[
                "hidden md:inline-flex text-xs font-bold tracking-[0.1em] uppercase px-6 py-3 rounded-lg transition-all cursor-pointer border-0",
                isTransparent
                  ? "bg-white/15 backdrop-blur-sm text-white border border-white/30 hover:bg-white/25"
                  : "bg-primary hover:opacity-80 text-on-primary",
              ].join(" ")}
            >
              Book a Table
            </button>
          ) : (
            <a
              href="/"
              className={[
                "hidden md:inline-flex items-center gap-2 text-xs font-bold tracking-[0.1em] uppercase px-6 py-3 rounded-lg transition-all hover:-translate-x-0.5",
                isDark
                  ? "bg-night-accent text-night-bg hover:opacity-90"
                  : "bg-primary text-on-primary hover:opacity-90",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Retour à l&apos;accueil
            </a>
          )}
          {/* Mobile hamburger */}
          <button
            className={[
              "md:hidden p-2 rounded-lg transition-colors",
              isTransparent
                ? "text-white/80 hover:text-white"
                : isDark
                ? "text-surface-variant hover:text-night-accent"
                : "text-on-surface-variant hover:text-primary",
            ].join(" ")}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div
          className={[
            "md:hidden px-6 pb-6 flex flex-col gap-4 border-t",
            isDark
              ? "bg-surface-walnut border-outline/20"
              : "bg-surface border-outline-variant/30",
          ].join(" ")}
        >
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => { setMobileOpen(false); if (isHome) { scrollTo(l.id, l.path); } else { window.location.href = `/#${l.id}`; } }}
              className={[
                "text-xs font-bold tracking-[0.1em] uppercase pt-4 transition-colors text-left bg-transparent border-0 p-0 cursor-pointer",
                isDark
                  ? "text-surface-variant hover:text-night-accent"
                  : "text-on-surface-variant hover:text-primary",
              ].join(" ")}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => { setMobileOpen(false); if (isHome) { scrollTo("info", "/about"); } else { window.location.href = "/#info"; } }}
            className="bg-primary text-on-primary text-xs font-bold tracking-[0.1em] uppercase px-6 py-3 rounded-lg text-center mt-2 cursor-pointer border-0"
          >
            Book a Table
          </button>
          {!isHome && (
            <a
              href="/"
              onClick={() => setMobileOpen(false)}
              className={[
                "flex items-center gap-2 text-xs font-bold tracking-[0.1em] uppercase px-6 py-3 rounded-lg border text-center justify-center",
                isDark
                  ? "text-white/60 border-white/10"
                  : "text-on-surface-variant border-outline-variant/40",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Retour à l&apos;accueil
            </a>
          )}
        </div>
      )}
    </nav>
  );
}
