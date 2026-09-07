import { CTASection } from "@/components/sections/CTASection";
import { CoverageBlock } from "@/components/sections/CoverageBlock";
import { ExperienceBlock } from "@/components/sections/ExperienceBlock";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { CheckList, FeatureBlock } from "@/components/sections/FeatureBlock";
import { Hero } from "@/components/sections/Hero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Section } from "@/components/ui/Section";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { faqByTag } from "@/content/faq";
import { ctas, routes } from "@/content/site";
import { faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Ristrutturazione casa in Sicilia",
  description:
    "Ristrutturazioni e lavori coordinati nella provincia di Ragusa, anche per proprietari che vivono lontano. Un unico referente dal sopralluogo alla consegna.",
  path: routes.ristrutturazione,
});

const problemi = [
  {
    title: "Trovare le persone giuste",
    description:
      "Da lontano è difficile capire di chi fidarsi. Un nome sbagliato costa tempo, soldi e lavori da rifare.",
  },
  {
    title: "Seguire il cantiere",
    description:
      "Le decisioni si prendono sul posto, spesso in giornata. Se non c'è nessuno, si fermano i lavori o si decide senza di te.",
  },
  {
    title: "Materiali e scelte",
    description:
      "Scegliere finiture, sanitari e rivestimenti a distanza, senza vederli, porta quasi sempre a compromessi.",
  },
  {
    title: "Controllare tempi e costi",
    description:
      "Senza qualcuno che verifichi l'avanzamento, i tempi si allungano e le varianti si accumulano.",
  },
];

const cosaGestiamo = [
  "Ristrutturazioni di interni, complete o parziali",
  "Bagni e cucine",
  "Pavimenti e rivestimenti",
  "Tinteggiature e finiture",
  "Opere murarie",
  "Facciate e interventi esterni",
  "Coordinamento degli impianti tramite professionisti qualificati",
  "Rapporti con i tecnici per le pratiche necessarie",
];

const processo = [
  {
    title: "Sopralluogo",
    description:
      "Veniamo a vedere la casa. Stato reale, vincoli, criticità e possibilità.",
  },
  {
    title: "Analisi",
    description:
      "Capiamo cosa serve davvero e cosa può aspettare, in base a quello che vuoi ottenere.",
  },
  {
    title: "Preventivo",
    description:
      "Lavorazioni, tempi e costi messi per iscritto, senza voci generiche.",
  },
  {
    title: "Pianificazione",
    description:
      "Ordine degli interventi, professionisti coinvolti e calendario del cantiere.",
  },
  {
    title: "Lavori",
    description:
      "Coordinamento quotidiano sul posto, con aggiornamenti e decisioni condivise.",
  },
  {
    title: "Consegna",
    description:
      "Verifica finale dei lavori e documentazione di quello che è stato fatto.",
  },
];

const daLontano = [
  {
    title: "Un solo interlocutore",
    description:
      "Parli con una persona che conosce il tuo cantiere, non con un centralino diverso ogni volta.",
  },
  {
    title: "Aggiornamenti durante i lavori",
    description:
      "Foto e stato di avanzamento, così sai a che punto siamo senza doverlo chiedere.",
  },
  {
    title: "Decisioni condivise prima",
    description:
      "Quando serve una scelta, te la portiamo con le opzioni e le conseguenze, prima di procedere.",
  },
  {
    title: "Documentazione del percorso",
    description:
      "Quello che viene fatto resta tracciato: utile durante i lavori e anche dopo.",
  },
];

const perche = [
  {
    title: "Coordinamento, non improvvisazione",
    description:
      "Il cantiere ha un ordine. Chi fa cosa e quando è deciso prima, non risolto ogni mattina.",
  },
  {
    title: "Professionisti qualificati",
    description:
      "Gli interventi specialistici li eseguono tecnici e artigiani abilitati per quel tipo di lavoro.",
  },
  {
    title: "Nessun preventivo al buio",
    description:
      "Non diamo cifre senza aver visto la casa: sarebbero numeri inventati, non un preventivo.",
  },
];

