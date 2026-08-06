import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

function Stat({
  label,
  value,
  href,
  accent,
}: {
  label: string;
  value: number | string;
  href: string;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-line bg-white p-5 transition-shadow duration-150 hover:shadow-[0_1px_2px_rgba(16,24,40,0.04),0_14px_34px_-18px_rgba(16,24,40,0.20)]"
    >
      <p className="text-xs font-medium uppercase tracking-wide text-grey">
        {label}
      </p>
      <p
        className={`mt-2 font-display text-3xl font-semibold tabular-nums ${
          accent ? "text-green-deep" : "text-ink"
        }`}
      >
        {value}
      </p>
    </Link>
  );
}

export default async function Dashboard() {
  const [enquiryOpen, enquiryTotal, serviceCount, inspectionCount, recent] =
    await Promise.all([
      prisma.enquiry.count({ where: { handled: false } }),
      prisma.enquiry.count(),
      prisma.service.count(),
      prisma.inspection.count(),
      prisma.enquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-grey">
        Overview of enquiries, services and inspections.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat
          label="Open enquiries"
          value={enquiryOpen}
          href="/admin/enquiries"
          accent={enquiryOpen > 0}
        />
        <Stat label="Total enquiries" value={enquiryTotal} href="/admin/enquiries" />
        <Stat label="Services" value={serviceCount} href="/admin/services" />
        <Stat label="Inspections" value={inspectionCount} href="/admin/inspections" />
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-medium text-ink">
            Recent enquiries
          </h2>
          <Link
            href="/admin/enquiries"
            className="text-sm font-medium text-green-deep hover:underline"
          >
            View all
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="mt-4 rounded-lg border border-dashed border-line bg-white px-4 py-8 text-center text-sm text-grey">
            No enquiries yet. Submissions from the contact form appear here.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line bg-white">
            {recent.map((e) => (
              <li
                key={e.id}
                className="flex items-center justify-between gap-4 px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">
                    {e.name}
                    {e.company ? (
                      <span className="text-grey"> · {e.company}</span>
                    ) : null}
                  </p>
                  <p className="truncate text-xs text-grey">
                    {e.commodity ?? "—"} · {e.email}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  {!e.handled && (
                    <span className="rounded-full bg-green/10 px-2 py-0.5 text-[11px] font-medium text-green-deep">
                      New
                    </span>
                  )}
                  <time className="text-xs tabular-nums text-grey-light">
                    {e.createdAt.toLocaleDateString("en-GB")}
                  </time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
