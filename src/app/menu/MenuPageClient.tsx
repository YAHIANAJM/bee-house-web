"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";

/* ─── Data ─────────────────────────────────────────── */

const CATEGORIES = [
  { id: "petit-dejeuner", label: "Petit Déjeuner",       icon: "coffee",        hours: "07:00 — 11:00" },
  { id: "salades",        label: "Salades & Entrées",     icon: "eco",           hours: "12:00 — 23:00" },
  { id: "plats",          label: "Sandwichs & Plats",     icon: "restaurant",    hours: "12:00 — 23:00" },
  { id: "crepes",         label: "Crêpes & Gaufres",      icon: "bakery_dining", hours: "12:00 — 23:00" },
  { id: "glacier",        label: "Glacier & Freak Shakes",icon: "icecream",      hours: "12:00 — 23:30" },
  { id: "boissons",       label: "Jus & Boissons",        icon: "local_bar",     hours: "07:00 — 23:30" },
];

const MENU: Record<string, { name: string; desc: string; price: string; img: string; badge?: string }[]> = {
  "petit-dejeuner": [
    { name: "Café Crème Artisanal",       desc: "Notre café signature, lait mousseux et arôme intense.",          price: "25 DH",             img: "/images/cafe-creme-chantilly.webp",         badge: "Signature" },
    { name: "Café Mocha",                 desc: "L'équilibre parfait entre grain et cacao.",                       price: "Signature",          img: "/images/cafe-creme-poster.webp" },
    { name: "Café Crème 4 Verres",        desc: "Pour partager la douceur du matin en groupe.",                   price: "90 DH",             img: "/images/cafe-creme-quatre-verres.webp" },
    { name: "Mini Pancakes Stack",        desc: "Moelleux, nappés au choix chocolat ou sirop d'érable.",          price: "55 DH",             img: "/images/mini-pancakes.webp" },
    { name: "Petit Déjeuner Table",       desc: "Formule complète : pain, beurre, confiture et boisson.",         price: "65 DH",             img: "/images/petit-dejeuner-table.webp",         badge: "Formule" },
    { name: "Crêpe Toile Chocolat",       desc: "Crêpe à motif dentelle, nappée de chocolat fondant.",            price: "40 DH",             img: "/images/crepe-toile-chocolat.webp" },
  ],
  "salades": [
    { name: "Salade Bee House",           desc: "Notre signature : légèreté absolue, croquant et fraîcheur.",     price: "78 DH",             img: "/images/salade.jpg",                        badge: "Signature" },
    { name: "Salade Composée",            desc: "Carottes, maïs, tomates cerises, noix et vinaigrette maison.",   price: "72 DH",             img: "/images/salade-composee-poster.webp" },
    { name: "Salade Poulet Grillé",       desc: "Poulet tendre mariné sur lit de verdure croquante.",             price: "85 DH",             img: "/images/salade-poulet-poster.webp" },
    { name: "Salade Fruits de Mer",       desc: "Crevettes, calamars et légumes frais, vinaigrette citron.",      price: "98 DH",             img: "/images/salade-fruits-de-mer.webp" },
    { name: "Salade Crevettes Cajou",     desc: "Crevettes sautées, cajou grillé et sauce cocktail maison.",      price: "95 DH",             img: "/images/salade-crevettes-cajou.webp" },
    { name: "Salade Poulet Framboise",    desc: "Poulet grillé, framboises fraîches et vinaigrette aux agrumes.", price: "88 DH",             img: "/images/salade-poulet-framboise.webp" },
  ],
  "plats": [
    { name: "Burger Double Bee House",    desc: "Double steak haché, cheddar fondu, sauce maison et frites.",     price: "95 DH",             img: "/images/burger-double-frites.webp",         badge: "Best-seller" },
    { name: "Sandwich Poulet Champignon", desc: "Poulet fondant, champignons sautés, pain artisanal.",             price: "75 DH",             img: "/images/sandwich-poulet-champignon.webp" },
    { name: "Pastilla Poulet",            desc: "La tradition marocaine revisitée, croustillante et parfumée.",   price: "85 DH",             img: "/images/pastilla-poulet-poster.webp" },
    { name: "Tajine Agneau Pruneaux",     desc: "Mijoté lentement aux épices douces, pruneaux et amandes.",       price: "120 DH",            img: "/images/tajine-agneau-pruneaux.webp" },
    { name: "Steak Légumes Grillés",      desc: "Filet de bœuf premium, légumes de saison et sauce béarnaise.",   price: "145 DH",            img: "/images/steak-legumes-grilles.webp",        badge: "Premium" },
    { name: "T-Bone Royal",               desc: "La pièce de résistance — T-bone grillé à la perfection.",        price: "175 DH",            img: "/images/tbone-steak-poster.webp",           badge: "Premium" },
    { name: "Roulé de Poisson",           desc: "Une signature culinaire pour vos dîners, sauce vierge.",         price: "125 DH",            img: "/images/pave-saumon-poster2.webp" },
    { name: "Filet Mignon",               desc: "Filet mignon de veau, jus de cuisson et gratin dauphinois.",     price: "145 DH",            img: "/images/filet-mignon-poster.webp",          badge: "Signature" },
    { name: "Kefta Tajine",               desc: "Kefta en sauce tomate épicée avec œufs miroir.",                 price: "95 DH",             img: "/images/kefta-tajine.webp" },
  ],
  "crepes": [
    { name: "Crêpe Toile Chocolat",       desc: "Crêpe à motif dentelle, nappée chocolat noir et blanc.",         price: "45 DH",             img: "/images/crepe-toile-chocolat.webp" },
    { name: "Crêpe Roulée Chocolat",      desc: "Crêpe roulée avec garniture généreuse au chocolat.",             price: "45 DH",             img: "/images/crepe-roulee-chocolat.webp" },
    { name: "Crêpe Zèbre Glacée",         desc: "Crêpe tigrée spectaculaire servie avec glace artisanale.",       price: "55 DH",             img: "/images/crepe-zebre-glace.webp",            badge: "Instagrammable" },
    { name: "Gaufre Chocolat Fruits",     desc: "Gaufre croustillante garnie de fruits frais et chocolat.",       price: "50 DH",             img: "/images/gaufres-chocolat-fruits.webp" },
    { name: "Gaufres Bee House",          desc: "Nos gaufres signature, légères et dorées.",                      price: "À partir de 50 DH", img: "/images/gaufres-poster.webp" },
    { name: "Pancakes Chocolat Framboise",desc: "Stack gourmand, framboises fraîches et glace vanille.",          price: "65 DH",             img: "/images/pancakes-chocolat-framboise.webp",  badge: "Nouveau" },
  ],
  "glacier": [
    { name: "Freak Shake Nutella",        desc: "L'icône de nos soirées — gourmandise absolue.",                  price: "55 DH",             img: "/images/freakshake-nutella-closeup.webp",   badge: "Signature" },
    { name: "Freak Shake Oreo Chocolat",  desc: "Crémeux, généreux, irrésistible.",                              price: "55 DH",             img: "/images/freakshake-oreo-chocolat.webp" },
    { name: "Freak Shake Myrtille",       desc: "Fruité, violet et spectaculaire.",                               price: "55 DH",             img: "/images/freakshake-myrtille-violet.webp" },
    { name: "Freak Shake Caramel",        desc: "Caramel coulant, chantilly maison et biscuit.",                  price: "55 DH",             img: "/images/freakshake-caramel-chantilly.webp" },
    { name: "Freak Shake Royal",          desc: "Notre freak shake signature, la légende.",                       price: "65 DH",             img: "/images/freakshake-royal-poster.webp",      badge: "Royal" },
    { name: "Duo Lotus & Nutella",        desc: "Deux freak shakes pour partager — Lotus et Nutella.",            price: "110 DH",            img: "/images/freakshakes-deux-lotus-nutella.webp" },
    { name: "Brownie Skillet",            desc: "Brownie chaud et fondant servi à la poêle avec glace.",          price: "65 DH",             img: "/images/brownie-skillet.webp" },
    { name: "Brownie Oreo Glacé",         desc: "Brownie, Oreo écrasé et boule de glace vanille.",                price: "65 DH",             img: "/images/brownie-oreo-glace.webp" },
    { name: "San Sebastian",              desc: "Basque Cheesecake onctueux et fondant.",                         price: "45 DH",             img: "/images/date-pudding.webp" },
    { name: "Chocomisu",                  desc: "Notre tiramisu revisité au chocolat et café.",                   price: "55 DH",             img: "/images/chocomisu.webp" },
    { name: "Cake Miel Honeycomb",        desc: "Gâteau au miel avec nid d'abeilles en caramel.",                 price: "50 DH",             img: "/images/cake-miel-honeycomb.webp",          badge: "Maison" },
    { name: "Dessert Roulé Nappé",        desc: "Biscuit roulé nappé de caramel et fruits secs.",                 price: "48 DH",             img: "/images/dessert-roule-nappe.webp" },
  ],
  "boissons": [
    { name: "Jus Fraise Tourbillon",      desc: "Fraises fraîches mixées, effet tourbillon spectaculaire.",       price: "35 DH",             img: "/images/jus-fraise-tourbillon.webp",        badge: "Fresh" },
    { name: "Jus Vert Frais",             desc: "Avocat, épinards, citron vert et gingembre.",                    price: "30 DH",             img: "/images/jus-vert-frais.webp" },
    { name: "Jus Smoothie Vert",          desc: "Mélange détox de légumes verts et fruits.",                      price: "35 DH",             img: "/images/jus-smoothie-vert.webp" },
    { name: "Jus Multicolores",           desc: "Assortiment de jus naturels — fraise, mangue, kiwi.",            price: "35 DH",             img: "/images/jus-multicolores.webp" },
    { name: "Cocktail Orange Framboise",  desc: "Pétillant, fruité, une explosion de saveurs.",                   price: "40 DH",             img: "/images/cocktail-orange-framboise.webp" },
    { name: "Cocktail Bleu Ananas",       desc: "Frais et exotique avec ananas et menthe.",                       price: "40 DH",             img: "/images/cocktail-bleu-ananas-poster.webp" },
    { name: "Bubble Tea 5 Couleurs",      desc: "Cinq saveurs, perles de tapioca — beauté et goût.",              price: "45 DH",             img: "/images/bubble-tea-cinq-couleurs.webp",     badge: "Trendy" },
    { name: "Bubble Tea Bleu Rouge",      desc: "Deux saveurs fusion dans un verre spectaculaire.",               price: "45 DH",             img: "/images/bubble-tea-bleu-rouge.webp" },
    { name: "Chocolatée Artisanale",      desc: "Chocolat chaud artisanal — une douceur réconfortante.",          price: "35 DH",             img: "/images/chocolatees-trois-verres.webp" },
  ],
};

