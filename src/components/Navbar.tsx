"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

const NAV_LINKS = [
  { hash: "#morning",   label: "Café" },
  { hash: "#afternoon", label: "Restaurant" },
  { hash: "#evening",   label: "Glacier" },
  { hash: "#terrace",   label: "Gallery" },
  { hash: "#info",      label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const navLinks = NAV_LINKS.map((l) => ({
    href: isHome ? l.hash : `/${l.hash}`,
    label: l.label,
  }));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={[
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled || !isHome
          ? isDark
            ? "bg-surface-walnut/95 backdrop-blur-md shadow-md"
            : "bg-surface/95 backdrop-blur-md shadow-sm shadow-primary/5"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="flex justify-between items-center px-6 py-4 max-w-[1280px] mx-auto">
        {/* Logo */}
        <a
          href={isHome ? "#" : "/"}
          className={[
            "font-[family-name:var(--font-playfair)] text-3xl font-bold tracking-tighter transition-colors",
            isDark ? "text-night-accent" : "text-primary",
          ].join(" ")}
        >
          Bee House
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={[
                "text-xs font-bold tracking-[0.1em] uppercase transition-colors",
                isDark
                  ? "text-surface-variant hover:text-night-accent"
                  : "text-on-surface-variant hover:text-primary",
              ].join(" ")}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href={isHome ? "#info" : "/#info"}
            className="hidden md:inline-flex bg-primary hover:opacity-80 transition-opacity text-on-primary text-xs font-bold tracking-[0.1em] uppercase px-6 py-3 rounded-lg"
          >
            Book a Table
          </a>
          {/* Mobile hamburger */}
          <button
            className={[
              "md:hidden p-2 rounded-lg transition-colors",
              isDark
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
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={[
                "text-xs font-bold tracking-[0.1em] uppercase pt-4 transition-colors",
                isDark
                  ? "text-surface-variant hover:text-night-accent"
                  : "text-on-surface-variant hover:text-primary",
              ].join(" ")}
            >
              {l.label}
            </a>
          ))}
          <a
            href={isHome ? "#info" : "/#info"}
            onClick={() => setMobileOpen(false)}
            className="bg-primary text-on-primary text-xs font-bold tracking-[0.1em] uppercase px-6 py-3 rounded-lg text-center mt-2"
          >
            Book a Table
          </a>
        </div>
      )}
    </nav>
  );
}
