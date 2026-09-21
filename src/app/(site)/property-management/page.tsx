import { CTASection } from "@/components/sections/CTASection";
import { ExperienceBlock } from "@/components/sections/ExperienceBlock";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { CheckList, FeatureBlock } from "@/components/sections/FeatureBlock";
import { Hero } from "@/components/sections/Hero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Badges } from "@/components/sections/Badges";
import { PortalBand } from "@/components/sections/PortalBand";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { TransparencyBlock } from "@/components/sections/TransparencyBlock";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Section } from "@/components/ui/Section";
import { faqByTag } from "@/content/faq";
import { ctas, routes } from "@/content/site";
import { faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Remote property management in Sicilia",
  description:
    "Analisi gratuita del tuo immobile: ricavi, costi, commissioni e potenziale. Poi, se ha senso, gestiamo annunci, prezzi, calendario, prenotazioni e ospiti su Airbnb e Booking.",
  path: routes.propertyManagement,
});

/** Etichette di competenza mostrate sotto l'hero. */
const competenze = [
  "Airbnb Management",
  "Booking Management",
  "Revenue Management",
  "Remote Management",
  "Guest Communication",
  "Listing Optimization",
  "Pricing Optimization",
  "Multi-Channel Management",
] as const;

/**
 * Canali su cui gestiamo l'annuncio.
 * TODO: aggiungere i loghi ufficiali in `public/images/portali/` e indicarli
 * qui. Finché mancano viene mostrato il nome: un logo ricostruito a mano
 * violerebbe le linee guida del marchio.
 */
