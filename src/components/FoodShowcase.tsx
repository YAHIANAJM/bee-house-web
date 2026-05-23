"use client";

import { useRef, useState, useEffect } from "react";
import { RevealSection } from "./RevealSection";
import { useTheme } from "./ThemeProvider";

export function FoodShowcase() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const videoRef    = useRef<HTMLVideoElement>(null);
  const modalRef    = useRef<HTMLVideoElement>(null);
  const [playing,   setPlaying]   = useState(false);
  const [muted,     setMuted]     = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  /* Sync modal video time with inline when opening */
  const openFullscreen = () => {
    const inline = videoRef.current;
    if (inline) {
      inline.pause();
    }
    setFullscreen(true);
  };

  useEffect(() => {
    if (!fullscreen) return;
    const modal = modalRef.current;
    const inline = videoRef.current;
    if (!modal || !inline) return;
    modal.currentTime = inline.currentTime;
    modal.muted = inline.muted;
    modal.play().catch(() => {});
  }, [fullscreen]);

  /* Close on Escape */
  useEffect(() => {
    if (!fullscreen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeFullscreen(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [fullscreen]);

  const closeFullscreen = () => {
    const modal = modalRef.current;
    const inline = videoRef.current;
    if (modal && inline) {
      inline.currentTime = modal.currentTime;
      if (!modal.paused) { inline.play().catch(() => {}); setPlaying(true); }
      else setPlaying(false);
      modal.pause();
    }
    setFullscreen(false);
  };

  const toggleInline = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <>
      <section className={`py-[120px] px-6 relative overflow-hidden transition-colors duration-700 ${isDark ? "bg-[#0F0800]" : "bg-surface-container-lowest"}`}>
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-[180px] rounded-full pointer-events-none ${isDark ? "bg-honey-drip/8" : "bg-primary/5"}`} />
        <div className={`absolute bottom-0 right-0 w-[400px] h-[400px] blur-[160px] rounded-full pointer-events-none ${isDark ? "bg-primary/10" : "bg-honey-drip/8"}`} />

        <div className="max-w-[1280px] mx-auto relative z-10">

          {/* Header */}
          <RevealSection className="text-center mb-12">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-5 border ${isDark ? "bg-honey-drip/15 border-honey-drip/30 text-honey-drip" : "bg-primary/10 border-primary/20 text-primary"}`}>
              <span className="material-symbols-outlined text-sm animate-pulse">verified</span>
              Personnalité Invitée
            </div>
            <h2 className={`font-[family-name:var(--font-playfair)] text-[clamp(32px,5vw,52px)] font-semibold leading-tight mb-4 ${isDark ? "text-white" : "text-day-text"}`}>
              Leur Avis,<br />
              <span className={isDark ? "text-night-accent" : "text-primary"}>Notre Fierté</span>
            </h2>
            <p className={`font-[family-name:var(--font-dm-sans)] max-w-lg mx-auto text-lg leading-relaxed ${isDark ? "text-white/50" : "text-on-surface-variant"}`}>
              Une personnalité de renom nous a rendu visite et a vécu l&apos;expérience Bee House.
              Découvrez la qualité de notre cuisine, de nos produits et de notre service.
            </p>
          </RevealSection>

          {/* Inline video player */}
          <RevealSection delay={200}>
            <div className={`relative rounded-3xl overflow-hidden shadow-2xl group max-w-4xl mx-auto border ${isDark ? "border-white/8" : "border-outline-variant/20"}`}>
              <video
                ref={videoRef}
                className="w-full aspect-video object-cover"
                playsInline
                onEnded={() => setPlaying(false)}
              >
                <source src="/images/food-view.webm" type="video/webm" />
                <source src="/images/food-view.mp4"  type="video/mp4" />
              </video>

              {/* Paused overlay */}
              {!playing && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                  <button
                    onClick={toggleInline}
                    className="relative z-10 w-20 h-20 rounded-full bg-honey-drip/90 hover:bg-honey-drip text-white flex items-center justify-center shadow-2xl shadow-honey-drip/30 hover:scale-110 active:scale-95 transition-all duration-200"
                    aria-label="Lancer la vidéo"
                  >
                    <span className="material-symbols-outlined text-4xl translate-x-0.5">play_arrow</span>
                  </button>
                  <p className="relative z-10 mt-5 font-[family-name:var(--font-dm-sans)] text-white/70 text-sm tracking-wide">
                    Appuyez pour regarder
                  </p>
                </div>
              )}

              {/* Playing controls */}
              {playing && (
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-3">
                  <button onClick={toggleInline} className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-lg">pause</span>
                  </button>
                  <button onClick={toggleMute} className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-lg">{muted ? "volume_off" : "volume_up"}</span>
                  </button>
                  {/* Expand to fullscreen */}
                  <button onClick={openFullscreen} className="ml-auto w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-lg">open_in_full</span>
                  </button>
                </div>
              )}

              {/* Expand button when paused too */}
              {!playing && (
                <button
                  onClick={openFullscreen}
                  className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
                  aria-label="Plein écran"
                >
                  <span className="material-symbols-outlined text-base">open_in_full</span>
                </button>
              )}
            </div>
          </RevealSection>

          {/* Stats */}
          <RevealSection delay={400} className="mt-14">
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              {[
                { icon: "storefront", value: "Ain Chock", label: "Casablanca" },
                { icon: "schedule",   value: "07–23:30",  label: "Ouvert chaque jour" },
                { icon: "star",       value: "5 ★",        label: "Service Premium" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <span className={`material-symbols-outlined text-3xl block mb-2 ${isDark ? "text-night-accent" : "text-primary"}`}>{stat.icon}</span>
                  <p className={`font-[family-name:var(--font-playfair)] text-xl font-bold ${isDark ? "text-white" : "text-day-text"}`}>{stat.value}</p>
                  <p className={`font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-widest mt-0.5 ${isDark ? "text-white/40" : "text-on-surface-variant/60"}`}>{stat.label}</p>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Fullscreen modal ── */}
      {fullscreen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center" onClick={closeFullscreen}>
          {/* Blurred backdrop */}
          <div className="absolute inset-0 backdrop-blur-xl bg-black/75" />

          {/* Video container — centered, never cropped */}
          <div
            className="relative z-10 w-full max-w-5xl mx-4 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={modalRef}
              className="w-full h-auto"
              playsInline
              controls
              autoPlay
              onEnded={() => { setPlaying(false); closeFullscreen(); }}
            >
              <source src="/images/food-view.webm" type="video/webm" />
              <source src="/images/food-view.mp4"  type="video/mp4" />
            </video>

            {/* Close button */}
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors backdrop-blur-sm border border-white/20"
              aria-label="Fermer"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
