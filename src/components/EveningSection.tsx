import { RevealSection } from "./RevealSection";

const eveningItems = [
  {
    icon: "icecream",
    name: "Freak Shake Nutella",
    desc: "L'icône de nos soirées, gourmandise absolue.",
    price: "55 DH",
    badge: "Signature",
  },
  {
    icon: "cake",
    name: "San Sebastian",
    desc: "Basque Cheesecake onctueux et fondant.",
    price: "45 DH",
    badge: null,
  },
  {
    icon: "restaurant",
    name: "Roulé de Poisson",
    desc: "Une signature culinaire pour vos dîners.",
    price: "125 DH",
    badge: "Premium",
  },
  {
    icon: "local_cafe",
    name: "Café Mocha",
    desc: "L'équilibre parfait entre grain et cacao.",
    price: "Signature",
    badge: null,
  },
];

export function EveningSection() {
  return (
    <section
      id="evening"
      className="py-[120px] bg-surface-container-low dark:bg-night-bg px-6 relative overflow-hidden transition-colors duration-700"
    >
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 dark:bg-honey-drip/12 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/4 dark:bg-secondary/12 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Top: text + hero image */}
        <div className="flex flex-col md:flex-row items-center gap-16 mb-20">
          <RevealSection className="md:w-1/2">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-primary dark:bg-night-accent" />
              <span className="text-primary dark:text-night-accent font-[family-name:var(--font-dm-sans)] text-[11px] font-bold tracking-[0.2em] uppercase">
                18:00 — 23:30
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(36px,5vw,56px)] font-semibold leading-tight text-day-text dark:text-white mb-6">
              L&apos;Expérience<br />
              <span className="text-primary dark:text-night-accent">Raffinée</span>
            </h2>
            <p className="font-[family-name:var(--font-dm-sans)] text-lg text-on-surface-variant dark:text-white/60 mb-8 leading-relaxed">
              À la tombée de la nuit, Bee House se métamorphose. Les lumières se tamisent,
              l&apos;étage supérieur s&apos;ouvre, et l&apos;atmosphère devient feutrée. C&apos;est l&apos;heure
              des Freak Shakes monumentaux et des moments partagés sous une lumière ambrée.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Glacier d'Exception", "Freak Shakes", "Desserts Maison"].map((tag) => (
                <span
                  key={tag}
                  className="bg-surface-linen dark:bg-surface-walnut border border-primary/15 dark:border-white/10 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.08em] uppercase text-primary dark:text-night-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          </RevealSection>

          <RevealSection delay={200} className="md:w-1/2">
            <div className="relative group">
              <div className="absolute inset-0 bg-honey-drip rounded-3xl blur-2xl opacity-10 dark:opacity-25 group-hover:opacity-20 dark:group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-primary/10 dark:border-white/10 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/freakshake.webp"
                  alt="Freak Shake Royal — Bee House"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-honey-drip text-white px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.1em] uppercase">
                    Royal Signature
                  </span>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>

        {/* Section header for cards */}
        <RevealSection delay={300}>
          <div className="flex items-center gap-4 mb-8">
            <h3 className="font-[family-name:var(--font-playfair)] text-[22px] font-semibold text-day-text dark:text-white whitespace-nowrap">
              Ce Soir à la Carte
            </h3>
            <div className="h-px flex-1 bg-outline-variant/30 dark:bg-white/10" />
            <a
              href="/menu#glacier"
              className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.08em] uppercase text-primary/60 dark:text-night-accent/60 hover:text-primary dark:hover:text-night-accent transition-colors whitespace-nowrap shrink-0"
            >
              Tout voir
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>

          {/* Evening menu cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {eveningItems.map((item) => (
              <div
                key={item.name}
                className="bg-white dark:bg-surface-walnut p-7 rounded-2xl border border-outline-variant/30 dark:border-white/5 hover:border-primary/30 dark:hover:border-night-accent/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
              >
                {item.badge && (
                  <span className="absolute top-4 right-4 bg-primary/10 dark:bg-night-accent/15 text-primary dark:text-night-accent px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase">
                    {item.badge}
                  </span>
                )}
                <span className="material-symbols-outlined text-primary dark:text-night-accent mb-4 text-4xl block group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <h4 className="font-[family-name:var(--font-playfair)] text-[22px] font-semibold text-day-text dark:text-white mb-2 leading-tight">
                  {item.name}
                </h4>
                <p className="font-[family-name:var(--font-dm-sans)] text-on-surface-variant dark:text-white/50 text-sm mb-5 leading-relaxed">
                  {item.desc}
                </p>
                <div className="font-[family-name:var(--font-dm-sans)] text-[19px] font-bold text-primary dark:text-night-accent">
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
