import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "@/config/site";

/**
 * Locale gate. Every visitor-facing path must live under a locale prefix
 * (/en or /si). This keeps the bare domain and any un-prefixed URL from
 * hitting a raw framework 404:
 *   - "/"            -> "/en"
 *   - "/services"    -> "/en/services"
 *   - "/junk"        -> "/en/junk"  (then rendered as the branded 404)
 * Requests that already carry a valid locale pass straight through.
 *
 * Static assets, the API and any file with an extension are excluded via the
 * matcher below, so images and _next chunks are never rewritten.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const matched = locales.find(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (matched) {
    // Forward the active locale so the not-found boundary (which cannot read
    // route params) can render its copy in the correct language on the server.
    const headers = new Headers(req.headers);
    headers.set("x-locale", matched);
    return NextResponse.next({ request: { headers } });
  }

  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Run on everything except Next internals, the API, the /admin panel
  // (its own top-level, non-localized area), and files with an extension
  // (favicon.svg, /img/*, /logo/*, etc.).
  matcher: ["/((?!_next|api|admin|.*\\..*).*)"],
};
