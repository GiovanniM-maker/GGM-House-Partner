import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { SectionHeader } from "@/components/sections/SectionHeader";

export type ExperienceImage = {
  /** Percorso della foto reale. Se assente resta un segnaposto sostituibile. */
  src?: string;
  alt: string;
  label?: string;
};

type ExperienceBlockProps = {
  eyebrow?: string;
  title: string;
  description: string;
  points?: string[];
  images?: ExperienceImage[];
  /**
   * Disclaimer obbligatorio: chiarisce che si tratta di esperienza
   * professionale pregressa dei fondatori e non di lavori realizzati da GGM.
   */
  disclaimer?: string;
  tone?: "light" | "dark";
};

const DEFAULT_DISCLAIMER =
  "Le immagini e le esperienze in questa sezione documentano l'attività professionale pregressa dei fondatori. Non sono lavori realizzati da GGM come società né casi studio del progetto, che è nuovo.";

export function ExperienceBlock({
  eyebrow = "Esperienza",
  title,
  description,
  points,
  images,
  disclaimer = DEFAULT_DISCLAIMER,
  tone = "light",
}: ExperienceBlockProps) {
  const isDark = tone === "dark";

  return (
    <div>
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        tone={tone}
      />

      {points && points.length > 0 && (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((point) => (
            <li
              key={point}
              className={`reveal border-t pt-4 text-sm leading-relaxed ${
                isDark
                  ? "border-white/15 text-cream/80"
                  : "border-line text-ink-600"
              }`}
            >
              {point}
            </li>
          ))}
        </ul>
      )}

      {images && images.length > 0 && (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <ImagePlaceholder
              key={`${image.alt}-${index}`}
              src={image.src}
              alt={image.alt}
              label={image.label}
              ratio="photo"
              tone={isDark ? "dark" : "light"}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          ))}
        </div>
      )}

      {disclaimer && (
        <p
          className={`mt-6 max-w-3xl border-l-2 pl-4 text-xs leading-relaxed ${
            isDark
              ? "border-gold/50 text-cream/60"
              : "border-line-strong text-muted"
          }`}
        >
          {disclaimer}
        </p>
      )}
    </div>
  );
}
