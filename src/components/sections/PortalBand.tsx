import Image from "next/image";

export type Portal = {
  nome: string;
  /**
   * Logo ufficiale del portale. Finché manca viene mostrato il nome come
   * lettering: meglio un nome scritto bene di un logo ricostruito a mano, che
   * violerebbe le linee guida del marchio.
   */
  logo?: string;
  /** Dimensioni intrinseche del file, servono a riservare lo spazio giusto. */
  larghezza?: number;
  altezza?: number;
  /**
   * Altezza a cui mostrarlo. Non è la stessa per tutti: un logo con simbolo
   * occupa in verticale molto più spazio del solo lettering, quindi va tenuto
   * più basso perché le due scritte appaiano della stessa misura.
   */
  classeLogo?: string;
};

type PortalBandProps = {
  titolo: string;
  descrizione?: string;
  portali: readonly Portal[];
  tone?: "light" | "dark";
  /**
   * Nota sui marchi. Serve a chiarire che nominare un portale non significa
   * esserne partner: Airbnb vieta espressamente a chi gestisce immobili di
   * far credere di avere un rapporto privilegiato con loro.
   */
  nota?: string;
};

/** Fascia dei canali su cui gestiamo l'annuncio. */
export function PortalBand({
  titolo,
  descrizione,
  portali,
  tone = "light",
  nota,
}: PortalBandProps) {
  const isDark = tone === "dark";

  return (
    <div className="text-center">
      <h2
        className={`display-3 font-semibold ${isDark ? "text-white" : "text-ink"}`}
      >
        {titolo}
      </h2>

      <ul className="mt-10 flex flex-wrap items-center justify-center gap-4">
        {portali.map((portale) => (
          <li key={portale.nome}>
            <span
              className={`flex h-16 items-center justify-center rounded-lg border px-8 sm:px-12 ${
                isDark
                  ? "border-white/15 bg-white/5"
                  : "border-line bg-white"
              }`}
            >
              {portale.logo ? (
                <Image
                  src={portale.logo}
                  alt={portale.nome}
                  width={portale.larghezza ?? 160}
                  height={portale.altezza ?? 40}
                  className={`w-auto ${portale.classeLogo ?? "h-6 sm:h-7"}`}
                />
              ) : (
                <span
                  className={`text-lg font-semibold tracking-tight sm:text-xl ${
                    isDark ? "text-cream" : "text-ink"
                  }`}
                >
                  {portale.nome}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>

      {descrizione && (
        <p
          className={`mx-auto mt-10 max-w-2xl text-sm leading-relaxed ${
            isDark ? "text-cream/70" : "text-muted"
          }`}
        >
          {descrizione}
        </p>
      )}

      {nota && (
        <p
          className={`mx-auto mt-6 max-w-2xl text-xs leading-relaxed ${
            isDark ? "text-cream/50" : "text-muted"
          }`}
        >
          {nota}
        </p>
      )}
    </div>
  );
}
