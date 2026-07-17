import { useLang } from "@/i18n/LanguageContext";
import type { Bilingual } from "@/lib/types";
import type { ToolBodyProps } from "@/tools/bodies/types";

const DURATIONS: Bilingual[] = [
  { he: "רגעים ספורים", en: "A few moments" },
  { he: "כמה דקות", en: "A few minutes" },
  { he: "חצי שעה", en: "About half an hour" },
  { he: "שעה–שעתיים", en: "One to two hours" },
  { he: "פעילות ארוכה", en: "A longer activity" },
];

const STATUSES: Bilingual[] = [
  { he: "נהגתי לעשות, לא עכשיו", en: "Used to do, not now" },
  { he: "עדיין עושה", en: "Still do" },
  { he: "טרם ניסיתי", en: "Haven't tried yet" },
];

/** Menu of pleasant activities: duration (rows) × status (columns). */
export default function PleasurableActivitiesBody({ data, setData, accentHex }: ToolBodyProps) {
  const { t } = useLang();
  const grid = (data.grid as Record<string, string> | undefined) ?? {};
  const set = (r: number, c: number, v: string) =>
    setData({ ...data, grid: { ...grid, [`${r}_${c}`]: v } });

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-separate border-spacing-1">
        <thead>
          <tr>
            <th className="w-32" />
            {STATUSES.map((s, c) => (
              <th key={c} className="rounded-lg p-2 text-sm font-semibold text-ink-900"
                style={{ backgroundColor: `${accentHex}1a` }}>
                {t(s)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DURATIONS.map((d, r) => (
            <tr key={r}>
              <th className="p-2 text-start align-top text-sm font-medium text-ink-700">{t(d)}</th>
              {STATUSES.map((_, c) => (
                <td key={c}>
                  <textarea
                    rows={2}
                    value={grid[`${r}_${c}`] ?? ""}
                    onChange={(e) => set(r, c, e.target.value)}
                    className="w-full resize-y rounded-lg border border-sand-200 bg-sand-50 p-2 text-sm focus:border-brand-500 focus:bg-white"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
