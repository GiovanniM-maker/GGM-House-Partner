import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  /** `narrow` per testi lunghi, `wide` per griglie e immagini. */
  size?: "narrow" | "default" | "wide";
  as?: ElementType;
};

const sizes = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

export function Container({
  children,
  className = "",
  size = "default",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full px-5 sm:px-8 ${sizes[size]} ${className}`}>
      {children}
    </Tag>
  );
}
