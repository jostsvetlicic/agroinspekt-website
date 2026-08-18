import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteInspection } from "../actions";
import ConfirmButton from "../ConfirmButton";

export const dynamic = "force-dynamic";

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    completed: "bg-green/10 text-green-deep",
    in_progress: "bg-ink/[0.06] text-ink",
    scheduled: "bg-offwhite text-grey",
  };
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
        map[status] ?? map.scheduled
      }`}
    >
      {status.replace("_", " ")}
    </span>
  );
}

export default async function InspectionsPage() {
  const inspections = await prisma.inspection.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">
            Inspections
          </h1>
          <p className="mt-1 text-sm text-grey">
            Operational records, the foundation for the 2027 mobile app.
          </p>
        </div>
        <Link
          href="/admin/inspections/new"
          className="rounded-md bg-green px-3.5 py-2 text-sm font-medium text-white transition-[transform,background-color] duration-150 ease-out hover:bg-green-deep active:scale-[0.98]"
        >
          Add inspection
        </Link>
      </div>

      {inspections.length === 0 ? (
        <p className="mt-6 rounded-lg border border-dashed border-line bg-white px-4 py-10 text-center text-sm text-grey">
          No inspections yet.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-line overflow-hidden rounded-xl border border-line bg-white">
          {inspections.map((i) => (
            <li key={i.id} className="flex items-center gap-4 px-4 py-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-ink">
                    {i.commodity}
                  </p>
                  <StatusBadge status={i.status} />
                </div>
                <p className="truncate text-xs text-grey">
                  {i.reference ? `${i.reference} · ` : ""}
                  {i.client ?? "No client"}
                  {i.location ? ` · ${i.location}` : ""}
                </p>
              </div>
              <Link
                href={`/admin/inspections/${i.id}`}
                className="text-sm font-medium text-green-deep hover:underline"
              >
                Edit
              </Link>
              <form action={deleteInspection}>
                <input type="hidden" name="id" value={i.id} />
                <ConfirmButton
                  confirm="Delete this inspection record?"
                  className="text-sm text-grey transition-colors hover:text-red-600"
                >
                  Delete
                </ConfirmButton>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
