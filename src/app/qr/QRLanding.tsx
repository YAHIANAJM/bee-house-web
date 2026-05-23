"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";

const SAGE    = "#B6D89C";
const AMBER   = "#EF9F27";
const CARD_BG = "linear-gradient(160deg, #2a4a1a 0%, #1a3012 45%, #0e1c09 100%)";

const PAGE_TEXT = "#1F1208";
const SUB_TEXT  = "#534435";

export function QRLanding() {
  const [menuUrl, setMenuUrl] = useState("");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    setMenuUrl(window.location.origin + "/menu");
  }, []);

  return (
    <div
      className={[
        "h-screen w-screen overflow-hidden flex select-none transition-colors duration-700",
        isDark ? "bg-[#080f05]" : "bg-[#eae6dd]",
      ].join(" ")}
    >
      {/* ── LEFT: Physical Menu Card Cover ── */}
      <div className="hidden md:flex w-[48%] h-full items-center justify-center relative p-8">

        {/* Subtle dot texture on the page */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #496636 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* The card */}
        <div
          className="relative w-full max-w-[420px] aspect-[2/3] rounded-2xl overflow-hidden transition-all duration-700"
          style={{
            background: isDark
              ? "linear-gradient(160deg, #f7f3ec 0%, #F2EAD9 45%, #e8d9c2 100%)"
              : CARD_BG,
            boxShadow: isDark
              ? "0 40px 80px rgba(135,83,0,0.18), 0 0 0 1px rgba(135,83,0,0.12)"
              : "0 40px 80px rgba(0,0,0,0.30), 0 0 0 1px rgba(182,216,156,0.10)",
          }}
        >
          {/* Crosshatch texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: isDark ? 0.06 : 0.045,
              backgroundImage: isDark
                ? "repeating-linear-gradient(45deg,#875300 0,#875300 1px,transparent 1px,transparent 9px),repeating-linear-gradient(-45deg,#875300 0,#875300 1px,transparent 1px,transparent 9px)"
                : "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 1px,transparent 9px),repeating-linear-gradient(-45deg,#fff 0,#fff 1px,transparent 1px,transparent 9px)",
            }}
          />

          {/* Stitched inner border */}
          <div
            className="absolute inset-[10px] rounded-xl pointer-events-none"
            style={{ border: `1.5px dashed ${isDark ? "rgba(135,83,0,0.25)" : `${SAGE}28`}` }}
          />

          {/* Corner metal studs */}
          {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos) => (
            <div
              key={pos}
              className={`absolute ${pos} w-3.5 h-3.5 rounded-full`}
              style={{
                background: isDark
                  ? "radial-gradient(circle at 35% 35%, #6a9a4a, #496636 55%, #2a4a1a)"
                  : `radial-gradient(circle at 35% 35%, #f0d080, ${AMBER} 55%, #8a6010)`,
                boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
              }}
            />
          ))}

          {/* Right spine shadow */}
          <div
            className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none"
            style={{ background: isDark ? "linear-gradient(to left, rgba(135,83,0,0.10), transparent)" : "linear-gradient(to left, rgba(0,0,0,0.50), transparent)" }}
          />
          {/* Top edge gloss */}
          <div
            className="absolute top-0 left-0 right-0 h-6 pointer-events-none"
            style={{ background: isDark ? "linear-gradient(to bottom, rgba(255,255,255,0.40), transparent)" : "linear-gradient(to bottom, rgba(255,255,255,0.05), transparent)" }}
          />
          {/* Left binding stripe */}
          <div
            className="absolute left-0 top-0 bottom-0 w-5 pointer-events-none"
            style={{ background: isDark ? "linear-gradient(to right, rgba(135,83,0,0.08), transparent)" : "linear-gradient(to right, rgba(182,216,156,0.07), transparent)" }}
          />

          {/* Card content */}
          <div className="absolute inset-0 flex flex-col items-center justify-between py-10 px-8 text-center">

            <p
              className="font-[family-name:var(--font-dm-sans)] text-[8px] font-bold tracking-[0.45em] uppercase"
              style={{ color: isDark ? "rgba(242,234,217,0.60)" : "rgba(73,102,54,0.70)" }}
            >
              The Place to Bee
            </p>

            <div className="flex flex-col items-center w-full">
              <div className="flex items-center gap-3 mb-7 w-full justify-center">
                <div className="flex-1 h-px" style={{ backgroundColor: isDark ? "rgba(242,234,217,0.30)" : "rgba(73,102,54,0.30)" }} />
                <span className="material-symbols-outlined text-base" style={{ color: isDark ? "rgba(242,234,217,0.55)" : "rgba(73,102,54,0.60)" }}>local_cafe</span>
                <div className="flex-1 h-px" style={{ backgroundColor: isDark ? "rgba(242,234,217,0.30)" : "rgba(73,102,54,0.30)" }} />
              </div>

              <h2
                className="font-[family-name:var(--font-playfair)] font-bold leading-none tracking-tight"
                style={{ fontSize: "clamp(38px,4.8vw,52px)", color: isDark ? "#1a3012" : AMBER }}
              >
                Bee House
              </h2>
              <p
                className="font-[family-name:var(--font-dm-sans)] text-[9px] tracking-[0.35em] uppercase mt-2"
                style={{ color: isDark ? "#496636" : `${SAGE}60` }}
              >
                Casablanca
              </p>

              <div className="flex items-center gap-3 mt-7 mb-8 w-full justify-center">
                <div className="flex-1 h-px" style={{ backgroundColor: isDark ? "rgba(242,234,217,0.30)" : "rgba(73,102,54,0.25)" }} />
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: isDark ? "rgba(242,234,217,0.55)" : "rgba(73,102,54,0.45)" }} />
                <div className="flex-1 h-px" style={{ backgroundColor: isDark ? "rgba(242,234,217,0.30)" : "rgba(73,102,54,0.25)" }} />
              </div>

              <div className="space-y-3 w-full">
                {[
                  { icon: "location_on", text: "692 Bd El Qods, Ain Chock" },
                  { icon: "call",        text: "+212 522 870808"            },
                  { icon: "schedule",    text: "07:00 – 23:30"              },
                ].map((row) => (
                  <div key={row.text} className="flex items-center gap-2.5 justify-center">
                    <span className="material-symbols-outlined text-[13px] shrink-0" style={{ color: isDark ? "#496636" : SAGE }}>
                      {row.icon}
                    </span>
                    <span
                      className="font-[family-name:var(--font-dm-sans)] text-[11px] leading-relaxed"
                      style={{ color: isDark ? "rgba(31,18,8,0.60)" : "rgba(255,255,255,0.55)" }}
                    >
                      {row.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-1.5">
              {["Café", "Restaurant", "Glacier", "Freak Shakes"].map((s) => (
                <span
                  key={s}
                  className="font-[family-name:var(--font-dm-sans)] text-[7.5px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full"
                  style={{
                    border: `1px solid ${isDark ? "#49663640" : `${SAGE}25`}`,
                    color: isDark ? "#496636" : `${SAGE}55`,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vertical divider */}
      <div className={`hidden md:block w-px self-stretch my-16 shrink-0 ${isDark ? "bg-[#F2EAD9]/30" : "bg-[#496636]/20"}`} />

      {/* ── RIGHT: QR Section ── */}
      <div className="flex-1 h-full flex flex-col items-center justify-center relative px-8">

        {/* Subtle green ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[220px] pointer-events-none"
          style={{ backgroundColor: "rgba(73,102,54,0.08)" }}
        />

        {/* Mobile brand header */}
        <div className="md:hidden text-center mb-10">
          <h1
            className="font-[family-name:var(--font-playfair)] text-[52px] font-bold leading-none mb-2"
            style={{ color: isDark ? SAGE : PAGE_TEXT }}
          >
            Bee House
          </h1>
          <p
            className="font-[family-name:var(--font-dm-sans)] text-xs tracking-[0.25em] uppercase"
            style={{ color: isDark ? "rgba(255,255,255,0.40)" : SUB_TEXT }}
          >
            Casablanca · Ain Chock
          </p>
        </div>

        {/* Desktop label */}
        <div className="hidden md:block text-center mb-10">
          <span
            className="font-[family-name:var(--font-dm-sans)] text-[10px] font-bold tracking-[0.35em] uppercase"
            style={{ color: `${SAGE}80` }}
          >
            Scannez pour accéder
          </span>
          <h2
            className="font-[family-name:var(--font-playfair)] text-[30px] font-semibold mt-2"
            style={{ color: isDark ? "#ffffff" : PAGE_TEXT }}
          >
            Notre Carte
          </h2>
        </div>

        {/* QR frame */}
        <div
          className="relative p-5 rounded-3xl shadow-lg mb-6 border"
          style={{
            backgroundColor: isDark ? "#FAF6EF" : "#ffffff",
            borderColor: isDark ? "rgba(73,102,54,0.25)" : "rgba(73,102,54,0.15)",
          }}
        >
          {/* Corner brackets */}
          {[
            "top-3 left-3 border-t-2 border-l-2 rounded-tl-lg",
            "top-3 right-3 border-t-2 border-r-2 rounded-tr-lg",
            "bottom-3 left-3 border-b-2 border-l-2 rounded-bl-lg",
            "bottom-3 right-3 border-b-2 border-r-2 rounded-br-lg",
          ].map((cls) => (
            <div
              key={cls}
              className={`absolute w-5 h-5 ${cls}`}
              style={{ borderColor: isDark ? "#496636" : `${SAGE}90` }}
            />
          ))}

          {menuUrl ? (
            <QRCodeSVG value={menuUrl} size={220} bgColor="transparent" fgColor="#1a3012" level="M" />
          ) : (
            <div className="w-[220px] h-[220px] flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl animate-spin" style={{ color: `${SAGE}60` }}>
                progress_activity
              </span>
            </div>
          )}
        </div>

        {/* CTA text */}
        <div className="text-center mb-8">
          <p
            className="font-[family-name:var(--font-playfair)] text-xl font-semibold mb-1"
            style={{ color: isDark ? "#ffffff" : PAGE_TEXT }}
          >
            Scannez &amp; Commandez
          </p>
          <p
            className="font-[family-name:var(--font-dm-sans)] text-xs"
            style={{ color: isDark ? "rgba(255,255,255,0.40)" : SUB_TEXT }}
          >
            Pointez l&apos;appareil photo de votre téléphone
          </p>
        </div>

        {/* Open menu button */}
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-[11px] font-bold tracking-[0.12em] uppercase px-8 py-3.5 rounded-full transition-all hover:brightness-110 hover:-translate-y-0.5"
          style={{
            backgroundColor: "#496636",
            color: SAGE,
            boxShadow: "0 8px 24px rgba(73,102,54,0.25)",
          }}
        >
          <span className="material-symbols-outlined text-sm">restaurant_menu</span>
          Ouvrir la Carte
        </Link>

        {menuUrl && (
          <p
            className="mt-5 font-mono text-[10px] tracking-wider"
            style={{ color: isDark ? "rgba(255,255,255,0.20)" : `${SUB_TEXT}50` }}
          >
            {menuUrl}
          </p>
        )}
      </div>

      {/* Bottom tagline */}
      <div className="absolute bottom-5 left-0 right-0 text-center pointer-events-none">
        <p
          className="font-[family-name:var(--font-playfair)] text-sm italic"
          style={{ color: isDark ? "rgba(242,234,217,0.45)" : "rgba(73,102,54,0.50)" }}
        >
          &ldquo;The Place to Bee&rdquo;
        </p>
      </div>
    </div>
  );
}
