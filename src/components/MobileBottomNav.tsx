"use client";

import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

const NAV_ITEMS = [
  { id: "morning",   path: "/cafe",       label: "Café",      icon: "local_cafe"    },
  { id: "afternoon", path: "/restaurant", label: "Restaurant",icon: "restaurant"    },
  { id: "evening",   path: "/glacier",    label: "Glacier",   icon: "icecream"      },
  { id: "terrace",   path: "/gallery",    label: "Gallery",   icon: "photo_library" },
  { id: "info",      path: "/about",      label: "About",     icon: "info"          },
];

function scrollToSection(id: string, path: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    history.pushState(null, "", path);
  }
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleClick = (id: string, path: string) => {
    if (isHome) scrollToSection(id, path);
    else window.location.href = `/#${id}`;
  };

  const handleBook = () => {
    if (isHome) scrollToSection("info", "/about");
    else window.location.href = "/#info";
  };

  return (
    <nav
      className={[
        "fixed bottom-0 left-0 right-0 z-50 md:hidden border-t",
        isDark
          ? "bg-surface-walnut/96 backdrop-blur-md border-white/8"
          : "bg-surface/96 backdrop-blur-md border-outline-variant/30",
      ].join(" ")}
    >
      <div className="flex items-stretch">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id, item.path)}
            className={[
              "flex-1 flex flex-col items-center justify-center gap-[3px] py-3 cursor-pointer border-0 bg-transparent transition-colors",
              isDark
                ? "text-white/40 hover:text-night-accent"
                : "text-on-surface-variant/50 hover:text-primary",
            ].join(" ")}
          >
            <span className="material-symbols-outlined text-[20px] leading-none">{item.icon}</span>
            <span className="text-[8px] font-bold tracking-[0.05em] uppercase">{item.label}</span>
          </button>
        ))}

        {/* Book a Table — highlighted */}
        <button
          onClick={handleBook}
          className={[
            "flex-1 flex flex-col items-center justify-center gap-[3px] py-3 cursor-pointer border-0 bg-transparent transition-colors",
            isDark ? "text-night-accent" : "text-primary",
          ].join(" ")}
        >
          <span className="material-symbols-outlined text-[20px] leading-none">calendar_month</span>
          <span className="text-[8px] font-bold tracking-[0.05em] uppercase">Book</span>
        </button>
      </div>
    </nav>
  );
}
