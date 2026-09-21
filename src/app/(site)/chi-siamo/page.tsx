import { CTASection } from "@/components/sections/CTASection";
import { FeatureBlock } from "@/components/sections/FeatureBlock";
import { Hero } from "@/components/sections/Hero";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { TransparencyBlock } from "@/components/sections/TransparencyBlock";
import { Section } from "@/components/ui/Section";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { coverage, ctas, routes } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Chi siamo",
  description:
    "GGM è un progetto nuovo costruito su esperienza professionale reale: ristrutturazioni e territorio siciliano da una parte, competenze digitali e gestione online dall'altra.",
  path: routes.chiSiamo,
});

/**
 * Profilo del fondatore. Nessun dato inventato: la biografia si limita
 * all'ambito di competenza, e la fotografia è reale.
 */
const fondatore = {
  nome: "Giovanni Mavilla",
  ambito: "Digitale e gestione online",
  foto: "/images/giovanni-mavilla.jpg",
  descrizione:
    "Competenze in marketing, tecnologia, automazione e gestione di attività online. È la parte che permette di seguire una casa con continuità anche a distanza, che è poi il motivo per cui GGM può occuparsi di una casa in Sicilia mentre il proprietario vive altrove.",
};

const dueMondi = [
  {
    title: "Il territorio",
    description:
      "Conoscere i luoghi e le persone significa sapere chi chiamare, cosa è realistico e quanto tempo serve davvero. Non è un valore astratto: è la differenza fra un cantiere che avanza e uno che si ferma.",
  },
  {
    title: "Il digitale",
    description:
      "Strumenti online, processi e comunicazione strutturata permettono di seguire un immobile senza essere fisicamente presenti ogni giorno. È quello che rende possibile lavorare per chi vive lontano.",
  },
];

const metodo = [
  {
    title: "Prima si guarda, poi si decide",
    description:
      "Nessun preventivo a distanza e nessuna strategia scelta prima di aver capito di che casa si tratta.",
  },
  {
    title: "Un unico referente",
    description:
      "Una persona con cui parlare, che conosce il tuo immobile e risponde del percorso.",
  },
  {
    title: "Coordinamento, non tuttofare",
    description:
      "Le lavorazioni specialistiche le eseguono professionisti qualificati. Noi teniamo insieme il progetto.",
  },
  {
    title: "Dire di no quando serve",
    description:
      "Se una zona non è coperta o un'operazione non ha senso, lo diciamo invece di prendere l'incarico comunque.",
  },
];

const trasparenza = [
  {
    claim: "Casi studio e numeri di GGM",
    reality:
      "GGM è un progetto in avvio: non abbiamo ancora risultati come società e non ne inventiamo. Quello che mostriamo è l'esperienza professionale precedente del fondatore, dichiarata come tale.",
  },
  {
    claim: "Presenza fisica in tutta la Sicilia",
    reality: `La gestione online copre l'intera isola. Le attività sul posto sono attive dove esiste una rete affidabile: ${coverage.local.area.toLowerCase()}.`,
  },
  {
    claim: "Rendimenti garantiti",
    reality:
      "Nessuno può garantire il rendimento di un immobile. Possiamo analizzarne il potenziale e spiegarti su cosa si basa la valutazione.",
  },
  {
    claim: "Che ogni casa debba diventare casa vacanza",
    reality:
      "Per molte case è la strada sbagliata. La formula giusta si decide dopo aver guardato immobile, zona e obiettivo.",
  },
];

