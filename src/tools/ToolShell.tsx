import { useState, type ReactNode } from "react";
import { Save, Trash2, Printer, FileDown, Plus, Check, ChevronDown } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { UI } from "@/lib/ui-strings";
import { useToolEntries, type ToolEntry } from "@/lib/storage";
import type { ToolContent } from "@/lib/types";
import { Button } from "@/components/ui/primitives";

interface RenderArgs {
  data: Record<string, unknown>;
  setField: (id: string, value: unknown) => void;
  setData: (data: Record<string, unknown>) => void;
}

/**
 * Shared wrapper for every savable practice tool: instructions, the tool body (render prop),
 * an action bar (save / new / print / download blank), and the list of the user's saved entries.
 * All data lives in localStorage via useToolEntries — nothing leaves the device.
 */
export default function ToolShell({
  tool,
  accentHex = "#2f7f77",
  children,
  makeTitle,
}: {
  tool: ToolContent;
  accentHex?: string;
  children: (args: RenderArgs) => ReactNode;
  /** Optional: derive a short entry label from its data (else a date is used). */
  makeTitle?: (data: Record<string, unknown>, lang: "he" | "en") => string | undefined;
}) {
  const { t, lang } = useLang();
  const { entries, save, remove } = useToolEntries(tool.id);

  const [data, setData] = useState<Record<string, unknown>>({});
  const [draftId, setDraftId] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);

  const setField = (id: string, value: unknown) => {
    setData((d) => ({ ...d, [id]: value }));
    setJustSaved(false);
  };

  const onSave = () => {
    const title = makeTitle?.(data, lang);
    const entry = save(data, draftId ?? undefined, title);
    setDraftId(entry.id);
    setJustSaved(true);
  };

  const onNew = () => {
    setData({});
    setDraftId(null);
    setJustSaved(false);
  };

  const loadEntry = (e: ToolEntry) => {
    setData(e.data);
    setDraftId(e.id);
    setJustSaved(false);
  };

  const pdf = lang === "he" ? tool.pdfHe : tool.pdfEn;
  const pdfHref = pdf ? `${import.meta.env.BASE_URL}assets/pdf/${lang}/${pdf}` : null;
  const hasData = Object.values(data).some((v) => (Array.isArray(v) ? v.length : v));

  return (
    <div>
      {/* Instructions */}
      {tool.instructions[lang]?.length > 0 && (
        <details className="no-print mb-6 rounded-xl2 border border-sand-200 bg-sand-50 p-5" open>
          <summary className="flex cursor-pointer list-none items-center justify-between font-heading text-lg font-bold text-ink-900">
            {t({ he: "איך מתרגלים", en: "How to practice" })}
            <ChevronDown className="h-5 w-5 text-ink-500" aria-hidden />
          </summary>
          <div className="mt-3 space-y-2 text-ink-700">
            {tool.instructions[lang].map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </details>
      )}

      {/* Tool body */}
      <div className="rounded-xl2 border-2 bg-white p-6 shadow-soft" style={{ borderColor: `${accentHex}55` }}>
        {children({ data, setField, setData })}
      </div>

      {/* Action bar */}
      <div className="no-print mt-5 flex flex-wrap items-center gap-3">
        <Button onClick={onSave} disabled={!hasData}>
          {justSaved ? <Check className="h-5 w-5" aria-hidden /> : <Save className="h-5 w-5" aria-hidden />}
          {justSaved ? t(UI.actions.saved) : t(UI.actions.save)}
        </Button>
        <Button variant="secondary" onClick={onNew}>
          <Plus className="h-5 w-5" aria-hidden /> {t(UI.actions.newEntry)}
        </Button>
        <Button variant="ghost" onClick={() => window.print()}>
          <Printer className="h-5 w-5" aria-hidden /> {t(UI.actions.print)}
        </Button>
        {pdfHref && (
          <a
            href={pdfHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2 text-base font-medium text-brand-700 transition hover:bg-brand-50"
          >
            <FileDown className="h-5 w-5" aria-hidden /> {t({ he: "דף ריק להורדה", en: "Blank worksheet" })}
          </a>
        )}
      </div>

      {/* Saved entries */}
      {entries.length > 0 && (
        <div className="no-print mt-10">
          <h3 className="mb-3 font-heading text-lg font-bold text-ink-900">
            {t({ he: "הרשומות שלי", en: "My saved entries" })}{" "}
            <span className="text-ink-500">({entries.length})</span>
          </h3>
          <ul className="space-y-2">
            {entries.map((e) => (
              <li
                key={e.id}
                className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 ${
                  e.id === draftId ? "border-brand-300 bg-brand-50" : "border-sand-200 bg-white"
                }`}
              >
                <button className="min-w-0 flex-1 text-start" onClick={() => loadEntry(e)}>
                  <span className="block truncate font-medium text-ink-900">
                    {e.title || new Date(e.createdAt).toLocaleString(lang === "he" ? "he-IL" : "en-US")}
                  </span>
                  <span className="text-sm text-ink-500">
                    {new Date(e.updatedAt).toLocaleDateString(lang === "he" ? "he-IL" : "en-US")}
                  </span>
                </button>
                <button
                  onClick={() => {
                    remove(e.id);
                    if (e.id === draftId) onNew();
                  }}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink-500 hover:bg-red-50 hover:text-red-600"
                  aria-label={t(UI.actions.clear)}
                >
                  <Trash2 className="h-5 w-5" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
