"use client";

import { useId, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { ChoiceGroup, Field, inputClass } from "@/components/form/Field";
import { OptionCard } from "@/components/form/OptionCard";
import {
  camere,
  caratteristiche,
  condizioni,
  formSteps,
  obiettivi,
  province,
  residenze,
  tipologie,
  TOTAL_STEPS,
  utilizzi,
} from "@/content/evaluation";
import { submitEvaluation, type EvaluationPayload } from "@/lib/submitEvaluation";
import { routes } from "@/content/site";
import Link from "next/link";

type FormState = Omit<EvaluationPayload, "fotoCount"> & { foto: File[] };

const initialState: FormState = {
  comune: "",
  provincia: "",
  tipologia: "",
  superficie: "",
  camere: "",
  condizioni: "",
  obiettivo: "",
  residenza: "",
  utilizzo: "",
  caratteristiche: [],
  nome: "",
  email: "",
  telefono: "",
  whatsapp: false,
  note: "",
  foto: [],
  privacy: false,
};

type Errors = Partial<Record<keyof FormState, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Validazione minima e non invasiva: solo ciò che serve per ricontattarti. */
function validateStep(step: number, state: FormState): Errors {
  const errors: Errors = {};

  if (step === 1) {
    if (!state.comune.trim()) errors.comune = "Indica il comune dell'immobile.";
    if (!state.tipologia) errors.tipologia = "Scegli la tipologia.";
    if (!state.condizioni) errors.condizioni = "Indica lo stato dell'immobile.";
  }

  if (step === 2 && !state.obiettivo) {
    errors.obiettivo = "Scegli l'opzione più vicina alla tua situazione.";
  }

  if (step === 3) {
    if (!state.residenza) errors.residenza = "Indica dove vivi.";
    if (!state.utilizzo) errors.utilizzo = "Indica come viene usata la casa oggi.";
  }

  if (step === 5) {
    if (!state.nome.trim()) errors.nome = "Serve un nome per ricontattarti.";
    if (!state.email.trim()) {
      errors.email = "Serve un indirizzo email.";
    } else if (!EMAIL_PATTERN.test(state.email.trim())) {
      errors.email = "Controlla l'indirizzo email.";
    }
    if (!state.privacy) {
      errors.privacy = "Serve il consenso al trattamento dei dati.";
    }
  }

  return errors;
}

export function PropertyEvaluationForm() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const formId = useId();

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setState((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
  };

  const toggleCaratteristica = (value: string) => {
    setState((previous) => ({
      ...previous,
      caratteristiche: previous.caratteristiche.includes(value)
        ? previous.caratteristiche.filter((item) => item !== value)
        : [...previous.caratteristiche, value],
    }));
  };

  const focusHeading = () => {
    // Sposta il focus sul titolo del passo: senza questo chi naviga da
    // tastiera o con screen reader non capisce che la vista è cambiata.
    window.requestAnimationFrame(() => headingRef.current?.focus());
  };

  const goNext = () => {
    const stepErrors = validateStep(step, state);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setStep((current) => Math.min(current + 1, TOTAL_STEPS));
    focusHeading();
  };

  const goBack = () => {
    setStep((current) => Math.max(current - 1, 1));
    focusHeading();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const stepErrors = validateStep(TOTAL_STEPS, state);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const { foto, ...rest } = state;
    const result = await submitEvaluation({ ...rest, fotoCount: foto.length });

    setSubmitting(false);

    if (result.ok) {
      setReference(result.reference);
      focusHeading();
    } else {
      setSubmitError(result.error);
    }
  };

  if (reference) {
    return <Confirmation reference={reference} headingRef={headingRef} />;
  }

  const current = formSteps[step - 1];

  return (
    <div className="rounded-lg border border-line bg-white p-6 sm:p-8 lg:p-10">
      <StepIndicator step={step} />

      <h2
        ref={headingRef}
        tabIndex={-1}
        className="display-3 mt-8 font-semibold text-ink focus:outline-none"
      >
        {current.title}
      </h2>
      <p className="mt-2 text-sm text-muted">
        Passo {step} di {TOTAL_STEPS}. I campi contrassegnati con{" "}
        <span aria-hidden="true">*</span>
        <span className="sr-only">asterisco</span> sono necessari per darti una
        risposta utile.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8">
        {step === 1 && (
          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              label="Comune"
              htmlFor={`${formId}-comune`}
              required
              error={errors.comune}
            >
              <input
                id={`${formId}-comune`}
                name="comune"
                type="text"
                autoComplete="address-level2"
                value={state.comune}
                onChange={(event) => set("comune", event.target.value)}
                aria-invalid={Boolean(errors.comune)}
                aria-describedby={errors.comune ? `${formId}-comune-error` : undefined}
                className={inputClass}
                placeholder="Es. Modica"
              />
            </Field>

            <Field label="Provincia" htmlFor={`${formId}-provincia`}>
              <select
                id={`${formId}-provincia`}
                name="provincia"
                value={state.provincia}
                onChange={(event) => set("provincia", event.target.value)}
                className={inputClass}
              >
                <option value="">Seleziona</option>
                {province.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
                <option value="Fuori dalla Sicilia">Fuori dalla Sicilia</option>
              </select>
            </Field>

            <Field
              label="Tipologia"
              htmlFor={`${formId}-tipologia`}
              required
              error={errors.tipologia}
            >
              <select
                id={`${formId}-tipologia`}
                name="tipologia"
                value={state.tipologia}
                onChange={(event) => set("tipologia", event.target.value)}
                aria-invalid={Boolean(errors.tipologia)}
                className={inputClass}
              >
                <option value="">Seleziona</option>
                {tipologie.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="Superficie indicativa"
              htmlFor={`${formId}-superficie`}
              hint="In metri quadri. Anche approssimativa va bene."
            >
              <input
                id={`${formId}-superficie`}
                name="superficie"
                type="number"
                inputMode="numeric"
                min={0}
                value={state.superficie}
                onChange={(event) => set("superficie", event.target.value)}
                className={inputClass}
                placeholder="Es. 90"
              />
            </Field>

            <Field label="Camere da letto" htmlFor={`${formId}-camere`}>
              <select
                id={`${formId}-camere`}
                name="camere"
                value={state.camere}
                onChange={(event) => set("camere", event.target.value)}
                className={inputClass}
              >
                <option value="">Seleziona</option>
                {camere.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>

            <ChoiceGroup
              legend="Stato dell'immobile"
              required
              error={errors.condizioni}
              className="sm:col-span-2"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {condizioni.map((item) => (
                  <OptionCard
                    key={item.value}
                    name="condizioni"
                    value={item.value}
                    label={item.label}
                    hint={"hint" in item ? item.hint : undefined}
                    checked={state.condizioni === item.value}
                    onChange={(value) => set("condizioni", value)}
                  />
                ))}
              </div>
            </ChoiceGroup>
          </div>
        )}

        {step === 2 && (
          <ChoiceGroup
            legend="Cosa vorresti fare con questa casa?"
            hint="Se non hai ancora deciso non è un problema: serve proprio a questo il primo contatto."
            required
            error={errors.obiettivo}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {obiettivi.map((item) => (
                <OptionCard
                  key={item.value}
                  name="obiettivo"
                  value={item.value}
                  label={item.label}
                  hint={item.hint}
                  checked={state.obiettivo === item.value}
                  onChange={(value) => set("obiettivo", value)}
                />
              ))}
            </div>
          </ChoiceGroup>
        )}

        {step === 3 && (
          <div className="grid gap-8">
            <Field
              label="Dove vivi abitualmente?"
              htmlFor={`${formId}-residenza`}
              required
              error={errors.residenza}
              hint="Ci serve per capire quanto dobbiamo occuparci noi della parte operativa."
            >
              <select
                id={`${formId}-residenza`}
                name="residenza"
                value={state.residenza}
                onChange={(event) => set("residenza", event.target.value)}
                aria-invalid={Boolean(errors.residenza)}
                className={inputClass}
              >
                <option value="">Seleziona</option>
                {residenze.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>

            <ChoiceGroup
              legend="Come viene usata oggi la casa?"
              required
              error={errors.utilizzo}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {utilizzi.map((item) => (
                  <OptionCard
                    key={item.value}
                    name="utilizzo"
                    value={item.value}
                    label={item.label}
                    checked={state.utilizzo === item.value}
                    onChange={(value) => set("utilizzo", value)}
                  />
                ))}
              </div>
            </ChoiceGroup>
          </div>
        )}

        {step === 4 && (
          <ChoiceGroup
            legend="Cosa ha questa casa?"
            hint="Seleziona tutto quello che è presente. Puoi anche saltare questo passo."
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {caratteristiche.map((item) => (
                <OptionCard
                  key={item}
                  type="checkbox"
                  name="caratteristiche"
                  value={item}
                  label={item}
                  checked={state.caratteristiche.includes(item)}
                  onChange={toggleCaratteristica}
                />
              ))}
            </div>
          </ChoiceGroup>
        )}

        {step === 5 && (
          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              label="Nome e cognome"
              htmlFor={`${formId}-nome`}
              required
              error={errors.nome}
            >
              <input
                id={`${formId}-nome`}
                name="nome"
                type="text"
                autoComplete="name"
                value={state.nome}
                onChange={(event) => set("nome", event.target.value)}
                aria-invalid={Boolean(errors.nome)}
                className={inputClass}
              />
            </Field>

            <Field
              label="Email"
              htmlFor={`${formId}-email`}
              required
              error={errors.email}
            >
              <input
                id={`${formId}-email`}
                name="email"
                type="email"
                autoComplete="email"
                value={state.email}
                onChange={(event) => set("email", event.target.value)}
                aria-invalid={Boolean(errors.email)}
                className={inputClass}
              />
            </Field>

            <Field
              label="Telefono"
              htmlFor={`${formId}-telefono`}
              hint="Facoltativo, ma velocizza il contatto."
            >
              <input
                id={`${formId}-telefono`}
                name="telefono"
                type="tel"
                autoComplete="tel"
                value={state.telefono}
                onChange={(event) => set("telefono", event.target.value)}
                className={inputClass}
              />
            </Field>

            <div className="flex items-end">
              <label className="flex w-full cursor-pointer items-start gap-3 rounded-md border border-line-strong bg-white p-4 transition-colors hover:border-ink-600/40">
                <input
                  type="checkbox"
                  checked={state.whatsapp}
                  onChange={(event) => set("whatsapp", event.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-[#2b7a78]"
                />
                <span className="text-sm text-ink">
                  Preferisco essere contattato su WhatsApp
                </span>
              </label>
            </div>

            <Field
              label="Foto dell'immobile"
              htmlFor={`${formId}-foto`}
              hint="Facoltative. Anche foto da telefono vanno benissimo: aiutano a capire lo stato reale."
              className="sm:col-span-2"
            >
              <input
                id={`${formId}-foto`}
                name="foto"
                type="file"
                accept="image/*"
                multiple
                onChange={(event) =>
                  set("foto", Array.from(event.target.files ?? []))
                }
                className="w-full rounded-md border border-dashed border-line-strong bg-sand/50 px-4 py-3 text-sm text-muted file:mr-4 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-sm file:text-cream hover:file:bg-ink-800"
              />
              {state.foto.length > 0 && (
                <p className="mt-2 text-xs text-muted">
                  {state.foto.length}{" "}
                  {state.foto.length === 1 ? "file selezionato" : "file selezionati"}.
                </p>
              )}
            </Field>

            <Field
              label="C'è altro che dovremmo sapere?"
              htmlFor={`${formId}-note`}
              className="sm:col-span-2"
            >
              <textarea
                id={`${formId}-note`}
                name="note"
                rows={4}
                value={state.note}
                onChange={(event) => set("note", event.target.value)}
                className={`${inputClass} resize-y`}
                placeholder="Vincoli, tempistiche, dubbi, lavori già iniziati…"
              />
            </Field>

            <div className="sm:col-span-2">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={state.privacy}
                  onChange={(event) => set("privacy", event.target.checked)}
                  aria-invalid={Boolean(errors.privacy)}
                  className="mt-1 h-4 w-4 shrink-0 accent-[#2b7a78]"
                />
                <span className="text-sm leading-relaxed text-muted">
                  Ho letto la{" "}
                  <Link
                    href={routes.privacy}
                    className="text-teal-700 underline underline-offset-4"
                  >
                    privacy policy
                  </Link>{" "}
                  e acconsento al trattamento dei dati per essere ricontattato.
                  <span aria-hidden="true" className="ml-1 text-teal-700">
                    *
                  </span>
                </span>
              </label>
              {errors.privacy && (
                <p role="alert" className="mt-2 text-sm text-teal-900">
                  {errors.privacy}
                </p>
              )}
            </div>
          </div>
        )}

        {submitError && (
          <p
            role="alert"
            className="mt-6 rounded-md border border-line-strong bg-sand px-4 py-3 text-sm text-ink"
          >
            {submitError}
          </p>
        )}

        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={goBack} disabled={submitting}>
              Indietro
            </Button>
          ) : (
            <span aria-hidden="true" className="hidden sm:block" />
          )}

          {step < TOTAL_STEPS ? (
            <Button onClick={goNext} size="lg">
              Continua
            </Button>
          ) : (
            <Button type="submit" size="lg" disabled={submitting}>
              {submitting ? "Invio in corso…" : "Invia la richiesta"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

function StepIndicator({ step }: { step: number }) {
  const percentage = Math.round((step / TOTAL_STEPS) * 100);

  return (
    <div>
      <ol className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
        {formSteps.map((item) => {
          const isDone = item.id < step;
          const isCurrent = item.id === step;
          return (
            <li
              key={item.id}
              aria-current={isCurrent ? "step" : undefined}
              className={`flex items-center gap-1.5 tracking-wide uppercase ${
                isCurrent ? "font-semibold text-teal-900" : "font-medium text-muted"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[0.65rem] ${
                  isCurrent
                    ? "bg-teal text-ink"
                    : isDone
                      ? "bg-teal-50 text-teal-900"
                      : "border border-line-strong"
                }`}
              >
                {item.id}
              </span>
              <span className="hidden sm:inline">{item.short}</span>
            </li>
          );
        })}
      </ol>

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
        aria-label="Avanzamento del modulo"
        className="mt-4 h-1 w-full overflow-hidden rounded-full bg-line"
      >
        <div
          className="h-full rounded-full bg-teal transition-[width] duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function Confirmation({
  reference,
  headingRef,
}: {
  reference: string;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  const nextSteps = [
    "Leggiamo quello che ci hai raccontato e guardiamo la zona.",
    "Ti ricontattiamo per approfondire i punti che mancano.",
    "Se serve vedere la casa, organizziamo un sopralluogo.",
    "Definiamo insieme il percorso più sensato, o ti diciamo se non è il caso di procedere.",
  ];

  return (
    <div
      role="status"
      className="rounded-lg border border-line bg-white p-6 sm:p-10"
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-teal-50 text-teal-900">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m5 13 4 4L19 7" />
        </svg>
      </span>

      <h2
        ref={headingRef}
        tabIndex={-1}
        className="display-2 mt-6 font-semibold text-ink focus:outline-none"
      >
        Ricevuto.
      </h2>
      <p className="mt-4 lead max-w-xl text-muted">
        Abbiamo la tua richiesta. Da qui in avanti il lavoro è nostro: analizziamo
        le informazioni e ti ricontattiamo.
      </p>

      <ol className="mt-8 space-y-4">
        {nextSteps.map((item, index) => (
          <li key={item} className="flex gap-4">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-xs font-semibold text-teal-700">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-sm leading-relaxed text-ink-600">{item}</span>
          </li>
        ))}
      </ol>

      <p className="mt-8 rounded-md bg-sand px-4 py-3 text-sm text-muted">
        Riferimento della richiesta:{" "}
        <span className="font-medium text-ink">{reference}</span>
      </p>

      <p className="mt-6 text-sm text-muted">
        Nel frattempo puoi leggere{" "}
        <Link
          href={routes.comeFunziona}
          className="text-teal-700 underline underline-offset-4"
        >
          come lavoriamo
        </Link>{" "}
        oppure le{" "}
        <Link
          href={routes.faq}
          className="text-teal-700 underline underline-offset-4"
        >
          domande frequenti
        </Link>
        .
      </p>
    </div>
  );
}
