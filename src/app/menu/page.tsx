import type { Metadata } from "next";
import { MenuPageClient } from "./MenuPageClient";

export const metadata: Metadata = {
  title: "Notre Carte — Bee House Casablanca",
  description: "Découvrez la carte complète de Bee House : petit déjeuner, salades, plats, crêpes, freak shakes et jus frais.",
};

export default function MenuPage() {
  return <MenuPageClient />;
}
