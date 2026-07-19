import type { Locale } from "@/config/site";
import { offices } from "@/config/site";
import { getDict } from "@/i18n/dictionaries";
import SectionHeading from "@/components/SectionHeading";
import CoverageMap from "@/components/CoverageMap";
import Reveal from "@/components/Reveal";
import ClipReveal from "@/components/ClipReveal";
import { Mail, Phone, Pin } from "@/components/Icons";

export default function Coverage({ locale }: { locale: Locale }) {
  const t = getDict(locale).coverage;

  return (
    <section className="section section-alt">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

          <div className="mt-10 space-y-4">
            {offices.map((o, i) => {
              const emphasised = "emphasis" in o && o.emphasis;
              return (
                <Reveal key={o.id} delay={i}>
                  <div
                    className={`card p-6 ${
                      emphasised ? "border-green/40 bg-green-soft" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-lg font-medium text-ink">
                        {o.city}
                      </h3>
                      <span
                        className={`rounded-md px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide ${
                          emphasised
                            ? "bg-green/15 text-green-deep"
                            : "bg-offwhite text-grey"
                        }`}
                      >
                        {o.role[locale]}
                      </span>
                    </div>
                    <div className="mt-4 space-y-2 text-sm text-grey">
                      <p className="flex items-start gap-2.5">
                        <Pin className="mt-0.5 h-4 w-4 shrink-0 text-green" />
                        {o.street}, {o.postal}, {o.country[locale]}
                      </p>
                      <p className="flex items-center gap-2.5">
                        <Phone className="h-4 w-4 shrink-0 text-green" />
                        <a
                          href={`tel:${o.phoneHref}`}
                          className="tabular hover:text-ink"
                        >
                          {o.phone}
                        </a>
                      </p>
                      <p className="flex items-center gap-2.5">
                        <Mail className="h-4 w-4 shrink-0 text-green" />
                        <a
                          href={`mailto:${o.emails[0]}`}
                          className="hover:text-ink"
                        >
                          {o.emails[0]}
                        </a>
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div>
          <ClipReveal>
            <CoverageMap locale={locale} />
          </ClipReveal>
          <Reveal delay={1}>
            <p className="mt-4 flex items-start gap-2 text-sm text-grey">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
              {t.portAdvantage}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
