import { CTASection } from "@/components/sections/CTASection";
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
  title: "Ristruttura e metti a reddito la tua casa in Sicilia",
  description:
    "Prima di aprire un cantiere, analizziamo cosa può diventare la tua casa: immobile, zona, investimento e strategia. Poi lavori, preparazione e gestione, con un unico referente.",
  path: routes.integrato,
});

const domande = [
  {
    title: "Quanto costa sistemarla?",
    description:
      "Senza un'analisi dello stato reale, qualsiasi cifra è un'ipotesi.",
  },
  {
    title: "Cosa conviene fare e cosa no?",
    description:
      "Alcuni interventi cambiano il valore d'uso della casa, altri quasi nulla.",
  },
  {
    title: "Ha senso pensare agli affitti brevi?",
    description:
      "Dipende dalla zona, dalla stagionalità e dal tipo di immobile. Non è automatico.",
  },
  {
    title: "L'investimento sta in piedi?",
    description:
      "Vale la pena spendere solo se quello che si ottiene giustifica la spesa.",
  },
];

const analisi = [
  {
    title: "Stato dell'immobile",
    description: "Cosa c'è, cosa manca, cosa è urgente e cosa può aspettare.",
  },
  {
    title: "Posizione",
    description: "Dove si trova, come ci si arriva, cosa c'è intorno.",
  },
  {
    title: "Mercato locale",
    description: "Chi cerca in quella zona, in quali periodi e con che aspettative.",
  },
  {
    title: "Lavori necessari",
    description: "Quali interventi servono per la strategia scelta, non in astratto.",
  },
  {
    title: "Investimento",
    description: "Ordine di grandezza della spesa e su cosa incide davvero.",
  },
  {
    title: "Strategia",
    description: "Cosa ha senso che questa casa diventi, dati gli elementi sopra.",
  },
];

const metodo = [
  { title: "Immobile", description: "Si parte dalla casa, non da un modello preconfezionato." },
  { title: "Analisi", description: "Stato reale, contesto e vincoli." },
  { title: "Potenziale", description: "Cosa potrebbe diventare, in modo realistico." },
  { title: "Investimento", description: "Quanto serve per arrivarci." },
  { title: "Strategia", description: "Quale utilizzo ha senso, e perché." },
  { title: "Decisione", description: "La prendi tu, con informazioni chiare davanti." },
];

const percorso = [
  {
    title: "Analisi",
    description:
      "Raccogliamo le informazioni sull'immobile e sulla zona e capiamo se il progetto ha senso.",
  },
  {
    title: "Sopralluogo",
    description:
      "Vediamo la casa di persona: è l'unico modo per parlare di lavori con cognizione di causa.",
  },
  {
    title: "Strategia",
    description:
      "Definiamo cosa deve diventare la casa e quali lavori servono per arrivarci.",
  },
  {
    title: "Ristrutturazione",
    description:
      "Cantiere coordinato, con interventi proporzionati all'obiettivo scelto.",
  },
  {
    title: "Preparazione",
    description:
      "Arredo, dotazioni, fotografie e contenuti: la casa viene preparata per essere messa online.",
  },
  {
    title: "Pubblicazione",
    description:
      "Annuncio, canali, prezzi e calendario, coerenti con la strategia definita.",
  },
  {
    title: "Gestione",
    description:
      "Prenotazioni, ospiti, ottimizzazione e report, con le attività locali dove disponibili.",
  },
];

const perChi = [
  {
    title: "Chi ha ereditato una casa",
    description:
      "E non sa se sistemarla, tenerla o farne qualcosa di diverso.",
  },
  {
    title: "Chi ha una casa ferma da anni",
    description:
      "Immobile inutilizzato che continua a costare senza produrre nulla.",
  },
  {
    title: "Chi sta per aprire un cantiere",
    description:
      "E vuole capire, prima di spendere, se i lavori previsti hanno senso rispetto all'obiettivo.",
  },
  {
    title: "Chi vive lontano",
    description:
      "E non può seguire né i lavori né la gestione successiva.",
  },
];

