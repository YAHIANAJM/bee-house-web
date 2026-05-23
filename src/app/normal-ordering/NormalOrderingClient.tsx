"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";

const SAGE    = "#B6D89C";
const AMBER   = "#EF9F27";
const CARD_BG = "linear-gradient(160deg, #2a4a1a 0%, #1a3012 45%, #0e1c09 100%)";

const CATEGORIES = [
  { id: "petit-dejeuner", label: "Petit Déjeuner",       icon: "coffee",        short: "Matin"    },
  { id: "salades",        label: "Salades & Entrées",     icon: "eco",           short: "Salades"  },
  { id: "plats",          label: "Sandwichs & Plats",     icon: "restaurant",    short: "Plats"    },
  { id: "crepes",         label: "Crêpes & Gaufres",      icon: "bakery_dining", short: "Crêpes"   },
  { id: "glacier",        label: "Glacier & Shakes",      icon: "icecream",      short: "Desserts" },
  { id: "boissons",       label: "Jus & Boissons",        icon: "local_bar",     short: "Boissons" },
];

const ITEMS: Record<string, { name: string; price: string; badge?: string }[]> = {
  "petit-dejeuner": [
    { name: "Café Crème Artisanal",       price: "25 DH",  badge: "Signature" },
    { name: "Café Mocha",                 price: "35 DH"  },
    { name: "Café Crème 4 Verres",        price: "90 DH"  },
    { name: "Mini Pancakes Stack",        price: "55 DH"  },
    { name: "Petit Déjeuner Table",       price: "65 DH",  badge: "Formule"   },
    { name: "Crêpe Toile Chocolat",       price: "40 DH"  },
  ],
  "salades": [
    { name: "Salade Bee House",           price: "78 DH",  badge: "Signature" },
    { name: "Salade Composée",            price: "72 DH"  },
    { name: "Salade Poulet Grillé",       price: "85 DH"  },
    { name: "Salade Fruits de Mer",       price: "98 DH"  },
    { name: "Salade Crevettes Cajou",     price: "95 DH"  },
    { name: "Salade Poulet Framboise",    price: "88 DH"  },
  ],
  "plats": [
    { name: "Burger Double Bee House",    price: "95 DH",  badge: "Best-seller" },
    { name: "Sandwich Poulet Champignon", price: "75 DH"  },
    { name: "Pastilla Poulet",            price: "85 DH"  },
    { name: "Tajine Agneau Pruneaux",     price: "120 DH" },
    { name: "Steak Légumes Grillés",      price: "145 DH", badge: "Premium"   },
    { name: "T-Bone Royal",               price: "175 DH", badge: "Premium"   },
    { name: "Roulé de Poisson",           price: "125 DH" },
    { name: "Filet Mignon",               price: "145 DH", badge: "Signature" },
    { name: "Kefta Tajine",               price: "95 DH"  },
  ],
  "crepes": [
    { name: "Crêpe Toile Chocolat",       price: "45 DH"  },
    { name: "Crêpe Roulée Chocolat",      price: "45 DH"  },
    { name: "Crêpe Zèbre Glacée",         price: "55 DH",  badge: "Instagrammable" },
    { name: "Gaufre Chocolat Fruits",     price: "50 DH"  },
    { name: "Gaufres Bee House",          price: "50 DH"  },
    { name: "Pancakes Chocolat Framboise",price: "65 DH",  badge: "Nouveau"   },
  ],
  "glacier": [
    { name: "Freak Shake Nutella",        price: "55 DH",  badge: "Signature" },
    { name: "Freak Shake Oreo Chocolat",  price: "55 DH"  },
    { name: "Freak Shake Myrtille",       price: "55 DH"  },
    { name: "Freak Shake Caramel",        price: "55 DH"  },
    { name: "Freak Shake Royal",          price: "65 DH",  badge: "Royal"     },
    { name: "Duo Lotus & Nutella",        price: "110 DH" },
    { name: "Brownie Skillet",            price: "65 DH"  },
    { name: "Brownie Oreo Glacé",         price: "65 DH"  },
    { name: "Cake Miel Honeycomb",        price: "50 DH",  badge: "Maison"    },
    { name: "Chocomisu",                  price: "55 DH"  },
  ],
  "boissons": [
    { name: "Jus Fraise Tourbillon",      price: "35 DH",  badge: "Fresh"     },
    { name: "Jus Vert Frais",             price: "30 DH"  },
    { name: "Jus Smoothie Vert",          price: "35 DH"  },
    { name: "Jus Multicolores",           price: "35 DH"  },
    { name: "Cocktail Orange Framboise",  price: "40 DH"  },
    { name: "Cocktail Bleu Ananas",       price: "40 DH"  },
    { name: "Bubble Tea 5 Couleurs",      price: "45 DH",  badge: "Trendy"    },
    { name: "Bubble Tea Bleu Rouge",      price: "45 DH"  },
    { name: "Chocolatée Artisanale",      price: "35 DH"  },
  ],
};

