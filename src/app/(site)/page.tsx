import Link from "next/link";

import { CTASection } from "@/components/sections/CTASection";
import { CoverageBlock } from "@/components/sections/CoverageBlock";
import { ExperienceBlock } from "@/components/sections/ExperienceBlock";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FeatureBlock } from "@/components/sections/FeatureBlock";
import { Hero } from "@/components/sections/Hero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { RouteCards } from "@/components/sections/RouteCards";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { allFaqItems } from "@/content/faq";
import { primaryCta, routes, site } from "@/content/site";
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

const percorsi = [
  {
    label: "Voglio ristrutturare",
    description:
      "Ci sono lavori da fare e ti serve qualcuno che li segua sul posto.",
    href: routes.ristrutturazione,
  },
  {
    label: "Voglio metterla a reddito",
    description:
      "La casa è utilizzabile e vorresti che iniziasse a produrre qualcosa.",
    href: routes.propertyManagement,
  },
  {
    label: "Voglio fare entrambe le cose",
    description:
      "Prima capire cosa può diventare, poi sistemarla e gestirla.",
    href: routes.integrato,
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
        description="Ristrutturiamo, valorizziamo e gestiamo immobili in Sicilia, anche se vivi lontano. Un unico referente per seguire la tua casa, dai lavori alla messa a reddito."
        primaryCta={primaryCta}
        secondaryCta={{ label: "Come funziona", href: routes.comeFunziona }}
        note="Raccontaci la casa in pochi minuti. Nessun impegno."
        image={{
          alt: "Architettura mediterranea contemporanea in Sicilia",
          label: "Foto hero: esterno di una casa siciliana, luce naturale",
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

      {/* Router */}
      <Section tone="ink" spacing="lg" id="percorsi">
        <SectionHeader
          eyebrow="Scegli il punto di partenza"
          title="Cosa vuoi fare con la tua casa?"
          description="Tre percorsi diversi. Se non sai ancora quale sia il tuo, va bene lo stesso: si parte comunque dall'immobile."
          tone="dark"
        />
        <RouteCards routes={percorsi} tone="dark" className="mt-12" />
      </Section>

      {/* Tre servizi */}
      <Section tone="cream" spacing="lg" size="wide">
        <SectionHeader
          eyebrow="Servizi"
          title="Tre modi di occuparci della tua casa"
          description="Puoi affidarci una parte o l'intero percorso. Il referente resta lo stesso."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <ServiceCard
            eyebrow="Ristrutturazione"
            title="La tua casa in Sicilia. I lavori, li seguiamo noi."
            description="Dal sopralluogo alla consegna, con un referente unico che coordina cantiere, tecnici e artigiani."
            bullets={[
              "Sopralluogo e analisi dello stato reale",
              "Preventivo e pianificazione dei lavori",
              "Coordinamento del cantiere e aggiornamenti",
            ]}
            href={routes.ristrutturazione}
            image={{
              alt: "Lavori di ristrutturazione di un interno",
              label: "Foto: cantiere o interno ristrutturato",
            }}
          />
          <ServiceCard
            eyebrow="Property Management"
            title="Hai una casa che non utilizzi? Può diventare qualcosa di più."
            description="Gestione online in tutta la Sicilia e attività sul posto dove abbiamo una rete affidabile."
            bullets={[
              "Annunci, prezzi, calendario e prenotazioni",
              "Comunicazione con gli ospiti e report",
              "Check-in, pulizie e controlli dove disponibili",
            ]}
            href={routes.propertyManagement}
            image={{
              alt: "Interno di una casa preparata per l'ospitalità",
              label: "Foto: interno curato, pronto per gli ospiti",
            }}
          />
          <ServiceCard
            eyebrow="Percorso integrato"
            title="Prima di ristrutturare, capiamo cosa può diventare."
            description="Analisi dell'immobile e del suo potenziale prima di decidere quanto e come investire."
            bullets={[
              "Analisi di immobile, zona e obiettivo",
              "Lavori proporzionati alla strategia scelta",
              "Preparazione, messa online e gestione",
            ]}
            href={routes.integrato}
            image={{
              alt: "Casa siciliana da valorizzare",
              label: "Foto: immobile prima dell'intervento",
            }}
          />
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
            description="GGM nasce oggi come brand: non abbiamo casi studio da mostrare e non ne inventiamo. Quello che portiamo è l'esperienza professionale dei fondatori, maturata prima di questo progetto."
            points={[
              "Anni di lavoro in ristrutturazioni, cantieri e rapporti con artigiani e tecnici sul territorio siciliano.",
              "Competenze in marketing, tecnologia, automazione e gestione di attività online.",
              "Una rete di professionisti locali costruita nel tempo, non improvvisata per l'occasione.",
            ]}
          />
          <ImagePlaceholder
            alt="Territorio siciliano"
            label="Foto: territorio, paesaggio o dettaglio architettonico reale"
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
        title="Hai una casa in Sicilia? Raccontaci dove si trova e cosa vorresti farne."
        description="Ci bastano poche informazioni per capire se possiamo esserti utili. Se non è il caso, te lo diciamo."
        cta={primaryCta}
      />
    </>
  );
}
