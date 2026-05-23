"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
    { name: "Café Mocha",                 desc: "L'équilibre parfait entre grain et cacao.",                       price: "35 DH",             img: "/images/cafe-creme-poster.webp" },
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
    { name: "Gaufres Bee House",          desc: "Nos gaufres signature, légères et dorées.",                      price: "50 DH",             img: "/images/gaufres-poster.webp" },
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

const VOUCHERS = [
  { code: "BEE15", label: "Morning Glow (-15%)", discount: 0.15, category: "petit-dejeuner", desc: "Profitez de 15% de réduction sur tout le petit déjeuner !" },
  { code: "SWEET20", label: "Heure du Goûter (-20%)", discount: 0.20, category: "crepes", desc: "Pour un goûter gourmand : -20% sur les Crêpes & Gaufres." },
  { code: "FREAKLOVE", label: "Freak Shake Offert (Dès 150 DH)", discount: 55, minTotal: 150, desc: "Un Freak Shake classique offert pour toute commande de plus de 150 DH !" },
  { code: "BIENVENUE", label: "Cadeau de Bienvenue (-10%)", discount: 0.10, desc: "-10% de réduction sur l'ensemble de votre premier bon de commande." }
];

const parsePrice = (priceStr: string): number => {
  const match = priceStr.match(/\d+/);
  return match ? parseInt(match[0], 10) : 45;
};

/* ─── Component ─────────────────────────────────────── */

