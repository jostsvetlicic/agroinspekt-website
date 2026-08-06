"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import type { Locale } from "@/config/site";
import type { LocalizedService } from "@/lib/services";
import { serviceMedia } from "@/config/media";
import { getDict } from "@/i18n/dictionaries";
import { localePath } from "@/lib/i18n";
import { ArrowRight } from "@/components/Icons";
import { SectionIndex } from "@/components/Precision";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * THE ONE PINNED SCROLL MOMENT.
 * The eight inspection domains are listed on the left; the list stays pinned
 * while the corresponding photograph on the right changes as the user scrolls.
 * Used exactly once on the site. On small screens it degrades to a simple
 * stacked list of cards (no pinning), so touch scrolling stays natural.
 */
export default function PinnedServices({
  locale,
  services,
}: {
  locale: Locale;
  services: LocalizedService[];
}) {
  const t = getDict(locale).services;
  const intro = getDict(locale).whatWeDo.lead;
  const eyebrow = locale === "si" ? "Kaj pregledujemo" : "What we inspect";

  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Map scroll progress across the tall container to one of N items.
    const next = Math.min(
      services.length - 1,
      Math.max(0, Math.floor(v * services.length)),
    );
    if (next !== active) setActive(next);
  });

  const activeService = services[active];
  const activeImg = serviceMedia(activeService.slug);

  return (
    <section className="section-alt">
      {/* Header lives in the normal flow above the pinned track. */}
      <div className="container-x pt-20 md:pt-28">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="display mt-5 text-3xl leading-[1.12] sm:text-4xl">
              {t.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-grey">
              {intro}
            </p>
          </div>
          <Link
            href={localePath(locale, "/services")}
            className="link-green inline-flex items-center gap-2 text-sm font-medium"
          >
            {t.viewAll}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* ---- Desktop: pinned scroll track ---- */}
      <div
        ref={containerRef}
        className="relative mt-14 hidden lg:block"
        style={{ height: `${services.length * 62}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center">
          <div className="container-x w-full">
            <div className="grid grid-cols-12 gap-10">
              {/* Left - the pinned list */}
              <div className="col-span-5">
                <div className="mb-6 flex items-center gap-3">
                  <SectionIndex n={active + 1} total={services.length} />
                  <span className="h-px flex-1 bg-line" />
                </div>
                <ul>
                  {services.map((s, i) => {
                    const isActive = i === active;
                    return (
                      <li key={s.slug} className="border-b border-line">
                        <Link
                          href={localePath(
                            locale,
                            `/services/${s.slug}`,
                          )}
                          className="group flex items-baseline gap-4 py-4"
                        >
                          <span
                            className={`tabular text-xs font-medium transition-colors ${
                              isActive ? "text-green" : "text-grey-light"
                            }`}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`font-display text-2xl leading-tight transition-colors duration-300 ${
                              isActive
                                ? "text-ink"
                                : "text-grey-light group-hover:text-grey"
                            }`}
                          >
                            {s[locale].title}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Right - the changing photograph */}
              <div className="col-span-7">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-line bg-offwhite">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeService.slug}
                      className="absolute inset-0"
                      initial={{ clipPath: "inset(0 0 100% 0)" }}
                      animate={{ clipPath: "inset(0 0 0% 0)" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: EASE }}
                    >
                      <Image
                        src={activeImg.src}
                        alt={activeImg.alt}
                        fill
                        sizes="55vw"
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-ink/80 to-transparent p-6">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={activeService.slug}
                        className="max-w-md text-sm leading-relaxed text-white/85"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                      >
                        {activeService[locale].tagline}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Mobile / tablet: simple stacked list ---- */}
      <div className="container-x pb-20 pt-12 lg:hidden">
        <ul className="space-y-4">
          {services.map((s, i) => {
            const img = serviceMedia(s.slug);
            return (
              <li key={s.slug}>
                <Link
                  href={localePath(locale, `/services/${s.slug}`)}
                  className="card card-hover group flex overflow-hidden"
                >
                  <div className="relative aspect-square w-28 shrink-0 overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-4">
                    <span className="tabular text-xs font-medium text-green">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-medium text-ink">
                      {s[locale].title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-grey">
                      {s[locale].tagline}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
