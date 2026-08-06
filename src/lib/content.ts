import "server-only";
import { prisma } from "./db";
import { metrics as metricsConfig } from "@/config/metrics";

export type MetricItem = {
  value: number;
  suffix: string;
  label: { en: string; si: string };
};

export type MetricsData = {
  items: MetricItem[];
  showCaption: boolean;
  caption: { en: string; si: string };
};

/**
 * Homepage metrics — read from the database (editable in the admin), with a
 * fall back to the static config if the DB is unavailable, so the public site
 * NEVER errors on a database hiccup.
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
        label: { en: r.labelEn, si: r.labelSi },
      })),
      showCaption: (showCap?.valueEn ?? "true") === "true",
      caption: {
        en: cap?.valueEn ?? metricsConfig.caption.en,
        si: cap?.valueSi ?? metricsConfig.caption.si,
      },
    };
  } catch {
    return {
      items: metricsConfig.items.map((m) => ({
        value: m.value,
        suffix: m.suffix,
        label: m.label,
      })),
      showCaption: metricsConfig.showCaption,
      caption: metricsConfig.caption,
    };
  }
}

/** Read a set of editable settings as a { key: {en, si} } map (empty on error). */
export async function getSettingsMap(
  keys: string[],
): Promise<Record<string, { en: string | null; si: string | null }>> {
  try {
    const rows = await prisma.setting.findMany({ where: { key: { in: keys } } });
    return Object.fromEntries(
      rows.map((r) => [r.key, { en: r.valueEn, si: r.valueSi }]),
    );
  } catch {
    return {};
  }
}
