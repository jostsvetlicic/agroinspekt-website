import { prisma } from "@/lib/db";
import { setEnquiryHandled, deleteEnquiry } from "../actions";
import ConfirmButton from "../ConfirmButton";

export const dynamic = "force-dynamic";

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <p className="text-sm text-grey">
      <span className="text-grey-light">{label}: </span>
      <span className="text-ink">{value}</span>
    </p>
  );
}

export default async function EnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: [{ handled: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Enquiries</h1>
      <p className="mt-1 text-sm text-grey">
        Submissions from the website contact form. Newest and unhandled first.
      </p>

      {enquiries.length === 0 ? (
        <p className="mt-6 rounded-lg border border-dashed border-line bg-white px-4 py-10 text-center text-sm text-grey">
          No enquiries yet.
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {enquiries.map((e) => (
            <li
              key={e.id}
              className={`rounded-xl border bg-white p-5 ${
                e.handled ? "border-line" : "border-green/40"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-lg font-medium text-ink">
                      {e.name}
                    </h2>
                    {!e.handled && (
                      <span className="rounded-full bg-green/10 px-2 py-0.5 text-[11px] font-medium text-green-deep">
                        New
                      </span>
                    )}
                    <span className="rounded-full bg-offwhite px-2 py-0.5 text-[11px] font-medium uppercase text-grey">
                      {e.locale}
                    </span>
                  </div>
                  {e.company && (
                    <p className="mt-0.5 text-sm text-grey">{e.company}</p>
                  )}
                </div>
                <time className="text-xs tabular-nums text-grey-light">
                  {e.createdAt.toLocaleString("en-GB")}
                </time>
              </div>

              <div className="mt-4 grid gap-x-8 gap-y-1 sm:grid-cols-2">
                <Field label="Email" value={e.email} />
                <Field label="Phone" value={e.phone} />
                <Field label="Commodity" value={e.commodity} />
                <Field label="Service" value={e.serviceType} />
                <Field label="Location" value={e.location} />
                <Field
                  label="Dates"
                  value={
                    e.dateFrom || e.dateTo
                      ? `${e.dateFrom ?? "?"} to ${e.dateTo ?? "?"}`
                      : null
                  }
                />
              </div>

              {e.message && (
                <p className="mt-3 whitespace-pre-wrap rounded-lg bg-offwhite p-3 text-sm text-ink">
                  {e.message}
                </p>
              )}

              <div className="mt-4 flex items-center gap-3">
                <form action={setEnquiryHandled}>
                  <input type="hidden" name="id" value={e.id} />
                  <input
                    type="hidden"
                    name="handled"
                    value={e.handled ? "false" : "true"}
                  />
                  <button
                    type="submit"
                    className="rounded-md bg-green px-3 py-1.5 text-sm font-medium text-white transition-[transform,background-color] duration-150 ease-out hover:bg-green-deep active:scale-[0.98]"
                  >
                    {e.handled ? "Reopen" : "Mark handled"}
                  </button>
                </form>
                <a
                  href={`mailto:${e.email}`}
                  className="text-sm font-medium text-green-deep hover:underline"
                >
                  Reply
                </a>
                <form action={deleteEnquiry} className="ml-auto">
                  <input type="hidden" name="id" value={e.id} />
                  <ConfirmButton
                    confirm="Delete this enquiry permanently?"
                    className="text-sm text-grey transition-colors hover:text-red-600"
                  >
                    Delete
                  </ConfirmButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
