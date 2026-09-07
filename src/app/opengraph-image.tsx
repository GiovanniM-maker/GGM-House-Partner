import { ImageResponse } from "next/og";

import { site } from "@/content/site";

/**
 * Immagine Open Graph di default. PLACEHOLDER di brand.
 *
 * Generata dal brand, senza fotografie né dati. Va sostituita con la grafica
 * definitiva quando sarà disponibile: basta rimpiazzare questo file con un
 * `opengraph-image.jpg` nella stessa cartella.
 */
export const alt = site.metaTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#132B4F",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              fontSize: 44,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
            }}
          >
            GGM
          </div>
          <div style={{ width: 2, height: 34, backgroundColor: "#C39B4E" }} />
          <div
            style={{
              fontSize: 22,
              color: "#F4EBD8",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            {site.tagline}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            Hai una casa in Sicilia? Ci pensiamo noi.
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              color: "#C39B4E",
              maxWidth: 820,
            }}
          >
            {site.positioning}
          </div>
        </div>

        <div style={{ display: "flex", height: 8, width: 220, backgroundColor: "#C39B4E" }} />
      </div>
    ),
    size,
  );
}
