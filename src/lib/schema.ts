import { coverage, site } from "@/content/site";
import type { FaqItem } from "@/content/faq";

/**
 * Dati strutturati minimi.
 *
 * Contengono solo informazioni verificabili e già presenti sul sito:
 * nessun numero, nessuna recensione, nessun indirizzo inventato.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.fullName,
    url: site.url,
    description: site.description,
    areaServed: [
      { "@type": "AdministrativeArea", name: "Sicilia" },
      { "@type": "AdministrativeArea", name: coverage.local.area },
    ],
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
