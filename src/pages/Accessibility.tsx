import { Section, PageHeader } from "@/components/ui/primitives";
import { useLang } from "@/i18n/LanguageContext";
import { UI } from "@/lib/ui-strings";

// Placeholder — the full, legally-accurate accessibility statement (per IS 5568 / the 2013
// service-accessibility regulations) is being written from verified sources.
export default function Accessibility() {
  const { t } = useLang();
  return (
    <Section>
      <PageHeader title={t(UI.misc.accessibility)} />
      <p className="text-ink-500">
        {t({ he: "בהכנה…", en: "In preparation…" })}
      </p>
    </Section>
  );
}
