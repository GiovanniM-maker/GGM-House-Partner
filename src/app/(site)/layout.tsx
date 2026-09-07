import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

/** Layout del sito: navbar e footer completi. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="contenuto" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
