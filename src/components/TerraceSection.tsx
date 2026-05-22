import { RevealSection } from "./RevealSection";

export function TerraceSection() {
  return (
    <section
      id="terrace"
      className="py-[120px] bg-surface-container-lowest dark:bg-night-bg px-6 overflow-hidden transition-colors duration-700"
    >
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Images grid */}
        <RevealSection className="order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg transform -translate-y-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/interior.jpg"
                alt="Bee House interior — honeycomb lights"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero-bg.jpg"
                alt="Bee House Ain Chock ambiance"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </RevealSection>

        {/* Text */}
        <RevealSection delay={200} className="order-1 lg:order-2">
          <span className="text-primary dark:text-night-accent font-[family-name:var(--font-dm-sans)] text-[12px] font-bold tracking-[0.1em] uppercase block mb-4">
            Nos Espaces
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(36px,5vw,48px)] font-semibold leading-tight text-day-text dark:text-white mb-6">
            Deux Étages, Deux Âmes
          </h2>
          <p className="font-[family-name:var(--font-dm-sans)] text-lg text-on-surface-variant dark:text-surface-variant/70 mb-8 leading-relaxed">
            Notre terrasse extérieure vibre au rythme de Casablanca, tandis que notre étage
            supérieur offre un cocon de calme et de confort dès 19h00. Choisissez l&apos;espace
            qui correspond à votre humeur.
          </p>
          <ul className="space-y-4">
            {[
              "Terrasse sur le Boulevard El Qods",
              "Salon Privé à l'étage (Après 19h00)",
              "Espace Enfants & Familles accueilli avec bienveillance",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-4 text-on-surface-variant dark:text-surface-variant/70 font-[family-name:var(--font-dm-sans)]"
              >
                <span className="w-2 h-2 rounded-full bg-primary dark:bg-night-accent flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </RevealSection>
      </div>
    </section>
  );
}
