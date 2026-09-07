"use client";

import type { ReactNode } from "react";

type FieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
};

/** Wrapper di campo: etichetta, aiuto e messaggio d'errore collegati via aria. */
export function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  className = "",
  children,
}: FieldProps) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-ink"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-teal-700">
            *
          </span>
        )}
      </label>
      <div className="mt-2">{children}</div>
      {hint && (
        <p id={`${htmlFor}-hint`} className="mt-2 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-2 text-sm text-teal-900">
          {error}
        </p>
      )}
    </div>
  );
}

/** Gruppo di scelte (radio o checkbox) con semantica fieldset/legend. */
export function ChoiceGroup({
  legend,
  hint,
  error,
  required,
  className = "",
  children,
}: {
  legend: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <fieldset className={className}>
      <legend className="text-sm font-medium text-ink">
        {legend}
        {required && (
          <span aria-hidden="true" className="ml-1 text-teal-700">
            *
          </span>
        )}
      </legend>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
      <div className="mt-3">{children}</div>
      {error && (
        <p role="alert" className="mt-2 text-sm text-teal-900">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export const inputClass =
  "w-full rounded-md border border-line-strong bg-white px-4 py-3 text-ink placeholder:text-muted/60 transition-colors hover:border-ink-600/40 focus:border-teal-700 focus:outline-none";
