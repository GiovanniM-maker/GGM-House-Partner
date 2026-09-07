import Link from "next/link";

import { site } from "@/content/site";

type LogoProps = {
  tone?: "light" | "dark";
  /** Se false, restituisce solo il lettering (senza link). */
  asLink?: boolean;
  className?: string;
};

/**
 * Lettering di brand.
 * PLACEHOLDER: qui andrà il logo definitivo (SVG) quando sarà disponibile.
 */
export function Logo({
  tone = "light",
  asLink = true,
  className = "",
}: LogoProps) {
  const isDark = tone === "dark";

  const content = (
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
        className={`hidden h-4 w-px sm:block ${isDark ? "bg-white/25" : "bg-line-strong"}`}
      />
      <span
        className={`hidden text-[0.7rem] font-medium tracking-[0.16em] uppercase sm:block ${
          isDark ? "text-teal-50/70" : "text-muted"
        }`}
      >
        {site.tagline}
      </span>
    </span>
  );

  if (!asLink) return content;

  return (
    <Link href="/" aria-label={`${site.fullName} — home`} className="shrink-0">
      {content}
    </Link>
  );
}
