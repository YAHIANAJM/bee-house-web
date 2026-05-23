import { RevealSection } from "./RevealSection";

export function MorningSection() {
  return (
    <section
      id="morning"
      className="py-[120px] bg-day-bg dark:bg-night-bg px-6 overflow-hidden transition-colors duration-700 relative"
    >
      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-honey-drip/5 dark:bg-honey-drip/8 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/4 dark:bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <RevealSection>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-primary dark:bg-night-accent" />
              <span className="text-primary dark:text-night-accent font-[family-name:var(--font-dm-sans)] text-[11px] font-bold tracking-[0.2em] uppercase">
                07:00 — 11:00
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(38px,5vw,56px)] font-semibold leading-tight text-day-text dark:text-white mb-6">
              Ambiance<br />
              <span className="text-primary dark:text-night-accent">Matinale</span>
            </h2>
            <p className="font-[family-name:var(--font-dm-sans)] text-lg text-on-surface-variant dark:text-white/60 mb-8 leading-relaxed max-w-xl">
              Le réveil d&apos;Ain Chock commence ici. Une lumière dorée inonde notre salle
              alors que l&apos;arôme du café frais s&apos;élève. C&apos;est le moment idéal pour un petit
              déjeuner intime, entre douceur et sérénité.
            </p>

            {/* Feature tags */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { label: "Café Artisanal",  green: false },
                { label: "Petit Déjeuner",  green: false },
                { label: "Viennoiseries",   green: true  },
                { label: "Jus Frais",       green: true  },
              ].map((tag) => (
                <span
                  key={tag.label}
                  className={
                    tag.green
                      ? "bg-tertiary/8 dark:bg-tertiary-fixed/10 border border-tertiary/20 dark:border-tertiary-fixed/20 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.08em] uppercase text-tertiary dark:text-tertiary-fixed"
                      : "bg-surface-linen dark:bg-surface-walnut border border-primary/15 dark:border-white/10 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.08em] uppercase text-primary dark:text-night-accent"
                  }
                >
                  {tag.label}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Petit Déjeuner", sub: "Classique & Réconfortant" },
                { title: "Café Crème", sub: "Signature Artisanal" },
              ].map((card) => (
                <div
                  key={card.title}
                  className="bg-surface-linen dark:bg-surface-walnut rounded-2xl p-6 border border-primary/10 dark:border-white/5 hover:border-primary/30 dark:hover:border-night-accent/30 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                >
                  <h4 className="font-[family-name:var(--font-playfair)] text-[22px] font-semibold text-primary dark:text-night-accent leading-tight">
                    {card.title}
                  </h4>
                  <p className="text-on-surface-variant dark:text-white/50 mt-1 font-[family-name:var(--font-dm-sans)] text-sm">
                    {card.sub}
                  </p>
                </div>
              ))}
            </div>
          </RevealSection>

          {/* Image */}
          <RevealSection delay={200} className="relative">
            <div className="relative group">
              <div className="absolute inset-0 bg-honey-drip rounded-3xl blur-2xl opacity-10 dark:opacity-20 group-hover:opacity-20 dark:group-hover:opacity-35 transition-opacity duration-500 scale-95" />
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-primary/10 dark:border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/morning.jpg"
                  alt="Petit déjeuner at Bee House Casablanca"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-on-primary px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.1em] uppercase">
                    Chaque Matin
                  </span>
                </div>
              </div>
            </div>
            {/* Floating quote card */}
            <div className="absolute -bottom-6 -left-6 bg-surface-container-lowest dark:bg-surface-walnut p-6 rounded-2xl shadow-2xl hidden md:block max-w-[240px] border border-outline-variant/20 dark:border-white/10">
              <span className="material-symbols-outlined text-honey-drip text-2xl mb-2 block">format_quote</span>
              <p className="italic font-[family-name:var(--font-playfair)] text-[20px] text-primary dark:text-night-accent leading-tight">
                &ldquo;Superbe&rdquo;
              </p>
              <p className="text-on-surface-variant dark:text-white/50 mt-2 font-[family-name:var(--font-dm-sans)] text-xs">
                Le calme avant l&apos;effervescence de la journée.
              </p>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