/* ── Single book page ───────────────────────────────────── */
function BookPage({
  items, side, category, pageNum, flipping,
}: {
  items: { name: string; price: string; badge?: string }[];
  side: "left" | "right";
  category: typeof CATEGORIES[number];
  pageNum: number;
  flipping: boolean;
}) {
  const textMain  = "#1F1208";
  const textDim   = "rgba(31,18,8,0.38)";
  const dotColor  = "rgba(31,18,8,0.15)";
  const accentCol = "#2a4a1a";

  return (
    <div
      className="h-full flex flex-col"
      style={{
        background: "linear-gradient(170deg, #faf6ef 0%, #f2ead9 55%, #e8d9c2 100%)",
        padding: "clamp(18px,3vw,40px) clamp(20px,3.5vw,44px)",
        transition: "transform 0.30s ease, opacity 0.30s ease",
        transform: flipping
          ? `perspective(900px) rotateY(${side === "left" ? "14deg" : "-14deg"}) scale(0.96)`
          : "rotateY(0deg) scale(1)",
        opacity: flipping ? 0 : 1,
        transformOrigin: side === "left" ? "right center" : "left center",
      }}
    >
      {/* Page header */}
      {side === "left" ? (
        <div className="mb-6 shrink-0">
          <p
            className="font-[family-name:var(--font-dm-sans)] font-bold tracking-[0.40em] uppercase mb-1"
            style={{ fontSize: "9px", color: textDim }}
          >
            Notre Carte
          </p>
          <h3
            className="font-[family-name:var(--font-playfair)] font-bold leading-tight"
            style={{ fontSize: "clamp(18px,2.2vw,26px)", color: accentCol, letterSpacing: "0.04em" }}
          >
            {category.label}
          </h3>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex-1 h-px" style={{ backgroundColor: dotColor }} />
            <span className="material-symbols-outlined" style={{ fontSize: "12px", color: "rgba(73,102,54,0.50)" }}>{category.icon}</span>
            <div className="flex-1 h-px" style={{ backgroundColor: dotColor }} />
          </div>
        </div>
      ) : (
        <div className="mb-6 shrink-0">
          <p
            className="font-[family-name:var(--font-dm-sans)] font-bold tracking-[0.40em] uppercase"
            style={{ fontSize: "9px", color: textDim }}
          >
            — Suite
          </p>
          <div className="mt-3 h-px" style={{ backgroundColor: dotColor }} />
        </div>
      )}

      {/* Items */}
      <div className="flex-1 flex flex-col gap-4 overflow-hidden">
        {items.map((item) => (
          <div key={item.name} className="group">
            <div className="flex items-baseline gap-1.5">
              <span
                className="font-[family-name:var(--font-playfair)] font-semibold leading-snug shrink-0"
                style={{ fontSize: "clamp(12px,1.25vw,15px)", color: textMain, maxWidth: "52%" }}
              >
                {item.name}
              </span>
              {/* Dotted leader */}
              <span
                className="flex-1 self-end"
                style={{
                  display: "block",
                  height: "1px",
                  backgroundImage: `radial-gradient(circle, ${dotColor} 1px, transparent 1px)`,
                  backgroundSize: "5px 1px",
                  backgroundRepeat: "repeat-x",
                  marginBottom: "3px",
                }}
              />
              <div className="flex items-center gap-1.5 shrink-0">
                {item.badge && (
                  <span
                    className="text-[7px] font-bold tracking-[0.1em] uppercase px-1.5 py-0.5 rounded-full hidden sm:inline"
                    style={{ backgroundColor: "rgba(73,102,54,0.10)", color: "#2a4a1a", border: "1px solid rgba(73,102,54,0.20)" }}
                  >
                    {item.badge}
                  </span>
                )}
                <span
                  className="font-[family-name:var(--font-dm-sans)] font-bold tabular-nums"
                  style={{ fontSize: "clamp(11px,1.1vw,13px)", color: "#875300" }}
                >
                  {item.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Page footer */}
      <div className={`mt-4 shrink-0 flex ${side === "left" ? "justify-start" : "justify-end"} items-center gap-2`}>
        <span className="font-[family-name:var(--font-playfair)] text-xs italic" style={{ color: textDim }}>
          {side === "left" ? "Bee House" : "Casablanca"}
        </span>
        <span className="font-mono text-[10px]" style={{ color: textDim }}>{pageNum}</span>
      </div>
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────── */
export function NormalOrderingClient() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [isOpen,    setIsOpen]    = useState(false);
  const [activeCat, setActiveCat] = useState(0);
  const [flipping,  setFlipping]  = useState(false);

  const cat        = CATEGORIES[activeCat];
  const items      = ITEMS[cat.id] ?? [];
  const mid        = Math.ceil(items.length / 2);
  const leftItems  = items.slice(0, mid);
  const rightItems = items.slice(mid);

  const selectCategory = (idx: number) => {
    if (idx === activeCat && !isOpen) { setIsOpen(true); return; }
    if (idx === activeCat) return;
    setActiveCat(idx);
    if (!isOpen) return;
    setFlipping(true);
    setTimeout(() => setFlipping(false), 320);
  };

  return (
    <div
      className="h-screen w-screen overflow-hidden flex flex-col select-none"
      style={{ background: isDark ? "#080f05" : "#eae6dd" }}
    >
      {/* ── Header ── */}
      <header
        className="shrink-0 flex items-center gap-4 px-5 z-10 border-b"
        style={{
          height: "60px",
          backgroundColor: isDark ? "rgba(8,15,5,0.97)" : "rgba(234,230,221,0.97)",
          borderColor: isDark ? "rgba(182,216,156,0.10)" : "rgba(73,102,54,0.12)",
          backdropFilter: "blur(16px)",
        }}
      >
        <Link
          href="/menu"
          className="flex items-center gap-1.5 shrink-0 font-[family-name:var(--font-playfair)] font-bold text-base"
          style={{ color: isDark ? SAGE : "#1a3012" }}
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Bee House
        </Link>

        <div className="w-px h-5 shrink-0" style={{ backgroundColor: isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.12)" }} />

        <div className="flex gap-1.5 overflow-x-auto no-scrollbar flex-1">
          {CATEGORIES.map((c, i) => (
            <button
              key={c.id}
              onClick={() => selectCategory(i)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.08em] uppercase whitespace-nowrap shrink-0 transition-all duration-200"
              style={{
                backgroundColor: activeCat === i
                  ? isDark ? SAGE        : "#1a3012"
                  : isDark ? `${SAGE}10` : "rgba(73,102,54,0.08)",
                color: activeCat === i
                  ? isDark ? "#1a3012"   : SAGE
                  : isDark ? `${SAGE}70` : "rgba(73,102,54,0.65)",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "12px" }}>{c.icon}</span>
              {c.short}
            </button>
          ))}
        </div>
      </header>

      {/* ── Main: centered closed card ── */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">

        {/* Ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none"
          style={{ backgroundColor: "rgba(73,102,54,0.07)" }}
        />

        {/* Closed leather card */}
        <div
          className="relative overflow-hidden cursor-pointer group"
          style={{
            width: "min(340px, 72vw)",
            aspectRatio: "2/3",
            maxHeight: "calc(100vh - 100px)",
            borderRadius: "1.25rem",
            background: CARD_BG,
            boxShadow: "0 48px 96px rgba(0,0,0,0.55), 0 0 0 1px rgba(182,216,156,0.10), inset 0 1px 0 rgba(255,255,255,0.06)",
            transform: "perspective(1000px) rotateY(-8deg) rotateX(2deg)",
            transition: "transform 0.4s ease, box-shadow 0.4s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.transform = "perspective(1000px) rotateY(-2deg) rotateX(1deg) translateY(-6px)";
            el.style.boxShadow = "0 64px 120px rgba(0,0,0,0.60), 0 0 0 1px rgba(182,216,156,0.20), inset 0 1px 0 rgba(255,255,255,0.08)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.transform = "perspective(1000px) rotateY(-8deg) rotateX(2deg)";
            el.style.boxShadow = "0 48px 96px rgba(0,0,0,0.55), 0 0 0 1px rgba(182,216,156,0.10), inset 0 1px 0 rgba(255,255,255,0.06)";
          }}
          onClick={() => setIsOpen(true)}
        >
          {/* Crosshatch texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.04,
              backgroundImage:
                "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 1px,transparent 9px)," +
                "repeating-linear-gradient(-45deg,#fff 0,#fff 1px,transparent 1px,transparent 9px)",
            }}
          />
          {/* Stitched border */}
          <div
            className="absolute inset-[10px] rounded-xl pointer-events-none"
            style={{ border: `1.5px dashed ${SAGE}28` }}
          />
          {/* Corner studs */}
          {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos) => (
            <div
              key={pos}
              className={`absolute ${pos} w-3.5 h-3.5 rounded-full`}
              style={{
                background: `radial-gradient(circle at 35% 35%, #f0d080, ${AMBER} 55%, #8a6010)`,
                boxShadow: "0 1px 5px rgba(0,0,0,0.7)",
              }}
            />
          ))}
          {/* Right spine shadow */}
          <div className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none" style={{ background: "linear-gradient(to left,rgba(0,0,0,0.50),transparent)" }} />
          {/* Top gloss */}
          <div className="absolute top-0 left-0 right-0 h-6 pointer-events-none" style={{ background: "linear-gradient(to bottom,rgba(255,255,255,0.06),transparent)" }} />

          {/* Card content */}
          <div className="absolute inset-0 flex flex-col items-center justify-between py-10 px-8 text-center">
            <p
              className="font-[family-name:var(--font-dm-sans)] font-bold tracking-[0.45em] uppercase"
              style={{ fontSize: "8px", color: `${SAGE}55` }}
            >
              The Place to Bee
            </p>

            <div className="flex flex-col items-center w-full">
              <div className="flex items-center gap-3 mb-6 w-full">
                <div className="flex-1 h-px" style={{ backgroundColor: `${AMBER}30` }} />
                <span className="material-symbols-outlined text-base" style={{ color: `${AMBER}70` }}>menu_book</span>
                <div className="flex-1 h-px" style={{ backgroundColor: `${AMBER}30` }} />
              </div>

              <h2
                className="font-[family-name:var(--font-playfair)] font-bold leading-tight tracking-tight"
                style={{ fontSize: "clamp(26px,3.8vw,40px)", color: AMBER }}
              >
                {cat.label}
              </h2>
              <p
                className="font-[family-name:var(--font-dm-sans)] tracking-[0.30em] uppercase mt-2"
                style={{ fontSize: "9px", color: `${SAGE}60` }}
              >
                Bee House Casablanca
              </p>

              <div className="flex items-center gap-3 mt-6 mb-7 w-full">
                <div className="flex-1 h-px" style={{ backgroundColor: `${AMBER}20` }} />
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: `${SAGE}50` }} />
                <div className="flex-1 h-px" style={{ backgroundColor: `${AMBER}20` }} />
              </div>

              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.38)" }}>
                {items.length} spécialités
              </p>
            </div>

            <div
              className="flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 group-hover:brightness-130"
              style={{ backgroundColor: `${SAGE}12`, border: `1px solid ${SAGE}30` }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "14px", color: SAGE }}>touch_app</span>
              <span
                className="font-[family-name:var(--font-dm-sans)] font-bold tracking-[0.15em] uppercase"
                style={{ fontSize: "10px", color: SAGE }}
              >
                Ouvrir la Carte
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Open Book Overlay ── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
          {/* Blurred backdrop */}
          <div
            className="absolute inset-0 bg-black/75"
            style={{ backdropFilter: "blur(8px)" }}
            onClick={() => setIsOpen(false)}
          />

          {/* Book wrapper */}
          <div
            className="relative flex"
            style={{
              width: "min(96vw, 1060px)",
              height: "min(84vh, 720px)",
              filter: "drop-shadow(0 60px 120px rgba(0,0,0,0.80))",
              transform: "perspective(2000px) rotateX(2deg)",
            }}
          >
            {/* Outer leather cover — left edge */}
            <div
              className="shrink-0 rounded-l-xl overflow-hidden"
              style={{
                width: "10px",
                background: "linear-gradient(to right, #2a4a1a, #1a3012)",
              }}
            />

            {/* LEFT PAGE */}
            <div className="flex-1 min-w-0 overflow-hidden" style={{ borderTop: "1px solid rgba(182,216,156,0.08)", borderBottom: "1px solid rgba(182,216,156,0.08)" }}>
              <BookPage
                items={leftItems}
                side="left"
                category={cat}
                pageNum={activeCat * 2 + 1}
                flipping={flipping}
              />
            </div>

            {/* SPINE */}
            <div
              className="shrink-0 flex flex-col items-center justify-center gap-3 py-10"
              style={{
                width: "22px",
                background: "linear-gradient(to right, #0b1606, #1a3012, #0b1606)",
                boxShadow: "inset -4px 0 12px rgba(0,0,0,0.40), inset 4px 0 12px rgba(0,0,0,0.40)",
              }}
            >
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full" style={{ backgroundColor: `${SAGE}30` }} />
              ))}
            </div>

            {/* RIGHT PAGE */}
            <div className="flex-1 min-w-0 overflow-hidden" style={{ borderTop: "1px solid rgba(182,216,156,0.08)", borderBottom: "1px solid rgba(182,216,156,0.08)" }}>
              <BookPage
                items={rightItems}
                side="right"
                category={cat}
                pageNum={activeCat * 2 + 2}
                flipping={flipping}
              />
            </div>

            {/* Outer leather cover — right edge */}
            <div
              className="shrink-0 rounded-r-xl overflow-hidden"
              style={{
                width: "10px",
                background: "linear-gradient(to left, #2a4a1a, #1a3012)",
              }}
            />

            {/* Corner studs on book */}
            {[
              "top-1.5 left-1.5",
              "top-1.5 right-1.5",
              "bottom-1.5 left-1.5",
              "bottom-1.5 right-1.5",
            ].map((pos) => (
              <div
                key={pos}
                className={`absolute ${pos} w-4 h-4 rounded-full z-10`}
                style={{
                  background: `radial-gradient(circle at 35% 35%, #f0d080, ${AMBER} 55%, #8a6010)`,
                  boxShadow: "0 1px 5px rgba(0,0,0,0.8)",
                }}
              />
            ))}

            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-4 -right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{
                background: CARD_BG,
                border: `1px solid ${SAGE}40`,
                boxShadow: "0 4px 16px rgba(0,0,0,0.50)",
              }}
            >
              <span className="material-symbols-outlined text-sm" style={{ color: SAGE }}>close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
