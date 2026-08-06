import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteService } from "../actions";
import ConfirmButton from "../ConfirmButton";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Services</h1>
          <p className="mt-1 text-sm text-grey">
            The inspection domains. Edits here are the foundation for the app.
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="rounded-md bg-green px-3.5 py-2 text-sm font-medium text-white transition-[transform,background-color] duration-150 ease-out hover:bg-green-deep active:scale-[0.98]"
        >
          Add service
        </Link>
      </div>

      <ul className="mt-6 divide-y divide-line overflow-hidden rounded-xl border border-line bg-white">
        {services.map((s) => (
          <li key={s.id} className="flex items-center gap-4 px-4 py-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-medium text-ink">
                  {s.titleEn}
                </p>
                {!s.published && (
                  <span className="rounded-full bg-offwhite px-2 py-0.5 text-[11px] font-medium text-grey">
                    Hidden
                  </span>
                )}
              </div>
              <p className="truncate text-xs text-grey">/{s.slug}</p>
            </div>
            <Link
              href={`/admin/services/${s.id}`}
              className="text-sm font-medium text-green-deep hover:underline"
            >
              Edit
            </Link>
            <form action={deleteService}>
              <input type="hidden" name="id" value={s.id} />
              <ConfirmButton
                confirm={`Delete "${s.titleEn}"? This cannot be undone.`}
                className="text-sm text-grey transition-colors hover:text-red-600"
              >
                Delete
              </ConfirmButton>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