export default function RistrutturazionePage() {
  const faqItems = faqByTag("ristrutturazione");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqItems)) }}
      />

      <Hero
        eyebrow="Ristrutturazione"
        title="Ristrutturare casa è più semplice quando hai qualcuno sul posto."
        description="Ristrutturazioni e lavori coordinati nella provincia di Ragusa e nelle aree coperte dalla rete, anche per proprietari che vivono lontano."
        primaryCta={ctas.sopralluogo}
        secondaryCta={{ label: "Come funziona", href: routes.comeFunziona }}
        note="Il sopralluogo è il punto di partenza: prima vediamo la casa, poi parliamo di numeri."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Ristrutturazione" },
        ]}
        image={{
          alt: "Interno di una casa in ristrutturazione",
          label: "Foto hero: interno in lavorazione o appena consegnato",
        }}
      />

      {/* Problema */}
      <Section tone="cream" spacing="lg" size="wide">
        <SectionHeader
          eyebrow="Il problema"
          title="Vivi lontano dalla casa che devi ristrutturare?"
          description="Un cantiere richiede presenza. Ogni giorno ci sono scelte da fare, materiali da verificare e persone da coordinare: a distanza diventa un lavoro a tempo pieno."
        />
        <FeatureBlock features={problemi} columns={4} className="mt-12" />
      </Section>

      {/* Soluzione */}
      <Section tone="ink" spacing="lg" size="wide">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="La soluzione"
              title="Un unico referente che segue il progetto."
              description="Non ti passiamo una lista di contatti. Ci occupiamo noi di analizzare la casa, definire il percorso, coinvolgere le persone giuste e tenere insieme il cantiere."
              tone="dark"
            />
            <CheckList
              items={[
                "Sopralluogo e analisi dello stato reale dell'immobile",
                "Definizione del percorso di lavori, per priorità",
                "Selezione e coordinamento dei professionisti",
                "Controllo dell'avanzamento e aggiornamenti costanti",
              ]}
              tone="dark"
              className="mt-8"
            />
          </div>
          <ImagePlaceholder
            alt="Sopralluogo in un immobile da ristrutturare"
            label="Foto: sopralluogo, rilievo o confronto in cantiere"
            ratio="photo"
            tone="dark"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
        </div>
      </Section>

      {/* Cosa possiamo gestire */}
      <Section tone="white" spacing="lg">
        <SectionHeader
          eyebrow="Cosa possiamo gestire"
          title="Dai lavori interni agli interventi esterni"
          description="GGM coordina il progetto e il cantiere. Le lavorazioni specialistiche, a partire dagli impianti, sono eseguite da professionisti qualificati della rete."
        />
        <CheckList items={cosaGestiamo} columns={2} className="mt-10" />
      </Section>

      {/* Processo */}
      <Section tone="sand" spacing="lg" size="wide">
        <SectionHeader
          eyebrow="Il processo"
          title="Sei passaggi, nell'ordine giusto"
          description="Ogni fase ha un esito chiaro. Si passa alla successiva quando la precedente è chiusa."
        />
        <ProcessSteps steps={processo} className="mt-12" />
      </Section>

      {/* Se vivi lontano */}
      <Section tone="cream" spacing="lg" size="wide">
        <SectionHeader
          eyebrow="Se vivi lontano"
          title="Il cantiere lo segui, anche se non ci sei"
          description="Questa è la parte che preoccupa di più chi non vive in Sicilia. È anche quella su cui abbiamo costruito il modo di lavorare."
        />
        <FeatureBlock features={daLontano} columns={4} className="mt-12" />
      </Section>

      {/* Esperienza tecnica */}
      <Section tone="white" spacing="lg" size="wide">
        <ExperienceBlock
          eyebrow="Esperienza tecnica"
          title="Cantieri veri, prima di GGM."
          description="Le fotografie qui sotto documentano lavori realizzati nell'attività professionale precedente dei fondatori. Le mostriamo per farti vedere il tipo di intervento e il livello di finitura, non per attribuire quei lavori a GGM."
          images={[
            {
              alt: "Interno ristrutturato in un lavoro precedente",
              label: "Foto reale: interno ristrutturato",
            },
            {
              alt: "Bagno ristrutturato in un lavoro precedente",
              label: "Foto reale: bagno o cucina",
            },
            {
              alt: "Dettaglio di finitura di un lavoro precedente",
              label: "Foto reale: dettaglio di finitura",
            },
          ]}
        />
      </Section>

      {/* Persone e network */}
      <Section tone="ink" spacing="lg" size="wide">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <SectionHeader
            eyebrow="Chi c'è dietro"
            title="GGM coordina. Il lavoro lo fanno persone qualificate."
            description="Preferiamo dirlo chiaramente invece di lasciar credere che facciamo tutto internamente: non sarebbe vero e non sarebbe nemmeno un vantaggio per te."
            tone="dark"
          />
          <div>
            <FeatureBlock
              features={[
                {
                  title: "GGM",
                  description:
                    "Rapporto con il proprietario, analisi, pianificazione, coordinamento del cantiere e comunicazione.",
                },
                {
                  title: "La rete locale",
                  description:
                    "Artigiani, imprese, tecnici e professionisti abilitati, ciascuno per la propria specializzazione.",
                },
              ]}
              columns={2}
              tone="dark"
              variant="card"
            />
          </div>
        </div>
      </Section>

      {/* Perché */}
      <Section tone="cream" spacing="lg" size="wide">
        <SectionHeader eyebrow="Perché noi" title="Come lavoriamo, in concreto" />
        <FeatureBlock features={perche} columns={3} className="mt-12" />
      </Section>

      {/* Copertura */}
      <Section tone="white" spacing="lg" size="wide">
        <CoverageBlock
          title="I lavori si fanno dove abbiamo davvero una rete."
          description="La ristrutturazione richiede presenza fisica costante: la attiviamo solo dove possiamo garantirla."
        />
      </Section>

      {/* FAQ */}
      <Section tone="cream" spacing="lg">
        <SectionHeader eyebrow="FAQ" title="Domande sulla ristrutturazione" />
        <FAQAccordion items={faqItems} className="mt-10" />
      </Section>

      <CTASection
        eyebrow="Primo passo"
        title="Hai una casa da ristrutturare in Sicilia? Partiamo da un sopralluogo."
        description="Raccontaci dove si trova e in che stato è. Se rientra nelle zone che copriamo, organizziamo una visita."
        cta={ctas.sopralluogo}
      />
    </>
  );
}
