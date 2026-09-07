import type { Metadata } from "next";

import { site } from "@/content/site";

type PageMetaInput = {
  title: string;
  description: string;
  /** Path assoluto del sito, es. "/ristrutturazione". */
  path: string;
  /** True per ignorare il template del titolo (usato solo in home). */
  absoluteTitle?: boolean;
};

/**
 * Metadata di base condivisi da tutte le pagine.
 *
 * Include canonical e Open Graph. L'immagine OG è un placeholder di brand:
 * va sostituita con una grafica definitiva mantenendo lo stesso percorso.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: PageMetaInput): Metadata {
  const url = path === "/" ? site.url : `${site.url}${path}`;

  // L'immagine è generata da `src/app/opengraph-image.tsx`. Va dichiarata
  // esplicitamente: quando una pagina definisce il proprio blocco `openGraph`,
  // Next non vi aggiunge automaticamente l'immagine da file convention.
  const images = [
    {
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: site.metaTitle,
    },
  ];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.fullName,
      title,
      description,
      url,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}
