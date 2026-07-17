import { useState } from "react";
import { Plus, X, GripVertical } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import type { ToolBodyProps } from "@/tools/bodies/types";

interface Step {
  id: string;
  text: string;
  done: boolean;
}

/** Break a stuck/avoided activity into 6–10 small, achievable steps and track them. */
export default function GradedTaskBody({ data, setData, accentHex }: ToolBodyProps) {
  const { t } = useLang();
  const goal = (data.goal as string | undefined) ?? "";
  const steps = (data.steps as Step[] | undefined) ?? [];
  const [draft, setDraft] = useState("");

  const setGoal = (v: string) => setData({ ...data, goal: v });
  const setSteps = (next: Step[]) => setData({ ...data, steps: next });

  const add = () => {
    const txt = draft.trim();
    if (!txt) return;
    setSteps([...steps, { id: "s" + Date.now().toString(36), text: txt, done: false }]);
    setDraft("");
  };

  const doneCount = steps.filter((s) => s.done).length;

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="gt-goal" className="mb-1.5 block font-medium text-ink-900">
          {t({ he: "הפעילות שאני רוצה להתחיל", en: "The activity I want to start" })}
        </label>
        <input
          id="gt-goal"
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder={t({ he: "משהו משמעותי, מאתגר, אך אפשרי…", en: "Something meaningful, hard, but doable…" })}
          className="w-full rounded-xl border border-sand-200 bg-sand-50 px-4 py-2.5 focus:border-brand-500 focus:bg-white"
        />
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="font-medium text-ink-900">
            {t({ he: "צעדים קטנים (6–10)", en: "Small steps (6–10)" })}
          </label>
          {steps.length > 0 && (
            <span className="text-sm text-ink-500">
              {doneCount}/{steps.length} {t({ he: "הושלמו", en: "done" })}
            </span>
          )}
        </div>

        {steps.length > 0 && (
          <div className="mb-3 h-2 overflow-hidden rounded-full bg-sand-100">
            <div className="h-full rounded-full transition-all"
              style={{ width: `${(doneCount / steps.length) * 100}%`, backgroundColor: accentHex }} />
          </div>
        )}

        <ul className="space-y-2">
          {steps.map((s) => (
            <li key={s.id} className="flex items-center gap-3 rounded-xl border border-sand-200 bg-white px-3 py-2">
              <GripVertical className="h-4 w-4 shrink-0 text-ink-300" aria-hidden />
              <input
                type="checkbox"
                checked={s.done}
                onChange={(e) => setSteps(steps.map((x) => (x.id === s.id ? { ...x, done: e.target.checked } : x)))}
                className="h-5 w-5 rounded text-brand-600 focus:ring-brand-500"
              />
              <span className={`min-w-0 flex-1 ${s.done ? "text-ink-500 line-through" : "text-ink-900"}`}>
                {s.text}
              </span>
              <button onClick={() => setSteps(steps.filter((x) => x.id !== s.id))}
                className="text-ink-300 hover:text-red-600" aria-label={t({ he: "הסרה", en: "Remove" })}>
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-2 flex gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder={t({ he: "צעד קטן נוסף…", en: "Another small step…" })}
            aria-label={t({ he: "צעד קטן נוסף", en: "Another small step" })}
            className="w-full rounded-xl border border-sand-200 bg-sand-50 px-4 py-2.5 focus:border-brand-500 focus:bg-white"
          />
          <button onClick={add} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white"
            style={{ backgroundColor: accentHex }} aria-label={t({ he: "הוספה", en: "Add" })}>
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
