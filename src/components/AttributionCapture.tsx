"use client";

import { useEffect } from "react";

import { captureAttribution } from "@/lib/attribution";

/**
 * Raccoglie gli identificativi di clic pubblicitario alla prima apertura del
 * sito. Non disegna nulla: monta, legge l'indirizzo e conserva quello che
 * trova, così il dato è disponibile quando il modulo viene inviato, anche da
 * un'altra pagina.
 */
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution(window.location.search);
  }, []);

  return null;
}