const portali = [{ nome: "Airbnb" }, { nome: "Booking.com" }] as const;

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
    title: "Commissioni e costi",
    description:
      "Fra portali, pulizie e utenze, quello che resta al proprietario è spesso diverso da quello che sembra.",
  },
  {
    title: "Il tuo tempo",
    description:
      "È il costo che nessuno mette a bilancio, ed è quello che pesa di più quando vivi lontano.",
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
    claim: "Pulizie, check-in e manutenzione",
    reality:
      "Questo servizio è da remoto e non le comprende. Continua a occuparsene chi già lo fa per te, e noi ci coordiniamo. Quando attiveremo le attività sul posto lo scriveremo qui, non prima.",
  },
  {
    claim: "Che ogni casa debba diventare casa vacanza",
    reality:
      "Per alcune case ha più senso un affitto a medio termine, per altre un uso diverso. La formula si decide dopo l'analisi, non prima.",
  },
  {
    claim: "Una percentuale uguale per ogni casa",
    reality:
      "Si parte dal 12% dei ricavi, ma dipende da quanto lavora la casa e da quante cose seguiamo. La percentuale esatta arriva dopo l'analisi, per iscritto.",
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
        eyebrow="Remote Property Management"
        title="Quanto ti costa davvero gestire il tuo immobile?"
        description="Analizziamo gratuitamente ricavi, costi, commissioni e potenziale del tuo immobile per capire dove puoi migliorare la redditività."
        primaryCta={ctas.analisi}
        secondaryCta={{ label: "Come funziona", href: routes.comeFunziona }}
        note="Gratis. Senza impegno. Analisi personalizzata."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Property Management" },
        ]}
        image={{
          src: "/images/property-management-hero.jpg",
          alt: "Camera da letto di una casa siciliana preparata per gli ospiti, con lino bianco e persiane socchiuse",
        }}
      />

      {/* Competenze: si leggono in un colpo d'occhio, senza diventare un elenco */}
      <Section tone="white" spacing="sm" size="wide">
        <Badges items={competenze} />
      </Section>

      {/* Problema */}
      <Section tone="cream" spacing="lg" size="wide">
        <SectionHeader
          eyebrow="Il problema"
          title="Mettere a reddito una casa non è pubblicare un annuncio."
          description="È un'attività continua, fatta di piccole cose che vanno fatte bene ogni giorno. Da lontano, quasi nessuno riesce a mantenerla nel tempo."
        />
        <FeatureBlock features={problemi} columns={4} className="mt-12" />
      </Section>

      {/* Cosa analizziamo */}
      <Section tone="white" spacing="lg" size="wide">
        <SectionHeader
          eyebrow="L'analisi gratuita"
          title="Prima analizziamo. Poi decidiamo."
          description="Non tutti gli immobili hanno lo stesso potenziale e non tutte le gestioni sono economicamente convenienti. Per questo analizziamo prima i numeri del tuo immobile."
        />

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cosaAnalizziamo.map((voce, indice) => (
            <li
              key={voce.title}
              className="reveal flex flex-col rounded-lg border border-line bg-cream p-6"
            >
              <span className="text-xs font-semibold tracking-[0.16em] text-gold-700">
                {String(indice + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-ink">
                {voce.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {voce.description}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-sm text-muted">
          L&apos;analisi si basa sui dati disponibili sul tuo immobile. Dove un
          dato manca lo diciamo, invece di riempirlo con una stima.
        </p>
      </Section>

      {/* Remote Property Management */}
      <Section tone="ink" spacing="lg" size="wide">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="Remote Property Management"
              title="La gestione che si fa a distanza, fatta bene."
              description="Partiamo dalla parte digitale e strategica, quella che pesa di più sui risultati e che si può seguire da ovunque si trovi la casa in Sicilia."
              tone="dark"
            />
            <CheckList
              tone="dark"
              className="mt-8"
              columns={2}
              items={[
                "Annunci su Airbnb e Booking",
                "Ottimizzazione delle schede",
                "Strategia di prezzo",
                "Calendario e disponibilità",
                "Gestione delle prenotazioni",
                "Comunicazione con gli ospiti",
                "Recensioni e reputazione",
                "Revenue management",
                "Report periodici",
              ]}
            />
            <p className="mt-8 max-w-xl text-sm leading-relaxed text-cream/70">
              Le attività che richiedono una persona sul posto, come pulizie e
              accoglienza fisica, non sono comprese in questo servizio. Se ne
              occupa chi già le segue per te, e noi ci coordiniamo.
            </p>
          </div>

          <ImagePlaceholder
            src="/images/persone-gestione-online.jpg"
            alt="Mani su un computer portatile appoggiato a un tavolo in legno, accanto a un quaderno e una tazza, con luce dalla finestra"
            ratio="photo"
            tone="dark"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
        </div>
      </Section>

      {/* Portali */}
      <Section tone="white" spacing="md" size="wide">
        <PortalBand
          titolo="Il tuo immobile, sui canali che contano"
          portali={portali}
          descrizione="Gestiamo annunci, disponibilità, prenotazioni, comunicazione e performance da un unico sistema."
        />
      </Section>

      {/* Modello operativo */}
      <Section tone="white" spacing="lg" size="wide">
        <SectionHeader
          eyebrow="Come miglioriamo la gestione"
          title="Tre leve, e si vedono tutte nei numeri."
          description="Non c'è una formula magica: la redditività di una casa si muove su poche cose fatte con costanza. Sono quelle su cui interveniamo."
        />
        <FeatureBlock
          className="mt-12"
          columns={3}
          features={[
            {
              title: "L'annuncio",
              description:
                "Foto, titolo, descrizione e dotazioni dichiarate decidono quante volte la casa viene mostrata e quante volte viene scelta.",
            },
            {
              title: "Il prezzo",
              description:
                "Un prezzo che non si muove lascia sul tavolo i periodi forti e riempie male quelli deboli. Si corregge nel tempo, non una volta sola.",
            },
            {
              title: "La risposta agli ospiti",
              description:
                "Rispondere in fretta e bene incide sulle prenotazioni e sulle recensioni, e le recensioni tornano dentro al posizionamento.",
            },
          ]}
        />
      </Section>

      {/* Valutazione */}
      <Section tone="sand" spacing="lg" size="wide">
        <SectionHeader
          eyebrow="Dentro l'analisi"
          title="Gli elementi su cui lavoriamo"
          description="Sono le cose che guardiamo per capire il potenziale di una casa. Chi ti dà un numero senza averle guardate, sta indovinando."
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
          description="Le competenze digitali che usiamo nella gestione (marketing, contenuti, automazione, lettura dei dati) arrivano dall'attività professionale precedente del fondatore, in altri settori. Su questo progetto sono nuove per il settore immobiliare, non per noi."
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

      {/* Prezzo */}
      <Section tone="sand" spacing="lg" size="wide">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <SectionHeader
            eyebrow="Come ci paghi"
            title="Una percentuale sui ricavi, non un canone fisso."
            description="Se la casa non genera, non guadagniamo. È il modo più semplice per essere sicuri che stiamo lavorando sulla stessa cosa."
          />
          <div className="reveal rounded-lg border border-line-strong bg-white p-8">
            <p className="text-sm text-muted">Gestione a partire dal</p>
            <p className="mt-1 display-1 font-semibold text-ink">12%</p>
            <p className="mt-1 text-sm text-muted">dei ricavi generati</p>
            <p className="mt-6 border-t border-line pt-6 text-sm leading-relaxed text-ink-600">
              La percentuale dipende da quanto lavora la casa e da quante cose
              seguiamo. Te la diciamo dopo l&apos;analisi, per iscritto, prima di
              qualsiasi impegno.
            </p>
          </div>
        </div>
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
        <SectionHeader
          eyebrow="Dove operiamo"
          title="In tutta la Sicilia, perché si fa da remoto."
          description="È il vantaggio di partire dalla gestione digitale: non dipende da dove si trova la casa. Le attività sul posto arriveranno dopo, e su quelle saremo precisi su zone e tempi."
        />
      </Section>

      {/* FAQ */}
      <Section tone="cream" spacing="lg">
        <SectionHeader eyebrow="FAQ" title="Domande sulla gestione" />
        <FAQAccordion items={faqItems} className="mt-10" />
      </Section>

      <CTASection
        eyebrow="Primo passo"
        title="Scopri se il tuo immobile può rendere di più."
        description="Richiedi gratuitamente la nostra analisi e scopri quanto ti costa oggi gestire il tuo immobile, dove puoi ottimizzare le performance e se il nostro modello di gestione può essere conveniente per te."
        cta={ctas.analisi}
        note="Gratis. Senza impegno. Se dall'analisi risulta che non conviene, te lo diciamo."
      />
    </>
  );
}
