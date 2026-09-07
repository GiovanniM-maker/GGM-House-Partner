import type { ReactNode } from "react";

type SectionHeaderProps = {
  /** Sopratitolo breve, usato per orientare la lettura. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Livello semantico: mantiene una gerarchia corretta nella pagina. */
  as?: "h2" | "h3";
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  children?: ReactNode;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  as: Heading = "h2",
  align = "left",
  tone = "light",
  className = "",
  children,
}: SectionHeaderProps) {
  const isDark = tone === "dark";

  return (
    <header
      className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow && (
        <p
          className={`mb-4 text-xs font-semibold tracking-[0.2em] uppercase ${
            isDark ? "text-teal" : "text-teal-700"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <Heading
        className={`${Heading === "h2" ? "display-2" : "display-3"} font-semibold ${
          isDark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </Heading>
      {description && (
        <div
          className={`mt-5 lead ${isDark ? "text-teal-50/85" : "text-muted"}`}
        >
          {typeof description === "string" ? <p>{description}</p> : description}
        </div>
      )}
      {children}
    </header>
  );
}
