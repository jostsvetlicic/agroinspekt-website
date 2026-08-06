import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { defaultLocale } from "@/config/site";
import { tr } from "@/lib/i18n";
import InspectionForm from "../InspectionForm";

export const dynamic = "force-dynamic";

export default async function EditInspectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [i, serviceRows] = await Promise.all([
    prisma.inspection.findUnique({ where: { id } }),
    prisma.service.findMany({
      orderBy: { order: "asc" },
      select: { slug: true, title: true },
    }),
  ]);
  if (!i) notFound();
  const services = serviceRows.map((s) => ({
    slug: s.slug,
    title: tr(s.title, defaultLocale) || s.slug,
  }));

  return (
    <div>
      <Link href="/admin/inspections" className="text-sm text-grey hover:text-ink">
        ← Inspections
      </Link>
      <h1 className="mt-2 font-display text-2xl font-semibold text-ink">
        {i.commodity}
      </h1>

      <div className="mt-6">
        <InspectionForm
          mode="edit"
          services={services}
          values={{
            id: i.id,
            reference: i.reference ?? "",
            commodity: i.commodity,
            serviceSlug: i.serviceSlug ?? "",
            client: i.client ?? "",
            location: i.location ?? "",
            status: i.status,
            scheduledFor: i.scheduledFor
              ? i.scheduledFor.toISOString().slice(0, 10)
              : "",
            notes: i.notes ?? "",
          }}
        />
      </div>
    </div>
  );
}
