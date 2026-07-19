import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { locales, type Locale } from "@/config/site";
import { getDict } from "@/i18n/dictionaries";
import { isLocale } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDict(locale);
  return {
    title: d.meta.homeTitle,
    description: d.meta.homeDescription,
    alternates: {
      languages: {
        en: "/en",
        sl: "/si",
      },
    },
    openGraph: {
      title: d.meta.homeTitle,
      description: d.meta.homeDescription,
      images: [{ url: "/img/hero.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typed = locale as Locale;

  return (
    <SmoothScroll>
      <Nav locale={typed} />
      <main className="min-h-screen">{children}</main>
      <Footer locale={typed} />
    </SmoothScroll>
  );
}
