import type { ReactNode } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

type HeroCta = {
  label: string;
  href: string;
};

type HeroProps = {
  eyebrow?: string;
  /** H1 della pagina: uno solo per pagina. */
  title: ReactNode;
  description?: ReactNode;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  /** Nota discreta sotto le CTA (es. copertura o assenza di impegno). */
  note?: string;
  breadcrumbs?: { label: string; href?: string }[];
  /** Immagine affiancata al testo. Se assente, hero a piena larghezza. */
  image?: {
    src?: string;
    alt: string;
    label?: string;
  };
  variant?: "dark" | "light";
};

export function Hero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  note,
  breadcrumbs,
  image,
  variant = "dark",
}: HeroProps) {
  const isDark = variant === "dark";
  const hasImage = Boolean(image);

  return (
    <section
      className={`relative overflow-hidden ${
        isDark ? "bg-ink text-teal-50" : "bg-cream text-ink"
      }`}
    >
      {isDark && (
        <>
          <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40" />
          <div
            aria-hidden="true"
            className="absolute -top-40 -right-24 h-[32rem] w-[32rem] rounded-full bg-teal/15 blur-3xl"
          />
        </>
      )}

      <Container
        size="wide"
        className="relative z-10 pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24"
      >
        {breadcrumbs && (
          <div className={`mb-8 ${isDark ? "[&_*]:!text-teal-50/70" : ""}`}>
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}

        <div
          className={
            hasImage
              ? "grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16"
              : "max-w-4xl"
          }
        >
          <div className="enter">
            {eyebrow && (
              <p
                className={`mb-5 text-xs font-semibold tracking-[0.2em] uppercase ${
                  isDark ? "text-teal" : "text-teal-700"
                }`}
              >
                {eyebrow}
              </p>
            )}

            <h1
              className={`display-1 font-semibold ${isDark ? "text-white" : "text-ink"}`}
            >
              {title}
            </h1>

            {description && (
              <div
                className={`mt-6 lead max-w-2xl ${
                  isDark ? "text-teal-50/85" : "text-muted"
                }`}
              >
                {typeof description === "string" ? (
                  <p>{description}</p>
                ) : (
                  description
                )}
              </div>
            )}

            {(primaryCta || secondaryCta) && (
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                {primaryCta && (
                  <ButtonLink
                    href={primaryCta.href}
                    variant={isDark ? "accent" : "primary"}
                    size="lg"
                  >
                    {primaryCta.label}
                  </ButtonLink>
                )}
                {secondaryCta && (
                  <ButtonLink
                    href={secondaryCta.href}
                    variant={isDark ? "onDark" : "outline"}
                    size="lg"
                  >
                    {secondaryCta.label}
                  </ButtonLink>
                )}
              </div>
            )}

            {note && (
              <p
                className={`mt-6 max-w-md text-sm ${
                  isDark ? "text-teal-50/60" : "text-muted"
                }`}
              >
                {note}
              </p>
            )}
          </div>

          {image && (
            <div className="enter [animation-delay:120ms]">
              <ImagePlaceholder
                src={image.src}
                alt={image.alt}
                label={image.label}
                ratio="portrait"
                tone={isDark ? "dark" : "light"}
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="lg:rounded-xl"
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
