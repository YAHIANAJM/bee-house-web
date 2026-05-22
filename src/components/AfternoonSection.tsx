import { RevealSection } from "./RevealSection";

export function AfternoonSection() {
  return (
    <section
      id="afternoon"
      className="py-[120px] bg-surface-container-low dark:bg-surface-walnut px-6 transition-colors duration-700"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-tertiary dark:text-night-accent font-[family-name:var(--font-dm-sans)] text-[12px] font-bold tracking-[0.1em] uppercase block mb-4">
            12:00 — 17:00
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(36px,5vw,48px)] font-semibold leading-tight text-day-text dark:text-white">
            L&apos;Énergie du Midi
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Salade Bee House — big card */}
          <RevealSection className="md:col-span-2">
            <div className="bg-surface-container-lowest dark:bg-night-bg rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                <div className="p-10 flex flex-col justify-center">
                  <span className="bg-tertiary-container/20 text-on-tertiary-container dark:text-night-accent px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit mb-6">
                    Signature
                  </span>
                  <h3 className="font-[family-name:var(--font-playfair)] text-[32px] font-semibold text-on-surface dark:text-white mb-4 leading-tight">
                    Salade Bee House
                  </h3>
                  <p className="font-[family-name:var(--font-dm-sans)] text-on-surface-variant dark:text-surface-variant/70 mb-6">
                    Un mélange frais et croquant, devenu la légende de notre carte pour le déjeuner.
                  </p>
                  <div className="font-[family-name:var(--font-dm-sans)] text-[20px] font-bold text-primary dark:text-night-accent">
                    78 DH
                  </div>
                </div>
                <div className="relative overflow-hidden min-h-[280px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/salade.jpg"
                    alt="Salade Bee House"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 absolute inset-0"
                  />
                </div>
              </div>
            </div>
          </RevealSection>

          {/* Crêpes & Gaufres card */}
          <RevealSection delay={200}>
            <div className="bg-surface-linen dark:bg-night-bg rounded-3xl overflow-hidden flex flex-col h-full shadow-sm hover:shadow-xl transition-all duration-500 group">
              <div className="h-64 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/crepes.png"
                  alt="Crêpes Bee House"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-[28px] font-semibold text-on-surface dark:text-white mb-2">
                    Crêpes & Gaufres
                  </h3>
                  <p className="font-[family-name:var(--font-dm-sans)] text-on-surface-variant dark:text-surface-variant/70 mb-4">
                    La douceur préférée des familles casablancaises.
                  </p>
                </div>
                <div className="font-[family-name:var(--font-dm-sans)] text-[20px] font-bold text-secondary dark:text-night-accent">
                  À partir de 50 DH
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
