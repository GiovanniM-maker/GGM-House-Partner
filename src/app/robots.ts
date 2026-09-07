import type { MetadataRoute } from "next";

import { site } from "@/content/site";

/**
 * La V1 non è ancora pubblica: l'indicizzazione resta bloccata.
 * Al lancio si sostituisce `disallow` con `allow: "/"` e si toglie il
 * `robots: { index: false }` dal layout radice.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
