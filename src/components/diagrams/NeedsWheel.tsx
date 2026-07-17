import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { NEED_ORDER, NEEDS_META } from "@/lib/needs-meta";

/** Signature diagram: the six needs arranged radially around emotions. Pure HTML/SVG, responsive. */
export default function NeedsWheel() {
  const { t } = useLang();
  const R = 38; // radius as % of the box half-extent
  const pts = NEED_ORDER.map((id, i) => {
    const angle = (-90 + i * 60) * (Math.PI / 180);
    return { id, x: 50 + R * Math.cos(angle), y: 50 + R * Math.sin(angle) };
  });

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md" role="img"
      aria-label={t({ he: "מודל ששת הצרכים", en: "The six-needs model" })}>
      {/* connecting spokes */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {pts.map((p) => (
          <line key={p.id} x1="50" y1="50" x2={p.x} y2={p.y} stroke="#e7dccb" strokeWidth="0.6" />
        ))}
      </svg>

      {/* center */}
      <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-brand-600 text-center text-white shadow-soft">
        <span className="font-heading text-sm font-bold leading-tight">
          {t({ he: "רגשות", en: "Emotions" })}
        </span>
        <span className="text-[10px] opacity-80">{t({ he: "מצביעים על", en: "point to" })}</span>
        <span className="font-heading text-sm font-bold">{t({ he: "צרכים", en: "needs" })}</span>
      </div>

      {/* need nodes */}
      {pts.map((p) => {
        const m = NEEDS_META[p.id];
        const Icon = m.icon;
        return (
          <Link
            key={p.id}
            to={`/needs/${p.id}`}
            className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <span
              className="flex h-14 w-14 items-center justify-center rounded-full shadow-soft transition group-hover:scale-110"
              style={{ backgroundColor: m.hex }}
            >
              <Icon className="h-7 w-7 text-white" aria-hidden />
            </span>
            <span className="whitespace-nowrap rounded-full bg-white/90 px-2 py-0.5 text-xs font-semibold text-ink-900 shadow-sm">
              {t(m.title)}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
