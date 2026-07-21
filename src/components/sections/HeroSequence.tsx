"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "@/config/site";
import { getDict } from "@/i18n/dictionaries";
import { media } from "@/config/media";
import { localePath } from "@/lib/i18n";
import { getLenis } from "@/lib/smoothScroll";
import { ArrowRight } from "@/components/Icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EASE = [0.22, 1, 0.36, 1] as const;
const TEXT_TRANSITION =
  "transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform";

/**
 * Hero eyebrow, overridden only here (not site-wide): noticeably larger than
 * the global 11px eyebrow, a brighter green than #139E3E for legibility over
 * bright areas of any of the three photos, plus a soft shadow. Kept clearly
 * secondary to the white headline. Uppercase + letter-spacing inherited from
 * `.eyebrow` are left untouched.
 */
const HERO_EYEBROW =
  "eyebrow eyebrow-on-dark !text-sm md:!text-base !text-[#2ED06A] drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]";

/**
 * Pinned-scroll tuning (all in multiples of viewport height).
 *  PER_TRANSITION_VH — scroll distance to move from one slide to the next.
 *    Higher = more resistance; each slide holds position and takes a
 *    deliberate scroll to advance.
 *  HOLD_VH — extra scroll at the very end where the track no longer moves,
 *    so slide three fully arrives, its text settles, and there is a clear
 *    pause before the hero unpins into the section below.
 */
const PER_TRANSITION_VH = 3.1;
const HOLD_VH = 1.2;

type Slide = { headline: string; support: string; src: string; alt: string };

function useSlides(locale: Locale): Slide[] {
  const t = getDict(locale).hero;
  return t.slides.map((s, i) => ({
    headline: s.headline,
    support: s.support,
    src: media.heroSequence[i].src,
    alt: media.heroSequence[i].alt,
  }));
}

/* ------------------------------------------------------------------ */
/* Persistent overlay: eyebrow, both CTAs, scroll cue — never inside  */
/* the moving track, so the "Request an inspection" button is always  */
/* reachable and stays put while the slides travel across.            */
/* ------------------------------------------------------------------ */
function Overlay({
  locale,
  scrolled,
}: {
  locale: Locale;
  scrolled: boolean;
}) {
  const t = getDict(locale).hero;
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      <div className="container-x absolute left-0 right-0 top-28 md:top-32">
        <span className={HERO_EYEBROW}>{t.eyebrow}</span>
      </div>

      <div className="container-x absolute inset-x-0 bottom-10 md:bottom-12">
        <div className="pointer-events-auto flex flex-col items-start gap-4 sm:flex-row sm:items-center">
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
        </div>
      </div>

      {/* Scroll cue — fades out once the sequence starts moving. */}
      <div
        className={`absolute inset-x-0 bottom-10 hidden justify-center transition-opacity duration-500 md:flex ${
          scrolled ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/60">
          {t.scroll}
          <span className="h-8 w-px bg-white/40" />
        </span>
      </div>
    </div>
  );
}

function ProgressMarks({
  count,
  active,
}: {
  count: number;
  active: number;
}) {
  return (
    <div className="container-x pointer-events-none absolute inset-x-0 bottom-28 z-20 md:bottom-32">
      <div className="flex items-center gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <span
            key={i}
            className={`h-[3px] rounded-full transition-all duration-500 ease-out ${
              i === active
                ? "w-10 bg-green"
                : "w-5 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop: pinned horizontal sequence driven by GSAP ScrollTrigger,  */
/* synced to the existing Lenis smooth scroll. Transform-only.        */
/* ------------------------------------------------------------------ */
function PinnedHero({ locale, slides }: { locale: Locale; slides: Slide[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [settled, setSettled] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const n = slides.length;
    const lenis = getLenis();
    const onLenisScroll = () => ScrollTrigger.update();
    lenis?.on("scroll", onLenisScroll);

    // Fraction of the total pinned scroll spent travelling between slides;
    // the remainder (1 - travelFraction) is the end hold where slide three
    // sits fully settled before the pin releases.
    const travelDistVh = PER_TRANSITION_VH * (n - 1);
    const travelFraction = travelDistVh / (travelDistVh + HOLD_VH);

    // Maps overall scroll progress (0..1) to horizontal-travel progress (0..1),
    // reaching 1 at travelFraction and holding flat through the tail.
    const toTravel = (p: number) => Math.min(p / travelFraction, 1);

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(n - 1) * window.innerWidth,
        // Custom ease flattens the last stretch: the track completes its move,
        // then holds while the remaining scroll is consumed (the settle pause).
        ease: (p: number) => toTravel(p),
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () =>
            "+=" +
            window.innerHeight * (PER_TRANSITION_VH * (n - 1) + HOLD_VH),
          pin: true,
          scrub: 1, // weighted catch-up; the "slow, eased" feel
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = toTravel(self.progress) * (n - 1);
            const nearest = Math.round(p);
            setActive(nearest);
            // Reveal a slide's text only once it has all but arrived, so the
            // copy reads as deliberate rather than sliding in with the image.
            // In the end hold, p pins to n-1, so slide three stays settled.
            setSettled(Math.abs(p - nearest) < 0.12 ? nearest : -1);
            setScrolled(self.progress > 0.01);
          },
        },
      });
    }, section);

    ScrollTrigger.refresh();

    return () => {
      lenis?.off("scroll", onLenisScroll);
      ctx.revert();
    };
  }, [slides]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-ink"
    >
      <div ref={trackRef} className="flex h-full w-full will-change-transform">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="relative h-full w-screen flex-shrink-0 overflow-hidden"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
            {/* Layered scrims for worst-case legibility over the brightest
                part of any photo: a strong vertical gradient, plus a dark
                pool concentrated behind the lower-left text block. */}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,18,30,0.34)_0%,rgba(12,18,30,0.5)_42%,rgba(12,18,30,0.9)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(130%_95%_at_22%_66%,rgba(12,18,30,0.62)_0%,rgba(12,18,30,0)_58%)]" />

            <div className="container-x absolute inset-x-0 bottom-[36%] z-10">
              <div
                className={`${TEXT_TRANSITION} max-w-4xl ${
                  settled === i
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0"
                }`}
              >
                <h1 className="font-display text-5xl font-bold leading-[1.04] tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.55)] sm:text-6xl md:text-7xl">
                  {slide.headline}
                </h1>
                <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)] md:text-xl">
                  {slide.support}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProgressMarks count={slides.length} active={active} />
      <Overlay locale={locale} scrolled={scrolled} />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile & reduced-motion / no-JS fallback: three full-height slides */
