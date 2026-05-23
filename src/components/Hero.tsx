"use client";

import { useEffect, useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const setHeight = () => {
      // Compensate for any CSS zoom on <html> (e.g. leftover cached zoom: 0.75)
      const zoom = parseFloat(window.getComputedStyle(document.documentElement).zoom) || 1;
      const h = Math.round(window.innerHeight / zoom);
      if (ref.current) ref.current.style.height = h + "px";
    };
    setHeight();
    window.addEventListener("resize", setHeight);
    return () => window.removeEventListener("resize", setHeight);
  }, []);

  return (
    <header ref={ref} id="home" className="relative w-full overflow-hidden flex items-center justify-center text-center px-6" style={{ minHeight: "100vh" }}>
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        {/* Mobile: entry-view */}
        <video autoPlay loop muted playsInline className="md:hidden w-full h-full object-cover">
          <source src="/images/entry-view.webm" type="video/webm" />
          <source src="/images/entry-view.mp4"  type="video/mp4" />
        </video>
        {/* Desktop: dronview */}
        <video autoPlay loop muted playsInline className="hidden md:block w-full h-full object-cover">
          <source src="/images/dronview.webm" type="video/webm" />
          <source src="/images/dronview.mp4"  type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl">
        <span className="font-[family-name:var(--font-dm-sans)] text-[12px] font-bold tracking-[0.3em] uppercase text-white/90 mb-4 block">
          The Place to Bee!
        </span>
        <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(48px,8vw,80px)] font-bold leading-tight tracking-tight text-white mb-8">
          Bee House
          <br />
          <span className="text-primary-fixed-dim">Casablanca</span>
        </h1>
        <p className="font-[family-name:var(--font-dm-sans)] text-lg text-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
          Votre foyer gourmand à Ain Chock — café artisanal, restaurant, glacier & freak shakes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#morning"
            className="inline-flex items-center gap-2 bg-primary text-on-primary font-[family-name:var(--font-dm-sans)] text-xs font-bold tracking-[0.1em] uppercase px-8 py-4 rounded-lg hover:bg-honey-drip transition-all"
          >
            Découvrir le Menu
            <span className="material-symbols-outlined text-sm">arrow_downward</span>
          </a>
          <a
            href="#info"
            className="inline-flex items-center gap-2 border border-white/40 text-white font-[family-name:var(--font-dm-sans)] text-xs font-bold tracking-[0.1em] uppercase px-8 py-4 rounded-lg hover:bg-white/10 transition-all"
          >
            Réserver une Table
            <span className="material-symbols-outlined text-sm">calendar_month</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60">
        <span className="font-[family-name:var(--font-dm-sans)] text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <span className="material-symbols-outlined text-xl animate-bounce">expand_more</span>
      </div>
    </header>
  );
}
