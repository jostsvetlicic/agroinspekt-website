import Link from "next/link";
import ServiceForm from "../ServiceForm";

export const dynamic = "force-dynamic";

export default function NewServicePage() {
  return (
    <div>
      <Link href="/admin/services" className="text-sm text-grey hover:text-ink">
        ← Services
      </Link>
      <h1 className="mt-2 font-display text-2xl font-semibold text-ink">
        New service
      </h1>
      <p className="mt-1 text-sm text-grey">
        Create the core fields now; add covers, methods and standards after.
      </p>

      <div className="mt-6">
        <ServiceForm
          mode="create"
          values={{
            slug: "",
            order: 0,
            published: true,
            icon: "general",
            titleEn: "",
            titleSi: "",
            taglineEn: "",
            taglineSi: "",
            introEn: "",
            introSi: "",
            coversEn: "",
            coversSi: "",
            commoditiesEn: "",
            commoditiesSi: "",
            methodsEn: "",
            methodsSi: "",
            standardsEn: "",
            standardsSi: "",
          }}
        />
      </div>
    </div>
  );
}
