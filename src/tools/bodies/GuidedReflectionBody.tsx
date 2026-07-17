import { Info } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import type { Bilingual } from "@/lib/types";
import type { ToolBodyProps } from "@/tools/bodies/types";

/**
 * A gentle, self-guided version of the self-compassion / two-chair work. The FULL two-chair
 * dialogue is therapist-led; this offers softening prompts a person can do on their own.
 */
const PROMPTS: Array<{ id: string; label: Bilingual; placeholder: Bilingual }> = [
  {
    id: "situation",
    label: { he: "רגע שבו הייתי ביקורתי כלפי עצמי", en: "A moment I was hard on myself" },
    placeholder: { he: "מה קרה?", en: "What happened?" },
  },
  {
    id: "critic",
    label: { he: "מה הקול הביקורתי אמר?", en: "What did the critical voice say?" },
    placeholder: { he: "במילים שלו…", en: "In its own words…" },
  },
  {
    id: "feeling",
    label: { he: "איך זה הרגיש בגוף וברגש?", en: "How did it feel — in body and emotion?" },
    placeholder: { he: "…", en: "…" },
  },
  {
    id: "friend",
    label: { he: "מה הייתי אומר/ת לחבר/ה קרוב/ה במצב הזה?", en: "What would I say to a dear friend in this situation?" },
    placeholder: { he: "בנימה חמה ותומכת…", en: "In a warm, supportive tone…" },
  },
  {
    id: "kind",
    label: { he: "קול חומל יותר כלפי עצמי היה אומר…", en: "A kinder voice toward myself would say…" },
    placeholder: { he: "…", en: "…" },
  },
  {
    id: "soothe",
    label: { he: "מעשה קטן וטוב שאוכל לעשות לעצמי", en: "One small, kind act I can do for myself" },
    placeholder: { he: "נשימה עמוקה, יד על הלב…", en: "A deep breath, a hand on the heart…" },
  },
];

export default function GuidedReflectionBody({ data, setField, accentHex }: ToolBodyProps) {
  const { t } = useLang();
  return (
    <div className="space-y-5">
      <p className="flex items-start gap-2 rounded-xl bg-sand-50 p-3 text-sm text-ink-700">
        <Info className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accentHex }} aria-hidden />
        {t({
          he: "זהו תרגול עדין לבד. את/ה מוזמן/ת לנוע לאט, בקצב שלך.",
          en: "This is a gentle exercise to do on your own. Move slowly, at your own pace.",
        })}
      </p>
      {PROMPTS.map((p, i) => (
        <div key={p.id}>
          <label htmlFor={`gr-${p.id}`} className="mb-1.5 flex items-center gap-2 font-medium text-ink-900">
            <span className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: accentHex }}>{i + 1}</span>
            {t(p.label)}
          </label>
          <textarea
            id={`gr-${p.id}`}
            rows={2}
            value={(data[p.id] as string) ?? ""}
            placeholder={t(p.placeholder)}
            onChange={(e) => setField(p.id, e.target.value)}
            className="w-full resize-y rounded-xl border border-sand-200 bg-sand-50 px-4 py-2.5 focus:border-brand-500 focus:bg-white"
          />
        </div>
      ))}
    </div>
  );
}
