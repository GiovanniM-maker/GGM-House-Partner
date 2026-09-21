import Image from "next/image";

export type Portal = {
  nome: string;
  /**
   * Logo ufficiale del portale. Finché manca viene mostrato il nome come
   * lettering: meglio un nome scritto bene di un logo ricostruito a mano, che
   * violerebbe le linee guida del marchio.
   */
  logo?: string;
};

type PortalBandProps = {
  titolo: string;
  descrizione?: string;
  portali: readonly Portal[];
  tone?: "light" | "dark";
};

/** Fascia dei canali su cui gestiamo l'annuncio. */
export function PortalBand({
  titolo,
  descrizione,
  portali,
  tone = "light",
}: PortalBandProps) {
  const isDark = tone === "dark";

  return (
    <div className="text-center">
      <h2
        className={`display-3 font-semibold ${isDark ? "text-white" : "text-ink"}`}
      >
        {titolo}
      </h2>

      <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-16">
        {portali.map((portale) => (
          <li key={portale.nome} className="flex items-center">
            {portale.logo ? (
              <Image
                src={portale.logo}
                alt={portale.nome}
                width={140}
                height={40}
                className={`h-7 w-auto sm:h-8 ${isDark ? "brightness-0 invert" : ""}`}
              />
            ) : (
              <span
                className={`text-lg font-semibold tracking-tight sm:text-xl ${
                  isDark ? "text-cream/70" : "text-ink-600"
                }`}
              >
                {portale.nome}
              </span>
            )}
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
    </div>
  );
}
