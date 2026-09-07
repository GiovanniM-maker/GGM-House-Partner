import type { MetadataRoute } from "next";

import { routes, site } from "@/content/site";

/** Sitemap della V1. Le pagine legali hanno priorità inferiore. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: { path: string; priority: number }[] = [
    { path: routes.home, priority: 1 },
    { path: routes.ristrutturazione, priority: 0.9 },
    { path: routes.propertyManagement, priority: 0.9 },
    { path: routes.integrato, priority: 0.9 },
    { path: routes.valutazione, priority: 0.8 },
    { path: routes.comeFunziona, priority: 0.7 },
    { path: routes.chiSiamo, priority: 0.7 },
    { path: routes.faq, priority: 0.6 },
    { path: routes.privacy, priority: 0.2 },
    { path: routes.cookie, priority: 0.2 },
    { path: routes.termini, priority: 0.2 },
  ];

  return pages.map(({ path, priority }) => ({
    url: path === "/" ? site.url : `${site.url}${path}`,
    lastModified,
    priority,
  }));
}