export default function IntegratoPage() {
  const faqItems = faqByTag("integrato");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqItems)) }}
      />

      <Hero
        eyebrow="Ristruttura & Metti a Reddito"
        title="Hai una casa da ristrutturare in Sicilia? Prima di spendere, capiamo cosa può diventare."
        description="Il percorso integrato mette l'analisi prima del cantiere: lavori proporzionati alla strategia, e poi la gestione dell'immobile."
        primaryCta={ctas.potenziale}
        secondaryCta={{
          label: "Solo ristrutturazione",
          href: routes.ristrutturazione,
        }}
        note="Se dall'analisi risulta che non conviene procedere, te lo diciamo."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Ristruttura & Metti a Reddito" },
        ]}
        image={{
          alt: "Casa siciliana da valorizzare",
          label: "Foto hero: immobile prima dell'intervento",
        }}
      />

      {/* Problema */}
      <Section tone="cream" spacing="lg" size="wide">
        <SectionHeader
          eyebrow="Le domande che ti stai facendo"
          title="Il problema non è ristrutturare. È decidere cosa fare."
          description="Quasi tutti partono dai lavori e si accorgono solo dopo che la casa non era adatta a quello che avevano in mente."
        />
        <FeatureBlock features={domande} columns={4} className="mt-12" />
      </Section>

      {/* Prima di spendere */}
      <Section tone="ink" spacing="lg" size="wide">
        <SectionHeader
          eyebrow="Prima di spendere"
          title="Sei elementi da guardare prima di aprire il cantiere"
          description="Sono le informazioni che servono per decidere quanto ha senso investire e su cosa. Prima si guardano, meno soldi si spostano nella direzione sbagliata."
          tone="dark"
        />
        <FeatureBlock features={analisi} columns={3} tone="dark" className="mt-12" />
      </Section>

      {/* Metodo */}
      <Section tone="white" spacing="lg" size="wide">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="Il metodo"
              title="Non tutte le case devono diventare case vacanza."
              description="È il punto che ci differenzia di più. Per alcuni immobili l'affitto breve è la strada giusta; per altri conviene un affitto a medio termine, un uso personale sistemato meglio, o niente del tutto."
            />
            <CheckList
              className="mt-8"
              items={[
                "Partiamo dalla casa, non da un servizio da vendere.",
                "Diciamo anche quando l'operazione non ha senso.",
                "I lavori seguono la strategia, non il contrario.",
                "Nessuna proiezione di rendimento presentata come certezza.",
              ]}
            />
          </div>
          <div>
            <ProcessSteps steps={metodo} layout="timeline" />
          </div>
        </div>
      </Section>

      {/* Percorso completo */}
      <Section tone="sand" spacing="lg" size="wide">
        <SectionHeader
          eyebrow="Il percorso completo"
          title="Dall'analisi alla casa che lavora"
          description="Ogni fase ha un esito. Puoi fermarti quando vuoi: il percorso non è un pacchetto tutto-o-niente."
        />
        <ProcessSteps steps={percorso} columns={4} className="mt-12" />
      </Section>

      {/* Le tre fasi operative */}
      <Section tone="cream" spacing="lg" size="wide">
        <SectionHeader
          eyebrow="Le tre fasi operative"
          title="Cosa succede in concreto, una fase alla volta"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            {
              eyebrow: "Fase 1",
              title: "Ristrutturazione",
              text: "Lavori coordinati sul posto, con interventi proporzionati alla strategia definita. Nessun sovradimensionamento per far bella figura in fotografia.",
              items: [
                "Cantiere coordinato da un referente unico",
                "Professionisti qualificati per gli interventi specialistici",
                "Aggiornamenti costanti anche se vivi lontano",
              ],
              label: "Foto: lavori in corso",
              alt: "Lavori di ristrutturazione in corso",
            },
            {
              eyebrow: "Fase 2",
              title: "Preparazione",
              text: "Una casa ristrutturata non è ancora una casa pronta per essere messa online. Questa fase è quella che quasi sempre viene saltata.",
              items: [
                "Arredo e dotazioni coerenti con il target",
                "Fotografie e contenuti dell'annuncio",
                "Posizionamento e scelta dei canali",
              ],
              label: "Foto: interno arredato e pronto",
              alt: "Interno arredato e pronto per gli ospiti",
            },
            {
              eyebrow: "Fase 3",
              title: "Gestione",
              text: "Da qui in avanti la casa lavora e noi la seguiamo: online in tutta la Sicilia, sul posto dove abbiamo la rete.",
              items: [
                "Prezzi, calendario e prenotazioni",
                "Comunicazione con gli ospiti",
                "Ottimizzazione e report periodici",
              ],
              label: "Foto: dettaglio dell'ospitalità",
              alt: "Dettaglio di una casa gestita per l'ospitalità",
            },
          ].map((fase) => (
            <article
              key={fase.title}
              className="reveal flex flex-col overflow-hidden rounded-lg border border-line bg-white"
            >
              <ImagePlaceholder
                alt={fase.alt}
                label={fase.label}
                ratio="wide"
                className="rounded-none"
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="text-xs font-semibold tracking-[0.16em] text-gold-700 uppercase">
                  {fase.eyebrow}
                </p>
                <h3 className="mt-3 display-3 font-semibold text-ink">
                  {fase.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {fase.text}
                </p>
                <CheckList items={fase.items} className="mt-6 text-sm" />
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Esempio illustrativo */}
      <Section tone="white" spacing="lg">
        <SectionHeader
          eyebrow="Esempio illustrativo"
          title="Come si legge un'analisi, su un caso inventato"
          description="Quello che segue è uno scenario costruito a scopo esplicativo. Non è un lavoro realizzato da GGM, non è un cliente e i suoi elementi non sono dati reali: serve solo a mostrare il ragionamento."
        />

        <div className="mt-10 overflow-hidden rounded-lg border border-line-strong bg-sand">
          <div className="border-b border-line-strong px-6 py-4 sm:px-8">
            <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
              Scenario illustrativo, nessun dato reale
            </p>
          </div>
          <dl className="divide-y divide-line-strong">
            {[
              {
                term: "La casa",
                detail:
                  "Immobile indipendente in un centro storico dell'entroterra, non utilizzato da anni, con impianti da rifare.",
              },
              {
                term: "Cosa vede il proprietario",
                detail:
                  "«La ristrutturo e la metto su Airbnb»: l'ipotesi di partenza più comune.",
              },
              {
                term: "Cosa emerge dall'analisi",
                detail:
                  "La zona ha una domanda turistica concentrata in poche settimane, ma una domanda stabile di affitti a medio termine per lavoratori e studenti.",
              },
              {
                term: "Come cambiano i lavori",
                detail:
                  "Servono interventi diversi: meno investimento su arredo e dotazioni da vetrina, più su impianti, isolamento e vivibilità quotidiana.",
              },
              {
                term: "La decisione",
                detail:
                  "Il proprietario sceglie con informazioni davanti, sapendo cosa comporta ciascuna strada. La decisione resta sua.",
              },
            ].map((row) => (
              <div
                key={row.term}
                className="grid gap-2 px-6 py-5 sm:grid-cols-[minmax(0,0.32fr)_minmax(0,1fr)] sm:gap-8 sm:px-8"
              >
                <dt className="text-sm font-semibold text-ink">{row.term}</dt>
                <dd className="text-sm leading-relaxed text-muted">
                  {row.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="mt-6 max-w-3xl border-l-2 border-line-strong pl-4 text-xs leading-relaxed text-muted">
          Nessun numero, nessuna cifra di investimento e nessuna previsione di
          rendimento sono associati a questo esempio: non sarebbero verificabili e
          non avrebbero valore per la tua casa, che è un caso a sé.
        </p>
      </Section>

      {/* Per chi è */}
      <Section tone="cream" spacing="lg" size="wide">
        <SectionHeader eyebrow="Per chi è" title="A chi serve il percorso integrato" />
        <FeatureBlock features={perChi} columns={4} className="mt-12" />
      </Section>

      {/* FAQ */}
      <Section tone="white" spacing="lg">
        <SectionHeader eyebrow="FAQ" title="Domande sul percorso integrato" />
        <FAQAccordion items={faqItems} className="mt-10" />
      </Section>

      <CTASection
        eyebrow="Primo passo"
        title="Hai una casa e non sai ancora cosa farne?"
        description="Non partire dai lavori. Parti dalla casa: raccontacela e ti diciamo cosa vediamo."
        cta={ctas.potenziale}
      />
    </>
  );
}
