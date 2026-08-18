import type { Locale } from "@/config/site";
import { getDict } from "@/i18n/dictionaries";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function Accreditations({ locale }: { locale: Locale }) {
  const t = getDict(locale).accreditations;

  return (
    <section className="section section-alt">
      <div className="container-x">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          lead={t.lead}
          align="center"
        />

        {/* Method statement — shown prominently and confidently. */}
        <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-3">
          {t.points.map((point, i) => (
            <Reveal key={point.title} delay={i}>
              <div className="card h-full p-7">
                <span className="font-display text-2xl font-semibold tabular text-green-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-lg font-medium text-ink">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-grey">
                  {point.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Clearly-marked placeholders for the client's real certification /
            membership logos. Swap each box for a logo when supplied. */}
        <Reveal>
          <div className="mx-auto mt-14 max-w-4xl">
            <p className="text-center text-xs font-semibold uppercase tracking-eyebrow text-grey">
              {t.logosTitle}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="grid h-20 place-items-center rounded-lg border border-dashed border-line bg-white"
                >
                  <span className="text-[10px] uppercase tracking-eyebrow text-grey-light">
                    {t.logoLabel}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs leading-relaxed text-grey-light">
              {t.logosNote}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
