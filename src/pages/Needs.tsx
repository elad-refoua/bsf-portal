import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { NEED_ORDER, NEEDS_META } from "@/lib/needs-meta";
import { needById, toolsForNeed } from "@/content";
import { Section, PageHeader } from "@/components/ui/primitives";
import AssetImage from "@/components/AssetImage";

export default function Needs() {
  const { t, lang } = useLang();
  const Arrow = lang === "he" ? ArrowLeft : ArrowRight;

  return (
    <Section>
      <PageHeader
        title={t({ he: "ששת הצרכים", en: "The Six Needs" })}
        lead={t({
          he: "מודל הצרכים מזהה שישה צרכים רגשיים אוניברסליים. בחרו צורך כדי ללמוד עליו ולתרגל את הכלים שלו.",
          en: "The needs model identifies six universal emotional needs. Choose one to learn about it and practice its tools.",
        })}
      />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {NEED_ORDER.map((id) => {
          const m = NEEDS_META[id];
          const need = needById[id];
          const Icon = m.icon;
          const nTools = toolsForNeed(id).length;
          return (
            <li key={id}>
              <Link
                to={`/needs/${id}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl2 border border-sand-200 bg-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg"
                style={{ borderTopColor: m.hex, borderTopWidth: 3 }}
              >
                <AssetImage
                  src={`images/need-${id}.png`}
                  alt=""
                  className="h-32 w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-6 pt-5">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${m.hex}1f`, color: m.hex }}>
                  <Icon className="h-7 w-7" aria-hidden />
                </span>
                <h2 className="mt-4 font-heading text-2xl font-bold text-ink-900">{t(need.name)}</h2>
                <p className="mt-1 flex-1 text-ink-700">{t(need.tagline)}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium" style={{ color: m.hex }}>
                  {nTools} {t({ he: "כלים", en: "tools" })}
                  <Arrow className="h-4 w-4 transition group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" aria-hidden />
                </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