/* stacked vertically, each revealing on scroll. No pinning — natural */
/* touch scrolling. This is also the server-rendered first paint.     */
/* ------------------------------------------------------------------ */
function StackedHero({ locale, slides }: { locale: Locale; slides: Slide[] }) {
  const t = getDict(locale).hero;
  return (
    <>
      {slides.map((slide, i) => (
        <section
          key={i}
          className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-ink"
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,18,30,0.32)_0%,rgba(12,18,30,0.5)_45%,rgba(12,18,30,0.92)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(140%_80%_at_20%_82%,rgba(12,18,30,0.6)_0%,rgba(12,18,30,0)_62%)]" />

          <div className="container-x relative z-10 pb-16 pt-28">
            {i === 0 && (
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className={HERO_EYEBROW}
              >
                {t.eyebrow}
              </motion.span>
            )}

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className={i === 0 ? "mt-6" : ""}
            >
              <h1
                className={`font-display font-bold leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)] ${
                  i === 0 ? "text-3xl sm:text-5xl" : "text-3xl sm:text-4xl"
                }`}
              >
                {slide.headline}
              </h1>
              <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
                {slide.support}
              </p>
            </motion.div>

            {i === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
                className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
              >
                <Link
                  href={localePath(locale, "/contact")}
                  className="btn-primary"
                >
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
            )}
          </div>
        </section>
      ))}
    </>
  );
}

export default function HeroSequence({ locale }: { locale: Locale }) {
  const slides = useSlides(locale);
  // Start in the stacked layout so SSR and first client paint agree
  // (no hydration mismatch); upgrade to the pinned sequence on desktop.
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => setPinned(wide.matches && !reduce.matches);
    decide();
    wide.addEventListener("change", decide);
    reduce.addEventListener("change", decide);
    return () => {
      wide.removeEventListener("change", decide);
      reduce.removeEventListener("change", decide);
    };
  }, []);

  return pinned ? (
    <PinnedHero locale={locale} slides={slides} />
  ) : (
    <StackedHero locale={locale} slides={slides} />
  );
}
