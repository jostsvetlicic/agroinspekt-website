import Link from "next/link";
import { defaultLocale } from "@/config/site";

/**
 * Global fallback 404. In practice the middleware funnels every visitor path
 * into a locale, so this is a safety net for the rare request that reaches the
 * app root without one. Kept self-contained (no locale nav) and defaults to
 * the primary language.
 */
export default function GlobalNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span className="eyebrow">Error 404</span>
      <p className="mt-8 font-display text-[6rem] font-semibold leading-none tracking-tight text-ink md:text-[9rem]">
        404
      </p>
      <h1 className="mt-6 font-display text-2xl font-medium text-ink md:text-3xl">
        This page could not be found
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-grey">
        The page you are looking for may have been moved, renamed, or never
        existed.
      </p>
      <Link href={`/${defaultLocale}`} className="btn-primary mt-10">
        Back to home
      </Link>
    </main>
  );
}
