type BadgesProps = {
  items: readonly string[];
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Etichette brevi di competenza. Servono a far capire in un colpo d'occhio di
 * cosa ci occupiamo, senza trasformarlo in un elenco di servizi da leggere.
 */
export function Badges({ items, tone = "light", className = "" }: BadgesProps) {
  const isDark = tone === "dark";

  return (
    <ul className={`reveal-stagger flex flex-wrap gap-2 ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          className={`reveal rounded-full border px-3 py-1.5 text-xs font-medium whitespace-nowrap ${
            isDark
              ? "border-white/20 bg-white/5 text-cream/85"
              : "border-line-strong bg-white text-ink-600"
          }`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
