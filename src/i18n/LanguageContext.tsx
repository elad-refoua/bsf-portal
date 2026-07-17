import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Bilingual, Lang } from "@/lib/types";

interface LanguageState {
  lang: Lang;
  dir: "rtl" | "ltr";
  setLang: (lang: Lang) => void;
  toggle: () => void;
  /** Pick the active-language string from a bilingual value. */
  t: (value: Bilingual | undefined) => string;
}

const LanguageContext = createContext<LanguageState | null>(null);

const STORAGE_KEY = "catan:lang";

function initialLang(): Lang {
  if (typeof window === "undefined") return "he";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "en" ? "en" : "he";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const dir = lang === "he" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang, dir]);

  const value = useMemo<LanguageState>(
    () => ({
      lang,
      dir,
      setLang: setLangState,
      toggle: () => setLangState((l) => (l === "he" ? "en" : "he")),
      t: (v) => (v ? v[lang] : ""),
    }),
    [lang, dir],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang(): LanguageState {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
