"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { mainNav, primaryCta } from "@/content/site";

/** Header globale, sticky, con CTA persistente. */
export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-cream [--ggm-header-height:4.5rem]">
      <Container size="wide">
        <div className="flex h-[var(--ggm-header-height)] items-center justify-between gap-6">
          <Logo />

          <nav
            aria-label="Navigazione principale"
            className="hidden lg:block"
          >
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                        isActive
                          ? "bg-white text-teal-900"
                          : "text-ink-600 hover:bg-white hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={primaryCta.href}
              className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-ink-800 sm:inline-flex"
            >
              {primaryCta.label}
            </Link>
            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}
