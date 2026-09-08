/**
 * Identificativi di clic pubblicitario Google.
 *
 * Arrivano nell'indirizzo della pagina di atterraggio quando qualcuno entra da
 * un annuncio, ma il modulo sta su un'altra pagina: vanno quindi conservati al
 * primo caricamento e riletti al momento dell'invio.
 *
 * `gclid` copre i clic dal web. `gbraid` e `wbraid` li ha introdotti Google per
 * i clic che partono dalle app su iOS, dove il gclid non viene passato:
 * raccoglierne uno solo lascerebbe scoperta una parte del traffico.
 *
 * Servono a ricollegare una richiesta al clic che l'ha generata, per esempio
 * per caricare le conversioni offline su Google Ads.
 */

export type Attribution = {
  gclid: string;
  gbraid: string;
  wbraid: string;
};

const STORAGE_KEY = "ggm.attribuzione";

/** Finestra di conversione predefinita di Google Ads. */
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;

const CAMPI = ["gclid", "gbraid", "wbraid"] as const;

const VUOTA: Attribution = { gclid: "", gbraid: "", wbraid: "" };

type Salvato = { valore: Attribution; ts: number };

/**
 * Legge gli identificativi dall'indirizzo e li conserva.
 *
 * Non sovrascrive quelli già salvati con valori vuoti: chi entra da un annuncio
 * e poi naviga nel sito deve mantenere il clic di partenza.
 */
export function captureAttribution(search: string): void {
  const params = new URLSearchParams(search);
  const trovati: Attribution = { ...VUOTA };
  let almenoUno = false;

  for (const campo of CAMPI) {
    const valore = (params.get(campo) ?? "").trim().slice(0, 200);
    if (valore) {
      trovati[campo] = valore;
      almenoUno = true;
    }
  }

  if (!almenoUno) return;

  write({ valore: trovati, ts: Date.now() });
}

/** Restituisce gli identificativi salvati, se non sono scaduti. */
export function readAttribution(): Attribution {
  const salvato = read();
  if (!salvato) return VUOTA;
  if (Date.now() - salvato.ts > MAX_AGE_MS) return VUOTA;
  return salvato.valore;
}

function read(): Salvato | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const dati = JSON.parse(raw) as Partial<Salvato>;
    if (typeof dati?.ts !== "number" || typeof dati?.valore !== "object") {
      return null;
    }

    return {
      ts: dati.ts,
      valore: {
        gclid: String(dati.valore?.gclid ?? ""),
        gbraid: String(dati.valore?.gbraid ?? ""),
        wbraid: String(dati.valore?.wbraid ?? ""),
      },
    };
  } catch {
    // Spazio non disponibile o contenuto illeggibile: si riparte da zero.
    return null;
  }
}

function write(dati: Salvato): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(dati));
  } catch {
    // In navigazione privata la scrittura può fallire: l'invio funziona
    // comunque, semplicemente senza attribuzione.
  }
}
