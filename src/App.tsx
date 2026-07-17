import { useLang } from "@/i18n/LanguageContext";

/**
 * Placeholder shell — real routing (patient portal, therapist portal) is built
 * in P4/P5. Kept minimal so the scaffold builds and runs from P0.
 */
export default function App() {
  const { t, toggle, lang } = useLang();
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-4xl font-bold text-brand-700">
        {t({ he: "פורטל CATAN", en: "CATAN Portal" })}
      </h1>
      <p className="max-w-prose text-lg text-ink-700">
        {t({
          he: "התערבות ממוקדת-צרכים בפגישה אחת — סביבת עבודה בהקמה.",
          en: "Need-focused single-session intervention — scaffold in progress.",
        })}
      </p>
      <button
        onClick={toggle}
        className="rounded-full bg-brand-500 px-5 py-2 font-medium text-white shadow-soft transition hover:bg-brand-600"
      >
        {lang === "he" ? "English" : "עברית"}
      </button>
    </main>
  );
}
