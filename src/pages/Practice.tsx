import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, FileDown } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { UI } from "@/lib/ui-strings";
import { NEED_ORDER, NEEDS_META } from "@/lib/needs-meta";
import { needById, toolsForNeed } from "@/content";
import { Section, PageHeader } from "@/components/ui/primitives";

export default function Practice() {
  const { t, lang } = useLang();
  const Arrow = lang === "he" ? ArrowLeft : ArrowRight;

  return (
    <Section>
      <PageHeader
        title={t(UI.nav.practice)}
        lead={t({
          he: "כלים אינטראקטיביים לתרגול, מסודרים לפי צורך. כל מה שתמלאו נשמר רק אצלכם במכשיר.",
          en: "Interactive tools to practice, organized by need. Everything you fill in is saved only on your device.",
        })}
      />

      <div className="space-y-12">
        {NEED_ORDER.map((id) => {
          const m = NEEDS_META[id];
          const need = needById[id];
          const tools = toolsForNeed(id);
          const Icon = m.icon;
          return (
            <section key={id}>
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${m.hex}1f`, color: m.hex }}>
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h2 className="font-heading text-2xl font-bold text-ink-900">{t(need.name)}</h2>
                <Link to={`/needs/${id}`} className="ms-auto text-sm font-medium text-brand-700 hover:underline">
                  {t({ he: "על הצורך", en: "About this need" })}
                </Link>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tools.map((tool) => {
                  const pdf = lang === "he" ? tool.pdfHe : tool.pdfEn;
                  return (
                    <li key={tool.id}>
                      <Link
                        to={`/practice/${tool.id}`}
                        className="group flex h-full flex-col rounded-xl2 border border-sand-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        <h3 className="font-heading text-lg font-bold text-ink-900">{t(tool.name)}</h3>
                        <p className="mt-1 flex-1 text-ink-700">{t(tool.summary)}</p>
                        <span className="mt-4 flex items-center gap-3 text-sm">
                          <span className="inline-flex items-center gap-1 font-medium" style={{ color: m.hex }}>
                            {t(UI.actions.open)}
                            <Arrow className="h-4 w-4 transition group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" aria-hidden />
                          </span>
                          {pdf && (
                            <span className="inline-flex items-center gap-1 text-ink-500">
                              <FileDown className="h-4 w-4" aria-hidden /> PDF
                            </span>
                          )}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </Section>
  );
}
