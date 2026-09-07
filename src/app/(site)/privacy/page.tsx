import { LegalPage } from "@/components/sections/LegalPage";
import { routes } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy policy",
  description:
    "Come trattiamo i dati personali raccolti tramite il sito e il modulo di valutazione. Documento in corso di definizione.",
  path: routes.privacy,
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      intro="Come trattiamo i dati personali che ci lasci attraverso il sito e il modulo di valutazione."
      sections={[
        {
          heading: "Titolare del trattamento",
          body: (
            <p>
              Da completare con denominazione, forma giuridica, sede, partita IVA
              e indirizzo di contatto del titolare del trattamento.
            </p>
          ),
        },
        {
          heading: "Dati raccolti",
          body: (
            <>
              <p>
                Attraverso il modulo &laquo;Valuta la tua casa&raquo; raccogliamo
                le informazioni che inserisci volontariamente:
              </p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>dati sull&apos;immobile: località, tipologia, superficie, stato;</li>
                <li>l&apos;obiettivo che indichi e le informazioni sull&apos;utilizzo della casa;</li>
                <li>dati di contatto: nome, email, telefono e preferenza per WhatsApp;</li>
                <li>eventuali fotografie e note che decidi di allegare.</li>
              </ul>
              <p>
                Da completare con l&apos;indicazione dei dati raccolti
                automaticamente dagli strumenti tecnici effettivamente attivi.
              </p>
            </>
          ),
        },
        {
          heading: "Finalità e base giuridica",
          body: (
            <p>
              I dati vengono utilizzati per rispondere alla tua richiesta,
              analizzare la situazione dell&apos;immobile e proporti un percorso.
              Da completare con basi giuridiche, eventuali finalità ulteriori e
              relativi consensi.
            </p>
          ),
        },
        {
          heading: "Conservazione e comunicazione dei dati",
          body: (
            <p>
              Da completare con i tempi di conservazione e con l&apos;elenco dei
              soggetti che possono trattare i dati per nostro conto (fornitori di
              posta elettronica, CRM, hosting e professionisti coinvolti nel
              percorso).
            </p>
          ),
        },
        {
          heading: "I tuoi diritti",
          body: (
            <p>
              Puoi chiedere accesso, rettifica, cancellazione, limitazione e
              portabilità dei dati, e opporti al trattamento. Da completare con
              l&apos;indirizzo a cui inviare le richieste e con le modalità di
              reclamo all&apos;autorità di controllo.
            </p>
          ),
        },
      ]}
    />
  );
}
