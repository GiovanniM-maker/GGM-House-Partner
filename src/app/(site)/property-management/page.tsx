import { CTASection } from "@/components/sections/CTASection";
import { CoverageBlock } from "@/components/sections/CoverageBlock";
import { ExperienceBlock } from "@/components/sections/ExperienceBlock";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { CheckList, FeatureBlock } from "@/components/sections/FeatureBlock";
import { Hero } from "@/components/sections/Hero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { TransparencyBlock } from "@/components/sections/TransparencyBlock";
import { Section } from "@/components/ui/Section";
import { faqByTag } from "@/content/faq";
import { coverage, ctas, routes } from "@/content/site";
import { faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Property management in Sicilia",
  description:
    "Gestiamo la tua casa in Sicilia anche se vivi altrove: annunci, prezzi, calendario, prenotazioni e comunicazione online in tutta l'isola, attività sul posto dove esiste una rete affidabile.",
  path: routes.propertyManagement,
});

const problemi = [
  {
    title: "Messaggi e richieste",
    description:
      "Le domande arrivano a tutte le ore e in più lingue. Rispondere tardi significa perdere la prenotazione.",
  },
  {
    title: "Prezzi e calendario",
    description:
      "Un prezzo fisso tutto l'anno lascia sul tavolo i mesi buoni e riempie male quelli deboli.",
  },
  {
    title: "Annunci e canali",
    description:
      "Un annuncio scritto male o con foto sbagliate viene mostrato meno e converte peggio.",
  },
  {
    title: "Check-in, pulizie, manutenzione",
    description:
      "Sono attività fisiche: qualcuno deve esserci, ogni volta, con la stessa qualità.",
  },
];

const valutazione = [
  {
    title: "Posizione",
    description:
      "Dove si trova la casa, cosa c'è intorno e come ci si arriva.",
  },
  {
    title: "Domanda della zona",
    description:
      "Chi cerca in quell'area, in quali periodi e con quali aspettative.",
  },
  {
    title: "Tipologia e dimensioni",
    description:
      "Che tipo di immobile è e quante persone può ospitare in modo sensato.",
  },
  {
    title: "Stato e dotazioni",
    description:
      "Com'è messa oggi e cosa manca per essere competitiva.",
  },
  {
    title: "Stagionalità",
    description:
      "Quanti mesi l'anno la zona lavora davvero e come cambia la domanda.",
  },
  {
    title: "Vincoli e utilizzo",
    description:
      "Se la usi in alcuni periodi, se ci sono limiti o regole da rispettare.",
  },
];

const processo = [
  {
    title: "Valutazione",
    description:
      "Raccogliamo le informazioni sull'immobile e sul contesto.",
  },
  {
    title: "Analisi",
    description:
      "Capiamo se la messa a reddito ha senso e con quale formula.",
  },
  {
    title: "Setup",
    description:
      "Preparazione dell'immobile, materiali, foto e contenuti dell'annuncio.",
  },
  {
    title: "Pubblicazione",
    description:
      "Messa online sui canali scelti, con prezzi e regole coerenti.",
  },
  {
    title: "Gestione",
    description:
      "Prenotazioni, comunicazione, calendario e coordinamento delle attività locali.",
  },
  {
    title: "Ottimizzazione",
    description:
      "Lettura dei risultati e correzioni su prezzi, annuncio e posizionamento.",
  },
];

const perChi = [
  {
    title: "Chi vive lontano dalla casa",
    description:
      "Fuori dalla Sicilia o all'estero, e non può occuparsi della gestione quotidiana.",
  },
  {
    title: "Chi ha una casa poco utilizzata",
    description:
      "Usata qualche settimana l'anno e chiusa per il resto del tempo.",
  },
  {
    title: "Chi ha ereditato un immobile",
    description:
      "E non sa ancora se tenerlo, sistemarlo o metterlo a reddito.",
  },
  {
    title: "Chi gestisce da solo e non ce la fa più",
    description:
      "Ha iniziato in autonomia ma il tempo richiesto è diventato insostenibile.",
  },
];

