import type { Metadata } from "next";
import { QRLanding } from "./QRLanding";

export const metadata: Metadata = {
  title: "Bee House — Scannez & Commandez",
  description: "Scannez le QR code pour accéder directement à notre carte.",
};

export default function QRPage() {
  return <QRLanding />;
}
