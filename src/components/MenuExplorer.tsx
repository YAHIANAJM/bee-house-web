import { RevealSection } from "./RevealSection";

const categories = [
  {
    label: "Petit Déjeuner",
    href: "/menu#petit-dejeuner",
    img: "/images/petit-dejeuner-table.webp",
    alt: "Petit déjeuner Bee House",
  },
  {
    label: "Salades & Entrées",
    href: "/menu#salades",
    img: "/images/salade-composee-poster.webp",
    alt: "Entrées Bee House",
  },
  {
    label: "Sandwichs & Plats",
    href: "/menu#plats",
    img: "/images/burgers-poster.webp",
    alt: "Burger et sandwich Bee House",
  },
  {
    label: "Crêpes & Gaufres",
    href: "/menu#crepes",
    img: "/images/gaufres-poster.webp",
    alt: "Gaufres Bee House au chocolat",
  },
  {
    label: "Glacier & Freak Shakes",
    href: "/menu#glacier",
    img: "/images/freakshake-royal-poster.webp",
    alt: "Freak Shake Royal Bee House",
  },
  {
    label: "Jus & Boissons",
    href: "/menu#boissons",
    img: "/images/jus-multicolores.webp",
    alt: "Jus frais Bee House Casablanca",
  },
];

export function MenuExplorer() {
  return (
    <section
      id="explore-flavors"
      className="py-[120px] bg-surface-linen/50 dark:bg-surface-walnut px-6 transition-colors duration-700"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <RevealSection className="text-center mb-16">
          <span className="text-primary dark:text-night-accent font-[family-name:var(--font-dm-sans)] text-[12px] font-bold tracking-[0.1em] uppercase block mb-4">
            Découvrez Nos Saveurs
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(36px,5vw,48px)] font-semibold leading-tight text-day-text dark:text-white mb-4">
            Explorez Notre Carte
          </h2>
          <div className="h-1 w-20 bg-primary dark:bg-night-accent mx-auto rounded-full" />
        </RevealSection>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <RevealSection key={cat.label} delay={i * 80}>
              <a
                href={cat.href}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-night-bg shadow-sm hover:shadow-xl transition-all duration-500 block"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.img}
                    alt={cat.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                  <h3 className="font-[family-name:var(--font-playfair)] text-[28px] font-semibold text-white mb-2 leading-tight">
                    {cat.label}
                  </h3>
                  <span className="text-white/80 hover:text-white flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-[12px] font-bold tracking-[0.1em] uppercase transition-colors">
                    See More{" "}
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </a>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
