import Link from "next/link";

import { CTASection } from "@/components/sections/CTASection";
import { CoverageBlock } from "@/components/sections/CoverageBlock";
import { ExperienceBlock } from "@/components/sections/ExperienceBlock";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FeatureBlock } from "@/components/sections/FeatureBlock";
import { Hero } from "@/components/sections/Hero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { allFaqItems } from "@/content/faq";
import { ctas, routes, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: site.metaTitle,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

const situazioni = [
  {
    title: "Una casa da ristrutturare",
    description:
      "L'immobile c'è, i lavori no. Trovare imprese, seguire il cantiere e controllare i tempi da lontano diventa un secondo lavoro.",
  },
  {
    title: "Una casa vuota",
    description:
      "Nessuno ci vive, ma le spese restano. Ogni anno che passa la casa si deteriora un po' di più.",
  },
  {
    title: "Una casa usata poche settimane l'anno",
    description:
      "La usi d'estate e per il resto dell'anno resta chiusa. Potrebbe fare qualcosa nei mesi in cui è vuota.",
  },
  {
    title: "Un'idea di metterla a reddito",
    description:
      "Ci pensi da tempo, ma tra annunci, prezzi, ospiti, pulizie e manutenzione non sai da dove iniziare.",
  },
];

/** Cosa riceve il proprietario con l'analisi gratuita. */
const cosaAnalizziamo = [
  {
    title: "Ricavi",
    description: "Quanto genera oggi e quale potenziale può avere.",
  },
  {
    title: "Costi",
    description: "Commissioni dei portali e principali costi di gestione.",
  },
  {
    title: "Performance",
    description: "Occupazione, pricing, posizionamento e qualità dell'annuncio.",
  },
  {
    title: "Opportunità",
    description: "Dove potrebbe esserci margine di miglioramento.",
  },
];

const modello = [
  {
    title: "Territorio",
    description:
      "Conoscenza diretta dei luoghi, delle persone e di come si lavora davvero in Sicilia. È quello che permette di esserci quando serve una presenza fisica.",
  },
  {
    title: "Digitale",
    description:
      "Analisi, annunci, prezzi, calendari, comunicazione e report. È quello che permette di seguire una casa con continuità anche a distanza.",
  },
  {
    title: "Network",
    description:
      "Tecnici, artigiani, professionisti e operatori locali. GGM coordina; le lavorazioni specialistiche le eseguono persone qualificate per farle.",
  },
];

const comeFunziona = [
  {
    title: "Ci racconti la casa",
    description:
      "Dove si trova, com'è messa, cosa vorresti farne. Bastano pochi minuti.",
  },
  {
    title: "Analizziamo",
    description:
      "Guardiamo immobile, zona e obiettivo, e capiamo se possiamo essere utili.",
  },
  {
    title: "Ti ricontattiamo",
    description:
      "Ti diciamo cosa vediamo, cosa manca e quali strade hanno senso.",
  },
  {
    title: "Se serve, veniamo a vederla",
    description:
      "Il sopralluogo arriva quando c'è qualcosa di concreto da valutare.",
  },
];

const perche = [
  {
    title: "Un unico referente",
    description:
      "Una persona sola con cui parlare, invece di coordinare imprese, tecnici e fornitori da lontano.",
  },
  {
    title: "Conoscenza del territorio",
    description:
      "Sappiamo come si muovono le cose in Sicilia, cosa è realistico e cosa non lo è.",
  },
  {
    title: "Digitale dove serve davvero",
    description:
      "Strumenti online per gestire, misurare e comunicare. Non per sembrare moderni.",
  },
  {
    title: "Prima analizziamo, poi decidiamo",
    description:
      "Nessun preventivo a distanza e nessun percorso deciso prima di aver capito di che casa si tratta.",
  },
];

export default function HomePage() {
  const faqBrevi = allFaqItems.filter((item) =>
    [
      "Dove operate con i lavori?",
      "Gestite case in tutta la Sicilia?",
      "Garantite un rendimento?",
      "Come funziona il primo contatto?",
    ].includes(item.question),
  );

  return (
    <>
      <Hero
        eyebrow={site.positioning}
        title="Hai una casa in Sicilia? Ci pensiamo noi."
        description="Gestiamo annunci, prezzi, calendario, prenotazioni e ospiti della tua casa in Sicilia, anche se vivi lontano. Si parte da un'analisi gratuita dei numeri del tuo immobile."
        primaryCta={ctas.analisi}
        secondaryCta={{
          label: "Property Management",
          href: routes.propertyManagement,
        }}
        note="Gratis. Senza impegno. Analisi personalizzata."
        image={{
          src: "/images/home-hero.jpg",
          alt: "Casa in pietra calcarea nella campagna ragusana, con muretto a secco e ulivi, alla luce del tardo pomeriggio",
        }}
      />

      {/* Problema */}
      <Section tone="cream" spacing="lg">
        <SectionHeader
          eyebrow="Il punto di partenza"
          title="Avere una casa in Sicilia è una cosa. Occuparsene è un'altra."
          description="Le situazioni cambiano, il problema di fondo è quasi sempre lo stesso: la casa è lì e tu no."
        />
        <FeatureBlock features={situazioni} columns={4} className="mt-12" />
      </Section>

      {/* Da dove si parte */}
      <Section tone="ink" spacing="lg" size="wide">
        <SectionHeader
          eyebrow="Da dove si parte"
          title="Prima i numeri della tua casa. Poi tutto il resto."
          description="Partiamo dalla gestione da remoto, che è la parte che pesa di più sui risultati e che possiamo seguire ovunque si trovi la casa in Sicilia. E prima ancora, da un'analisi gratuita."
          tone="dark"
        />

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cosaAnalizziamo.map((voce, indice) => (
            <li
              key={voce.title}
              className="reveal flex flex-col rounded-lg border border-white/15 bg-white/5 p-6"
            >
              <span className="text-xs font-semibold tracking-[0.16em] text-gold">
                {String(indice + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-white">
                {voce.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/75">
                {voce.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <ButtonLink href={ctas.analisi.href} variant="accent" size="lg">
            {ctas.analisi.label}
          </ButtonLink>
          <ButtonLink
            href={routes.propertyManagement}
            variant="onDark"
            size="lg"
          >
            Come gestiamo la tua casa
          </ButtonLink>
        </div>
      </Section>

      {/* Modello GGM */}
      <Section tone="white" spacing="lg" size="wide">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <SectionHeader
              eyebrow="Il modello GGM"
              title="Territorio, digitale e network. Insieme."
              description="Da soli, questi tre elementi non bastano. Un'impresa locale non gestisce un annuncio online; un gestore online non entra in un cantiere. GGM sta nel mezzo, ed è lì che il proprietario ha bisogno di qualcuno."
            />
            <ButtonLink
              href={routes.comeFunziona}
              variant="outline"
              className="mt-8"
            >
              Come lavoriamo
            </ButtonLink>
          </div>
          <FeatureBlock features={modello} columns={2} className="lg:pt-4" />
        </div>
      </Section>

      {/* Come funziona */}
      <Section tone="sand" spacing="lg" size="wide">
        <SectionHeader
          eyebrow="Come funziona"
          title="Dal primo messaggio al primo passo concreto"
          description="Nessun automatismo, nessun preventivo generato a distanza. Prima capiamo, poi proponiamo."
        />
        <ProcessSteps steps={comeFunziona} columns={4} className="mt-12" />
        <p className="mt-8 text-sm text-muted">
          Il percorso completo, servizio per servizio, è descritto in{" "}
          <Link
            href={routes.comeFunziona}
            className="text-gold-700 underline underline-offset-4"
          >
            Come funziona
          </Link>
          .
        </p>
      </Section>

      {/* Esperienza */}
      <Section tone="cream" spacing="lg" size="wide">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16">
          <ExperienceBlock
            title="Un progetto nuovo, costruito su esperienza reale."
            description="GGM nasce oggi come brand: non abbiamo casi studio da mostrare e non ne inventiamo. Quello che portiamo è l'esperienza professionale del fondatore, maturata prima di questo progetto."
            points={[
              "Anni di lavoro in ristrutturazioni, cantieri e rapporti con artigiani e tecnici sul territorio siciliano.",
              "Competenze in marketing, tecnologia, automazione e gestione di attività online.",
              "Una rete di professionisti locali costruita nel tempo, non improvvisata per l'occasione.",
            ]}
          />
          <ImagePlaceholder
            src="/images/home-territorio.jpg"
            alt="Veduta di un paese collinare del sud est siciliano all'ora dorata, con tetti in pietra e uliveti"
            ratio="photo"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </div>
      </Section>

      {/* Perché GGM */}
      <Section tone="ink" spacing="lg" size="wide">
        <SectionHeader
          eyebrow="Perché GGM"
          title="Quattro cose su cui non transigiamo"
          tone="dark"
        />
        <FeatureBlock
          features={perche}
          columns={4}
          tone="dark"
          className="mt-12"
        />
      </Section>

      {/* Copertura */}
      <Section tone="cream" spacing="lg" size="wide">
        <CoverageBlock />
      </Section>

      {/* FAQ brevi */}
      <Section tone="white" spacing="lg">
        <SectionHeader
          eyebrow="Domande frequenti"
          title="Le domande che ci fanno più spesso"
        />
        <FAQAccordion items={faqBrevi} className="mt-10" />
        <p className="mt-8">
          <Link
            href={routes.faq}
            className="text-gold-700 underline underline-offset-4"
          >
            Tutte le domande frequenti
          </Link>
        </p>
      </Section>

      <CTASection
        eyebrow="Primo passo"
        title="Scopri se il tuo immobile può rendere di più."
        description="Ci bastano poche informazioni per analizzare i numeri della tua casa. Se non conviene affidarcela, te lo diciamo."
        cta={ctas.analisi}
      />
    </>
  );
}
