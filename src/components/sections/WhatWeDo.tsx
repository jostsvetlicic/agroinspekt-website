import type { Locale } from "@/config/site";
import { getDict } from "@/i18n/dictionaries";
import Reveal from "@/components/Reveal";
import { SectionIndex, MeasureRule, Crosshair } from "@/components/Precision";

/**
 * Opening white section. Scale contrast: one genuinely large statement fills
 * the width while the supporting prose sits quietly, offset, to the right.
 * A margin section index and a corner crosshair carry the precision motif.
 */
export default function WhatWeDo({ locale }: { locale: Locale }) {
  const t = getDict(locale).whatWeDo;

  return (
    <section className="section">
      <div className="container-x">
        <div className="flex items-center gap-4">
          <span className="eyebrow">{t.eyebrow}</span>
          <span className="ml-auto">
            <SectionIndex n={1} total={5} />
          </span>
        </div>

        <MeasureRule className="mt-6" />

        {/* Asymmetric split: loud statement left, quiet prose offset right. */}
        <div className="mt-12 grid gap-x-10 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="statement text-[clamp(2rem,4.6vw,3.75rem)] text-ink">
                {t.title}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-6">
            <Reveal delay={1}>
              <p className="text-base font-medium leading-relaxed text-ink/80">
                {t.lead}
              </p>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-5 text-[15px] leading-relaxed text-grey">
                {t.body}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Supporting proof points - quiet, framed with a corner mark. */}
        <div className="relative mt-16 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
          <span className="pointer-events-none absolute -left-1.5 -top-1.5 z-10">
            <Crosshair />
          </span>
          {t.points.map((p, i) => (
            <Reveal key={p.title} delay={i + 2}>
              <div className="h-full bg-white p-7">
                <span className="tabular text-xs font-medium text-green-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-base font-medium text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-grey">
                  {p.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
