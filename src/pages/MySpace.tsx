import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Trash2, ShieldCheck, FolderOpen } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { UI } from "@/lib/ui-strings";
import { listAllTools, clearAllData } from "@/lib/storage";
import { toolById, needsForTool } from "@/content";
import { NEEDS_META } from "@/lib/needs-meta";
import { Section, PageHeader, Button } from "@/components/ui/primitives";

export default function MySpace() {
  const { t, lang } = useLang();
  const Arrow = lang === "he" ? ArrowLeft : ArrowRight;
  const [items, setItems] = useState(() => listAllTools());
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    const refresh = () => setItems(listAllTools());
    refresh();
    window.addEventListener("catan:storage", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("catan:storage", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return (
    <Section>
      <PageHeader
        title={t(UI.nav.myspace)}
        lead={t({
          he: "כאן נאספת כל העבודה ששמרתם. הכול נשמר רק במכשיר שלכם.",
          en: "Everything you've saved gathers here. It's all stored only on your device.",
        })}
      />

      <p className="mb-8 inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm text-brand-700">
        <ShieldCheck className="h-4 w-4" aria-hidden /> {t(UI.misc.privacy)}
      </p>

      {items.length === 0 ? (
        <div className="rounded-xl2 border border-dashed border-sand-200 bg-sand-50 p-12 text-center">
          <FolderOpen className="mx-auto h-10 w-10 text-ink-300" aria-hidden />
          <p className="mt-4 text-lg text-ink-700">
            {t({ he: "עדיין אין רשומות שמורות.", en: "No saved entries yet." })}
          </p>
          <Link to="/practice" className="mt-4 inline-flex items-center gap-2 font-medium text-brand-700 hover:underline">
            {t(UI.nav.practice)} <Arrow className="h-5 w-5" aria-hidden />
          </Link>
        </div>
      ) : (
        <>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it) => {
              const tool = toolById[it.toolId];
              if (!tool) return null;
              const need = needsForTool(it.toolId)[0];
              const hex = need ? NEEDS_META[need].hex : "#2f7f77";
              return (
                <li key={it.toolId}>
                  <Link
                    to={`/practice/${it.toolId}`}
                    className="group flex h-full flex-col rounded-xl2 border border-sand-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ borderTopColor: hex, borderTopWidth: 3 }}
                  >
                    <h2 className="font-heading text-lg font-bold text-ink-900">{t(tool.name)}</h2>
                    <p className="mt-1 flex-1 text-sm text-ink-500">
                      {it.count} {t({ he: "רשומות", en: "entries" })} ·{" "}
                      {new Date(it.lastUpdated).toLocaleDateString(lang === "he" ? "he-IL" : "en-US")}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium" style={{ color: hex }}>
                      {t(UI.actions.open)}
                      <Arrow className="h-4 w-4 transition group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" aria-hidden />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 border-t border-sand-200 pt-6">
            {confirming ? (
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-ink-700">
                  {t({ he: "למחוק את כל המידע השמור? אי אפשר לבטל.", en: "Delete all saved data? This can't be undone." })}
                </span>
                <Button
                  variant="primary"
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => {
                    clearAllData();
                    setItems([]);
                    setConfirming(false);
                  }}
                >
                  {t({ he: "כן, למחוק הכול", en: "Yes, delete everything" })}
                </Button>
                <Button variant="ghost" onClick={() => setConfirming(false)}>
                  {t(UI.actions.back)}
                </Button>
              </div>
            ) : (
              <Button variant="ghost" className="text-red-600 hover:bg-red-50" onClick={() => setConfirming(true)}>
                <Trash2 className="h-5 w-5" aria-hidden />
                {t({ he: "מחיקת כל המידע שלי", en: "Delete all my data" })}
              </Button>
            )}
          </div>
        </>
      )}
    </Section>
  );
}
