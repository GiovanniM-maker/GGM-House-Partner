/**
 * Invio della richiesta di valutazione.
 *
 * Il client parla solo con la route interna `/api/valutazione`: l'URL dello
 * script Google e il token condiviso restano lato server e non finiscono mai
 * nel browser.
 */

export type EvaluationPhoto = {
  name: string;
  mimeType: string;
  /** Contenuto del file in base64, senza il prefisso `data:`. */
  dataBase64: string;
};

import type { Attribution } from "@/lib/attribution";

export type EvaluationPayload = {
  /* Step 1: l'immobile */
  comune: string;
  provincia: string;
  tipologia: string;
  superficie: string;
  camere: string;
  condizioni: string;

  /* Step 2: obiettivo */
  obiettivo: string;

  /* Step 3: proprietario e utilizzo */
  residenza: string;
  utilizzo: string;

  /* Step 4: caratteristiche */
  caratteristiche: string[];

  /* Step 5: contatti */
  nome: string;
  email: string;
  telefono: string;
  whatsapp: boolean;
  note: string;
  foto: EvaluationPhoto[];
  privacy: boolean;

  /* Da dove arriva la richiesta, se da un annuncio */
  attribuzione: Attribution;
};

export type SubmitResult =
  | { ok: true; reference: string }
  | { ok: false; error: string };

const GENERIC_ERROR =
  "Non siamo riusciti a inviare la richiesta. Riprova fra qualche istante.";

export async function submitEvaluation(
  payload: EvaluationPayload,
): Promise<SubmitResult> {
  try {
    const response = await fetch("/api/valutazione", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data: unknown = await response.json().catch(() => null);

    if (isSubmitResult(data)) return data;

    return { ok: false, error: GENERIC_ERROR };
  } catch {
    return { ok: false, error: GENERIC_ERROR };
  }
}

function isSubmitResult(value: unknown): value is SubmitResult {
  if (typeof value !== "object" || value === null) return false;
  const data = value as Record<string, unknown>;

  if (data.ok === true) return typeof data.reference === "string";
  if (data.ok === false) return typeof data.error === "string";
  return false;
}

/** Legge un file come base64, senza il prefisso `data:<mime>;base64,`. */
export function readFileAsBase64(file: File): Promise<EvaluationPhoto> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const result = String(reader.result);
      resolve({
        name: file.name,
        mimeType: file.type || "application/octet-stream",
        dataBase64: result.slice(result.indexOf(",") + 1),
      });
    };
    reader.readAsDataURL(file);
  });
}
