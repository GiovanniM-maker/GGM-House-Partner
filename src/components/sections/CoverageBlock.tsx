import { coverage } from "@/content/site";
import { CheckList } from "@/components/sections/FeatureBlock";
import { SectionHeader } from "@/components/sections/SectionHeader";

type CoverageBlockProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  tone?: "light" | "dark";
  /** Nota finale sotto le due colonne. */
  note?: string | null;
};

/**
 * Distinzione fra ciò che copriamo online (tutta la Sicilia) e ciò che
 * richiede presenza fisica (solo dove esiste una rete affidabile).
 */
export function CoverageBlock({
  eyebrow = "Dove operiamo",
  title = "Online in tutta la Sicilia. Sul posto dove abbiamo una rete di cui fidarci.",
  description = "Preferiamo essere precisi su questo punto: alcune cose si seguono benissimo a distanza, altre no.",
  tone = "light",
  note = coverage.note,
}: CoverageBlockProps) {
  const isDark = tone === "dark";

  const cardClass = isDark
    ? "border-white/15 bg-white/5"
    : "border-line bg-white";

  return (
    <div>
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        tone={tone}
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {[coverage.online, coverage.local].map((block) => (
          <div
            key={block.title}
            className={`reveal flex flex-col rounded-lg border p-6 sm:p-8 ${cardClass}`}
          >
            <h3
              className={`text-lg font-semibold ${isDark ? "text-white" : "text-ink"}`}
            >
              {block.title}
            </h3>
            <p
              className={`mt-2 inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${
                isDark ? "bg-gold/20 text-gold" : "bg-gold-50 text-gold-900"
              }`}
            >
              {block.area}
            </p>
            <p
              className={`mt-4 text-sm leading-relaxed ${
                isDark ? "text-cream/75" : "text-muted"
              }`}
            >
              {block.description}
            </p>
            <CheckList
              items={[...block.items]}
              tone={tone}
              className="mt-6 text-sm"
            />
          </div>
        ))}
      </div>

      {note && (
        <p
          className={`mt-6 text-sm ${isDark ? "text-cream/60" : "text-muted"}`}
        >
          {note}
        </p>
      )}
    </div>
  );
}
