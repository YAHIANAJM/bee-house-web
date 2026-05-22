"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label="Toggle day/night theme"
      className={[
        "fixed bottom-8 right-8 z-[60] w-14 h-14 rounded-full shadow-2xl flex items-center justify-center",
        "hover:scale-110 active:scale-95 transition-all duration-200",
        isDark
          ? "bg-night-accent text-night-bg"
          : "bg-primary text-on-primary",
      ].join(" ")}
    >
      <span className="material-symbols-outlined">
        {isDark ? "dark_mode" : "light_mode"}
      </span>
    </button>
  );
}
