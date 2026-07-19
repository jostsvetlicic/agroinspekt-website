"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Locale } from "@/config/site";
import { getDict } from "@/i18n/dictionaries";
import { media } from "@/config/media";
import { localePath } from "@/lib/i18n";
import { ArrowRight } from "@/components/Icons";

export default function Hero({ locale }: { locale: Locale }) {
  const t = getDict(locale).hero;
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="relative flex min-h-[88svh] w-full items-end overflow-hidden">
      {/* Full-bleed image */}
      <Image
        src={media.hero.src}
        alt={media.hero.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Dark gradient for legibility */}
      <div className="absolute inset-0 bg-hero-fade" />

      {/* Content */}
      <div className="container-x relative pb-20 pt-32 md:pb-28">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="eyebrow eyebrow-on-dark"
        >
          {t.eyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease }}
          className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          {t.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80"
        >
          {t.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease }}
          className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
        >
          <Link href={localePath(locale, "/contact")} className="btn-primary">
            {t.primaryCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={localePath(locale, "/services")}
            className="inline-flex items-center gap-2 text-sm font-medium text-white/85 transition-colors hover:text-white"
          >
            {t.secondaryCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
