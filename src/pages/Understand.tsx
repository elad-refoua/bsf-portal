import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { UI } from "@/lib/ui-strings";
import { protocol } from "@/content";
import { Section, Container, Prose, LinkButton } from "@/components/ui/primitives";
import NeedsWheel from "@/components/diagrams/NeedsWheel";

export default function Understand() {
  const { t, lang } = useLang();
  const Arrow = lang === "he" ? ArrowLeft : ArrowRight;
  const paras = protocol.psychoeducation.patient[lang];

  return (
    <>
      <div className="bg-gradient-to-b from-brand-50 to-sand-50">
        <Container className="py-14">
          <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-600">
            <Sparkles className="h-4 w-4" aria-hidden /> {t(UI.nav.understand)}
          </p>
          <h1 className="max-w-3xl font-heading text-4xl font-bold text-ink-900">
            {t({
              he: "רגשות קשים הם לרוב שליחים של צורך שלא קיבל מספיק מענה.",
              en: "Difficult emotions are usually messengers of a need that hasn't been fully met.",
            })}
          </h1>
        </Container>
      </div>

      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="mb-12">
            <h2 className="mb-2 text-center font-heading text-2xl font-bold text-ink-900">
              {t({ he: "ששה צרכים, מרכז אחד", en: "Six needs, one center" })}
            </h2>
            <p className="mb-6 text-center text-ink-500">
              {t({ he: "בחרו צורך כדי להעמיק בו", en: "Choose a need to explore it" })}
            </p>
            <NeedsWheel />
          </div>
          <Prose paragraphs={paras} />

          <div className="mt-12 rounded-xl2 border border-brand-100 bg-brand-50 p-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-ink-900">
              {t({ he: "מוכנים להכיר את הצרכים?", en: "Ready to meet the needs?" })}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-ink-700">
              {t({
                he: "כל צורך מגיע עם כלים פשוטים לתרגול. אפשר להתחיל מהצורך שהכי מדבר אליכם.",
                en: "Each need comes with simple tools to practice. Start with the need that speaks to you most.",
              })}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <LinkButton to="/needs">
                {t(UI.nav.needs)} <Arrow className="h-5 w-5" aria-hidden />
              </LinkButton>
              <LinkButton to="/practice" variant="secondary">
                {t(UI.nav.practice)}
              </LinkButton>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
