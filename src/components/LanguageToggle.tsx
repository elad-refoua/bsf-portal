import { Languages } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { UI } from "@/lib/ui-strings";

export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, toggle, t } = useLang();
  return (
    <button
      onClick={toggle}
      className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border border-sand-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 transition hover:bg-sand-100 ${className}`}
      aria-label={lang === "he" ? "Switch to English" : "החלפה לעברית"}
    >
      <Languages className="h-4 w-4" aria-hidden />
      <span>{t(UI.misc.switchTo)}</span>
    </button>
  );
}
