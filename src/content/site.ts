/**
 * Configurazione globale del sito.
 *
 * Tutto ciò che è testo di brand, navigazione, CTA e copertura vive qui:
 * le pagine restano dichiarative e il copy si aggiorna in un punto solo.
 *
 * ATTENZIONE: i campi marcati con TODO sono PLACEHOLDER da sostituire con
 * dati reali prima della pubblicazione.
 */

/** Dominio di fallback finché non è stato deciso quello definitivo. */
const FALLBACK_SITE_URL = "https://www.ggm-sicily.example";

/**
 * Risolve l'URL pubblico del sito, usato per canonical, Open Graph e sitemap.
 *
 * Deve essere impossibile far fallire la build con una variabile d'ambiente
 * mal configurata: una variabile presente ma vuota (caso tipico su Vercel),
 * senza protocollo o non valida non deve rompere `new URL()`.
 *
 * Ordine di precedenza:
 *   1. NEXT_PUBLIC_SITE_URL, se valorizzata
 *   2. il dominio di produzione Vercel
 *   3. l'URL del deployment corrente (utile per le preview delle pull request)
 *   4. il dominio placeholder
 */
function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
    FALLBACK_SITE_URL,
  ];

  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (!value) continue;

    // I domini forniti da Vercel arrivano senza protocollo.
    const withProtocol = /^https?:\/\//.test(value) ? value : `https://${value}`;

    try {
      return new URL(withProtocol).origin;
    } catch {
      // Valore non valido: si passa al candidato successivo.
    }
  }

  return FALLBACK_SITE_URL;
}

export const site = {
  name: "GGM",
  tagline: "Your Sicily Property Partner",
  fullName: "GGM Your Sicily Property Partner",
  positioning: "Partner locale per chi possiede una casa in Sicilia.",
  /** Titolo usato nei metadata della home e nell'immagine Open Graph. */
  metaTitle:
    "GGM Your Sicily Property Partner | Ristrutturazione e gestione di case in Sicilia",
  description:
    "Ristrutturiamo, valorizziamo e gestiamo immobili in Sicilia, anche se vivi lontano. Un unico referente per seguire la tua casa, dai lavori alla messa a reddito.",
  /** TODO: impostare NEXT_PUBLIC_SITE_URL con il dominio definitivo. */
  url: resolveSiteUrl(),
  /**
   * Lockup completo del logo: marchio, tagline, filetto e payoff.
   * Usato dove c'è spazio per leggerlo, cioè il footer.
   * Se il file manca, il componente ricade sul lettering senza mostrare
   * un'immagine rotta.
   */
  logo: "/images/logo-ggm.png",
  /**
   * Solo il marchio, senza tagline né payoff. Nella navbar, alta poco più di
   * 40px, la tagline del lockup diventa una macchia: qui il marchio fa
   * l'immagine e la tagline la scrive il componente come testo.
   */
  logoMark: "/images/logo-ggm-marchio.png",
  /**
   * Versione chiara per i fondi scuri. Se manca, il logo viene schiarito
   * automaticamente.
   */
  logoDark: "/images/logo-ggm-chiaro.png" as string | null,
  locale: "it_IT",
} as const;

/** TODO: recapiti reali. Finché sono placeholder non vengono mostrati nel footer. */
export const contact = {
  email: null as string | null,
  phone: null as string | null,
  whatsapp: null as string | null,
} as const;

export const routes = {
  home: "/",
  ristrutturazione: "/ristrutturazione",
  propertyManagement: "/property-management",
  integrato: "/ristruttura-e-metti-a-reddito",
  comeFunziona: "/come-funziona",
  chiSiamo: "/chi-siamo",
  valutazione: "/valuta-la-tua-casa",
  faq: "/faq",
  privacy: "/privacy",
  cookie: "/cookie",
  termini: "/termini",
} as const;

/** CTA globale, presente in navbar e in chiusura di ogni pagina. */
export const primaryCta = {
  label: "Analisi gratuita",
  href: routes.valutazione,
} as const;

/** CTA specifiche di pagina (portano tutte alla stessa conversion page). */
export const ctas = {
  /** Conversione principale dell'avvio: l'analisi viene prima della vendita. */
  analisi: {
    label: "Analizza gratuitamente il mio immobile",
    href: routes.valutazione,
  },
  sopralluogo: { label: "Richiedi un sopralluogo", href: routes.valutazione },
  potenziale: {
    label: "Valuta il potenziale della tua casa",
    href: routes.valutazione,
  },
  parlaci: { label: "Parlaci della tua casa", href: routes.valutazione },
} as const;

/**
 * Navigazione dell'avvio. Si parte con il solo property management: le pagine
 * di ristrutturazione e del percorso integrato restano nel repository, pronte,
 * ma fuori dai menu finché il servizio non è davvero attivo. Promuovere un
 * servizio che non si può ancora erogare è il modo più veloce per bruciare la
 * fiducia di un proprietario.
 */
export const mainNav = [
  { label: "Property Management", href: routes.propertyManagement },
  { label: "Come funziona", href: routes.comeFunziona },
  { label: "Chi siamo", href: routes.chiSiamo },
] as const;

export const footerNav = {
  servizi: [
    { label: "Property Management", href: routes.propertyManagement },
    { label: "Come funziona", href: routes.comeFunziona },
    { label: "Domande frequenti", href: routes.faq },
  ],
  progetto: [
    { label: "Chi siamo", href: routes.chiSiamo },
    { label: "Come funziona", href: routes.comeFunziona },
    { label: "FAQ", href: routes.faq },
    { label: "Valuta la tua casa", href: routes.valutazione },
  ],
  legale: [
    { label: "Privacy policy", href: routes.privacy },
    { label: "Cookie policy", href: routes.cookie },
    { label: "Termini e condizioni", href: routes.termini },
  ],
} as const;

/**
 * Copertura operativa. Distinzione obbligatoria fra ciò che facciamo online
 * (tutta la Sicilia) e ciò che richiede presenza fisica (solo dove esiste
 * davvero una rete affidabile).
 */
export const coverage = {
  online: {
    title: "Gestione online",
    area: "Tutta la Sicilia",
    description:
      "Analisi, strategia, pubblicazione degli annunci, prezzi, calendari, prenotazioni e comunicazione con gli ospiti: sono attività che si seguono a distanza e le copriamo su tutta l'isola.",
    items: [
      "Analisi dell'immobile e del contesto",
      "Pubblicazione e ottimizzazione degli annunci",
      "Prezzi, calendario e prenotazioni",
      "Comunicazione con gli ospiti e report al proprietario",
    ],
  },
  local: {
    title: "Operatività sul posto",
    area: "In avvio nella provincia di Ragusa",
    description:
      "Check-in, pulizie, controlli e manutenzione richiedono persone di fiducia sul territorio. È la parte che stiamo costruendo adesso, nella provincia di Ragusa: la attiviamo caso per caso e solo dove possiamo garantirla davvero. Se per la tua casa non è ancora disponibile, te lo diciamo prima, non dopo.",
    items: [
      "Sopralluoghi e coordinamento dei lavori",
      "Check-in e check-out",
      "Pulizie e preparazione dell'immobile",
      "Controlli periodici e manutenzione",
    ],
  },
  note: "La gestione online è quella con cui partiamo e funziona ovunque in Sicilia. Le attività sul posto si valutano insieme, sulla singola casa.",
} as const;