export default function ChiSiamoPage() {
  return (
    <>
      <Hero
        eyebrow="Chi siamo"
        title="Dietro GGM c'è una persona, e una rete che sta crescendo."
        description="Un progetto nuovo, costruito su esperienza reale. Non abbiamo ancora una storia come società: abbiamo il lavoro che c'era prima e un modo preciso di affrontare questo."
        primaryCta={ctas.parlaci}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Chi siamo" }]}
        image={{
          src: "/images/giovanni-mavilla.jpg",
          alt: "Giovanni Mavilla, fondatore di GGM",
          ratio: "square",
          className: "mx-auto max-w-xs sm:max-w-sm",
        }}
      />

      {/* Perché nasce GGM */}
      <Section tone="cream" spacing="lg">
        <SectionHeader
          eyebrow="Perché nasce GGM"
          title="Da un problema semplice, ripetuto tante volte."
          description={
            <div className="space-y-4">
              <p>
                Chi possiede una casa in Sicilia ma vive lontano ha quasi sempre
                lo stesso bisogno: qualcuno di cui fidarsi che stia sul posto.
              </p>
              <p>
                Non un&apos;impresa da chiamare per un lavoro e poi non sentire
                più. Non un gestore online che non ha mai visto la casa. Una
                persona che tenga insieme le due cose e risponda del risultato.
              </p>
              <p>
                GGM nasce per stare esattamente lì, in mezzo: sul territorio e
                online, per la stessa casa e lo stesso proprietario.
              </p>
            </div>
          }
        />
      </Section>

      {/* Le persone */}
      <Section tone="white" spacing="lg" size="wide">
        <SectionHeader
          eyebrow="Le persone"
          title="Chi risponde quando scrivi a GGM"
          description="Un progetto piccolo ha un vantaggio: sai con chi stai parlando fin dal primo messaggio."
        />

        <article className="reveal mt-12 grid gap-8 rounded-lg border border-line bg-cream p-6 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:items-start sm:gap-10 sm:p-8">
          <ImagePlaceholder
            src={fondatore.foto}
            alt={`${fondatore.nome}, fondatore di GGM`}
            ratio="square"
            sizes="(min-width: 640px) 240px, 100vw"
          />
          <div>
            <h3 className="display-3 font-semibold text-ink">
              {fondatore.nome}
            </h3>
            <p className="mt-2 text-xs font-semibold tracking-[0.16em] text-gold-700 uppercase">
              {fondatore.ambito}
            </p>
            <p className="mt-5 leading-relaxed text-ink-600">
              {fondatore.descrizione}
            </p>
          </div>
        </article>
      </Section>

      {/* Due mondi */}
      <Section tone="ink" spacing="lg" size="wide">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <SectionHeader
            eyebrow="Due mondi"
            title="Esserci quando serve. Esserci anche quando non si è."
            description="Sono due capacità diverse e servono entrambe. Il territorio permette di intervenire fisicamente; il digitale permette di seguire con continuità."
            tone="dark"
          />
          <FeatureBlock
            features={dueMondi}
            columns={2}
            tone="dark"
            variant="card"
          />
        </div>
      </Section>

      {/* Network */}
      <Section tone="cream" spacing="lg" size="wide">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16">
          <SectionHeader
            eyebrow="Il network"
            title="Non lavoriamo da soli, e non fingiamo di farlo."
            description={
              <div className="space-y-4">
                <p>
                  Intorno a GGM ci sono tecnici, artigiani, professionisti
                  abilitati e operatori locali. Sono loro che eseguono le
                  lavorazioni specialistiche e le attività sul posto.
                </p>
                <p>
                  Il nostro compito è scegliere le persone giuste, coordinarle e
                  rispondere del risultato davanti a te. Per questo la copertura
                  fisica cresce solo dove la rete esiste davvero.
                </p>
              </div>
            }
          />
          <ImagePlaceholder
            src="/images/persone-consegna-chiavi.jpg"
            alt="Due persone in controluce sulla soglia di una casa in pietra, una consegna le chiavi all'altra"
            ratio="photo"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </div>
      </Section>

      {/* Metodo */}
      <Section tone="white" spacing="lg" size="wide">
        <SectionHeader
          eyebrow="Il metodo"
          title="Quattro regole che ci siamo dati"
        />
        <FeatureBlock features={metodo} columns={4} className="mt-12" />
      </Section>

      {/* Trasparenza */}
      <Section tone="sand" spacing="lg" size="wide">
        <TransparencyBlock
          items={trasparenza}
          description="Siamo un progetto nuovo. L'unica cosa che possiamo offrire subito è essere precisi su cosa siamo e cosa non siamo ancora."
        />
      </Section>

      {/* Territorio */}
      <Section tone="cream" spacing="lg" size="wide">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <ImagePlaceholder
            src="/images/chi-siamo-territorio.jpg"
            alt="Dettaglio barocco in pietra calcarea sotto un balcone, con luce laterale netta"
            ratio="photo"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <SectionHeader
            eyebrow="Il territorio"
            title="Si parte dalla provincia di Ragusa."
            description={
              <div className="space-y-4">
                <p>
                  Le attività locali sono concentrate dove conosciamo i luoghi e
                  le persone. È una scelta, non un limite temporaneo da nascondere:
                  preferiamo coprire bene poche zone che male tutta l&apos;isola.
                </p>
                <p>
                  La gestione online, invece, la seguiamo in tutta la Sicilia: se
                  la tua casa è fuori dalle aree coperte, te lo diciamo subito e
                  ti spieghiamo cosa possiamo comunque fare.
                </p>
              </div>
            }
          />
        </div>
      </Section>

      <CTASection
        eyebrow="Primo passo"
        title="Hai una casa in Sicilia? Parliamone."
        description="Raccontaci dov'è e cosa vorresti farne. Ti rispondiamo con quello che vediamo davvero."
        cta={ctas.parlaci}
        secondary={{ label: "Come funziona", href: routes.comeFunziona }}
      />
    </>
  );
}
