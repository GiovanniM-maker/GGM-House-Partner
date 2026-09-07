import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { footerNav, site } from "@/content/site";

/** Footer ridotto per la conversion page: solo riferimenti legali. */
export function MinimalFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-cream">
      <Container size="wide" className="py-8">
        <div className="flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted">
            © {year} {site.name} — {site.tagline}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerNav.legale.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
