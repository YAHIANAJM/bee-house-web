export function Footer() {
  return (
    <footer className="w-full bg-surface-walnut dark:bg-[#0A0500] relative overflow-hidden transition-colors duration-700">
      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-honey-drip/6 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/8 blur-[160px] rounded-full pointer-events-none" />

      {/* Top divider with brand */}
      <div className="relative z-10 flex items-center gap-6 px-6 pt-16 max-w-[1280px] mx-auto">
        <div className="h-px flex-1 bg-white/10" />
        <span className="font-[family-name:var(--font-playfair)] text-night-accent text-sm tracking-[0.2em] uppercase opacity-60">
          The Place to Bee
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Main grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-10 px-6 py-16 max-w-[1280px] mx-auto">
        {/* Brand */}
        <div className="md:col-span-2 space-y-5">
          <h2 className="font-[family-name:var(--font-playfair)] text-[52px] font-bold text-night-accent leading-none">
            Bee House
          </h2>
          <p className="font-[family-name:var(--font-dm-sans)] text-white/50 italic max-w-xs leading-relaxed">
            &ldquo;The place to Bee!&rdquo; — Votre foyer gourmand à Ain Chock, Casablanca.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="font-[family-name:var(--font-dm-sans)] text-white/50 text-xs tracking-widest uppercase">
              Ouvert · 07:00 – 23:30
            </span>
          </div>
          {/* Social */}
          <div className="flex gap-3 pt-2">
            {[
              { icon: "photo_camera", label: "Instagram" },
              { icon: "social_leaderboard", label: "Facebook" },
            ].map(({ icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-night-accent hover:border-night-accent/40 hover:bg-white/5 transition-all"
              >
                <span className="material-symbols-outlined text-lg">{icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-3">
          <h4 className="font-[family-name:var(--font-dm-sans)] text-[11px] font-bold tracking-[0.15em] uppercase text-night-accent mb-3">
            Explorer
          </h4>
          {[
            { href: "#morning",    label: "Café du Matin" },
            { href: "#afternoon",  label: "Déjeuner" },
            { href: "#evening",    label: "Glacier & Soirée" },
            { href: "#terrace",    label: "Nos Espaces" },
            { href: "/menu",       label: "Toute la Carte" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-[family-name:var(--font-dm-sans)] text-sm text-white/40 hover:text-night-accent transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <h4 className="font-[family-name:var(--font-dm-sans)] text-[11px] font-bold tracking-[0.15em] uppercase text-night-accent mb-3">
            Contact
          </h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-night-accent/50 text-base mt-0.5">location_on</span>
              <p className="font-[family-name:var(--font-dm-sans)] text-sm text-white/40 leading-relaxed">
                692 Bd El Qods<br />Ain Chock, Casablanca
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-night-accent/50 text-base">call</span>
              <a
                href="tel:+212522870808"
                className="font-[family-name:var(--font-dm-sans)] text-sm text-white/40 hover:text-night-accent transition-colors"
              >
                +212 522 870808
              </a>
            </div>
          </div>
          <a
            href="#info"
            className="inline-flex items-center gap-2 mt-4 bg-night-accent/10 border border-night-accent/20 text-night-accent font-[family-name:var(--font-dm-sans)] text-[11px] font-bold tracking-[0.1em] uppercase px-5 py-2.5 rounded-full hover:bg-night-accent hover:text-night-bg transition-all w-fit"
          >
            <span className="material-symbols-outlined text-sm">calendar_month</span>
            Réserver
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/8 px-6 py-6 max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-[family-name:var(--font-dm-sans)] text-white/30 text-xs">
          © 2025 Bee House Casablanca · Artisanal Neighborhood Hearth
        </p>
        <a
          href="#"
          className="font-[family-name:var(--font-dm-sans)] text-white/30 text-xs hover:text-white/50 transition-colors"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}
