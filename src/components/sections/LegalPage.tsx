import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export type LegalSection = {
  heading: string;
  body: ReactNode;
};

type LegalPageProps = {
  title: string;
  intro: string;
  updatedNote?: string;
  sections: LegalSection[];
};

/**
 * Impaginazione condivisa delle pagine legali.
 *
 * ATTENZIONE — I testi legali del sito sono PLACEHOLDER strutturali.
 * Vanno sostituiti con documenti redatti sui dati reali del titolare del
 * trattamento e sugli strumenti effettivamente utilizzati.
 */
export function LegalPage({
  title,
  intro,
  updatedNote = "Documento non ancora definitivo.",
  sections,
}: LegalPageProps) {
  return (
    <>
      <section className="border-b border-line bg-cream">
        <Container className="pt-28 pb-14 sm:pt-32 sm:pb-16">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: title }]}
          />
          <h1 className="display-2 mt-8 font-semibold text-ink">{title}</h1>
          <p className="mt-5 lead max-w-2xl text-muted">{intro}</p>
          <p className="mt-6 text-xs text-muted">{updatedNote}</p>
        </Container>
      </section>

      <Section tone="white" spacing="md">
        <div
          role="note"
          className="rounded-lg border border-line-strong bg-sand p-5 sm:p-6"
        >
          <p className="text-sm font-semibold text-ink">
            Testo provvisorio da completare
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Questa pagina contiene una struttura di riferimento, non un documento
            legale definitivo. Prima della pubblicazione va completata con i dati
            reali del titolare del trattamento, gli strumenti effettivamente
            utilizzati e una verifica professionale.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="display-3 font-semibold text-ink">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 leading-relaxed text-muted">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
