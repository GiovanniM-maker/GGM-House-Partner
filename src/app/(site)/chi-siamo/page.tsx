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
 * PLACEHOLDER — I profili dei fondatori non contengono nomi, ruoli o biografie
 * inventati. Vanno completati con i dati reali e con fotografie reali delle
 * persone: non usare immagini generate o foto stock di persone.
 */
const fondatori = [
  {
    ambito: "Territorio e ristrutturazioni",
    descrizione:
      "Esperienza concreta in ristrutturazioni, cantieri e rapporti con artigiani, imprese e tecnici in Sicilia. È la parte che permette a GGM di esserci fisicamente quando serve.",
    fotoLabel: "Foto reale del fondatore — da inserire",
  },
  {
    ambito: "Digitale e gestione online",
    descrizione:
      "Competenze in marketing, tecnologia, automazione e gestione di attività online. È la parte che permette di seguire una casa con continuità anche a distanza.",
    fotoLabel: "Foto reale del fondatore — da inserire",
  },
];

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
      "GGM è un progetto in avvio: non abbiamo ancora risultati come società e non ne inventiamo. Quello che mostriamo è l'esperienza professionale precedente dei fondatori, dichiarata come tale.",
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
        title="Dietro GGM ci sono persone che conoscono il territorio e il digitale."
        description="Un progetto nuovo, costruito su esperienza reale. Non abbiamo ancora una storia come società: abbiamo il lavoro che c'era prima e un modo preciso di affrontare questo."
        primaryCta={ctas.parlaci}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Chi siamo" }]}
        image={{
          alt: "Fondatori di GGM sul territorio siciliano",
          label:
            "Foto reale delle persone del progetto — non usare immagini generate",
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
          title="Due competenze che di solito stanno in aziende diverse"
          description="Il progetto nasce dall'incontro di due percorsi professionali distinti, ed è la ragione per cui può occuparsi sia dei lavori sia della gestione."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {fondatori.map((persona) => (
            <article
              key={persona.ambito}
              className="reveal overflow-hidden rounded-lg border border-line bg-cream"
            >
              <ImagePlaceholder
                alt={`Fondatore GGM — ${persona.ambito}`}
                label={persona.fotoLabel}
                ratio="wide"
                className="rounded-none"
                sizes="(min-width: 640px) 50vw, 100vw"
              />
              <div className="p-6 sm:p-8">
                <p className="text-xs font-semibold tracking-[0.16em] text-teal-700 uppercase">
                  {persona.ambito}
                </p>
                <p className="mt-4 leading-relaxed text-ink-600">
                  {persona.descrizione}
                </p>
                <p className="mt-5 text-xs leading-relaxed text-muted">
                  Nome, ruolo e biografia verranno pubblicati con i dati reali
                  delle persone del progetto.
                </p>
              </div>
            </article>
          ))}
        </div>
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
            alt="Professionisti al lavoro sul territorio"
            label="Foto reale — persone della rete al lavoro"
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
            alt="Paesaggio del sud-est siciliano"
            label="Foto reale — territorio, paese o architettura locale"
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
