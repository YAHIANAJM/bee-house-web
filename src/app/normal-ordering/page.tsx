import type { Metadata } from "next";
import { NormalOrderingClient } from "./NormalOrderingClient";

export const metadata: Metadata = {
  title: "Bee House — Carte Classique",
  description: "Feuilletez notre carte comme un livre.",
};

export default function NormalOrderingPage() {
  return <NormalOrderingClient />;
}
