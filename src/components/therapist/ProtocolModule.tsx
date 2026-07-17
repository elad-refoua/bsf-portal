import { ChevronDown } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { UI } from "@/lib/ui-strings";
import { NEEDS_META, darken } from "@/lib/needs-meta";
import type { Bilingual, BilingualBlocks, NeedContent, NeedId, ProtocolSegment } from "@/lib/types";
import { Prose } from "@/components/ui/primitives";

/** A minutes chip, using the shared "min" unit string and the module accent. */
function MinutesBadge({ minutes, hex }: { minutes: number; hex: string }) {
  const { t } = useLang();
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium"
      style={{ backgroundColor: `${hex}1a`, color: darken(hex), borderColor: `${hex}40` }}
    >
      {minutes} {t(UI.misc.minutes)}
    </span>
  );
}

/** One labeled phase (e.g. "Highlight the need"), rendered from a BilingualBlocks value. */
function Phase({
  label,
  blocks,
  hex,
}: {
  label: Bilingual;
  blocks: BilingualBlocks;
  hex: string;
}) {
  const { t, lang } = useLang();
  const paras = blocks[lang];
  if (!paras?.length) return null;
  return (
    <section className="mt-8 first:mt-0">
      <h3 className="mb-3 font-heading text-xl font-bold text-ink-900">
        <span
          className="me-3 inline-block h-5 w-1.5 rounded-full align-middle"
          style={{ backgroundColor: hex }}
          aria-hidden
        />
        {t(label)}
      </h3>
      <Prose paragraphs={paras} />
    </section>
  );
}

/** The ordered mainPhase segments (each with an optional minutes badge). */
function MainPhase({ segments, hex }: { segments: ProtocolSegment[]; hex: string }) {
  const { t, lang } = useLang();
  return (
    <section className="mt-8">
      <h3 className="mb-3 font-heading text-xl font-bold text-ink-900">
        <span
          className="me-3 inline-block h-5 w-1.5 rounded-full align-middle"
          style={{ backgroundColor: hex }}
          aria-hidden
        />
        {t({ he: "חלק מרכזי", en: "Main phase" })}
      </h3>
      <div className="space-y-6">
        {segments.map((seg, i) => {
          const paras = seg.body[lang];
          if (!paras?.length) return null;
          return (
            <div
              key={i}
              className="rounded-xl border border-sand-200 bg-sand-50 p-5"
              style={{ borderInlineStartWidth: 3, borderInlineStartColor: hex }}
            >
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <h4 className="font-heading text-lg font-semibold text-ink-900">{t(seg.label)}</h4>
                {typeof seg.minutes === "number" && <MinutesBadge minutes={seg.minutes} hex={hex} />}
              </div>
              <Prose paragraphs={paras} className="text-base" />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function ProtocolModule({ need }: { need: NeedContent }) {
  const { t, lang } = useLang();
  const meta = NEEDS_META[need.id as NeedId];
  const Icon = meta.icon;
  const hex = meta.hex;

  const extra = need.therapist.extraTime[lang];
  const hasExtra = Array.isArray(extra) && extra.length > 0;

  return (
    <details
      id={`module-${need.id}`}
      className="group scroll-mt-24 overflow-hidden rounded-xl2 border border-sand-200 bg-white shadow-soft"
    >
      <summary
        className="flex cursor-pointer list-none items-center gap-4 p-6 focus-visible:outline-none"
        style={{ backgroundColor: `${hex}0d` }}
      >
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${hex}26`, color: hex }}
        >
          <Icon className="h-6 w-6" aria-hidden />
        </span>
        <span className="flex-1">
          <span className="flex items-center gap-2">
            <span className="text-sm font-semibold text-ink-500">
              {t({ he: "מודול", en: "Module" })} {meta.order}
            </span>
          </span>
          <span className="block font-heading text-2xl font-bold text-ink-900">{t(need.name)}</span>
          <span className="block text-ink-700">{t(need.tagline)}</span>
        </span>
        <ChevronDown
          className="h-6 w-6 shrink-0 text-ink-500 transition-transform duration-200 group-open:rotate-180"
          aria-hidden
        />
      </summary>

      <div className="border-t border-sand-200 p-6 sm:p-8">
        <Phase
          label={{ he: "הדגשת הצורך", en: "Highlight the need" }}
          blocks={need.therapist.highlightNeed}
          hex={hex}
        />
        <Phase
          label={{ he: "רקע דידקטי", en: "Didactic background" }}
          blocks={need.therapist.didactic}
          hex={hex}
        />
        <Phase
          label={{ he: "הגדרת מטרות", en: "Goal setting" }}
          blocks={need.therapist.goalSetting}
          hex={hex}
        />

        <MainPhase segments={need.therapist.mainPhase} hex={hex} />

        <Phase
          label={{ he: "מטלת בית", en: "Home practice" }}
          blocks={need.therapist.homePractice}
          hex={hex}
        />

        {hasExtra && (
          <Phase
            label={{ he: "אם נשאר זמן", en: "If there's extra time" }}
            blocks={need.therapist.extraTime}
            hex={hex}
          />
        )}

        <Phase
          label={{ he: "פגישת מעקב (כעבור שבועיים)", en: "Two-week check-in" }}
          blocks={need.checkIn}
          hex={hex}
        />
      </div>
    </details>
  );
}
