"use client";

import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { RevealSection } from "./RevealSection";

export function BusinessCard() {
  const [menuUrl, setMenuUrl] = useState("");

  useEffect(() => {
    setMenuUrl(window.location.origin + "/menu");
  }, []);

  return (
    <section className="py-[120px] bg-surface-linen/60 dark:bg-[#0F0800] px-6 relative overflow-hidden transition-colors duration-700">
      {/* Green ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-tertiary/8 dark:bg-tertiary/12 blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-tertiary-container/6 dark:bg-tertiary-container/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative z-10">

        {/* Header */}
        <RevealSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-tertiary/10 dark:bg-tertiary/20 border border-tertiary/20 dark:border-tertiary-fixed/20 text-tertiary dark:text-tertiary-fixed px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-5">
            <span className="material-symbols-outlined text-sm">style</span>
            Carte de Visite
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(32px,5vw,52px)] font-semibold leading-tight text-day-text dark:text-white mb-4">
            Gardez Notre<br />
            <span className="text-tertiary dark:text-tertiary-fixed">Adresse</span>
          </h2>
          <p className="font-[family-name:var(--font-dm-sans)] text-on-surface-variant dark:text-white/50 max-w-md mx-auto text-lg">
            Partagez-la, scannez-la, retrouvez-nous.
          </p>
        </RevealSection>

        {/* The Card */}
        <RevealSection delay={200}>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-[2rem] overflow-hidden shadow-2xl shadow-tertiary/25 dark:shadow-tertiary/20 ring-1 ring-tertiary/20">

              {/* Front face */}
              <div className="relative bg-gradient-to-br from-tertiary via-[#3d5c2a] to-[#2a4118] px-10 md:px-14 py-12">

                {/* Decorative background shapes */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-56 h-56 bg-black/15 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />
                <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{ backgroundImage: "radial-gradient(circle, #fff 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }}
                />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-10">

                  {/* Left: branding + info */}
                  <div className="flex-1">
                    <span className="font-[family-name:var(--font-dm-sans)] text-[10px] font-bold tracking-[0.35em] uppercase text-white/50 block mb-2">
                      The Place to Bee
                    </span>
                    <h3 className="font-[family-name:var(--font-playfair)] text-[clamp(42px,7vw,64px)] font-bold text-white leading-none tracking-tight">
                      Bee House
                    </h3>
                    <p className="font-[family-name:var(--font-dm-sans)] text-white/50 text-sm tracking-[0.25em] uppercase mt-1 mb-8">
                      Casablanca
                    </p>

                    <div className="w-14 h-px bg-white/20 mb-8" />

                    <div className="space-y-4">
                      {[
                        { icon: "location_on", text: "692 Bd El Qods, Résidence Al Ahfad, Ain Chock" },
                        { icon: "call",        text: "+212 522 870808" },
                        { icon: "schedule",    text: "Ouvert tous les jours · 07:00 – 23:30" },
                        { icon: "wifi",        text: "Café · Restaurant · Glacier · Freak Shakes" },
                      ].map((row) => (
                        <div key={row.text} className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-tertiary-fixed/70 text-base shrink-0 mt-px">{row.icon}</span>
                          <span className="font-[family-name:var(--font-dm-sans)] text-white/75 text-sm leading-relaxed">
                            {row.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: QR code */}
                  <div className="shrink-0 flex flex-col items-center gap-5">
                    <div className="bg-white rounded-2xl p-4 shadow-xl shadow-black/30">
                      {menuUrl ? (
                        <QRCodeSVG
                          value={menuUrl}
                          size={140}
                          bgColor="#ffffff"
                          fgColor="#2a4118"
                          level="M"
                        />
                      ) : (
                        <div className="w-[140px] h-[140px] bg-white/10 rounded-xl animate-pulse" />
                      )}
                    </div>
                    <div className="text-center">
                      <p className="font-[family-name:var(--font-dm-sans)] text-white/50 text-[10px] tracking-[0.2em] uppercase">
                        Scanner pour
                      </p>
                      <p className="font-[family-name:var(--font-dm-sans)] text-tertiary-fixed text-[11px] font-bold tracking-[0.1em] uppercase">
                        Voir la Carte
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom strip */}
              <div className="bg-[#1e3015] dark:bg-[#162311] px-10 md:px-14 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary-fixed animate-pulse" />
                  <span className="font-[family-name:var(--font-dm-sans)] text-white/40 text-[10px] tracking-[0.15em] uppercase">
                    Ain Chock · Casablanca · Maroc
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="tel:+212522870808"
                    className="inline-flex items-center gap-2 bg-tertiary-fixed text-on-tertiary-fixed font-[family-name:var(--font-dm-sans)] text-[11px] font-bold tracking-[0.1em] uppercase px-5 py-2.5 rounded-full hover:brightness-110 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">call</span>
                    Appeler
                  </a>
                  <a
                    href="https://www.google.com/maps/search/Bee+House+692+Boulevard+El+Qods+Ain+Chock+Casablanca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-[family-name:var(--font-dm-sans)] text-[11px] font-bold tracking-[0.1em] uppercase px-5 py-2.5 rounded-full transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    Itinéraire
                  </a>
                </div>
              </div>

            </div>
          </div>
        </RevealSection>

      </div>
    </section>
  );
}
