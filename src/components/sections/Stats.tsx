import type { Locale } from "@/config/site";
import { getDict } from "@/i18n/dictionaries";
import Reveal from "@/components/Reveal";

/**
 * The page's dark "breath out" - a clean, flat navy band stating what sets the
 * company apart, in plain terms. The navy value matches the final CTA and the
 * footer exactly.
 */
export default function Stats({ locale }: { locale: Locale }) {
  const t = getDict(locale).stats;

  return (
    <section className="section-dark">
      <div className="container-x relative py-20 md:py-24">
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((item, i) => (
            <Reveal key={item.label} delay={i}>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-medium text-white md:text-[1.75rem]">
                  {item.label}
                </span>
                <span className="mt-3 text-sm leading-relaxed text-white/60">
                  {item.text}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
