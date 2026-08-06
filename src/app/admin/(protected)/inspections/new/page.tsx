import Link from "next/link";
import { prisma } from "@/lib/db";
import InspectionForm from "../InspectionForm";

export const dynamic = "force-dynamic";

export default async function NewInspectionPage() {
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
    select: { slug: true, titleEn: true },
  });

  return (
    <div>
      <Link href="/admin/inspections" className="text-sm text-grey hover:text-ink">
        ← Inspections
      </Link>
      <h1 className="mt-2 font-display text-2xl font-semibold text-ink">
        New inspection
      </h1>

      <div className="mt-6">
        <InspectionForm
          mode="create"
          services={services}
          values={{
            reference: "",
            commodity: "",
            serviceSlug: "",
            client: "",
            location: "",
            status: "scheduled",
            scheduledFor: "",
            notes: "",
          }}
        />
      </div>
    </div>
  );
}
