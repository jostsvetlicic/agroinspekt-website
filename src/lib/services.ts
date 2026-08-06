import "server-only";
import { prisma } from "./db";
import { services as servicesConfig, type IconKey } from "@/config/services";
import { locales, type Locale } from "@/config/site";
import { tr, trArr } from "./i18n";

export type ServiceContent = {
  title: string;
  tagline: string;
  intro: string;
  covers: string[];
  commodities: string[];
  methods: string[];
  standards: string[];
};

/** A service resolved for every configured locale — components read `[locale]`. */
export type LocalizedService = { slug: string; icon: IconKey } & Record<
  Locale,
  ServiceContent
>;

type Row = {
  slug: string;
  icon: string;
  title: string;
  tagline: string;
  intro: string;
  covers: string;
  commodities: string;
  methods: string;
  standards: string;
};

function fromRow(row: Row): LocalizedService {
  const byLocale = Object.fromEntries(
    locales.map((l) => [
      l,
      {
        title: tr(row.title, l),
        tagline: tr(row.tagline, l),
        intro: tr(row.intro, l),
        covers: trArr(row.covers, l),
        commodities: trArr(row.commodities, l),
        methods: trArr(row.methods, l),
        standards: trArr(row.standards, l),
      } satisfies ServiceContent,
    ]),
  ) as Record<Locale, ServiceContent>;
  return { slug: row.slug, icon: (row.icon as IconKey) || "general", ...byLocale };
}

function fromConfig(): LocalizedService[] {
  return servicesConfig.map((s) => {
    const byLocale = Object.fromEntries(
      locales.map((l) => [l, s[l]]),
    ) as Record<Locale, ServiceContent>;
    return { slug: s.slug, icon: s.icon, ...byLocale };
  });
}

/** All published services, ordered. Falls back to static config on DB error. */
export async function getServices(): Promise<LocalizedService[]> {
  try {
    const rows = await prisma.service.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    if (rows.length === 0) throw new Error("no services in db");
    return rows.map(fromRow);
  } catch {
    return fromConfig();
  }
}

/** A single published service by slug, or null (→ 404). */
export async function getServiceBySlug(
  slug: string,
): Promise<LocalizedService | null> {
  try {
    const row = await prisma.service.findFirst({
      where: { slug, published: true },
    });
    if (row) return fromRow(row);
    // If the DB is reachable but has no such published row, treat as missing.
    if (await prisma.service.count()) return null;
  } catch {
    /* fall through to config */
  }
  return fromConfig().find((s) => s.slug === slug) ?? null;
}

/** Published slugs for generateStaticParams / sitemap. */
export async function getServiceSlugs(): Promise<string[]> {
  try {
    const rows = await prisma.service.findMany({
      where: { published: true },
      select: { slug: true },
      orderBy: { order: "asc" },
    });
    if (rows.length) return rows.map((r) => r.slug);
  } catch {
    /* fall through */
  }
  return servicesConfig.map((s) => s.slug);
}
