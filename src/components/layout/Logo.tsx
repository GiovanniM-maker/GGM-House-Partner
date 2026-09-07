import Image from "next/image";
import Link from "next/link";

import { site } from "@/content/site";

type LogoProps = {
  tone?: "light" | "dark";
  /** Se false, restituisce solo il segno grafico senza link. */
  asLink?: boolean;
  /** Altezza resa del logo. La larghezza segue le proporzioni del file. */
  size?: "sm" | "md" | "lg";
  className?: string;
};

const heights = { sm: "h-9", md: "h-11", lg: "h-16" } as const;

/**
 * Marchio GGM.
 *
 * Usa il file indicato in `site.logo`. Finché non è impostato mostra un
 * lettering di riserva, così il sito resta presentabile senza logo e non
 * compare mai un'immagine rotta.
 */
export function Logo({
  tone = "light",
  asLink = true,
  size = "md",
  className = "",
}: LogoProps) {
  const isDark = tone === "dark";

  const content = site.logo ? (
    <Image
      src={site.logo.src}
      alt={site.fullName}
      width={site.logo.width}
      height={site.logo.height}
      priority
      className={`w-auto ${heights[size]} ${
        // Il logo è pensato su fondo chiaro: sulle sezioni scure si schiarisce
        // il navy senza alterare l'oro.
        isDark ? "brightness-0 invert" : ""
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
