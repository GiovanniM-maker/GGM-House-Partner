"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import { footerNav, mainNav, primaryCta } from "@/content/site";

/** Voci secondarie: quelle del footer che non sono già nel menu principale. */
const secondaryLinks = footerNav.progetto.filter(
  (item) =>
    item.href !== primaryCta.href &&
    !mainNav.some((navItem) => navItem.href === item.href),
);

/** Menu di navigazione per viewport ridotti. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  // Il pannello si chiude alla navigazione: lo fa il click sul link, senza
  // effetti che reagiscono al cambio di rotta.
  const close = () => setOpen(false);

  // Blocca lo scroll di fondo e permette la chiusura con Esc.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong/70 text-ink transition-colors hover:border-ink"
      >
        <span className="sr-only">{open ? "Chiudi il menu" : "Apri il menu"}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          {open ? (
            <path d="m6 6 12 12M18 6 6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {open && (
        <div
          id={panelId}
          className="fixed inset-x-0 top-[var(--ggm-header-height)] bottom-0 z-40 overflow-y-auto border-t border-line bg-cream"
        >
          <nav aria-label="Navigazione principale" className="px-5 py-8">
            <ul className="space-y-1">
              {mainNav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={isActive ? "page" : undefined}
                      className={`block rounded-md px-3 py-3 text-lg font-medium transition-colors ${
                        isActive
                          ? "bg-white text-gold-900"
                          : "text-ink hover:bg-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 border-t border-line pt-6">
              <ul className="space-y-1">
                {secondaryLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      className="block rounded-md px-3 py-2.5 text-muted transition-colors hover:bg-white hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={primaryCta.href}
              onClick={close}
              className="mt-8 flex w-full items-center justify-center rounded-full bg-ink px-6 py-3.5 font-medium text-cream transition-colors hover:bg-ink-800"
            >
              {primaryCta.label}
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
