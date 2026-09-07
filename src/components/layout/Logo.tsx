"use client";

import Link from "next/link";
import { useCallback, useState } from "react";

import { site } from "@/content/site";

type LogoProps = {
  tone?: "light" | "dark";
  /** Se false, restituisce solo il marchio senza link. */
  asLink?: boolean;
  /** Altezza resa. La larghezza segue le proporzioni del file. */
  size?: "sm" | "md" | "lg";
  className?: string;
};

const heights = { sm: "h-9", md: "h-11", lg: "h-16" } as const;

/**
 * Marchio GGM.
 *
 * Usa il file indicato in `site.logo`. Se il file non esiste ancora, o non si
 * carica, mostra il lettering di riserva: il sito resta presentabile e non
 * compare mai l'icona di immagine rotta.
 */
export function Logo({
  tone = "light",
  asLink = true,
  size = "md",
  className = "",
}: LogoProps) {
  const isDark = tone === "dark";
  const [failed, setFailed] = useState(false);

  // Alle altezze ridotte serve la versione compatta: il payoff del lockup
  // completo, sotto i 50px, non si legge più.
  const lockup = size === "lg" ? site.logo : (site.logoCompact ?? site.logo);
  const source = isDark ? (site.logoDark ?? lockup) : lockup;
  const needsLightening = isDark && !site.logoDark;

  // Se il file manca, l'immagine fallisce mentre il browser legge l'HTML,
  // cioè prima che React agganci `onError`. Il controllo alla creazione del
  // nodo intercetta anche quel caso: un'immagine rotta ha `naturalWidth` 0.
  const checkLoaded = useCallback((node: HTMLImageElement | null) => {
    if (node && node.complete && node.naturalWidth === 0) setFailed(true);
  }, []);

  const content =
    source && !failed ? (
      // Immagine non ottimizzata di proposito: le proporzioni del logo non
      // sono note in anticipo e `onError` permette la ricaduta sul lettering.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        ref={checkLoaded}
        src={source}
        alt={site.fullName}
        onError={() => setFailed(true)}
        className={`w-auto ${heights[size]} ${
          needsLightening ? "brightness-0 invert" : ""
        } ${className}`}
      />
    ) : (
      <span className={`flex items-baseline gap-2.5 ${className}`}>
        <span
          className={`font-serif text-2xl leading-none font-semibold tracking-tight ${
            isDark ? "text-white" : "text-ink"
          }`}
        >
          GGM
        </span>
        <span
          aria-hidden="true"
          className={`hidden h-4 w-px sm:block ${isDark ? "bg-white/25" : "bg-gold"}`}
        />
        <span
          className={`hidden text-[0.7rem] font-medium tracking-[0.16em] uppercase sm:block ${
            isDark ? "text-cream/70" : "text-muted"
          }`}
        >
          {site.tagline}
        </span>
      </span>
    );

  if (!asLink) return content;

  return (
    <Link
      href="/"
      aria-label={`${site.fullName}, vai alla home`}
      className="shrink-0"
    >
      {content}
    </Link>
  );
}
