import { notFound } from "next/navigation";

/**
 * Any unmatched path under a locale (e.g. /en/does-not-exist) lands here and
 * triggers the branded not-found boundary with a proper 404 status, rendered
 * inside the locale layout (so the nav and footer are present).
 */
export default function CatchAll() {
  notFound();
}
