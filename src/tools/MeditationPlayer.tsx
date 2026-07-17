import { useState } from "react";
import { Play, Pause } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import type { BilingualBlocks } from "@/lib/types";

/** Pure stage-direction lines (e.g. "[after one minute – bell]") aren't shown to the patient. */
const CUE = /^\s*[[(].*[\])]\s*$/;

/**
 * The Mountain meditation: a calming breathing pacer + the full guided script, and an
 * optional audio recording. Purely local; nothing tracked.
 */
export default function MeditationPlayer({
  script,
  audioSrc,
  accentHex = "#2f7f77",
}: {
  script?: BilingualBlocks;
  audioSrc?: string;
  accentHex?: string;
}) {
  const { t, lang } = useLang();
  const [breathing, setBreathing] = useState(false);
  const [audioOk, setAudioOk] = useState(true);
  const scriptParas = (script?.[lang] ?? []).filter((p) => !CUE.test(p));

  return (
    <div className="space-y-8">
      {/* Breathing pacer */}
      <div className="flex flex-col items-center rounded-xl2 bg-gradient-to-b from-brand-50 to-sand-50 p-8">
        <div className="relative flex h-56 w-56 items-center justify-center">
          <div
            className={`absolute inset-0 rounded-full ${breathing ? "animate-[breathe_10s_ease-in-out_infinite]" : ""}`}
            style={{ backgroundColor: `${accentHex}22`, border: `2px solid ${accentHex}66` }}
          />
          <div
            className={`absolute h-32 w-32 rounded-full ${breathing ? "animate-[breathe_10s_ease-in-out_infinite]" : ""}`}
            style={{ backgroundColor: `${accentHex}33` }}
          />
          <span className="relative font-heading text-lg font-medium text-ink-700">
            {breathing
              ? t({ he: "לנשום עם המעגל", en: "Breathe with the circle" })
              : t({ he: "רגע של רוגע", en: "A moment of calm" })}
          </span>
        </div>
        <button
          onClick={() => setBreathing((b) => !b)}
          className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-full px-6 py-2.5 font-medium text-white"
          style={{ backgroundColor: accentHex }}
        >
          {breathing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          {breathing ? t({ he: "עצירה", en: "Pause" }) : t({ he: "התחלת נשימה", en: "Start breathing" })}
        </button>
      </div>

      {/* Audio (hidden if the recording for this language isn't available) */}
      {audioSrc && audioOk && (
        <div>
          <h3 className="mb-2 font-heading text-lg font-bold text-ink-900">
            {t({ he: "האזנה למדיטציית ההר", en: "Listen to the Mountain meditation" })}
          </h3>
          <audio
            controls
            preload="none"
            className="w-full"
            src={audioSrc}
            onError={() => setAudioOk(false)}
          >
            {t({ he: "הדפדפן אינו תומך בהשמעת אודיו.", en: "Your browser does not support audio playback." })}
          </audio>
        </div>
      )}

      {/* Script */}
      {scriptParas.length > 0 && (
        <div>
          <h3 className="mb-3 font-heading text-lg font-bold text-ink-900">
            {t({ he: "הטקסט המלא", en: "The full script" })}
          </h3>
          <div className="max-h-[28rem] space-y-4 overflow-y-auto rounded-xl2 border border-sand-200 bg-white p-6 text-lg leading-relaxed text-ink-700">
            {scriptParas.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
