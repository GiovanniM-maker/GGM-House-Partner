type Step = {
  title: string;
  description: string;
};

type ProcessStepsProps = {
  steps: Step[];
  tone?: "light" | "dark";
  /** `timeline` per percorsi lunghi, `grid` per processi brevi. */
  layout?: "timeline" | "grid";
  /** Colonne della griglia sui viewport larghi. */
  columns?: 3 | 4;
  className?: string;
};

/** Processo numerato: 01, 02, 03… Usato in tutte le pagine servizio. */
export function ProcessSteps({
  steps,
  tone = "light",
  layout = "grid",
  columns = 3,
  className = "",
}: ProcessStepsProps) {
  const isDark = tone === "dark";

  if (layout === "timeline") {
    return (
      <ol className={`relative space-y-8 ${className}`}>
        <div
          aria-hidden="true"
          className={`absolute top-2 bottom-2 left-[1.15rem] w-px ${
            isDark ? "bg-white/15" : "bg-line"
          }`}
        />
        {steps.map((step, index) => (
          <li key={step.title} className="reveal relative flex gap-5">
            <span
              className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                isDark
                  ? "bg-gold text-ink"
                  : "border border-line bg-white text-gold-700"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="pt-1">
              <h3
                className={`text-lg font-semibold ${isDark ? "text-white" : "text-ink"}`}
              >
                {step.title}
              </h3>
              <p
                className={`mt-1.5 text-sm leading-relaxed ${
                  isDark ? "text-cream/75" : "text-muted"
                }`}
              >
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol
      className={`grid gap-4 sm:grid-cols-2 ${
        columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
      } ${className}`}
    >
      {steps.map((step, index) => (
        <li
          key={step.title}
          className={`reveal flex flex-col rounded-lg border p-6 ${
            isDark ? "border-white/15 bg-white/5" : "border-line bg-white"
          }`}
        >
          <span
            className={`text-xs font-semibold tracking-[0.16em] ${
              isDark ? "text-gold" : "text-gold-700"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            className={`mt-3 text-lg font-semibold ${isDark ? "text-white" : "text-ink"}`}
          >
            {step.title}
          </h3>
          <p
            className={`mt-2 text-sm leading-relaxed ${
              isDark ? "text-cream/75" : "text-muted"
            }`}
          >
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
