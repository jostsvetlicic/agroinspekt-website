import "server-only";
import { prisma } from "./db";
import { metrics as metricsConfig } from "@/config/metrics";
import { type Locale } from "@/config/site";
import { tr, buildLocaleMap } from "./i18n";

export type MetricItem = {
  value: number;
  suffix: string;
  label: Record<Locale, string>;
};

export type MetricsData = {
  items: MetricItem[];
  showCaption: boolean;
  caption: Record<Locale, string>;
};

const cfg = (m: { en: string; si: string }, l: Locale) =>
  (m as Record<string, string>)[l] ?? m.en ?? "";

/**
 * Homepage metrics — from the database (editable in the admin), falling back to
 * static config if the DB is unavailable so the public site NEVER errors.
 */
export async function getMetrics(): Promise<MetricsData> {
  try {
    const [rows, showCap, cap] = await Promise.all([
      prisma.metric.findMany({ orderBy: { order: "asc" } }),
      prisma.setting.findUnique({ where: { key: "metrics.showCaption" } }),
      prisma.setting.findUnique({ where: { key: "metrics.caption" } }),
    ]);
    if (rows.length === 0) throw new Error("no metrics in db");
    return {
      items: rows.map((r) => ({
        value: r.value,
        suffix: r.suffix,
        label: buildLocaleMap((l) => tr(r.label, l)),
      })),
      showCaption: tr(showCap?.value, "en") !== "false",
      caption: buildLocaleMap((l) => tr(cap?.value, l) || cfg(metricsConfig.caption, l)),
    };
  } catch {
    return {
      items: metricsConfig.items.map((m) => ({
        value: m.value,
        suffix: m.suffix,
        label: buildLocaleMap((l) => cfg(m.label, l)),
      })),
      showCaption: metricsConfig.showCaption,
      caption: buildLocaleMap((l) => cfg(metricsConfig.caption, l)),
    };
  }
}

/** Read editable settings as { key: {en, si, …} } (empty on DB error). */
export async function getSettingsMap(
  keys: string[],
): Promise<Record<string, Record<Locale, string>>> {
  try {
    const rows = await prisma.setting.findMany({ where: { key: { in: keys } } });
    return Object.fromEntries(
      rows.map((r) => [r.key, buildLocaleMap((l) => tr(r.value, l))]),
    );
  } catch {
    return {};
  }
}
