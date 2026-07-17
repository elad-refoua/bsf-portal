import { Mail, ShieldCheck } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { UI } from "@/lib/ui-strings";
import type { Bilingual } from "@/lib/types";
import { Section, PageHeader } from "@/components/ui/primitives";

/**
 * Accessibility statement (הצהרת נגישות) — required by Israeli reg. 35ה of the 2013 service
 * accessibility regulations. Declares conformance (IS 5568 / WCAG 2.0 AA), features, honest known
 * limitations + accessible alternatives, the accessibility coordinator, and how to report a problem.
 */
const COORDINATOR = { name: "אלעד רפואה / Elad Refoua", email: "eladrefoua@gmail.com" };
const UPDATED = "17 ביולי 2026 / 17 July 2026";

const B = (he: string, en: string): Bilingual => ({ he, en });

function Block({ title, paras }: { title: Bilingual; paras: Bilingual[] }) {
  const { t } = useLang();
  return (
    <section className="mt-8">
      <h2 className="mb-3 font-heading text-2xl font-bold text-ink-900">{t(title)}</h2>
      <div className="space-y-3 text-lg leading-relaxed text-ink-700">
        {paras.map((p, i) => (
          <p key={i}>{t(p)}</p>
        ))}
      </div>
    </section>
  );
}

