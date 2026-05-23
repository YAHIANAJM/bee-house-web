import { RevealSection } from "./RevealSection";

export function AfternoonSection() {
  return (
    <section
      id="afternoon"
      className="py-[120px] bg-surface-container-low dark:bg-surface-walnut px-6 transition-colors duration-700 relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 dark:bg-primary/8 blur-[220px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Header */}
        <RevealSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-primary/30 dark:bg-night-accent/30" />
            <span className="text-tertiary dark:text-night-accent font-[family-name:var(--font-dm-sans)] text-[11px] font-bold tracking-[0.2em] uppercase">
              12:00 — 17:00
            </span>
            <div className="h-px w-12 bg-primary/30 dark:bg-night-accent/30" />
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(36px,5vw,52px)] font-semibold leading-tight text-day-text dark:text-white">
            L&apos;Énergie du Midi
          </h2>
        </RevealSection>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Salade Bee House — big card */}
          <RevealSection className="md:col-span-2">
            <div className="bg-surface-container-lowest dark:bg-night-bg rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group h-full border border-outline-variant/20 dark:border-white/5 hover:border-primary/25 dark:hover:border-night-accent/25 hover:-translate-y-1">
              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                <div className="p-10 flex flex-col justify-center">
                  <div className="mb-6">
                    <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      Signature
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-[32px] font-semibold text-on-surface dark:text-white mb-4 leading-tight">
                    Salade Bee House
                  </h3>
                  <p className="font-[family-name:var(--font-dm-sans)] text-on-surface-variant dark:text-white/60 mb-6 leading-relaxed">
                    Un mélange frais et croquant, devenu la légende de notre carte pour le déjeuner.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="font-[family-name:var(--font-dm-sans)] text-[22px] font-bold text-primary dark:text-night-accent">
                      78 DH
                    </div>
                    <a
                      href="/menu#salades"
                      className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.08em] uppercase text-primary/60 dark:text-night-accent/60 hover:text-primary dark:hover:text-night-accent transition-colors"
                    >
                      Voir le menu
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </a>
                  </div>
                </div>
                <div className="relative overflow-hidden min-h-[280px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/salade.jpg"
                    alt="Salade Bee House"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-surface-container-lowest/10 dark:to-night-bg/10" />
                </div>
              </div>
            </div>
          </RevealSection>

          {/* Crêpes & Gaufres card */}
          <RevealSection delay={200}>
            <div className="bg-surface-linen dark:bg-night-bg rounded-3xl overflow-hidden flex flex-col h-full shadow-sm hover:shadow-2xl transition-all duration-500 group border border-outline-variant/20 dark:border-white/5 hover:border-primary/25 dark:hover:border-night-accent/25 hover:-translate-y-1">
              <div className="h-64 overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/crepes.png"
                  alt="Crêpes Bee House"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-3 left-3 bg-secondary text-on-secondary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Gourmand
                </span>
              </div>
              <div className="p-8 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-[26px] font-semibold text-on-surface dark:text-white mb-2">
                    Crêpes & Gaufres
                  </h3>
                  <p className="font-[family-name:var(--font-dm-sans)] text-on-surface-variant dark:text-white/60 mb-4 leading-relaxed text-sm">
                    La douceur préférée des familles casablancaises.
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-[family-name:var(--font-dm-sans)] text-[20px] font-bold text-secondary dark:text-night-accent">
                    À partir de 50 DH
                  </div>
                  <a
                    href="/menu#crepes"
                    className="w-9 h-9 rounded-full border border-primary/20 dark:border-night-accent/20 flex items-center justify-center hover:bg-primary dark:hover:bg-night-accent hover:text-white dark:hover:text-night-bg transition-all text-primary dark:text-night-accent"
                  >
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
