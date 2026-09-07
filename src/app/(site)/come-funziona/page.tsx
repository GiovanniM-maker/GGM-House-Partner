import { CTASection } from "@/components/sections/CTASection";
import { CoverageBlock } from "@/components/sections/CoverageBlock";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FeatureBlock } from "@/components/sections/FeatureBlock";
import { Hero } from "@/components/sections/Hero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { faqByTag } from "@/content/faq";
import { primaryCta, routes } from "@/content/site";
import { faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Come funziona",
  description:
    "Cosa succede dopo il primo contatto: analisi, ricontatto, eventuale sopralluogo e definizione del percorso. Chi fa cosa fra GGM e la rete di professionisti.",
  path: routes.comeFunziona,
});

const percorsi = [
  {
    title: "Ristrutturare",
    href: routes.ristrutturazione,
    steps: [
      "Contatto",
      "Sopralluogo",
      "Analisi",
      "Preventivo",
      "Lavori",
      "Consegna",
    ],
  },
  {
    title: "Mettere a reddito",
    href: routes.propertyManagement,
    steps: [
      "Contatto",
      "Analisi",
      "Strategia",
      "Setup",
      "Pubblicazione",
      "Gestione",
    ],
  },
  {
    title: "Entrambe le cose",
    href: routes.integrato,
    steps: [
      "Analisi",
      "Strategia",
      "Ristrutturazione",
      "Preparazione",
      "Messa online",
      "Gestione",
    ],
  },
];

const dopoIlContatto = [
  {
    title: "Riceviamo le informazioni",
    description:
      "Quello che ci racconti nel modulo: dove si trova la casa, com'è messa, cosa vorresti farne.",
  },
  {
    title: "Analizziamo",
    description:
      "Guardiamo immobile, zona e obiettivo e verifichiamo se rientra nelle aree e nei servizi che copriamo.",
  },
  {
    title: "Ti ricontattiamo",
    description:
      "Ti diciamo cosa vediamo, cosa manca per decidere e quali strade hanno senso. Anche quando la risposta è no.",
  },
  {
    title: "Eventuale sopralluogo",
    description:
      "Se c'è qualcosa di concreto da valutare e la casa è in zona coperta, veniamo a vederla.",
  },
  {
    title: "Definiamo il percorso",
    description:
      "Attività, tempi e condizioni per iscritto. Da qui in avanti si parte solo se sei d'accordo.",
  },
];

const chiFaCosa = [
  {
    title: "GGM",
    description:
      "Coordinamento del percorso, rapporto diretto con il proprietario, analisi, parte digitale e gestione online. È il tuo unico riferimento.",
  },
  {
    title: "La rete locale",
    description:
      "Tecnici, artigiani, professionisti abilitati e operatori che eseguono le lavorazioni e le attività fisiche, ciascuno per la propria competenza.",
  },
];

const comunicazione = [
  {
    title: "Aggiornamenti",
    description:
      "Ti diciamo a che punto siamo senza che tu debba rincorrerci.",
  },
  {
    title: "Decisioni condivise",
    description:
      "Quando serve una scelta, arriva con opzioni e conseguenze, prima che venga presa.",
  },
  {
    title: "Documentazione",
    description:
      "Quello che viene fatto resta tracciato, durante il percorso e dopo.",
  },
  {
    title: "Comunicazione chiara",
    description:
      "Niente gergo tecnico usato per non rispondere. Se una cosa non si può fare, lo diciamo.",
  },
];

export default function ComeFunzionaPage() {
  const faqItems = faqByTag("operativita");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqItems)) }}
      />

      <Hero
        variant="light"
        eyebrow="Come funziona"
        title="Come lavoriamo."
        description="Nessuna scatola nera: qui trovi cosa succede dal momento in cui ci scrivi, chi fa cosa e come comunichiamo durante il percorso."
        primaryCta={primaryCta}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Come funziona" }]}
      />

      {/* Tre percorsi */}
      <Section tone="white" spacing="lg" size="wide">
        <SectionHeader
          eyebrow="Tre percorsi"
          title="Il punto di partenza cambia, il metodo no"
          description="A seconda di cosa vuoi fare con la casa, il percorso ha passaggi diversi. In tutti e tre l'analisi viene prima delle decisioni."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {percorsi.map((percorso) => (
            <article
              key={percorso.title}
              className="reveal flex flex-col rounded-lg border border-line bg-cream p-6 sm:p-7"
            >
              <h3 className="display-3 font-semibold text-ink">
                {percorso.title}
              </h3>
              <ol className="mt-6 flex-1 space-y-3">
                {percorso.steps.map((step, index) => (
                  <li key={step} className="flex items-center gap-3 text-sm">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line-strong text-[0.65rem] font-semibold text-gold-700">
                      {index + 1}
                    </span>
                    <span className="text-ink-600">{step}</span>
                  </li>
                ))}
              </ol>
              <ButtonLink
                href={percorso.href}
                variant="outline"
                className="mt-7 w-fit"
              >
                Dettagli
              </ButtonLink>
            </article>
          ))}
        </div>
      </Section>

      {/* Dopo il primo contatto */}
      <Section tone="ink" spacing="lg" size="wide">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <SectionHeader
            eyebrow="Dopo il primo contatto"
            title="Cosa succede quando ci scrivi"
            description="È la domanda che ci fanno più spesso. La risposta è sempre la stessa, per tutti."
            tone="dark"
          />
          <ProcessSteps steps={dopoIlContatto} layout="timeline" tone="dark" />
        </div>
      </Section>

      {/* Chi fa cosa */}
      <Section tone="cream" spacing="lg" size="wide">
        <SectionHeader
          eyebrow="Chi fa cosa"
          title="GGM coordina. Le lavorazioni le fanno professionisti qualificati."
          description="Non ci presentiamo come un'impresa che esegue ogni tipo di intervento: non lo saremmo e non sarebbe un vantaggio per te."
        />
        <FeatureBlock
          features={chiFaCosa}
          columns={2}
          variant="card"
          className="mt-12"
        />
      </Section>

      {/* Comunicazione */}
      <Section tone="white" spacing="lg" size="wide">
        <SectionHeader
          eyebrow="Comunicazione"
          title="Come ti teniamo aggiornato"
          description="Se vivi lontano, la comunicazione non è un dettaglio di servizio: è il servizio."
        />
        <FeatureBlock features={comunicazione} columns={4} className="mt-12" />
      </Section>

      {/* Copertura */}
      <Section tone="cream" spacing="lg" size="wide">
        <CoverageBlock />
      </Section>

      {/* FAQ */}
      <Section tone="white" spacing="lg">
        <SectionHeader eyebrow="FAQ" title="Domande su operatività e primo contatto" />
        <FAQAccordion items={faqItems} className="mt-10" />
      </Section>

      <CTASection
        eyebrow="Primo passo"
        title="Hai una casa in Sicilia? Raccontaci cosa vorresti farne."
        description="Bastano pochi minuti. Il resto lo facciamo noi."
        cta={primaryCta}
      />
    </>
  );
}
