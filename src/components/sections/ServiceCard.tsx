import Link from "next/link";
import type { ReactNode } from "react";

import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

type ServiceCardProps = {
  eyebrow?: string;
  title: string;
  description: string;
  bullets?: string[];
  href: string;
  ctaLabel?: string;
  image?: { src?: string; alt: string; label?: string };
  className?: string;
};

/** Card di servizio: usata in home e nei richiami incrociati fra pagine. */
export function ServiceCard({
  eyebrow,
  title,
  description,
  bullets,
  href,
  ctaLabel = "Scopri di più",
  image,
  className = "",
}: ServiceCardProps) {
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white transition-colors duration-200 hover:border-teal-700/50 ${className}`}
    >
      {image && (
        <ImagePlaceholder
          src={image.src}
          alt={image.alt}
          label={image.label}
          ratio="wide"
          className="rounded-none border-x-0 border-t-0"
          sizes="(min-width: 1024px) 33vw, 100vw"
        />
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-teal-700 uppercase">
            {eyebrow}
          </p>
        )}

        <h3 className="display-3 font-semibold text-ink">
          <Link href={href} className="before:absolute before:inset-0">
            {title}
          </Link>
        </h3>

        <p className="mt-3 text-muted">{description}</p>

        {bullets && bullets.length > 0 && (
          <ul className="mt-5 space-y-2 text-sm text-ink-600">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2.5">
                <Check />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-6 flex items-center gap-2 pt-1 text-sm font-medium text-teal-700 transition-transform duration-200 group-hover:translate-x-0.5">
          {ctaLabel}
          <Arrow />
        </p>
      </div>
    </article>
  );
}

function Check(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="mt-[0.3rem] h-3.5 w-3.5 shrink-0 text-teal-700"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m4 10.5 4 4 8-9" />
    </svg>
  );
}

function Arrow(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10h11m0 0-4-4m4 4-4 4" />
    </svg>
  );
}
