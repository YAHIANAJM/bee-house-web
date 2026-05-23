"use client";

import { useState, useEffect } from "react";
import { RevealSection } from "./RevealSection";

const MAPS_EMBED =
  "https://maps.google.com/maps?q=Bee+House+692+Boulevard+El+Qods+Ain+Chock+Casablanca&output=embed&hl=fr&z=17";
const MAPS_LINK =
  "https://www.google.com/maps/search/Bee+House+692+Boulevard+El+Qods+Ain+Chock+Casablanca";

export function InfoSection() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <section
        id="info"
        className="py-[120px] bg-surface-linen dark:bg-surface-walnut px-6 transition-colors duration-700 relative overflow-hidden"
      >
        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 dark:bg-honey-drip/8 blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/4 dark:bg-secondary/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-[1280px] mx-auto relative z-10">
          <RevealSection>
            <div className="bg-surface-container-lowest dark:bg-night-bg rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-outline-variant/20 dark:border-white/5">
              {/* Contact info */}
              <div className="md:w-1/2 p-12 relative">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-px bg-primary dark:bg-night-accent" />
                  <span className="text-primary dark:text-night-accent font-[family-name:var(--font-dm-sans)] text-[11px] font-bold tracking-[0.2em] uppercase">
                    Nous Trouver
                  </span>
                </div>
                <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(32px,4vw,48px)] font-semibold text-day-text dark:text-white mb-10 leading-tight">
                  Venez Nous<br />
                  <span className="text-primary dark:text-night-accent">Rendre Visite</span>
                </h2>
                <div className="space-y-7">
                  {[
                    {
                      icon: "location_on",
                      title: "Adresse",
                      content: "692 Bd El Qods, Résidence Al Ahfad,\nAin Chock, Casablanca",
                    },
                    {
                      icon: "schedule",
                      title: "Horaires",
                      content: "Ouvert tous les jours\n07:00 – 23:30",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-5 group">
                      <span className="w-11 h-11 rounded-xl bg-primary/8 dark:bg-night-accent/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 dark:group-hover:bg-night-accent/20 transition-colors">
                        <span className="material-symbols-outlined text-primary dark:text-night-accent text-xl">
                          {item.icon}
                        </span>
                      </span>
                      <div>
                        <h4 className="font-[family-name:var(--font-dm-sans)] font-bold text-sm mb-1 text-on-surface dark:text-white">
                          {item.title}
                        </h4>
                        <p className="text-on-surface-variant dark:text-white/60 font-[family-name:var(--font-dm-sans)] text-sm whitespace-pre-line leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="flex gap-5 group">
                    <span className="w-11 h-11 rounded-xl bg-primary/8 dark:bg-night-accent/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 dark:group-hover:bg-night-accent/20 transition-colors">
                      <span className="material-symbols-outlined text-primary dark:text-night-accent text-xl">call</span>
                    </span>
                    <div>
                      <h4 className="font-[family-name:var(--font-dm-sans)] font-bold text-sm mb-1 text-on-surface dark:text-white">
                        Téléphone
                      </h4>
                      <p className="text-on-surface-variant dark:text-white/60 font-[family-name:var(--font-dm-sans)] text-[20px] font-bold">
                        +212 522 870808
                      </p>
                    </div>
                  </div>

                  <a
                    href="tel:+212522870808"
                    className="inline-flex items-center gap-2 bg-primary dark:bg-night-accent text-on-primary dark:text-night-bg font-[family-name:var(--font-dm-sans)] text-xs font-bold tracking-[0.1em] uppercase px-8 py-4 rounded-full hover:opacity-90 transition-all shadow-md shadow-primary/15 dark:shadow-night-accent/15 hover:shadow-lg hover:-translate-y-0.5 mt-2"
                  >
                    <span className="material-symbols-outlined text-sm">calendar_month</span>
                    Réserver Maintenant
                  </a>
                </div>
              </div>

              {/* Clickable map preview */}
              <button
                onClick={() => setOpen(true)}
                className="md:w-1/2 h-[400px] md:h-auto min-h-[400px] relative overflow-hidden group cursor-pointer text-left"
                aria-label="Voir sur Google Maps"
              >
                <iframe
                  src={MAPS_EMBED}
                  className="w-full h-full pointer-events-none border-0"
                  loading="lazy"
                  title="Bee House map preview"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white dark:bg-night-bg px-6 py-3 rounded-full shadow-xl font-[family-name:var(--font-dm-sans)] font-bold text-primary dark:text-night-accent flex items-center gap-2 text-sm">
                    <span className="material-symbols-outlined text-base">open_in_full</span>
                    Voir la carte
                  </div>
                </div>
              </button>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Map Modal ── */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
          <div
            className="relative z-10 w-full max-w-2xl bg-surface-container-lowest dark:bg-night-bg rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-outline-variant/20 dark:border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/30 dark:border-white/10">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary dark:text-night-accent">location_on</span>
                <div>
                  <p className="font-[family-name:var(--font-dm-sans)] font-bold text-on-surface dark:text-white text-sm">
                    Bee House Casablanca
                  </p>
                  <p className="font-[family-name:var(--font-dm-sans)] text-on-surface-variant dark:text-white/60 text-xs">
                    692 Bd El Qods, Ain Chock
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant dark:text-white/60 hover:bg-surface-container dark:hover:bg-white/10 transition-colors"
                aria-label="Fermer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
            <div className="h-[420px] w-full">
              <iframe
                src={MAPS_EMBED}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                title="Bee House Google Maps"
              />
            </div>
            <div className="px-6 py-4 border-t border-outline-variant/30 dark:border-white/10 flex items-center justify-between gap-4">
              <p className="font-[family-name:var(--font-dm-sans)] text-xs text-on-surface-variant dark:text-white/50">
                Ouvert tous les jours · 07:00 – 23:30
              </p>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary hover:bg-honey-drip transition-colors text-on-primary font-[family-name:var(--font-dm-sans)] text-xs font-bold tracking-[0.08em] uppercase px-5 py-2.5 rounded-full shrink-0"
              >
                <span className="material-symbols-outlined text-sm">open_in_new</span>
                Ouvrir dans Google Maps
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
