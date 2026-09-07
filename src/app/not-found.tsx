import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { mainNav, primaryCta } from "@/content/site";
import Link from "next/link";

export const metadata = {
  title: "Pagina non trovata",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="contenuto" className="flex-1">
        <Container className="py-24 sm:py-32">
          <p className="text-xs font-semibold tracking-[0.2em] text-gold-700 uppercase">
            Errore 404
          </p>
          <h1 className="display-2 mt-4 font-semibold text-ink">
            Questa pagina non esiste.
          </h1>
          <p className="mt-5 lead max-w-xl text-muted">
            Forse l&apos;indirizzo è cambiato o è stato scritto male. Da qui puoi
            tornare al sito o raccontarci direttamente della tua casa.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/" size="lg">
              Torna alla home
            </ButtonLink>
            <ButtonLink href={primaryCta.href} variant="outline" size="lg">
              {primaryCta.label}
            </ButtonLink>
          </div>

          <nav aria-label="Pagine principali" className="mt-14 border-t border-line pt-8">
            <h2 className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
              Pagine principali
            </h2>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gold-700 underline underline-offset-4 hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </main>
      <Footer />
    </>
  );
}
