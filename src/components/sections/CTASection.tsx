import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type CTASectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  cta: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** Nota discreta: usata per ricordare che non c'è impegno. */
  note?: string;
  tone?: "ink" | "gold";
};

/** Chiusura di pagina. Presente su tutte le pagine con la CTA pertinente. */
export function CTASection({
  eyebrow,
  title,
  description,
  cta,
  secondary,
  note = "Compilare il modulo non comporta alcun impegno.",
  tone = "ink",
}: CTASectionProps) {
  const isInk = tone === "ink";

  return (
    <section
      className={`relative overflow-hidden ${isInk ? "bg-ink" : "bg-gold-50"}`}
    >
      {isInk && (
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-30" />
      )}
      <Container className="relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          {eyebrow && (
            <p
              className={`mb-4 text-xs font-semibold tracking-[0.2em] uppercase ${
                isInk ? "text-gold" : "text-gold-700"
              }`}
            >
              {eyebrow}
            </p>
          )}
          <h2
            className={`display-2 font-semibold ${isInk ? "text-white" : "text-ink"}`}
          >
            {title}
          </h2>
          {description && (
            <p
              className={`mt-5 lead ${isInk ? "text-cream/85" : "text-ink-600"}`}
            >
              {description}
            </p>
          )}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <ButtonLink
              href={cta.href}
              size="lg"
              variant={isInk ? "accent" : "primary"}
            >
              {cta.label}
            </ButtonLink>
            {secondary && (
              <ButtonLink
                href={secondary.href}
                size="lg"
                variant={isInk ? "onDark" : "outline"}
              >
                {secondary.label}
              </ButtonLink>
            )}
          </div>
          {note && (
            <p
              className={`mt-6 text-sm ${isInk ? "text-cream/60" : "text-muted"}`}
            >
              {note}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
