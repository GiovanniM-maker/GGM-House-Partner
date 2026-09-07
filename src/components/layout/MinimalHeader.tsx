import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";

/**
 * Header ridotto per la conversion page: nessuna navigazione secondaria,
 * solo il ritorno al sito, per non disperdere l'attenzione dal modulo.
 */
export function MinimalHeader() {
  return (
    <header className="border-b border-line bg-cream">
      <Container size="wide">
        <div className="flex h-20 items-center justify-between gap-6">
          <Logo />
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 10H5m0 0 4-4m-4 4 4 4" />
            </svg>
            Torna al sito
          </Link>
        </div>
      </Container>
    </header>
  );
}
