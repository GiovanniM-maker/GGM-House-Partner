import { NextResponse } from "next/server";

import {
  condizioni,
  labelFor,
  MAX_PHOTOS,
  MAX_TOTAL_PHOTO_BYTES,
  obiettivi,
  utilizzi,
} from "@/content/evaluation";

/**
 * Ricezione delle richieste del modulo "Valuta la tua casa".
 *
 * La route valida i dati, li normalizza in testo leggibile e li inoltra allo
 * script Google che scrive sul foglio e invia le email. URL e token restano
 * lato server: il browser non li vede mai.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_TEXT_LENGTH = 2000;

type Photo = { name: string; mimeType: string; dataBase64: string };

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Richiesta non leggibile." },
      { status: 400 },
    );
  }

  const errors: string[] = [];
  const text = (key: string) => clean(body[key]);

  const data = {
    comune: text("comune"),
    provincia: text("provincia"),
    tipologia: text("tipologia"),
    superficie: text("superficie"),
    camere: text("camere"),
    condizioni: labelFor(condizioni, text("condizioni")),
    obiettivo: labelFor(obiettivi, text("obiettivo")),
    residenza: text("residenza"),
    utilizzo: labelFor(utilizzi, text("utilizzo")),
    caratteristiche: Array.isArray(body.caratteristiche)
      ? body.caratteristiche.map(clean).filter(Boolean).join(", ")
      : "",
    nome: text("nome"),
    email: text("email"),
    telefono: text("telefono"),
    whatsapp: body.whatsapp === true,
    note: text("note"),
    privacy: body.privacy === true,
  };

  if (!data.comune) errors.push("Manca il comune dell'immobile.");
  if (!data.tipologia) errors.push("Manca la tipologia dell'immobile.");
  if (!text("condizioni")) errors.push("Manca lo stato dell'immobile.");
  if (!text("obiettivo")) errors.push("Manca l'obiettivo.");
  if (!data.residenza) errors.push("Manca la residenza del proprietario.");
  if (!text("utilizzo")) errors.push("Manca l'utilizzo attuale della casa.");
  if (!data.nome) errors.push("Manca il nome.");
  if (!EMAIL_PATTERN.test(data.email)) errors.push("L'indirizzo email non è valido.");
  if (!data.privacy) errors.push("Manca il consenso al trattamento dei dati.");

  const foto = normalisePhotos(body.foto);
  if (foto === null) {
    errors.push(
      `Le foto superano il limite consentito (massimo ${MAX_PHOTOS} file per ${Math.round(
        MAX_TOTAL_PHOTO_BYTES / (1024 * 1024),
      )} MB complessivi).`,
    );
  }

  if (errors.length > 0) {
    return NextResponse.json(
      { ok: false, error: errors.join(" ") },
      { status: 400 },
    );
  }

  const reference = buildReference();
  const endpoint = process.env.GOOGLE_SCRIPT_URL?.trim();
  const token = process.env.GGM_FORM_TOKEN?.trim();

  // Senza configurazione il modulo non può consegnare nulla. In sviluppo si
  // continua a lavorare sull'interfaccia; in produzione si dice la verità
  // invece di far credere all'utente che la richiesta sia partita.
  if (!endpoint || !token) {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Il modulo non è ancora collegato. Riprova più tardi o scrivici direttamente.",
        },
        { status: 503 },
      );
    }

    console.warn(
      "[GGM] GOOGLE_SCRIPT_URL o GGM_FORM_TOKEN non configurati: invio simulato.",
      { reference, ...data, foto: foto?.length ?? 0 },
    );
    return NextResponse.json({ ok: true, reference });
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, reference, ...data, foto }),
      redirect: "follow",
      signal: AbortSignal.timeout(25_000),
    });

    const result: unknown = await response.json().catch(() => null);

    if (!response.ok || !isOk(result)) {
      console.error("[GGM] Lo script Google ha risposto con un errore.", {
        status: response.status,
        result,
      });
      return NextResponse.json(
        {
          ok: false,
          error:
            "Non siamo riusciti a registrare la richiesta. Riprova fra qualche minuto.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, reference });
  } catch (error) {
    console.error("[GGM] Invio allo script Google fallito.", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Non siamo riusciti a registrare la richiesta. Riprova fra qualche minuto.",
      },
      { status: 502 },
    );
  }
}

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_TEXT_LENGTH) : "";
}

function isOk(value: unknown): boolean {
  return (
    typeof value === "object" && value !== null && (value as { ok?: unknown }).ok === true
  );
}

/** Restituisce le foto valide, oppure `null` se superano i limiti. */
function normalisePhotos(value: unknown): Photo[] | null {
  if (!Array.isArray(value)) return [];
  if (value.length > MAX_PHOTOS) return null;

  const photos: Photo[] = [];
  let total = 0;

  for (const item of value) {
    if (typeof item !== "object" || item === null) continue;
    const photo = item as Record<string, unknown>;
    const dataBase64 = typeof photo.dataBase64 === "string" ? photo.dataBase64 : "";
    if (!dataBase64) continue;

    // Un base64 occupa circa 4 caratteri ogni 3 byte di dati originali.
    total += Math.ceil((dataBase64.length * 3) / 4);
    if (total > MAX_TOTAL_PHOTO_BYTES) return null;

    photos.push({
      name: clean(photo.name) || "foto",
      mimeType: clean(photo.mimeType) || "application/octet-stream",
      dataBase64,
    });
  }

  return photos;
}

/** Codice di riferimento leggibile, generato lato server. */
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
