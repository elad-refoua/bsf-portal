import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { darken } from "@/lib/needs-meta";
import type { ToolBodyProps } from "@/tools/bodies/types";

interface Person {
  id: string;
  name: string;
  ring: 0 | 1 | 2; // 0 = closest (center)
}

const RINGS = [
  { r: 60, label: { he: "הכי קרובים", en: "Closest" } },
  { r: 110, label: { he: "קרובים", en: "Close" } },
  { r: 165, label: { he: "מעגל רחב יותר", en: "Wider circle" } },
] as const;

/** Interactive concentric "closeness circles": add people, place each in a ring. */
export default function ClosenessCirclesBody({ data, setData, accentHex }: ToolBodyProps) {
  const { t, lang } = useLang();
  const people = (data.people as Person[] | undefined) ?? [];
  const [name, setName] = useState("");
  const strong = darken(accentHex); // text-safe accent for white-text backgrounds

  const update = (next: Person[]) => setData({ ...data, people: next });

  const add = () => {
    const n = name.trim();
    if (!n) return;
    const id = "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
    update([...people, { id, name: n, ring: 1 }]);
    setName("");
  };
  const setRing = (id: string, ring: 0 | 1 | 2) =>
    update(people.map((p) => (p.id === id ? { ...p, ring } : p)));
  const removePerson = (id: string) => update(people.filter((p) => p.id !== id));

  // Position chips around each ring for the SVG view.
  const size = 380;
  const c = size / 2;
  const positioned = RINGS.map((ring, ri) => {
    const inRing = people.filter((p) => p.ring === ri);
    return inRing.map((p, i) => {
      const angle = (i / Math.max(inRing.length, 1)) * Math.PI * 2 - Math.PI / 2;
      return { p, x: c + Math.cos(angle) * ring.r, y: c + Math.sin(angle) * ring.r };
    });
  }).flat();

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Visual */}
      <div className="flex flex-col items-center">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-sm" role="img"
          aria-label={t({ he: "מעגלי קרבה", en: "Closeness circles" })}>
          {[...RINGS].reverse().map((ring, i) => (
            <circle key={i} cx={c} cy={c} r={ring.r} fill={`${accentHex}0d`} stroke={`${accentHex}66`} strokeWidth={1.5} />
          ))}
          <circle cx={c} cy={c} r={16} fill={strong} />
          <text x={c} y={c + 4} textAnchor="middle" className="fill-white" fontSize="11" fontWeight="700">
            {t({ he: "אני", en: "Me" })}
          </text>
          {positioned.map(({ p, x, y }) => (
            <g key={p.id}>
              <circle cx={x} cy={y} r={5} fill={accentHex} />
              <text x={x} y={y - 9} textAnchor="middle" fontSize="11" className="fill-ink-700"
                direction={lang === "he" ? "rtl" : "ltr"}>
                {p.name.length > 12 ? p.name.slice(0, 11) + "…" : p.name}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Controls */}
      <div>
        <div className="flex gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder={t({ he: "שם של אדם קרוב…", en: "Name of someone…" })}
            aria-label={t({ he: "שם של אדם קרוב", en: "Name of a close person" })}
            className="w-full rounded-xl border border-sand-200 bg-sand-50 px-4 py-2.5 focus:border-brand-500 focus:bg-white"
          />
          <button onClick={add} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white"
            style={{ backgroundColor: accentHex }} aria-label={t({ he: "הוספה", en: "Add" })}>
            <Plus className="h-5 w-5" />
          </button>
        </div>

        <ul className="mt-4 space-y-2">
          {people.length === 0 && (
            <li className="text-ink-500">
              {t({ he: "הוסיפו אנשים ומקמו כל אחד במעגל המתאים.", en: "Add people and place each in the right ring." })}
            </li>
          )}
          {people.map((p) => (
            <li key={p.id} className="flex items-center gap-2 rounded-xl border border-sand-200 bg-white px-3 py-2">
              <span className="min-w-0 flex-1 truncate font-medium text-ink-900">{p.name}</span>
              <div className="flex gap-1">
                {RINGS.map((ring, ri) => (
                  <button
                    key={ri}
                    onClick={() => setRing(p.id, ri as 0 | 1 | 2)}
                    className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
                      p.ring === ri ? "text-white" : "bg-sand-100 text-ink-700"
                    }`}
                    style={p.ring === ri ? { backgroundColor: strong } : undefined}
                  >
                    {t(ring.label)}
                  </button>
                ))}
              </div>
              <button onClick={() => removePerson(p.id)} className="text-ink-300 hover:text-red-600"
                aria-label={t({ he: "הסרה", en: "Remove" })}>
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
