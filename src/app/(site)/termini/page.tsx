import { LegalPage } from "@/components/sections/LegalPage";
import { routes } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Termini e condizioni",
  description:
    "Condizioni di utilizzo del sito e natura delle informazioni pubblicate. Documento in corso di definizione.",
  path: routes.termini,
});

export default function TerminiPage() {
  return (
    <LegalPage
      title="Termini e condizioni"
      intro="Le condizioni di utilizzo di questo sito e la natura delle informazioni che vi trovi."
      sections={[
        {
          heading: "Natura delle informazioni",
          body: (
            <p>
              I contenuti di questo sito hanno finalità informativa e descrivono
              i servizi che GGM può svolgere. Non costituiscono un&apos;offerta
              contrattuale, un preventivo, né una consulenza tecnica, fiscale o
              legale.
            </p>
          ),
        },
        {
          heading: "Nessuna garanzia di risultato",
          body: (
            <p>
              Non forniamo garanzie di rendimento sugli immobili. Ogni valutazione
              dipende da posizione, stato dell&apos;immobile, domanda della zona,
              stagionalità e altri fattori variabili, e viene formulata solo dopo
              l&apos;analisi del singolo caso.
            </p>
          ),
        },
        {
          heading: "Copertura del servizio",
          body: (
            <p>
              La gestione online è disponibile in tutta la Sicilia. Le attività
              che richiedono presenza fisica sono attive solo nelle aree coperte
              dalla rete di professionisti, inizialmente la provincia di Ragusa e
              le zone limitrofe servite.
            </p>
          ),
        },
        {
          heading: "Ruolo di GGM e dei professionisti coinvolti",
          body: (
            <p>
              GGM coordina i percorsi descritti sul sito. Le lavorazioni
              specialistiche e le attività che richiedono abilitazioni specifiche
              sono eseguite da professionisti qualificati. Da completare con la
              disciplina dei rapporti contrattuali e delle responsabilità.
            </p>
          ),
        },
        {
          heading: "Richieste inviate tramite il modulo",
          body: (
            <p>
              L&apos;invio del modulo di valutazione non genera alcun obbligo, per
              te né per noi. Eventuali incarichi vengono formalizzati
              separatamente e per iscritto.
            </p>
          ),
        },
        {
          heading: "Proprietà dei contenuti e legge applicabile",
          body: (
            <p>
              Da completare con le clausole su proprietà intellettuale, modifiche
              ai termini, legge applicabile e foro competente.
            </p>
          ),
        },
      ]}
    />
  );
}
