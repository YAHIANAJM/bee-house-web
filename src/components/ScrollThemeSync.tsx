"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

export function ScrollThemeSync() {
  const { setTheme } = useTheme();
  const eveningRef = useRef<Element | null>(null);

  useEffect(() => {
    eveningRef.current = document.getElementById("evening");
    if (!eveningRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTheme("dark");
          } else {
            const rect = eveningRef.current?.getBoundingClientRect();
            if (rect && (rect.bottom < 0 || rect.top > window.innerHeight)) {
              setTheme("light");
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(eveningRef.current);
    return () => observer.disconnect();
  }, [setTheme]);

  return null;
}
