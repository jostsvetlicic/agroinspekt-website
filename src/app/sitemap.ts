import type { MetadataRoute } from "next";
import { locales } from "@/config/site";
import { getServiceSlugs } from "@/lib/services";
import { projects } from "@/config/projects";

const base = "https://agroinspekt.si";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const serviceSlugs = await getServiceSlugs();
  const paths = [
    "",
    "/about",
    "/services",
    "/projects",
    "/coverage",
    "/contact",
    "/privacy",
    ...serviceSlugs.map((slug) => `/services/${slug}`),
    ...projects.map((p) => `/projects/${p.slug}`),
  ];

  const now = new Date();

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${base}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path.includes("/") ? 0.6 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${base}/${l}${path}`]),
        ),
      },
    })),
  );
}
