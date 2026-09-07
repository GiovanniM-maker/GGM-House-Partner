import type { ReactNode } from "react";

import { MinimalFooter } from "@/components/layout/MinimalFooter";
import { MinimalHeader } from "@/components/layout/MinimalHeader";

/** Layout della conversion page: header e footer ridotti al minimo. */
export default function ConversionLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MinimalHeader />
      <main id="contenuto" className="flex-1">
        {children}
      </main>
      <MinimalFooter />
    </>
  );
}
