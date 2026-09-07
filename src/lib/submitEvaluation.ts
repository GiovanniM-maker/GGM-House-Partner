/**
 * Handler isolato per l'invio della richiesta di valutazione.
 *
 * V1: mock lato client, nessun backend. Il punto di integrazione futura
 * (CRM, email transazionale, notifica WhatsApp) è UNA sola funzione:
 * sostituendo il corpo di `submitEvaluation` il resto del form non cambia.
 *
 * Integrazione tipica:
 *   const res = await fetch("/api/valutazione", {
 *     method: "POST",
 *     body: formDataConAllegati,
 *   });
 */

export type EvaluationPayload = {
  /* Step 1 — l'immobile */
  comune: string;
  provincia: string;
  tipologia: string;
  superficie: string;
  camere: string;
  condizioni: string;

  /* Step 2 — obiettivo */
  obiettivo: string;

  /* Step 3 — proprietario e utilizzo */
  residenza: string;
  utilizzo: string;

  /* Step 4 — caratteristiche */
  caratteristiche: string[];

  /* Step 5 — contatti */
  nome: string;
  email: string;
  telefono: string;
  whatsapp: boolean;
  note: string;
  fotoCount: number;
  privacy: boolean;
};

export type SubmitResult =
  | { ok: true; reference: string }
  | { ok: false; error: string };

/** Ritardo simulato, solo per rendere credibile lo stato di caricamento. */
const MOCK_LATENCY_MS = 700;

export async function submitEvaluation(
  payload: EvaluationPayload,
): Promise<SubmitResult> {
  try {
    // --- PUNTO DI INTEGRAZIONE -------------------------------------------
    // Sostituire questo blocco con la chiamata reale (route handler,
    // servizio email o webhook CRM). La firma della funzione resta invariata.
    if (process.env.NODE_ENV === "development") {
      console.info("[GGM] Richiesta di valutazione (mock):", payload);
    }

    await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));
    // ---------------------------------------------------------------------

    return { ok: true, reference: buildReference() };
  } catch {
    return {
      ok: false,
      error:
        "Non siamo riusciti a inviare la richiesta. Riprova fra qualche istante.",
    };
  }
}

/** Codice di riferimento locale, utile solo a dare un riscontro all'utente. */
function buildReference(): string {
  const now = new Date();
  const stamp = [
    now.getFullYear().toString().slice(-2),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("");
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `GGM-${stamp}-${random}`;
}
