import type { FaqItem } from "@/content/faq";

type FAQAccordionProps = {
  items: FaqItem[];
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Accordion basato su <details>/<summary>: accessibile da tastiera e
 * funzionante anche senza JavaScript.
 */
export function FAQAccordion({
  items,
  tone = "light",
  className = "",
}: FAQAccordionProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={`divide-y ${isDark ? "divide-white/15" : "divide-line"} border-y ${
        isDark ? "border-white/15" : "border-line"
      } ${className}`}
    >
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <h3
              className={`text-base font-medium sm:text-lg ${
                isDark ? "text-white" : "text-ink"
              } ${isDark ? "group-hover:text-gold" : "group-hover:text-gold-700"} transition-colors`}
            >
              {item.question}
            </h3>
            <span
              aria-hidden="true"
              className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-transform duration-200 group-open:rotate-45 ${
                isDark
                  ? "border-white/25 text-cream"
                  : "border-line-strong text-gold-700"
              }`}
            >
              <svg
                viewBox="0 0 20 20"
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M10 4v12M4 10h12" />
              </svg>
            </span>
          </summary>
          <div
            className={`max-w-3xl pb-6 text-sm leading-relaxed sm:text-[0.95rem] ${
              isDark ? "text-cream/75" : "text-muted"
            }`}
          >
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
