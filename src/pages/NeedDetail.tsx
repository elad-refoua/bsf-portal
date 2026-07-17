import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { UI } from "@/lib/ui-strings";
import { NEEDS_META } from "@/lib/needs-meta";
import { needById, toolsForNeed } from "@/content";
import type { NeedId } from "@/lib/types";
import { Section, Container, Prose } from "@/components/ui/primitives";
import AssetImage from "@/components/AssetImage";

export default function NeedDetail() {
  const { needId } = useParams();
  const { t, lang } = useLang();
  const meta = needId ? NEEDS_META[needId as NeedId] : undefined;
  const need = needId ? needById[needId as NeedId] : undefined;
  if (!meta || !need) return <Navigate to="/needs" replace />;

  const Icon = meta.icon;
  const Arrow = lang === "he" ? ArrowLeft : ArrowRight;
  const tools = toolsForNeed(meta.id);

  return (
    <>
      {/* Hero */}
      <div style={{ backgroundColor: `${meta.hex}14` }}>
        <Container className="py-14">
          <Link to="/needs" className="mb-6 inline-flex items-center gap-1 text-sm text-ink-500 hover:text-ink-700">
            <Arrow className="h-4 w-4 rotate-180" aria-hidden /> {t(UI.nav.needs)}
          </Link>
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{ backgroundColor: `${meta.hex}26`, color: meta.hex }}>
                <Icon className="h-8 w-8" aria-hidden />
              </span>
              <div>
                <h1 className="font-heading text-4xl font-bold text-ink-900">{t(need.name)}</h1>
                <p className="mt-1 text-xl text-ink-700">{t(need.tagline)}</p>
              </div>
            </div>
            <AssetImage
              src={`images/need-${meta.id}.png`}
              alt=""
              className="hidden h-28 w-40 shrink-0 rounded-xl2 object-cover shadow-soft lg:block"
            />
          </div>
        </Container>
      </div>

      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <NeedBlock title={{ he: "מהו הצורך", en: "What this need is" }} paras={need.patient.whatItIs[lang]} hex={meta.hex} />
            <NeedBlock title={{ he: "כשהצורך לא מקבל מענה", en: "When the need goes unmet" }} paras={need.patient.whenUnmet[lang]} hex={meta.hex} />
            <NeedBlock title={{ he: "למה כדאי לעבוד על זה", en: "Why it's worth working on" }} paras={need.patient.whyItMatters[lang]} hex={meta.hex} />
          </div>

          {/* Tools rail */}
          <aside className="lg:col-span-1">
            <div className="sticky top-20 rounded-xl2 border border-sand-200 bg-sand-50 p-6">
              <h2 className="font-heading text-xl font-bold text-ink-900">{t(UI.misc.tools)}</h2>
              <p className="mt-1 text-sm text-ink-500">
                {t({ he: "כלים לתרגול הצורך הזה", en: "Tools to practice this need" })}
              </p>
              <ul className="mt-4 space-y-2">
                {tools.map((tool) => (
                  <li key={tool.id}>
                    <Link
                      to={`/practice/${tool.id}`}
                      className="group flex items-center justify-between gap-2 rounded-xl border border-sand-200 bg-white px-4 py-3 transition hover:border-brand-300 hover:bg-brand-50"
                    >
                      <span>
                        <span className="block font-medium text-ink-900">{t(tool.name)}</span>
                        <span className="text-sm text-ink-500">{t(tool.summary)}</span>
                      </span>
                      <Arrow className="h-5 w-5 shrink-0 text-brand-500 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

function NeedBlock({ title, paras, hex }: { title: { he: string; en: string }; paras: string[]; hex: string }) {
  const { t } = useLang();
  if (!paras?.length) return null;
  return (
    <section>
      <h2 className="mb-3 font-heading text-2xl font-bold text-ink-900">
        <span className="me-3 inline-block h-6 w-1.5 rounded-full align-middle" style={{ backgroundColor: hex }} />
        {t(title)}
      </h2>
      <Prose paragraphs={paras} />
    </section>
  );
}
