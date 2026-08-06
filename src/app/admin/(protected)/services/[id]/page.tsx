import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ServiceForm from "../ServiceForm";

export const dynamic = "force-dynamic";

const toText = (json: string) => {
  try {
    const a = JSON.parse(json);
    return Array.isArray(a) ? a.join("\n") : "";
  } catch {
    return "";
  }
};

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
        {s.titleEn}
      </h1>
      <p className="mt-1 text-sm text-grey">Edit both languages, then save.</p>

      <div className="mt-6">
        <ServiceForm
          mode="edit"
          values={{
            id: s.id,
            slug: s.slug,
            order: s.order,
            published: s.published,
            icon: s.icon,
            titleEn: s.titleEn,
            titleSi: s.titleSi,
            taglineEn: s.taglineEn,
            taglineSi: s.taglineSi,
            introEn: s.introEn,
            introSi: s.introSi,
            coversEn: toText(s.coversEn),
            coversSi: toText(s.coversSi),
            commoditiesEn: toText(s.commoditiesEn),
            commoditiesSi: toText(s.commoditiesSi),
            methodsEn: toText(s.methodsEn),
            methodsSi: toText(s.methodsSi),
            standardsEn: toText(s.standardsEn),
            standardsSi: toText(s.standardsSi),
          }}
        />
      </div>
    </div>
  );
}