export function MenuPageClient() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();
  const [orderMode, setOrderMode] = useState<"choosing" | "smart">("choosing");
  const [activeId, setActiveId] = useState("petit-dejeuner");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Interactive Bons & Cart States
  const [cart, setCart] = useState<{ name: string; price: string; img: string; quantity: number; note: string }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedVoucher, setAppliedVoucher] = useState<typeof VOUCHERS[number] | null>(null);
  const [orderStatus, setOrderStatus] = useState<"idle" | "printing" | "success">("idle");
  const [tableNumber] = useState(() => Math.floor(Math.random() * 24) + 1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  const addToCart = (item: { name: string; price: string; img: string }) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.name === item.name);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [...prev, { name: item.name, price: item.price, img: item.img, quantity: 1, note: "" }];
    });
  };

  const removeFromCart = (itemName: string) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.name === itemName);
      if (idx > -1) {
        const next = [...prev];
        if (next[idx].quantity > 1) {
          next[idx] = { ...next[idx], quantity: next[idx].quantity - 1 };
          return next;
        }
        return next.filter((i) => i.name !== itemName);
      }
      return prev;
    });
  };

  const updateNote = (itemName: string, note: string) => {
    setCart((prev) =>
      prev.map((i) => (i.name === itemName ? { ...i, note } : i))
    );
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);
  };

  const calculateDiscount = () => {
    if (!appliedVoucher) return 0;
    const subtotal = calculateSubtotal();
    
    if (appliedVoucher.code === "FREAKLOVE") {
      return subtotal >= 150 ? appliedVoucher.discount : 0;
    }
    
    if (appliedVoucher.category) {
      const catSubtotal = cart
        .filter((item) => {
          // Check if item belongs to the category
          return MENU[appliedVoucher.category!].some((m) => m.name === item.name);
        })
        .reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);
      return Math.round(catSubtotal * appliedVoucher.discount * 100) / 100;
    }
    
    return Math.round(subtotal * appliedVoucher.discount * 100) / 100;
  };

  const calculateTotal = () => {
    const total = calculateSubtotal() - calculateDiscount();
    return Math.max(0, Math.round(total * 100) / 100);
  };

  const triggerOrderPrinting = () => {
    setOrderStatus("printing");
    setTimeout(() => {
      setOrderStatus("success");
    }, 2800);
  };

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

          {/* ── Section: Bons Plans ── */}
          <div className="px-8 pt-12 pb-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-3xl text-honey-drip animate-bounce">
                  local_activity
                </span>
                <h2 className={`font-[family-name:var(--font-playfair)] text-3xl font-semibold ${isDark ? "text-white" : "text-day-text"}`}>
                  Bons Plans & Privilèges Bee House
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {VOUCHERS.map((v) => {
                  const isApplied = appliedVoucher?.code === v.code;
                  return (
                    <div
                      key={v.code}
                      className={`relative rounded-2xl p-6 border overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between group ${
                        isApplied
                          ? "border-honey-drip bg-honey-drip/5"
                          : isDark
                          ? "bg-surface-walnut border-white/5"
                          : "bg-white border-outline-variant/30"
                      }`}
                    >
                      {/* Ticket jagged edge ornament */}
                      <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background border-r border-inherit"></div>
                      <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background border-l border-inherit"></div>
                      
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <span className={`text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full ${
                            isApplied
                              ? "bg-honey-drip text-white animate-pulse"
                              : isDark
                              ? "bg-white/10 text-night-accent"
                              : "bg-primary/10 text-primary"
                          }`}>
                            CODE: {v.code}
                          </span>
                          {isApplied && (
                            <span className="material-symbols-outlined text-honey-drip text-lg animate-spin">
                              star
                            </span>
                          )}
                        </div>
                        <h3 className={`font-[family-name:var(--font-playfair)] text-lg font-bold mb-2 ${isDark ? "text-white" : "text-day-text"}`}>
                          {v.label}
                        </h3>
                        <p className={`text-xs mb-6 ${isDark ? "text-white/60" : "text-on-surface-variant/80"}`}>
                          {v.desc}
                        </p>
                      </div>
                      
                      <button
                        onClick={() => {
                          if (isApplied) {
                            setAppliedVoucher(null);
                            showToast("Bon plan retiré !");
                          } else {
                            if (v.minTotal && calculateSubtotal() < v.minTotal) {
                              showToast(`Ce bon nécessite un panier d'au moins ${v.minTotal} DH !`);
                            }
                            setAppliedVoucher(v);
                            showToast(`Bon plan ${v.code} appliqué avec succès !`);
                          }
                        }}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                          isApplied
                            ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                            : isDark
                            ? "bg-night-accent text-night-bg hover:opacity-90"
                            : "bg-primary text-on-primary hover:opacity-90"
                        }`}
                      >
                        {isApplied ? "Retirer" : "Appliquer"}
                      </button>
                    </div>
                  );
                })}
              </div>
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
                        "group rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl flex flex-col justify-between",
                        isDark
                          ? "bg-surface-walnut border-white/5 hover:border-night-accent/30"
                          : "bg-white border-outline-variant/30 hover:border-primary/25",
                      ].join(" ")}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden shrink-0">
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
                      
                      <div className="p-5 flex flex-col justify-between flex-1">
                        <div>
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
                              "font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed mb-6",
                              isDark ? "text-white/50" : "text-on-surface-variant",
                            ].join(" ")}
                          >
                            {item.desc}
                          </p>
                        </div>
                        
                        <button
                          onClick={() => {
                            addToCart(item);
                            showToast(`"${item.name}" ajouté à la table !`);
                          }}
                          className={`w-full py-2.5 border rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                            isDark
                              ? "border-night-accent/30 text-night-accent bg-night-accent/5 hover:bg-night-accent hover:text-night-bg hover:border-night-accent"
                              : "border-primary/30 text-primary bg-primary/5 hover:bg-primary hover:text-on-primary hover:border-primary"
                          }`}
                        >
                          <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                          Ajouter à la table
                        </button>
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

      {/* ── Floating Cart Button ── */}
      {cart.length > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className={`fixed bottom-24 right-8 z-[45] w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 animate-bounce group ${
            isDark ? "bg-night-accent text-night-bg" : "bg-primary text-on-primary"
          }`}
        >
          <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">
            receipt_long
          </span>
          {/* Badge */}
          <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse border-2 border-inherit">
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        </button>
      )}

      {/* ── Toast Notification ── */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2.5 px-6 py-3 rounded-full shadow-2xl border backdrop-blur-md animate-fade-in-down bg-honey-drip/10 border-honey-drip/30 text-honey-drip">
          <span className="material-symbols-outlined text-lg animate-spin">
            brightness_low
          </span>
          <span className="text-xs font-bold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* ── Cart Sliding Drawer ── */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-500 ${
          isCartOpen ? "opacity-100 pointer-events-auto animate-fade-in" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop overlay */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsCartOpen(false)}
        />

        {/* Drawer container */}
        <div
          className={`absolute inset-y-0 right-0 w-full sm:w-[480px] max-w-full shadow-2xl transition-transform duration-500 flex flex-col justify-between ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          } ${isDark ? "bg-surface-walnut text-white" : "bg-white text-day-text"}`}
        >
          {/* Header */}
          <div className={`p-6 border-b flex items-center justify-between ${isDark ? "border-white/10" : "border-outline-variant/30"}`}>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-honey-drip text-2xl animate-pulse">
                receipt_long
              </span>
              <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold">
                Mon Bon de Commande
              </h2>
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                isDark ? "bg-white/10 text-night-accent" : "bg-primary/10 text-primary"
              }`}>
                Table {tableNumber}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className={`p-2 rounded-full transition-colors ${
                isDark ? "hover:bg-white/10 text-white/60 hover:text-white" : "hover:bg-black/5 text-on-surface-variant hover:text-day-text"
              }`}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <span className="material-symbols-outlined text-6xl text-honey-drip/30 mb-4 animate-bounce">
                  dining
                </span>
                <p className="text-lg font-bold mb-2">Votre table est vide !</p>
                <p className={`text-sm max-w-xs ${isDark ? "text-white/50" : "text-on-surface-variant"}`}>
                  Ajoutez les délices de notre carte et préparez votre commande pour la cuisine.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.name}
                  className={`flex gap-4 p-4 rounded-xl border transition-all duration-300 hover:shadow-md ${
                    isDark ? "bg-white/5 border-white/5" : "bg-day-bg/50 border-outline-variant/30"
                  }`}
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-[family-name:var(--font-playfair)] font-bold text-sm leading-tight">
                          {item.name}
                        </h4>
                        <span className="font-bold text-xs shrink-0 text-honey-drip font-mono">
                          {item.price}
                        </span>
                      </div>
                      
                      {/* Culinary note input */}
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-xs text-honey-drip/75">
                          edit_note
                        </span>
                        <input
                          type="text"
                          placeholder="Note (ex: chaud, sans sucre...)"
                          value={item.note}
                          onChange={(e) => updateNote(item.name, e.target.value)}
                          className={`text-[11px] bg-transparent border-b border-transparent focus:border-honey-drip focus:outline-none w-full py-0.5 transition-all ${
                            isDark ? "text-white/60 focus:text-white" : "text-on-surface-variant focus:text-day-text"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Quantity selector */}
                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-dashed border-white/10">
                      <button
                        onClick={() => removeFromCart(item.name)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                          isDark ? "bg-white/10 hover:bg-red-500/20 hover:text-red-400" : "bg-black/5 hover:bg-red-500/10 hover:text-red-600"
                        }`}
                      >
                        <span className="material-symbols-outlined text-xs">remove</span>
                      </button>
                      <span className="text-xs font-bold font-mono">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                          isDark ? "bg-white/10 hover:bg-honey-drip/20 hover:text-honey-drip" : "bg-black/5 hover:bg-primary/10 hover:text-primary"
                        }`}
                      >
                        <span className="material-symbols-outlined text-xs">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer summary & checkout button */}
          {cart.length > 0 && (
            <div className={`p-6 border-t ${isDark ? "border-white/10 bg-white/5" : "border-outline-variant/30 bg-day-bg/30"}`}>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className={isDark ? "text-white/60" : "text-on-surface-variant"}>Sous-total</span>
                  <span className="font-bold font-mono">{calculateSubtotal()} DH</span>
                </div>
                
                {appliedVoucher && (
                  <div className="flex justify-between text-sm text-green-500 font-semibold">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base">local_offer</span>
                      <span>Bon Plan ({appliedVoucher.code})</span>
                    </div>
                    <span className="font-mono">-{calculateDiscount()} DH</span>
                  </div>
                )}

                <div className="h-px border-t border-dashed my-2 border-inherit" />

                <div className="flex justify-between items-end">
                  <span className="font-bold text-base">Total Estimé</span>
                  <span className="font-bold text-2xl text-honey-drip font-mono">
                    {calculateTotal()} DH
                  </span>
                </div>
              </div>

              {/* Envoyer en Cuisine CTA */}
              <button
                onClick={() => triggerOrderPrinting()}
                className={`w-full py-4 rounded-2xl font-bold tracking-[0.1em] uppercase shadow-lg shadow-honey-drip/10 transition-all duration-300 hover:shadow-honey-drip/25 active:scale-95 flex items-center justify-center gap-3 ${
                  isDark ? "bg-night-accent text-night-bg hover:opacity-90" : "bg-primary text-on-primary hover:opacity-90"
                }`}
              >
                <span className="material-symbols-outlined text-lg animate-pulse">
                  chef_hat
                </span>
                Envoyer en Cuisine
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Ordering Mode Modal ── */}
      {orderMode === "choosing" && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          {/* Blurred backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

          {/* Modal card */}
          <div
            className="relative w-full max-w-[780px] rounded-3xl p-8 border shadow-2xl"
            style={{
              background: isDark
                ? "linear-gradient(160deg, #0d1a08 0%, #080f05 100%)"
                : "linear-gradient(160deg, #f4f0e8 0%, #eae6dd 100%)",
              borderColor: isDark ? "rgba(73,102,54,0.35)" : "rgba(73,102,54,0.20)",
            }}
          >
            {/* Ambient glow inside modal */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full blur-[120px] pointer-events-none"
              style={{ backgroundColor: "rgba(73,102,54,0.08)" }}
            />

            {/* Header */}
            <div className="text-center mb-8 relative z-10">
              <p
                className="font-[family-name:var(--font-dm-sans)] text-[10px] font-bold tracking-[0.35em] uppercase mb-3"
                style={{ color: isDark ? "rgba(182,216,156,0.55)" : "rgba(73,102,54,0.55)" }}
              >
                Bienvenue chez Bee House
              </p>
              <h2
                className="font-[family-name:var(--font-playfair)] font-semibold leading-tight mb-2"
                style={{ fontSize: "clamp(24px,3.5vw,38px)", color: isDark ? "#ffffff" : "#1F1208" }}
              >
                Comment souhaitez-vous consulter notre carte ?
              </h2>
              <p
                className="font-[family-name:var(--font-dm-sans)] text-sm"
                style={{ color: isDark ? "rgba(255,255,255,0.40)" : "rgba(83,68,53,0.70)" }}
              >
                Choisissez votre expérience de commande.
              </p>
            </div>

            {/* Choice cards */}
            <div className="flex flex-col sm:flex-row gap-4 relative z-10">

              {/* Smart ordering */}
              <button
                onClick={() => setOrderMode("smart")}
                className="flex-1 group text-left rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                style={{
                  background: isDark
                    ? "linear-gradient(160deg, #1a2e10 0%, #111e0a 100%)"
                    : "linear-gradient(160deg, #2a4a1a 0%, #1a3012 100%)",
                  borderColor: isDark ? "rgba(73,102,54,0.40)" : "rgba(73,102,54,0.25)",
                  boxShadow: "0 8px 32px rgba(73,102,54,0.15)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                  style={{ background: "rgba(182,216,156,0.12)", border: "1px solid rgba(182,216,156,0.20)" }}
                >
                  <span className="material-symbols-outlined text-xl" style={{ color: "#B6D89C" }}>smart_toy</span>
                </div>
                <h3
                  className="font-[family-name:var(--font-playfair)] text-[20px] font-semibold mb-2"
                  style={{ color: "#EF9F27" }}
                >
                  Commande Intelligente
                </h3>
                <p
                  className="font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed mb-5"
                  style={{ color: "rgba(182,216,156,0.65)" }}
                >
                  Parcourez notre carte interactive, ajoutez au panier et envoyez directement en cuisine depuis votre table.
                </p>
                <span
                  className="inline-flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-[11px] font-bold tracking-[0.12em] uppercase transition-all group-hover:gap-3"
                  style={{ color: "#B6D89C" }}
                >
                  Commencer
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </button>

              {/* Classic ordering */}
              <button
                onClick={() => router.push("/normal-ordering")}
                className="flex-1 group text-left rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                style={{
                  background: isDark
                    ? "linear-gradient(160deg, #1c1208 0%, #120c05 100%)"
                    : "linear-gradient(160deg, #faf6ef 0%, #f2ead9 100%)",
                  borderColor: isDark ? "rgba(239,159,39,0.25)" : "rgba(239,159,39,0.30)",
                  boxShadow: isDark
                    ? "0 8px 32px rgba(239,159,39,0.08)"
                    : "0 8px 32px rgba(135,83,0,0.10)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                  style={{
                    background: isDark ? "rgba(239,159,39,0.10)" : "rgba(73,102,54,0.08)",
                    border: isDark ? "1px solid rgba(239,159,39,0.20)" : "1px solid rgba(73,102,54,0.15)",
                  }}
                >
                  <span className="material-symbols-outlined text-xl" style={{ color: isDark ? "#EF9F27" : "#496636" }}>menu_book</span>
                </div>
                <h3
                  className="font-[family-name:var(--font-playfair)] text-[20px] font-semibold mb-2"
                  style={{ color: isDark ? "#EF9F27" : "#1a3012" }}
                >
                  Carte Classique
                </h3>
                <p
                  className="font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed mb-5"
                  style={{ color: isDark ? "rgba(255,255,255,0.45)" : "rgba(73,102,54,0.65)" }}
                >
                  Consultez notre belle carte en format livre. Feuilletez les catégories avec une animation élégante de page.
                </p>
                <span
                  className="inline-flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-[11px] font-bold tracking-[0.12em] uppercase transition-all group-hover:gap-3"
                  style={{ color: isDark ? "#EF9F27" : "#496636" }}
                >
                  Ouvrir la Carte
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Ticket Printer Modal ── */}
      {orderStatus !== "idle" && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          
          <div className="relative w-full max-w-[420px] flex flex-col items-center">
            {/* The slot header */}
            <div className="w-[320px] h-6 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-t-lg shadow-inner relative border-b border-black shrink-0 flex items-center justify-center">
              {/* Laser light */}
              <div className={`w-2 h-2 rounded-full absolute left-4 ${orderStatus === "printing" ? "bg-amber-500 animate-ping" : "bg-green-500"}`} />
              <div className="w-48 h-1 bg-black/40 rounded-full" />
            </div>

            {/* Receipt Ticket */}
            <div
              className={`w-[290px] bg-[#FAF6EF] text-[#2C1A08] p-6 shadow-2xl font-mono text-xs border border-gray-200 transition-all duration-[2000ms] ease-out overflow-hidden flex flex-col justify-between ${
                orderStatus === "printing" ? "h-0 py-0 opacity-0" : "h-[500px] opacity-100 rounded-b-md"
              }`}
              style={{
                backgroundImage: "radial-gradient(#00000005 1px, transparent 1px)",
                backgroundSize: "8px 8px"
              }}
            >
              {/* Receipt Header */}
              <div className="text-center space-y-1">
                <span className="font-bold text-sm tracking-widest block">BEE HOUSE</span>
                <span className="text-[10px] block opacity-75">Casablanca Ain Chock</span>
                <span className="text-[9px] block opacity-60">692 Bd El Qods</span>
                <span className="text-[10px] block font-bold mt-2">BON DE PREPARATION</span>
                <span className="text-[9px] block">Table: {tableNumber} | Ticket #{Math.floor(Math.random() * 9000) + 1000}</span>
                <span className="text-[9px] block opacity-75">{new Date().toLocaleString("fr-FR")}</span>
                <div className="border-b border-dashed border-gray-400 my-2" />
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto space-y-2 py-2 text-[10px] no-scrollbar">
                {cart.map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between">
                      <span className="font-bold">{item.quantity}x {item.name}</span>
                      <span>{item.price}</span>
                    </div>
                    {item.note && (
                      <span className="text-[9px] opacity-75 pl-3 block italic">* Note: {item.note}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Total calculations */}
              <div className="space-y-1 text-[10px] border-t border-dashed border-gray-400 pt-2 shrink-0">
                <div className="flex justify-between">
                  <span>Sous-total:</span>
                  <span>{calculateSubtotal()} DH</span>
                </div>
                {appliedVoucher && (
                  <div className="flex justify-between text-green-750 font-bold">
                    <span>Bon Plan ({appliedVoucher.code}):</span>
                    <span>-{calculateDiscount()} DH</span>
                  </div>
                )}
                <div className="border-t border-double border-gray-400 my-1" />
                <div className="flex justify-between font-bold text-xs pt-1">
                  <span>TOTAL:</span>
                  <span>{calculateTotal()} DH</span>
                </div>
                <div className="border-b border-dashed border-gray-400 my-2" />
              </div>

              {/* QR Code placeholder and footer */}
              <div className="text-center space-y-2 shrink-0">
                <div className="w-12 h-12 bg-white border border-gray-300 mx-auto flex items-center justify-center p-1">
                  <div className="w-full h-full bg-[radial-gradient(black_1px,transparent_0)] bg-[size:4px_4px]" />
                </div>
                <span className="text-[9px] block italic opacity-75">Merci pour votre confiance !</span>
                <span className="text-[8px] block opacity-50 tracking-tighter">#ThePlaceToBee</span>
              </div>
            </div>

            {/* Printing Progress Overlay */}
            {orderStatus === "printing" ? (
              <div className="mt-8 text-center text-white space-y-3">
                <span className="material-symbols-outlined text-4xl text-honey-drip animate-spin block">
                  print
                </span>
                <p className="text-sm font-bold animate-pulse">Impression du Bon de cuisine...</p>
                <p className="text-[10px] text-white/50 italic">* Bzzzt... Krrrrk... *</p>
              </div>
            ) : (
              <div className="mt-8 text-center text-white w-full max-w-[340px] space-y-4 animate-fade-in">
                {/* Live Status Tracker */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 space-y-4 border border-white/10 text-left">
                  <h4 className="font-bold text-sm text-honey-drip flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
                    Suivi de Préparation
                  </h4>
                  
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center gap-3 text-white">
                      <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                      <span>Bon de préparation reçu (Enregistré)</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/95">
                      <span className="material-symbols-outlined text-honey-drip text-sm animate-spin">chef_hat</span>
                      <span>En cours de préparation par nos chefs</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/40">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      <span>Service imminent à votre table</span>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-3 flex justify-between items-center text-[10px] text-white/60">
                    <span>Temps d'attente estimé :</span>
                    <span className="font-bold text-white font-mono text-xs">12-15 min</span>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => {
                    setCart([]);
                    setAppliedVoucher(null);
                    setOrderStatus("idle");
                  }}
                  className={`w-full py-3.5 rounded-xl font-bold tracking-wider uppercase shadow-lg transition-all duration-300 ${
                    isDark ? "bg-night-accent text-night-bg hover:opacity-90" : "bg-primary text-on-primary hover:opacity-90"
                  }`}
                >
                  Fermer & Suivre l'Ordre
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
