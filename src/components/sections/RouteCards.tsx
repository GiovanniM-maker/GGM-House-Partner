import Link from "next/link";

type Route = {
  label: string;
  description: string;
  href: string;
};

type RouteCardsProps = {
  routes: Route[];
  className?: string;
  tone?: "light" | "dark";
};

/**
 * Router "Cosa vuoi fare con la tua casa?".
 * Distribuisce il traffico verso i tre percorsi principali.
 */
export function RouteCards({
  routes,
  className = "",
  tone = "light",
}: RouteCardsProps) {
  const isDark = tone === "dark";

  return (
    <ul className={`grid gap-4 sm:grid-cols-3 ${className}`}>
      {routes.map((route, index) => (
        <li key={route.href} className="reveal" style={{ animationDelay: `${index * 60}ms` }}>
          <Link
            href={route.href}
            className={`group flex h-full flex-col rounded-lg border p-6 transition duration-200 ${
              isDark
                ? "border-white/15 bg-white/5 hover:border-teal/60 hover:bg-white/10"
                : "border-line bg-white hover:-translate-y-0.5 hover:border-teal-700/50"
            }`}
          >
            <span
              className={`text-xs font-semibold tracking-[0.16em] uppercase ${
                isDark ? "text-teal" : "text-teal-700"
              }`}
            >
              0{index + 1}
            </span>
            <span
              className={`mt-4 text-xl font-semibold ${isDark ? "text-white" : "text-ink"}`}
            >
              {route.label}
            </span>
            <span
              className={`mt-2.5 flex-1 text-sm leading-relaxed ${
                isDark ? "text-teal-50/75" : "text-muted"
              }`}
            >
              {route.description}
            </span>
            <span
              className={`mt-6 inline-flex items-center gap-2 text-sm font-medium transition-transform duration-200 group-hover:translate-x-0.5 ${
                isDark ? "text-teal" : "text-teal-700"
              }`}
            >
              Vai
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
                <path d="M4 10h11m0 0-4-4m4 4-4 4" />
              </svg>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
