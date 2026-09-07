import { CTASection } from "@/components/sections/CTASection";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { Hero } from "@/components/sections/Hero";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Section } from "@/components/ui/Section";
import { allFaqItems, faqCategories } from "@/content/faq";
import { primaryCta, routes } from "@/content/site";
import { faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Domande frequenti",
  description:
    "Risposte su ristrutturazione, property management, percorso integrato, operatività, pagamenti e aree in cui operiamo in Sicilia.",
  path: routes.faq,
});

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(allFaqItems)),
        }}
      />

      <Hero
        variant="light"
        eyebrow="FAQ"
        title="Domande frequenti."
        description="Le risposte che diamo più spesso, divise per argomento. Se la tua domanda non è qui, scrivicela nel modulo."
        primaryCta={primaryCta}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />

      {/* Indice delle categorie */}
      <Section tone="white" spacing="sm">
        <nav aria-label="Categorie delle domande frequenti">
          <ul className="flex flex-wrap gap-2">
            {faqCategories.map((category) => (
              <li key={category.id}>
                <a
                  href={`#${category.id}`}
                  className="inline-flex rounded-full border border-line-strong px-4 py-2 text-sm text-ink-600 transition-colors hover:border-ink hover:text-ink"
                >
                  {category.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Section>

      {faqCategories.map((category, index) => (
        <Section
          key={category.id}
          id={category.id}
          tone={index % 2 === 0 ? "cream" : "white"}
          spacing="md"
          className="scroll-mt-24"
        >
          <SectionHeader title={category.title} description={category.intro} />
          <FAQAccordion items={category.items} className="mt-8" />
        </Section>
      ))}

      <CTASection
        eyebrow="Non hai trovato la risposta?"
        title="Raccontaci la tua situazione e ti rispondiamo."
        description="Le domande specifiche sulla tua casa hanno bisogno di informazioni sulla tua casa. Puoi scrivercele nel modulo."
        cta={primaryCta}
      />
    </>
  );
}