function List({ title, items }: { title: Bilingual; items: Bilingual[] }) {
  const { t } = useLang();
  return (
    <section className="mt-8">
      <h2 className="mb-3 font-heading text-2xl font-bold text-ink-900">{t(title)}</h2>
      <ul className="space-y-2 text-lg text-ink-700">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2">
            <ShieldCheck className="mt-1.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden />
            <span>{t(it)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Accessibility() {
  const { t } = useLang();

  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <PageHeader
          title={t(UI.misc.accessibility)}
          lead={t(
            B(
              "אנו רואים חשיבות רבה במתן שירות שוויוני ונגיש לכלל הציבור, לרבות אנשים עם מוגבלות, ופועלים להנגשת אתר זה.",
              "We are committed to providing an equal, accessible service to the whole public, including people with disabilities, and work to keep this site accessible.",
            ),
          )}
        />

        <Block
          title={B("מחויבות ומסגרת חוקית", "Commitment & legal framework")}
          paras={[
            B(
              "אתר זה מונגש בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ\"ח-1998, ולתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע\"ג-2013.",
              "This site is made accessible in accordance with the Equal Rights for Persons with Disabilities Law, 1998, and the Equal Rights for Persons with Disabilities (Accessibility Adjustments to Service) Regulations, 2013.",
            ),
          ]}
        />

        <Block
          title={B("רמת הנגישות והתקנים", "Accessibility level & standards")}
          paras={[
            B(
              "האתר הונגש בהתאם לתקן הישראלי ת\"י 5568, המבוסס על הנחיות WCAG 2.0 של ארגון W3C, ברמת נגישות AA.",
              "The site was made accessible per Israeli Standard IS 5568, based on the W3C WCAG 2.0 guidelines, at conformance Level AA.",
            ),
            B(
              "בנוסף, האתר תוכנן לעמוד בהנחיות WCAG 2.1 ברמה AA — הסטנדרט הבינלאומי המקובל לנגישות אתרים, שהוא גם אמת-המידה שאליה מפנים ה-ADA וסעיף 508 בארה\"ב.",
              "The site is also designed to conform to WCAG 2.1 Level AA — the internationally recognized standard for web accessibility, and the benchmark referenced under the U.S. Americans with Disabilities Act (ADA) and Section 508 of the Rehabilitation Act.",
            ),
          ]}
        />

        <Block
          title={B("היקף ההצהרה", "Scope")}
          paras={[
            B(
              "הצהרה זו חלה על אתר CATAN שכתובתו elad-refoua.github.io/bsf-portal — הן באזור המטופלים והן באזור המטפלים.",
              "This statement applies to the CATAN portal at elad-refoua.github.io/bsf-portal — both the patient area and the therapist area.",
            ),
          ]}
        />

        <List
          title={B("התאמות הנגישות שבוצעו", "Accessibility features implemented")}
          items={[
            B("ניווט מלא באמצעות מקלדת עם סימון מיקוד (focus) נראה", "Full keyboard navigation with a visible focus indicator"),
            B("מבנה סמנטי, כותרות היררכיות, אזורי ניווט וסדר קריאה לוגי", "Semantic structure, hierarchical headings, landmarks, and logical reading order"),
            B("תמיכה בקוראי מסך ותיוג תקין של כפתורים, קישורים וטפסים", "Screen-reader support and proper labeling of buttons, links, and forms"),
            B("קישור \"דילוג לתוכן\" בראש כל עמוד", "A \"skip to content\" link at the top of every page"),
            B("טקסט חלופי לתמונות בעלות משמעות; תמונות עיצוביות מסומנות כדקורטיביות", "Alt text for meaningful images; decorative images marked as such"),
            B("ניגודיות צבעים תקינה (4.5:1 לפחות) וטקסט הניתן להגדלה", "Adequate color contrast (at least 4.5:1) and resizable text"),
            B("כיבוד העדפת הפחתת אנימציה (prefers-reduced-motion)", "Respect for the reduced-motion preference (prefers-reduced-motion)"),
            B("תמיכה מלאה בעברית ובכיווניות מימין-לשמאל (RTL) ומעבר שפה עברית/אנגלית", "Full Hebrew and right-to-left (RTL) support and a Hebrew/English language toggle"),
          ]}
        />

        <Block
          title={B("בדיקות", "Testing")}
          paras={[
            B(
              "נגישות האתר נבדקה בדפדפני Chrome ו-Edge בשילוב בדיקת ניווט מקלדת וקורא מסך. בדיקה אחרונה: יולי 2026.",
              "Accessibility was tested on Chrome and Edge with keyboard-navigation and screen-reader checks. Last tested: July 2026.",
            ),
          ]}
        />

        <Block
          title={B("חריגים ומגבלות ידועות", "Known limitations and exceptions")}
          paras={[
            B(
              "חלק מקובצי ה-PDF של דפי העבודה באזור המטפלים הם מסמכים קליניים סרוקים ועשויים שלא להיות נגישים במלואם. ניתן לקבל גרסה נגישה או את המידע בדרך חלופית באמצעות פנייה לרכז הנגישות שלהלן.",
              "Some worksheet PDFs in the therapist area are scanned clinical documents and may not be fully accessible. An accessible version, or the information by an alternative means, can be obtained by contacting the accessibility coordinator below.",
            ),
            B(
              "בכלי \"מעגלי הקרבה\" קיים תרשים חזותי; כל הפעולות והמידע זמינים גם ברשימת השמות הטקסטואלית הנגישה שלצדו.",
              "The \"Closeness Circles\" tool includes a visual diagram; all actions and information are also available via the accessible text list of names beside it.",
            ),
          ]}
        />

        {/* Coordinator + reporting */}
        <section className="mt-10 rounded-xl2 border border-brand-100 bg-brand-50 p-6">
          <h2 className="font-heading text-2xl font-bold text-ink-900">
            {t(B("רכז הנגישות ופנייה בנושא נגישות", "Accessibility coordinator & how to report"))}
          </h2>
          <p className="mt-2 text-lg text-ink-700">
            {t(
              B(
                "נתקלתם בקושי בגלישה או ברכיב שאינו נגיש? נשמח שתעדכנו אותנו ונפעל לתקן זאת בהקדם.",
                "Encountered a difficulty or an inaccessible component? Please let us know and we'll work to fix it promptly.",
              ),
            )}
          </p>
          <dl className="mt-4 space-y-1 text-lg text-ink-900">
            <div className="flex gap-2">
              <dt className="font-semibold">{t(B("רכז נגישות:", "Accessibility coordinator:"))}</dt>
              <dd>{COORDINATOR.name}</dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="font-semibold">{t(B("דוא\"ל:", "Email:"))}</dt>
              <dd>
                <a
                  href={`mailto:${COORDINATOR.email}`}
                  className="inline-flex items-center gap-1 text-brand-700 underline hover:text-brand-600"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  {COORDINATOR.email}
                </a>
              </dd>
            </div>
          </dl>
        </section>

        <p className="mt-8 text-sm text-ink-500">
          {t(B("תאריך עדכון אחרון של ההצהרה: ", "Statement last updated: "))}
          {UPDATED}
        </p>
      </div>
    </Section>
  );
}
