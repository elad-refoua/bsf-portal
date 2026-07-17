import { ShieldCheck, Mail } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { UI } from "@/lib/ui-strings";
import type { Bilingual } from "@/lib/types";
import { Section, PageHeader } from "@/components/ui/primitives";

/**
 * Privacy & local-storage statement. This site sets NO cookies, runs NO analytics/tracking, and
 * stores everything only in the browser (localStorage/sessionStorage) — so no cookie-consent banner
 * is required. This page explains, plainly, what is stored and where.
 */
const CONTACT_EMAIL = "eladrefoua@gmail.com";
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

export default function Privacy() {
  const { t } = useLang();
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <PageHeader
          title={t(UI.misc.privacyStatement)}
          lead={t(
            B(
              "כל מה שתמלאו באתר נשמר רק במכשיר שלכם ואינו נשלח לשום מקום. האתר אינו משתמש בעוגיות (cookies) ואינו עוקב אחריכם.",
              "Everything you enter stays only on your device and is never sent anywhere. The site uses no cookies and does not track you.",
            ),
          )}
        />

        <div className="mt-6 flex items-start gap-2 rounded-xl2 border border-brand-100 bg-brand-50 p-5 text-brand-700">
          <ShieldCheck className="mt-1 h-5 w-5 shrink-0" aria-hidden />
          <p className="text-lg font-medium">
            {t(
              B(
                "אין צורך בהרשמה או בחשבון כדי להשתמש באזור המטופלים. אין איסוף של מידע אישי בשרת כלשהו.",
                "No sign-up or account is needed to use the patient area. No personal data is collected on any server.",
              ),
            )}
          </p>
        </div>

        <Block
          title={B("מה נשמר ואיפה", "What is stored, and where")}
          paras={[
            B(
              "האתר שומר מידע מסוים בזיכרון המקומי של הדפדפן (localStorage / sessionStorage) — רק על המכשיר שלכם: העדפת השפה (עברית/אנגלית), ותוכן שאתם ממלאים בכלי התרגול (דפי עבודה, יומנים וכד׳), כדי שתוכלו לחזור אליו.",
              "The site saves some data in your browser's local storage (localStorage / sessionStorage) — on your device only: your language preference (Hebrew/English), and the content you fill into the practice tools (worksheets, journals, etc.) so you can return to it.",
            ),
            B(
              "מידע זה נשאר במכשיר שלכם, אינו נשלח לשרת כלשהו, ואינו נגיש לנו. תוכלו למחוק אותו בכל עת דרך \"המרחב שלי\" ← \"מחיקת כל המידע שלי\".",
              "This data stays on your device, is not sent to any server, and is not accessible to us. You can delete it any time via \"My Space\" → \"Delete all my data\".",
            ),
          ]}
        />

        <Block
          title={B("עוגיות, אנליטיקס ומעקב", "Cookies, analytics & tracking")}
          paras={[
            B(
              "האתר אינו מגדיר עוגיות (cookies), אינו מריץ כלי אנליטיקה (כגון Google Analytics), ואינו כולל פיקסלים של פרסום או רשתות חברתיות. לכן אין באתר באנר הסכמה לעוגיות — אין למה להסכים.",
              "The site sets no cookies, runs no analytics tools (such as Google Analytics), and contains no advertising or social-media pixels. That's why there's no cookie-consent banner — there is nothing to consent to.",
            ),
          ]}
        />

        <Block
          title={B("אזור המטפלים", "The therapist area")}
          paras={[
            B(
              "בדיקת קוד הגישה לאזור המטפלים מתבצעת כולה בדפדפן שלכם; לא נשמרים פרטי כניסה בשרת. ההרשאה תקפה למושב הגלישה הנוכחי בלבד.",
              "The therapist access-code check happens entirely in your browser; no login details are stored on a server. Access is valid for the current browsing session only.",
            ),
          ]}
        />

        <Block
          title={B("שירותי צד-שלישי", "Third-party services")}
          paras={[
            B(
              "האתר טוען גופנים משירות Google Fonts. בקשה זו נשלחת לשרתי Google וחושפת בפניהם את כתובת ה-IP שלכם (כמקובל בטעינת גופנים ברשת), אך אינה מגדירה עוגיות. האתר מתארח ב-GitHub Pages.",
              "The site loads fonts from Google Fonts. That request is sent to Google's servers and exposes your IP address to them (as is standard for web fonts), but sets no cookies. The site is hosted on GitHub Pages.",
            ),
          ]}
        />

        <Block
          title={B("תוכן רגיש — המלצה", "Sensitive content — a note")}
          paras={[
            B(
              "מאחר שכלי התרגול עשויים להכיל תכנים אישיים ורגישים, זכרו שהם נשמרים על המכשיר שבו אתם משתמשים. מומלץ להשתמש במכשיר פרטי, ולמחוק את המידע אם אתם על מחשב משותף.",
              "Because the practice tools may hold personal, sensitive content, remember it is saved on the device you use. Prefer a private device, and clear your data if you're on a shared computer.",
            ),
          ]}
        />

        <section className="mt-10 rounded-xl2 border border-sand-200 bg-sand-50 p-6">
          <h2 className="font-heading text-2xl font-bold text-ink-900">
            {t(B("שאלות בנושא פרטיות", "Privacy questions"))}
          </h2>
          <p className="mt-2 text-lg text-ink-700">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-1 text-brand-700 underline hover:text-brand-600"
            >
              <Mail className="h-4 w-4" aria-hidden />
              {CONTACT_EMAIL}
            </a>
          </p>
        </section>
      </div>
    </Section>
  );
}
