import { ImageResponse } from "next/og";

/**
 * Favicon. PLACEHOLDER di brand.
 * Sostituibile con un `icon.png` o `favicon.ico` nella stessa cartella.
 */
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#132B4F",
          color: "#C39B4E",
          fontSize: 38,
          fontWeight: 700,
          letterSpacing: "-0.04em",
        }}
      >
        G
      </div>
    ),
    size,
  );
}
