import type { Locale } from "@/config/site";
import { getDict } from "@/i18n/dictionaries";
import Reveal from "@/components/Reveal";
import { SectionIndex, MeasureRule } from "@/components/Precision";

/**
 * White section with a different composition again: a fixed heading column on
 * the left, steps running as a vertical ledger on the right with large margin
 * numbers and hairlines that draw in. Layout variety, not another 4-up grid.
 */
export default function HowItWorks({ locale }: { locale: Locale }) {
  const t = getDict(locale).howItWorks;

  return (
    <section className="section">
      <div className="container-x">
        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
          {/* Heading column */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-4">
                <span className="eyebrow">{t.eyebrow}</span>
                <span className="ml-auto lg:hidden">
                  <SectionIndex n={4} total={5} />
                </span>
              </div>
              <h2 className="display mt-5 text-3xl leading-[1.12] sm:text-4xl">
                {t.title}
              </h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-grey">
                {t.lead}
              </p>
              <div className="mt-6 hidden lg:block">
                <SectionIndex n={4} total={5} />
              </div>
            </div>
          </div>

          {/* Steps ledger */}
          <div className="lg:col-span-7 lg:col-start-6">
            <MeasureRule />
            {t.steps.map((s, i) => (
              <Reveal key={s.title} delay={i}>
                <div className="flex gap-6 py-7 md:gap-10">
                  <span className="font-display text-3xl font-semibold tabular text-green md:text-4xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-medium text-ink md:text-xl">
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-grey">
                      {s.text}
                    </p>
                  </div>
                </div>
                <MeasureRule />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
