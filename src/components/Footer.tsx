export function Footer() {
  return (
    <footer className="w-full py-[120px] bg-surface-linen dark:bg-surface-walnut border-t border-outline-variant/30 dark:border-outline/20 transition-colors duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 max-w-[1280px] mx-auto text-center md:text-left">
        {/* Brand */}
        <div className="space-y-6">
          <h2 className="font-[family-name:var(--font-playfair)] text-[56px] font-bold text-primary dark:text-night-accent leading-none">
            Bee House
          </h2>
          <p className="font-[family-name:var(--font-dm-sans)] text-on-surface-variant dark:text-surface-variant/70 italic">
            &ldquo;The place to Bee!&rdquo; — Votre foyer gourmand à Ain Chock.
          </p>
          {/* Hex motif decoration */}
          <div className="flex gap-2 justify-center md:justify-start">
            {["🍯", "☕", "🧁"].map((emoji) => (
              <span key={emoji} className="text-2xl">
                {emoji}
              </span>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-4">
          <h4 className="font-[family-name:var(--font-dm-sans)] text-[12px] font-bold tracking-[0.1em] uppercase text-primary dark:text-night-accent mb-2">
            Explore
          </h4>
          {[
            { href: "#morning", label: "Menu" },
            { href: "#terrace", label: "Gallery" },
            { href: "#info", label: "Reservations" },
            { href: "#info", label: "Ain Chock Location" },
            { href: "#", label: "Privacy Policy" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-[family-name:var(--font-dm-sans)] text-on-surface-variant dark:text-surface-variant/70 hover:text-primary dark:hover:text-night-accent underline decoration-primary/30 transition-all"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Social */}
        <div className="space-y-6">
          <h4 className="font-[family-name:var(--font-dm-sans)] text-[12px] font-bold tracking-[0.1em] uppercase text-primary dark:text-night-accent mb-2">
            Connect
          </h4>
          <div className="flex justify-center md:justify-start gap-4">
            <a
              href="#"
              className="w-12 h-12 rounded-full border border-primary/20 dark:border-night-accent/20 flex items-center justify-center hover:bg-primary dark:hover:bg-night-accent hover:text-white dark:hover:text-night-bg transition-all text-on-surface-variant dark:text-surface-variant"
              aria-label="Facebook"
            >
              <span className="material-symbols-outlined">social_leaderboard</span>
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full border border-primary/20 dark:border-night-accent/20 flex items-center justify-center hover:bg-primary dark:hover:bg-night-accent hover:text-white dark:hover:text-night-bg transition-all text-on-surface-variant dark:text-surface-variant"
              aria-label="Instagram"
            >
              <span className="material-symbols-outlined">photo_camera</span>
            </a>
          </div>
          <p className="font-[family-name:var(--font-dm-sans)] text-on-surface-variant dark:text-surface-variant/60 text-sm mt-4">
            © 2025 Bee House Casablanca.
            <br />
            Artisanal Neighborhood Hearth.
          </p>
        </div>
      </div>
    </footer>
  );
}
