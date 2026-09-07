import { PropertyEvaluationForm } from "@/components/form/PropertyEvaluationForm";
import { Container } from "@/components/ui/Container";
import { coverage, routes } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Valuta la tua casa",
  description:
    "Raccontaci la casa che hai in Sicilia: località, stato, obiettivo. Analizziamo la richiesta e ti ricontattiamo. Nessun impegno.",
  path: routes.valutazione,
});

const dopo = [
  {
    title: "Ci racconti la casa",
    description: "Pochi minuti: località, stato, cosa vorresti farne.",
  },
  {
    title: "Analizziamo",
    description:
      "Guardiamo immobile, zona e obiettivo e verifichiamo cosa possiamo seguire.",
  },
  {
    title: "Ti ricontattiamo",
    description:
      "Ti diciamo cosa vediamo e quali strade hanno senso. Anche se la risposta è no.",
  },
  {
    title: "Se serve, vediamo l'immobile",
    description:
      "Il sopralluogo arriva quando c'è qualcosa di concreto da valutare.",
  },
];

export default function ValutaLaTuaCasaPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-line bg-cream">
        <Container size="wide" className="py-14 sm:py-20">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-gold-700 uppercase">
              Valuta la tua casa
            </p>
            <h1 className="display-1 font-semibold text-ink">
              Raccontaci cosa hai in Sicilia.
            </h1>
            <p className="mt-6 lead text-muted">
              Che tu voglia ristrutturarla, metterla a reddito o non sappia
              ancora quale sia la strada migliore, partiamo dall&apos;immobile.
            </p>
          </div>
        </Container>
      </section>

      {/* Cosa succede dopo */}
      <section className="bg-white">
        <Container size="wide" className="py-12 sm:py-16">
          <h2 className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">
            Cosa succede dopo
          </h2>
          <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {dopo.map((item, index) => (
              <li key={item.title} className="border-t border-line pt-5">
                <span className="text-xs font-semibold tracking-[0.16em] text-gold-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Form */}
      <section className="bg-cream">
        <Container size="wide" className="py-12 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-14">
            <PropertyEvaluationForm />

            <aside className="lg:pt-4">
              <div className="rounded-lg border border-line bg-white p-6">
                <h2 className="text-sm font-semibold text-ink">
                  Perché ti chiediamo queste cose
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Servono a capire se possiamo esserti utili e a darti una
                  risposta concreta invece di una risposta generica. Più sei
                  preciso, più la nostra analisi vale qualcosa.
                </p>
              </div>

              <div className="mt-5 rounded-lg border border-line bg-white p-6">
                <h2 className="text-sm font-semibold text-ink">Dove operiamo</h2>
                <dl className="mt-4 space-y-4 text-sm">
                  <div>
                    <dt className="font-medium text-ink">
                      {coverage.online.title}
                    </dt>
                    <dd className="mt-1 text-muted">{coverage.online.area}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-ink">
                      {coverage.local.title}
                    </dt>
                    <dd className="mt-1 text-muted">{coverage.local.area}</dd>
                  </div>
                </dl>
                <p className="mt-4 text-xs leading-relaxed text-muted">
                  {coverage.note}
                </p>
              </div>

              <ul className="mt-5 space-y-3 text-sm text-muted">
                <li className="flex gap-2.5">
                  <Dot />
                  Compilare il modulo non comporta alcun impegno.
                </li>
                <li className="flex gap-2.5">
                  <Dot />
                  Non pubblichiamo e non cediamo i tuoi dati.
                </li>
                <li className="flex gap-2.5">
                  <Dot />
                  Non promettiamo rendimenti: prima analizziamo la casa.
                </li>
              </ul>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}

function Dot() {
  return (
    <span
      aria-hidden="true"
      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
    />
  );
}
