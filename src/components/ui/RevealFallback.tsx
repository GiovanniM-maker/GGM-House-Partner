"use client";

import { useEffect } from "react";

/**
 * Ripiego per i browser che non supportano le animazioni legate allo
 * scorrimento. Dove `animation-timeline: view()` esiste questo componente non
 * fa nulla: se ne accorge e si ferma subito.
 *
 * L'attributo sulla radice viene acceso da qui, non dal server: se lo script
 * non gira, il CSS del ripiego non si applica e il contenuto resta visibile
 * invece di restare fermo a trasparente.
 */
export function RevealFallback() {
  useEffect(() => {
    if (CSS.supports("animation-timeline: view()")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const radice = document.documentElement;
    radice.dataset.revealFallback = "on";

    const osservatore = new IntersectionObserver(
      (voci) => {
        for (const voce of voci) {
          if (!voce.isIntersecting) continue;
          voce.target.setAttribute("data-revealed", "");
          osservatore.unobserve(voce.target);
        }
      },
      // Fa partire l'ingresso quando l'elemento è entrato davvero, non
      // quando sfiora il bordo basso dello schermo.
      { rootMargin: "0px 0px -12% 0px" },
    );

    document
      .querySelectorAll(".reveal")
      .forEach((elemento) => osservatore.observe(elemento));

    return () => {
      osservatore.disconnect();
      delete radice.dataset.revealFallback;
    };
  }, []);

  return null;
}
