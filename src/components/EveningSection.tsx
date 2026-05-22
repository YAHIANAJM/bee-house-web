import { RevealSection } from "./RevealSection";

const eveningItems = [
  {
    icon: "icecream",
    name: "Freak Shake Nutella",
    desc: "L'icône de nos soirées, gourmandise absolue.",
    price: "55 DH",
  },
  {
    icon: "cake",
    name: "San Sebastian",
    desc: "Basque Cheesecake onctueux et fondant.",
    price: "45 DH",
  },
  {
    icon: "restaurant",
    name: "Roulé de Poisson",
    desc: "Une signature culinaire pour vos dîners.",
    price: "125 DH",
  },
  {
    icon: "local_cafe",
    name: "Café Mocha",
    desc: "L'équilibre parfait entre grain et cacao.",
    price: "Signature",
  },
];

export function EveningSection() {
  return (
    <section
      id="evening"
      className="py-[120px] bg-surface-container-low dark:bg-night-bg px-6 relative overflow-hidden transition-colors duration-700"
    >
      {/* Ambient glows — subtle in light, vivid in dark */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 dark:bg-honey-drip/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 dark:bg-secondary/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Top: text + hero image */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-24">
          <RevealSection className="md:w-1/2">
            <span className="text-primary dark:text-night-accent font-[family-name:var(--font-dm-sans)] text-[12px] font-bold tracking-[0.1em] uppercase block mb-4">
              18:00 — 23:30
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(36px,5vw,48px)] font-semibold leading-tight text-day-text dark:text-white mb-6">
              L&apos;Expérience Raffinée
            </h2>
            <p className="font-[family-name:var(--font-dm-sans)] text-lg text-on-surface-variant dark:text-white/70 mb-8 leading-relaxed">
              À la tombée de la nuit, Bee House se métamorphose. Les lumières se tamisent,
              l&apos;étage supérieur s&apos;ouvre, et l&apos;atmosphère devient feutrée. C&apos;est l&apos;heure
              des Freak Shakes monumentaux et des moments partagés sous une lumière ambrée.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="bg-surface-linen dark:bg-surface-walnut border border-primary/20 dark:border-outline/30 px-6 py-2 rounded-full text-[12px] font-bold tracking-[0.1em] uppercase text-primary dark:text-night-accent">
                GLACIER D&apos;EXCEPTION
              </span>
              <span className="bg-surface-linen dark:bg-surface-walnut border border-primary/20 dark:border-outline/30 px-6 py-2 rounded-full text-[12px] font-bold tracking-[0.1em] uppercase text-primary dark:text-night-accent">
                FREAK SHAKES
              </span>
            </div>
          </RevealSection>

          <RevealSection delay={200} className="md:w-1/2">
            <div className="relative group">
              <div className="absolute inset-0 bg-honey-drip rounded-3xl blur-xl opacity-10 dark:opacity-20 group-hover:opacity-25 dark:group-hover:opacity-40 transition-opacity" />
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-primary/10 dark:border-white/10 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/freakshake.webp"
                  alt="Freak Shake Royal — Bee House"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </RevealSection>
        </div>

        {/* Evening menu cards */}
        <RevealSection delay={400}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eveningItems.map((item) => (
              <div
                key={item.name}
                className="bg-white dark:bg-surface-walnut p-8 rounded-2xl border border-outline-variant/40 dark:border-white/5 hover:border-primary/30 dark:hover:border-night-accent/30 hover:shadow-md transition-all group"
              >
                <span className="material-symbols-outlined text-primary dark:text-night-accent mb-4 text-4xl block group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <h4 className="font-[family-name:var(--font-playfair)] text-[24px] font-semibold text-day-text dark:text-white mb-2">
                  {item.name}
                </h4>
                <p className="font-[family-name:var(--font-dm-sans)] text-on-surface-variant dark:text-white/60 text-sm mb-4">
                  {item.desc}
                </p>
                <div className="font-[family-name:var(--font-dm-sans)] text-[20px] font-bold text-primary dark:text-night-accent">
                  {item.price}
                </div>
              </div>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
