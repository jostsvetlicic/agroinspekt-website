import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { locales, type Locale } from "@/config/site";
import ServiceForm from "../ServiceForm";

export const dynamic = "force-dynamic";

function parse(json: string): Record<string, unknown> {
  try {
    return JSON.parse(json || "{}");
  } catch {
    return {};
  }
}
const mapText = (json: string): Record<Locale, string> =>
  Object.fromEntries(
    locales.map((l) => [l, typeof parse(json)[l] === "string" ? (parse(json)[l] as string) : ""]),
  ) as Record<Locale, string>;
const mapList = (json: string): Record<Locale, string> =>
  Object.fromEntries(
    locales.map((l) => {
      const v = parse(json)[l];
      return [l, Array.isArray(v) ? (v as string[]).join("\n") : ""];
    }),
  ) as Record<Locale, string>;

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const s = await prisma.service.findUnique({ where: { id } });
  if (!s) notFound();

  return (
    <div>
      <Link href="/admin/services" className="text-sm text-grey hover:text-ink">
        ← Services
      </Link>
      <h1 className="mt-2 font-display text-2xl font-semibold text-ink">
        {mapText(s.title).en || s.slug}
      </h1>
      <p className="mt-1 text-sm text-grey">Edit every language, then save.</p>

      <div className="mt-6">
        <ServiceForm
          mode="edit"
          values={{
            id: s.id,
            slug: s.slug,
            order: s.order,
            published: s.published,
            icon: s.icon,
            title: mapText(s.title),
            tagline: mapText(s.tagline),
            intro: mapText(s.intro),
            covers: mapList(s.covers),
            commodities: mapList(s.commodities),
            methods: mapList(s.methods),
            standards: mapList(s.standards),
          }}
        />
      </div>
    </div>
  );
}
