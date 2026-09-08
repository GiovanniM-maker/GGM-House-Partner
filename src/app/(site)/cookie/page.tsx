import { LegalPage } from "@/components/sections/LegalPage";
import { routes } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cookie policy",
  description:
    "Quali cookie e strumenti di tracciamento utilizza il sito. Documento in corso di definizione.",
  path: routes.cookie,
});

export default function CookiePage() {
  return (
    <LegalPage
      title="Cookie policy"
      intro="Quali cookie e strumenti simili utilizza questo sito, e come gestirli."
      sections={[
        {
          heading: "Stato attuale",
          body: (
            <p>
              Questa versione del sito non utilizza cookie di profilazione né
              strumenti di analisi di terze parti. Se verranno attivati, questa
              pagina sarà aggiornata e verrà introdotto un banner di consenso.
            </p>
          ),
        },
        {
          heading: "Identificativi di clic pubblicitario",
          body: (
            <>
              <p>
                Se arrivi sul sito da un annuncio Google, l&apos;indirizzo della
                pagina contiene un identificativo del clic (<code>gclid</code>,
                <code> gbraid</code> o <code>wbraid</code>). Il sito lo conserva
                nella memoria locale del tuo browser e lo allega alla richiesta,
                se decidi di compilare il modulo.
              </p>
              <p>
                Serve solo a capire da quale annuncio è arrivata una richiesta.
                Non identifica la persona, non viene usato per profilazione e
                non viene ceduto a terzi al di fuori della rendicontazione della
                campagna. Viene scartato dopo 90 giorni e puoi rimuoverlo
                svuotando i dati del sito dal tuo browser.
              </p>
              <p>
                Da completare con la valutazione sul consenso, insieme alla
                revisione professionale del documento.
              </p>
            </>
          ),
        },
        {
          heading: "Cookie tecnici",
          body: (
            <p>
              Da completare con l&apos;elenco dei cookie tecnici effettivamente
              impostati dalla piattaforma di hosting, con finalità e durata.
            </p>
          ),
        },
        {
          heading: "Cookie analitici e di terze parti",
          body: (
            <p>
              Da completare al momento dell&apos;eventuale attivazione di
              strumenti di misurazione o di servizi esterni, indicando fornitore,
              finalità, durata e modalità di revoca del consenso.
            </p>
          ),
        },
        {
          heading: "Come gestire i cookie",
          body: (
            <p>
              Puoi gestire o eliminare i cookie dalle impostazioni del tuo
              browser. Da completare con le istruzioni specifiche e con il
              riferimento allo strumento di gestione del consenso, una volta
              adottato.
            </p>
          ),
        },
      ]}
    />
  );
}