/* ─── Component ─────────────────────────────────────── */

export function MenuPageClient() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeId, setActiveId] = useState("petit-dejeuner");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    CATEGORIES.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className={isDark ? "bg-night-bg text-white" : "bg-day-bg text-day-text"}>

      {/* ── Same Navbar as home page ── */}
      <Navbar />

      {/* ── Mobile category strip (below navbar, only on small screens) ── */}
      <div
        className={[
          "lg:hidden sticky top-[64px] z-40 flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar border-b",
          isDark
            ? "bg-night-bg/95 backdrop-blur-md border-white/10"
            : "bg-day-bg/95 backdrop-blur-md border-outline-variant/20",
        ].join(" ")}
      >
        {CATEGORIES.map((cat) => (
          <a
            key={cat.id}
            href={`#${cat.id}`}
            className={[
              "px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.08em] uppercase whitespace-nowrap transition-all shrink-0",
              activeId === cat.id
                ? isDark
                  ? "bg-night-accent text-night-bg"
                  : "bg-primary text-on-primary"
                : isDark
                ? "bg-white/10 text-white/70"
                : "bg-surface-container text-on-surface-variant",
            ].join(" ")}
          >
            {cat.label}
          </a>
        ))}
      </div>

      {/* ── Body: left sidebar + main content ── */}
      <div className="flex relative">

        {/* Main scrollable content */}
        <div className="flex-1 min-w-0 lg:pl-[240px]">

          {/* Hero */}
          <div
            className={[
              "relative py-24 px-8 overflow-hidden text-center",
              isDark ? "bg-surface-walnut" : "bg-surface-linen",
            ].join(" ")}
          >
            <div className="absolute inset-0 opacity-[0.07]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/petit-dejeuner-table.webp"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10">
              <span
                className={[
                  "text-[11px] font-bold tracking-[0.18em] uppercase block mb-4",
                  isDark ? "text-night-accent" : "text-primary",
                ].join(" ")}
              >
                The Place to Bee
              </span>
              <h1
                className={[
                  "font-[family-name:var(--font-playfair)] text-[clamp(40px,6vw,72px)] font-semibold leading-none mb-5",
                  isDark ? "text-white" : "text-day-text",
                ].join(" ")}
              >
                Notre Carte
              </h1>
              <p
                className={[
                  "text-lg max-w-lg mx-auto font-[family-name:var(--font-dm-sans)]",
                  isDark ? "text-white/60" : "text-on-surface-variant",
                ].join(" ")}
              >
                Une cuisine sincère, des produits frais, des saveurs qui restent.
              </p>
            </div>
          </div>

          {/* Menu sections */}
          <div className="px-8 py-16 space-y-24">
            {CATEGORIES.map((cat) => (
              <section key={cat.id} id={cat.id} className="scroll-mt-24">
                {/* Section header */}
                <div className="flex items-end gap-4 mb-10">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span
                        className={[
                          "material-symbols-outlined text-3xl",
                          isDark ? "text-night-accent" : "text-primary",
                        ].join(" ")}
                      >
                        {cat.icon}
                      </span>
                      <h2
                        className={[
                          "font-[family-name:var(--font-playfair)] text-[clamp(26px,3.5vw,38px)] font-semibold",
                          isDark ? "text-white" : "text-day-text",
                        ].join(" ")}
                      >
                        {cat.label}
                      </h2>
                    </div>
                    <span
                      className={[
                        "text-[10px] font-bold tracking-[0.14em] uppercase ml-10",
                        isDark ? "text-night-accent/60" : "text-primary/60",
                      ].join(" ")}
                    >
                      {cat.hours}
                    </span>
                  </div>
                  <div
                    className={[
                      "h-px flex-1",
                      isDark ? "bg-white/10" : "bg-outline-variant/40",
                    ].join(" ")}
                  />
                </div>

                {/* Items grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {MENU[cat.id].map((item) => (
                    <div
                      key={item.name}
                      className={[
                        "group rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl",
                        isDark
                          ? "bg-surface-walnut border-white/5 hover:border-night-accent/30"
                          : "bg-white border-outline-variant/30 hover:border-primary/25",
                      ].join(" ")}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {item.badge && (
                          <span
                            className={[
                              "absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.08em] uppercase",
                              isDark
                                ? "bg-night-accent text-night-bg"
                                : "bg-primary text-on-primary",
                            ].join(" ")}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h3
                            className={[
                              "font-[family-name:var(--font-playfair)] text-[19px] font-semibold leading-tight",
                              isDark ? "text-white" : "text-day-text",
                            ].join(" ")}
                          >
                            {item.name}
                          </h3>
                          <span
                            className={[
                              "font-[family-name:var(--font-dm-sans)] text-[17px] font-bold shrink-0",
                              isDark ? "text-night-accent" : "text-primary",
                            ].join(" ")}
                          >
                            {item.price}
                          </span>
                        </div>
                        <p
                          className={[
                            "font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed",
                            isDark ? "text-white/50" : "text-on-surface-variant",
                          ].join(" ")}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Footer strip */}
          <footer
            className={[
              "border-t py-10 text-center px-8",
              isDark
                ? "border-white/10 bg-surface-walnut"
                : "border-outline-variant/30 bg-surface-linen",
            ].join(" ")}
          >
            <p
              className={[
                "font-[family-name:var(--font-playfair)] text-2xl italic mb-2",
                isDark ? "text-night-accent" : "text-primary",
              ].join(" ")}
            >
              &ldquo;The Place to Bee&rdquo;
            </p>
            <p
              className={[
                "text-sm font-[family-name:var(--font-dm-sans)]",
                isDark ? "text-white/40" : "text-on-surface-variant/60",
              ].join(" ")}
            >
              692 Boulevard El Qods, Ain Chock — Casablanca · 05228-70808
            </p>
            <Link
              href="/"
              className={[
                "inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full text-sm font-bold tracking-[0.08em] uppercase transition-all hover:opacity-80",
                isDark ? "bg-night-accent text-night-bg" : "bg-primary text-on-primary",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-base">home</span>
              Retour à l&apos;accueil
            </Link>
          </footer>
        </div>

        {/* ── Left Sidebar — desktop only ── */}
        <aside
          className={[
            "hidden lg:flex flex-col fixed left-0 top-[64px] w-[240px] h-[calc(100vh-64px)] border-r z-40",
            isDark
              ? "bg-surface-walnut/95 backdrop-blur-md border-white/10"
              : "bg-white/95 backdrop-blur-md border-outline-variant/25",
          ].join(" ")}
        >
          {/* Brand */}
          <div
            className={[
              "px-7 pt-8 pb-6 border-b",
              isDark ? "border-white/8" : "border-outline-variant/20",
            ].join(" ")}
          >
            <span
              className={[
                "font-[family-name:var(--font-playfair)] text-[22px] font-bold tracking-tight block",
                isDark ? "text-night-accent" : "text-primary",
              ].join(" ")}
            >
              Bee House
            </span>
          </div>

          {/* Category nav */}
          <nav className="flex-1 flex flex-col px-4 py-5 gap-1 overflow-y-auto no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = activeId === cat.id;
              return (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className={[
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-[family-name:var(--font-dm-sans)] font-medium transition-all duration-200",
                    isActive
                      ? isDark
                        ? "bg-night-accent/15 text-night-accent"
                        : "bg-primary/10 text-primary"
                      : isDark
                      ? "text-white/55 hover:text-white hover:bg-white/5"
                      : "text-on-surface-variant hover:text-primary hover:bg-primary/5",
                  ].join(" ")}
                >
                  {/* Active dot */}
                  <span
                    className={[
                      "w-1.5 h-1.5 rounded-full shrink-0 transition-all",
                      isActive
                        ? isDark ? "bg-night-accent" : "bg-primary"
                        : "bg-transparent",
                    ].join(" ")}
                  />
                  {cat.label}
                </a>
              );
            })}
          </nav>

          {/* Bottom label */}
          <div
            className={[
              "px-7 py-6 border-t",
              isDark ? "border-white/8" : "border-outline-variant/20",
            ].join(" ")}
          >
            <span
              className={[
                "font-[family-name:var(--font-playfair)] text-[15px] italic block",
                isDark ? "text-white/30" : "text-on-surface-variant/50",
              ].join(" ")}
            >
              Notre Carte
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}
