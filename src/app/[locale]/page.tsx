import type { Locale } from "@/config/site";
import { isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { getDict } from "@/i18n/dictionaries";
import { media } from "@/config/media";
import { features } from "@/config/features";
import { getMetrics, getSettingsMap } from "@/lib/content";
import Hero from "@/components/sections/Hero";
import HeroSequence from "@/components/sections/HeroSequence";
import StatementBand from "@/components/sections/StatementBand";
import PinnedServices from "@/components/sections/PinnedServices";
import HowItWorks from "@/components/sections/HowItWorks";
import Counters from "@/components/sections/Counters";
import Accreditations from "@/components/sections/Accreditations";
import ProjectsPreview from "@/components/sections/ProjectsPreview";
import Coverage from "@/components/sections/Coverage";
import FinalCta from "@/components/sections/FinalCta";

/**
 * Homepage rhythm - the page leads a first-time visitor from "who we are" to
 * "what you can buy" within the first two screens, then builds credibility:
 *   Hero (dark) → What we inspect: intro line + pinned services (off-white)
 *   → statement band (dark photo) → Accreditations (off-white)
 *   → Metrics (flat navy, counting) → How it works (white)
 *   → Projects (white) → statement band (dark photo)
 *   → Coverage (off-white) → CTA (flat navy).
 * Light and dark deliberately alternate; the two photographic bands and the
 * flat navy metrics/CTA are the loud moments between calmer passages.
 */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const s = getDict(l).statements;

  // DB-backed content (editable in the admin), with static fallback.
  const [metrics, settings] = await Promise.all([
    getMetrics(),
    getSettingsMap(["finalCta.title", "finalCta.text"]),
  ]);
  const finalCtaTitle = settings["finalCta.title"]?.[l] ?? undefined;
  const finalCtaText = settings["finalCta.text"]?.[l] ?? undefined;

  return (
    <>
      {features.heroVariant === "sequence" ? (
        <HeroSequence locale={l} />
      ) : (
        <Hero locale={l} />
      )}

      <PinnedServices locale={l} />

      <StatementBand
        media={media.coverage}
        statement={s.integrity.statement}
        support={s.integrity.support}
        index="01"
      />

      <Accreditations locale={l} />

      <Counters locale={l} metrics={metrics} />

      <HowItWorks locale={l} />

      <ProjectsPreview locale={l} />

      <StatementBand
        media={media.capability}
        statement={s.evidence.statement}
        support={s.evidence.support}
        index="02"
      />

      <Coverage locale={l} />

      <FinalCta locale={l} title={finalCtaTitle} text={finalCtaText} />
    </>
  );
}
