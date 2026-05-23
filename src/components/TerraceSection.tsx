"use client";

import { useState, useEffect, useCallback } from "react";
import { RevealSection } from "./RevealSection";

const IMAGES = [
  { src: "/images/inside1.jpg",                alt: "Bee House — salle intérieure" },
  { src: "/images/inside2.jpg",                alt: "Bee House — espace intérieur" },
  { src: "/images/inside3.jpg",                alt: "Bee House — ambiance" },
  { src: "/images/inside4.jpg",                alt: "Bee House — salon" },
  { src: "/images/barista.jpg",                alt: "Bee House — barista" },
  { src: "/images/interieur-nid-abeilles.webp",alt: "Bee House — nid d'abeilles" },
  { src: "/images/interior.jpg",               alt: "Bee House — décor" },
];

const OFFSET = 3;
const INTERVAL = 3200;

export function TerraceSection() {
  const [idx, setIdx] = useState(0);

  const tick = useCallback(() => setIdx((i) => (i + 1) % IMAGES.length), []);

  useEffect(() => {
    const id = setInterval(tick, INTERVAL);
    return () => clearInterval(id);
  }, [tick]);

  const left  = idx;
  const right = (idx + OFFSET) % IMAGES.length;

  return (
    <section
      id="terrace"
      className="py-[120px] bg-surface-container-lowest dark:bg-night-bg px-6 overflow-hidden transition-colors duration-700 relative"
    >
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-tertiary/5 dark:bg-tertiary/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-honey-drip/4 dark:bg-honey-drip/8 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* Two auto-scrolling image cards */}
        <RevealSection className="order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4">
            {/* Left card — offset higher */}
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl transform -translate-y-6 border border-outline-variant/10 dark:border-white/5 relative">
              {IMAGES.map((img, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  className={[
                    "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
                    i === left ? "opacity-100" : "opacity-0",
                  ].join(" ")}
                />
              ))}
            </div>

            {/* Right card */}
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-outline-variant/10 dark:border-white/5 relative">
              {IMAGES.map((img, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  className={[
                    "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
                    i === right ? "opacity-100" : "opacity-0",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-1.5 mt-5">
            {IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={[
                  "rounded-full transition-all duration-300",
                  i === left
                    ? "w-5 h-1.5 bg-tertiary dark:bg-tertiary-fixed"
                    : "w-1.5 h-1.5 bg-tertiary/25 dark:bg-white/20 hover:bg-tertiary/50 dark:hover:bg-white/40",
                ].join(" ")}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        </RevealSection>

        {/* Text */}
        <RevealSection delay={200} className="order-1 lg:order-2">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-tertiary dark:bg-tertiary-fixed" />
            <span className="text-tertiary dark:text-tertiary-fixed font-[family-name:var(--font-dm-sans)] text-[11px] font-bold tracking-[0.2em] uppercase">
              Nos Espaces
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(36px,5vw,52px)] font-semibold leading-tight text-day-text dark:text-white mb-6">
            Deux Étages,<br />
            <span className="text-tertiary dark:text-tertiary-fixed">Deux Âmes</span>
          </h2>
          <p className="font-[family-name:var(--font-dm-sans)] text-lg text-on-surface-variant dark:text-white/60 mb-8 leading-relaxed">
            Notre terrasse extérieure vibre au rythme de Casablanca, tandis que notre étage
            supérieur offre un cocon de calme et de confort dès 19h00. Choisissez l&apos;espace
            qui correspond à votre humeur.
          </p>
          <ul className="space-y-4">
            {[
              { icon: "outdoor_garden",  text: "Terrasse sur le Boulevard El Qods" },
              { icon: "meeting_room",    text: "Salon Privé à l'étage (Après 19h00)" },
              { icon: "family_restroom", text: "Espace Enfants & Familles accueilli avec bienveillance" },
            ].map((item) => (
              <li
                key={item.text}
                className="flex items-center gap-4 text-on-surface-variant dark:text-white/60 font-[family-name:var(--font-dm-sans)] group"
              >
                <span className="w-9 h-9 rounded-xl bg-tertiary/8 dark:bg-tertiary-fixed/10 flex items-center justify-center shrink-0 group-hover:bg-tertiary/15 dark:group-hover:bg-tertiary-fixed/20 transition-colors">
                  <span className="material-symbols-outlined text-tertiary dark:text-tertiary-fixed text-lg">{item.icon}</span>
                </span>
                {item.text}
              </li>
            ))}
          </ul>
        </RevealSection>
      </div>
    </section>
  );
}
