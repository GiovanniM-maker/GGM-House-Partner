import type { ReactNode } from "react";

export type TransparencyItem = {
  /** Ciò che non promettiamo. */
  claim: string;
  /** Ciò che facciamo davvero al suo posto. */
  reality: string;
};

type TransparencyBlockProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: TransparencyItem[];
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Blocco di trasparenza: mette per iscritto ciò che GGM NON promette.
 * È un elemento di posizionamento, non un disclaimer legale.
 */
export function TransparencyBlock({
  eyebrow = "Trasparenza",
  title = "Cosa non promettiamo",
  description = "Un progetto nuovo si giudica anche da quello che evita di dire.",
  items,
  tone = "light",
  className = "",
}: TransparencyBlockProps) {
  const isDark = tone === "dark";

  return (
    <div className={className}>
      <p
        className={`mb-4 text-xs font-semibold tracking-[0.2em] uppercase ${
          isDark ? "text-gold" : "text-gold-700"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`display-2 max-w-2xl font-semibold ${isDark ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 max-w-2xl lead ${isDark ? "text-cream/85" : "text-muted"}`}
        >
          {description}
        </p>
      )}

      <ul className="mt-10 grid gap-px overflow-hidden rounded-lg sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item.claim}
            className={`flex flex-col p-6 ${isDark ? "bg-ink-800" : "bg-white"}`}
          >
            <p
              className={`flex items-start gap-2.5 font-medium ${
                isDark ? "text-white" : "text-ink"
              }`}
            >
              <Cross dark={isDark} />
              <span>{item.claim}</span>
            </p>
            <p
              className={`mt-3 pl-[1.6rem] text-sm leading-relaxed ${
                isDark ? "text-cream/75" : "text-muted"
              }`}
            >
              {item.reality}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Cross({ dark }: { dark: boolean }): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={`mt-1 h-4 w-4 shrink-0 ${dark ? "text-cream/50" : "text-line-strong"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="m5 5 10 10M15 5 5 15" />
    </svg>
  );
}
