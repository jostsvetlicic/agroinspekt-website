import { prisma } from "@/lib/db";
import { updateContent } from "../actions";
import { Field, SaveBar, inputCls, labelCls } from "../ui";

export const dynamic = "force-dynamic";

export default async function ContentPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const [metrics, settings] = await Promise.all([
    prisma.metric.findMany({ orderBy: { order: "asc" } }),
    prisma.setting.findMany(),
  ]);
  const map = Object.fromEntries(settings.map((s) => [s.key, s]));
  const showCaption = (map["metrics.showCaption"]?.valueEn ?? "true") === "true";

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Content</h1>
      <p className="mt-1 text-sm text-grey">
        Edit the homepage figures and key copy. Changes go live on save.
      </p>

      {saved && (
        <p className="mt-4 rounded-md border border-green/40 bg-green-soft px-4 py-2 text-sm text-green-deep">
          Saved. The homepage has been updated.
        </p>
      )}

      <form action={updateContent} className="mt-6 space-y-10">
        {/* Metrics */}
        <section>
          <h2 className="font-display text-lg font-medium text-ink">
            Homepage figures
          </h2>
          <p className="mt-1 text-sm text-grey">
            The four counting figures on the navy band.
          </p>

          <div className="mt-4 space-y-4">
            {metrics.map((m) => (
              <div
                key={m.id}
                className="grid items-end gap-3 rounded-xl border border-line bg-white p-4 sm:grid-cols-[6rem_5rem_1fr_1fr]"
              >
                <input type="hidden" name="metricId" value={m.id} />
                <Field label="Value">
                  <input
                    name={`value_${m.id}`}
                    type="number"
                    min={0}
                    defaultValue={m.value}
                    className={inputCls}
                  />
                </Field>
                <Field label="Suffix">
                  <input
                    name={`suffix_${m.id}`}
                    defaultValue={m.suffix}
                    className={inputCls}
                  />
                </Field>
                <Field label="Label (EN)">
                  <input
                    name={`labelEn_${m.id}`}
                    defaultValue={m.labelEn}
                    className={inputCls}
                  />
                </Field>
                <Field label="Label (SI)">
                  <input
                    name={`labelSi_${m.id}`}
                    defaultValue={m.labelSi}
                    className={inputCls}
                  />
                </Field>
              </div>
            ))}
          </div>

          <label className="mt-4 flex items-center gap-2 text-sm text-ink">
            <input
              type="checkbox"
              name="showCaption"
              defaultChecked={showCaption}
              className="h-4 w-4 rounded border-line text-green focus:ring-green/30"
            />
            Show the &ldquo;figures are illustrative&rdquo; caption
          </label>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Field label="Caption (EN)">
              <textarea
                name="captionEn"
                rows={2}
                defaultValue={map["metrics.caption"]?.valueEn ?? ""}
                className={`${inputCls} resize-y`}
              />
            </Field>
            <Field label="Caption (SI)">
              <textarea
                name="captionSi"
                rows={2}
                defaultValue={map["metrics.caption"]?.valueSi ?? ""}
                className={`${inputCls} resize-y`}
              />
            </Field>
          </div>
        </section>

        {/* Final CTA */}
        <section>
          <h2 className="font-display text-lg font-medium text-ink">
            Homepage closing call-to-action
          </h2>
          <div className="mt-4 space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Title (EN)">
                <input
                  name="finalCtaTitleEn"
                  defaultValue={map["finalCta.title"]?.valueEn ?? ""}
                  className={inputCls}
                />
              </Field>
              <Field label="Title (SI)">
                <input
                  name="finalCtaTitleSi"
                  defaultValue={map["finalCta.title"]?.valueSi ?? ""}
                  className={inputCls}
                />
              </Field>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Text (EN)">
                <textarea
                  name="finalCtaTextEn"
                  rows={3}
                  defaultValue={map["finalCta.text"]?.valueEn ?? ""}
                  className={`${inputCls} resize-y`}
                />
              </Field>
              <Field label="Text (SI)">
                <textarea
                  name="finalCtaTextSi"
                  rows={3}
                  defaultValue={map["finalCta.text"]?.valueSi ?? ""}
                  className={`${inputCls} resize-y`}
                />
              </Field>
            </div>
          </div>
        </section>

        <SaveBar label="Save content" />
      </form>
    </div>
  );
}
