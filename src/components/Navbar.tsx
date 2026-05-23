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

function scrollToSection(id: string, path: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    history.pushState(null, "", path);
  }
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  const [isTransparent, setIsTransparent] = useState(isHome);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) {
      setIsTransparent(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsTransparent(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string, path: string) => {
    if (isHome) scrollToSection(id, path);
    else window.location.href = `/#${id}`;
  };

  const handleBookTable = () => {
    if (isHome) scrollToSection("info", "/about");
    else window.location.href = "/#info";
  };

  return (
    <nav
      style={{ backgroundColor: isTransparent ? "transparent" : undefined }}
      className={[
        "fixed top-0 w-full z-50 transition-all duration-300",
        isTransparent
          ? ""
          : isDark
          ? "bg-surface-walnut/95 backdrop-blur-md shadow-md"
          : "bg-surface/95 backdrop-blur-md shadow-sm shadow-primary/5",
      ].join(" ")}
    >
      <div className="flex justify-between items-center px-6 py-4 max-w-[1280px] mx-auto">

        {/* Logo */}
        <a
          href="/"
          onClick={isHome ? (e) => { e.preventDefault(); scrollToSection("home", "/"); } : undefined}
          className={[
            "font-[family-name:var(--font-playfair)] text-3xl font-bold tracking-tighter transition-colors",
            isTransparent ? "text-white" : isDark ? "text-night-accent" : "text-primary",
          ].join(" ")}
        >
          Bee House
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => handleNavClick(l.id, l.path)}
              className={[
                "text-xs font-bold tracking-[0.1em] uppercase transition-colors bg-transparent border-0 p-0 cursor-pointer",
                isTransparent
                  ? "text-white/80 hover:text-white"
                  : isDark
                  ? "text-surface-variant hover:text-night-accent"
                  : "text-on-surface-variant hover:text-primary",
              ].join(" ")}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Desktop: Book a Table CTA */}
          <button
            onClick={handleBookTable}
            className={[
              "hidden md:inline-flex text-xs font-bold tracking-[0.1em] uppercase px-6 py-3 rounded-lg transition-all cursor-pointer border-0",
              isTransparent
                ? "bg-white/15 backdrop-blur-sm text-white border border-white/30 hover:bg-white/25"
                : isDark
                ? "bg-night-accent text-night-bg hover:opacity-90"
                : "bg-primary text-on-primary hover:opacity-80",
            ].join(" ")}
          >
            Book a Table
          </button>

          {/* Mobile: theme toggle in top-right corner (replaces hamburger) */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className={[
              "md:hidden p-2 rounded-lg transition-colors",
              isTransparent
                ? "text-white/80 hover:text-white"
                : isDark
                ? "text-night-accent hover:opacity-80"
                : "text-primary hover:opacity-80",
            ].join(" ")}
          >
            <span className="material-symbols-outlined">
              {isDark ? "dark_mode" : "light_mode"}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
