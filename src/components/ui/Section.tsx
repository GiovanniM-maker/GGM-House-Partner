import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";

type SectionProps = {
  children: ReactNode;
  /** Ancora per la navigazione interna. */
  id?: string;
  className?: string;
  containerClassName?: string;
  size?: "narrow" | "default" | "wide";
  /** Sfondo della fascia. */
  tone?: "cream" | "white" | "sand" | "ink" | "gold";
  /** Spaziatura verticale. */
  spacing?: "sm" | "md" | "lg";
};

const tones = {
  cream: "bg-cream text-ink",
  white: "bg-white text-ink",
  sand: "bg-sand text-ink",
  ink: "bg-ink text-cream",
  gold: "bg-gold-50 text-ink",
} as const;

const spacings = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-20 lg:py-24",
  lg: "py-20 sm:py-28 lg:py-32",
} as const;

export function Section({
  children,
  id,
  className = "",
  containerClassName = "",
  size = "default",
  tone = "cream",
  spacing = "md",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${tones[tone]} ${spacings[spacing]} ${className}`}
    >
      <Container size={size} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
