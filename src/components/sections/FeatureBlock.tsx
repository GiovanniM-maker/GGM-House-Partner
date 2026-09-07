import type { ReactNode } from "react";

export type Feature = {
  title: string;
  description: string;
};

type FeatureBlockProps = {
  features: Feature[];
  columns?: 2 | 3 | 4;
  tone?: "light" | "dark";
  /** `list` con bordo sottile, `plain` senza contenitore, `card` con box. */
  variant?: "list" | "plain" | "card";
  className?: string;
};

/** Blocco di caratteristiche/vantaggi. Riutilizzato in quasi tutte le pagine. */
export function FeatureBlock({
  features,
  columns = 3,
  tone = "light",
  variant = "list",
  className = "",
}: FeatureBlockProps) {
  const isDark = tone === "dark";
  const cols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  const itemClass =
    variant === "card"
      ? `rounded-lg border p-6 ${isDark ? "border-white/15 bg-white/5" : "border-line bg-white"}`
      : variant === "list"
        ? `border-t pt-5 ${isDark ? "border-white/15" : "border-line"}`
        : "";

  return (
    <ul className={`grid gap-6 ${cols} ${className}`}>
      {features.map((feature) => (
        <li key={feature.title} className={`reveal ${itemClass}`}>
          <h3
            className={`text-base font-semibold ${isDark ? "text-white" : "text-ink"}`}
          >
            {feature.title}
          </h3>
          <p
            className={`mt-2 text-sm leading-relaxed ${
              isDark ? "text-cream/75" : "text-muted"
            }`}
          >
            {feature.description}
          </p>
        </li>
      ))}
    </ul>
  );
}

type CheckListProps = {
  items: string[];
  tone?: "light" | "dark";
  columns?: 1 | 2;
  className?: string;
};

/** Elenco puntato con spunta. Per "cosa gestiamo", "cosa include", ecc. */
export function CheckList({
  items,
  tone = "light",
  columns = 1,
  className = "",
}: CheckListProps): ReactNode {
  const isDark = tone === "dark";

  return (
    <ul
      className={`grid gap-x-8 gap-y-3 ${columns === 2 ? "sm:grid-cols-2" : ""} ${className}`}
    >
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className={`mt-[0.35rem] h-3.5 w-3.5 shrink-0 ${isDark ? "text-gold" : "text-gold-700"}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m4 10.5 4 4 8-9" />
          </svg>
          <span className={isDark ? "text-cream/85" : "text-ink-600"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
