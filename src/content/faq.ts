/**
 * FAQ del sito, organizzate per categoria.
 *
 * Ogni voce dichiara le pagine in cui può comparire (`tags`), così la stessa
 * risposta resta scritta una sola volta e le pagine servizio mostrano solo
 * il sottoinsieme che le riguarda.
 */

export type FaqTag =
  | "ristrutturazione"
  | "property-management"
  | "integrato"
  | "operativita"
  | "pagamenti"
  | "copertura";

export type FaqItem = {
  question: string;
  answer: string;
  tags: FaqTag[];
};

export type FaqCategory = {
  id: FaqTag;
  title: string;
  intro?: string;
  items: FaqItem[];
};

export const faqCategories: FaqCategory[] = [
  {
    id: "ristrutturazione",
    title: "Ristrutturazione",
    items: [
      {
        question: "Dove operate con i lavori?",
        answer:
          "Principalmente nella provincia di Ragusa e nelle aree limitrofe coperte dalla nostra rete di tecnici e artigiani. Se la casa si trova fuori da queste zone te lo diciamo subito, senza farti perdere tempo.",
        tags: ["ristrutturazione", "copertura"],
      },
      {
        question: "Posso affidarvi i lavori se vivo fuori dalla Sicilia?",
        answer:
          "Sì, è una delle situazioni per cui GGM esiste. Hai un unico referente che segue il cantiere sul posto, ti aggiorna e coordina le persone coinvolte, così non devi organizzare tutto a distanza.",
        tags: ["ristrutturazione", "operativita"],
      },
      {
        question: "Fate tutti i lavori internamente?",
        answer:
          "No, e preferiamo dirlo chiaramente. GGM coordina il progetto e il cantiere; gli interventi specialistici — impianti elettrici, idraulici, pratiche tecniche — sono eseguiti da professionisti qualificati della rete, ciascuno per la propria competenza.",
        tags: ["ristrutturazione", "operativita"],
      },
      {
        question: "Come nasce il preventivo?",
        answer:
          "Da un sopralluogo e da un'analisi dello stato reale dell'immobile. Non diamo cifre a distanza sulla base di due foto: preferiamo vedere la casa e poi mettere per iscritto lavorazioni, tempi e costi.",
        tags: ["ristrutturazione", "pagamenti"],
      },
    ],
  },
  {
    id: "property-management",
    title: "Property Management",
    items: [
      {
        question: "Gestite case in tutta la Sicilia?",
        answer:
          "La gestione online — annunci, prezzi, calendario, prenotazioni e comunicazione — la seguiamo in tutta la Sicilia. Le attività fisiche, come check-in, pulizie e controlli, solo dove esiste una rete locale affidabile.",
        tags: ["property-management", "copertura"],
      },
      {
        question: "Gestite annunci su Airbnb e Booking?",
        answer:
          "Sì, quando è compatibile con la strategia scelta per la casa e con le regole del territorio. La scelta dei canali arriva dopo l'analisi, non prima.",
        tags: ["property-management"],
      },
      {
        question: "Vi occupate di check-in e pulizie?",
        answer:
          "Dove è disponibile la rete locale, sì: check-in e check-out, pulizie, preparazione dell'immobile e controlli periodici. Dove la rete non c'è, non lo promettiamo.",
        tags: ["property-management", "operativita"],
      },
      {
        question: "Garantite un rendimento?",
        answer:
          "No. Nessuno può garantire un rendimento su un immobile: dipende da posizione, stagionalità, domanda, stato della casa e concorrenza. Possiamo analizzare il potenziale della tua casa e spiegarti su cosa si basa la nostra valutazione, senza promesse.",
        tags: ["property-management", "integrato"],
      },
    ],
  },
  {
    id: "integrato",
    title: "Ristruttura & Metti a Reddito",
    items: [
      {
        question: "Qualsiasi casa può diventare una casa vacanza?",
        answer:
          "No. Alcune case rendono di più con un affitto a medio termine, altre conviene sistemarle per usarle o per venderle. Non tutte le case devono diventare case vacanza: è una scelta che va fatta dopo l'analisi.",
        tags: ["integrato"],
      },
      {
        question: "Devo per forza ristrutturare per mettere a reddito?",
        answer:
          "No. A volte bastano interventi mirati, arredo e una preparazione seria dell'immobile. Guardare la casa prima di aprire un cantiere serve proprio a capire quanto investimento ha davvero senso.",
        tags: ["integrato"],
      },
      {
        question: "Potete gestire la casa dopo la ristrutturazione?",
        answer:
          "Sì, dove la zona e la rete lo permettono. È il percorso integrato: analisi, lavori, preparazione, messa online e gestione con un unico referente.",
        tags: ["integrato", "property-management"],
      },
    ],
  },
  {
    id: "operativita",
    title: "Operatività e primo contatto",
    items: [
      {
        question: "Come funziona il primo contatto?",
        answer:
          "Compili il modulo raccontandoci la casa, noi analizziamo le informazioni e ti ricontattiamo per approfondire. Se serve, organizziamo un sopralluogo e solo dopo definiamo il percorso.",
        tags: ["operativita"],
      },
      {
        question: "Compilare il modulo mi vincola a qualcosa?",
        answer:
          "No. Il modulo serve a capire di che casa stiamo parlando e a darti una risposta utile. Non è un impegno e non è un contratto.",
        tags: ["operativita", "pagamenti"],
      },
      {
        question: "Come seguo i lavori se vivo lontano?",
        answer:
          "Con un rapporto diretto con il tuo referente, aggiornamenti durante il percorso, documentazione delle fasi e decisioni condivise prima che vengano prese sul cantiere.",
        tags: ["operativita", "ristrutturazione"],
      },
      {
        question: "In quanto tempo rispondete?",
        answer:
          "Leggiamo tutte le richieste e rispondiamo appena abbiamo analizzato le informazioni che ci hai lasciato. Se manca qualcosa per darti una risposta seria, te lo chiediamo invece di tirare a indovinare.",
        tags: ["operativita"],
      },
    ],
  },
  {
    id: "pagamenti",
    title: "Pagamenti e contratti",
    items: [
      {
        question: "Quanto costa la gestione della casa?",
        answer:
          "Il modello economico del property management non è ancora definitivo e non pubblichiamo tariffe che potrebbero cambiare. Le condizioni vengono definite e messe per iscritto dopo l'analisi dell'immobile, prima di qualsiasi impegno.",
        tags: ["pagamenti", "property-management"],
      },
      {
        question: "La valutazione iniziale si paga?",
        answer:
          "La prima analisi delle informazioni che ci lasci nel modulo non ha costi. Eventuali attività successive — sopralluoghi, progetti, pratiche tecniche — vengono concordate prima, con costi chiari.",
        tags: ["pagamenti"],
      },
      {
        question: "Come vengono formalizzati gli accordi?",
        answer:
          "Per iscritto, con oggetto dell'incarico, attività incluse e condizioni. Nessuna attività parte senza che tu sappia cosa comprende e cosa no.",
        tags: ["pagamenti"],
      },
    ],
  },
  {
    id: "copertura",
    title: "Dove operiamo",
    items: [
      {
        question: "Qual è la differenza fra gestione online e operatività locale?",
        answer:
          "La gestione online riguarda tutto ciò che si può seguire a distanza e la copriamo in tutta la Sicilia. L'operatività locale riguarda ciò che richiede una persona sul posto ed è attiva inizialmente nella provincia di Ragusa e nelle aree coperte dalla rete.",
        tags: ["copertura", "property-management"],
      },
      {
        question: "State ampliando le zone coperte?",
        answer:
          "Il progetto cresce insieme alla rete di professionisti sul territorio. Preferiamo aggiungere una zona quando abbiamo persone di cui ci fidiamo, non prima.",
        tags: ["copertura"],
      },
      {
        question: "La mia casa è fuori dalle aree coperte: potete fare qualcosa?",
        answer:
          "Spesso sì, ma solo per la parte online. Te lo diciamo con chiarezza al primo contatto, così decidi con informazioni corrette.",
        tags: ["copertura"],
      },
    ],
  },
];

/** Tutte le domande in un unico elenco. */
export const allFaqItems: FaqItem[] = faqCategories.flatMap((c) => c.items);

/** Seleziona le FAQ pertinenti a una pagina, con un limite opzionale. */
export function faqByTag(tag: FaqTag, limit?: number): FaqItem[] {
  const items = allFaqItems.filter((item) => item.tags.includes(tag));
  return typeof limit === "number" ? items.slice(0, limit) : items;
}
