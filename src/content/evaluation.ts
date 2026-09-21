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

/** Filtro lead: servono a capire se l'immobile e il proprietario sono in target. */
export const numeroImmobili = ["1", "2", "3-5", "5+"] as const;

export const ricaviAttuali = [
  "Meno di 10.000 € l'anno",
  "10.000 - 20.000 €",
  "20.000 - 30.000 €",
  "30.000 - 50.000 €",
  "Oltre 50.000 €",
  "Non lo so",
] as const;

export const annunciAttivi = [
  { value: "airbnb", label: "Airbnb" },
  { value: "booking", label: "Booking.com" },
  { value: "entrambi", label: "Entrambi" },
  { value: "altro", label: "Un altro portale" },
  { value: "no", label: "Non è ancora online" },
] as const;

export const formSteps = [
  { id: 1, title: "L'immobile", short: "Immobile" },
  { id: 2, title: "Come lavora oggi", short: "Numeri" },
  { id: 3, title: "Tu e l'utilizzo della casa", short: "Utilizzo" },
  { id: 4, title: "Caratteristiche", short: "Dettagli" },
  { id: 5, title: "Come ti ricontattiamo", short: "Contatti" },
] as const;

export const TOTAL_STEPS = formSteps.length;

/** Limiti sugli allegati. Il tetto tiene conto del limite di corpo richiesta di Vercel. */
export const MAX_PHOTOS = 8;
export const MAX_TOTAL_PHOTO_BYTES = 3.5 * 1024 * 1024;

type Option = { value: string; label: string };

/**
 * Traduce il valore tecnico di un campo nell'etichetta mostrata nel modulo.
 * Serve a scrivere sul foglio testo leggibile invece di slug.
 */
export function labelFor(
  options: readonly Option[],
  value: string,
): string {
  return options.find((option) => option.value === value)?.label ?? value;
}
