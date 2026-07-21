"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/config/site";
import { whatsappHref } from "@/config/site";
import { getDict } from "@/i18n/dictionaries";
import { WhatsApp } from "./Icons";

/**
 * Floating WhatsApp button, fixed to the bottom-right on every page.
 * It fades out while the footer is on screen so it never covers the footer
 * (or the final CTA that sits just above it), and its offset includes the
 * iOS safe-area inset so it clears the home indicator / browser chrome.
 */
export default function FloatingWhatsApp({ locale }: { locale: Locale }) {
  const label = getDict(locale).common.whatsapp;
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const io = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={whatsappHref(locale)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className={`group fixed z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_20px_-4px_rgba(0,0,0,0.35)] outline-none ring-offset-2 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.45)] focus-visible:ring-2 focus-visible:ring-green motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
        hidden
          ? "pointer-events-none translate-y-3 opacity-0"
          : "opacity-100"
      }`}
      style={{
        right: "calc(1.25rem + env(safe-area-inset-right))",
        bottom: "calc(1.25rem + env(safe-area-inset-bottom))",
      }}
    >
      <WhatsApp className="h-7 w-7" />
      {/* Tooltip - desktop hover / keyboard focus only. */}
      <span
        role="tooltip"
        className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-ink px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 md:block"
      >
        {label}
      </span>
    </a>
  );
}
