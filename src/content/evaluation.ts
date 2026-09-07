/** Opzioni del modulo "Valuta la tua casa". Neutre, nessun dato inventato. */

export const province = [
  "Agrigento",
  "Caltanissetta",
  "Catania",
  "Enna",
  "Messina",
  "Palermo",
  "Ragusa",
  "Siracusa",
  "Trapani",
] as const;

export const tipologie = [
  "Appartamento",
  "Casa indipendente",
  "Villa o villetta",
  "Rustico o casale",
  "Immobile da ristrutturare",
  "Altro",
] as const;

export const camere = ["1", "2", "3", "4", "5 o più", "Non so"] as const;

export const condizioni = [
  {
    value: "da-ristrutturare",
    label: "Da ristrutturare completamente",
    hint: "Impianti, finiture e superfici da rifare.",
  },
  {
    value: "parziale",
    label: "Da sistemare in parte",
    hint: "Struttura sana, alcuni interventi mirati.",
  },
  {
    value: "buono",
    label: "In buono stato",
    hint: "Abitabile così com'è.",
  },
  {
    value: "ristrutturata",
    label: "Ristrutturata di recente",
    hint: "Lavori conclusi negli ultimi anni.",
  },
  { value: "non-so", label: "Non saprei dirlo con precisione" },
] as const;

export const obiettivi = [
  {
    value: "ristrutturare",
    label: "Voglio ristrutturarla",
    hint: "Ci sono lavori da fare e serve qualcuno che li segua sul posto.",
  },
  {
    value: "reddito",
    label: "Voglio metterla a reddito",
    hint: "La casa è utilizzabile e vorrei che producesse qualcosa.",
  },
  {
    value: "entrambe",
    label: "Voglio fare entrambe le cose",
    hint: "Sistemarla e poi affidarne la gestione.",
  },
  {
    value: "non-so",
    label: "Non so ancora cosa farne",
    hint: "Va benissimo: partiamo dall'analisi dell'immobile.",
  },
] as const;

export const residenze = [
  "In Sicilia",
  "In un'altra regione italiana",
  "All'estero",
] as const;

export const utilizzi = [
  { value: "vuota", label: "È vuota" },
  { value: "abitata", label: "È abitata stabilmente" },
  { value: "occasionale", label: "La usiamo occasionalmente" },
  { value: "affittata", label: "È già affittata" },
] as const;

export const caratteristiche = [
  "Giardino",
  "Terrazzo",
  "Balcone",
  "Piscina",
  "Parcheggio o garage",
  "Vista mare",
  "Vicino al mare",
  "Centro storico",
  "Ascensore",
  "Climatizzazione",
  "Impianti da rifare",
  "Spazio esterno comune",
] as const;

export const formSteps = [
  { id: 1, title: "L'immobile", short: "Immobile" },
  { id: 2, title: "Cosa vorresti farne", short: "Obiettivo" },
  { id: 3, title: "Tu e l'utilizzo della casa", short: "Utilizzo" },
  { id: 4, title: "Caratteristiche", short: "Dettagli" },
  { id: 5, title: "Come ti ricontattiamo", short: "Contatti" },
] as const;

export const TOTAL_STEPS = formSteps.length;
