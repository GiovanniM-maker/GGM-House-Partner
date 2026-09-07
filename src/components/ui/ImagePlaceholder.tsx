import Image from "next/image";

type ImagePlaceholderProps = {
  /**
   * Percorso di un'immagine reale (es. "/images/cantiere-01.jpg").
   * Finché è assente viene mostrato un segnaposto grafico con le stesse
   * proporzioni: sostituendo il file il layout non cambia.
   */
  src?: string;
  /** Testo alternativo. Obbligatorio anche sul segnaposto. */
  alt: string;
  /** Etichetta mostrata nel segnaposto per capire cosa va inserito. */
  label?: string;
  ratio?: "square" | "photo" | "portrait" | "wide" | "ultrawide";
  className?: string;
  /** Priorità di caricamento: solo per immagini above the fold. */
  priority?: boolean;
  sizes?: string;
  tone?: "light" | "dark";
};

const ratios = {
  square: "aspect-square",
  photo: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/10]",
  ultrawide: "aspect-[21/9]",
} as const;

export function ImagePlaceholder({
  src,
  alt,
  label,
  ratio = "photo",
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  tone = "light",
}: ImagePlaceholderProps) {
  const shell = `relative isolate overflow-hidden rounded-lg ${ratios[ratio]} ${className}`;

  if (src) {
    return (
      <div className={shell}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-cover"
        />
      </div>
    );
  }

  const skin =
    tone === "dark"
      ? "border-white/15 bg-ink-800 text-cream/70"
      : "border-line-strong/70 bg-sand text-muted";

  return (
    <div
      className={`${shell} flex items-center justify-center border border-dashed ${skin}`}
      role="img"
      aria-label={alt}
    >
      {/* Trama discreta, così il segnaposto non sembra un errore di caricamento */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-35 bg-[repeating-linear-gradient(135deg,transparent_0_19px,currentColor_19px_20px)]"
      />
      <div className="relative z-10 max-w-[80%] px-4 text-center">
        <p className="text-[0.68rem] font-semibold tracking-[0.18em] uppercase">
          Immagine
        </p>
        <p className="mt-1.5 text-sm leading-snug">{label ?? alt}</p>
      </div>
    </div>
  );
}
