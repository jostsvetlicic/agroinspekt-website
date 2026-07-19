"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/config/site";

export default function LanguageSwitcher({
  locale,
  className = "",
}: {
  locale: Locale;
  className?: string;
}) {
  const pathname = usePathname();

  const swapLocale = (target: Locale) => {
    const segments = pathname.split("/");
    // segments[0] === "" , segments[1] === current locale
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = target;
    } else {
      segments.splice(1, 0, target);
    }
    return segments.join("/") || `/${target}`;
  };

  return (
    <div
      className={`flex items-center gap-1 text-xs font-medium tabular ${className}`}
    >
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-grey/40">/</span>}
          <Link
            href={swapLocale(l)}
            aria-current={l === locale ? "true" : undefined}
            className={`uppercase tracking-wide transition-colors ${
              l === locale
                ? "text-green-deep"
                : "text-grey hover:text-ink"
            }`}
          >
            {l}
          </Link>
        </span>
      ))}
    </div>
  );
}
