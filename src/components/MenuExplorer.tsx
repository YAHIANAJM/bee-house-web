import { RevealSection } from "./RevealSection";

const categories = [
  {
    label: "Petit Déjeuner",
    href: "/menu#petit-dejeuner",
    img: "/images/petit-dejeuner-table.webp",
    alt: "Petit déjeuner Bee House",
    time: "07:00 — 11:00",
  },
  {
    label: "Salades & Entrées",
    href: "/menu#salades",
    img: "/images/salade-composee-poster.webp",
    alt: "Entrées Bee House",
    time: "12:00 — 23:00",
  },
  {
    label: "Sandwichs & Plats",
    href: "/menu#plats",
    img: "/images/burgers-poster.webp",
    alt: "Burger et sandwich Bee House",
    time: "12:00 — 23:00",
  },
  {
    label: "Crêpes & Gaufres",
    href: "/menu#crepes",
    img: "/images/gaufres-poster.webp",
    alt: "Gaufres Bee House au chocolat",
    time: "12:00 — 23:00",
  },
  {
    label: "Glacier & Freak Shakes",
    href: "/menu#glacier",
    img: "/images/freakshake-royal-poster.webp",
    alt: "Freak Shake Royal Bee House",
    time: "12:00 — 23:30",
  },
  {
    label: "Jus & Boissons",
    href: "/menu#boissons",
    img: "/images/jus-multicolores.webp",
    alt: "Jus frais Bee House Casablanca",
    time: "07:00 — 23:30",
  },
];

export function MenuExplorer() {
  return (
    <section
      id="explore-flavors"
      className="py-[120px] bg-surface-linen/50 dark:bg-surface-walnut px-6 transition-colors duration-700 relative overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-honey-drip/5 dark:bg-honey-drip/8 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-tertiary/6 dark:bg-tertiary/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Header */}
        <RevealSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-primary/30 dark:bg-night-accent/30" />
            <span className="text-primary dark:text-night-accent font-[family-name:var(--font-dm-sans)] text-[11px] font-bold tracking-[0.2em] uppercase">
              Découvrez Nos Saveurs
            </span>
            <div className="h-px w-12 bg-primary/30 dark:bg-night-accent/30" />
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(36px,5vw,52px)] font-semibold leading-tight text-day-text dark:text-white mb-4">
            Explorez Notre Carte
          </h2>
          <p className="font-[family-name:var(--font-dm-sans)] text-on-surface-variant dark:text-white/60 max-w-md mx-auto">
            Six univers de saveurs, une seule adresse.
          </p>
        </RevealSection>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <RevealSection key={cat.label} delay={i * 80}>
              <a
                href={cat.href}
                className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 block hover:-translate-y-1"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.img}
                    alt={cat.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-7">
                  <span className="text-white/60 font-[family-name:var(--font-dm-sans)] text-[10px] font-bold tracking-[0.12em] uppercase mb-2">
                    {cat.time}
                  </span>
                  <h3 className="font-[family-name:var(--font-playfair)] text-[26px] font-semibold text-white mb-3 leading-tight">
                    {cat.label}
                  </h3>
                  <span className="text-white/70 group-hover:text-white flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-[11px] font-bold tracking-[0.12em] uppercase transition-all group-hover:gap-3">
                    Voir le menu
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </a>
            </RevealSection>
          ))}
        </div>

        {/* CTA */}
        <RevealSection delay={500} className="text-center mt-14">
          <a
            href="/menu"
            className="inline-flex items-center gap-3 bg-primary dark:bg-night-accent text-on-primary dark:text-night-bg font-[family-name:var(--font-dm-sans)] text-xs font-bold tracking-[0.12em] uppercase px-10 py-4 rounded-full hover:opacity-90 transition-all shadow-lg shadow-primary/15 dark:shadow-night-accent/15 hover:shadow-xl hover:-translate-y-0.5"
          >
            <span className="material-symbols-outlined text-sm">restaurant_menu</span>
            Voir Toute la Carte
          </a>
        </RevealSection>
      </div>
    </section>
  );
}