const nonPromettiamo = [
  {
    claim: "Un rendimento garantito",
    reality:
      "Dipende da posizione, stagionalità, domanda e stato dell'immobile. Analizziamo il potenziale e ti spieghiamo su cosa si basa la valutazione, senza numeri promessi in anticipo.",
  },
  {
    claim: "Presenza fisica ovunque in Sicilia",
    reality: `Le attività sul posto sono attive dove abbiamo una rete affidabile: ${coverage.local.area.toLowerCase()}. La gestione online invece copre tutta l'isola.`,
  },
  {
    claim: "Che ogni casa debba diventare casa vacanza",
    reality:
      "Per alcune case ha più senso un affitto a medio termine, per altre un uso diverso. La formula si decide dopo l'analisi, non prima.",
  },
  {
    claim: "Un listino prezzi valido per tutti",
    reality:
      "Il modello economico del servizio non è ancora definitivo e non pubblichiamo tariffe che potrebbero cambiare. Le condizioni si definiscono per iscritto dopo l'analisi.",
  },
];

export default function PropertyManagementPage() {
  const faqItems = faqByTag("property-management");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqItems)) }}
      />

      <Hero
        eyebrow="Property Management"
        title="Hai una casa in Sicilia ma vivi altrove? La gestiamo noi."
        description="Dalla messa online alla gestione delle prenotazioni, fino al coordinamento delle attività locali dove disponibili."
        primaryCta={ctas.potenziale}
        secondaryCta={{
          label: "Ristruttura & metti a reddito",
          href: routes.integrato,
        }}
        note="Prima analizziamo la casa. Solo dopo parliamo di gestione."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Property Management" },
        ]}
        image={{
          alt: "Interno di una casa preparata per l'ospitalità",
          label: "Foto hero — interno curato, luce naturale",
        }}
      />

      {/* Problema */}
      <Section tone="cream" spacing="lg" size="wide">
        <SectionHeader
          eyebrow="Il problema"
          title="Mettere a reddito una casa non è pubblicare un annuncio."
          description="È un'attività continua, fatta di piccole cose che vanno fatte bene ogni giorno. Da lontano, quasi nessuno riesce a mantenerla nel tempo."
        />
        <FeatureBlock features={problemi} columns={4} className="mt-12" />
      </Section>

      {/* Overview */}
      <Section tone="ink" spacing="lg" size="wide">
        <SectionHeader
          eyebrow="Come funziona il servizio"
          title="Due livelli distinti, e li teniamo separati."
          description="Confondere gestione online e operatività locale è il modo più veloce per promettere cose che poi non si possono mantenere. Preferiamo dirti da subito quale delle due copriamo dove si trova la tua casa."
          tone="dark"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="reveal rounded-lg border border-white/15 bg-white/5 p-7 sm:p-8">
            <p className="inline-flex rounded-full bg-teal/20 px-3 py-1 text-xs font-semibold text-teal">
              Gestione online — tutta la Sicilia
            </p>
            <h3 className="mt-5 display-3 font-semibold text-white">
              Tutto quello che si può seguire a distanza
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-teal-50/75">
              È la parte che facciamo direttamente noi, ovunque si trovi la casa
              sull&apos;isola.
            </p>
            <CheckList
              tone="dark"
              className="mt-6"
              items={[
                "Creazione e ottimizzazione degli annunci",
                "Pubblicazione su Airbnb, Booking e altri canali",
                "Strategia di prezzo e gestione del calendario",
                "Gestione delle prenotazioni",
                "Comunicazione con gli ospiti, prima e durante il soggiorno",
                "Report periodici al proprietario",
              ]}
            />
          </div>

          <div className="reveal rounded-lg border border-white/15 bg-white/5 p-7 sm:p-8">
            <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-teal-50">
              Gestione locale — {coverage.local.area}
            </p>
            <h3 className="mt-5 display-3 font-semibold text-white">
              Tutto quello che richiede una persona sul posto
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-teal-50/75">
              È la parte che attiviamo solo dove la rete esiste davvero. Dove non
              c&apos;è, te lo diciamo.
            </p>
            <CheckList
              tone="dark"
              className="mt-6"
              items={[
                "Check-in e check-out degli ospiti",
                "Pulizie e cambio biancheria",
                "Preparazione dell'immobile fra un soggiorno e l'altro",
                "Controlli periodici sulla casa",
                "Piccola manutenzione e coordinamento degli interventi",
              ]}
            />
          </div>
        </div>
      </Section>

      {/* Modello operativo */}
      <Section tone="white" spacing="lg" size="wide">
        <SectionHeader
          eyebrow="Modello operativo"
          title="Online quando basta. Sul posto quando serve."
          description="Non tutte le case hanno bisogno dello stesso livello di presenza. Costruiamo la gestione sulla situazione reale dell'immobile, non su un pacchetto standard."
        />
        <FeatureBlock
          className="mt-12"
          columns={3}
          features={[
            {
              title: "Online quando basta",
              description:
                "Se hai già chi si occupa di pulizie e accoglienza, possiamo seguire solo la parte digitale: annunci, prezzi, calendario e ospiti.",
            },
            {
              title: "Sul posto quando serve",
              description:
                "Dove abbiamo la rete, coordiniamo anche le attività fisiche, così non devi gestire più fornitori separati.",
            },
            {
              title: "Network per le attività specifiche",
              description:
                "Pulizie, manutenzioni e interventi tecnici sono affidati a operatori locali; GGM resta il tuo unico riferimento.",
            },
          ]}
        />
      </Section>

      {/* Valutazione */}
      <Section tone="sand" spacing="lg" size="wide">
        <SectionHeader
          eyebrow="Valutazione dell'immobile"
          title="Cosa guardiamo prima di dirti qualcosa"
          description="Sono gli elementi su cui si costruisce una valutazione seria. Chi ti dà un numero senza averli guardati, sta indovinando."
        />
        <FeatureBlock features={valutazione} columns={3} className="mt-12" />
      </Section>

      {/* Processo */}
      <Section tone="cream" spacing="lg" size="wide">
        <SectionHeader
          eyebrow="Il percorso"
          title="Dalla valutazione alla gestione continuativa"
        />
        <ProcessSteps steps={processo} className="mt-12" />
      </Section>

      {/* Esperienza digitale */}
      <Section tone="white" spacing="lg" size="wide">
        <ExperienceBlock
          eyebrow="Esperienza digitale"
          title="La parte online non la stiamo imparando adesso."
          description="Le competenze digitali che usiamo nella gestione — marketing, contenuti, automazione, lettura dei dati — arrivano dall'attività professionale precedente dei fondatori, in altri settori. Su questo progetto sono nuove per il settore immobiliare, non per noi."
          points={[
            "Gestione di presenze online, contenuti e canali di acquisizione.",
            "Automazione dei processi ripetitivi e comunicazione strutturata.",
            "Lettura dei dati per correggere prezzi, annunci e posizionamento.",
          ]}
          disclaimer="Non pubblichiamo numeri, risultati o materiali di clienti precedenti: appartengono ad altri progetti e ad altri settori, e non sarebbero un indicatore onesto di quello che GGM può fare sulla tua casa."
        />
      </Section>

      {/* Per chi è */}
      <Section tone="cream" spacing="lg" size="wide">
        <SectionHeader eyebrow="Per chi è" title="A chi serve davvero questo servizio" />
        <FeatureBlock features={perChi} columns={4} className="mt-12" />
      </Section>

      {/* Trasparenza */}
      <Section tone="ink" spacing="lg" size="wide">
        <TransparencyBlock
          items={nonPromettiamo}
          tone="dark"
          description="Il property management è un settore pieno di promesse. Ecco quelle che non troverai qui."
        />
      </Section>

      {/* Copertura */}
      <Section tone="white" spacing="lg" size="wide">
        <CoverageBlock />
      </Section>

      {/* FAQ */}
      <Section tone="cream" spacing="lg">
        <SectionHeader eyebrow="FAQ" title="Domande sulla gestione" />
        <FAQAccordion items={faqItems} className="mt-10" />
      </Section>

      <CTASection
        eyebrow="Primo passo"
        title="Quanto potrebbe rendere la tua casa?"
        description="Non facciamo promesse a distanza. Prima la analizziamo, poi ti diciamo cosa vediamo — anche se la risposta è che non conviene."
        cta={ctas.potenziale}
      />
    </>
  );
}
