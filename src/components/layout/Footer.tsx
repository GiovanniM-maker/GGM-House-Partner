import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { contact, coverage, footerNav, primaryCta, site } from "@/content/site";

const columns = [
  { title: "Servizi", links: footerNav.servizi },
  { title: "Il progetto", links: footerNav.progetto },
  { title: "Legale", links: footerNav.legale },
] as const;

/** Footer globale. Contiene "Come funziona" e "FAQ" oltre alle pagine legali. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-cream">
      <Container size="wide" className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
          <div>
            <Logo tone="dark" size="lg" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/70">
              {site.positioning} Ristrutturazione, property management e
              percorsi integrati, con un unico referente sul posto.
            </p>

            <dl className="mt-8 space-y-4 text-sm">
              <div>
                <dt className="text-xs font-semibold tracking-[0.16em] text-gold uppercase">
                  {coverage.online.title}
                </dt>
                <dd className="mt-1 text-cream/70">{coverage.online.area}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-[0.16em] text-gold uppercase">
                  {coverage.local.title}
                </dt>
                <dd className="mt-1 text-cream/70">{coverage.local.area}</dd>
              </div>
            </dl>

            {(contact.email || contact.phone) && (
              <div className="mt-8 space-y-1 text-sm">
                {contact.email && (
                  <p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-cream underline underline-offset-4 hover:text-gold"
                    >
                      {contact.email}
                    </a>
                  </p>
                )}
                {contact.phone && (
                  <p>
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, "")}`}
                      className="text-cream underline underline-offset-4 hover:text-gold"
                    >
                      {contact.phone}
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="text-xs font-semibold tracking-[0.16em] text-gold uppercase">
                  {column.title}
                </h2>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-cream/75 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl text-xs leading-relaxed text-cream/65">
            GGM è un progetto in avvio. Le esperienze professionali citate sul
            sito appartengono ai fondatori e non costituiscono casi studio della
            società. Non forniamo garanzie di rendimento.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href={primaryCta.href}
              className="inline-flex w-fit items-center justify-center rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-gold-50"
            >
              {primaryCta.label}
            </Link>
            <p className="text-xs text-cream/65">
              © {year} {site.name}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
