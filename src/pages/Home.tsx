import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, HeartPulse, Compass, Wrench, ShieldCheck } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { UI } from "@/lib/ui-strings";
import { NEED_ORDER, NEEDS_META } from "@/lib/needs-meta";
import { Container, Section, Card, LinkButton } from "@/components/ui/primitives";
import Logo from "@/components/Logo";
import AssetImage from "@/components/AssetImage";

export default function Home() {
  const { t, lang } = useLang();
  const Arrow = lang === "he" ? ArrowLeft : ArrowRight;

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-sand-50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(60rem 30rem at 80% -10%, rgba(143,199,193,.5), transparent), radial-gradient(50rem 30rem at 0% 10%, rgba(224,129,63,.18), transparent)",
          }}
        />
        <Container className="relative py-16 sm:py-24">
          <div className="flex flex-col items-center text-center">
            <Logo className="h-16 w-16" />
            <p className="mt-4 font-heading text-sm font-semibold uppercase tracking-widest text-brand-600">
              {t(UI.brandSub)}
            </p>
            <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold leading-tight text-ink-900 sm:text-5xl">
              {t({
                he: "אפילו פגישה אחת ממוקדת יכולה לפגוש צורך שלא קיבל מענה.",
                en: "Even one focused session can meet a need that's been left unmet.",
              })}
            </h1>
            <p className="mt-5 max-w-2xl text-xl text-ink-700">
              {t({
                he: "CATAN היא התערבות קצרה וממוקדת-צרכים. כאן תמצאו את הידע המונגש, כלים לתרגול, והפרוטוקול המלא למטפלים.",
                en: "CATAN is a brief, needs-focused intervention. Here you'll find accessible knowledge, tools to practice, and the full protocol for therapists.",
              })}
            </p>
          </div>

          {/* Hero illustration (degrades gracefully if not yet generated) */}
          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-xl2 shadow-soft">
            <AssetImage
              src="images/hero.png"
              alt={t({ he: "נוף גבעות רגוע ההולך אל הר יציב", en: "A calm landscape of hills leading to a steady mountain" })}
              className="h-56 w-full object-cover sm:h-72"
            />
          </div>

          {/* Two doors */}
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
            <Link
              to="/understand"
              className="group flex flex-col rounded-xl2 border border-brand-100 bg-white p-7 text-start shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <HeartPulse className="h-9 w-9 text-brand-500" aria-hidden />
              <h2 className="mt-4 font-heading text-2xl font-bold text-ink-900">
                {t(UI.doors.patientTitle)}
              </h2>
              <p className="mt-2 flex-1 text-ink-700">{t(UI.doors.patientDesc)}</p>
              <span className="mt-5 inline-flex items-center gap-2 font-medium text-brand-700 group-hover:gap-3">
                {t(UI.actions.enter)} <Arrow className="h-5 w-5" aria-hidden />
              </span>
            </Link>

            <Link
              to="/therapist"
              className="group flex flex-col rounded-xl2 border border-sand-200 bg-ink-900 p-7 text-start shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Compass className="h-9 w-9 text-brand-300" aria-hidden />
              <h2 className="mt-4 font-heading text-2xl font-bold text-white">
                {t(UI.doors.therapistTitle)}
              </h2>
              <p className="mt-2 flex-1 text-sand-200">{t(UI.doors.therapistDesc)}</p>
              <span className="mt-5 inline-flex items-center gap-2 font-medium text-brand-300 group-hover:gap-3">
                {t(UI.actions.enter)} <Arrow className="h-5 w-5" aria-hidden />
              </span>
            </Link>
          </div>
        </Container>
      </div>

      {/* What is CATAN — three ideas */}
      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: HeartPulse,
              title: { he: "רגשות הם מידע", en: "Emotions are information" },
              body: {
                he: "רגשות קשים מצביעים לעיתים קרובות על צורך רגשי בסיסי שלא קיבל מספיק מענה. הם מדריכים אותנו — לא אויבים.",
                en: "Difficult emotions often point to a basic need that isn't fully met. They guide us — they aren't the enemy.",
              },
            },
            {
              icon: Compass,
              title: { he: "ששה צרכים", en: "Six needs" },
              body: {
                he: "מודל הצרכים של Dweck מזהה צרכים אוניברסליים. ההתערבות מתמקדת בצורך אחד שדורש כיוונון.",
                en: "Dweck's needs model identifies universal needs. The intervention focuses on one need that needs some tuning.",
              },
            },
            {
              icon: Wrench,
              title: { he: "כלים לתרגול", en: "Tools to practice" },
              body: {
                he: "שינוי דורש תרגול — כמו נגינה או ספורט. כאן תמצאו כלים אינטראקטיביים לתרגול בקצב שלכם.",
                en: "Change takes practice — like an instrument or a sport. Here are interactive tools to practice at your pace.",
              },
            },
          ].map((c, i) => (
            <Card key={i} className="flex flex-col">
              <c.icon className="h-8 w-8 text-brand-500" aria-hidden />
              <h3 className="mt-3 font-heading text-xl font-bold text-ink-900">{t(c.title)}</h3>
              <p className="mt-2 text-ink-700">{t(c.body)}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Six needs preview */}
      <Section className="bg-sand-100/60">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-3xl font-bold text-ink-900">{t(UI.nav.needs)}</h2>
            <p className="mt-2 text-lg text-ink-700">
              {t({
                he: "כל צורך, מה קורה כשהוא לא מסופק, והכלים שיכולים לעזור.",
                en: "Each need, what happens when it's unmet, and the tools that can help.",
              })}
            </p>
          </div>
          <LinkButton to="/needs" variant="ghost" className="hidden shrink-0 sm:inline-flex">
            {t({ he: "לכל הצרכים", en: "All needs" })} <Arrow className="h-5 w-5" aria-hidden />
          </LinkButton>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NEED_ORDER.map((id) => {
            const m = NEEDS_META[id];
            const Icon = m.icon;
            return (
              <li key={id}>
                <Link
                  to={`/needs/${id}`}
                  className="group flex h-full items-start gap-4 rounded-xl2 border border-sand-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${m.hex}22`, color: m.hex }}
                  >
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-heading text-lg font-bold text-ink-900">
                      {t(m.title)}
                    </span>
                    <span className="mt-0.5 block text-ink-500">{t(m.tagline)}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Privacy reassurance */}
      <Section className="py-10">
        <div className="flex items-center justify-center gap-3 rounded-xl2 border border-brand-100 bg-brand-50 px-6 py-5 text-center text-brand-700">
          <ShieldCheck className="h-6 w-6 shrink-0" aria-hidden />
          <p className="text-base font-medium">{t(UI.misc.privacy)}</p>
        </div>
      </Section>
    </>
  );
}
