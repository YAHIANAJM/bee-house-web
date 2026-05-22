import { RevealSection } from "./RevealSection";

export function InfoSection() {
  return (
    <section
      id="info"
      className="py-[120px] bg-surface-linen dark:bg-surface-walnut px-6 transition-colors duration-700"
    >
      <div className="max-w-[1280px] mx-auto">
        <RevealSection>
          <div className="bg-surface-container-lowest dark:bg-night-bg rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            {/* Contact info */}
            <div className="md:w-1/2 p-12">
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(36px,4vw,48px)] font-semibold text-day-text dark:text-white mb-8 leading-tight">
                Nous Trouver
              </h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <span className="material-symbols-outlined text-primary dark:text-night-accent text-3xl flex-shrink-0">
                    location_on
                  </span>
                  <div>
                    <h4 className="font-[family-name:var(--font-dm-sans)] font-bold text-lg mb-1 text-on-surface dark:text-white">
                      Adresse
                    </h4>
                    <p className="text-on-surface-variant dark:text-surface-variant/70 font-[family-name:var(--font-dm-sans)]">
                      692 Bd El Qods, Résidence Al Ahfad,
                      <br />
                      Ain Chock, Casablanca
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <span className="material-symbols-outlined text-primary dark:text-night-accent text-3xl flex-shrink-0">
                    schedule
                  </span>
                  <div>
                    <h4 className="font-[family-name:var(--font-dm-sans)] font-bold text-lg mb-1 text-on-surface dark:text-white">
                      Horaires
                    </h4>
                    <p className="text-on-surface-variant dark:text-surface-variant/70 font-[family-name:var(--font-dm-sans)]">
                      Ouvert tous les jours
                      <br />
                      07:00 – 23:30
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <span className="material-symbols-outlined text-primary dark:text-night-accent text-3xl flex-shrink-0">
                    call
                  </span>
                  <div>
                    <h4 className="font-[family-name:var(--font-dm-sans)] font-bold text-lg mb-1 text-on-surface dark:text-white">
                      Téléphone
                    </h4>
                    <p className="text-on-surface-variant dark:text-surface-variant/70 font-[family-name:var(--font-dm-sans)] text-[20px] font-bold">
                      +212 522 870808
                    </p>
                  </div>
                </div>

                {/* Reservation CTA */}
                <a
                  href="tel:+212522870808"
                  className="inline-flex items-center gap-2 bg-primary text-on-primary font-[family-name:var(--font-dm-sans)] text-xs font-bold tracking-[0.1em] uppercase px-8 py-4 rounded-lg hover:bg-honey-drip transition-all mt-4"
                >
                  <span className="material-symbols-outlined text-sm">calendar_month</span>
                  Réserver Maintenant
                </a>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="md:w-1/2 h-[400px] md:h-auto min-h-[400px] relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuvF_a07TUm22slU4ouajqsc-bt5VsbZm28TeGkeMAqZsWextbPW_232Gs3F0xbhvdM1i_J2hIRZjpMWyqmcFKgDbxwqimnVfDfYTtZx7p7xoZdZN-RMjw2IeGPSuKVZjSQClSbLVjm-YOL4Ay_AuiH0aBzQal5GhNvZyQEalnkJB0mjyzuZEaifdmlWftgZ4f1eNjI2hAD0LUzME6DRsvS5KiQPT_A7UqjQRY0_aJh9yYgh6Ggz65cXKyUnoVZ-aAIoRDbzN2ZAo"
                alt="Map Location of Bee House Ain Chock"
                className="w-full h-full object-cover grayscale opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white dark:bg-night-bg px-6 py-3 rounded-full shadow-lg font-[family-name:var(--font-dm-sans)] font-bold text-primary dark:text-night-accent flex items-center gap-2">
                  <span className="material-symbols-outlined">directions</span>
                  Bee House Ain Chock
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
