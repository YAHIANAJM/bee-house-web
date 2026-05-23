"use client";

import { useEffect } from "react";

const SECTION_PATHS: { id: string; path: string }[] = [
  { id: "home",      path: "/home"       },
  { id: "morning",   path: "/cafe"       },
  { id: "afternoon", path: "/restaurant" },
  { id: "evening",   path: "/glacier"    },
  { id: "terrace",   path: "/gallery"    },
  { id: "info",      path: "/about"      },
];

export function ScrollUrlTracker() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const match = SECTION_PATHS.find((s) => s.id === entry.target.id);
            if (match) history.replaceState(null, "", match.path);
          }
        }
      },
      { rootMargin: "-35% 0px -60% 0px", threshold: 0 }
    );

    SECTION_PATHS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
