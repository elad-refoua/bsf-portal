import { useLang } from "@/i18n/LanguageContext";
import type { ToolField } from "@/lib/types";

/** Generic form for field-driven tools (Triangle, WOOP, monitors, journal, decisional balance). */
export default function FieldForm({
  fields,
  data,
  setField,
  columns = 1,
}: {
  fields: ToolField[];
  data: Record<string, unknown>;
  setField: (id: string, value: unknown) => void;
  columns?: 1 | 2;
}) {
  const { t } = useLang();

  return (
    <div className={columns === 2 ? "grid gap-5 sm:grid-cols-2" : "space-y-5"}>
      {fields.map((f) => {
        const value = (data[f.id] ?? "") as string | boolean;
        const labelId = `f-${f.id}`;
        return (
          <div key={f.id} className={f.kind === "textarea" && columns === 2 ? "sm:col-span-2" : ""}>
            {f.kind !== "checkbox" && (
              <label htmlFor={labelId} className="mb-1.5 block font-medium text-ink-900">
                {t(f.label)}
              </label>
            )}
            {f.helper && f.kind !== "checkbox" && (
              <p className="mb-1.5 text-sm text-ink-500">{t(f.helper)}</p>
            )}

            {f.kind === "text" && (
              <input
                id={labelId}
                type="text"
                value={value as string}
                placeholder={f.placeholder ? t(f.placeholder) : undefined}
                onChange={(e) => setField(f.id, e.target.value)}
                className="w-full rounded-xl border border-sand-200 bg-sand-50 px-4 py-2.5 text-ink-900 focus:border-brand-500 focus:bg-white"
              />
            )}

            {f.kind === "textarea" && (
              <textarea
                id={labelId}
                rows={3}
                value={value as string}
                placeholder={f.placeholder ? t(f.placeholder) : undefined}
                onChange={(e) => setField(f.id, e.target.value)}
                className="w-full resize-y rounded-xl border border-sand-200 bg-sand-50 px-4 py-2.5 text-ink-900 focus:border-brand-500 focus:bg-white"
              />
            )}

            {f.kind === "select" && (
              <select
                id={labelId}
                value={value as string}
                onChange={(e) => setField(f.id, e.target.value)}
                className="w-full rounded-xl border border-sand-200 bg-sand-50 px-4 py-2.5 text-ink-900 focus:border-brand-500 focus:bg-white"
              >
                <option value="">—</option>
                {f.options?.map((o, i) => (
                  <option key={i} value={o.en}>
                    {t(o)}
                  </option>
                ))}
              </select>
            )}

            {f.kind === "checkbox" && (
              <label htmlFor={labelId} className="flex items-center gap-3">
                <input
                  id={labelId}
                  type="checkbox"
                  checked={Boolean(value)}
                  onChange={(e) => setField(f.id, e.target.checked)}
                  className="h-5 w-5 rounded border-sand-200 text-brand-600 focus:ring-brand-500"
                />
                <span className="font-medium text-ink-900">{t(f.label)}</span>
              </label>
            )}
          </div>
        );
      })}
    </div>
  );
}
