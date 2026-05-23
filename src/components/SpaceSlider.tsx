"use client";

import { useState, useEffect, useCallback } from "react";

const SLIDES = [
  { src: "/images/inside1.jpg",              alt: "Bee House — salle intérieure" },
  { src: "/images/inside2.jpg",              alt: "Bee House — espace intérieur" },
  { src: "/images/inside3.jpg",              alt: "Bee House — ambiance intérieure" },
  { src: "/images/inside4.jpg",              alt: "Bee House — salon intérieur" },
  { src: "/images/barista.jpg",              alt: "Bee House — notre barista" },
  { src: "/images/interieur-ainchok.webp",   alt: "Bee House Ain Chock" },
  { src: "/images/interieur-nid-abeilles.webp", alt: "Bee House — nid d'abeilles" },
  { src: "/images/interior.jpg",             alt: "Bee House — décor" },
];

const INTERVAL = 3500;

export function SpaceSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <div
      className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/10 dark:border-white/8 group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className={[
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
            i === current ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

      {/* Prev / Next arrows — visible on hover */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
        aria-label="Image précédente"
      >
        <span className="material-symbols-outlined text-lg">chevron_left</span>
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
        aria-label="Image suivante"
      >
        <span className="material-symbols-outlined text-lg">chevron_right</span>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={[
              "rounded-full transition-all duration-300",
              i === current
                ? "w-5 h-1.5 bg-white"
                : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70",
            ].join(" ")}
            aria-label={`Aller à l'image ${i + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm text-white text-[10px] font-bold font-[family-name:var(--font-dm-sans)] tracking-widest px-2.5 py-1 rounded-full">
        {current + 1} / {SLIDES.length}
      </div>
    </div>
  );
}
