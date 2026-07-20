"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { Locale } from "@/config/site";
import { navLinks } from "@/config/site";
import { getDict } from "@/i18n/dictionaries";
import { localePath } from "@/lib/i18n";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { ArrowRight, Close, Menu } from "./Icons";

export default function Nav({ locale }: { locale: Locale }) {
  const t = getDict(locale).nav;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === localePath(locale, href) ||
    pathname.startsWith(localePath(locale, href) + "/");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white transition-all duration-300 ${
        scrolled
          ? "border-b border-line shadow-[0_1px_0_rgba(16,24,40,0.04)]"
          : "border-b border-transparent"
      }`}
    >
      <div
        className={`container-x flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <Link href={localePath(locale, "/")} aria-label={t.about}>
          <Logo height={scrolled ? 24 : 28} />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.key}
              href={localePath(locale, l.href)}
              className={`text-sm transition-colors ${
                isActive(l.href)
                  ? "text-ink"
                  : "text-grey hover:text-ink"
              }`}
            >
              {t[l.key as keyof typeof t]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher locale={locale} className="hidden sm:flex" />
          <Link
            href={localePath(locale, "/contact")}
            className="btn-primary hidden text-[13px] sm:inline-flex"
          >
            {t.requestCta}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-md border border-line text-ink lg:hidden"
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-white lg:hidden"
          >
            <div className="container-x flex flex-col gap-1 py-6">
              {navLinks.map((l) => (
                <Link
                  key={l.key}
                  href={localePath(locale, l.href)}
                  className="flex items-center justify-between border-b border-line py-4 text-lg text-ink"
                >
                  {t[l.key as keyof typeof t]}
                  <ArrowRight className="h-4 w-4 text-grey" />
                </Link>
              ))}
              <div className="mt-4 flex items-center justify-between">
                <LanguageSwitcher locale={locale} />
                <Link
                  href={localePath(locale, "/contact")}
                  className="btn-primary text-[13px]"
                >
                  {t.requestCta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
