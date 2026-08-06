import { prisma } from "@/lib/db";
import { updateContent } from "../actions";
import { Field, SaveBar, inputCls, labelCls } from "../ui";
import { locales } from "@/config/site";
import { tr } from "@/lib/i18n";

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
  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));
  const showCaption = tr(map["metrics.showCaption"], "en") !== "false";

  // Render one input per configured locale for a settings key.
  const settingInputs = (base: string, settingKey: string, textarea = false) => (
    <div className="grid gap-3 sm:grid-cols-2">
      {locales.map((l) => (
        <div key={l}>
          {textarea ? (
            <textarea
              name={`${base}.${l}`}
              rows={2}
              defaultValue={tr(map[settingKey], l)}
              className={`${inputCls} resize-y`}
              placeholder={l.toUpperCase()}
            />
          ) : (
            <input
              name={`${base}.${l}`}
              defaultValue={tr(map[settingKey], l)}
              className={inputCls}
              placeholder={l.toUpperCase()}
            />
          )}
          <span className="mt-1 block text-[11px] uppercase tracking-wide text-grey-light">
            {l}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Content</h1>
      <p className="mt-1 text-sm text-grey">
        Edit the homepage figures and key copy, in every language. Live on save.
      </p>

      {saved && (
        <p className="mt-4 rounded-md border border-green/40 bg-green-soft px-4 py-2 text-sm text-green-deep">
          Saved. The public site has been updated.
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
              <div key={m.id} className="rounded-xl border border-line bg-white p-4">
                <input type="hidden" name="metricId" value={m.id} />
                <div className="grid items-end gap-3 sm:grid-cols-[6rem_5rem]">
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
                </div>
                <div className="mt-3">
                  <p className={labelCls}>Label</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {locales.map((l) => (
                      <div key={l}>
                        <input
                          name={`label_${m.id}_${l}`}
                          defaultValue={tr(m.label, l)}
                          className={inputCls}
                          placeholder={l.toUpperCase()}
                        />
                        <span className="mt-1 block text-[11px] uppercase tracking-wide text-grey-light">
                          {l}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
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

          <div className="mt-4">
            <p className={labelCls}>Illustrative caption</p>
            {settingInputs("caption", "metrics.caption", true)}
          </div>
        </section>

        {/* Final CTA */}
        <section>
          <h2 className="font-display text-lg font-medium text-ink">
            Homepage closing call-to-action
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <p className={labelCls}>Title</p>
              {settingInputs("finalCtaTitle", "finalCta.title")}
            </div>
            <div>
              <p className={labelCls}>Text</p>
              {settingInputs("finalCtaText", "finalCta.text", true)}
            </div>
          </div>
        </section>

        <SaveBar label="Save content" />
      </form>
    </div>
  );
}
