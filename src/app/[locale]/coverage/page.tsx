import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/config/site";
import { getDict } from "@/i18n/dictionaries";
import { isLocale } from "@/lib/i18n";
import PageHero from "@/components/PageHero";
import Coverage from "@/components/sections/Coverage";
import CtaBand from "@/components/CtaBand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale).coverage;
  const description =
    locale === "si"
      ? "Nadzor tovora v Luki Koper in po Sloveniji. Dve pisarni — Ljubljana in Koper — z nadzorniki na privezu."
      : "Cargo inspection at the Port of Koper and across Slovenia. Two offices — Ljubljana and Koper — with inspectors on the quay.";
  return {
    title: `${t.title} · Port of Koper`,
    description,
    alternates: { canonical: `/${locale}/coverage` },
  };
}

export default async function CoveragePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const t = getDict(l).coverage;
  const nav = getDict(l).nav;

  return (
    <>
      <PageHero
        locale={l}
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
        crumbs={[{ label: nav.coverage }]}
      />
      <Coverage locale={l} showHeading={false} />
      <CtaBand locale={l} />
    </>
  );
}
