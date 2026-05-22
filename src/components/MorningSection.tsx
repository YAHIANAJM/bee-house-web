import { RevealSection } from "./RevealSection";

export function MorningSection() {
  return (
    <section
      id="morning"
      className="py-[120px] bg-day-bg dark:bg-night-bg px-6 overflow-hidden transition-colors duration-700"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text */}
          <RevealSection>
            <span className="text-primary dark:text-night-accent font-[family-name:var(--font-dm-sans)] text-[12px] font-bold tracking-[0.1em] uppercase block mb-4">
              07:00 — 11:00
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(36px,5vw,48px)] font-semibold leading-tight text-day-text dark:text-white mb-6">
              Ambiance Matinale
            </h2>
            <p className="font-[family-name:var(--font-dm-sans)] text-lg text-on-surface-variant dark:text-surface-variant/80 mb-8 leading-relaxed max-w-xl">
              Le réveil d&apos;Ain Chock commence ici. Une lumière dorée inonde notre salle
              alors que l&apos;arôme du café frais s&apos;élève. C&apos;est le moment idéal pour un petit
              déjeuner intime, entre douceur et sérénité.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="border-l-2 border-primary/20 pl-6">
                <h4 className="font-[family-name:var(--font-playfair)] text-[28px] font-semibold text-primary dark:text-night-accent leading-tight">
                  Petit Déjeuner
                </h4>
                <p className="text-on-surface-variant dark:text-surface-variant/60 mt-1 font-[family-name:var(--font-dm-sans)]">
                  Classique & Réconfortant
                </p>
              </div>
              <div className="border-l-2 border-primary/20 pl-6">
                <h4 className="font-[family-name:var(--font-playfair)] text-[28px] font-semibold text-primary dark:text-night-accent leading-tight">
                  Café Crème
                </h4>
                <p className="text-on-surface-variant dark:text-surface-variant/60 mt-1 font-[family-name:var(--font-dm-sans)]">
                  Signature Artisanal
                </p>
              </div>
            </div>
          </RevealSection>

          {/* Image */}
          <RevealSection delay={200} className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/morning.jpg"
                alt="Petit déjeuner at Bee House Casablanca"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating quote card */}
            <div className="absolute -bottom-8 -left-8 bg-surface-linen p-8 rounded-xl shadow-lg hidden md:block max-w-xs">
              <p className="italic font-[family-name:var(--font-playfair)] text-[28px] text-primary">
                &ldquo;Superbe&rdquo;
              </p>
              <p className="text-on-surface-variant mt-2 font-[family-name:var(--font-dm-sans)] text-sm">
                Le calme avant l&apos;effervescence de la journée.
              </p>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
